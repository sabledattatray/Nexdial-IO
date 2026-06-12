// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { workspaceId: true },
    });

    if (!user?.workspaceId) {
      return new NextResponse("No workspace found", { status: 400 });
    }

    const rules = await prisma.routingRule.findMany({
      where: { workspaceId: user.workspaceId },
      orderBy: { priority: "asc" },
    });

    return NextResponse.json(rules);
  } catch (error) {
    console.error("GET /api/routing error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { workspaceId: true },
    });

    if (!user?.workspaceId) {
      return new NextResponse("No workspace found", { status: 400 });
    }

    const body = await request.json();
    const { name, priority, isActive, conditions, actions } = body;

    const rule = await prisma.routingRule.create({
      data: {
        workspaceId: user.workspaceId,
        name,
        priority: priority ?? 0,
        isActive: isActive ?? true,
        conditions: conditions ?? [],
        actions: actions ?? [],
      },
    });

    return NextResponse.json(rule);
  } catch (error) {
    console.error("POST /api/routing error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { workspaceId: true },
    });

    if (!user?.workspaceId) {
      return new NextResponse("No workspace found", { status: 400 });
    }

    const body = await request.json();
    const { id, name, priority, isActive, conditions, actions } = body;

    if (!id) {
      return new NextResponse("Rule ID is required", { status: 400 });
    }

    // Verify ownership
    const existingRule = await prisma.routingRule.findUnique({
      where: { id },
    });

    if (!existingRule || existingRule.workspaceId !== user.workspaceId) {
      return new NextResponse("Not found or unauthorized", { status: 404 });
    }

    const updatedRule = await prisma.routingRule.update({
      where: { id },
      data: {
        name,
        priority,
        isActive,
        conditions,
        actions,
      },
    });

    return NextResponse.json(updatedRule);
  } catch (error) {
    console.error("PUT /api/routing error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { workspaceId: true },
    });

    if (!user?.workspaceId) {
      return new NextResponse("No workspace found", { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Rule ID is required", { status: 400 });
    }

    // Verify ownership
    const existingRule = await prisma.routingRule.findUnique({
      where: { id },
    });

    if (!existingRule || existingRule.workspaceId !== user.workspaceId) {
      return new NextResponse("Not found or unauthorized", { status: 404 });
    }

    await prisma.routingRule.delete({
      where: { id },
    });

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE /api/routing error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
