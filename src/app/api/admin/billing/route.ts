import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAuthenticatedSession();
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch active subscriptions with plans
    const subscriptions = await prisma.subscription.findMany({
      where: { status: "ACTIVE" },
      include: {
        plan: true,
        workspace: true
      }
    });

    const activeSubscriptionsCount = subscriptions.length;

    // Calculate MRR and ARR
    let mrr = 0;
    subscriptions.forEach(sub => {
      mrr += sub.plan.monthlyPrice;
    });
    const arr = mrr * 12;

    // Fetch transactions (for failed payments and revenue chart)
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        workspace: true
      }
    });

    const failedPayments = transactions.filter(t => t.status === "FAILED").length;
    const recentTransactions = transactions.slice(0, 5);

    // Group transactions by month for Revenue Chart (Mocking slightly if not enough data)
    const revenueByMonth: Record<string, number> = {};
    transactions.forEach(t => {
      if (t.status === "SUCCESS") {
        const month = new Date(t.createdAt).toLocaleString('default', { month: 'short' });
        revenueByMonth[month] = (revenueByMonth[month] || 0) + t.amount;
      }
    });
    
    // Format for chart
    const revenueChartData = Object.keys(revenueByMonth).map(month => ({
      name: month,
      revenue: revenueByMonth[month]
    })).reverse();

    // If no chart data, provide a flatline or empty array
    if (revenueChartData.length === 0) {
       const thisMonth = new Date().toLocaleString('default', { month: 'short' });
       revenueChartData.push({ name: thisMonth, revenue: 0 });
    }

    // Trial conversion rate
    const totalWorkspaces = await prisma.workspace.count();
    const trialWorkspaces = await prisma.workspace.count({ where: { plan: "TRIAL" } });
    const paidWorkspaces = totalWorkspaces - trialWorkspaces;
    
    const trialConversionRate = totalWorkspaces > 0 ? ((paidWorkspaces / totalWorkspaces) * 100).toFixed(1) : 0;

    return NextResponse.json({
      mrr,
      arr,
      activeSubscriptionsCount,
      failedPayments,
      trialConversionRate,
      revenueChartData,
      recentTransactions
    });

  } catch (error) {
    console.error("Billing API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
