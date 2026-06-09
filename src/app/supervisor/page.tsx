"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { MonitorSmartphone, Users, Headphones, Volume2, ShieldAlert, Sparkles, AlertCircle, VolumeX } from "lucide-react";

const initialAgents = [
  { id: "a-1", name: "Sarah Connor", campaign: "Apex Fintech", status: "On Call", time: "3m 42s", monitored: false },
  { id: "a-2", name: "David Miller", campaign: "Weyland Logistics", status: "Available", time: "1m 15s", monitored: false },
  { id: "a-3", name: "Marcus Wright", campaign: "Zeta Retailers", status: "On Break", time: "12m 40s", monitored: false }
];

export default function SupervisorPortal() {
  const [agents, setAgents] = useState(initialAgents);
  const [monitoredAgent, setMonitoredAgent] = useState<string | null>(null);
  const [monitorMode, setMonitorMode] = useState<"Silent" | "Whisper" | "Barge">("Silent");

  const startMonitor = (id: string) => {
    setMonitoredAgent(id);
    setAgents(agents.map(a => a.id === id ? { ...a, monitored: true } : { ...a, monitored: false }));
  };

  const stopMonitor = () => {
    setMonitoredAgent(null);
    setAgents(agents.map(a => ({ ...a, monitored: false })));
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">Supervisor Command Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Live Agent Monitoring</h1>
          </div>
        </AnimatedSection>

        {/* Live Metrics */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.05}>
          {[
            { label: "Active Agent Logins", value: agents.length, icon: Users, color: "#0057D9" },
            { label: "Agents On Call", value: agents.filter(a => a.status === "On Call").length, icon: Headphones, color: "#00C2FF" },
            { label: "Queued Callers", value: "3 Callers", icon: AlertCircle, color: "#EF4444" },
            { label: "SLA Adherence Rate", value: "98.8%", icon: Sparkles, color: "#00E5A0" }
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

        {/* Live List & Monitor controls */}
        <div className="grid lg:grid-cols-[2fr,1.1fr] gap-12 items-start">
          
          {/* Agent Table */}
          <AnimatedSection className="glass-card-strong p-8">
            <h3 className="text-lg font-bold text-white mb-6">Active Agents Status</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[#64748B] uppercase font-semibold">
                    <th className="pb-4">Agent Name</th>
                    <th className="pb-4">Active Campaign</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Duration</th>
                    <th className="pb-4 text-right">Intervene</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-white">
                  {agents.map((a) => (
                    <tr key={a.id} className="hover:bg-white/[0.01]">
                      <td className="py-4 font-bold">{a.name}</td>
                      <td className="py-4 text-[#94A3B8]">{a.campaign}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          a.status === "On Call" ? "bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF]" :
                          a.status === "Available" ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]" :
                          "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-4 font-mono font-semibold text-[#CBD5E1]">{a.time}</td>
                      <td className="py-4 text-right">
                        {a.status === "On Call" ? (
                          <button
                            onClick={() => startMonitor(a.id)}
                            disabled={a.monitored}
                            className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                              a.monitored
                                ? "bg-[#00E5A0]/20 border border-[#00E5A0] text-[#00E5A0]"
                                : "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white"
                            }`}
                          >
                            {a.monitored ? "Active Listen" : "Monitor Call"}
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#64748B]">Non-Monitorable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Call Coach Console */}
          <AnimatedSection delay={0.1} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-6 border-b border-white/[0.06] pb-3 flex items-center gap-2">
              <Volume2 className="w-4.5 h-4.5 text-[#00C2FF]" />
              Call Coaching Console
            </h3>

            {monitoredAgent ? (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-[#00C2FF]/20">
                  <p className="text-[10px] text-[#64748B] uppercase font-bold">Monitored Agent:</p>
                  <p className="text-sm font-bold text-white mt-1">
                    {agents.find(a => a.id === monitoredAgent)?.name}
                  </p>
                  <p className="text-[10px] text-[#00C2FF] font-mono mt-1">
                    Campaign: {agents.find(a => a.id === monitoredAgent)?.campaign}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-[#64748B] uppercase font-bold">Monitor Mode Select:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Silent", "Whisper", "Barge"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setMonitorMode(mode)}
                        className={`py-2 rounded border text-[10px] font-bold transition-all ${
                          monitorMode === mode
                            ? "bg-[#0057D9]/20 border-[#0057D9] text-white"
                            : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8]"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={stopMonitor}
                  className="w-full py-3 rounded-lg bg-[#EF4444] hover:shadow-lg hover:shadow-[#EF4444]/20 text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <VolumeX className="w-4 h-4" />
                  Terminate Monitor Node
                </button>
              </div>
            ) : (
              <div className="text-center py-16 text-[#64748B] text-xs">
                Select an active agent on a call to launch the coaching console.
              </div>
            )}
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
