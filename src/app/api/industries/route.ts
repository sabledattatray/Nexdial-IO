import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.industryCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        industries: {
          orderBy: { name: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Fetch Industries Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { categoryId, name, slug, icon, isPopular, pipelineStages, leadSources } = body;

    const newIndustry = await prisma.industry.create({
      data: {
        categoryId,
        name,
        slug,
        icon,
        isPopular,
        pipelineStages,
        leadSources,
      },
    });

    return NextResponse.json({ success: true, industry: newIndustry });
  } catch (error) {
    console.error("Create Industry Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
