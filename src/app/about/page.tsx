"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Shield, Target, Award, Users, Inbox, Brain, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Inbox,
    title: "Unified Workspace",
    desc: "Consolidating phone calls, WhatsApp messages, website form submissions, and manual entries into a single feed to eliminate communication clutter.",
    color: "#0057D9"
  },
  {
    icon: Brain,
    title: "AI-Driven Action",
    desc: "Integrating self-learning suggestions, next-best-action alerts, and predictive revenue forecasting models to guide sales teams constructively.",
    color: "#8B5CF6"
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    desc: "Upholding industry-standard data encryption, secure local backups, and absolute privacy safeguards to keep customer data safe.",
    color: "#00E5A0"
  }
];

const team = [
  {
    name: "Datta Sable",
    role: "Founder & Lead Architect",
    desc: "Full-stack software architect with a vision to eliminate communication chaos for small businesses. Oversees core product engineering and AI research.",
    initials: "DS",
    color: "#0057D9",
    image: "/datta.png"
  },
  {
    name: "Rahul K.",
    role: "Head of Customer Success",
    desc: "Dedicated to helping businesses successfully transition away from messy spreadsheets and adopt structured sales automation workflows.",
    initials: "RK",
    color: "#8B5CF6",
    image: "/rahul.png"
  },
  {
    name: "Nisha P.",
    role: "Head of Operations",
    desc: "Ensures seamless onboarding, reliable API webhooks, robust system configurations, and round-the-clock platform availability.",
    initials: "NP",
    color: "#00E5A0",
    image: "/nisha.png"
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00E5A0]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            About NexDial
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Simplifying Customer <span className="gradient-text">Conversations</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4 leading-relaxed">
            NexDial is a unified business communication inbox and lightweight CRM built for small businesses. We replace fragmented apps and disjointed spreadsheets with a fast, structured, and intelligent sales execution platform.
          </p>
        </AnimatedSection>

        {/* Vision & Team Story */}
        <AnimatedSection className="mb-24 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white font-space-grotesk">
              Our Visionary Leadership
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              Meet the small, dedicated team building the next generation of sales and communication workspace tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div 
                key={member.name} 
                className="glass-card-strong p-8 relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl flex flex-col justify-between group hover:border-[#00C2FF]/30 transition-all duration-300 h-full"
              >
                <div 
                  className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity" 
                  style={{ backgroundColor: member.color }}
                />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    {member.image ? (
                      <div className="relative w-16 h-16 rounded-2xl border border-white/[0.08] overflow-hidden shrink-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          style={{ objectPosition: "center 20%" }}
                        />
                      </div>
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-2xl border border-white/[0.08] flex items-center justify-center shrink-0 text-xl font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${member.color}25, ${member.color}08)` }}
                      >
                        {member.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white font-space-grotesk">{member.name}</h3>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: member.color }}>{member.role}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute -top-6 -left-4 text-5xl text-white/5 font-serif select-none">&ldquo;</span>
                    <p className="text-sm text-[#CBD5E1] leading-relaxed italic relative z-10 pl-2">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Operational Pillars Section */}
        <AnimatedSection className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white font-space-grotesk">
              Our Operational Pillars
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              The core principles driving our product engineering and customer commitment.
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

        {/* Recognition Spotlight */}
        <AnimatedSection className="mb-24">
          <div className="glass-card-strong p-8 lg:p-12 rounded-3xl border border-white/[0.06] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00C2FF]/5 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#00E5A0]/5 blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center text-[#00E5A0] shrink-0">
                <Award className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>

              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-xs font-semibold text-[#00E5A0]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Product Excellence
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-space-grotesk">
                  Recognized for <span className="gradient-text">SMB Software Innovation</span>
                </h3>
                
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  NexDial was founded with a singular purpose: to make professional communication tools accessible to growing businesses without the complex overhead of enterprise-level software. By focusing on speed, clarity, and explainable AI heuristics, we ensure your team can focus on what matters most — closing deals and serving customers.
                </p>

                <p className="text-xs text-[#64748B]">
                  Dedicated to engineering clean workspaces, custom webhook triggers, and secure customer timelines.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Uptime & Privacy Showcase */}
        <AnimatedSection className="glass-card-strong p-8 lg:p-12 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Uptime & Privacy Assured</h3>
          <p className="text-[#94A3B8] text-sm max-w-2xl mx-auto mb-8">
            NexDial operates on high-speed servers with daily automated database backups, ensuring your business records are always safe and available whenever you need them.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["99.9% Scheduled Uptime", "Secure Local Backups", "100% Data Ownership", "Encrypted Form Submissions"].map((cert) => (
              <div key={cert} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-[#CBD5E1] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
                {cert}
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
