"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Phone, PhoneOutgoing, Headphones, MessageSquare, ShieldCheck, Mail, Database, Wrench, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    icon: Phone,
    title: "Lead Automation Setup",
    desc: "Connect your web forms, landing pages, ad networks, and lead databases to NexDial in minutes. We provide standard webhook capture templates and APIs to route incoming leads straight to your unified inbox.",
    bullets: ["Web Form Integrations", "Custom API Webhook setups", "Real-time Lead Syncing", "Automatic Assignee Routing"],
    color: "#0057D9"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Outreach Templates",
    desc: "Format and deploy personalized outreach messages that pull customer variables (names, product details, budgets) dynamically. Enable agents to click a button and launch chats instantly.",
    bullets: ["Personalized Variable Merging", "Custom Template Libraries", "One-Click WhatsApp Launching", "Follow-up Response Tracking"],
    color: "#00C2FF"
  },
  {
    icon: Wrench,
    title: "AI Recommendation Tuning",
    desc: "Tweak the Priority Engine variables to match your business logic. Optimize the Next Best Action rules and Lead Health Scores based on your unique conversion cycles.",
    bullets: ["Next Best Action Customization", "Lead Health Score parameters", "Daily Execution Mode setup", "AI Priority Index auditing"],
    color: "#8B5CF6"
  },
  {
    icon: Database,
    title: "CSV Database Migration",
    desc: "Safely migrate your legacy spreadsheets, Excel contact lists, and customer data sheets. We clean, format, and structure your records while scanning for duplicates.",
    bullets: ["Legacy Data Cleanups", "CSV Column Field Mapping", "Duplicate Scan Warnings", "Bulk Lead Import Processing"],
    color: "#00E5A0"
  },
  {
    icon: Shield,
    title: "Team Workspace Provisioning",
    desc: "Configure secure workspaces for multiple team members, sales managers, or customer support reps. Administer permissions, lead visibility, and role-based access rules.",
    bullets: ["Role-Based Access Control", "Collaborative Shared Inbox", "Team Performance Analytics", "Secure Data Compartments"],
    color: "#EF4444"
  },
  {
    icon: Mail,
    title: "Omnichannel Communications Integration",
    desc: "Coordinate client follow-ups across email, SMS, and direct WhatsApp links. Ensure your communication history is fully indexed under a single client card timeline.",
    bullets: ["Email Integration Adapters", "SMS Gateway setups", "Chronological Contact History", "Client Profile Card tracking"],
    color: "#F59E0B"
  }
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00E5A0] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20">
            Platform Capabilities & Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Comprehensive CRM Services <span className="gradient-text">For Growing Teams</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Discover how NexDial CRM streamlines lead capturing, WhatsApp template campaigns, team routing, and AI-driven conversion intelligence.
          </p>
        </AnimatedSection>

        {/* Services Layout */}
        <div className="space-y-12">
          {detailedServices.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            return (
              <AnimatedSection key={service.title} delay={index * 0.05} className="w-full">
                <div className="glass-card-strong p-8 lg:p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-[0.04] pointer-events-none" style={{ backgroundColor: service.color }} />
                  
                  <div className={`grid lg:grid-cols-[1.1fr,1.3fr] gap-12 items-center`}>
                    
                    {/* Content Left */}
                    <div className="space-y-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: service.color }} />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
                        {service.title}
                      </h2>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">
                        {service.desc}
                      </p>
                      
                      <div className="flex gap-3 pt-2">
                        <Link href="/request-demo" className="btn-primary text-xs !py-3 !px-5 flex items-center gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/contact" className="btn-secondary text-xs !py-3 !px-5">
                          Download Service Sheet
                        </Link>
                      </div>
                    </div>

                    {/* Features Right */}
                    <div className="space-y-4 lg:border-l lg:border-white/[0.06] lg:pl-12">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                        Common Operations & Capabilities
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {service.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] transition-all"
                          >
                            <ShieldCheck className="w-4.5 h-4.5 text-[#00E5A0] flex-shrink-0" />
                            <span className="text-xs text-[#CBD5E1] font-semibold">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </div>
  );
}
