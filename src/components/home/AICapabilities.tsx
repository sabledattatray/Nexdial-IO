"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Brain, MessageSquare, BarChart3, Mic, Shield, Lightbulb,
  Bot, TrendingUp, BookOpen, Mail, Headphones, Zap,
  ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";

const aiFeatures = [
  {
    id: "copilot",
    icon: Bot,
    title: "AI Agent Copilot",
    description: "Real-time AI assistance for agents during live calls with smart suggestions, knowledge retrieval, and next-best-action recommendations.",
    capabilities: ["Live call transcription", "Smart response suggestions", "Knowledge base search", "Sentiment detection", "Compliance monitoring"],
    color: "#0057D9",
  },
  {
    id: "conversation",
    icon: Brain,
    title: "Conversation Intelligence",
    description: "NLP-powered analysis of every customer interaction to extract insights, detect trends, and improve performance.",
    capabilities: ["Call summarization", "Topic extraction", "Keyword tracking", "Competitive mentions", "Customer intent analysis"],
    color: "#00C2FF",
  },
  {
    id: "sentiment",
    icon: MessageSquare,
    title: "Sentiment Analysis",
    description: "Real-time emotional intelligence that monitors customer sentiment and alerts supervisors for escalation.",
    capabilities: ["Real-time mood tracking", "Escalation triggers", "Emotion timeline", "Agent tone analysis", "CSAT prediction"],
    color: "#00E5A0",
  },
  {
    id: "speech",
    icon: Mic,
    title: "Speech Analytics",
    description: "Advanced speech recognition and analysis to identify patterns, compliance issues, and coaching opportunities.",
    capabilities: ["Silence & overtalk detection", "Script adherence", "Compliance keywords", "Accent adaptation", "Multi-language support"],
    color: "#8B5CF6",
  },
  {
    id: "qa",
    icon: Shield,
    title: "Auto Quality Assurance",
    description: "AI-powered QA that scores 100% of interactions instead of random sampling, ensuring consistent quality.",
    capabilities: ["100% call scoring", "Custom scorecards", "Trend analysis", "Coaching recommendations", "Calibration tools"],
    color: "#F59E0B",
  },
  {
    id: "scoring",
    icon: TrendingUp,
    title: "AI Lead Scoring",
    description: "Predictive models that score and prioritize leads based on behavioral signals and conversion probability.",
    capabilities: ["Behavioral scoring", "Engagement tracking", "Conversion prediction", "Dynamic prioritization", "Campaign optimization"],
    color: "#EF4444",
  },
  {
    id: "forecast",
    icon: BarChart3,
    title: "Predictive Forecasting",
    description: "ML-powered workforce and volume forecasting with scenario modeling for optimal resource planning.",
    capabilities: ["Volume prediction", "Staffing optimization", "Scenario modeling", "Seasonal patterns", "Budget forecasting"],
    color: "#06B6D4",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    title: "Knowledge Assistant",
    description: "Generative AI search across your entire knowledge base for instant, accurate answers during calls.",
    capabilities: ["Semantic search", "Auto-suggestions", "Context awareness", "Document parsing", "Multi-format support"],
    color: "#10B981",
  },
  {
    id: "email",
    icon: Mail,
    title: "AI Email & Chat",
    description: "Autonomous AI agents that handle emails and chats with human-like responses and smart handoffs.",
    capabilities: ["Auto-drafting", "Tone matching", "Priority routing", "Template optimization", "Multi-language"],
    color: "#EC4899",
  },
  {
    id: "voice",
    icon: Headphones,
    title: "Voice AI Agents",
    description: "Autonomous voice AI agents handling inbound and outbound calls with natural conversation abilities.",
    capabilities: ["Natural dialogue", "Intent recognition", "Dynamic responses", "Seamless handoff", "Call scheduling"],
    color: "#6366F1",
  },
  {
    id: "coaching",
    icon: Lightbulb,
    title: "AI Coaching",
    description: "Personalized coaching recommendations for each agent based on performance patterns and peer benchmarks.",
    capabilities: ["Skill gap analysis", "Peer benchmarking", "Training paths", "Progress tracking", "Gamification"],
    color: "#14B8A6",
  },
  {
    id: "compliance",
    icon: Zap,
    title: "AI Compliance",
    description: "Automated compliance monitoring that detects and flags regulatory violations in real-time.",
    capabilities: ["Real-time monitoring", "PCI detection", "GDPR compliance", "DNC checks", "Audit trails"],
    color: "#F97316",
  },
];

export function AICapabilities() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0]);

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

        <AnimatedSection delay={0.2}>
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8">
            {/* Feature List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {aiFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${
                    activeFeature.id === feature.id
                      ? "bg-white/[0.06] border border-white/[0.1]"
                      : "hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: activeFeature.id === feature.id
                        ? `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`
                        : `${feature.color}10`,
                    }}
                  >
                    <feature.icon
                      className="w-4 h-4"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <span className={`text-xs font-medium leading-tight ${
                    activeFeature.id === feature.id ? "text-white" : "text-[#94A3B8]"
                  }`}>
                    {feature.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Feature Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card-strong p-8 lg:p-10 relative overflow-hidden"
              >
                {/* Background Glow */}
                <div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-15"
                  style={{ backgroundColor: activeFeature.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${activeFeature.color}25, ${activeFeature.color}08)` }}
                    >
                      <activeFeature.icon className="w-7 h-7" style={{ color: activeFeature.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeFeature.title}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="w-3 h-3 text-[#00E5A0]" />
                        <span className="text-xs text-[#00E5A0] font-medium">AI-Powered</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#94A3B8] leading-relaxed mb-8">
                    {activeFeature.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {activeFeature.capabilities.map((cap, i) => (
                      <motion.div
                        key={cap}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: activeFeature.color }} />
                        <span className="text-sm text-[#CBD5E1]">{cap}</span>
                      </motion.div>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-sm font-semibold group" style={{ color: activeFeature.color }}>
                    Explore {activeFeature.title}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
