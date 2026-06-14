"use client";

import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Shield, Inbox, Brain, Zap, Server } from "lucide-react";

const pillars = [
  {
    icon: Inbox,
    title: "Eradicating Fragmentation",
    desc: "We believe that context-switching between WhatsApp, email, and spreadsheets is the silent killer of revenue. NexDial unifies every interaction into a single, high-velocity timeline.",
    color: "#00C2FF"
  },
  {
    icon: Brain,
    title: "Algorithmic Precision",
    desc: "Sales is not a guessing game; it is a mathematical equation. Our integrated AI models eliminate human error by dictating exactly who to follow up with, and when.",
    color: "#8B5CF6"
  },
  {
    icon: Shield,
    title: "Enterprise Architecture",
    desc: "Built on a multi-tenant cloud infrastructure with absolute row-level data isolation, military-grade encryption, and uncompromising 99.99% uptime SLAs.",
    color: "#00E5A0"
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden font-sans text-slate-300">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00C2FF]/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#00E5A0]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-32">
          <span className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            The NexDial Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mt-8 leading-tight tracking-tight">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00E5A0]">Velocity.</span>
          </h1>
          <p className="text-[#94A3B8] text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl mx-auto font-light">
            We are not just building another software tool. We are engineering the ultimate operational ecosystem to destroy sales friction and transform chaotic companies into highly predictable revenue machines.
          </p>
        </AnimatedSection>

        {/* Founder Story Section */}
        <AnimatedSection className="mb-32">
          <div className="glass-card-strong p-8 lg:p-16 rounded-[2.5rem] border border-white/[0.06] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00C2FF]/10 blur-[120px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center relative z-10">
              
              {/* Image Column */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2FF]/20 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[4/5] w-full rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081120] via-transparent to-transparent z-10" />
                  <Image
                    src="/datta.png"
                    alt="Datta Sable, Founder & CEO"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Datta Sable</h3>
                    <p className="text-[#00C2FF] font-semibold text-sm tracking-wide mt-1">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="space-y-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  "Most businesses are drowning in their own disconnected data."
                </h2>
                
                <div className="space-y-6 text-[#94A3B8] text-base leading-relaxed">
                  <p>
                    Over the years, I've watched countless organizations hit an artificial growth ceiling simply because their communication infrastructure was fundamentally broken. Sales reps were spending 40% of their day updating spreadsheets. Customer support was constantly context-switching between WhatsApp phones and disjointed email inboxes. Revenue was leaking from the pipeline not because the product was bad, but because the follow-up process was chaotic.
                  </p>
                  <p>
                    <strong className="text-white font-semibold">I built NexDial to eradicate that chaos.</strong>
                  </p>
                  <p>
                    Our mission is to provide small and mid-sized enterprises with the same rigorous, automated, high-velocity sales architecture that multi-billion dollar tech companies use. By centralizing every customer interaction into a single visual pipeline and leveraging AI to dictate the next best action, we allow your team to stop doing admin work and start doing what actually matters: closing deals and serving customers.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/[0.05]">
                  <a 
                    href="https://dattasable.com/blog" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl border border-white/10 transition-colors"
                  >
                    Read My Technical Blog
                    <Zap className="w-4 h-4 text-[#00C2FF]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Operational Pillars Section */}
        <AnimatedSection className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our Core Architecture
            </h2>
            <p className="text-[#64748B] mt-4">
              The fundamental principles that govern our product engineering.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <StaggerItem key={pil.title}>
                  <div className="glass-card-strong p-10 h-full relative overflow-hidden group hover:border-white/[0.1] transition-all duration-500 rounded-[2rem]">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: pil.color }} />
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border"
                      style={{ backgroundColor: `${pil.color}10`, borderColor: `${pil.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pil.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{pil.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{pil.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimatedSection>

        {/* Enterprise Trust Markers */}
        <AnimatedSection className="glass-card-strong p-10 lg:p-16 text-center rounded-[2.5rem] relative overflow-hidden border-t border-[#00C2FF]/20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent pointer-events-none" />
          <Server className="w-12 h-12 text-[#00C2FF] mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Enterprise-Grade Reliability</h3>
          <p className="text-[#94A3B8] text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Your data is your business. NexDial is engineered on top of highly redundant cloud infrastructure with deep schema-level isolation, ensuring your operations are never compromised.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {["SOC2 Type II Compliant Architecture", "99.99% Uptime SLA", "256-Bit AES Encryption", "Automated Redundant Backups"].map((cert) => (
              <div key={cert} className="px-5 py-2.5 rounded-full bg-[#081120] border border-white/[0.08] text-xs sm:text-sm font-semibold text-[#CBD5E1] flex items-center gap-3 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#00E5A0] shadow-[0_0_8px_#00E5A0]" />
                {cert}
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
