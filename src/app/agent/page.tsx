"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Headphones, Clock, Award, ShieldAlert, Coffee, Play, Info } from "lucide-react";

export default function AgentPortal() {
  const [breakState, setBreakState] = useState<"Available" | "On Break">("Available");
  const [breakTime, setBreakTime] = useState(0);

  const toggleBreak = () => {
    setBreakState(breakState === "Available" ? "On Break" : "Available");
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">Agent Console Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Agent Workspace Workspace</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleBreak}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                breakState === "Available"
                  ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/20"
                  : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B]/20"
              }`}
            >
              <Coffee className="w-4 h-4" />
              Status: {breakState}
            </button>
          </div>
        </AnimatedSection>

        {/* Agent Metrics */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.05}>
          {[
            { label: "Calls Handled Today", value: "84 Calls", icon: Headphones, color: "#0057D9" },
            { label: "Talk Duration Avg", value: "3m 42s", icon: Clock, color: "#00C2FF" },
            { label: "Gamification Points", value: "1,240 XP", icon: Award, color: "#00E5A0" },
            { label: "Quality Scorecard", value: "98.5%", icon: ShieldAlert, color: "#8B5CF6" }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="glass-card-strong p-6 group hover:border-white/[0.1] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold text-[#64748B]">{stat.label}</span>
                    <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {stat.value}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Workspace Mock Grid */}
        <div className="grid lg:grid-cols-[2fr,1.1fr] gap-12 items-start">
          
          {/* Main workspace announcements */}
          <AnimatedSection className="glass-card-strong p-8">
            <h3 className="text-lg font-bold text-white mb-6">Client Campaign Announcements</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-start gap-4">
                <Info className="w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Velo Payments Billing System Upgrade</h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-1">
                    Velo Payments is updating Stripe subscription keys this evening. All agents on the fintech campaign must prompt callers to verify payments via safe email links only.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-start gap-4">
                <Info className="w-5 h-5 text-[#00E5A0] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">New Script templates available for Apex Medical campaign</h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-1">
                    HIPAA guidelines require verifying caller SSNs and first names before booking medical schedules. The dynamic script has been refreshed inside your dialer panel.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Gamified Leaderboard */}
          <AnimatedSection delay={0.1} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-6 border-b border-white/[0.06] pb-3 flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-[#00C2FF]" />
              Agent Leaderboard
            </h3>

            <div className="space-y-4">
              {[
                { name: "Sarah Connor", rank: "1st", points: "2,450 XP" },
                { name: "John Doe (You)", rank: "2nd", points: "1,240 XP" },
                { name: "Marcus Wright", rank: "3rd", points: "980 XP" }
              ].map((agent, i) => (
                <div key={agent.name} className="flex justify-between items-center p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#64748B]">{agent.rank}</span>
                    <span className="text-xs text-white font-semibold">{agent.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#00E5A0]">{agent.points}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
