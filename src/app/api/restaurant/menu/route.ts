import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.menuCategory.findMany({
      where: { workspaceId: session.user.workspaceId },
      orderBy: { order: "asc" },
      include: {
        items: {
          orderBy: { name: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Fetch Menu Error:", error);
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
    const { action } = body;

    if (action === "createCategory") {
      const { name } = body;
      const category = await prisma.menuCategory.create({
        data: {
          workspaceId: session.user.workspaceId,
          name,
        },
      });
      return NextResponse.json({ success: true, category });
    }

    if (action === "createItem") {
      const { categoryId, name, price, description } = body;
      const item = await prisma.menuItem.create({
        data: {
          categoryId,
          name,
          price: parseFloat(price),
          description,
        },
      });
      return NextResponse.json({ success: true, item });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Create Menu Error:", error);
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
    const action = searchParams.get("action");
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    if (action === "deleteCategory") {
      await prisma.menuCategory.deleteMany({
        where: { id, workspaceId: session.user.workspaceId },
      });
    } else if (action === "deleteItem") {
      await prisma.menuItem.delete({
        where: { id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Menu Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
