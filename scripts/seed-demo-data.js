const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in .env file.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // 1. Fetch our Admin User to assign leads to
    const admin = await prisma.user.findUnique({
      where: { email: "admin@nexdial.io" },
    });

    if (!admin) {
      console.error("Admin user (admin@nexdial.io) not found. Please run the admin seed script first.");
      process.exit(1);
    }

    console.log(`Found admin user: ${admin.name} (${admin.id}). Starting demo seed...`);

    // Clean existing non-admin data if any (optional, but let's keep it safe by just adding)
    console.log("Generating 25 realistic leads...");

    const leadData = [
      {
        name: "Arjun Mehta",
        phone: "+91 98765 43210",
        email: "arjun.mehta@techcorp.in",
        source: "WEBSITE",
        status: "NEW",
        tags: ["Hot Lead", "Enterprise"],
        notes: ["Filled out the contact form inquiring about 50 user pricing.", "Company size: 120 employees."],
        daysOffset: 0, // Today
      },
      {
        name: "Sarah Jenkins",
        phone: "+1 (555) 234-5678",
        email: "s.jenkins@apexmedia.co",
        source: "FORM",
        status: "NEW",
        tags: ["Inbound", "High Value"],
        notes: ["Requested a product demonstration for their sales team.", "Interested in CRM + WhatsApp integration."],
        daysOffset: 1, // Yesterday
      },
      {
        name: "Rajesh Kumar",
        phone: "+91 87654 32109",
        email: "rajesh.k@innovate.co.in",
        source: "WHATSAPP",
        status: "CONTACTED",
        tags: ["WhatsApp", "Follow Up"],
        notes: ["Messaged on WhatsApp asking about custom API integrations.", "Sent him the API docs link."],
        daysOffset: 2,
      },
      {
        name: "Emily Thompson",
        phone: "+44 20 7946 0192",
        email: "emily.t@growthflow.io",
        source: "CALL",
        status: "IN_PROGRESS",
        tags: ["Demo Scheduled"],
        notes: ["Incoming call from website number. Discussed core features.", "Demo booked for next Tuesday."],
        daysOffset: 3,
      },
      {
        name: "Vikram Malhotra",
        phone: "+91 99887 76655",
        email: "vikram@malhotratex.com",
        source: "MANUAL",
        status: "INTERESTED",
        tags: ["Negotiation", "Enterprise"],
        notes: ["Met at Delhi SaaS Conference. Very interested in localizing dialer.", "Sent proposal for 100 seats."],
        daysOffset: 4,
      },
      {
        name: "David Chen",
        phone: "+1 (555) 876-5432",
        email: "dchen@sierrasolutions.net",
        source: "CSV",
        status: "CONVERTED",
        tags: ["Closed Won"],
        notes: ["Imported from marketing webinar lead list.", "Purchased 15 licenses for 1 year."],
        daysOffset: 5,
      },
      {
        name: "Priya Sharma",
        phone: "+91 76543 21098",
        email: "priya@zenithcosmetics.in",
        source: "WEBSITE",
        status: "LOST",
        tags: ["Price Sensitive"],
        notes: ["Filled pricing page form.", "Lost to competitor due to lower pricing tier requirement."],
        daysOffset: 6,
      },
      {
        name: "Michael Chang",
        phone: "+65 6789 0123",
        email: "mchang@orionglobal.sg",
        source: "WHATSAPP",
        status: "NEW",
        tags: ["Hot Lead"],
        notes: ["WhatsApp query about international SMS pricing.", "Waiting for pricing template."],
        daysOffset: 0,
      },
      {
        name: "Ananya Deshmukh",
        phone: "+91 91234 56789",
        email: "ananya.d@fintechlabs.in",
        source: "FORM",
        status: "NEW",
        tags: ["Fintech", "Enterprise"],
        notes: ["Requested trial license for testing secure routing features."],
        daysOffset: 1,
      },
      {
        name: "Robert Miller",
        phone: "+1 (555) 345-6789",
        email: "rmiller@apexlogistics.com",
        source: "CALL",
        status: "CONTACTED",
        tags: ["Follow Up"],
        notes: ["Missed call. Callback initiated, discussed auto-assignment capabilities."],
        daysOffset: 2,
      },
      {
        name: "Aisha Patel",
        phone: "+91 81234 56789",
        email: "aisha.patel@healthkart.in",
        source: "WEBSITE",
        status: "IN_PROGRESS",
        tags: ["High Value"],
        notes: ["Filled out inquiry for healthcare lead routing rules."],
        daysOffset: 3,
      },
      {
        name: "James Wilson",
        phone: "+44 113 496 0123",
        email: "j.wilson@nexusdesign.uk",
        source: "MANUAL",
        status: "INTERESTED",
        tags: ["Proposal Sent"],
        notes: ["Needs automated follow-up system. Proposal sent yesterday."],
        daysOffset: 4,
      },
      {
        name: "Neha Gupta",
        phone: "+91 93456 78901",
        email: "neha@guptaconsulting.co",
        source: "FORM",
        status: "CONVERTED",
        tags: ["Closed Won"],
        notes: ["Signed contract for 5 seats after a 14-day trial period."],
        daysOffset: 8,
      },
      {
        name: "John Doe",
        phone: "+1 (555) 999-8888",
        email: "johndoe@test.com",
        source: "MANUAL",
        status: "LOST",
        tags: ["No Response"],
        notes: ["Created manually. Did not respond to 4 call attempts."],
        daysOffset: 12,
      },
      {
        name: "Kabir Singh",
        phone: "+91 94567 89012",
        email: "kabir@singhmotors.co.in",
        source: "CALL",
        status: "NEW",
        tags: ["Automotive", "Hot Lead"],
        notes: ["Called in inquiring about CRM integrations with local dialers."],
        daysOffset: 0,
      },
      {
        name: "Sophia Martinez",
        phone: "+1 (555) 456-7890",
        email: "smartinez@stellarretail.com",
        source: "WEBSITE",
        status: "CONTACTED",
        tags: ["Inbound"],
        notes: ["Looking for a lead management tool for 10 retail reps."],
        daysOffset: 1,
      },
      {
        name: "Rahul Verma",
        phone: "+91 95678 90123",
        email: "rahul@vermabuilders.com",
        source: "WHATSAPP",
        status: "IN_PROGRESS",
        tags: ["Real Estate"],
        notes: ["WhatsApp query on property lead assignment flow. Demo scheduled."],
        daysOffset: 3,
      },
      {
        name: "Olivia Green",
        phone: "+61 2 9382 0192",
        email: "ogreen@greenfield.com.au",
        source: "FORM",
        status: "INTERESTED",
        tags: ["Enterprise"],
        notes: ["Enterprise RFP received. Reviewing technical guidelines."],
        daysOffset: 5,
      },
      {
        name: "Daniel White",
        phone: "+1 (555) 567-8901",
        email: "dwhite@cloudshield.io",
        source: "CSV",
        status: "CONVERTED",
        tags: ["Closed Won"],
        notes: ["Lead converted from partner program referrals."],
        daysOffset: 10,
      },
      {
        name: "Sanjay Nair",
        phone: "+91 96789 01234",
        email: "sanjay@nairtravels.in",
        source: "CALL",
        status: "NEW",
        tags: ["Travel"],
        notes: ["Inquired about call logging and recording analytics."],
        daysOffset: 0,
      },
      {
        name: "Chloe Dupont",
        phone: "+33 1 42 27 78 90",
        email: "c.dupont@luxeagency.fr",
        source: "WEBSITE",
        status: "NEW",
        tags: ["Hot Lead", "Europe"],
        notes: ["Premium agency looking for clean lead allocation pipelines."],
        daysOffset: 0,
      },
      {
        name: "Aditya Roy",
        phone: "+91 97890 12345",
        email: "aditya@roymedia.in",
        source: "WHATSAPP",
        status: "CONTACTED",
        tags: ["WhatsApp"],
        notes: ["Inquired about pricing models for SMS logs."],
        daysOffset: 2,
      },
      {
        name: "Amanda Ross",
        phone: "+1 (555) 678-9012",
        email: "aross@vanguardcorp.com",
        source: "FORM",
        status: "IN_PROGRESS",
        tags: ["Demo Scheduled"],
        notes: ["Scheduling a follow-up demo for product heads."],
        daysOffset: 3,
      },
      {
        name: "Tanvi Rao",
        phone: "+91 98901 23456",
        email: "tanvi.r@capitalalpha.in",
        source: "MANUAL",
        status: "INTERESTED",
        tags: ["Finance", "High Value"],
        notes: ["Requires strict role access controls. Proposal sent."],
        daysOffset: 4,
      },
      {
        name: "Lucas Black",
        phone: "+1 (555) 789-0123",
        email: "lblack@blackwood.com",
        source: "CSV",
        status: "LOST",
        tags: ["Competitor Win"],
        notes: ["Lost to Salesforce CRM because of prior native integrations."],
        daysOffset: 14,
      }
    ];

    for (const data of leadData) {
      const createdAtDate = new Date();
      createdAtDate.setDate(createdAtDate.getDate() - data.daysOffset);

      // Create lead
      const lead = await prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          source: data.source,
          status: data.status,
          tags: data.tags,
          notes: data.notes,
          assignedToId: admin.id,
          createdAt: createdAtDate,
          updatedAt: createdAtDate,
        },
      });

      console.log(`Created lead: ${lead.name} (${lead.status})`);

      // Create calls for leads that are contacted, in progress, or interested
      if (["CONTACTED", "IN_PROGRESS", "INTERESTED", "CONVERTED"].includes(lead.status)) {
        await prisma.call.create({
          data: {
            leadId: lead.id,
            type: "OUTGOING",
            outcome: lead.status === "CONVERTED" ? "CONVERTED" : "INTERESTED",
            notes: "Initial call done. Client was highly receptive and explained their exact CRM workflow requirements.",
            createdById: admin.id,
            timestamp: new Date(createdAtDate.getTime() + 1000 * 60 * 60 * 2), // 2 hours later
          },
        });

        await prisma.activity.create({
          data: {
            leadId: lead.id,
            type: "CALL_LOGGED",
            description: `Logged an outgoing call by ${admin.name}. Outcome: ${lead.status === "CONVERTED" ? "CONVERTED" : "INTERESTED"}.`,
            createdById: admin.id,
            timestamp: new Date(createdAtDate.getTime() + 1000 * 60 * 60 * 2),
          },
        });
      }

      // Add general activity logs
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: "LEAD_CREATED",
          description: `Lead created from source: ${lead.source} and assigned to ${admin.name}.`,
          createdById: admin.id,
          timestamp: createdAtDate,
        },
      });

      // 2. Schedule Follow-ups (urgency system)
      // We will schedule overdue follow-ups, today's follow-ups, and upcoming follow-ups
      if (lead.status !== "LOST" && lead.status !== "CONVERTED") {
        let scheduledDate = new Date();

        if (lead.name === "Arjun Mehta" || lead.name === "Sarah Jenkins") {
          // DUE TODAY
          scheduledDate.setHours(10, 0, 0, 0);
          await prisma.followUp.create({
            data: {
              leadId: lead.id,
              scheduledAt: scheduledDate,
              notes: "Today's catch-up call to review our custom SaaS proposal details.",
              status: "PENDING",
            },
          });
          // Also update the lead followUpDate
          await prisma.lead.update({
            where: { id: lead.id },
            data: { followUpDate: scheduledDate },
          });
          console.log(`Scheduled follow-up TODAY for ${lead.name}`);

        } else if (lead.name === "Rajesh Kumar" || lead.name === "Michael Chang" || lead.name === "Chloe Dupont") {
          // OVERDUE (2 days ago)
          scheduledDate.setDate(scheduledDate.getDate() - 2);
          scheduledDate.setHours(14, 30, 0, 0);
          await prisma.followUp.create({
            data: {
              leadId: lead.id,
              scheduledAt: scheduledDate,
              notes: "OVERDUE: Follow up regarding their WhatsApp numbers list and pricing structure approval.",
              status: "PENDING",
            },
          });
          // Update lead followUpDate
          await prisma.lead.update({
            where: { id: lead.id },
            data: { followUpDate: scheduledDate },
          });
          console.log(`Scheduled OVERDUE follow-up for ${lead.name}`);

        } else if (lead.status === "IN_PROGRESS" || lead.status === "INTERESTED") {
          // UPCOMING (3 days from now)
          scheduledDate.setDate(scheduledDate.getDate() + 3);
          scheduledDate.setHours(11, 0, 0, 0);
          await prisma.followUp.create({
            data: {
              leadId: lead.id,
              scheduledAt: scheduledDate,
              notes: "Upcoming check-in call to schedule a final group demo session.",
              status: "PENDING",
            },
          });
          // Update lead followUpDate
          await prisma.lead.update({
            where: { id: lead.id },
            data: { followUpDate: scheduledDate },
          });
          console.log(`Scheduled UPCOMING follow-up for ${lead.name}`);
        }
      }
    }

    console.log("\n-------------------------------------------");
    console.log("✅ Demo CRM Data Seeded Successfully!");
    console.log("Seeded 25 Leads, matching Calls, Activities, and structured Follow-ups.");
    console.log("-------------------------------------------\n");

  } catch (error) {
    console.error("Database seed error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
