const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const targetConvId = "cmqeff58m00001cev56enjw6n"; // Datta Sable (WhatsApp Test) in Mr Bean's Workspace
  const sourceConvId = "cmqeeleh4000104jrpbhf6s5b"; // New WhatsApp Lead (3756) in the other workspace
  const duplicateLeadId = "75fb36f5-2ef4-43d1-ba86-7c32e6cfd456";

  console.log("Moving messages from duplicate conversation to target...");
  
  // Update messages to point to target conversation
  const updatedMessages = await prisma.message.updateMany({
    where: { conversationId: sourceConvId },
    data: { conversationId: targetConvId }
  });
  console.log(`Moved ${updatedMessages.count} messages.`);

  // Delete duplicate conversation
  console.log("Deleting duplicate conversation...");
  await prisma.conversation.delete({
    where: { id: sourceConvId }
  });

  // Delete duplicate lead
  console.log("Deleting duplicate lead...");
  await prisma.lead.delete({
    where: { id: duplicateLeadId }
  });

  // Reset unread count of target conversation and count messages
  console.log("Updating target conversation stats...");
  const msgCount = await prisma.message.count({
    where: { conversationId: targetConvId, direction: "INBOUND", status: "RECEIVED" }
  });
  
  await prisma.conversation.update({
    where: { id: targetConvId },
    data: {
      unreadCount: msgCount,
      lastMessageAt: new Date()
    }
  });

  console.log("✅ Cleanup and merge completed successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
