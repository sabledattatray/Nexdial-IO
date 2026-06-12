const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("Please provide an email address. Usage: node scripts/reset-user-onboarding.js <email>");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in .env file.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const user = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { onboarded: false },
    });

    console.log(`\n✅ Reset onboarding status to FALSE for: ${user.email}\n`);
  } catch (error) {
    console.error("Error resetting user onboarding status:", error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
