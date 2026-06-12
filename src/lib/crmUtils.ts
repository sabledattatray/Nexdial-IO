/**
 * NexDial CRM Intelligent Priority and Automation Utilities (Version 2 - Self-Learning Engine)
 */

export interface LeadHealth {
  score: number;
  category: 'HOT' | 'WARM' | 'COLD';
  details: string[];
}

export interface NextAction {
  action: string;
  category: 'call' | 'message' | 'schedule' | 'onboard' | 'archive' | 'review' | 'idle';
  description: string;
  reasons: string[];
}

export interface SuggestedFollowUp {
  label: string;
  date: Date | null;
  isoString: string | null;
}

export interface LeadMomentum {
  score: number;
  label: string;
  trend: 'RISING' | 'STABLE' | 'FALLING';
  details: string[];
}

export interface PipelineAnomaly {
  title: string;
  description: string;
  type: 'warning' | 'info' | 'critical';
}

/**
 * Calculates estimated revenue value of a lead based on its tags/attributes
 */
export function getLeadValue(lead: any): number {
  if (!lead) return 1200;
  const tags = lead.tags || [];
  
  if (tags.includes("Enterprise")) return 15000;
  if (tags.includes("High Value")) return 5000;
  if (tags.includes("Fintech")) return 8000;
  if (tags.includes("Real Estate")) return 6000;
  if (tags.includes("Automotive")) return 4000;
  if (tags.includes("Travel")) return 2000;
  
  return 1200; // Default baseline value
}

/**
 * Calculates dynamic weight modifiers based on user ACCEPTED vs SKIPPED feedbacks (Adaptive Learning)
 */
export function calculateAdaptiveWeightModifiers(recommendations: any[]): Record<string, number> {
  const modifiers: Record<string, number> = {
    call: 1.0,
    message: 1.0,
    schedule: 1.0
  };

  if (!recommendations || recommendations.length === 0) return modifiers;

  // Track categories
  const stats: Record<string, { accepted: number; skipped: number; total: number }> = {
    call: { accepted: 0, skipped: 0, total: 0 },
    message: { accepted: 0, skipped: 0, total: 0 },
    schedule: { accepted: 0, skipped: 0, total: 0 }
  };

  recommendations.forEach(rec => {
    const cat = rec.category;
    if (stats[cat] !== undefined) {
      stats[cat].total++;
      if (rec.status === 'FOLLOWED') {
        stats[cat].accepted++;
      } else if (rec.status === 'SKIPPED') {
        stats[cat].skipped++;
      }
    }
  });

  // Calculate modifiers: boost weights for categories that the user frequently accepts/follows
  Object.keys(stats).forEach(cat => {
    const catStats = stats[cat];
    if (catStats.total > 0) {
      const acceptRatio = catStats.accepted / catStats.total;
      // If accept ratio > 70%, boost category weight by up to 25% (+0.25)
      // If accept ratio < 30%, drop category weight by up to 20% (-0.20)
      if (acceptRatio > 0.7) {
        modifiers[cat] = 1.0 + (acceptRatio - 0.7) * 0.8;
      } else if (acceptRatio < 0.3) {
        modifiers[cat] = 1.0 - (0.3 - acceptRatio) * 0.6;
      }
    }
  });

  return modifiers;
}

/**
 * Computes Lead Health Score (0-100) and category (HOT/WARM/COLD)
 * Integrates Adaptive Weight modifiers based on feedback loops
 */
export function calculateLeadHealth(lead: any, feedbackRecommendations: any[] = []): LeadHealth {
  if (!lead) return { score: 0, category: 'COLD', details: [] };
  
  let score = 0;
  const details: string[] = [];

  // Calculate learning weight modifiers from feedback history
  const weightModifiers = calculateAdaptiveWeightModifiers(feedbackRecommendations);
  
  // 1. Stage Weight (Max 40 points)
  const status = lead.status || 'NEW';
  let stageScore = 0;
  if (status === 'NEW') {
    stageScore = 30;
    details.push("+30 Stage: New Lead");
  } else if (status === 'CONTACTED') {
    stageScore = 50;
    details.push("+50 Stage: Contacted");
  } else if (status === 'IN_PROGRESS') {
    stageScore = 70;
    details.push("+70 Stage: In Progress");
  } else if (status === 'INTERESTED') {
    stageScore = 85;
    details.push("+85 Stage: Interested");
  } else if (status === 'CONVERTED') {
    stageScore = 100;
    details.push("+100 Stage: Converted");
  } else if (status === 'LOST') {
    stageScore = 15;
    details.push("+15 Stage: Lost");
  }
  score += stageScore;

  // Converted and Lost leads bypass other modifiers
  if (status === 'CONVERTED') {
    return { score: 100, category: 'HOT', details: ["Lead converted successfully"] };
  }
  if (status === 'LOST') {
    return { score: 15, category: 'COLD', details: ["Lead marked as lost"] };
  }

  // 2. Lead Source Quality (Max 15 points, modified by AI learning weights)
  const source = lead.source || 'MANUAL';
  let sourceScore = 0;
  const modifier = weightModifiers.message; // WhatsApp/Website are message-heavy

  if (source === 'WHATSAPP' || source === 'WEBSITE') {
    sourceScore = Math.round(15 * modifier);
    details.push(`+${sourceScore} Source: High Intent (WhatsApp/Website) [Learned Weight: ${modifier.toFixed(2)}x]`);
  } else if (source === 'FORM' || source === 'CALL') {
    sourceScore = Math.round(10 * weightModifiers.call);
    details.push(`+${sourceScore} Source: Medium Intent (Form/Call) [Learned Weight: ${weightModifiers.call.toFixed(2)}x]`);
  } else {
    sourceScore = 5;
    details.push("+5 Source: Standard Intent");
  }
  score += sourceScore;

  // 3. Tags Urgency Boost (Max 15 points)
  const tags = lead.tags || [];
  if (tags.includes("Hot Lead")) {
    score += 15;
    details.push("+15 Tag: Marked Hot Lead");
  } else if (tags.includes("Enterprise") || tags.includes("High Value")) {
    score += 10;
    details.push("+10 Tag: High Value/Enterprise Segment");
  }

  // 4. Call Interaction Count (Max 15 points, modified by call learning weight)
  const callsCount = lead.calls ? lead.calls.length : 0;
  const callWeight = weightModifiers.call;
  if (callsCount === 0) {
    const createdTime = new Date(lead.createdAt).getTime();
    const hoursSinceCreation = (Date.now() - createdTime) / (1000 * 60 * 60);
    if (hoursSinceCreation > 24) {
      score -= 10;
      details.push("-10 Interactions: No call attempts after 24h");
    } else {
      details.push("0 Interactions: New lead under 24 hours");
    }
  } else if (callsCount === 1) {
    const pts = Math.round(5 * callWeight);
    score += pts;
    details.push(`+${pts} Interactions: 1 call logged [Learned Weight: ${callWeight.toFixed(2)}x]`);
  } else if (callsCount >= 2 && callsCount <= 3) {
    const pts = Math.round(10 * callWeight);
    score += pts;
    details.push(`+${pts} Interactions: Multi-call engagement [Learned Weight: ${callWeight.toFixed(2)}x]`);
  } else if (callsCount >= 4) {
    const pts = Math.round(15 * callWeight);
    score += pts;
    details.push(`+${pts} Interactions: High touch engagement (4+ calls) [Learned Weight: ${callWeight.toFixed(2)}x]`);
  }

  // 5. Recency of Contact (Max 15 points)
  let lastContactDate: Date | null = null;
  if (lead.calls && lead.calls.length > 0) {
    lastContactDate = new Date(lead.calls[0].timestamp);
  }
  if (lead.activities && lead.activities.length > 0) {
    const lastAct = new Date(lead.activities[0].timestamp);
    if (!lastContactDate || lastAct.getTime() > lastContactDate.getTime()) {
      lastContactDate = lastAct;
    }
  }
  if (!lastContactDate) {
    lastContactDate = new Date(lead.updatedAt || lead.createdAt);
  }

  const daysSinceContact = (Date.now() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceContact < 1) {
    score += 15;
    details.push("+15 Recency: Activity within last 24 hours");
  } else if (daysSinceContact < 3) {
    score += 10;
    details.push("+10 Recency: Activity within last 3 days");
  } else if (daysSinceContact < 7) {
    score += 5;
    details.push("+5 Recency: Activity within last week");
  } else if (daysSinceContact >= 10) {
    score -= 15;
    details.push("-15 Recency: Cold lead (No activity in 10+ days)");
  }

  // 6. Overdue Follow-up Penalty
  if (lead.followUpDate) {
    const isOverdue = new Date(lead.followUpDate).getTime() < Date.now();
    if (isOverdue) {
      score -= 25;
      details.push("-25 Schedule: Overdue follow-up");
    } else {
      score += 5;
      details.push("+5 Schedule: Active follow-up scheduled");
    }
  }

  const finalScore = Math.max(0, Math.min(100, score));
  let category: 'HOT' | 'WARM' | 'COLD' = 'WARM';
  if (finalScore >= 80) category = 'HOT';
  else if (finalScore < 50) category = 'COLD';

  return {
    score: finalScore,
    category,
    details
  };
}

/**
 * Computes Lead Momentum Score (0-100) measuring engagement velocity
 */
export function calculateLeadMomentum(lead: any): LeadMomentum {
  if (!lead) return { score: 0, label: "Cold", trend: "FALLING", details: [] };

  let score = 0;
  const details: string[] = [];

  // 1. Activity Frequency in the last 72 hours (Max 50 points)
  const now = Date.now();
  const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
  
  let recentActionsCount = 0;
  
  if (lead.calls) {
    recentActionsCount += lead.calls.filter((c: any) => new Date(c.timestamp).getTime() >= threeDaysAgo).length;
  }
  if (lead.activities) {
    recentActionsCount += lead.activities.filter((a: any) => new Date(a.timestamp).getTime() >= threeDaysAgo).length;
  }

  if (recentActionsCount === 0) {
    score += 0;
    details.push("0 recent activities (last 72h)");
  } else if (recentActionsCount === 1) {
    score += 20;
    details.push("+20: 1 recent activity");
  } else if (recentActionsCount === 2) {
    score += 40;
    details.push("+40: 2 recent activities");
  } else {
    score += 50;
    details.push("+50: High activity frequency (3+ in last 72h)");
  }

  // 2. Interaction Density (Total interactions / Age in days) (Max 30 points)
  const createdTime = new Date(lead.createdAt).getTime();
  const ageInDays = Math.max(1, (now - createdTime) / (1000 * 60 * 60 * 24));
  
  const totalInteractions = (lead.calls?.length || 0) + (lead.activities?.length || 0);
  const density = totalInteractions / ageInDays;

  if (density >= 2.0) {
    score += 30;
    details.push(`+30: Ultra dense interaction rate (${density.toFixed(1)}/day)`);
  } else if (density >= 0.8) {
    score += 20;
    details.push(`+20: Consistent density (${density.toFixed(1)}/day)`);
  } else if (density >= 0.3) {
    score += 10;
    details.push(`+10: Moderate density (${density.toFixed(1)}/day)`);
  } else {
    score += 5;
    details.push(`+5: Low interaction density (${density.toFixed(1)}/day)`);
  }

  // 3. Recency Bonus/Penalty (Max 20 points)
  let lastContactTime = new Date(lead.updatedAt || lead.createdAt).getTime();
  if (lead.calls && lead.calls.length > 0) {
    lastContactTime = Math.max(lastContactTime, new Date(lead.calls[0].timestamp).getTime());
  }
  if (lead.activities && lead.activities.length > 0) {
    lastContactTime = Math.max(lastContactTime, new Date(lead.activities[0].timestamp).getTime());
  }

  const hoursSinceLastContact = (now - lastContactTime) / (1000 * 60 * 60);

  if (hoursSinceLastContact < 12) {
    score += 20;
    details.push("+20 Recency: Inbound/outbound touch under 12h");
  } else if (hoursSinceLastContact < 24) {
    score += 15;
    details.push("+15 Recency: Touch in last 24h");
  } else if (hoursSinceLastContact < 72) {
    score += 10;
    details.push("+10 Recency: Touch in last 3 days");
  } else if (hoursSinceLastContact >= 120) {
    score -= 20;
    details.push("-20 Recency: No touches in last 5 days");
  }

  const finalScore = Math.max(0, Math.min(100, score));
  let label = "Stable";
  let trend: 'RISING' | 'STABLE' | 'FALLING' = 'STABLE';

  if (finalScore >= 80) {
    label = "High Momentum 🚀";
    trend = "RISING";
  } else if (finalScore < 50) {
    label = "Dropping Momentum 📉";
    trend = "FALLING";
  } else {
    label = "Stable Momentum 📈";
    trend = "STABLE";
  }

  return {
    score: finalScore,
    label,
    trend,
    details
  };
}

/**
 * AI Recommended "Next Best Action" heuristic (with Explainable AI reasons)
 */
export function calculateNextBestAction(lead: any): NextAction {
  if (!lead) {
    return {
      action: "Review data",
      category: "review",
      description: "No lead information available.",
      reasons: ["Lead details are missing from payload"]
    };
  }

  const status = lead.status || 'NEW';
  
  if (status === 'CONVERTED') {
    return {
      action: "Onboard and schedule kickoff",
      category: "onboard",
      description: "Lead is converted. Initiate product onboarding and customer success sequence.",
      reasons: ["Lead transitioned to Converted stage", "Finalized sales contract is signed"]
    };
  }
  
  if (status === 'LOST') {
    return {
      action: "Archive — review in 3 months",
      category: "archive",
      description: "Lead is lost. Review database updates or contact in 90 days if context shifts.",
      reasons: ["Lead transitioned to Lost stage", "No answer attempts exceeded threshold limits"]
    };
  }

  // 1. Overdue Follow-up Check
  if (lead.followUpDate) {
    const isOverdue = new Date(lead.followUpDate).getTime() < Date.now();
    if (isOverdue) {
      return {
        action: "Call now — high intent detected",
        category: "call",
        description: "Scheduled follow-up is overdue! Call immediately to prevent interest decay.",
        reasons: [
          "Follow-up scheduled date is in the past",
          "Unresolved tasks decrease lead engagement velocity by 20% daily"
        ]
      };
    }
  }

  // 2. Today's Follow-up
  if (lead.followUpDate) {
    const todayStr = new Date().toDateString();
    const isToday = new Date(lead.followUpDate).toDateString() === todayStr;
    if (isToday) {
      const timeStr = new Date(lead.followUpDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        action: `Call scheduled today at ${timeStr}`,
        category: "call",
        description: `Review lead details and prepare for the call scheduled today at ${timeStr}.`,
        reasons: ["Follow-up schedule matches current date calendar", "Scheduled callback confirmation was sent"]
      };
    }
  }

  // 3. New Stage Logic
  if (status === 'NEW') {
    if (lead.source === 'WHATSAPP') {
      return {
        action: "Send WhatsApp follow-up",
        category: "message",
        description: "Send direct WhatsApp introduction. WhatsApp inbound leads convert 3x faster.",
        reasons: [
          "Lead source is WhatsApp (Highest conversion channel)",
          "Lead registered under 24 hours ago"
        ]
      };
    }
    if (lead.source === 'WEBSITE' || lead.source === 'FORM') {
      return {
        action: "Call now — high intent detected",
        category: "call",
        description: "Inbound website form lead. Initiate dial attempt within 15 minutes of receipt.",
        reasons: [
          "Inbound website inquiry shows active buying intent",
          "Reaching out within 15 minutes yields 8x higher conversion"
        ]
      };
    }
    return {
      action: "Call now — high intent detected",
      category: "call",
      description: "New manual lead created. Make initial contact call to qualify requirements.",
      reasons: ["New lead pending qualification", "Requires initial contact dial verification"]
    };
  }

  // 4. Contacted/In Progress stage but no scheduled follow-up
  if (!lead.followUpDate) {
    const autoTime = calculateSuggestedFollowUp(lead);
    return {
      action: `Schedule follow-up (${autoTime.label})`,
      category: "schedule",
      description: `No follow-up is currently set. Suggested: schedule for ${autoTime.label}.`,
      reasons: [
        "Status is active but no follow-up date is registered",
        "Pipeline leads without schedules run a high risk of going cold"
      ]
    };
  }

  // 5. Future Follow-up scheduled
  const followUpDateStr = new Date(lead.followUpDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return {
    action: `No action needed — Call scheduled ${followUpDateStr}`,
    category: "idle",
    description: `Follow-up is set for ${followUpDateStr}. Monitor and prep materials in the meantime.`,
    reasons: ["Active follow-up date exists in the future", "No immediate task schedule due today"]
  };
}

/**
 * Suggests a follow-up time based on lead details if missing
 */
export function calculateSuggestedFollowUp(lead: any): SuggestedFollowUp {
  if (!lead || lead.status === 'CONVERTED' || lead.status === 'LOST') {
    return { label: "No action needed", date: null, isoString: null };
  }

  const now = new Date();
  const suggestedDate = new Date();

  // If status is NEW, CONTACTED or INTERESTED: suggest tomorrow at 11 AM
  if (lead.status === 'NEW' || lead.status === 'CONTACTED' || lead.status === 'INTERESTED') {
    suggestedDate.setDate(now.getDate() + 1);
    suggestedDate.setHours(11, 0, 0, 0);
  } else {
    // If IN_PROGRESS: suggest in 2 days at 2 PM
    suggestedDate.setDate(now.getDate() + 2);
    suggestedDate.setHours(14, 0, 0, 0);
  }

  // Formatting label
  let label = "";
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  
  if (suggestedDate.toDateString() === tomorrow.toDateString()) {
    const timeStr = suggestedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    label = `Tomorrow ${timeStr}`;
  } else {
    const daysName = suggestedDate.toLocaleDateString(undefined, { weekday: 'short' });
    const timeStr = suggestedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    label = `${daysName} ${timeStr}`;
  }

  return {
    label,
    date: suggestedDate,
    isoString: suggestedDate.toISOString()
  };
}

/**
 * Audits a lead for database cleanliness issues
 */
export function auditLeadCleanliness(lead: any, hasDuplicatePhoneOrEmail = false): string[] {
  if (!lead) return [];
  const warnings: string[] = [];

  // 1. Missing phone/email
  if (!lead.phone) {
    warnings.push("Missing phone");
  }
  if (!lead.email) {
    warnings.push("Missing email");
  }

  // 2. Duplicate Check
  if (hasDuplicatePhoneOrEmail) {
    warnings.push("Duplicate lead detected");
  }

  // 3. Stale Activity
  const now = new Date().getTime();
  let lastActive = new Date(lead.updatedAt || lead.createdAt).getTime();
  
  if (lead.calls && lead.calls.length > 0) {
    lastActive = Math.max(lastActive, new Date(lead.calls[0].timestamp).getTime());
  }
  if (lead.activities && lead.activities.length > 0) {
    lastActive = Math.max(lastActive, new Date(lead.activities[0].timestamp).getTime());
  }

  const daysSinceActivity = (now - lastActive) / (1000 * 60 * 60 * 24);
  const status = lead.status || 'NEW';
  
  if (daysSinceActivity >= 10 && status !== 'CONVERTED' && status !== 'LOST') {
    warnings.push("No activity in 10 days");
  }

  // 4. Stale Source
  const ageInDays = (now - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (status === 'NEW' && ageInDays > 7 && (lead.source === 'CSV' || lead.source === 'MANUAL')) {
    warnings.push("Stale source");
  }

  return warnings;
}

/**
 * Detects CRM pipeline-level anomalies and bottlenecks
 */
export function detectPipelineAnomalies(leads: any[]): PipelineAnomaly[] {
  const anomalies: PipelineAnomaly[] = [];
  if (!leads || leads.length === 0) return anomalies;

  const now = Date.now();
  
  // 1. Interested Stage Bottleneck check
  const interestedLeads = leads.filter(l => l.status === 'INTERESTED');
  let staleInterestedCount = 0;
  
  interestedLeads.forEach(lead => {
    let lastActive = new Date(lead.updatedAt || lead.createdAt).getTime();
    if (lead.calls && lead.calls.length > 0) {
      lastActive = Math.max(lastActive, new Date(lead.calls[0].timestamp).getTime());
    }
    const daysStale = (now - lastActive) / (1000 * 60 * 60 * 24);
    if (daysStale >= 5) {
      staleInterestedCount++;
    }
  });

  if (staleInterestedCount >= 3) {
    anomalies.push({
      title: "Interested Stage Bottleneck",
      description: `${staleInterestedCount} high-intent leads are stuck in INTERESTED status with zero sales activity in the last 5 days.`,
      type: "critical"
    });
  }

  // 2. Data Quality / Leakage warning
  const missingDataLeads = leads.filter(l => !l.phone || !l.email).length;
  const percentageMissing = (missingDataLeads / leads.length) * 100;
  if (percentageMissing >= 25) {
    anomalies.push({
      title: "High Database Incompleteness",
      description: `${percentageMissing.toFixed(0)}% of lead profiles are missing critical phone or email contact credentials.`,
      type: "warning"
    });
  }

  // 3. Stale pipeline schedules
  const activeUnscheduledLeads = leads.filter(l => 
    l.status !== 'CONVERTED' && 
    l.status !== 'LOST' && 
    !l.followUpDate
  ).length;
  
  const percentageUnscheduled = (activeUnscheduledLeads / leads.length) * 100;
  if (percentageUnscheduled >= 30) {
    anomalies.push({
      title: "Schedules Leakage Alert",
      description: `${percentageUnscheduled.toFixed(0)}% of active leads in the pipeline have no scheduled follow-up calendar timelines set.`,
      type: "warning"
    });
  }

  // 4. Conversion Rate Drop Simulation (Static threshold check on demo data)
  const convertedCount = leads.filter(l => l.status === 'CONVERTED').length;
  const lostCount = leads.filter(l => l.status === 'LOST').length;
  const totalClosed = convertedCount + lostCount;
  const winRate = totalClosed > 0 ? (convertedCount / totalClosed) * 100 : 0;
  
  if (winRate < 40 && totalClosed > 0) {
    anomalies.push({
      title: "Win/Loss Ratio Drop",
      description: `Historical pipeline drop-off detected: conversion rate is currently ${winRate.toFixed(0)}% (lower than the 50% target threshold).`,
      type: "critical"
    });
  }

  return anomalies;
}

/**
 * Generates an AI Interaction Summary for the lead profile
 */
export function generateLeadAISummary(lead: any): string {
  if (!lead) return "No data available to summarize.";

  const parts: string[] = [];
  
  // 1. Creation details
  const createdDate = new Date(lead.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' });
  parts.push(`${lead.name} was entered into the CRM on ${createdDate} via ${lead.source.toLowerCase()}.`);
  
  // 2. Status stage
  const statusNames: Record<string, string> = {
    NEW: "New Lead",
    CONTACTED: "Contacted",
    IN_PROGRESS: "In Progress",
    INTERESTED: "Interested",
    CONVERTED: "Converted",
    LOST: "Lost"
  };
  parts.push(`They are currently classified as "${statusNames[lead.status] || lead.status}".`);
  
  // 3. Calls / Interaction history
  const callsCount = lead.calls?.length || 0;
  const noteCount = lead.activities?.filter((a: any) => a.type === 'NOTE_ADDED').length || 0;
  
  if (callsCount > 0) {
    const lastCall = lead.calls[0];
    const callDate = new Date(lastCall.timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' });
    parts.push(`A total of ${callsCount} call${callsCount > 1 ? 's' : ''} have been logged. The most recent outcome was "${lastCall.outcome.replace('_', ' ').toLowerCase()}" on ${callDate}.`);
  } else {
    parts.push(`No direct call attempts have been registered yet.`);
  }
  
  if (noteCount > 0) {
    parts.push(`${noteCount} internal sales note${noteCount > 1 ? 's have' : ' has'} been appended to the lead history.`);
  }
  
  // 4. Follow-up status
  if (lead.followUpDate) {
    const fuDate = new Date(lead.followUpDate);
    const isOverdue = fuDate.getTime() < Date.now();
    const fuStr = fuDate.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    if (isOverdue) {
      parts.push(`CRITICAL: A follow-up was scheduled for ${fuStr} and is now OVERDUE.`);
    } else {
      parts.push(`A follow-up is scheduled for ${fuStr}.`);
    }
  } else {
    if (lead.status !== 'CONVERTED' && lead.status !== 'LOST') {
      parts.push(`No follow-up action is currently scheduled.`);
    }
  }
  
  // 5. Next step recommendation
  const nextAction = calculateNextBestAction(lead);
  parts.push(`Recommended next action: ${nextAction.action}.`);
  
  return parts.join(" ");
}
