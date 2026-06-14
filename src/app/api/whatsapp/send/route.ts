import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const body = await req.json();
    const { conversationId, content } = body;

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch conversation and verify ownership/RBAC
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { lead: true }
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Role check: If SALES, ensure they are assigned to this lead
    if (user.role === "SALES" && conversation.lead.assignedToId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Call Meta API to actually send it via WhatsApp
    const apiResult = await sendWhatsAppMessage(conversation.lead.phone, content);

    if (!apiResult.success) {
      return NextResponse.json({ error: "Failed to send message via Meta API" }, { status: 500 });
    }

    // 3. Save outbound message to DB
    const message = await prisma.message.create({
      data: {
        conversationId,
        direction: "OUTBOUND",
        content,
        metaId: apiResult.wamid,
        status: "SENT",
        senderId: user.id
      }
    });

    // 4. Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { 
        lastMessageAt: new Date(),
        status: "OPEN" 
      }
    });

    return NextResponse.json(message);

  } catch (error) {
    console.error("POST WhatsApp Send error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
