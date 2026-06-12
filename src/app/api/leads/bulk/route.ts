import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }

    const user = session.user as any;

    if (user.role === "VIEWER") {
      return NextResponse.json(
        { error: "Forbidden. Viewers cannot import leads." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const rawLeads = body.leads;

    if (!rawLeads || !Array.isArray(rawLeads) || rawLeads.length === 0) {
      return NextResponse.json({ error: "No leads data provided." }, { status: 400 });
    }

    if (!user.workspaceId) {
      return NextResponse.json({ error: "Workspace assignment required to import leads." }, { status: 400 });
    }

    // Prepare leads payload
    const leadsData = rawLeads.map((item: any) => {
      // Normalize source
      const sourceParam = item.source || "CSV";
      const normalizedSource = sourceParam.toUpperCase().replace(/[\s-]+/g, "_");
      const validSources = ["WHATSAPP", "CALL", "FORM", "MANUAL", "CSV", "WEBSITE"];
      const source = validSources.includes(normalizedSource) ? normalizedSource : "CSV";

      let assignedId = item.assignedToId || null;
      if (user.role === "SALES") {
        assignedId = user.id;
      }

      return {
        name: item.name || "Unknown Lead",
        phone: item.phone || "",
        email: item.email || null,
        source: source as any,
        status: "NEW" as const,
        workspaceId: user.workspaceId,
        assignedToId: assignedId,
        tags: item.tags || ["Imported"],
      };
    });

    // Run createMany in transaction
    const result = await prisma.lead.createMany({
      data: leadsData,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${result.count} leads.`,
      count: result.count,
    });
  } catch (error) {
    console.error("POST Bulk Leads error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
