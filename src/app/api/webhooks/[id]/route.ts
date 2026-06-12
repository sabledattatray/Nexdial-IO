import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");

    const integration = await prisma.integration.findUnique({
      where: { id }
    });

    if (!integration) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    if (integration.secretKey && integration.secretKey !== secret) {
      return NextResponse.json({ error: "Invalid secret key" }, { status: 401 });
    }

    let payload: any = {};
    try {
      payload = await req.json();
    } catch(e) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    let name = "Social Lead";
    let phone = "Unknown Phone";
    let email: string | null = null;
    let leadgenId: string | null = null;

    // Detect if this is a Facebook Lead Ads encrypted payload
    if (payload.object === "page" && Array.isArray(payload.entry)) {
      const entry = payload.entry[0];
      const change = entry?.changes?.[0];
      if (change?.field === "leadgen" && change?.value?.leadgen_id) {
        leadgenId = change.value.leadgen_id;
      }
    }

    if (leadgenId) {
      // Authenticate with Graph API to fetch decrypted lead details
      const creds = integration.credentials as any;
      if (!creds || !creds.accessToken) {
        // If testing/mocking without an access token, use mock values
        console.warn("No access token provided. Using mock data for Leadgen ID: " + leadgenId);
        name = "Facebook Mock Lead";
        phone = "+1234567890";
        email = "mock@fb.com";
      } else {
        const fbRes = await fetch(`https://graph.facebook.com/v19.0/${leadgenId}?access_token=${creds.accessToken}`);
        const fbData = await fbRes.json();
        
        if (fbData.error) {
          throw new Error(`Facebook API Error: ${fbData.error.message}`);
        }

        // Parse standard Lead Ad form fields
        const fieldData: any[] = fbData.field_data || [];
        fieldData.forEach(field => {
          const val = field.values?.[0];
          if (field.name === "full_name" || field.name === "first_name") name = val || name;
          if (field.name === "phone_number") phone = val || phone;
          if (field.name === "email") email = val || email;
        });
      }
    } else {
      // Generic Webhook Fallback
      name = payload.name || payload.full_name || payload.firstName || name;
      phone = payload.phone || payload.phone_number || payload.phoneNumber || phone;
      email = payload.email || payload.email_address || email;
    }

    // --- ROUTING ENGINE ---
    const rules = await prisma.routingRule.findMany({
      where: { workspaceId: integration.workspaceId, isActive: true },
      orderBy: { priority: "asc" }
    });

    let assignedToId: string | undefined;
    const finalTags = [integration.provider];

    for (const rule of rules) {
      const conditions: any[] = (rule.conditions as any[]) || [];
      const actions: any[] = (rule.actions as any[]) || [];
      
      let isMatch = true;
      for (const cond of conditions) {
        let valueToTest = "";
        if (cond.field === "source") valueToTest = integration.provider;
        else if (cond.field === "name") valueToTest = name;
        else if (cond.field === "email") valueToTest = email || "";
        
        const testValue = valueToTest.toLowerCase();
        const expectedValue = (cond.value || "").toLowerCase();

        if (cond.operator === "equals" && testValue !== expectedValue) isMatch = false;
        else if (cond.operator === "contains" && !testValue.includes(expectedValue)) isMatch = false;
        else if (cond.operator === "not_equals" && testValue === expectedValue) isMatch = false;
      }

      if (isMatch && conditions.length > 0) {
        for (const action of actions) {
          if (action.type === "assignTo") assignedToId = action.value;
          else if (action.type === "addTag") finalTags.push(action.value);
        }
        break; // Stop evaluating after first rule matches completely
      }
    }

    // Create the lead in CRM
    const lead = await prisma.lead.create({
      data: {
        workspaceId: integration.workspaceId,
        name,
        phone,
        email,
        source: "WEBSITE", 
        status: "NEW",
        tags: finalTags,
        ...(assignedToId ? { assignedToId } : {})
      }
    });

    // Log the webhook payload
    await prisma.webhookLog.create({
      data: {
        integrationId: integration.id,
        payload,
        status: "SUCCESS"
      }
    });

    // Update integration stats
    await prisma.integration.update({
      where: { id: integration.id },
      data: {
        leadsCount: { increment: 1 },
        lastSyncAt: new Date()
      }
    });

    return NextResponse.json({ success: true, leadId: lead.id });

  } catch (error: any) {
    console.error("Webhook error:", error);
    try {
      const { id } = await context.params;
      await prisma.webhookLog.create({
        data: {
          integrationId: id,
          payload: {},
          status: "ERROR",
          errorMessage: error.message
        }
      });
    } catch(e) {}
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Facebook/Meta Webhook Challenge Verification
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const url = new URL(req.url);
  
  // Facebook sends hub.mode, hub.challenge, and hub.verify_token
  const mode = url.searchParams.get("hub.mode");
  const challenge = url.searchParams.get("hub.challenge");
  const verify_token = url.searchParams.get("hub.verify_token");
  const secret = url.searchParams.get("secret"); // our generic secret logic

  // If this is a Facebook verification request
  if (mode === "subscribe" && challenge) {
    const integration = await prisma.integration.findUnique({
      where: { id }
    });
    
    if (!integration) {
      return new NextResponse("Webhook not found", { status: 404 });
    }

    // Verify the token matches either our URL secret or the integration's secret key
    if (verify_token === integration.secretKey || verify_token === secret) {
      // Facebook expects a raw integer response with the challenge code
      return new NextResponse(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    } else {
      return new NextResponse("Forbidden: Invalid verify token", { status: 403 });
    }
  }

  return new NextResponse("Method Not Allowed", { status: 405 });
}
