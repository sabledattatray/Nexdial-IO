"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { ArrowUpRight, TrendingUp, Users, Clock, Percent, ShieldCheck } from "lucide-react";

const cases = [
  {
    id: "realestate",
    category: "Real Estate Agency",
    title: "Apex Realty Closes 40% More Deals with Structured Lead Tracking",
    description: "Apex Realty transitioned from scattered WhatsApp chats and messy spreadsheets to NexDial's Unified Inbox. By centralizing every property inquiry and tracking communications in one place, their agents instantly boosted client engagement and closed more property listings.",
    metrics: [
      { label: "Closed Deals Lift", value: "+40%", icon: TrendingUp, color: "#0057D9" },
      { label: "Average Response Time", value: "< 5 min", icon: Clock, color: "#00C2FF" },
      { label: "Saved Hours Per Agent", value: "12 hrs/wk", icon: Users, color: "#00E5A0" },
    ],
    bgGradient: "from-[#0057D9]/10 via-[#00C2FF]/5 to-transparent",
    borderGlow: "rgba(0, 194, 255, 0.2)",
    accentColor: "#00C2FF",
  },
  {
    id: "agency",
    category: "Marketing Agency",
    title: "PixelCraft Media Achieves 3x Faster Client Response Speed",
    description: "With multi-channel lead capture from landing page forms and social media ad webhooks, PixelCraft Media centralized client leads in NexDial. Instant notifications allow their sales team to follow up within 2 minutes of initial submission, maximizing ad campaign ROI.",
    metrics: [
      { label: "Follow-up Velocity", value: "3.5x Faster", icon: Clock, color: "#8B5CF6" },
      { label: "Ad Lead Conversion", value: "+28%", icon: TrendingUp, color: "#EC4899" },
      { label: "Lead Attrition Rate", value: "-40%", icon: Percent, color: "#00E5A0" },
    ],
    bgGradient: "from-[#8B5CF6]/10 via-[#EC4899]/5 to-transparent",
    borderGlow: "rgba(139, 92, 246, 0.2)",
    accentColor: "#8B5CF6",
  },
  {
    id: "education",
    category: "Education Consultancy",
    title: "Global Prep Academy Eliminates Missed Follow-ups, Hitting 55% Conversion",
    description: "Managing hundreds of student enrollment inquiries was chaotic until Global Prep Academy implemented NexDial's Follow-up Engine. Reminders are auto-scheduled, ensuring advisors keep in touch regularly throughout the application timeline.",
    metrics: [
      { label: "Final Conversion Rate", value: "55%", icon: Percent, color: "#00E5A0" },
      { label: "Missed Follow-ups", value: "0", icon: ShieldCheck, color: "#0057D9" },
      { label: "Team Productivity", value: "+45%", icon: Users, color: "#00C2FF" },
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
              Success Stories
            </p>
            <h2 className="section-title text-white mb-4">
              Loved by <span className="gradient-text">Growing Businesses</span>
            </h2>
            <p className="text-[#64748B] text-lg">
              Explore how small businesses use NexDial to streamline operations, cut response times, and close more deals.
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
                    <a href="/request-demo" className="btn-primary text-sm !py-3 !px-6 flex items-center gap-2 group">
                      Start Your Success Story
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
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
