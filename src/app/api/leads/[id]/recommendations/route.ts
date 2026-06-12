import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * POST: Record user feedback on AI Recommendations (FOLLOWED / SKIPPED / SNOOZED)
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: leadId } = await params;
    const body = await req.json();
    const { recommendation, category, status, reasoning } = body;

    if (!recommendation || !category || !status) {
      return NextResponse.json(
        { error: "recommendation, category, and status are required." },
        { status: 400 }
      );
    }

    // Verify lead existence
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const rec = await prisma.aIRecommendation.create({
      data: {
        leadId,
        recommendation,
        category,
        status, // 'FOLLOWED' | 'SKIPPED' | 'SNOOZED'
        reasoning: reasoning || [],
      },
    });

    // Auto-log activity of this feedback (Auto-Logging Engine)
    await prisma.activity.create({
      data: {
        leadId,
        type: "AI_FEEDBACK",
        description: `User marked recommendation "${recommendation}" (${category}) as ${status.toLowerCase()}.`,
        createdById: (session.user as any).id,
      },
    });

    return NextResponse.json(rec);
  } catch (error) {
    console.error("POST AIRecommendation feedback error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
