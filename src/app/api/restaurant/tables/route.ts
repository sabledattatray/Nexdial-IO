import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tables = await prisma.table.findMany({
      where: { workspaceId: session.user.workspaceId },
      orderBy: { number: "asc" },
      include: {
        orders: {
          where: { status: "OPEN" },
          include: { items: true },
        },
      },
    });

    return NextResponse.json({ success: true, tables });
  } catch (error) {
    console.error("Fetch Tables Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { number, capacity } = body;

    const newTable = await prisma.table.create({
      data: {
        workspaceId: session.user.workspaceId,
        number,
        capacity: capacity ? parseInt(capacity) : 2,
      },
    });

    return NextResponse.json({ success: true, table: newTable });
  } catch (error) {
    console.error("Create Table Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    const updatedTable = await prisma.table.updateMany({
      where: { id, workspaceId: session.user.workspaceId },
      data: { status },
    });

    return NextResponse.json({ success: true, count: updatedTable.count });
  } catch (error) {
    console.error("Update Table Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.table.deleteMany({
      where: { id, workspaceId: session.user.workspaceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Table Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
