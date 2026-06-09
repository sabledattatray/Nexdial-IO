"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Globe, Users, Shield, ArrowRight } from "lucide-react";

const partners = [
  { name: "Microsoft Partner", role: "Gold Cloud Platform Partner", desc: "Co-selling CRM integrations and dynamic Azure database hosting nodes." },
  { name: "Twilio Segment", role: "Customer Data Platform Partner", desc: "Piping live call disposition metrics to Segment CDP databases." },
  { name: "Salesforce AppExchange", role: "Integrated CRM Solutions Provider", desc: "Available for native installation inside Salesforce Service Cloud consoles." }
];

export default function PartnersPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Strategic Alliances
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Our Ecosystem <span className="gradient-text">Partners</span>
          </h1>
        </AnimatedSection>

        {/* Partners list */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <div className="glass-card-strong p-6 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0057D9]/10 border border-[#0057D9]/20 flex items-center justify-center text-[#00C2FF]">
                    <Globe className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-white leading-snug">{partner.name}</h3>
                  <p className="text-[10px] text-[#00C2FF] font-semibold uppercase">{partner.role}</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{partner.desc}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-semibold text-[#00C2FF] hover:underline cursor-pointer">
                  <span>Explore Integration</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
