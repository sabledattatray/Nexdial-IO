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

  console.log("Connecting to database for full reset...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Clearing all data from database tables...");
    
    // Delete in order of dependencies (child records first)
    const delRecs = await prisma.aIRecommendation.deleteMany({});
    console.log(`- Deleted ${delRecs.count} AI Recommendations`);

    const delFollowUps = await prisma.followUp.deleteMany({});
    console.log(`- Deleted ${delFollowUps.count} Follow-ups`);

    const delCalls = await prisma.call.deleteMany({});
    console.log(`- Deleted ${delCalls.count} Call logs`);

    const delActivities = await prisma.activity.deleteMany({});
    console.log(`- Deleted ${delActivities.count} Activity logs`);

    const delLeads = await prisma.lead.deleteMany({});
    console.log(`- Deleted ${delLeads.count} Leads`);

    const delUsers = await prisma.user.deleteMany({});
    console.log(`- Deleted ${delUsers.count} Users`);

    console.log("\nRecreating default Admin User (admin@nexdial.io)...");
    const hashedPassword = await bcrypt.hash("admin", 12);
    
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@nexdial.io",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
        onboarded: false,
      },
    });

    console.log("--------------------------------------------------");
    console.log("✅ Database Reset Complete & Fresh Admin Created!");
    console.log(`Email:    ${adminUser.email}`);
    console.log(`Password: admin`);
    console.log("--------------------------------------------------\n");

  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
