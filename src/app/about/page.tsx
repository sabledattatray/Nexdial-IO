"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Shield, Target, Award, Users, MapPin, Zap } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Operational Excellence",
    desc: "Providing premium BPO services with continuous metric optimization, high first-contact-resolution rates, and elite agent training workflows.",
    color: "#0057D9"
  },
  {
    icon: Zap,
    title: "AI-First Technology",
    desc: "Developing next-generation AI agents, predictive scoring tools, and LLM automation to augment human capacity and reduce overhead.",
    color: "#00C2FF"
  },
  {
    icon: Shield,
    title: "Sovereign Compliance",
    desc: "Upholding peak security benchmarks. Fully aligned with SOC2 Type II, HIPAA, ISO 27001, and regional GDPR policies.",
    color: "#00E5A0"
  }
];

const leaders = [
  { name: "Vikram Dev", role: "Chief Executive Officer", desc: "Ex-Genesys Lead Architect, 20+ years of telecom and CRM engineering experience." },
  { name: "Dr. Ananya Roy", role: "VP of Artificial Intelligence", desc: "PhD in NLP & Deep Learning. Oversees our Voice AI nodes and transcript models." },
  { name: "Marcus Stone", role: "Head of Global Support Operations", desc: "Oversees 1,200+ agents across APAC, Europe, and North American delivery hubs." }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            About DBS Mintek
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Pioneering the Future of <span className="gradient-text">Customer CX</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4 leading-relaxed">
            DBS Mintek is a global Contact Center Operating System and premium BPO provider. We merge enterprise CRM, predictive dialing, and advanced cognitive AI to streamline enterprise outreach and inbound support.
          </p>
        </AnimatedSection>

        {/* Pillars Section */}
        <AnimatedSection className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Operational Pillars
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              The core principles driving our technology development and service delivery globally.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <StaggerItem key={pil.title}>
                  <div className="glass-card p-8 h-full relative overflow-hidden group hover:border-white/[0.1] transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: pil.color }} />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${pil.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: pil.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{pil.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{pil.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimatedSection>

        {/* Leadership Team */}
        <AnimatedSection className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Executive Leadership
            </h2>
            <p className="text-[#64748B] text-[#64748B] text-sm mt-2">
              Meet the industry architects driving our global customer experience strategy.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
            {leaders.map((leader) => (
              <StaggerItem key={leader.name}>
                <div className="glass-card p-6 h-full border-white/[0.04] flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{leader.name}</h3>
                    <p className="text-xs font-semibold text-[#00C2FF] mt-0.5">{leader.role}</p>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mt-4">{leader.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex gap-2">
                    <span className="text-[10px] text-[#64748B] font-mono">Expertise: Telephony, AI Systems</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Security certification showcase */}
        <AnimatedSection className="glass-card-strong p-8 lg:p-12 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Enterprise Compliance & Security Assured</h3>
          <p className="text-[#94A3B8] text-sm max-w-2xl mx-auto mb-8">
            DBS Mintek processes millions of calls and transactions securely every single day. We undergo continuous audit scans to meet HIPAA, GDPR, SOC2 Type II, and ISO requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["SOC2 Type II Certified", "GDPR Data Sovereign", "HIPAA Health Compliance", "ISO 27001 ISMS"].map((cert) => (
              <div key={cert} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#00E5A0]" />
                {cert}
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
