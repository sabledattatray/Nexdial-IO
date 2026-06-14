import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "createOrder") {
      const { tableId } = body;
      const order = await prisma.order.create({
        data: {
          workspaceId: session.user.workspaceId,
          tableId,
          status: "OPEN",
          subtotal: 0,
          tax: 0,
          total: 0,
        },
      });

      if (tableId) {
        await prisma.table.update({
          where: { id: tableId },
          data: { status: "OCCUPIED" },
        });
      }

      return NextResponse.json({ success: true, order });
    }

    if (action === "addItem") {
      const { orderId, menuItemId, quantity, notes } = body;
      
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: menuItemId },
      });

      if (!menuItem) {
        return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
      }

      const orderItem = await prisma.orderItem.create({
        data: {
          orderId,
          menuItemId,
          quantity: parseInt(quantity) || 1,
          priceAtTime: menuItem.price,
          notes,
        },
      });

      // Recalculate totals
      const allItems = await prisma.orderItem.findMany({ where: { orderId } });
      const subtotal = allItems.reduce((acc, item) => acc + (item.priceAtTime * item.quantity), 0);
      
      await prisma.order.update({
        where: { id: orderId },
        data: { subtotal, total: subtotal },
      });

      return NextResponse.json({ success: true, orderItem });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Orders Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
