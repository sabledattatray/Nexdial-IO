const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in .env file.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const email = "admin@nexdial.io";
  const password = "admin"; // You can change this
  const name = "Admin User";

  console.log("Connecting to database and hashing password...");
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
      },
      create: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("\n-------------------------------------------");
    console.log("✅ Admin User Created/Updated Successfully!");
    console.log(`Email:    ${user.email}`);
    console.log(`Password: ${password}`);
    console.log("-------------------------------------------\n");
  } catch (error) {
    console.error("Database seed error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
