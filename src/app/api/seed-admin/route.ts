import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hash = await bcrypt.hash("admin123", 10);
    
    let workspace = await prisma.workspace.findFirst({ where: { name: "Local Dev Workspace" } });
    if (!workspace) {
      workspace = await prisma.workspace.create({ data: { name: "Local Dev Workspace", plan: "PRO" } });
    }

    const user = await prisma.user.upsert({
      where: { email: "admin@nexdial.io" },
      update: { password: hash, onboarded: true, role: "ADMIN", workspaceId: workspace.id },
      create: {
        email: "admin@nexdial.io",
        name: "Local Admin",
        password: hash,
        onboarded: true,
        role: "ADMIN",
        workspaceId: workspace.id
      }
    });

    return NextResponse.json({ success: true, email: user.email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
