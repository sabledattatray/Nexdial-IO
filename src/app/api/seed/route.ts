import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if we already seeded
    const count = await prisma.workspace.count();
    if (count > 0) return NextResponse.json({ message: "Already seeded", count });

    // 1. Create a Super Admin User
    const superAdmin = await prisma.user.create({
      data: {
        email: "sabledattatray@gmail.com",
        name: "Sable Dattatray",
        role: "ADMIN",
        onboarded: true,
        workspace: {
          create: {
            name: "NexDial HQ",
            plan: "ENTERPRISE",
            status: "ACTIVE",
          }
        }
      }
    });

    // 2. Create mock clients
    const plans = [
      { name: "TRIAL", price: 0 },
      { name: "SMALL", price: 2900 },
      { name: "MEDIUM", price: 7900 },
      { name: "LARGE", price: 19900 },
      { name: "ENTERPRISE", price: 49900 }
    ];

    const dbPlans = [];
    for (const p of plans) {
      const dbPlan = await prisma.subscriptionPlan.create({
        data: {
          name: p.name,
          slug: p.name.toLowerCase(),
          monthlyPrice: p.price,
          features: { "access": "all" }
        }
      });
      dbPlans.push(dbPlan);
    }

    const mockWorkspaces = [
      { name: "Acme Corp", plan: "LARGE", users: 15, health: 95 },
      { name: "TechNova", plan: "MEDIUM", users: 8, health: 85 },
      { name: "Global Sales LLC", plan: "SMALL", users: 3, health: 40 },
      { name: "Struggling Startup", plan: "TRIAL", users: 1, health: 20 },
      { name: "Mega Enterprise", plan: "ENTERPRISE", users: 50, health: 100 }
    ];

    for (let i = 0; i < mockWorkspaces.length; i++) {
      const w = mockWorkspaces[i];
      const ws = await prisma.workspace.create({
        data: {
          name: w.name,
          plan: w.plan,
          status: "ACTIVE",
          healthScore: w.health,
          lastLoginAt: new Date(),
        }
      });

      // Add a user
      await prisma.user.create({
        data: {
          email: `owner${i}@${w.name.replace(/\s/g, '').toLowerCase()}.com`,
          name: `Owner ${i}`,
          workspaceId: ws.id,
          role: "ADMIN",
        }
      });

      // Add subscription if not trial
      if (w.plan !== "TRIAL") {
        const planObj = dbPlans.find(p => p.name === w.plan);
        if (planObj) {
          await prisma.subscription.create({
            data: {
              workspaceId: ws.id,
              planId: planObj.id,
              status: "ACTIVE",
              startDate: new Date(),
              endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            }
          });

          // Add a transaction
          await prisma.transaction.create({
            data: {
              workspaceId: ws.id,
              amount: planObj.monthlyPrice,
              currency: "INR",
              status: "SUCCESS",
              paymentMethod: "CARD",
            }
          });
        }
      }
    }

    return NextResponse.json({ message: "Seeded successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
