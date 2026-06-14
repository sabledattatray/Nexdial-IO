import { Lead, Activity, Call } from "@prisma/client";

/**
 * Calculates a determinisic "AI Lead Score" (0-100) and Confidence Certainty (0-100)
 * based on lead interaction history, status, and source.
 */
export function calculateLeadScore(
  lead: Partial<Lead>, 
  activities: Partial<Activity>[] = [], 
  calls: Partial<Call>[] = []
) {
  let score = 50; // Base score
  let certainty = 50; // Base certainty

  // 1. Source Weighting
  if (lead.source === "WHATSAPP") {
    score += 15; // High intent
    certainty += 10;
  } else if (lead.source === "WEBSITE") {
    score += 10;
  } else if (lead.source === "CSV") {
    score -= 10; // Cold data
    certainty -= 20; // Low certainty until contacted
  }

  // 2. Status Progression
  if (lead.status === "INTERESTED") score += 20;
  if (lead.status === "IN_PROGRESS") score += 10;
  if (lead.status === "LOST") score = 5;
  if (lead.status === "CONVERTED") score = 100;

  // 3. Activity Weighting
  const recentActivities = activities.filter(
    (a) => a.timestamp && (Date.now() - new Date(a.timestamp).getTime()) < 14 * 24 * 60 * 60 * 1000
  );
  
  if (recentActivities.length > 0) {
    score += Math.min(recentActivities.length * 2, 15);
    certainty += 20;
  }

  // 4. Stale Penalty
  if (lead.updatedAt) {
    const daysSinceUpdate = (Date.now() - new Date(lead.updatedAt).getTime()) / (1000 * 3600 * 24);
    if (daysSinceUpdate > 7) {
      score -= Math.min(Math.floor(daysSinceUpdate), 20);
      certainty -= 10;
    }
  }

  // 5. Contact Info Completeness
  if (lead.email && lead.phone) {
    certainty += 15;
  } else if (!lead.phone) {
    certainty -= 30; // Very hard to close without phone
    score -= 15;
  }

  // Clamp values
  score = Math.max(0, Math.min(100, Math.round(score)));
  certainty = Math.max(0, Math.min(100, Math.round(certainty)));

  return { score, certainty };
}

/**
 * Generates the "Next Best Action" recommendation based on deterministic rules
 * matching the Surgical AI marketing promise.
 */
export function generateNextBestAction(
  lead: Partial<Lead>, 
  activities: Partial<Activity>[] = []
): { action: string; urgency: "HIGH" | "MEDIUM" | "LOW"; channel: "WHATSAPP" | "CALL" | "EMAIL" | "SYSTEM" } {
  
  // If no contact info
  if (!lead.phone) {
    return {
      action: "Profile incomplete. Research and add phone number to proceed.",
      urgency: "HIGH",
      channel: "SYSTEM"
    };
  }

  // If New
  if (lead.status === "NEW") {
    if (lead.source === "WHATSAPP") {
      return {
        action: "Lead arrived via WhatsApp. Reply immediately while intent is high.",
        urgency: "HIGH",
        channel: "WHATSAPP"
      };
    }
    return {
      action: "Initial outreach required. Send introduction sequence.",
      urgency: "HIGH",
      channel: "CALL"
    };
  }

  // Check Overdue Follow-ups
  if (lead.followUpDate && new Date(lead.followUpDate).getTime() < Date.now()) {
    return {
      action: "Follow-up is overdue. Immediate check-in required.",
      urgency: "HIGH",
      channel: "CALL"
    };
  }

  // Stale In Progress
  if (lead.status === "IN_PROGRESS" && lead.updatedAt) {
    const daysSinceUpdate = (Date.now() - new Date(lead.updatedAt).getTime()) / (1000 * 3600 * 24);
    if (daysSinceUpdate > 3) {
      return {
        action: "Lead has been sitting 'In Progress' for 3+ days. Send Case Study to re-engage.",
        urgency: "MEDIUM",
        channel: "WHATSAPP"
      };
    }
  }

  // Interested but resting
  if (lead.status === "INTERESTED") {
    return {
      action: "Lead is hot. Push for a demo or closing call.",
      urgency: "MEDIUM",
      channel: "CALL"
    };
  }

  // Default maintenance
  return {
    action: "Nurture lead. Send monthly newsletter or industry update.",
    urgency: "LOW",
    channel: "EMAIL"
  };
}
