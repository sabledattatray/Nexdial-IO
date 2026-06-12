import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    // Default filters: pending follow-ups
    const where: any = {
      status: "PENDING",
    };

    // SALES role can only see follow-ups of leads assigned to them
    if (user.role === "SALES") {
      where.lead = {
        assignedToId: user.id,
      };
    }

    const followUps = await prisma.followUp.findMany({
      where,
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            status: true,
            source: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return NextResponse.json(followUps);
  } catch (error) {
    console.error("GET Follow-Ups error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
