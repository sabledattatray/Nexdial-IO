const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        onboarded: true,
        industry: true,
      },
    });

    console.log("\nRegistered Users in DB:");
    console.log("--------------------------------------------------");
    users.forEach((u) => {
      console.log(`- Name:      ${u.name}`);
      console.log(`  Email:     ${u.email}`);
      console.log(`  Onboarded: ${u.onboarded}`);
      console.log(`  Industry:  ${u.industry}`);
      console.log("--------------------------------------------------");
    });
    console.log("");
  } catch (error) {
    console.error("Error fetching users:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
