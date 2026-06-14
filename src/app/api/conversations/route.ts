import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    
    if (!dbUser?.workspaceId) {
      return NextResponse.json({ error: "No workspace" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get("leadId");

    const where: any = { workspaceId: dbUser.workspaceId };

    if (leadId) {
      where.leadId = leadId;
    }

    // Role-based access control
    if (user.role === "SALES") {
      where.lead = {
        assignedToId: user.id
      };
    }

    const conversations = await prisma.conversation.findMany({
      where,
      orderBy: {
        lastMessageAt: "desc"
      },
      include: {
        lead: {
          select: { id: true, name: true, phone: true, email: true, status: true }
        },
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("GET Conversations error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
