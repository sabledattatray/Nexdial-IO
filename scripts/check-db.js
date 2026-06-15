const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ 
  connectionString: "postgresql://postgres.pgmnnlufpfyrhgdzzuje:Dattatray%401511@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  max: 2,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, workspaceId: true, onboarded: true }
  });
  console.log("=== USERS ===");
  users.forEach(u => console.log(`  ${u.email} | workspace: ${u.workspaceId} | onboarded: ${u.onboarded}`));

  const workspaces = await prisma.workspace.findMany({
    select: { id: true, name: true, status: true }
  });
  console.log("\n=== WORKSPACES ===");
  workspaces.forEach(w => console.log(`  ${w.id} | ${w.name} | ${w.status}`));

  const convs = await prisma.conversation.findMany({
    select: { id: true, workspaceId: true, channel: true, unreadCount: true }
  });
  console.log("\n=== CONVERSATIONS ===");
  convs.forEach(c => console.log(`  ${c.id} | workspace: ${c.workspaceId} | unread: ${c.unreadCount}`));

  await prisma.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e.message); process.exit(1); });
