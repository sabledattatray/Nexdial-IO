import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the most recent published announcement from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const announcements = await prisma.announcement.findMany({
      where: {
        isPublished: true,
        createdAt: { gte: sevenDaysAgo }
      },
      orderBy: { createdAt: "desc" },
      take: 1
    });

    return NextResponse.json(announcements[0] || null);
  } catch (error) {
    console.error("GET /api/crm/announcements error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
