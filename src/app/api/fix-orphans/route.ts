import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orphanedUsers = await prisma.user.findMany({
      where: { workspaceId: null }
    });
    
    let count = 0;
    for (const user of orphanedUsers) {
      const ws = await prisma.workspace.create({
        data: {
          name: `${user.name || 'User'}'s Workspace`,
          plan: "TRIAL",
          status: "ACTIVE",
          onboardingData: {}
        }
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { workspaceId: ws.id, onboarded: true }
      });
      count++;
    }
    
    return NextResponse.json({ success: true, fixedCount: count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
