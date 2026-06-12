import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.user.updateMany({
      data: { role: 'ADMIN', onboarded: true }
    });
    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
