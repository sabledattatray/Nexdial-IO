import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        workspace: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 100 // Limit to recent 100 logs
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("GET /api/admin/audit-logs error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
