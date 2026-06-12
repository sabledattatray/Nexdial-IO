import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * GET: Fetch a single lead with all associated timeline items
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    const { id: leadId } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
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
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // SALES role can only view their assigned leads
    if (user.role === "SALES" && lead.assignedToId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You do not have permission to view this lead." },
        { status: 403 }
      );
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("GET Lead error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PATCH: Update lead details (status, notes, follow-up, assignee)
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    if (user.role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden. Viewers cannot modify leads." },
        { status: 403 }
      );
    }

    const { id: leadId } = await params;
    const body = await req.json();

    // Verify lead existence and ownership
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (user.role === "SALES" && existingLead.assignedToId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only update leads assigned to you." },
        { status: 403 }
      );
    }

    // Build update payload
    const data: any = {};

    // Validate and update status
    if (body.status) {
      const normalizedStatus = body.status.toUpperCase().replace(/[\s-]+/g, "_");
      const validStatuses = ["NEW", "CONTACTED", "IN_PROGRESS", "INTERESTED", "CONVERTED", "LOST"];
      if (validStatuses.includes(normalizedStatus)) {
        data.status = normalizedStatus;
      }
    }

    // Only Admin can reassign leads
    if (body.assignedToId !== undefined) {
      if (user.role === "ADMIN") {
        data.assignedToId = body.assignedToId;
      } else {
        return NextResponse.json(
          { error: "Forbidden. Only administrators can assign leads." },
          { status: 403 }
        );
      }
    }

    // Handle follow-up date
    if (body.followUpDate !== undefined) {
      data.followUpDate = body.followUpDate ? new Date(body.followUpDate) : null;
    }

    // If new note text is provided
    if (body.notes) {
      data.notes = {
        push: body.notes,
      };
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data,
    });

    // Logging activities in the database
    if (body.status && body.status !== existingLead.status) {
      await prisma.activity.create({
        data: {
          leadId,
          type: "STATUS_CHANGED",
          description: `Status changed from ${existingLead.status} to ${body.status}`,
          createdById: user.id,
        },
      });
    }

    if (body.notes) {
      await prisma.activity.create({
        data: {
          leadId,
          type: "NOTE_ADDED",
          description: body.notes,
          createdById: user.id,
        },
      });
    }

    if (body.activityType && body.activityDescription) {
      await prisma.activity.create({
        data: {
          leadId,
          type: body.activityType,
          description: body.activityDescription,
          createdById: user.id,
        },
      });
    }

    if (body.followUpDate !== undefined) {
      const dateVal = body.followUpDate ? new Date(body.followUpDate) : null;
      const existingVal = existingLead.followUpDate ? new Date(existingLead.followUpDate) : null;
      
      if (dateVal?.getTime() !== existingVal?.getTime()) {
        if (dateVal) {
          // Create new pending FollowUp
          await prisma.followUp.create({
            data: {
              leadId,
              scheduledAt: dateVal,
              status: "PENDING",
            },
          });

          await prisma.activity.create({
            data: {
              leadId,
              type: "FOLLOW_UP_SET",
              description: `Follow up scheduled for ${dateVal.toLocaleString()}`,
              createdById: user.id,
            },
          });
        } else {
          // Mark all pending follow-ups for this lead as COMPLETED
          await prisma.followUp.updateMany({
            where: { leadId, status: "PENDING" },
            data: { status: "COMPLETED" },
          });

          await prisma.activity.create({
            data: {
              leadId,
              type: "FOLLOW_UP_COMPLETED",
              description: `Follow up marked as completed`,
              createdById: user.id,
            },
          });
        }
      }
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("PATCH Lead error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
