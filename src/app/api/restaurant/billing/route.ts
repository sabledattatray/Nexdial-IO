import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { workspaceId: session.user.workspaceId },
      orderBy: { updatedAt: "desc" },
      include: {
        table: true,
        items: {
          include: { menuItem: true },
        },
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch Billing Error:", error);
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

    if (action === "closeOrder") {
      const { orderId, tax, tip } = body;
      
      const order = await prisma.order.findUnique({
        where: { id: orderId, workspaceId: session.user.workspaceId }
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const total = order.subtotal + parseFloat(tax || 0) + parseFloat(tip || 0);

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          tax: parseFloat(tax || 0),
          tip: parseFloat(tip || 0),
          total
        },
      });

      if (order.tableId) {
        await prisma.table.update({
          where: { id: order.tableId },
          data: { status: "AVAILABLE" },
        });
      }

      return NextResponse.json({ success: true, order: updatedOrder });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Billing Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
