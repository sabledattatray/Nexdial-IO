import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.workspaceId) return NextResponse.json({ error: "No workspace" }, { status: 400 });

    const workspace = await prisma.workspace.findUnique({
      where: { id: user.workspaceId }
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    if (!workspace.trialEndsAt) {
      return NextResponse.json({ error: "trial_not_started", message: "15-Day Trial has not been activated." }, { status: 402 });
    }

    const { provider } = await req.json();

    if (!provider) {
      return NextResponse.json({ error: "Provider is required" }, { status: 400 });
    }

    const secretKey = crypto.randomBytes(32).toString("hex");

    const integration = await prisma.integration.create({
      data: {
        workspaceId: user.workspaceId,
        provider,
        secretKey,
        status: "ACTIVE"
      }
    });

    return NextResponse.json(integration);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user?.workspaceId) return NextResponse.json({ error: "No workspace" }, { status: 400 });

    const integrations = await prisma.integration.findMany({
      where: { workspaceId: user.workspaceId },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(integrations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
