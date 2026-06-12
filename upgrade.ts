import 'dotenv/config'
import { prisma } from './src/lib/prisma';

async function main() {
  const result = await prisma.user.updateMany({
    data: { role: 'ADMIN', onboarded: true }
  })
  console.log(`Upgraded ${result.count} users to ADMIN and onboarded=true`)
}
main()
