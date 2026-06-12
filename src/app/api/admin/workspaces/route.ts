import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Note: In production, check if session.user is SUPER_ADMIN
    // For now, return all workspaces
    const workspaces = await prisma.workspace.findMany({
      include: {
        _count: {
          select: {
            users: true,
            leads: true,
            integrations: true,
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("GET /api/admin/workspaces error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
