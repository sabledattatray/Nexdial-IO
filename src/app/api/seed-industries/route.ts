import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const categories = [
    {
      name: "Technology & Software",
      displayOrder: 1,
      industries: [
        { name: "SaaS / B2B Software", slug: "saas-b2b", icon: "MonitorSmartphone", isPopular: true, pipelineStages: ["Lead", "Discovery Call", "Demo Scheduled", "Demo Completed", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"] },
        { name: "IT Services & Managed IT", slug: "it-services", icon: "Server", pipelineStages: ["Lead", "Consultation", "Tech Audit", "Proposal", "Contract Sent", "Onboarding", "Closed Lost"] },
      ]
    },
    {
      name: "Real Estate",
      displayOrder: 2,
      industries: [
        { name: "Residential Real Estate", slug: "residential-re", icon: "Home", isPopular: true, pipelineStages: ["Lead", "Contacted", "Property Matching", "Site Visit", "Negotiation", "Booking", "Closed"] },
        { name: "Commercial Real Estate", slug: "commercial-re", icon: "Building2", pipelineStages: ["Lead", "Requirements Gathering", "Property Tour", "LOI Submitted", "Lease Signed", "Closed"] },
      ]
    },
    {
      name: "Sales & Consulting",
      displayOrder: 3,
      industries: [
        { name: "Business Consulting", slug: "business-consulting", icon: "Briefcase", isPopular: true, pipelineStages: ["Lead", "Discovery", "Strategy Formulation", "Proposal", "Engagement", "Closed"] },
        { name: "HR & Recruitment", slug: "hr-recruitment", icon: "Users", isPopular: true, pipelineStages: ["Lead", "Screening", "Interview", "Offer", "Placement", "Lost"] },
      ]
    },
    {
      name: "Healthcare",
      displayOrder: 4,
      industries: [
        { name: "Medical Clinics & Doctors", slug: "medical-clinic", icon: "Stethoscope", isPopular: true, pipelineStages: ["Lead", "Appointment Scheduled", "Consultation", "Treatment", "Follow-up", "No Show"] },
      ]
    },
    {
      name: "Education",
      displayOrder: 5,
      industries: [
        { name: "Universities & Colleges", slug: "universities", icon: "GraduationCap", isPopular: true, pipelineStages: ["Inquiry", "Counseling", "Application Received", "Interview", "Admission", "Enrollment", "Lost"] },
      ]
    },
    {
      name: "Other",
      displayOrder: 19,
      industries: [
        { name: "Other / Custom", slug: "custom", icon: "Plus", pipelineStages: ["Lead", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"] },
      ]
    }
  ];

  try {
    await prisma.industry.deleteMany();
    await prisma.industryCategory.deleteMany();

    for (const cat of categories) {
      const category = await prisma.industryCategory.create({
        data: {
          name: cat.name,
          displayOrder: cat.displayOrder,
        }
      });

      for (const ind of cat.industries) {
        await prisma.industry.create({
          data: {
            categoryId: category.id,
            name: ind.name,
            slug: ind.slug,
            icon: ind.icon,
            isPopular: ind.isPopular || false,
            pipelineStages: ind.pipelineStages,
            leadSources: ["Website", "Referral", "Cold Call", "Social Media"],
            defaultTags: ["High Priority", "Follow-up", "New"],
          }
        });
      }
    }

    return NextResponse.json({ success: true, message: "Seeded successfully" });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
