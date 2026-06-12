import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    if (user.role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden. Viewers cannot log calls." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { leadId, type, outcome, notes } = body;

    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
    }

    // Verify lead ownership
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    if (user.role === "SALES" && lead.assignedToId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You can only log calls on leads assigned to you." },
        { status: 403 }
      );
    }

    // Normalize CallType
    let callType: any = "OUTGOING";
    const normalizedType = (type || "").toUpperCase();
    if (["INCOMING", "OUTGOING", "MISSED"].includes(normalizedType)) {
      callType = normalizedType;
    }

    // Normalize CallOutcome
    let callOutcome: any = "NO_ANSWER";
    const normalizedOutcome = (outcome || "").toUpperCase().replace(/\s+/g, "_");
    const validOutcomes = ["NO_ANSWER", "INTERESTED", "NOT_INTERESTED", "CALLBACK", "CONVERTED", "LEFT_VOICEMAIL"];
    if (validOutcomes.includes(normalizedOutcome)) {
      callOutcome = normalizedOutcome;
    }

    const call = await prisma.call.create({
      data: {
        leadId,
        type: callType,
        outcome: callOutcome,
        notes: notes || null,
        createdById: user.id,
      },
    });

    // Auto Activity log with createdById relation
    await prisma.activity.create({
      data: {
        leadId,
        type: "CALL_LOGGED",
        description: `Call Logged (${callType.toLowerCase()}): ${callOutcome.toLowerCase().replace("_", " ")}${notes ? ` - ${notes}` : ""}`,
        createdById: user.id,
      },
    });

    // Smart Pipeline Automation rules
    let newStatus: string | null = null;
    if (callOutcome === "CONVERTED") {
      newStatus = "CONVERTED";
    } else if (callOutcome === "NOT_INTERESTED") {
      newStatus = "LOST";
    } else if ((callOutcome === "INTERESTED" || callOutcome === "CALLBACK") && lead.status === "NEW") {
      newStatus = "CONTACTED";
    }

    if (newStatus && newStatus !== lead.status) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { status: newStatus as any }
      });
      await prisma.activity.create({
        data: {
          leadId,
          type: "STATUS_CHANGED",
          description: `Status automatically updated from ${lead.status} to ${newStatus} based on call outcome (${callOutcome.toLowerCase().replace("_", " ")}).`,
          createdById: user.id,
        }
      });
    } else if (callType === "OUTGOING" && callOutcome === "NO_ANSWER") {
      // Check if there are 3 consecutive outgoing missed calls (NO_ANSWER)
      const recentCalls = await prisma.call.findMany({
        where: { leadId },
        orderBy: { timestamp: "desc" },
        take: 3,
      });
      const isThreeMissed = recentCalls.length === 3 && recentCalls.every(c => c.type === "OUTGOING" && c.outcome === "NO_ANSWER");
      
      if (isThreeMissed && lead.status !== "LOST") {
        await prisma.lead.update({
          where: { id: leadId },
          data: { status: "LOST" }
        });
        await prisma.activity.create({
          data: {
            leadId,
            type: "STATUS_CHANGED",
            description: `System marked lead as LOST due to 3 consecutive outgoing no-answer attempts.`,
            createdById: user.id,
          }
        });
      }
    }

    return NextResponse.json(call);
  } catch (error) {
    console.error("POST Call error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
