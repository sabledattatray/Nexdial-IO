// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!adminUser || !adminUser.workspaceId) {
      return NextResponse.json({ error: "No workspace found." }, { status: 404 });
    }

    await prisma.workspace.update({
      where: { id: adminUser.workspaceId },
      data: {
        onboardingData: {
          companyName: "NexDial Solutions (Injected Data)",
          leadSources: ["Website Form", "Facebook Ads", "Referrals"],
          goals: ["Automate Lead Management", "Build Sales Pipeline"],
          teamSize: 10
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully injected onboarding data into Workspace ID: " + adminUser.workspaceId,
      instructions: "Now go to the Admin Dashboard > Clients and click the expand arrow!"
    });
  } catch (error) {
    console.error("Inject Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
