import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "nexdial_test_token_123";

/**
 * GET: Required by Meta to verify the webhook endpoint.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[WhatsApp Webhook] Verification successful");
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

/**
 * POST: Receive incoming messages from Meta WhatsApp API.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("[WhatsApp Webhook] Incoming Event:", JSON.stringify(body, null, 2));

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages) {
            // This is an incoming message
            const phoneNumberId = change.value.metadata.phone_number_id;
            for (const message of change.value.messages) {
              const fromPhone = message.from; // Customer's phone number
              const messageText = message.text?.body || "[Media Message]";
              const wamid = message.id;

              console.log(`[WhatsApp Webhook] Received message from ${fromPhone}: ${messageText}`);

              // 1. Find the workspace using the integration or a default for now.
              // In production, we look up `Integration` where phoneNumberId matches.
              // For now, we will fallback to the first active workspace for testing.
              const workspace = await prisma.workspace.findFirst({
                where: { status: "ACTIVE" }
              });

              if (!workspace) continue;

              // 2. Find or create the Lead by phone number
              let lead = await prisma.lead.findFirst({
                where: { phone: fromPhone, workspaceId: workspace.id }
              });

              if (!lead) {
                // Determine source dynamically, create lead
                lead = await prisma.lead.create({
                  data: {
                    workspaceId: workspace.id,
                    name: `New WhatsApp Lead (${fromPhone.slice(-4)})`,
                    phone: fromPhone,
                    source: "WHATSAPP",
                    status: "NEW",
                  }
                });
                
                // Add activity
                await prisma.activity.create({
                  data: {
                    leadId: lead.id,
                    type: "LEAD_CREATED",
                    description: "Lead automatically created via inbound WhatsApp message."
                  }
                });
              }

              // 3. Find or create the Conversation
              let conversation = await prisma.conversation.findUnique({
                where: { leadId_channel: { leadId: lead.id, channel: "WHATSAPP" } }
              });

              if (!conversation) {
                conversation = await prisma.conversation.create({
                  data: {
                    leadId: lead.id,
                    workspaceId: workspace.id,
                    channel: "WHATSAPP",
                  }
                });
              }

              // 4. Save the Message
              await prisma.message.create({
                data: {
                  conversationId: conversation.id,
                  direction: "INBOUND",
                  content: messageText,
                  metaId: wamid,
                  status: "RECEIVED"
                }
              });

              // 5. Update Conversation unread count
              await prisma.conversation.update({
                where: { id: conversation.id },
                data: {
                  unreadCount: { increment: 1 },
                  lastMessageAt: new Date(),
                  status: "OPEN"
                }
              });
            }
          } else if (change.value && change.value.statuses) {
            // This is a message status update (sent, delivered, read)
            for (const statusObj of change.value.statuses) {
              const wamid = statusObj.id;
              const status = statusObj.status; // "sent", "delivered", "read"
              
              const dbMessage = await prisma.message.findUnique({ where: { metaId: wamid } });
              if (dbMessage) {
                await prisma.message.update({
                  where: { id: dbMessage.id },
                  data: { status: status.toUpperCase() }
                });
              }
            }
          }
        }
      }
      return NextResponse.json({ status: "ok" }, { status: 200 });
    } else {
      return NextResponse.json({ status: "not a whatsapp event" }, { status: 404 });
    }
  } catch (error) {
    console.error("[WhatsApp Webhook] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
