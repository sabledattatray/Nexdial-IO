"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Download, FileText, ArrowRight } from "lucide-react";

const resources = [
  { title: "2026 Small Business CRM Scaling Playbook", type: "PDF / Scaling Manual", size: "4.8 MB" },
  { title: "Lead CSV Import Template & Configuration Map", type: "CSV / Schema Template", size: "0.2 MB" },
  { title: "WhatsApp Follow-up Templates & Conversion Guide", type: "PDF / Conversion Playbook", size: "2.1 MB" }
];

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00E5A0] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20">
            Resource Library
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Whitepapers & <span className="gradient-text">E-Books</span>
          </h1>
        </AnimatedSection>

        {/* Resources list */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
          {resources.map((res) => (
            <StaggerItem key={res.title}>
              <div className="glass-card-strong p-6 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0057D9]/10 border border-[#0057D9]/20 flex items-center justify-center text-[#00C2FF]">
                    <FileText className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-white leading-snug">{res.title}</h3>
                  <p className="text-[10px] text-[#64748B] font-semibold uppercase">{res.type}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#CBD5E1] font-semibold">
                  <span className="text-[#64748B]">Size: {res.size}</span>
                  <button className="flex items-center gap-1 text-[#00C2FF] hover:underline">
                    Download
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
