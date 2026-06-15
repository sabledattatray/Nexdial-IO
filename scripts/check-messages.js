const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("\n=== CONVERSATIONS ===");
  const conversations = await prisma.conversation.findMany({
    include: {
      lead: true,
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  for (const c of conversations) {
    console.log(`\nConversation ID: ${c.id}`);
    console.log(`Lead: ${c.lead.name} (${c.lead.phone})`);
    console.log(`Workspace ID: ${c.workspaceId}`);
    console.log(`Status: ${c.status}, Unread: ${c.unreadCount}`);
    console.log("Messages:");
    for (const m of c.messages) {
      console.log(`  [${m.createdAt.toISOString()}] ${m.direction}: ${m.content} (Status: ${m.status}, MetaId: ${m.metaId})`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
