import { prisma } from "@/lib/prisma";
import { LeadSource, LeadStatus, CallType, CallOutcome, FollowUpStatus } from "@prisma/client";

interface SeedLeadTemplate {
  name: string;
  phone: string;
  email: string | null;
  source: LeadSource;
  status: LeadStatus;
  tags: string[];
  notes: string[];
  daysOffset: number;
  callOutcome?: CallOutcome;
  followUpOffset?: number;
  followUpNotes?: string;
  followUpStatus?: FollowUpStatus;
  recommendations?: Array<{ text: string; category: string }>;
}

const templates: Record<string, SeedLeadTemplate[]> = {
  real_estate: [
    {
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      email: "arjun.mehta@techcorp.in",
      source: "WEBSITE",
      status: "NEW",
      tags: ["Hot Lead", "3BHK Baner"],
      notes: ["Looking for a 3BHK flat in Baner, Pune. Budget around 1.5 Cr.", "Preferred floor: higher floors with a scenic view."],
      daysOffset: 0,
      followUpOffset: 0,
      followUpNotes: "Call back to discuss available inventory and send brochure.",
      recommendations: [{ text: "Send scenic higher-floor 3BHK listings in Baner", category: "Property Match" }]
    },
    {
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      email: "s.jenkins@apexmedia.co",
      source: "FORM",
      status: "NEW",
      tags: ["Commercial", "Office Space"],
      notes: ["Wants virtual tour of commercial office space in Mumbai (10,000 sq ft).", "Company size: 45 employees."],
      daysOffset: 1,
      followUpOffset: 0,
      followUpNotes: "Arrange Zoom call for virtual walkthrough of the business hub.",
      recommendations: [{ text: "Prepare commercial pitch deck for 10k sq ft workspaces", category: "SOP Pitch" }]
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.k@innovate.co.in",
      source: "WHATSAPP",
      status: "CONTACTED",
      tags: ["WhatsApp", "Plot Inquiry"],
      notes: ["Messaged on WhatsApp asking about land plots near Navi Mumbai airport.", "Wants to check legal title clearances."],
      daysOffset: 2,
      callOutcome: "CALLBACK",
      followUpOffset: -2,
      followUpNotes: "Send land zoning papers and title certificate.",
      recommendations: [{ text: "Request Title Clearance documents from legal cell", category: "Legal Verification" }]
    },
    {
      name: "Emily Thompson",
      phone: "+44 20 7946 0192",
      email: "emily.t@growthflow.io",
      source: "CALL",
      status: "IN_PROGRESS",
      tags: ["Villa Buyer"],
      notes: ["Discussed premium villas in Lonavala.", "Budget 3.5 Cr. Wants private pool."],
      daysOffset: 3,
      callOutcome: "INTERESTED",
      followUpOffset: 3,
      followUpNotes: "Schedule physical site visit with local sales executive.",
      recommendations: [{ text: "Coordinate site visit with Lonavala field coordinator", category: "Inspection" }]
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99887 76655",
      email: "vikram@malhotratex.com",
      source: "MANUAL",
      status: "INTERESTED",
      tags: ["Negotiation", "Penthouse"],
      notes: ["Negotiating final cost for the duplex penthouse in Ashoknagar.", "Wants custom interior layout configuration changes."],
      daysOffset: 4,
      callOutcome: "CALLBACK",
      followUpOffset: 1,
      followUpNotes: "Review custom interior layout blueprints with architect.",
      recommendations: [{ text: "Submit customization request to design team", category: "Customization" }]
    },
    {
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      email: "dchen@sierrasolutions.net",
      source: "CSV",
      status: "CONVERTED",
      tags: ["Closed Won", "Studio Flat"],
      notes: ["Purchased 2 studio rental flats in Bengaluru for investment portfolio."],
      daysOffset: 7,
      callOutcome: "CONVERTED"
    },
    {
      name: "Priya Sharma",
      phone: "+91 76543 21098",
      email: "priya@zenithcosmetics.in",
      source: "WEBSITE",
      status: "LOST",
      tags: ["Budget Issues"],
      notes: ["Looking for budget apartments under 40 Lakhs.", "Closed as lost due to lack of inventory in requested locations."],
      daysOffset: 10,
      callOutcome: "NOT_INTERESTED"
    }
  ],
  marketing: [
    {
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      email: "arjun.mehta@techcorp.in",
      source: "WEBSITE",
      status: "NEW",
      tags: ["SEO Client", "E-commerce"],
      notes: ["Needs monthly SEO & Google Ads management. Budget 1.2 Lakhs/month.", "E-commerce store selling organic wellness products."],
      daysOffset: 0,
      followUpOffset: 0,
      followUpNotes: "Call back with introductory e-commerce audit report.",
      recommendations: [{ text: "Perform competitive organic ranking analysis on wellness queries", category: "Audit" }]
    },
    {
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      email: "s.jenkins@apexmedia.co",
      source: "FORM",
      status: "NEW",
      tags: ["Social Media", "Meta Ads"],
      notes: ["Wants to run lead generation campaigns on Meta (Facebook & Instagram).", "Estimated monthly spend: $5,000."],
      daysOffset: 1,
      followUpOffset: 0,
      followUpNotes: "Prepare Meta Ads portfolio proposal and cost sheet.",
      recommendations: [{ text: "Send sample lead generation case studies from similar industries", category: "Case Study" }]
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.k@innovate.co.in",
      source: "WHATSAPP",
      status: "CONTACTED",
      tags: ["WhatsApp", "Web Dev"],
      notes: ["Messaged asking for website redesign and WordPress to Next.js migration.", "Wants premium responsive design and ultra-fast page speeds."],
      daysOffset: 2,
      callOutcome: "CALLBACK",
      followUpOffset: -2,
      followUpNotes: "Send technical spec sheet and outline budget brackets.",
      recommendations: [{ text: "Prepare Next.js migration roadmap and speed benchmarks", category: "Tech Pitch" }]
    },
    {
      name: "Emily Thompson",
      phone: "+44 20 7946 0192",
      email: "emily.t@growthflow.io",
      source: "CALL",
      status: "IN_PROGRESS",
      tags: ["Branding", "Logo Design"],
      notes: ["Discussed rebranding project for logistics startup.", "Wants new corporate identity, brand guidelines, and fresh visual assets."],
      daysOffset: 3,
      callOutcome: "INTERESTED",
      followUpOffset: 3,
      followUpNotes: "Arrange call with lead UI/UX designer.",
      recommendations: [{ text: "Schedule identity mood board presentation session", category: "Design Consultation" }]
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99887 76655",
      email: "vikram@malhotratex.com",
      source: "MANUAL",
      status: "INTERESTED",
      tags: ["Retainer Contract"],
      notes: ["Negotiating a 12-month full-service digital marketing retainer.", "Wants discount on standard package pricing."],
      daysOffset: 4,
      callOutcome: "CALLBACK",
      followUpOffset: 1,
      followUpNotes: "Draft optimized retainer contract with 10% volume discount.",
      recommendations: [{ text: "Calculate margins for 12-month full-funnel retainer", category: "Commercials" }]
    },
    {
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      email: "dchen@sierrasolutions.net",
      source: "CSV",
      status: "CONVERTED",
      tags: ["Closed Won", "Google Ads"],
      notes: ["Purchased initial Setup + 3 Months PPC campaign management bundle."],
      daysOffset: 7,
      callOutcome: "CONVERTED"
    },
    {
      name: "Priya Sharma",
      phone: "+91 76543 21098",
      email: "priya@zenithcosmetics.in",
      source: "WEBSITE",
      status: "LOST",
      tags: ["Low Budget"],
      notes: ["Requested SEO packages.", "Lost because their budget ($150/mo) is below our minimum agency retainer."],
      daysOffset: 10,
      callOutcome: "NOT_INTERESTED"
    }
  ],
  education: [
    {
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      email: "arjun.mehta@techcorp.in",
      source: "WEBSITE",
      status: "NEW",
      tags: ["Study Abroad", "Germany"],
      notes: ["Inquiring about MS in Computer Science in Germany. Target intake: Fall 2027.", "Has a CGPA of 8.2 and wants advice on public universities and test requirements."],
      daysOffset: 0,
      followUpOffset: 0,
      followUpNotes: "Call back to discuss public vs private university criteria and schedule intake session.",
      recommendations: [{ text: "Send eligibility document for German public university applications", category: "Admissions" }]
    },
    {
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      email: "s.jenkins@apexmedia.co",
      source: "FORM",
      status: "NEW",
      tags: ["MBBS Abroad", "Georgia"],
      notes: ["Needs counselling for MBBS program in Georgia/Eastern Europe.", "Budget around 25-30 Lakhs total package including hostel."],
      daysOffset: 1,
      followUpOffset: 0,
      followUpNotes: "Share fee structure charts of WHO/NMC approved Georgian medical academies.",
      recommendations: [{ text: "Email medical college brochure list with tuition outlays", category: "Curriculum" }]
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.k@innovate.co.in",
      source: "WHATSAPP",
      status: "CONTACTED",
      tags: ["WhatsApp", "IELTS Coaching"],
      notes: ["Messaged asking for details on online IELTS batches and score guarantees.", "Target score: 7.5 bands minimum for Canada PR application."],
      daysOffset: 2,
      callOutcome: "CALLBACK",
      followUpOffset: -2,
      followUpNotes: "Send online course curriculum, schedule diagnostic test and batch slots.",
      recommendations: [{ text: "Email IELTS diagnostic test link to evaluate student", category: "Assessment" }]
    },
    {
      name: "Emily Thompson",
      phone: "+44 20 7946 0192",
      email: "emily.t@growthflow.io",
      source: "CALL",
      status: "IN_PROGRESS",
      tags: ["MBA UK", "London"],
      notes: ["Discussed MBA programs in London Business Schools.", "Completed IELTS, has 3 years work experience. Needs help drafting Statement of Purpose (SOP)."],
      daysOffset: 3,
      callOutcome: "INTERESTED",
      followUpOffset: 3,
      followUpNotes: "Schedule review call with senior admissions consultant.",
      recommendations: [{ text: "Draft SOP guidelines outline for top UK business schools", category: "Editing" }]
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99887 76655",
      email: "vikram@malhotratex.com",
      source: "MANUAL",
      status: "INTERESTED",
      tags: ["Visa Filing", "USA"],
      notes: ["Received admit letter from Northeastern University MS. Needs visa document filing assistance.", "Parents sponsoring via fixed deposits and home loan."],
      daysOffset: 4,
      callOutcome: "CALLBACK",
      followUpOffset: 1,
      followUpNotes: "Check fund proof guidelines and review I-20 financial requirements.",
      recommendations: [{ text: "Send F1 visa interview question kit and mock schedule details", category: "Visa Prep" }]
    },
    {
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      email: "dchen@sierrasolutions.net",
      source: "CSV",
      status: "CONVERTED",
      tags: ["Closed Won", "Admissions Consultation"],
      notes: ["Successfully processed application and visa filing for Canada PR / student intake."],
      daysOffset: 7,
      callOutcome: "CONVERTED"
    },
    {
      name: "Priya Sharma",
      phone: "+91 76543 21098",
      email: "priya@zenithcosmetics.in",
      source: "WEBSITE",
      status: "LOST",
      tags: ["Academic Gap"],
      notes: ["Wanted admission in top UK university.", "Closed because of excessive academic gaps and low GPA not meeting basic entrance thresholds."],
      daysOffset: 10,
      callOutcome: "NOT_INTERESTED"
    }
  ],
  healthcare: [
    {
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      email: "arjun.mehta@techcorp.in",
      source: "WEBSITE",
      status: "NEW",
      tags: ["Dentistry", "Dental Implant"],
      notes: ["Wants to schedule dental implant consultation with senior surgeon.", "Experiencing severe toothache in lower molar region."],
      daysOffset: 0,
      followUpOffset: 0,
      followUpNotes: "Call to confirm dental appointment booking slot and details.",
      recommendations: [{ text: "Check dental surgeon available slots for surgical consult", category: "Appointment Scheduling" }]
    },
    {
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      email: "s.jenkins@apexmedia.co",
      source: "FORM",
      status: "NEW",
      tags: ["Health Package", "Executive Checkup"],
      notes: ["Inquiring about master health packages and cardiac diagnostic panels for parents.", "Parent age: 65+."],
      daysOffset: 1,
      followUpOffset: 0,
      followUpNotes: "Share Executive Checkup package brochures and list diagnostics included.",
      recommendations: [{ text: "Prepare elderly checkup itinerary and fast instructions", category: "Patient Education" }]
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.k@innovate.co.in",
      source: "WHATSAPP",
      status: "CONTACTED",
      tags: ["WhatsApp", "Dermatology"],
      notes: ["WhatsApp query about acne scar treatment packages (laser sessions).", "Wants to know cost per session and down time."],
      daysOffset: 2,
      callOutcome: "CALLBACK",
      followUpOffset: -2,
      followUpNotes: "Send dermatology clinic price charts and laser care sheet.",
      recommendations: [{ text: "Email laser treatment preparation protocol and safety details", category: "Clinical SOP" }]
    },
    {
      name: "Emily Thompson",
      phone: "+44 20 7946 0192",
      email: "emily.t@growthflow.io",
      source: "CALL",
      status: "IN_PROGRESS",
      tags: ["Orthopedics", "Knee Pain"],
      notes: ["Inquired about knee replacement surgery packages.", "Has medical history of osteoarthritis. Wants to check insurance approval coverage."],
      daysOffset: 3,
      callOutcome: "INTERESTED",
      followUpOffset: 3,
      followUpNotes: "Schedule diagnostic review and coordinate with insurance approval cell.",
      recommendations: [{ text: "Send pre-auth forms to insurance desk for cashless processing", category: "Insurance Verification" }]
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99887 76655",
      email: "vikram@malhotratex.com",
      source: "MANUAL",
      status: "INTERESTED",
      tags: ["Hair Transplant"],
      notes: ["Negotiating transplant package. Recommended: 3500 hair grafts.", "Wants zero cost EMI finance payment options."],
      daysOffset: 4,
      callOutcome: "CALLBACK",
      followUpOffset: 1,
      followUpNotes: "Coordinate with finance partner desk for instant loan approval.",
      recommendations: [{ text: "Send documents for paperless medical finance processing", category: "Credit Processing" }]
    },
    {
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      email: "dchen@sierrasolutions.net",
      source: "CSV",
      status: "CONVERTED",
      tags: ["Closed Won", "Annual Family Subscription"],
      notes: ["Registered for the annual family health monitoring package."],
      daysOffset: 7,
      callOutcome: "CONVERTED"
    },
    {
      name: "Priya Sharma",
      phone: "+91 76543 21098",
      email: "priya@zenithcosmetics.in",
      source: "WEBSITE",
      status: "LOST",
      tags: ["Location Out of Scope"],
      notes: ["Requested home sample collection service.", "Lost because patient lives outside our diagnostic lab home collection radius."],
      daysOffset: 10,
      callOutcome: "NOT_INTERESTED"
    }
  ],
  insurance: [
    {
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      email: "arjun.mehta@techcorp.in",
      source: "WEBSITE",
      status: "NEW",
      tags: ["Corporate Health", "Group Policy"],
      notes: ["Inquiring about corporate health insurance policy covering 50 employees.", "Wants premium quotes from HDFC Ergo and ICICI Lombard."],
      daysOffset: 0,
      followUpOffset: 0,
      followUpNotes: "Contact client to request employee demographic spreadsheet (ages & genders).",
      recommendations: [{ text: "Draft corporate group health quote proposal comparison spreadsheet", category: "Commercial Quote" }]
    },
    {
      name: "Sarah Jenkins",
      phone: "+1 (555) 234-5678",
      email: "s.jenkins@apexmedia.co",
      source: "FORM",
      status: "NEW",
      tags: ["Term Insurance", "Life Policy"],
      notes: ["Wants quote for 1 Cr Term Life Insurance.", "Non-smoker, annual income 12 LPA. Interested in premium return options."],
      daysOffset: 1,
      followUpOffset: 0,
      followUpNotes: "Prepare Term Policy comparison table and tax benefit brief.",
      recommendations: [{ text: "Calculate premiums for 1 Cr term plan based on DOB", category: "Calculators" }]
    },
    {
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.k@innovate.co.in",
      source: "WHATSAPP",
      status: "CONTACTED",
      tags: ["WhatsApp", "Car Insurance"],
      notes: ["WhatsApp query on commercial car fleet policy renewals (5 delivery vans).", "Current policy expiring next week. Needs fast processing."],
      daysOffset: 2,
      callOutcome: "CALLBACK",
      followUpOffset: -2,
      followUpNotes: "Collect past claims history and vehicle registration papers.",
      recommendations: [{ text: "Email fleet renewal quotation list to client", category: "Fleet Policy" }]
    },
    {
      name: "Emily Thompson",
      phone: "+44 20 7946 0192",
      email: "emily.t@growthflow.io",
      source: "CALL",
      status: "IN_PROGRESS",
      tags: ["Critical Illness"],
      notes: ["Discussed standalone critical illness rider.", "Wants to secure coverage for cancer, cardiac arrests, and kidney ailments."],
      daysOffset: 3,
      callOutcome: "INTERESTED",
      followUpOffset: 3,
      followUpNotes: "Arrange health checkup scheduling slot with partner center.",
      recommendations: [{ text: "Send medical test checkup center details and prep instructions", category: "Underwriting" }]
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99887 76655",
      email: "vikram@malhotratex.com",
      source: "MANUAL",
      status: "INTERESTED",
      tags: ["Keyman Policy"],
      notes: ["Reviewing Keyman Insurance proposal for business partners.", "Needs custom valuation and board resolution drafts."],
      daysOffset: 4,
      callOutcome: "CALLBACK",
      followUpOffset: 1,
      followUpNotes: "Review board resolution draft and verify partner financials.",
      recommendations: [{ text: "Submit financial verification request to compliance cell", category: "Compliance" }]
    },
    {
      name: "David Chen",
      phone: "+1 (555) 876-5432",
      email: "dchen@sierrasolutions.net",
      source: "CSV",
      status: "CONVERTED",
      tags: ["Closed Won", "Home Insurance"],
      notes: ["Successfully issued 10-year comprehensive property/home insurance policy."],
      daysOffset: 7,
      callOutcome: "CONVERTED"
    },
    {
      name: "Priya Sharma",
      phone: "+91 76543 21098",
      email: "priya@zenithcosmetics.in",
      source: "WEBSITE",
      status: "LOST",
      tags: ["Pre-existing Disease"],
      notes: ["Applied for premium health policy.", "Lost/rejected during underwriter audit due to high-risk undisclosed pre-existing ailments."],
      daysOffset: 10,
      callOutcome: "NOT_INTERESTED"
    }
  ]
};

export async function seedOnboardingData(userId: string, industry: string) {
  // Normalize key
  const normalizedKey = industry.toLowerCase().replace(/[\s-]+/g, "_");
  const dataTemplates = templates[normalizedKey] || templates["real_estate"];

  console.log(`[Onboarding Seeder] Seeding leads for user: ${userId}, industry: ${industry}`);

  for (const data of dataTemplates) {
    const createdAtDate = new Date();
    createdAtDate.setDate(createdAtDate.getDate() - data.daysOffset);

    // 1. Create Lead record
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        source: data.source,
        status: data.status,
        tags: data.tags,
        notes: data.notes,
        assignedToId: userId,
        createdAt: createdAtDate,
        updatedAt: createdAtDate,
      },
    });

    // 2. Create Call log if outcome is specified
    if (data.callOutcome) {
      await prisma.call.create({
        data: {
          leadId: lead.id,
          type: CallType.OUTGOING,
          outcome: data.callOutcome,
          notes: `Call logged automatically. Client was receptive. Notes: ${data.notes[0]}`,
          createdById: userId,
          timestamp: new Date(createdAtDate.getTime() + 1000 * 60 * 60 * 2), // 2 hours later
        },
      });

      // Create matching activity log
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: "CALL_LOGGED",
          description: `Logged call. Outcome: ${data.callOutcome}.`,
          createdById: userId,
          timestamp: new Date(createdAtDate.getTime() + 1000 * 60 * 60 * 2),
        },
      });
    }

    // 3. Create General Creation activity
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: "LEAD_CREATED",
        description: `Lead created from source: ${lead.source} and assigned to user.`,
        createdById: userId,
        timestamp: createdAtDate,
      },
    });

    // 4. Create FollowUp schedule if configured
    if (data.followUpOffset !== undefined && data.followUpNotes) {
      const scheduledDate = new Date();
      scheduledDate.setDate(scheduledDate.getDate() + data.followUpOffset);
      scheduledDate.setHours(11, 0, 0, 0);

      await prisma.followUp.create({
        data: {
          leadId: lead.id,
          scheduledAt: scheduledDate,
          notes: data.followUpNotes,
          status: data.followUpStatus || FollowUpStatus.PENDING,
          createdAt: createdAtDate,
          updatedAt: createdAtDate,
        },
      });

      // Sync lead followUpDate
      await prisma.lead.update({
        where: { id: lead.id },
        data: { followUpDate: scheduledDate },
      });
    }

    // 5. Create AI Recommendations
    if (data.recommendations && data.recommendations.length > 0) {
      for (const rec of data.recommendations) {
        await prisma.aIRecommendation.create({
          data: {
            leadId: lead.id,
            recommendation: rec.text,
            category: rec.category,
            status: "PENDING",
            reasoning: [data.notes[0] || "Inbound client interest."],
            weightModifier: 0.1,
            createdAt: createdAtDate,
            updatedAt: createdAtDate,
          },
        });
      }
    }
  }

  console.log(`[Onboarding Seeder] Seeding completed for user: ${userId}`);
}
