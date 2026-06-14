import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        onboarded: true,
        industry: true,
        phone: true,
        jobTitle: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" }
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error("GET Users API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, password, role } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 400 });
    }

    // Hash a default password if not provided
    const defaultPassword = password || "nexdial-team-member";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    // Map role
    let dbRole: any = "SALES";
    const normRole = (role || "").toLowerCase();
    if (normRole.includes("admin") || normRole.includes("manager")) {
      dbRole = "ADMIN";
    } else if (normRole.includes("waiter") || normRole.includes("staff")) {
      dbRole = "WAITER";
    }

    const user = await prisma.user.create({
      data: {
        workspaceId: session.user.workspaceId as string,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: dbRole,
        onboarded: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Team member created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error: any) {
    console.error("POST Users API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
