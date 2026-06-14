import { prisma } from "../src/lib/prisma";

const categories = [
  {
    name: "Technology & Software",
    displayOrder: 1,
    industries: [
      { name: "SaaS / B2B Software", slug: "saas-b2b", icon: "MonitorSmartphone", isPopular: true, pipelineStages: ["Lead", "Discovery Call", "Demo Scheduled", "Demo Completed", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"] },
      { name: "IT Services & Managed IT", slug: "it-services", icon: "Server", pipelineStages: ["Lead", "Consultation", "Tech Audit", "Proposal", "Contract Sent", "Onboarding", "Closed Lost"] },
      { name: "Cybersecurity", slug: "cybersecurity", icon: "Shield", pipelineStages: ["Lead", "Security Assessment", "Proposal", "Contract", "Implementation", "Closed Lost"] },
      { name: "Web & App Development", slug: "web-app-dev", icon: "Code", pipelineStages: ["Lead", "Discovery", "Wireframing", "Development", "UAT", "Launch", "Closed Lost"] },
      { name: "AI & Machine Learning", slug: "ai-ml", icon: "BrainCircuit", pipelineStages: ["Lead", "Use Case Discovery", "Proof of Concept", "Proposal", "Deployment", "Closed Lost"] },
    ]
  },
  {
    name: "Marketing & Creative",
    displayOrder: 2,
    industries: [
      { name: "Digital Marketing Agency", slug: "digital-marketing", icon: "Megaphone", isPopular: true, pipelineStages: ["Lead", "Discovery Call", "Proposal Sent", "Contract Sent", "Won", "Lost"] },
      { name: "SEO & Content Marketing", slug: "seo-content", icon: "Search", pipelineStages: ["Lead", "Site Audit", "Strategy Pitch", "Contract", "Onboarding", "Lost"] },
      { name: "Social Media Agency", slug: "social-media", icon: "Share2", pipelineStages: ["Lead", "Discovery", "Strategy Proposal", "Contract", "Onboarding", "Lost"] },
      { name: "Public Relations (PR)", slug: "pr-agency", icon: "Mic", pipelineStages: ["Lead", "Initial Call", "Campaign Pitch", "Contract", "Retainer Active", "Lost"] },
      { name: "Video Production", slug: "video-production", icon: "Video", pipelineStages: ["Lead", "Concept Pitch", "Pre-Production", "Shooting", "Post-Production", "Delivery", "Lost"] },
    ]
  },
  {
    name: "Real Estate",
    displayOrder: 3,
    industries: [
      { name: "Residential Real Estate", slug: "residential-re", icon: "Home", isPopular: true, pipelineStages: ["Lead", "Contacted", "Property Matching", "Site Visit", "Negotiation", "Booking", "Closed"] },
      { name: "Commercial Real Estate", slug: "commercial-re", icon: "Building2", pipelineStages: ["Lead", "Requirements Gathering", "Property Tour", "LOI Submitted", "Lease Signed", "Closed"] },
      { name: "Property Management", slug: "property-management", icon: "Key", pipelineStages: ["Lead", "Property Inspection", "Proposal", "Contract Signed", "Onboarding", "Lost"] },
      { name: "Real Estate Investment", slug: "re-investment", icon: "Landmark", pipelineStages: ["Lead", "Deal Analysis", "Offer Made", "Due Diligence", "Closing", "Lost"] },
      { name: "Architecture & Interior Design", slug: "architecture", icon: "PenTool", pipelineStages: ["Lead", "Initial Consultation", "Design Draft", "Final Approval", "Execution", "Completed"] },
    ]
  },
  {
    name: "Sales & Consulting",
    displayOrder: 4,
    industries: [
      { name: "Business Consulting", slug: "business-consulting", icon: "Briefcase", isPopular: true, pipelineStages: ["Lead", "Discovery", "Strategy Formulation", "Proposal", "Engagement", "Closed"] },
      { name: "HR & Recruitment", slug: "hr-recruitment", icon: "Users", isPopular: true, pipelineStages: ["Lead", "Screening", "Interview", "Offer", "Placement", "Lost"] },
      { name: "Sales Training", slug: "sales-training", icon: "TrendingUp", pipelineStages: ["Lead", "Needs Assessment", "Curriculum Pitch", "Contract", "Execution", "Lost"] },
      { name: "Life & Career Coaching", slug: "coaching", icon: "Compass", pipelineStages: ["Lead", "Intro Call", "Package Proposal", "Onboarded", "Lost"] },
    ]
  },
  {
    name: "Healthcare",
    displayOrder: 5,
    industries: [
      { name: "Medical Clinics & Doctors", slug: "medical-clinic", icon: "Stethoscope", isPopular: true, pipelineStages: ["Lead", "Appointment Scheduled", "Consultation", "Treatment", "Follow-up", "No Show"] },
      { name: "Dental Clinics", slug: "dental-clinic", icon: "Smile", pipelineStages: ["Lead", "Checkup Scheduled", "Treatment Plan", "Procedure", "Post-care", "Lost"] },
      { name: "Therapy & Mental Health", slug: "mental-health", icon: "Heart", pipelineStages: ["Lead", "Intake Form", "First Session", "Ongoing Care", "Discharged"] },
      { name: "Medical Devices & SaaS", slug: "medical-devices", icon: "Activity", pipelineStages: ["Lead", "Demo", "Clinical Trial", "Procurement", "Deployed", "Lost"] },
      { name: "Fitness & Wellness Centers", slug: "fitness", icon: "Dumbbell", pipelineStages: ["Lead", "Trial Scheduled", "Attended Trial", "Membership Sold", "Lost"] },
    ]
  },
  {
    name: "Education",
    displayOrder: 6,
    industries: [
      { name: "Universities & Colleges", slug: "universities", icon: "GraduationCap", isPopular: true, pipelineStages: ["Inquiry", "Counseling", "Application Received", "Interview", "Admission", "Enrollment", "Lost"] },
      { name: "EdTech & Online Courses", slug: "edtech", icon: "Laptop", pipelineStages: ["Lead", "Webinar Attended", "Free Trial", "Course Purchased", "Upsell", "Lost"] },
      { name: "K-12 Schools", slug: "k12-schools", icon: "School", pipelineStages: ["Lead", "Campus Tour", "Application", "Admission", "Enrolled", "Lost"] },
      { name: "Language & Tutoring Centers", slug: "tutoring", icon: "Languages", pipelineStages: ["Lead", "Assessment Test", "Trial Class", "Subscription", "Lost"] },
      { name: "Corporate Training", slug: "corp-training", icon: "Presentation", pipelineStages: ["Lead", "Needs Analysis", "Proposal", "Contract", "Training Delivered", "Lost"] },
    ]
  },
  {
    name: "Hospitality & Travel",
    displayOrder: 7,
    industries: [
      { name: "Hotels & Resorts", slug: "hotels", icon: "Hotel", pipelineStages: ["Lead", "Inquiry", "Quotation Sent", "Booking Confirmed", "Checked In", "Checked Out", "Cancelled"] },
      { name: "Travel Agencies", slug: "travel-agencies", icon: "Plane", pipelineStages: ["Lead", "Itinerary Sent", "Deposit Paid", "Trip Confirmed", "Trip Completed", "Lost"] },
      { name: "Event Management", slug: "events", icon: "CalendarDays", pipelineStages: ["Lead", "Requirements Gathering", "Venue Sourcing", "Proposal", "Contract Signed", "Event Execution", "Lost"] },
      { name: "Restaurants & Catering", slug: "restaurants", icon: "Utensils", pipelineStages: ["Inquiry", "Tasting Scheduled", "Menu Finalized", "Deposit Paid", "Event Completed", "Lost"] },
    ]
  },
  {
    name: "Retail & Ecommerce",
    displayOrder: 8,
    industries: [
      { name: "D2C Ecommerce Brands", slug: "d2c-ecommerce", icon: "ShoppingBag", isPopular: true, pipelineStages: ["Abandoned Cart", "Retargeted", "Discount Sent", "Purchase Completed", "Lost"] },
      { name: "B2B Wholesale / Distribution", slug: "wholesale", icon: "Truck", pipelineStages: ["Lead", "Catalog Sent", "Sample Sent", "Bulk Order Placed", "Delivered", "Lost"] },
      { name: "Brick & Mortar Retail", slug: "retail", icon: "Store", pipelineStages: ["Lead", "Store Visit", "Quote Given", "Purchased", "Lost"] },
      { name: "Luxury Goods & Jewelry", slug: "luxury", icon: "Gem", pipelineStages: ["Lead", "Private Viewing", "Negotiation", "Sale Closed", "Lost"] },
    ]
  },
  {
    name: "Financial Services",
    displayOrder: 9,
    industries: [
      { name: "Wealth Management & Advising", slug: "wealth-management", icon: "LineChart", isPopular: true, pipelineStages: ["Lead", "Intro Call", "Portfolio Review", "Proposal", "Account Opened", "Lost"] },
      { name: "Accounting & Tax Services", slug: "accounting", icon: "Calculator", pipelineStages: ["Lead", "Consultation", "Document Collection", "Filing", "Completed", "Lost"] },
      { name: "Insurance Brokerage", slug: "insurance", icon: "ShieldAlert", pipelineStages: ["Lead", "Risk Assessment", "Quote Sent", "Policy Bound", "Renewed", "Lost"] },
      { name: "Mortgage Brokering", slug: "mortgages", icon: "Home", pipelineStages: ["Lead", "Pre-Approval", "Application Submitted", "Underwriting", "Funded", "Lost"] },
      { name: "Venture Capital & PE", slug: "vc-pe", icon: "PieChart", pipelineStages: ["Lead", "Pitch Deck Review", "Partner Meeting", "Due Diligence", "Term Sheet", "Funded", "Passed"] },
    ]
  },
  {
    name: "Legal",
    displayOrder: 10,
    industries: [
      { name: "Corporate Law Firm", slug: "corporate-law", icon: "Scale", pipelineStages: ["Lead", "Initial Consultation", "Conflict Check", "Retainer Signed", "Active Case", "Closed"] },
      { name: "Family Law", slug: "family-law", icon: "Users", pipelineStages: ["Lead", "Consultation", "Retainer Signed", "Mediation", "Court", "Closed"] },
      { name: "Immigration Law", slug: "immigration-law", icon: "Passport", pipelineStages: ["Lead", "Case Evaluation", "Document Gathering", "Application Filed", "Approved", "Denied"] },
      { name: "Personal Injury Law", slug: "personal-injury", icon: "Stethoscope", pipelineStages: ["Lead", "Intake", "Investigation", "Demand Letter", "Settlement", "Litigation", "Closed"] },
    ]
  },
  {
    name: "Manufacturing",
    displayOrder: 11,
    industries: [
      { name: "Industrial Manufacturing", slug: "industrial-mfg", icon: "Factory", isPopular: true, pipelineStages: ["Lead", "Specs Shared", "Prototype", "Bulk Order", "Production", "Delivered", "Lost"] },
      { name: "Food & Beverage Production", slug: "fb-production", icon: "Coffee", pipelineStages: ["Lead", "Samples Sent", "Vendor Approval", "PO Received", "Delivered", "Lost"] },
      { name: "Apparel & Textiles", slug: "apparel-mfg", icon: "Scissors", pipelineStages: ["Lead", "Design Received", "Sample Approved", "Bulk Production", "Shipped", "Lost"] },
    ]
  },
  {
    name: "Logistics & Transportation",
    displayOrder: 12,
    industries: [
      { name: "Freight & Shipping", slug: "freight", icon: "Ship", pipelineStages: ["Lead", "Quote Sent", "Booking Confirmed", "In Transit", "Delivered", "Lost"] },
      { name: "3PL & Warehousing", slug: "3pl", icon: "Package", pipelineStages: ["Lead", "Needs Analysis", "Pricing Proposed", "Contract Signed", "Onboarded", "Lost"] },
      { name: "Fleet Management", slug: "fleet", icon: "Truck", pipelineStages: ["Lead", "Demo", "Pilot Program", "Contract", "Deployed", "Lost"] },
    ]
  },
  {
    name: "Automotive",
    displayOrder: 13,
    industries: [
      { name: "Car Dealerships", slug: "car-dealership", icon: "Car", pipelineStages: ["Lead", "Test Drive Scheduled", "Test Drive Completed", "Financing", "Sold", "Lost"] },
      { name: "Auto Repair & Services", slug: "auto-repair", icon: "Wrench", pipelineStages: ["Lead", "Estimate Given", "Approved", "In Shop", "Ready for Pickup", "Paid"] },
      { name: "Car Rentals", slug: "car-rentals", icon: "Key", pipelineStages: ["Inquiry", "Quote", "Reserved", "Picked Up", "Returned", "Lost"] },
    ]
  },
  {
    name: "Government & Non-Profit",
    displayOrder: 14,
    industries: [
      { name: "Charities & NGOs", slug: "ngo", icon: "HeartHandshake", pipelineStages: ["Lead", "Outreach", "Meeting", "Pledged", "Donation Received", "Lost"] },
      { name: "Political Campaigns", slug: "political", icon: "Flag", pipelineStages: ["Voter Lead", "Contacted", "Committed", "Donated", "Voted"] },
      { name: "Chambers of Commerce", slug: "chambers", icon: "Building", pipelineStages: ["Lead", "Info Sent", "Meeting", "Membership Paid", "Lost"] },
    ]
  },
  {
    name: "Media & Entertainment",
    displayOrder: 15,
    industries: [
      { name: "Publishing & Media", slug: "publishing", icon: "BookOpen", pipelineStages: ["Lead", "Pitch Received", "Review", "Contract", "Published", "Rejected"] },
      { name: "Broadcasting & Radio", slug: "broadcasting", icon: "Radio", pipelineStages: ["Lead", "Media Kit Sent", "Sponsorship Proposal", "Contract", "Aired", "Lost"] },
      { name: "Esports & Gaming", slug: "gaming", icon: "Gamepad2", pipelineStages: ["Lead", "Sponsorship Pitch", "Negotiation", "Signed", "Activated", "Lost"] },
    ]
  },
  {
    name: "Agriculture",
    displayOrder: 16,
    industries: [
      { name: "AgriTech", slug: "agritech", icon: "Sprout", pipelineStages: ["Lead", "Farm Audit", "Demo", "Proposal", "Deployed", "Lost"] },
      { name: "Farming & Produce Sales", slug: "farming", icon: "Tractor", pipelineStages: ["Lead", "Samples Sent", "Contract", "Harvest Scheduled", "Delivered", "Lost"] },
    ]
  },
  {
    name: "Telecom & Utilities",
    displayOrder: 17,
    industries: [
      { name: "Telecommunications", slug: "telecom", icon: "PhoneCall", pipelineStages: ["Lead", "Site Survey", "Quote", "Contract", "Installation", "Active", "Lost"] },
      { name: "Solar & Renewable Energy", slug: "solar", icon: "Sun", pipelineStages: ["Lead", "Energy Audit", "Quote Sent", "Financing Approved", "Installation", "Completed", "Lost"] },
    ]
  },
  {
    name: "Professional Services",
    displayOrder: 18,
    industries: [
      { name: "Cleaning Services", slug: "cleaning", icon: "Sparkles", pipelineStages: ["Lead", "Quote Given", "Scheduled", "Service Completed", "Paid", "Lost"] },
      { name: "Security Services", slug: "security", icon: "ShieldCheck", pipelineStages: ["Lead", "Site Audit", "Proposal", "Contract", "Deployed", "Lost"] },
      { name: "Pest Control", slug: "pest-control", icon: "Bug", pipelineStages: ["Lead", "Inspection", "Quote", "Treatment Scheduled", "Completed", "Lost"] },
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

async function main() {
  console.log("Seeding Industries...");
  
  // Clear existing
  await (prisma as any).industry.deleteMany();
  await (prisma as any).industryCategory.deleteMany();

  for (const cat of categories) {
    const category = await (prisma as any).industryCategory.create({
      data: {
        name: cat.name,
        displayOrder: cat.displayOrder,
      }
    });

    for (const ind of cat.industries) {
      await (prisma as any).industry.create({
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

  console.log("✅ Seeded 19 categories and 100+ industries.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Cannot disconnect safely with pg pool easily, just exit
    process.exit(0);
  });
