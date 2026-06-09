"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { ArrowUpRight, TrendingUp, Users, Clock, Percent, ShieldCheck, ExternalLink } from "lucide-react";
import Image from "next/image";

const cases = [
  {
    id: "fintech",
    category: "Fintech & Banking",
    title: "Global Neobank Scales Support to 5M+ Users with AI Voice Agents",
    description: "How a leading European neobank integrated our conversational Voice AI agent platform to handle tier-1 support calls, reducing average handle time (AHT) and increasing customer satisfaction.",
    metrics: [
      { label: "AHT Reduction", value: "42%", icon: Clock, color: "#0057D9" },
      { label: "Cost Per Contact", value: "-68%", icon: TrendingUp, color: "#00C2FF" },
      { label: "CSAT Improvement", value: "+18%", icon: Percent, color: "#00E5A0" },
    ],
    bgGradient: "from-[#0057D9]/10 via-[#00C2FF]/5 to-transparent",
    borderGlow: "rgba(0, 194, 255, 0.2)",
    accentColor: "#00C2FF",
  },
  {
    id: "healthcare",
    category: "Healthcare SaaS",
    title: "Telehealth Network Automates Patient Scheduling & Verification",
    description: "Our predictive dialer coupled with CRM automation enabled an enterprise healthcare provider to scale outreach operations while maintaining HIPAA compliance and clinical standards.",
    metrics: [
      { label: "Patient Reach", value: "310%", icon: Users, color: "#8B5CF6" },
      { label: "No-Show Rate", value: "-45%", icon: Clock, color: "#EC4899" },
      { label: "Compliance Score", value: "100%", icon: ShieldCheck, color: "#00E5A0" },
    ],
    bgGradient: "from-[#8B5CF6]/10 via-[#EC4899]/5 to-transparent",
    borderGlow: "rgba(139, 92, 246, 0.2)",
    accentColor: "#8B5CF6",
  },
  {
    id: "ecommerce",
    category: "E-Commerce & Retail",
    title: "Omnichannel Support Suite Boosts Black Friday Conversions by 3.5x",
    description: "A global retail brand deployed our Unified Omnichannel Hub (Chat, WhatsApp, Voice) during the holiday season to handle a massive surge in sales queries, support tickets, and order tracking.",
    metrics: [
      { label: "Sales Conversion", value: "+250%", icon: TrendingUp, color: "#00E5A0" },
      { label: "First Contact Resolution", value: "92%", icon: ShieldCheck, color: "#0057D9" },
      { label: "Response Time", value: "<15s", icon: Clock, color: "#00C2FF" },
    ],
    bgGradient: "from-[#00E5A0]/10 via-[#0057D9]/5 to-transparent",
    borderGlow: "rgba(0, 229, 160, 0.2)",
    accentColor: "#00E5A0",
  }
];

export function CaseStudies() {
  const [activeTab, setActiveTab] = useState(cases[0].id);
  const activeCase = cases.find((c) => c.id === activeTab) || cases[0];

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[#081120]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <AnimatedSection className="max-w-xl">
            <p className="text-sm font-semibold text-[#00C2FF] uppercase tracking-widest mb-4">
              Case Studies
            </p>
            <h2 className="section-title text-white mb-4">
              Proven Results for <span className="gradient-text">Global Enterprises</span>
            </h2>
            <p className="text-[#64748B] text-lg">
              Explore how leading companies use DBS Mintek® to streamline operations, cut costs, and boost customer loyalty.
            </p>
          </AnimatedSection>

          {/* Tabs */}
          <AnimatedSection delay={0.1} className="mt-8 lg:mt-0">
            <div className="flex gap-2 p-1.5 rounded-xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === c.id
                      ? "bg-white/[0.06] text-white shadow-lg border border-white/[0.08]"
                      : "text-[#64748B] hover:text-white"
                  }`}
                >
                  {c.category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Highlighted Case Card */}
        <AnimatedSection delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card-strong p-8 lg:p-12 overflow-hidden relative"
              style={{
                boxShadow: `0 20px 80px -20px ${activeCase.borderGlow}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none" style={{ backgroundImage: `linear-gradient(135deg, ${activeCase.accentColor}10, transparent)` }} />
              
              <div className="grid lg:grid-cols-[1.3fr,1fr] gap-12 relative z-10">
                {/* Content Left */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-4 block">
                      {activeCase.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-snug">
                      {activeCase.title}
                    </h3>
                    <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
                      {activeCase.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button className="btn-primary text-sm !py-3 !px-6 flex items-center gap-2 group">
                      Read Full Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button className="btn-secondary text-sm !py-3 !px-6 flex items-center gap-2 text-white">
                      View Success Metrics
                    </button>
                  </div>
                </div>

                {/* Metrics Right */}
                <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-white/[0.06] lg:pl-12">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                    Key Performance Indicators
                  </h4>
                  <div className="space-y-4">
                    {activeCase.metrics.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all group flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${metric.color}15` }}
                          >
                            <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                          </div>
                          <div>
                            <p className="text-xs text-[#64748B]">{metric.label}</p>
                            <p className="text-sm font-bold text-[#CBD5E1] mt-0.5">Impact Measured</p>
                          </div>
                        </div>
                        <span
                          className="text-2xl sm:text-3xl font-bold metric-number"
                          style={{ color: metric.color }}
                        >
                          {metric.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </AnimatedSection>
      </div>
    </section>
  );
}
