import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Return all workspaces for Super Admin, including the actual human owners
    const rawWorkspaces = await prisma.workspace.findMany({
      include: {
        users: {
          where: { role: "ADMIN" },
          select: { id: true, name: true, email: true, image: true }
        },
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

    // AI Churn Detection & Dynamic Health Scoring
    const workspaces = rawWorkspaces.map(ws => {
      let score = 100;
      
      // Rule 1: No integrations connected
      if (ws._count.integrations === 0) score -= 25;
      
      // Rule 2: No lead activity
      if (ws._count.leads === 0) score -= 25;
      
      // Rule 3: No login for 30 days
      const daysSinceLogin = ws.lastLoginAt 
        ? (Date.now() - new Date(ws.lastLoginAt).getTime()) / (1000 * 60 * 60 * 24)
        : (Date.now() - new Date(ws.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLogin > 30) score -= 40;
      else if (daysSinceLogin > 14) score -= 20;

      // Rule 4: Trial ending soon
      if (ws.plan === "TRIAL" && ws.trialEndsAt) {
        const daysToTrialEnd = (new Date(ws.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        if (daysToTrialEnd <= 3 && daysToTrialEnd > 0) score -= 20;
      }

      // Bound score between 0 and 100
      const finalScore = Math.max(0, Math.min(100, score));

      return {
        ...ws,
        healthScore: finalScore, // Override DB field with live computed score
      };
    });

    return NextResponse.json(workspaces);
  } catch (error) {
    console.error("GET /api/admin/workspaces error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
