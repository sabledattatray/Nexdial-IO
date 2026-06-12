import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getLeadValue, detectPipelineAnomalies, calculateLeadMomentum } from "@/lib/crmUtils";

export async function GET(req: Request) {
  try {
    const session = await getAuthenticatedSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;
    const leadFilters: any = {};
    
    // SALES role only sees metrics for their assigned leads
    if (user.role === "SALES") {
      leadFilters.assignedToId = user.id;
    }

    const now = new Date();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Run parallel server-side COUNT queries (database aggregation)
    const [
      totalLeads,
      newLeads,
      converted,
      lost,
      overdueFollowUps,
      todayFollowUpsCount,
      hotLeadsCount,
      statusCountsData,
    ] = await Promise.all([
      // Total Leads
      prisma.lead.count({
        where: leadFilters,
      }),
      // New Leads in last 24h
      prisma.lead.count({
        where: {
          ...leadFilters,
          createdAt: {
            gte: twentyFourHoursAgo,
          },
        },
      }),
      // Converted Leads
      prisma.lead.count({
        where: {
          ...leadFilters,
          status: "CONVERTED",
        },
      }),
      // Lost Leads
      prisma.lead.count({
        where: {
          ...leadFilters,
          status: "LOST",
        },
      }),
      // Overdue Follow-ups (scheduledAt in past and PENDING)
      prisma.followUp.count({
        where: {
          status: "PENDING",
          scheduledAt: {
            lt: now,
          },
          lead: user.role === "SALES" ? { assignedToId: user.id } : undefined,
        },
      }),
      // Today's Follow-ups count
      prisma.followUp.count({
        where: {
          status: "PENDING",
          scheduledAt: {
            gte: todayStart,
            lte: todayEnd,
          },
          lead: user.role === "SALES" ? { assignedToId: user.id } : undefined,
        },
      }),
      // Hot Leads Count
      prisma.lead.count({
        where: {
          ...leadFilters,
          tags: {
            has: "Hot Lead",
          },
        },
      }),
      // Status aggregation counts
      prisma.lead.groupBy({
        by: ["status"],
        where: leadFilters,
        _count: {
          id: true,
        },
      }),
    ]);

    // Map status counts to an easy-to-use key-value object
    const statusCounts = statusCountsData.reduce((acc: any, curr: any) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {});

    // Retrieve leads to run calculations
    const allLeadsForMetrics = await prisma.lead.findMany({
      where: leadFilters,
      include: {
        calls: {
          orderBy: { timestamp: "desc" },
        },
        activities: {
          orderBy: { timestamp: "desc" },
        },
      },
    });

    let conservativeRevenue = 0;
    let realisticRevenue = 0;
    let aggressiveRevenue = 0;
    let totalPipeline = 0; // Unweighted active pipeline
    let closedRevenue = 0; // Closed Won
    let lostOpportunity = 0; // Closed Lost
    let thisWeekPredictedClosings = 0; // Weighted follow-up this week (realistic)

    const startOfWeek = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    // Three-tiered stage probabilities
    const conservativeProbabilities: Record<string, number> = {
      NEW: 0.05,
      CONTACTED: 0.15,
      IN_PROGRESS: 0.35,
      INTERESTED: 0.55,
    };

    const realisticProbabilities: Record<string, number> = {
      NEW: 0.10,
      CONTACTED: 0.25,
      IN_PROGRESS: 0.50,
      INTERESTED: 0.75,
    };

    const aggressiveProbabilities: Record<string, number> = {
      NEW: 0.20,
      CONTACTED: 0.45,
      IN_PROGRESS: 0.70,
      INTERESTED: 0.90,
    };

    // Calculate AI Certainty metrics
    let activeLeadsCertaintySum = 0;
    let activeLeadsCount = 0;

    allLeadsForMetrics.forEach((lead) => {
      const val = getLeadValue(lead);

      if (lead.status === "CONVERTED") {
        closedRevenue += val;
      } else if (lead.status === "LOST") {
        lostOpportunity += val;
      } else {
        totalPipeline += val;
        
        const cProb = conservativeProbabilities[lead.status] || 0;
        const rProb = realisticProbabilities[lead.status] || 0;
        const aProb = aggressiveProbabilities[lead.status] || 0;

        conservativeRevenue += val * cProb;
        realisticRevenue += val * rProb;
        aggressiveRevenue += val * aProb;

        if (lead.followUpDate) {
          const fuTime = new Date(lead.followUpDate).getTime();
          if (fuTime >= startOfWeek.getTime() && fuTime <= endOfWeek.getTime()) {
            thisWeekPredictedClosings += val * rProb;
          }
        }

        // Calculate lead certainty score
        // +40% for scheduled followUpDate in the future (not overdue)
        // +30% for having phone and email (cleanliness)
        // +30% for high momentum
        let leadCertainty = 0;
        
        if (lead.followUpDate) {
          const isOverdue = new Date(lead.followUpDate).getTime() < Date.now();
          if (!isOverdue) {
            leadCertainty += 40;
          }
        }
        if (lead.phone && lead.email) {
          leadCertainty += 30;
        } else if (lead.phone || lead.email) {
          leadCertainty += 15;
        }
        
        const momentum = calculateLeadMomentum(lead);
        if (momentum.score >= 80) {
          leadCertainty += 30;
        } else if (momentum.score >= 50) {
          leadCertainty += 20;
        } else {
          leadCertainty += 5;
        }

        activeLeadsCertaintySum += leadCertainty;
        activeLeadsCount++;
      }
    });

    const aiCertainty = activeLeadsCount > 0 
      ? Math.round(activeLeadsCertaintySum / activeLeadsCount) 
      : 100;

    // Detect anomalies
    const anomalies = detectPipelineAnomalies(allLeadsForMetrics);

    return NextResponse.json({
      totalLeads,
      newLeads,
      converted,
      lost,
      overdueFollowUps,
      todayFollowUpsCount,
      hotLeadsCount,
      statusCounts,
      forecast: {
        conservative: Math.round(conservativeRevenue),
        realistic: Math.round(realisticRevenue),
        aggressive: Math.round(aggressiveRevenue),
        aiCertainty,
        totalPipeline: Math.round(totalPipeline),
        closedRevenue: Math.round(closedRevenue),
        lostOpportunity: Math.round(lostOpportunity),
        thisWeekPredictedClosings: Math.round(thisWeekPredictedClosings),
      },
      anomalies,
    });
  } catch (error) {
    console.error("GET Dashboard error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
