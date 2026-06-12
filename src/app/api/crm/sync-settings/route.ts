import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = session.user as any;
    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { workspaceId: true }
    });

    if (!user || !user.workspaceId) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // Merge incoming data into onboardingData
    const currentWorkspace = await prisma.workspace.findUnique({
      where: { id: user.workspaceId },
      select: { onboardingData: true }
    });

    const existingData = (currentWorkspace?.onboardingData as any) || {};
    
    await prisma.workspace.update({
      where: { id: user.workspaceId },
      data: {
        onboardingData: {
          ...existingData,
          companyName: body.companyName || existingData.companyName,
          leadSources: body.leadSources || existingData.leadSources,
          goals: body.goals || existingData.goals,
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
