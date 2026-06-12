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
    title: "Omnichannel Lead Capture",
    description: "Leads are instantly collected from website forms, WhatsApp messages, phone calls, CSV imports, or our custom API. Never let a high-value prospect slip through the cracks again.",
    details: ["WhatsApp Webhook", "Custom Form Builders", "CSV Lead Importer", "Developer API"],
    color: "#0057D9",
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    step: "02",
    icon: Inbox,
    title: "Unified Workspace",
    description: "Every inquiry drops into a single, clean interface.",
    details: ["Real-time Sync", "Custom Lead Statuses"],
    color: "#00C2FF",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    step: "03",
    icon: CalendarDays,
    title: "Automated Follow-ups",
    description: "Schedule tasks and set visual notifications.",
    details: ["Drag-and-drop Kanban", "Smart Alerts"],
    color: "#8B5CF6",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Analyze response times, conversion funnels, and agent performance from a centralized dashboard. Optimize your engine with data.",
    details: ["Conversion Funnels", "Response Time Audit", "Daily Reports"],
    color: "#00E5A0",
    className: "md:col-span-2 lg:col-span-2",
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative perspective-1000" staggerDelay={0.1}>
          {steps.map((step, index) => (
            <StaggerItem key={step.step} className={`relative z-10 ${step.className} transform-3d`}>
              <div className="glass-card hover-3d-lift group p-8 h-full flex flex-col justify-between hover:border-white/[0.2] transition-all duration-700 relative overflow-hidden">
                {/* Subtle Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Step Number Badge */}
                <div 
                  className="absolute top-6 right-6 text-5xl font-extrabold text-white/[0.02] group-hover:text-white/[0.08] transition-colors duration-700"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {step.step}
                </div>

                {/* Hover Spotlight Glow */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: step.color }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-lg`}
                    style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-8 max-w-[90%]">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-3 mt-auto pt-6 border-t border-white/[0.04] relative z-10">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ backgroundColor: step.color }} />
                      <span className="text-xs text-[#CBD5E1] font-medium tracking-wide">{detail}</span>
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
