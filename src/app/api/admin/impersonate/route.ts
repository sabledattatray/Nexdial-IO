// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { workspaceId } = await req.json();

    if (!workspaceId) {
      return new NextResponse("workspaceId is required", { status: 400 });
    }

    // Verify workspace exists
    const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!workspace) {
      return new NextResponse("Workspace not found", { status: 404 });
    }

    // Update the admin's workspace pointer
    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { workspaceId }
    });

    // Record the impersonation in the audit logs
    await prisma.auditLog.create({
      data: {
        action: "IMPERSONATION_STARTED",
        adminId: (session.user as any).id,
        workspaceId,
        details: { adminEmail: (session.user as any).email, targetWorkspaceName: workspace.name }
      }
    });

    return NextResponse.json({ success: true, workspaceName: workspace.name });
  } catch (error) {
    console.error("POST /api/admin/impersonate error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
