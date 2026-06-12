"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Database, PhoneCall, Inbox, Users, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: Database,
    title: "No More Spreadsheets",
    description: "Stop copying and pasting lead info into static sheets. NexDial automatically captures every form submission, call, and WhatsApp chat in real time.",
    bulletPoints: [
      "Auto-captures form leads",
      "Centralized contact database",
      "No manual data entry errors",
      "Filter by status & tag"
    ],
    color: "#EF4444",
    gradient: "from-[#EF4444] to-[#F87171]",
  },
  {
    icon: PhoneCall,
    title: "No More Missed Calls",
    description: "Every call is logged instantly, even after hours. Assign follow-up reminders right away so hot prospects never fall through the cracks.",
    bulletPoints: [
      "Inbound/outbound call logs",
      "Missed call alerts",
      "Post-call notes in 1-click",
      "Schedule call-backs instantly"
    ],
    color: "#00C2FF",
    gradient: "from-[#00C2FF] to-[#60A5FA]",
  },
  {
    icon: Inbox,
    title: "Every Customer Tracked",
    description: "See the complete conversation timeline in a single feed. No more asking 'Who spoke to this client last?' or digging through separate inbox apps.",
    bulletPoints: [
      "Unified timeline feed",
      "WhatsApp & SMS history",
      "Form submission details",
      "Custom tags and notes"
    ],
    color: "#00E5A0",
    gradient: "from-[#00E5A0] to-[#34D399]",
  },
  {
    icon: Users,
    title: "Built-In Team Collaboration",
    description: "Assign leads to specific agents, share internal notes on contact profiles, and work together to close deals without stepping on toes.",
    bulletPoints: [
      "Lead owner assignment",
      "Internal staff notes",
      "Shared inbox view",
      "Activity tracking per member"
    ],
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#C084FC]",
  },
];

export function GlobalPresence() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[#081120]" />
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.01] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-20">
          <p className="text-sm font-semibold text-[#00E5A0] uppercase tracking-widest mb-4">
            Why NexDial
          </p>
          <h2 className="section-title text-white mb-4">
            Designed for <span className="gradient-text">Growing Teams</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Traditional CRMs are too complicated, and spreadsheets are too messy. NexDial is the sweet spot that keeps small businesses organized.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" staggerDelay={0.08}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title} className="h-full">
              <div className="glass-card group p-6 h-full flex flex-col justify-between hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden">
                {/* Glow accent */}
                <div 
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
                  style={{ backgroundColor: benefit.color }}
                />
                
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
                    style={{ background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}08)` }}
                  >
                    <benefit.icon className="w-5 h-5" style={{ color: benefit.color }} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00C2FF] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-6 border-t border-white/[0.04] mt-auto">
                  {benefit.bulletPoints.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: benefit.color }} />
                      <span className="text-xs text-[#CBD5E1] font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
