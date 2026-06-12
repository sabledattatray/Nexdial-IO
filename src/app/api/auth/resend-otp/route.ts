import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: "Email is already verified" }, { status: 400 });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // Upsert the token
    await prisma.verificationToken.upsert({
      where: { identifier: email.toLowerCase() },
      update: { token: otp, expires },
      create: { identifier: email.toLowerCase(), token: otp, expires },
    });

    // In production, send via email provider
    console.log(`\n\n[MOCK EMAIL SERVER] Resent Verification OTP for ${email.toLowerCase()}: ${otp}\n\n`);

    // For testing on live servers without an email provider, we will return the OTP in the response
    // Remove this in a real production environment once SendGrid/Resend is configured!
    const isMockMode = process.env.NODE_ENV === "development" || !process.env.SMTP_HOST;

    return NextResponse.json({ 
      success: true, 
      message: "OTP resent successfully",
      mockOtp: isMockMode ? otp : undefined // Temporarily expose for testing
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json({ error: "Failed to resend OTP" }, { status: 500 });
  }
}
