import { prisma } from "../src/lib/prisma";

async function run() {
  const ws = await prisma.workspace.findFirst();
  if (!ws) {
    console.log("No workspace found");
    return;
  }

  let integration = await prisma.integration.findFirst({ where: { provider: "facebook" } });
  if (!integration) {
    integration = await prisma.integration.create({
      data: {
        workspaceId: ws.id,
        provider: "facebook",
        secretKey: "test-secret"
      }
    });
  }

  const payload = {
    object: "page",
    entry: [
      {
        id: "PAGE_ID",
        time: 1680000000,
        changes: [
          {
            field: "leadgen",
            value: {
              ad_id: "AD_ID",
              form_id: "FORM_ID",
              leadgen_id: "mock-leadgen-12345",
              created_time: 1680000000,
              page_id: "PAGE_ID"
            }
          }
        ]
      }
    ]
  };

  const url = `http://localhost:3000/api/webhooks/${integration.id}?secret=test-secret`;
  console.log(`Pinging ${url}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  console.log(`Status: ${res.status}`);
  console.log(`Response: ${text}`);

  const lead = await prisma.lead.findFirst({
    where: { name: "Facebook Mock Lead" }
  });

  if (lead) {
    console.log("SUCCESS: Lead created in database!");
    console.log(lead);
  } else {
    console.log("FAILURE: Lead not found in database.");
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
