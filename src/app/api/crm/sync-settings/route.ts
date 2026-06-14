// @ts-nocheck
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
          ...body
        }
      }
    });

    if (body.industry) {
      await prisma.user.update({
        where: { id: sessionUser.id },
        data: { industry: body.industry }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const sessionUser = session.user as any;
    
    if (!sessionUser.workspaceId) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    const currentWorkspace = await prisma.workspace.findUnique({
      where: { id: sessionUser.workspaceId },
    });

    if (!currentWorkspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      workspace: currentWorkspace,
      onboardingData: currentWorkspace.onboardingData || {}
    });
  } catch (error) {
    console.error("Fetch Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
