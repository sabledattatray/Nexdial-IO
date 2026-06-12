import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { seedOnboardingData } from "@/lib/onboardingSeeder";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, seedDemoData, industry } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user as ADMIN
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    // Seed onboarding demo data if requested
    if (seedDemoData) {
      try {
        await seedOnboardingData(user.id, industry || "real_estate");
      } catch (seedError) {
        console.error("Failed to seed onboarding demo data:", seedError);
        // We continue since the user account was successfully created
      }
    }

    return NextResponse.json({
      success: true,
      message: "Account registered successfully.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
