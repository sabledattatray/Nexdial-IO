"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Bot, Sparkles, Brain, Cpu, MessageSquare, Mic, ShieldAlert, LineChart, Layers, Zap, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const aiCapabilitiesList = [
  {
    icon: Bot,
    title: "AI Agent Copilot",
    desc: "Real-time suggestion engine that listens to live calls, matches queries against structured knowledge bases, and drafts responses instantly.",
    color: "#0057D9",
  },
  {
    icon: Mic,
    title: "Voice AI Agent Nodes",
    desc: "Deploy intelligent, human-like voice bots capable of answering inbound queries, resolving issues, and placing outbound calls at scale.",
    color: "#00C2FF",
  },
  {
    icon: Brain,
    title: "Conversation Intelligence",
    desc: "Deep NLP models scan transcripts post-call to auto-generate summaries, extract next steps, and detect compliance deviations.",
    color: "#8B5CF6",
  },
  {
    icon: Sparkles,
    title: "Sentiment & Tone Analytics",
    desc: "Calculates live sentiment metrics on caller vocal tones and text inputs, triggering real-time supervisor escalation when thresholds drop.",
    color: "#00E5A0",
  },
  {
    icon: ShieldAlert,
    title: "Auto Quality Assurance",
    desc: "Automatically scores 100% of recorded calls on script compliance, greeting politeness, and dispute resolution guidelines.",
    color: "#EF4444",
  },
  {
    icon: LineChart,
    title: "Predictive Forecasting",
    desc: "Analyzes seasonal contact center data to forecast call volumes, dynamic staffing metrics, and queue response benchmarks.",
    color: "#F59E0B",
  }
];

export default function AIPlatformPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Hero Banner */}
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center mb-20">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#00E5A0]" />
              <span className="text-xs font-semibold text-[#CBD5E1]">Cognitive AI Operations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Enterprise AI <span className="gradient-text">Operations Center</span>
            </h1>
            <p className="text-[#94A3B8] text-lg mt-4 leading-relaxed">
              Supercharge your contact center with conversational AI nodes, predictive forecasting, automated scoring, and real-time sentiment analysis. Integrated with OpenAI, Anthropic, and Gemini models.
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="/request-demo" className="btn-primary text-sm !py-3.5 !px-8 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Schedule AI Sandbox Demo
              </Link>
              <button className="btn-secondary text-sm !py-3.5 !px-8 flex items-center gap-2 text-white">
                <Play className="w-4 h-4" />
                Watch AI in Action
              </button>
            </div>
          </AnimatedSection>

          {/* Interactive Flow visualizer mockup */}
          <AnimatedSection delay={0.2} className="glass-card p-6 border-white/[0.05] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8B5CF6]/5 pointer-events-none" />
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-xs font-semibold text-white">Live Call AI Node Routing</span>
                </div>
                <span className="text-[10px] text-[#64748B]">Active Node: Whisper API v3</span>
              </div>

              {/* Simulation steps */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4 text-[#00C2FF]" />
                    <span className="text-xs text-[#E2E8F0]">Voice Input Stream</span>
                  </div>
                  <span className="text-[10px] text-[#00C2FF] font-mono">16kHz PCM Audio</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-[#00C2FF]/30 flex items-center justify-between shadow-[0_0_10px_rgba(0,194,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-[#00C2FF]" />
                    <span className="text-xs text-white font-medium">Auto Translation & Transcription</span>
                  </div>
                  <span className="text-[10px] text-[#00E5A0] font-semibold">Matched (99.8% Conf)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs text-[#E2E8F0]">LLM Agent RAG Pipeline</span>
                  </div>
                  <span className="text-[10px] text-[#64748B]">Context: Knowledge Base Doc #18A</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-[#00E5A0]/30 flex items-center justify-between shadow-[0_0_10px_rgba(0,229,160,0.05)]">
                  <div className="flex items-center gap-3">
                    <Bot className="w-4 h-4 text-[#00E5A0]" />
                    <span className="text-xs text-white font-medium">Next-Best-Action Auto Response</span>
                  </div>
                  <span className="text-[10px] text-[#00E5A0] font-mono">Sent to Softphone</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Feature Grid */}
        <AnimatedSection delay={0.2} className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Core Cognitive Capabilities
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              Leverage deep learning models to streamline workflow processes and guarantee compliance metrics.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {aiCapabilitiesList.map((cap) => {
              const Icon = cap.icon;
              return (
                <StaggerItem key={cap.title}>
                  <div className="glass-card p-6 h-full relative overflow-hidden group hover:border-white/[0.12] transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: cap.color }} />
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${cap.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cap.color }} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{cap.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimatedSection>

      </div>
    </div>
  );
}
