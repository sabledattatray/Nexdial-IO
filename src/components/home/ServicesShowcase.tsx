"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import {
  Inbox,
  Users,
  CalendarCheck,
  Kanban,
  PhoneCall,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Inbox,
    title: "Unified Inbox",
    description: "All customer interactions from WhatsApp, website forms, phone calls, and emails in one central feed.",
    color: "#0057D9",
    href: "/solutions#inbox",
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Build complete profiles with custom tags, notes, communication history, and contact details for every lead.",
    color: "#00C2FF",
    href: "/solutions#leads",
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up Engine",
    description: "Never miss a deal. Get automatic reminders, scheduled tasks, and intelligent suggestions for next steps.",
    color: "#00E5A0",
    href: "/solutions#followups",
  },
  {
    icon: Kanban,
    title: "Pipeline View",
    description: "Drag-and-drop Kanban board to visualize deal stages, track sales health, and manage lead status effortlessly.",
    color: "#8B5CF6",
    href: "/crm/pipeline",
  },
  {
    icon: PhoneCall,
    title: "Call Logging",
    description: "Track every inbound and outbound call, record outcomes, set follow-ups, and log notes in one click.",
    color: "#F59E0B",
    href: "/solutions#calls",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Get actionable business insights with conversion metrics, response speeds, and team activity analytics.",
    color: "#EC4899",
    href: "/crm/dashboard",
  },
];

export function ServicesShowcase() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00E5A0] uppercase tracking-widest mb-4">
            Core Features
          </p>
          <h2 className="section-title text-white mb-4">
            Everything You Need to <span className="gradient-text">Close More Deals</span>
          </h2>
          <p className="section-subtitle mx-auto">
            NexDial replaces messy spreadsheets and disjointed tools with a simple, unified inbox and CRM designed for small business growth.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Link href={feature.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="glass-card group p-6 h-full cursor-pointer hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: feature.color }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)` }}
                    >
                      <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#0057D9] group-hover:text-[#00C2FF] transition-colors">
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
