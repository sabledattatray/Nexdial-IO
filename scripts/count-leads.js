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
    for (const u of users) {
      const count = await prisma.lead.count({ where: { assignedToId: u.id } });
      console.log(`- User: ${u.email} (ID: ${u.id}), Role: ${u.role}, Assigned Leads: ${count}`);
    }

    const unassignedCount = await prisma.lead.count({ where: { assignedToId: null } });
    console.log(`- Unassigned Leads: ${unassignedCount}`);

    const allLeads = await prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        assignedToId: true,
        status: true,
      }
    });
    console.log("\nTotal leads count:", allLeads.length);

  } catch (error) {
    console.error("Error inspecting DB:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
