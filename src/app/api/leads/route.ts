import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import {
  calculateLeadHealth,
  calculateNextBestAction,
  calculateSuggestedFollowUp,
  auditLeadCleanliness,
  calculateLeadMomentum
} from "@/lib/crmUtils";


/**
 * GET: Get paginated leads (enforces RBAC and sales ownership)
 */
export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.max(1, Math.min(200, Number(searchParams.get("limit") || 20)));

    const statusParam = searchParams.get("status") || undefined;
    const assignedToId = searchParams.get("assignedToId") || undefined;

    // Build database filters
    const where: any = {};

    // Normalize and filter by status
    if (statusParam) {
      const normalizedStatus = statusParam.toUpperCase().replace(/[\s-]+/g, "_");
      const validStatuses = ["NEW", "CONTACTED", "IN_PROGRESS", "INTERESTED", "CONVERTED", "LOST"];
      if (validStatuses.includes(normalizedStatus)) {
        where.status = normalizedStatus;
      }
    }

    // Search query database filter
    const search = searchParams.get("search") || undefined;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Enforce role-based boundaries
    if (user.role === "SALES") {
      where.assignedToId = user.id;
    } else if (assignedToId) {
      where.assignedToId = assignedToId;
    }

    console.log("[DEBUG API leads] User:", user.email, "Role:", user.role, "Filters:", JSON.stringify(where));

    const leads = await prisma.lead.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        calls: {
          orderBy: { timestamp: "desc" },
        },
        activities: {
          orderBy: { timestamp: "desc" },
        },
        followUps: {
          where: { status: "PENDING" },
          orderBy: { scheduledAt: "desc" },
        },
        aiRecommendations: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const total = await prisma.lead.count({ where });
    console.log("[DEBUG API leads] Leads fetched count:", leads.length, "Total in DB matching filters:", total);

    // Check for duplicates
    const phones = leads.map(l => l.phone).filter(Boolean);
    const emails = leads.map(l => l.email).filter(Boolean) as string[];

    const duplicatePhones = await prisma.lead.groupBy({
      by: ['phone'],
      where: { phone: { in: phones } },
      _count: { id: true }
    });

    const duplicateEmails = emails.length > 0 ? await prisma.lead.groupBy({
      by: ['email'],
      where: { email: { in: emails } },
      _count: { id: true }
    }) : [];

    const dupPhoneSet = new Set(duplicatePhones.filter(g => g._count.id > 1).map(g => g.phone));
    const dupEmailSet = new Set(duplicateEmails.filter(g => g._count.id > 1).map(g => g.email));

    const enrichedLeads = leads.map(lead => {
      const isDup = dupPhoneSet.has(lead.phone) || (lead.email && dupEmailSet.has(lead.email));
      const health = calculateLeadHealth(lead, lead.aiRecommendations || []);
      const momentum = calculateLeadMomentum(lead);
      const nextAction = calculateNextBestAction(lead);
      const suggestedFollowUp = calculateSuggestedFollowUp(lead);
      const cleanlinessWarnings = auditLeadCleanliness(lead, !!isDup);

      return {
        ...lead,
        healthScore: health.score,
        healthCategory: health.category,
        momentumScore: momentum.score,
        momentumLabel: momentum.label,
        nextBestAction: nextAction,
        suggestedFollowUp,
        cleanlinessWarnings,
        isDuplicate: !!isDup
      };
    });

    return NextResponse.json({
      data: enrichedLeads,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    console.error("GET Leads error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST: Create a new lead (blocks VIEWER role)
 */
export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    if (user.role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden. Viewers are restricted from creating leads." },
        { status: 403 }
      );
    }

    const body = await req.json();

    let assignedId = body.assignedToId || null;
    if (user.role === "SALES") {
      assignedId = user.id;
    }

    // Normalize source
    const sourceParam = body.source || "MANUAL";
    const normalizedSource = sourceParam.toUpperCase().replace(/[\s-]+/g, "_");
    const validSources = ["WHATSAPP", "CALL", "FORM", "MANUAL", "CSV", "WEBSITE"];
    const source = validSources.includes(normalizedSource) ? normalizedSource : "MANUAL";

    const lead = await prisma.lead.create({
      data: {
        name: body.name || "Unknown Lead",
        phone: body.phone || "",
        email: body.email || null,
        source: source as any,
        status: "NEW",
        assignedToId: assignedId,
      },
    });

    // Create activity using correct schema relations
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: "LEAD_CREATED",
        description: `Lead created manually by ${user.name || user.email}`,
        createdById: user.id,
      },
    });

    // If initial notes are provided, save as activities
    if (body.notes && body.notes.length > 0) {
      const notes = Array.isArray(body.notes) ? body.notes : [body.notes];
      for (const note of notes) {
        if (note && note.trim()) {
          await prisma.activity.create({
            data: {
              leadId: lead.id,
              type: "NOTE_ADDED",
              description: note,
              createdById: user.id,
            },
          });
        }
      }
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("POST Lead error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
