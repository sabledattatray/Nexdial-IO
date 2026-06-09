"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Award, ShieldCheck, Heart, Sparkles, MessageSquare } from "lucide-react";

const clientRoster = [
  { company: "Velo Payments", sector: "Fintech", quote: "DBS Mintek's Voice AI agent handled 45,000 billing calls during our transition with a 92% resolution rate.", author: "Marcus Vance, Director of Support" },
  { company: "Apex Telehealth", sector: "Healthcare", quote: "The HIPAA-compliant CRM and predictive dialer tripled our scheduling efficiency inside Noida delivery teams.", author: "Dr. Sarah Lin, COO" },
  { company: "Zeta Retailers", sector: "E-Commerce", quote: "Omichannel WhatsApp support decreased tickets by 35% during the holiday sales rush.", author: "Clara Benson, Head of CX" }
];

export default function ClientsPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Enterprise Client Roster
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Trusted by <span className="gradient-text">500+ Companies</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            See how scaling startups and global Fortune 500 enterprises rely on DBS Mintek for high-volume support delivery.
          </p>
        </AnimatedSection>

        {/* Testimonials */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-20" staggerDelay={0.06}>
          {clientRoster.map((item) => (
            <StaggerItem key={item.company}>
              <div className="glass-card-strong p-8 h-full flex flex-col justify-between hover:border-white/[0.1] transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] font-bold text-[#00C2FF]">
                      {item.sector}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white italic leading-relaxed">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] space-y-1">
                  <h4 className="text-xs font-bold text-white">{item.company}</h4>
                  <p className="text-[10px] text-[#64748B]">{item.author}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
