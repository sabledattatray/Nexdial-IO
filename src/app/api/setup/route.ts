import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, secret } = body;

    const envSecret = process.env.SETUP_SECRET;
    if (!envSecret) {
      return NextResponse.json(
        { error: "Setup secret is not configured on the server." },
        { status: 500 }
      );
    }

    if (!secret || secret !== envSecret) {
      return NextResponse.json({ error: "Unauthorized. Invalid setup secret." }, { status: 401 });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required." }, { status: 400 });
    }

    // Check if system is already bootstrapped
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Forbidden. System is already bootstrapped with users." },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Administrative user created successfully.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Setup API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
