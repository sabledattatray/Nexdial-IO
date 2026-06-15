const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ 
  connectionString: "postgresql://postgres.pgmnnlufpfyrhgdzzuje:Dattatray%401511@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  max: 2,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const TARGET_WORKSPACE = "cmqe3n9wh000004jr9wo6m1fq"; // getnexdial@gmail.com's workspace

async function main() {
  // Find or create lead
  let lead = await prisma.lead.findFirst({
    where: { phone: "918010803756", workspaceId: TARGET_WORKSPACE }
  });

  if (!lead) {
    lead = await prisma.lead.create({
      data: {
        workspaceId: TARGET_WORKSPACE,
        name: "Datta Sable (WhatsApp Test)",
        phone: "918010803756",
        source: "WHATSAPP",
        status: "NEW",
      }
    });
    console.log("Created lead:", lead.id);
  } else {
    console.log("Found existing lead:", lead.id);
  }

  // Find or create conversation
  let conv = await prisma.conversation.findUnique({
    where: { leadId_channel: { leadId: lead.id, channel: "WHATSAPP" } }
  });

  if (!conv) {
    conv = await prisma.conversation.create({
      data: {
        leadId: lead.id,
        workspaceId: TARGET_WORKSPACE,
        channel: "WHATSAPP",
      }
    });
    console.log("Created conversation:", conv.id);
  } else {
    console.log("Found existing conversation:", conv.id);
  }

  // Add a test message
  const msg = await prisma.message.create({
    data: {
      conversationId: conv.id,
      direction: "INBOUND",
      content: "hi (test from WhatsApp)",
      status: "RECEIVED",
    }
  });

  await prisma.conversation.update({
    where: { id: conv.id },
    data: { unreadCount: { increment: 1 }, lastMessageAt: new Date() }
  });

  console.log("✅ Message created:", msg.id);
  console.log("✅ Now check nexdial.io/crm/inbox logged in as getnexdial@gmail.com!");

  await prisma.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e.message); process.exit(1); });
