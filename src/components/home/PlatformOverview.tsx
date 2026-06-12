"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import {
  Download,
  Inbox,
  CalendarDays,
  LineChart,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Download,
    title: "Capture Leads",
    description: "Leads are instantly collected from website forms, WhatsApp messages, phone calls, CSV imports, or our custom API.",
    details: ["WhatsApp Webhook", "Custom Form Builders", "CSV Lead Importer", "Developer API"],
    color: "#0057D9",
    gradient: "from-[#0057D9] to-[#00C2FF]",
  },
  {
    step: "02",
    icon: Inbox,
    title: "Track in Unified Inbox",
    description: "Every inquiry drops into a single, clean workspace. Assign status, tag categories, and instantly see contact history.",
    details: ["Real-time Sync", "Custom Lead Statuses", "Lead Health Scoring", "Interaction Timeline"],
    color: "#00C2FF",
    gradient: "from-[#00C2FF] to-[#00E5A0]",
  },
  {
    step: "03",
    icon: CalendarDays,
    title: "Follow Up & Convert",
    description: "Schedule follow-up tasks, set automated notifications, and move leads through your visual Kanban pipeline.",
    details: ["Drag-and-drop Kanban", "Auto-scheduled Tasks", "Smart Notifications", "Call Outcomes Log"],
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Measure & Improve",
    description: "Analyze response times, conversion funnels, and agent performance from a centralized analytics dashboard.",
    details: ["Conversion Funnels", "Response Time Audit", "Daily Performance Reports", "Excel/CSV Export"],
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
  },
];

export function PlatformOverview() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-20">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="section-title text-white mb-4">
            From First Contact to <span className="gradient-text">Closed Deal</span>
          </h2>
          <p className="section-subtitle mx-auto">
            NexDial makes managing your sales process incredibly simple. Here is how it streamlines your day-to-day operations.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative" staggerDelay={0.1}>
          {/* Horizontal line connecting steps on large screens */}
          <div className="hidden xl:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-white/[0.04] z-0" />

          {steps.map((step, index) => (
            <StaggerItem key={step.step} className="relative z-10">
              <div className="glass-card group p-6 h-full flex flex-col justify-between hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden">
                {/* Step Number Badge */}
                <div 
                  className="absolute top-4 right-4 text-4xl font-extrabold text-white/[0.03] group-hover:text-white/[0.06] transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {step.step}
                </div>

                {/* Glow */}
                <div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ backgroundColor: step.color }}
                />

                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}
                    style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 mt-auto pt-4 border-t border-white/[0.04]">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                      <span className="text-xs text-[#CBD5E1] font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs text-[#94A3B8] font-medium">Ready to see it in action?</span>
            <a href="/request-demo" className="text-xs font-bold text-[#00C2FF] hover:text-[#00E5A0] flex items-center gap-1 transition-colors">
              Get Started Now <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
