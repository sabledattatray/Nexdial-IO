import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * GET: Fetch activity logs for a lead (secured and page-parameter compliant)
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

    // Verify lead existence and ownership
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { assignedToId: true },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (user.role === "SALES" && lead.assignedToId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden. You do not have access to this lead's activities." },
        { status: 403 }
      );
    }

    const activities = await prisma.activity.findMany({
      where: { leadId },
      orderBy: { timestamp: "desc" },
      take: 100,
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error("GET Activity error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
