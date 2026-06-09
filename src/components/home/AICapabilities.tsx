"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Brain, MessageSquare, BarChart3, Mic, Shield, Lightbulb,
  Bot, TrendingUp, BookOpen, Mail, Headphones, Zap,
  ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

interface AIFeature {
  id: string;
  icon: React.ComponentType<LucideProps>;
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  color: string;
}

const aiFeatures: AIFeature[] = [
  {
    id: "copilot",
    icon: Bot,
    title: "AI Agent Copilot",
    category: "Agent Productivity",
    description: "Real-time AI assistance for agents during live calls with smart suggestions, knowledge retrieval, and next-best-action recommendations.",
    capabilities: ["Live call transcription", "Smart response suggestions", "Knowledge base search", "Sentiment detection", "Compliance monitoring"],
    color: "#0057D9",
  },
  {
    id: "conversation",
    icon: Brain,
    title: "Conversation Intelligence",
    category: "Analytics & QA",
    description: "NLP-powered analysis of every customer interaction to extract insights, detect trends, and improve performance.",
    capabilities: ["Call summarization", "Topic extraction", "Keyword tracking", "Competitive mentions", "Customer intent analysis"],
    color: "#00C2FF",
  },
  {
    id: "sentiment",
    icon: MessageSquare,
    title: "Sentiment Analysis",
    category: "Analytics & QA",
    description: "Real-time emotional intelligence that monitors customer sentiment and alerts supervisors for escalation.",
    capabilities: ["Real-time mood tracking", "Escalation triggers", "Emotion timeline", "Agent tone analysis", "CSAT prediction"],
    color: "#00E5A0",
  },
  {
    id: "speech",
    icon: Mic,
    title: "Speech Analytics",
    category: "Analytics & QA",
    description: "Advanced speech recognition and analysis to identify patterns, compliance issues, and coaching opportunities.",
    capabilities: ["Silence & overtalk detection", "Script adherence", "Compliance keywords", "Accent adaptation", "Multi-language support"],
    color: "#8B5CF6",
  },
  {
    id: "qa",
    icon: Shield,
    title: "Auto Quality Assurance",
    category: "Analytics & QA",
    description: "AI-powered QA that scores 100% of interactions instead of random sampling, ensuring consistent quality.",
    capabilities: ["100% call scoring", "Custom scorecards", "Trend analysis", "Coaching recommendations", "Calibration tools"],
    color: "#F59E0B",
  },
  {
    id: "scoring",
    icon: TrendingUp,
    title: "AI Lead Scoring",
    category: "Workforce & Growth",
    description: "Predictive models that score and prioritize leads based on behavioral signals and conversion probability.",
    capabilities: ["Behavioral scoring", "Dynamic prioritization", "Conversion prediction", "Engagement tracking", "Campaign optimization"],
    color: "#EF4444",
  },
  {
    id: "forecast",
    icon: BarChart3,
    title: "Predictive Forecasting",
    category: "Workforce & Growth",
    description: "ML-powered workforce and volume forecasting with scenario modeling for optimal resource planning.",
    capabilities: ["Volume prediction", "Staffing optimization", "Scenario modeling", "Seasonal patterns", "Budget forecasting"],
    color: "#06B6D4",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    title: "Knowledge Assistant",
    category: "Agent Productivity",
    description: "Generative AI search across your entire knowledge base for instant, accurate answers during calls.",
    capabilities: ["Semantic search", "Auto-suggestions", "Context awareness", "Document parsing", "Multi-format support"],
    color: "#10B981",
  },
  {
    id: "email",
    icon: Mail,
    title: "AI Email & Chat",
    category: "Agent Productivity",
    description: "Autonomous AI agents that handle emails and chats with human-like responses and smart handoffs.",
    capabilities: ["Auto-drafting", "Tone matching", "Priority routing", "Template optimization", "Multi-language"],
    color: "#EC4899",
  },
  {
    id: "voice",
    icon: Headphones,
    title: "Voice AI Agents",
    category: "Agent Productivity",
    description: "Autonomous voice AI agents handling inbound and outbound calls with natural conversation abilities.",
    capabilities: ["Natural dialogue", "Intent recognition", "Dynamic responses", "Seamless handoff", "Call scheduling"],
    color: "#6366F1",
  },
  {
    id: "coaching",
    icon: Lightbulb,
    title: "AI Coaching",
    category: "Workforce & Growth",
    description: "Personalized coaching recommendations for each agent based on performance patterns and peer benchmarks.",
    capabilities: ["Skill gap analysis", "Peer benchmarking", "Training paths", "Progress tracking", "Gamification"],
    color: "#14B8A6",
  },
  {
    id: "compliance",
    icon: Zap,
    title: "AI Compliance",
    category: "Workforce & Growth",
    description: "Automated compliance monitoring that detects and flags regulatory violations in real-time.",
    capabilities: ["Real-time monitoring", "PCI detection", "GDPR compliance", "DNC checks", "Audit trails"],
    color: "#F97316",
  },
];

export function AICapabilities() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0]);

  const renderLivePreview = (featureId: string) => {
    switch (featureId) {
      case "copilot":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>LIVE CALL FEED</span>
              <span className="text-[#00E5A0] animate-pulse">● ACTIVE TRANSCRIPTION</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[#CBD5E1]">
                <span className="text-[#00C2FF] font-bold">Customer:</span> &ldquo;I need to upgrade my plan to support 15 more agents, but I have questions about billing cycles.&rdquo;
              </div>
              <div className="p-3 rounded-lg bg-[#0057D9]/10 border border-[#0057D9]/30 text-[#00E5A0] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#00E5A0] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">AI Suggestion:</span> &ldquo;Recommend the Enterprise tier. Auto-calculate billing prorated: ₹35,000/mo additional.&rdquo;
                  <div className="mt-2 flex gap-2">
                    <button className="px-2 py-1 rounded bg-[#0057D9] text-[10px] text-white hover:bg-blue-600 transition">Auto-Send Quote</button>
                    <button className="px-2 py-1 rounded bg-white/5 text-[10px] text-white hover:bg-white/10 transition">Open SLA Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "sentiment":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>SENTIMENT TRACKER</span>
              <span className="text-[#00E5A0]">REAL-TIME SCORE</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <span className="text-[9px] text-[#64748B] uppercase block">Customer Tone</span>
                <span className="text-lg font-bold text-[#00E5A0] block mt-1">Delighted</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <span className="text-[9px] text-[#64748B] uppercase block">CSAT Forecast</span>
                <span className="text-lg font-bold text-white block mt-1">4.9 / 5.0</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <span className="text-[9px] text-[#64748B] uppercase block">Escalation Risk</span>
                <span className="text-lg font-bold text-[#EF4444] block mt-1">1.2%</span>
              </div>
            </div>
            <div className="h-16 rounded-xl bg-[#0c182c]/60 border border-white/[0.03] p-3 flex items-center justify-between gap-1 overflow-hidden relative">
              <div className="absolute top-2 left-2 text-[8px] text-[#64748B] uppercase font-bold">Call Mood Timeline</div>
              <div className="flex items-end gap-1 w-full h-8 mt-2">
                {[40, 20, 30, 45, 60, 80, 75, 90, 85, 95, 92, 98].map((height, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm transition-all duration-500"
                    style={{
                      height: `${height}%`,
                      backgroundColor: height > 70 ? "#00E5A0" : height > 40 ? "#00C2FF" : "#F59E0B",
                      opacity: 0.8
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case "forecast":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>WORKFORCE PREDICTIVE MODEL</span>
              <span className="text-[#06B6D4]">CAPACITY AUTO-SCALING</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94A3B8]">Forecasted Call Volume Peak</span>
                <span className="font-bold text-white">850 calls/hr @ 11:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94A3B8]">Recommended Staffing Level</span>
                <span className="font-bold text-[#06B6D4]">124 FTE Agents</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#94A3B8]">Forecast Confidence Rating</span>
                <span className="font-bold text-[#00E5A0]">99.4% Uptime Match</span>
              </div>
            </div>
            <div className="h-20 rounded-xl bg-[#0c182c]/60 border border-white/[0.03] p-3 relative flex items-end">
              <div className="absolute top-2 left-2 text-[8px] text-[#64748B] uppercase font-bold">Intraday Volume Prediction</div>
              <svg viewBox="0 0 100 20" className="w-full h-10 overflow-visible">
                <defs>
                  <linearGradient id="forecastGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 20 Q 25 5 50 15 T 100 8 L 100 20 Z" fill="url(#forecastGlow)" />
                <path d="M 0 20 Q 25 5 50 15 T 100 8" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
                <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="2" />
                <text x="75" y="10" fill="#EF4444" fontSize="3.5" className="font-mono">Threshold Limit</text>
              </svg>
            </div>
          </div>
        );
      case "voice":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>VOICE BOT CONNECTOR</span>
              <span className="text-[#6366F1] animate-pulse">● CALL IN PROGRESS</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#081120] border border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">IVR Voice Agent #04</span>
                  <span className="text-[10px] text-[#00E5A0] font-mono leading-none">Synthesized Speech Active</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white">00:45</span>
                <span className="text-[9px] text-[#64748B] block uppercase tracking-wider">SIP Latency: 42ms</span>
              </div>
            </div>
            <div className="h-12 bg-white/[0.01] border border-white/[0.03] rounded-lg p-2.5 flex items-center justify-center gap-1">
              {[25, 45, 15, 65, 85, 30, 45, 75, 95, 100, 75, 45, 30, 85, 65, 15, 45, 25].map((val, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#6366F1] rounded-full transition-all duration-300 animate-pulse"
                  style={{
                    height: `${val}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
        );
      case "conversation":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>CONVERSATION DATA SUMMARY</span>
              <span className="text-[#00C2FF]">NLP GENERATOR V2</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3.5">
              <div>
                <span className="text-[9px] uppercase font-bold text-[#64748B] block">Automated Call Summary</span>
                <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">
                  &ldquo;Caller requested package upgrade from Basic to Advanced. Clarified billing proration structure. Payment link verified and completed successfully.&rdquo;
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Package Upgrade", "Billing", "Stripe Checkout", "CSAT: 5/5"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "qa":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>AUTOMATED QA ANALYSIS</span>
              <span className="text-[#F59E0B]">COMPLIANCE SCORECARD</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <span className="text-[9px] text-[#64748B] uppercase block">AI Audited Score</span>
                <span className="text-3xl font-extrabold text-[#F59E0B]" style={{ fontFamily: "var(--font-space-grotesk)" }}>98%</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#00E5A0] font-bold block">✓ PASSES CRITERIA</span>
                <span className="text-[9px] text-[#64748B] block">Audited 100% of dialog</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: "Greeting & Brand Identification", pass: true },
                { name: "Caller Verification (PCI Security)", pass: true },
                { name: "Accurate Resolution Delivered", pass: true },
                { name: "Standard Script Closing Check", pass: false }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded bg-white/[0.01] border border-white/[0.02]">
                  <span className="text-[#CBD5E1] text-[11px]">{item.name}</span>
                  <span className={`text-[10px] font-bold ${item.pass ? "text-[#00E5A0]" : "text-[#EF4444]"}`}>
                    {item.pass ? "✓ Compliant" : "✗ Missing Closing"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#64748B] border-b border-white/[0.04] pb-2">
              <span>SYSTEM LOGS & CAPABILITIES</span>
              <span className="text-white/40">REAL-TIME TELEMETRY</span>
            </div>
            <div className="p-4 rounded-xl bg-[#081120] border border-white/[0.04] font-mono text-[9px] text-[#8B5CF6] space-y-1 h-36 overflow-y-auto">
              <p>&gt; initializing cognitive services ... done</p>
              <p>&gt; connecting nodes to speech recognition engine ... done</p>
              <p>&gt; load weights for intent classifier v4.2 ...</p>
              <p>&gt; success. intent accuracy: 98.7%</p>
              <p>&gt; waiting for telemetry hooks ...</p>
              <p>&gt; auto QA evaluation engine active</p>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-widest mb-4">
            AI Operations Center
          </p>
          <h2 className="section-title text-white mb-4">
            Intelligence That <span className="gradient-text">Powers Every Interaction</span>
          </h2>
          <p className="section-subtitle mx-auto">
            18+ AI capabilities working in harmony to automate, analyze, and optimize your contact center operations
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="none">
          <div className="space-y-10">
            {/* 3 Categories in-line */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Agent Productivity", "Analytics & QA", "Workforce & Growth"].map((cat) => (
                <div key={cat} className="space-y-3 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] backdrop-blur-sm">
                  <h4 className="text-[11px] uppercase font-bold text-[#94A3B8] tracking-widest ml-1 border-b border-white/[0.05] pb-2 mb-3">
                    {cat}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {aiFeatures
                      .filter((f) => f.category === cat)
                      .map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setActiveFeature(feature)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-300 ${
                            activeFeature.id === feature.id
                              ? "bg-white/[0.06] border border-white/[0.1] shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                              : "hover:bg-white/[0.03] border border-transparent"
                          }`}
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                            style={{
                              background: activeFeature.id === feature.id
                                ? `linear-gradient(135deg, ${feature.color}35, ${feature.color}15)`
                                : `${feature.color}08`,
                              border: activeFeature.id === feature.id
                                ? `1px solid ${feature.color}50`
                                : `1px solid ${feature.color}10`,
                            }}
                          >
                            <feature.icon
                              className="w-4.5 h-4.5"
                              style={{ color: feature.color }}
                            />
                          </div>
                          <span className={`text-xs font-semibold tracking-wide transition-colors ${
                            activeFeature.id === feature.id ? "text-white" : "text-[#94A3B8]"
                          }`}>
                            {feature.title}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Detail Sandbox Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card-strong p-8 lg:p-10 relative overflow-hidden w-full"
              >
                {/* Background Glow */}
                <div
                  className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-15"
                  style={{ backgroundColor: activeFeature.color }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Info & Details (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${activeFeature.color}25, ${activeFeature.color}08)`,
                            border: `1px solid ${activeFeature.color}30`
                          }}
                        >
                          <activeFeature.icon className="w-7 h-7" style={{ color: activeFeature.color }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{activeFeature.title}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Sparkles className="w-3 h-3 text-[#00E5A0]" />
                            <span className="text-xs text-[#00E5A0] font-medium">Cognitive Engine Sandbox</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#94A3B8] text-sm leading-relaxed">
                        {activeFeature.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {activeFeature.capabilities.map((cap, i) => (
                          <motion.div
                            key={cap}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: activeFeature.color }} />
                            <span className="text-xs text-[#CBD5E1]">{cap}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                      <button className="flex items-center gap-2 text-sm font-semibold group" style={{ color: activeFeature.color }}>
                        Explore {activeFeature.title}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-widest font-mono">Module Ready</span>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Sandbox (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <div className="p-5 rounded-2xl bg-[#0c182c]/80 border border-white/[0.06] shadow-inner h-full flex flex-col justify-center">
                      {renderLivePreview(activeFeature.id)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
