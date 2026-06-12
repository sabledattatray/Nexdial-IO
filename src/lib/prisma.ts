import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient;
  pool: Pool;
};

let prismaClient: PrismaClient;

if (typeof window === "undefined") {
  const connectionString = process.env.DATABASE_URL;

  if (!globalForPrisma.prisma) {
    const pool = new Pool({ 
      connectionString,
      max: 3, // Limit connections to prevent EMAXCONNSESSION
      idleTimeoutMillis: 5000, // Disconnect idle clients quickly
      connectionTimeoutMillis: 2000 // Fail fast if connection cannot be established
    });
    const adapter = new PrismaPg(pool);
    globalForPrisma.pool = pool;
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: ["error", "warn"],
    });
  }

  prismaClient = globalForPrisma.prisma;
} else {
  prismaClient = null as any;
}

export const prisma = prismaClient;

