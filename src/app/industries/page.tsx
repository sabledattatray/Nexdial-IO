"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { HeartPulse, Landmark, ShieldCheck, PhoneCall, ShoppingBag, Truck, GraduationCap, Building } from "lucide-react";

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare & Medtech",
    desc: "Fully HIPAA-compliant patient scheduling, voice reminders, telehealth integrations, and records indexing.",
    metric: "99.8% HIPAA Compliance SLA",
    color: "#EF4444"
  },
  {
    icon: Landmark,
    title: "Banking & Fintech",
    desc: "Premium customer verification (KYC), account queries, fraud alert voice broadcasts, and collection strategies.",
    metric: "42% Reduction in Cost-Per-Contact",
    color: "#0057D9"
  },
  {
    icon: ShieldCheck,
    title: "Insurance & Underwriting",
    desc: "Claims processing, document collection, automated renewals outreach, and policy check-in support.",
    metric: "18% Spike in Renewal Conversion",
    color: "#00E5A0"
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Retail",
    desc: "Order status tracking, cart abandonment recovery campaigns, shipping query automation, and digital chat care.",
    metric: "3.5x Volume surge capacity",
    color: "#F59E0B"
  },
  {
    icon: PhoneCall,
    title: "Telecommunications",
    desc: "Technical troubleshooting, retention campaigns, plan upgrade telemarketing, and unified customer profiles.",
    metric: "92% First Contact Resolution (FCR)",
    color: "#00C2FF"
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    desc: "Dispatch calling, automated SMS delivery updates, delay notification voice agents, and driver support.",
    metric: "15s Average Speed of Answer",
    color: "#8B5CF6"
  }
];

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Target Industries
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Tailored Industry <span className="gradient-text">CX Workflows</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            DBS Mintek integrates directly into specialized vertical platforms to secure compliance and optimize operational KPIs.
          </p>
        </AnimatedSection>

        {/* Industry Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.06}>
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={ind.title}>
                <div className="glass-card-strong p-8 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: ind.color }} />
                  
                  <div className="space-y-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${ind.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: ind.color }} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00C2FF] transition-colors">{ind.title}</h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{ind.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#64748B]">Target Metric:</span>
                    <span className="text-xs font-bold text-white" style={{ color: ind.color }}>{ind.metric}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </div>
  );
}
