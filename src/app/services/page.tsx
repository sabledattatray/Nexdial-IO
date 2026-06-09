"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Phone, PhoneOutgoing, Headphones, MessageSquare, ShieldCheck, Mail, Database, Wrench, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    icon: Phone,
    title: "Inbound Customer Support",
    desc: "Deliver 24/7 client care across all regions. Our agents integrate with your custom CRM and ERP databases, powered by real-time AI knowledge assistants to resolve tier-1 and tier-2 calls instantly.",
    bullets: ["Customer Inquiry Management", "Account Setup & Activation", "Billing, Invoice & Payments", "Order Status & Shipment Tracking"],
    color: "#0057D9"
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound Sales & Telemarketing",
    desc: "Accelerate pipeline development and close more deals. Combined with our Predictive Dialer engine, our sales specialists call pre-scored leads to maximize acquisition rates.",
    bullets: ["Cold & Warm Outreach Campaigns", "Product Upgrades & Cross-selling", "Contract Renewal Outreach", "Lead Qualification & Nurturing"],
    color: "#00C2FF"
  },
  {
    icon: Wrench,
    title: "Technical Support Operations",
    desc: "In-depth technical problem solving for hardware, software, and SaaS setups. Our agents undergo specialized training to handle Tier 1-3 helpdesk queries.",
    bullets: ["Troubleshooting & Device Configuration", "Software Installation Support", "SaaS Technical Account Management", "System Status Outage Resolution"],
    color: "#8B5CF6"
  },
  {
    icon: Database,
    title: "Back Office & KPO Operations",
    desc: "Outsource complex non-voice workflows to specialized professionals. We process data, verify IDs, manage documentation, and audit records with strict quality standards.",
    bullets: ["KYC & Identity Verification", "Data Entry, Validation & Sync", "Claims & Invoice Auditing", "Contract & SOP Management"],
    color: "#00E5A0"
  },
  {
    icon: Shield,
    title: "Collections & Debt Recovery",
    desc: "Ethical, legally-compliant collections operations. We leverage automated outbound messaging, IVR queues, and professional negotiating agents to secure overdue accounts.",
    bullets: ["Early-stage reminder calls", "Payment Arrangement setups", "Skip Tracing and Audits", "FDCPA & TCPA Compliant workflows"],
    color: "#EF4444"
  },
  {
    icon: MessageSquare,
    title: "Omnichannel Digital CX",
    desc: "Coordinate client chats over email, web chat, and WhatsApp Business API. Live agents and conversational bots collaborate seamlessly to resolve digital inquiries.",
    bullets: ["WhatsApp & SMS Business Chat", "In-App/Web Chat Support", "AI Email Drafting & Routing", "Social Media Community Care"],
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
            Enterprise BPO & Call Center Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Next-Gen Customer Support <span className="gradient-text">At Global Scale</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Discover our comprehensive suite of customer engagement, telemarketing, data verification, and technical support services.
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
