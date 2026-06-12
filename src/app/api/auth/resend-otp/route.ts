// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";

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

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() },
    });

    // Create the new token
    await prisma.verificationToken.create({
      data: { identifier: email.toLowerCase(), token: otp, expires },
    });

    // Send email using Resend (falls back to mock if no API key is provided)
    const emailResult = await sendVerificationEmail(email.toLowerCase(), otp);

    if (!emailResult.success) {
      return NextResponse.json({ 
        error: `Email delivery failed: ${emailResult.error?.message || "Unknown error"}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "OTP resent successfully",
      mockOtp: emailResult.mock ? otp : undefined // Temporarily expose for testing if no API key
    });

  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return NextResponse.json({ 
      error: `Debug Error: ${error?.message || error}` 
    }, { status: 500 });
  }
}
