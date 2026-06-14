import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [
      totalWorkspaces,
      totalUsers,
      totalLeads,
      planGroups,
      integrationGroups,
      workspaces
    ] = await Promise.all([
      prisma.workspace.count(),
      prisma.user.count(),
      prisma.lead.count(),
      prisma.workspace.groupBy({
        by: ['plan'],
        _count: { id: true }
      }),
      prisma.integration.groupBy({
        by: ['provider'],
        _count: { id: true }
      }),
      prisma.workspace.findMany({ select: { createdAt: true } })
    ]);

    // Format plan distribution
    const plans = planGroups.map(g => ({
      name: g.plan,
      value: g._count.id
    }));

    // Format integration distribution
    const integrations = integrationGroups.map(g => ({
      name: g.provider,
      value: g._count.id
    }));

    // Calculate growth over the last 6 months
    const growth = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toLocaleString('default', { month: 'short' });
      
      const count = workspaces.filter(w => {
        const wDate = new Date(w.createdAt);
        return wDate.getMonth() === d.getMonth() && wDate.getFullYear() === d.getFullYear();
      }).length;

      growth.push({ name: monthStr, Workspaces: count });
    }

    return NextResponse.json({
      metrics: {
        totalWorkspaces,
        totalUsers,
        totalLeads,
      },
      charts: {
        plans,
        integrations,
        growth
      }
    });
  } catch (error) {
    console.error("GET /api/admin/analytics error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
