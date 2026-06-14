import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session?.user || session?.user?.email?.toLowerCase() !== "sabledattatray@gmail.com") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("GET /api/admin/announcements error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session?.user || session?.user?.email?.toLowerCase() !== "sabledattatray@gmail.com") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        message: body.message,
        type: body.type || "INFO",
        isPublished: true,
      }
    });

    // Automatically log this admin action
    await prisma.auditLog.create({
      data: {
        action: "BROADCAST_SENT",
        details: { title: body.title, target: "All Clients" }
      }
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("POST /api/admin/announcements error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
