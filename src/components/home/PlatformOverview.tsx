"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  LayoutDashboard, Users, Phone, BarChart3,
  Bot, Shield, Headphones, MonitorSmartphone,
  Database, Zap, Globe, Layers,
} from "lucide-react";

const modules = [
  {
    id: "crm",
    icon: Users,
    title: "CRM Suite",
    description: "Complete customer relationship management with 360° views, pipeline management, and AI lead scoring",
    features: ["Contact Management", "Pipeline Tracking", "Lead Scoring", "Activity History", "Customer 360°", "Email Tracking"],
    color: "#0057D9",
  },
  {
    id: "dialer",
    icon: Phone,
    title: "Dialer Platform",
    description: "Multi-mode dialer with predictive, power, progressive, and preview modes plus WebRTC calling",
    features: ["Predictive Dialer", "Power Dialer", "IVR Builder", "Call Recording", "WebRTC", "DNC Management"],
    color: "#00C2FF",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Hub",
    description: "Real-time dashboards, custom reports, and predictive analytics with Power BI integration",
    features: ["Real-Time Dashboards", "Custom Reports", "Predictive Analytics", "PDF/Excel Export", "Power BI", "Trend Analysis"],
    color: "#00E5A0",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Operations",
    description: "18+ AI capabilities including conversation intelligence, sentiment analysis, and voice AI agents",
    features: ["Agent Copilot", "Call Summarization", "Sentiment Analysis", "Auto QA", "Voice AI", "AI Coaching"],
    color: "#8B5CF6",
  },
  {
    id: "agent",
    icon: Headphones,
    title: "Agent Portal",
    description: "Feature-rich agent workspace with gamification, knowledge base, and AI-powered assistance",
    features: ["Agent Dashboard", "Call Controls", "Knowledge Base", "Leaderboard", "Break Management", "Internal Chat"],
    color: "#F59E0B",
  },
  {
    id: "supervisor",
    icon: MonitorSmartphone,
    title: "Supervisor Portal",
    description: "Live monitoring, call listening, whisper mode, and workforce management tools",
    features: ["Live Monitoring", "Call Whisper", "Barge-In", "Quality Assurance", "Shift Planning", "Performance Reviews"],
    color: "#EF4444",
  },
  {
    id: "admin",
    icon: Shield,
    title: "Admin Panel",
    description: "Super admin dashboard with tenant management, billing, security center, and system health",
    features: ["Tenant Management", "Billing", "Security Center", "Audit Logs", "Feature Toggles", "System Health"],
    color: "#06B6D4",
  },
  {
    id: "client",
    icon: LayoutDashboard,
    title: "Client Portal",
    description: "Self-service client dashboard with campaign monitoring, reports, invoices, and support tickets",
    features: ["Campaign Monitoring", "Call Reports", "Recordings", "Invoices", "Support Tickets", "Downloads"],
    color: "#10B981",
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automation Engine",
    description: "No-code workflow builder with drag-and-drop automation, triggers, and scheduled jobs",
    features: ["Workflow Builder", "Email Automation", "SMS Automation", "API Triggers", "Webhooks", "Scheduled Jobs"],
    color: "#EC4899",
  },
  {
    id: "communication",
    icon: Globe,
    title: "Omnichannel Hub",
    description: "Unified communication center for voice, email, SMS, WhatsApp, video calls, and team chat",
    features: ["Voice", "Email", "SMS", "WhatsApp", "Video Calls", "Internal Chat"],
    color: "#6366F1",
  },
  {
    id: "recruitment",
    icon: Database,
    title: "Recruitment",
    description: "Complete hiring platform with ATS, resume parsing, interview scheduling, and career portal",
    features: ["Job Management", "Resume Parsing", "Interview Scheduling", "Career Portal", "Offer Management", "Hiring Analytics"],
    color: "#14B8A6",
  },
  {
    id: "knowledge",
    icon: Layers,
    title: "Knowledge Base",
    description: "Internal documentation, SOPs, training materials, and AI-powered search for agents",
    features: ["Documentation", "Training Materials", "Video Tutorials", "SOP Management", "Version Control", "AI Search"],
    color: "#F97316",
  },
];

export function PlatformOverview() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-widest mb-4">
            Platform Architecture
          </p>
          <h2 className="section-title text-white mb-4">
            One Platform, <span className="gradient-text">Infinite Possibilities</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A complete Contact Center Operating System with 12 integrated modules working seamlessly together
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {/* Architecture Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`glass-card p-5 text-center group transition-all duration-300 ${
                  activeModule === module.id
                    ? "border-white/[0.15] bg-white/[0.06]"
                    : "hover:border-white/[0.1]"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ background: `linear-gradient(135deg, ${module.color}20, ${module.color}08)` }}
                >
                  <module.icon className="w-5 h-5" style={{ color: module.color }} />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{module.title}</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {module.features.slice(0, 2).map((f) => (
                    <span key={f} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#64748B]">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Expanded Detail */}
          <AnimatePresence>
            {activeModule && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6"
              >
                {modules.filter(m => m.id === activeModule).map((module) => (
                  <div key={module.id} className="glass-card-strong p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${module.color}25, ${module.color}08)` }}
                      >
                        <module.icon className="w-7 h-7" style={{ color: module.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                        <p className="text-sm text-[#94A3B8] mt-1">{module.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {module.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: module.color }} />
                          <span className="text-xs text-[#CBD5E1] font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connection Lines Visualization */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <div className="flex -space-x-1">
                {["#0057D9", "#00C2FF", "#00E5A0", "#8B5CF6", "#F59E0B"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full border-2 border-[#0F172A]" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs text-[#94A3B8] font-medium">All modules connected via unified API</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
