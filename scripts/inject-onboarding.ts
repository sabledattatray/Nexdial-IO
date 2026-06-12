import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function main() {
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" }
  });

  if (!adminUser || !adminUser.workspaceId) {
    console.log("No workspace found.");
    return;
  }

  await prisma.workspace.update({
    where: { id: adminUser.workspaceId },
    data: {
      onboardingData: {
        companyName: "NexDial Solutions (Injected)",
        leadSources: ["Website", "Facebook", "Referrals"],
        goals: ["Lead Management", "Sales Pipeline"],
        teamSize: 5
      }
    }
  });

  console.log("Successfully injected onboarding data into Workspace ID:", adminUser.workspaceId);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
