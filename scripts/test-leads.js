const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function testLeads(email) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log(`User ${email} not found.`);
      return;
    }

    console.log(`\nTesting leads query for: ${user.email} (Role: ${user.role}, ID: ${user.id})`);

    const where = {};
    if (user.role === "SALES") {
      where.assignedToId = user.id;
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    console.log(`Found ${leads.length} leads under filters:`, JSON.stringify(where));
    if (leads.length > 0) {
      console.log("Sample lead name:", leads[0].name);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

async function run() {
  await testLeads("priymarathi@gmail.com");
  await testLeads("sabledattatray@gmail.com");
  await testLeads("admin@nexdial.io");
}

run();
