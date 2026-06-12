const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const users = await prisma.user.findMany();
    console.log("Users in DB:");
    users.forEach(u => console.log(`- ID: ${u.id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`));

    const leadsCount = await prisma.lead.count();
    console.log("Total leads in DB:", leadsCount);

    const leads = await prisma.lead.findMany({ take: 5 });
    console.log("Sample Leads:");
    leads.forEach(l => console.log(`- Name: ${l.name}, AssignedTo: ${l.assignedToId}, Status: ${l.status}`));

  } catch (error) {
    console.error("Error inspecting DB:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
