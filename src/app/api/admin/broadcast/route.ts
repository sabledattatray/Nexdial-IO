import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !(session.user as any).id || session?.user?.email?.toLowerCase() !== "sabledattatray@gmail.com") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channel, audience, subject, message } = await req.json();

    if (!channel || !audience || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // In a real production scenario, this endpoint would:
    // 1. Fetch all users/workspaces matching the 'audience' segment
    // 2. Queue jobs to an Email/WhatsApp microservice (like BullMQ + SendGrid/Twilio)
    // 3. For now, we simulate the broadcast queuing by logging it to the AuditLog.

    await prisma.auditLog.create({
      data: {
        action: `BROADCAST_QUEUED_${channel}`,
        adminId: (session.user as any).id,
        details: {
          audience,
          subject: subject || null,
          messagePreview: message.substring(0, 100),
          status: "QUEUED"
        }
      }
    });

    return NextResponse.json({ success: true, message: "Broadcast queued successfully" });
  } catch (error) {
    console.error("POST /api/admin/broadcast error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
