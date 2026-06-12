"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, Sparkles, Inbox, Users, CalendarCheck, BarChart3, PhoneCall, MessageSquare } from "lucide-react";
import Link from "next/link";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["#0057D9", "#00C2FF", "#00E5A0"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 150) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// Mock inbox lead data for the dashboard preview
const mockLeads = [
  { name: "Arjun Mehta", source: "WhatsApp", status: "NEW", phone: "+91 98765 43210", time: "2 min ago", health: 92 },
  { name: "Sarah Jenkins", source: "Form", status: "CONTACTED", phone: "+1 555-0142", time: "15 min ago", health: 78 },
  { name: "Priya Sharma", source: "Call", status: "INTERESTED", phone: "+91 87654 32109", time: "1 hr ago", health: 85 },
  { name: "Michael Chen", source: "Manual", status: "IN_PROGRESS", phone: "+65 9012 3456", time: "3 hrs ago", health: 64 },
];

const statusColors: Record<string, string> = {
  NEW: "bg-[#00C2FF]/20 text-[#00C2FF]",
  CONTACTED: "bg-[#8B5CF6]/20 text-[#8B5CF6]",
  INTERESTED: "bg-[#00E5A0]/20 text-[#00E5A0]",
  IN_PROGRESS: "bg-[#F59E0B]/20 text-[#F59E0B]",
};

const sourceIcons: Record<string, typeof PhoneCall> = {
  WhatsApp: MessageSquare,
  Form: Inbox,
  Call: PhoneCall,
  Manual: Users,
};

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"inbox" | "pipeline" | "followups">("inbox");
  const [highlightedLead, setHighlightedLead] = useState(0);

  // Cycle highlighted lead
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedLead((prev) => (prev + 1) % mockLeads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ fontFamily: "var(--font-outfit)" }}>
      {/* Background Layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <ParticleField />

      {/* Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0057D9]/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#00C2FF]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0057D9]/10 border border-[#0057D9]/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00C2FF]" />
              <span className="text-sm font-medium text-[#00C2FF]">
                Built for Small Businesses — Simple, Powerful CRM
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold leading-[1.08] tracking-tight mb-6">
              <span className="gradient-text-hero">
                Never Lose a Customer Conversation Again
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg lg:text-xl text-[#94A3B8] leading-relaxed mb-10 max-w-xl"
            >
              Unified inbox for calls, WhatsApp, forms &amp; manual entries.
              Track every lead, automate follow-ups, and close more deals — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/signup"
                className="btn-primary text-base !py-4 !px-8 flex items-center justify-center gap-2 group"
              >
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary text-base !py-4 !px-8 flex items-center justify-center gap-2"
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-6 text-sm text-[#64748B]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                1,000+ Businesses
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div>2-Min Setup</div>
              <div className="w-px h-4 bg-white/10" />
              <div>No Credit Card</div>
            </motion.div>
          </div>

          {/* Right — CRM Inbox Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block mt-16 lg:mt-0 relative w-full min-w-0"
          >
            <div className="relative w-full">
              {/* Main Dashboard Card */}
              <div className="glass-card-strong w-full max-w-full overflow-hidden p-6 rounded-2xl shadow-2xl shadow-black/30 border border-white/[0.08]">
                {/* Browser Window Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <div className="flex-1 h-6 rounded-md bg-white/[0.04] flex items-center px-3 border border-white/5">
                    <span className="text-[10px] text-[#64748B]">app.nexdial.io/crm</span>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="flex border-b border-white/5 mb-4 text-[11px] font-semibold text-[#64748B] w-full">
                  <button 
                    onClick={() => setActiveTab("inbox")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "inbox" ? "border-[#00C2FF] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <Inbox className="w-3.5 h-3.5 text-[#00C2FF]" />
                    Inbox
                  </button>
                  <button 
                    onClick={() => setActiveTab("pipeline")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "pipeline" ? "border-[#00E5A0] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-[#00E5A0]" />
                    Pipeline
                  </button>
                  <button 
                    onClick={() => setActiveTab("followups")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "followups" ? "border-[#8B5CF6] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Follow-ups
                  </button>
                </div>

                {/* Content */}
                <div className="min-h-[360px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeTab === "inbox" && (
                      <motion.div
                        key="inbox-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2.5"
                      >
                        {/* KPIs */}
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {[
                            { label: "New Leads", value: "24", color: "from-[#0057D9] to-[#00C2FF]", change: "+8 today" },
                            { label: "Pending Follow-ups", value: "12", color: "from-[#F59E0B] to-[#FBBF24]", change: "3 overdue" },
                            { label: "Converted", value: "156", color: "from-[#00E5A0] to-[#00C896]", change: "+18% ↑" },
                          ].map((stat) => (
                            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                              <p className="text-[10px] text-[#64748B] mb-1">{stat.label}</p>
                              <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                                {stat.value}
                              </p>
                              <p className="text-[9px] text-[#94A3B8] mt-0.5">{stat.change}</p>
                            </div>
                          ))}
                        </div>

                        {/* Lead List */}
                        <div className="space-y-2">
                          {mockLeads.map((lead, idx) => {
                            const SourceIcon = sourceIcons[lead.source];
                            return (
                              <div 
                                key={lead.name} 
                                className={`p-3 rounded-xl border ${
                                  idx === highlightedLead 
                                    ? "bg-[#0057D9]/10 border-[#0057D9]/30 shadow-[0_0_20px_rgba(0,87,217,0.1)]" 
                                    : "bg-white/[0.02] border-white/[0.05]"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-[10px] font-bold text-white">
                                      {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-bold text-white">{lead.name}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="flex items-center gap-1 text-[9px] text-[#64748B]">
                                          <SourceIcon className="w-2.5 h-2.5" />
                                          {lead.source}
                                        </span>
                                        <span className="text-[9px] text-[#475569]">•</span>
                                        <span className="text-[9px] text-[#475569]">{lead.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${statusColors[lead.status]}`}>
                                      {lead.status.replace("_", " ")}
                                    </span>
                                    <div className="text-right">
                                      <div className="text-[8px] text-[#64748B]">Health</div>
                                      <div className={`text-[10px] font-bold ${lead.health >= 80 ? "text-[#00E5A0]" : lead.health >= 60 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
                                        {lead.health}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* AI Suggestion Bar */}
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#00E5A0]/5 border border-[#00E5A0]/15">
                          <Sparkles className="w-3.5 h-3.5 text-[#00E5A0] animate-pulse flex-shrink-0" />
                          <span className="text-[10px] text-[#00E5A0] font-medium">
                            AI suggests: Call Arjun Mehta now — high intent detected from WhatsApp inquiry
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "pipeline" && (
                      <motion.div
                        key="pipeline-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Pipeline Columns */}
                        <div className="overflow-x-auto scrollbar-none -mx-2 px-2">
                          <div className="grid grid-cols-4 gap-2 min-w-[440px] lg:min-w-0">
                            {[
                              { stage: "New", count: 24, color: "#00C2FF", leads: ["Arjun M.", "Lisa W.", "Rahul K."] },
                              { stage: "Contacted", count: 18, color: "#8B5CF6", leads: ["Sarah J.", "Mike C."] },
                              { stage: "Interested", count: 12, color: "#F59E0B", leads: ["Priya S.", "Tom H.", "Ana L."] },
                              { stage: "Converted", count: 8, color: "#00E5A0", leads: ["David R.", "Nisha P."] },
                            ].map((col) => (
                              <div key={col.stage} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-2.5">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: col.color }}>{col.stage}</span>
                                  <span className="text-[9px] font-bold text-white bg-white/[0.06] px-1.5 py-0.5 rounded">{col.count}</span>
                                </div>
                                <div className="space-y-1.5">
                                  {col.leads.map((lead) => (
                                    <div key={lead} className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-2 text-[9px] text-[#CBD5E1] font-medium">
                                      {lead}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Conversion Funnel */}
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                          <span className="text-[9px] font-bold uppercase text-[#64748B] tracking-wider">Conversion Funnel</span>
                          <div className="space-y-2 mt-2">
                            {[
                              { stage: "New → Contacted", rate: "75%", width: "75%" },
                              { stage: "Contacted → Interested", rate: "67%", width: "67%" },
                              { stage: "Interested → Converted", rate: "42%", width: "42%" },
                            ].map((step) => (
                              <div key={step.stage} className="space-y-1">
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-[#94A3B8]">{step.stage}</span>
                                  <span className="text-[#00E5A0] font-bold">{step.rate}</span>
                                </div>
                                <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#0057D9] to-[#00C2FF] rounded-full" style={{ width: step.width }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "followups" && (
                      <motion.div
                        key="followups-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Today's Follow-ups */}
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
                              <CalendarCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                              Today&apos;s Follow-ups
                            </span>
                            <span className="text-[9px] text-[#F59E0B] font-bold bg-[#F59E0B]/10 px-2 py-0.5 rounded-full">3 overdue</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              { name: "Arjun Mehta", time: "10:30 AM", type: "Call back", status: "overdue", color: "#EF4444" },
                              { name: "Sarah Jenkins", time: "2:00 PM", type: "Send proposal", status: "upcoming", color: "#00C2FF" },
                              { name: "Priya Sharma", time: "4:30 PM", type: "WhatsApp follow-up", status: "upcoming", color: "#00C2FF" },
                              { name: "Michael Chen", time: "11:00 AM", type: "Schedule demo", status: "overdue", color: "#EF4444" },
                              { name: "Lisa Wong", time: "5:00 PM", type: "Quote follow-up", status: "upcoming", color: "#00C2FF" },
                            ].map((fu) => (
                              <div key={fu.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: fu.color }} />
                                  <div>
                                    <p className="text-[10px] font-bold text-white">{fu.name}</p>
                                    <p className="text-[8px] text-[#64748B]">{fu.type}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[9px] font-bold" style={{ color: fu.color }}>{fu.time}</p>
                                  <p className={`text-[7px] uppercase font-bold tracking-wider ${fu.status === "overdue" ? "text-[#EF4444]" : "text-[#64748B]"}`}>{fu.status}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Auto-suggest */}
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/15">
                          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] animate-pulse flex-shrink-0" />
                          <span className="text-[10px] text-[#8B5CF6] font-medium">
                            Auto-suggested: Set follow-up for Michael Chen tomorrow at 11 AM
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
