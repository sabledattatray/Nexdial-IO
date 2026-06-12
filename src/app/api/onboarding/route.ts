import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { seedOnboardingData } from "@/lib/onboardingSeeder";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = session.user as any;

    const body = await req.json();
    const { name, industry, seedDemoData } = body;

    if (!industry) {
      return NextResponse.json({ error: "Industry is required." }, { status: 400 });
    }

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id: sessionUser.id },
      data: {
        name: name || undefined,
        onboarded: true,
        industry,
      },
    });

    // Seed onboarding demo data if requested
    if (seedDemoData) {
      try {
        await seedOnboardingData(sessionUser.id, industry);
      } catch (seedError) {
        console.error("Failed to seed onboarding data during wizard:", seedError);
        // We continue because the user was successfully onboarded/marked onboarded
      }
    }

    return NextResponse.json({
      success: true,
      message: "Workspace successfully onboarded.",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        onboarded: updatedUser.onboarded,
        industry: updatedUser.industry,
      },
    });
  } catch (error) {
    console.error("POST Onboarding error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
