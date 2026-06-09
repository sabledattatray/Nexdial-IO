"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Users, PhoneCall, BarChart3, Shield,
  Headphones, MonitorSmartphone, LayoutDashboard, Zap,
  CheckCircle, ArrowRight, Play, Server, Database
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: "crm",
    title: "Enterprise CRM Suite",
    subtitle: "Lead & Contact Management",
    icon: Users,
    desc: "A fully integrated customer relationship management system specifically built for contact centers. Get a unified 360-degree customer profile with real-time sync across call events, tickets, and automated pipelines.",
    features: [
      "AI-driven lead prioritization & scoring",
      "Dynamic lead distribution rules & queues",
      "Interactive pipeline & opportunity tracker",
      "Omnichannel chat history (Email, SMS, WhatsApp)",
      "Automated appointment booking & calendar sync",
      "Custom contact fields & document attachments"
    ],
    color: "#0057D9",
    metric: "35% Increase in Conversion"
  },
  {
    id: "dialer",
    title: "Next-Gen Dialer Engine",
    subtitle: "Outbound Outreach Acceleration",
    icon: PhoneCall,
    desc: "Power, progressive, predictive, and preview dialing options engineered to maximize agent talk time. Instantly integrates with Asterisk, Vicidial, Twilio, and regional SIP trunks.",
    features: [
      "Predictive algorithm based on agent availability",
      "Answering Machine Detection (AMD) accuracy >98%",
      "Custom IVR builder with drag-and-drop nodes",
      "Voicemail Drop & smart callbacks scheduling",
      "DNC list scrubbing & local regulatory compliance",
      "In-browser WebRTC calling with crystal-clear voice"
    ],
    color: "#00C2FF",
    metric: "4x Agent Talk Time Boost"
  },
  {
    id: "portals",
    title: "Agent & Supervisor Portals",
    subtitle: "Unified Workspace & Coaching",
    icon: Headphones,
    desc: "Empower front-line agents with AI copilot scripts and give managers complete visibility into live call streams, whispers, and scheduling.",
    features: [
      "AI-assisted response scripting & QA coaching",
      "Live call listening, whispering, and barge-in",
      "Gamified agent leaderboards & achievements",
      "Shift planning & workforce management",
      "Wrap-up notes, disposition tracking, and tags",
      "Built-in internal team collaboration & chat"
    ],
    color: "#8B5CF6",
    metric: "92% Agent Satisfaction Score"
  },
  {
    id: "tenant-saas",
    title: "Multi-Tenant SaaS Panel",
    subtitle: "White-Label & Sub-Domain Architecture",
    icon: Shield,
    desc: "Deploy DBS Mintek® for multiple branches, external BPOs, or re-sell it as your own SaaS platform. Independent branding, billing, users, campaigns, and databases per tenant.",
    features: [
      "White-label branding & custom domain mapping",
      "Independent databases, Redis instances, and keys",
      "Super admin subscription & billing manager (Stripe)",
      "Role-Based Access Control (RBAC) with audit logs",
      "Dedicated SIP trunk mapping & call routing rules",
      "Tenant-specific AI configurations & prompts"
    ],
    color: "#00E5A0",
    metric: "100% Data Isolation SLA"
  }
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(solutions[0].id);
  const activeSol = solutions.find((s) => s.id === activeTab) || solutions[0];

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            DBS Mintek® Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Built for the Modern <span className="gradient-text">Enterprise Center</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Explore our modules. From individual CRM and dialers to an all-in-one multi-tenant SaaS deployment, our technology adapts to your scale.
          </p>
        </AnimatedSection>

        {/* Tab Selection */}
        <AnimatedSection delay={0.1} className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === sol.id
                      ? "bg-gradient-to-r from-[#0057D9] to-[#00C2FF] text-white shadow-xl shadow-[#0057D9]/20"
                      : "text-[#64748B] hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {sol.title}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Content Block */}
        <AnimatedSection delay={0.2} className="glass-card-strong p-8 lg:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: activeSol.color }} />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column Info */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                {activeSol.subtitle}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
                {activeSol.title}
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed">
                {activeSol.desc}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm font-bold text-white">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSol.color }} />
                Proven Impact: {activeSol.metric}
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/request-demo" className="btn-primary text-sm !py-3 !px-6 flex items-center gap-2">
                  Request Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary text-sm !py-3 !px-6">
                  Talk to Expert
                </Link>
              </div>
            </div>

            {/* Right Column Feature Grid */}
            <div className="space-y-4 lg:border-l lg:border-white/[0.06] lg:pl-12">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                Included Capabilities
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {activeSol.features.map((feature, i) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-[#00E5A0] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#CBD5E1] font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Integration Callout */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="glass-card p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center flex-shrink-0">
                <Server className="w-6 h-6 text-[#00E5A0]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Hybrid Cloud Deployment Options</h3>
                <p className="text-sm text-[#64748B] mt-1">Deploy locally on-premise, inside your private Azure VPC, or use our fully managed hosting clusters.</p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <Link href="/technology" className="btn-secondary text-sm !py-3 !px-6 text-center w-full md:w-auto block">
                Technical Architecture
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
