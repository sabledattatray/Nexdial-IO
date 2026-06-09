"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import {
  LayoutDashboard,
  Headphones,
  Database,
  Disc,
  BarChart3,
  Sliders,
  Shield,
  Activity,
  PhoneCall,
  Upload,
  X,
  ChevronRight,
  Play,
  Pause,
  Search,
  Eye,
  Send,
  Info,
  TrendingUp,
  FileSpreadsheet,
  Volume2,
  Users
} from "lucide-react";

// Mock Database data for Admin Page
const initialCampaigns = [
  { id: "c-1", name: "Zeta Invoice Discrepancy", mode: "Predictive Dialer", leads: 420, activeAgents: 2, status: "Active", conversion: "18.2%" },
  { id: "c-2", name: "Outbound AI Telephony Demo", mode: "Power Dialer", leads: 550, activeAgents: 1, status: "Active", conversion: "24.5%" },
  { id: "c-3", name: "SaaS License Consultation", mode: "Preview Dialer", leads: 120, activeAgents: 0, status: "Paused", conversion: "12.8%" },
  { id: "c-4", name: "SLA Custom Review", mode: "Progressive Dialer", leads: 150, activeAgents: 0, status: "Paused", conversion: "15.4%" }
];

const initialActiveAgents = [
  {
    name: "Sarah Connor",
    campaign: "Outbound AI Telephony Demo",
    status: "On Call",
    callDuration: "01:42",
    customer: "David Miller",
    sentiment: 82,
    transcript: [
      { speaker: "Customer", text: "Hello? Yes, Sarah here." },
      { speaker: "Agent", text: "Hello Sarah, I'm calling from DBS Mintek regarding your dialer request." },
      { speaker: "Customer", text: "Oh, perfect. I wanted to see if the dialer includes real-time compliance scripting?" },
      { speaker: "Agent", text: "Yes, our AI Copilot provides live prompt guidelines and checklist tracking." }
    ]
  },
  {
    name: "Marcus Wright",
    campaign: "Zeta Invoice Discrepancy",
    status: "Idle",
    callDuration: "00:00",
    customer: "",
    sentiment: 0,
    transcript: []
  },
  {
    name: "Kyle Reese",
    campaign: "SLA Custom Review",
    status: "On Break",
    callDuration: "00:00",
    customer: "",
    sentiment: 0,
    transcript: []
  }
];

const initialRecordings = [
  { id: "rec-1", name: "Amit Patel", company: "Tata Consultancy", date: "Today, 11:20 AM", duration: "02:45", disposition: "Resolved", sentiment: 88, transcript: [
    { speaker: "Customer", text: "Hello, looking for active SIP integrations." },
    { speaker: "Agent", text: "We provide WebRTC codecs with low latency." },
    { speaker: "Customer", text: "Awesome, please send the documentation." }
  ]},
  { id: "rec-2", name: "Priya Sharma", company: "Reliance Industries", date: "Yesterday, 04:15 PM", duration: "01:12", disposition: "Follow-Up Needed", sentiment: 42, transcript: [
    { speaker: "Customer", text: "Is the dialer HIPAA compliant?" },
    { speaker: "Agent", text: "Yes, we have complete audit logs and encryption." },
    { speaker: "Customer", text: "I need to confirm this with our IT supervisor first." }
  ]}
];

export default function AdminDialerOperations() {
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "campaigns" | "recordings" | "analytics" | "settings">("overview");

  // Core database states
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeAgents, setActiveAgents] = useState(initialActiveAgents);
  const [recordings, setRecordings] = useState(initialRecordings);

  // Live monitor state
  const [monitoredAgent, setMonitoredAgent] = useState<typeof initialActiveAgents[0] | null>(null);
  const [adminWhisper, setAdminWhisper] = useState("");
  const [activeWhispers, setActiveWhispers] = useState<string[]>([]);
  const [adminBargeIn, setAdminBargeIn] = useState(false);

  // Wave player state
  const [playingRecordingId, setPlayingRecordingId] = useState<string | null>(null);
  const [playerProgress, setPlayerProgress] = useState(0);
  const playerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lead CSV upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // SIP configs
  const [sipHost, setSipHost] = useState("103.88.22.61");
  const [sipPort, setSipPort] = useState("5060");
  const [selectedCodec, setSelectedCodec] = useState("Opus HD");
  const [maxChannels, setMaxChannels] = useState("2000");

  const playTone = (frequency: number, duration: number, volume = 0.08) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore
    }
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    playTone(520, 0.1);
  };

  const handleListenIn = (agent: typeof initialActiveAgents[0]) => {
    setMonitoredAgent(agent);
    setActiveWhispers([]);
    setAdminBargeIn(false);
    playTone(700, 0.1);
  };

  // CSV parsing
  const parseLeadsCount = (text: string) => {
    const rows = text.split("\n");
    let validCount = 0;
    for (const r of rows) {
      if (r.trim() && r.split(",").length >= 3) {
        validCount++;
      }
    }
    return validCount;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const count = parseLeadsCount(text);
      if (count > 0) {
        setCampaigns(campaigns.map(c => c.id === "c-1" ? { ...c, leads: c.leads + count } : c));
        setUploadSuccess(`Successfully uploaded and parsed ${count} leads.`);
        playTone(600, 0.15);
      } else {
        alert("Invalid CSV structure. Expected: Name, Company, Phone");
      }
    };
    reader.readAsText(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const count = parseLeadsCount(text);
      if (count > 0) {
        setCampaigns(campaigns.map(c => c.id === "c-1" ? { ...c, leads: c.leads + count } : c));
        setUploadSuccess(`Successfully uploaded and parsed ${count} leads.`);
        playTone(600, 0.15);
      } else {
        alert("Invalid CSV structure. Expected: Name, Company, Phone");
      }
    };
    reader.readAsText(file);
  };

  const triggerWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminWhisper) return;
    setActiveWhispers([...activeWhispers, adminWhisper]);
    setAdminWhisper("");
    playTone(660, 0.08);
  };

  const toggleRecordingPlay = (rec: typeof initialRecordings[0]) => {
    if (playingRecordingId === rec.id) {
      setPlayingRecordingId(null);
      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
      playTone(440, 0.1, 0.05);
    } else {
      setPlayingRecordingId(rec.id);
      setPlayerProgress(0);
      playTone(880, 0.15, 0.05);

      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
      playerTimerRef.current = setInterval(() => {
        setPlayerProgress((p) => {
          if (p >= 100) {
            setPlayingRecordingId(null);
            if (playerTimerRef.current) clearInterval(playerTimerRef.current);
            return 0;
          }
          return p + 5;
        });
      }, 300);
    }
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Paused" : "Active" } : c));
    playTone(480, 0.12);
  };

  useEffect(() => {
    return () => {
      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#081120] flex overflow-hidden">
      
      {/* 1. LEFT SIDEBAR MENU */}
      <aside className="w-[280px] bg-[#0c182c] border-r border-white/[0.06] flex flex-col justify-between p-6 shrink-0 relative z-20">
        <div className="space-y-8">
          
          {/* Sidebar Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center shadow-lg shadow-[#0057D9]/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm tracking-tight leading-none">DBS Mintek</span>
              <span className="text-[9px] text-[#64748B] font-medium tracking-[0.15em] uppercase leading-none mt-1">Dialer Admin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "agents", label: "Live Agent Monitor", icon: Headphones, badge: activeAgents.filter(a => a.status === "On Call").length },
              { id: "campaigns", label: "Campaigns & Leads", icon: Database },
              { id: "recordings", label: "Recording Vault", icon: Disc },
              { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
              { id: "settings", label: "SIP Trunk Settings", icon: Sliders }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as typeof activeTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#0057D9] text-white shadow-lg shadow-[#0057D9]/20"
                      : "text-[#64748B] hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4.5 h-4.5" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-red-500 text-white animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[8px] uppercase font-bold text-[#64748B] block mb-1">Engine Operational</span>
          <div className="flex items-center justify-between text-[10px] text-white font-semibold">
            <span>SIP Server Status</span>
            <span className="text-[#00E5A0]">Active</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 bg-[#081120] relative z-10 overflow-y-auto pt-24 pb-20 px-8">
        
        {/* Dynamic header title */}
        <AnimatedSection className="border-b border-white/[0.06] pb-6 mb-8 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-[#00C2FF] uppercase tracking-widest">DBS Mintek Operations Console</span>
            <h2 className="text-2xl font-extrabold text-white mt-1 capitalize">{activeTab} Panel</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-semibold text-[#22C55E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              SIP Trunk: Registered
            </span>
          </div>
        </AnimatedSection>

        {/* Content Renderers */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Stats cards grid */}
                <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
                  {[
                    { label: "Active Telephony Channels", value: "1,842 / 2,000", icon: PhoneCall, color: "#0057D9" },
                    { label: "Agents Logged In", value: `${activeAgents.length} Agents`, icon: Headphones, color: "#00C2FF" },
                    { label: "Total Leads Remaining", value: campaigns.reduce((acc, c) => acc + c.leads, 0).toLocaleString(), icon: Database, color: "#00E5A0" },
                    { label: "Average Success Rate", value: "86.4%", icon: Activity, color: "#8B5CF6" }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <StaggerItem key={i}>
                        <div className="glass-card-strong p-6 hover:border-white/[0.1] transition-all">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[9px] uppercase font-bold text-[#64748B]">{stat.label}</span>
                            <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                          </div>
                          <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{stat.value}</p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Active Campaigns status */}
                  <div className="glass-card-strong p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <TrendingUp className="w-4.5 h-4.5 text-[#00E5A0]" />
                      Active Outbound Campaigns
                    </h3>
                    <div className="space-y-3">
                      {campaigns.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-3 rounded-lg bg-white/[0.01] border border-white/[0.04] text-xs">
                          <div>
                            <span className="font-bold text-white block">{c.name}</span>
                            <span className="text-[9px] text-[#64748B] block mt-0.5">{c.mode}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[#00C2FF] font-mono font-bold block">{c.leads} Leads</span>
                            <span className="text-[9px] text-[#64748B] block mt-0.5">ROI: {c.conversion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Telemetry summary */}
                  <div className="glass-card-strong p-6 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                      <Sliders className="w-4.5 h-4.5 text-[#00C2FF]" />
                      Dialer Network Status
                    </h3>
                    <div className="space-y-4 text-xs font-semibold text-white">
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748B]">VoIP Protocol Stack:</span>
                        <span>WebRTC SIP Browser Client</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748B]">Asterisk Server Address:</span>
                        <span className="font-mono">{sipHost}:{sipPort}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748B]">Active Codec Profile:</span>
                        <span>{selectedCodec}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748B]">Concurrency Load limit:</span>
                        <span>{maxChannels} Channels Max</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LIVE AGENT MONITOR TAB */}
            {activeTab === "agents" && (
              <motion.div
                key="agents"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid lg:grid-cols-[1.8fr,1.2fr] gap-8 items-start"
              >
                {/* Active Agent monitor card */}
                <div className="glass-card-strong p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3">
                    <Users className="w-4.5 h-4.5 text-[#00C2FF]" />
                    Logged-In Agents Monitor
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {activeAgents.map((agent) => (
                      <div key={agent.name} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-between min-h-[140px]">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-white">{agent.name}</span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                              agent.status === "On Call"
                                ? "bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]"
                                : agent.status === "Idle"
                                ? "bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0]"
                                : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]"
                            }`}>
                              {agent.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#64748B] truncate">{agent.campaign}</p>
                          {agent.status === "On Call" && (
                            <div className="mt-3 flex justify-between items-center text-[10px] text-white">
                              <span className="font-mono text-[#00C2FF]">{agent.callDuration}</span>
                              <span className="text-[#00E5A0] font-bold">CSAT: {agent.sentiment}%</span>
                            </div>
                          )}
                        </div>

                        {agent.status === "On Call" ? (
                          <button
                            onClick={() => handleListenIn(agent)}
                            className="w-full mt-4 py-2 bg-[#0057D9] hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#0057D9]/15"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Listen Live & Whisper
                          </button>
                        ) : (
                          <div className="text-[9px] text-[#64748B] mt-4 text-center">Agent stands by.</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supervisor Coaching Panel */}
                <div>
                  {monitoredAgent ? (
                    <div className="glass-card-strong p-6 border-[#00C2FF]/30 shadow-xl shadow-[#00C2FF]/5 relative overflow-hidden space-y-4">
                      <div className="flex justify-between items-start border-b border-white/[0.06] pb-3">
                        <div>
                          <span className="text-[8px] uppercase font-bold text-[#00C2FF] tracking-wider block">Silent Monitor Feed</span>
                          <h3 className="text-sm font-bold text-white mt-1">Monitoring: {monitoredAgent.name}</h3>
                        </div>
                        <button onClick={() => setMonitoredAgent(null)} className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[#64748B] hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-semibold text-white">
                          <span>Customer: {monitoredAgent.customer}</span>
                          <span>CSAT Score: <span className="text-[#00E5A0]">{monitoredAgent.sentiment}%</span></span>
                        </div>

                        <div className="h-[150px] overflow-y-auto bg-black/30 border border-white/[0.04] p-3 rounded-lg space-y-2.5 text-[10px]">
                          {monitoredAgent.transcript.map((t, idx) => (
                            <div key={idx} className="leading-relaxed">
                              <span className={`font-bold ${t.speaker === "Agent" ? "text-[#00C2FF]" : "text-[#00E5A0]"}`}>{t.speaker}: </span>
                              <span className="text-[#94A3B8] font-semibold">{t.text}</span>
                            </div>
                          ))}
                          {activeWhispers.map((w, idx) => (
                            <div key={idx} className="leading-relaxed bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-1.5 rounded mt-1 flex items-start gap-1">
                              <span className="font-bold text-[#A78BFA] flex-shrink-0">Admin Whisper:</span>
                              <span className="text-[#A78BFA] font-semibold italic">{w}</span>
                            </div>
                          ))}
                        </div>

                        {/* Admin Whisper coaching form */}
                        <form onSubmit={triggerWhisper} className="space-y-2 border-t border-white/[0.04] pt-3">
                          <label className="text-[9px] font-bold uppercase text-[#64748B] block">Agent Coaching (Whisper Note)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={adminWhisper}
                              onChange={(e) => setAdminWhisper(e.target.value)}
                              placeholder="Type whisper advice directly to agent's AI feed..."
                              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569]"
                            />
                            <button type="submit" className="p-2 bg-[#8B5CF6] hover:bg-purple-600 rounded-lg text-white">
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </form>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <button
                            onClick={() => {
                              setAdminBargeIn(!adminBargeIn);
                              playTone(adminBargeIn ? 440 : 660, 0.15);
                            }}
                            className={`py-2 text-[10px] font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                              adminBargeIn ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]" : "bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.04]"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            {adminBargeIn ? "Disconnect Barge" : "Barge-In Call"}
                          </button>
                          
                          <button
                            onClick={() => {
                              playTone(400, 0.1);
                              alert("Supervisor intervention flagged. Campaign routing updated.");
                            }}
                            className="py-2 text-[10px] font-bold bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] rounded-lg transition-all"
                          >
                            Flag Intervention
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center text-xs text-[#64748B]">
                      Click <b>Listen Live</b> on an active call to monitor live conversations, perform whispers, or barge-in.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CAMPAIGNS & LEADS TAB */}
            {activeTab === "campaigns" && (
              <motion.div
                key="campaigns"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid lg:grid-cols-[1.8fr,1.2fr] gap-8 items-start"
              >
                {/* Campaigns List Table */}
                <div className="glass-card-strong p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                    <Database className="w-4.5 h-4.5 text-[#00C2FF]" />
                    Telephony Outbound Campaigns
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-[#64748B] uppercase font-semibold">
                          <th className="pb-3">Campaign Name</th>
                          <th className="pb-3">Dialer Mode</th>
                          <th className="pb-3 text-center">Leads Remaining</th>
                          <th className="pb-3 text-center">Active Agents</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04] text-white">
                        {campaigns.map((c) => (
                          <tr key={c.id} className="hover:bg-white/[0.01]">
                            <td className="py-3.5 font-bold">{c.name}</td>
                            <td className="py-3.5 text-[#94A3B8]">{c.mode}</td>
                            <td className="py-3.5 text-center font-semibold text-[#00C2FF]">{c.leads}</td>
                            <td className="py-3.5 text-center font-semibold">{c.activeAgents}</td>
                            <td className="py-3.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                c.status === "Active" ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]" : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]"
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => toggleCampaignStatus(c.id)}
                                className="p-1 px-2.5 rounded bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-[10px] font-bold"
                              >
                                {c.status === "Active" ? "Pause" : "Resume"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CSV Leads Upload */}
                <div className="glass-card-strong p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                    <Upload className="w-4.5 h-4.5 text-[#00C2FF]" />
                    Upload Batch Leads
                  </h3>

                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-[#00C2FF] bg-[#00C2FF]/10 scale-102"
                        : "border-white/[0.08] bg-white/[0.01] hover:border-white/[0.2] hover:bg-white/[0.03]"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".csv,.txt"
                      className="hidden"
                    />
                    <FileSpreadsheet className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
                    <p className="text-xs font-bold text-white mb-1">Drag & Drop Lead File</p>
                    <p className="text-[10px] text-[#64748B]">Expected Format: Name, Company, Phone</p>
                  </div>

                  {uploadSuccess && (
                    <div className="p-2.5 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded text-[10px] text-[#00E5A0] font-semibold flex items-center justify-between">
                      <span>{uploadSuccess}</span>
                      <button onClick={() => setUploadSuccess(null)}><X className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* RECORDING VAULT TAB */}
            {activeTab === "recordings" && (
              <motion.div
                key="recordings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-card-strong p-6 space-y-4"
              >
                <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                  <Disc className="w-4.5 h-4.5 text-[#8B5CF6]" />
                  Telephony Call Recording Repository
                </h3>

                <div className="space-y-4">
                  {recordings.map((rec) => {
                    const isPlaying = playingRecordingId === rec.id;
                    return (
                      <div key={rec.id} className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-2">
                              {rec.name}
                              <span className="text-[10px] text-[#64748B] font-mono">({rec.company})</span>
                            </h4>
                            <p className="text-[9px] text-[#64748B] mt-0.5">{rec.date} • Disposition: <span className="text-[#00E5A0] font-semibold">{rec.disposition}</span></p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white bg-white/[0.05] px-2 py-0.5 rounded">{rec.duration}</span>
                            <button
                              onClick={() => toggleRecordingPlay(rec)}
                              className={`px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                                isPlaying ? "bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444]" : "bg-[#00E5A0]/20 border border-[#00E5A0]/30 text-[#00E5A0] hover:bg-[#00E5A0]/30"
                              }`}
                            >
                              {isPlaying ? <Pause className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                              {isPlaying ? "Pause Player" : "Listen Recording"}
                            </button>
                          </div>
                        </div>

                        {/* Audio Wave player */}
                        {isPlaying && (
                          <div className="bg-[#0c182c]/80 border border-white/[0.06] p-3 rounded-lg space-y-3">
                            <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                              <span>Opus High-Definition Voice (Simulated Playback)</span>
                              <span className="font-mono text-white">{playerProgress}%</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleRecordingPlay(rec)}
                                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white"
                              >
                                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              </button>
                              
                              {/* Audio wave graphics */}
                              <div className="flex-1 flex items-end gap-0.5 h-8">
                                {Array.from({ length: 48 }).map((_, i) => {
                                  const isActive = i * 2 <= playerProgress;
                                  const height = Math.sin(i * 0.4 + playerProgress * 0.1) * 12 + 16;
                                  return (
                                    <div
                                      key={i}
                                      className={`flex-1 rounded-sm transition-all duration-300 ${
                                        isActive ? "bg-gradient-to-t from-[#0057D9] to-[#00C2FF]" : "bg-white/[0.06]"
                                      }`}
                                      style={{ height: `${height}px` }}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Timeline progress bar */}
                            <div className="relative w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                              <div className="absolute h-full bg-[#00C2FF]" style={{ width: `${playerProgress}%` }} />
                            </div>

                            {/* Transcript view */}
                            {rec.transcript.length > 0 && (
                              <div className="border-t border-white/[0.04] pt-3.5 space-y-2">
                                <span className="text-[8px] uppercase font-bold text-[#64748B] block mb-1">Archived Call Transcript:</span>
                                <div className="space-y-2.5 max-h-[120px] overflow-y-auto pr-1">
                                  {rec.transcript.map((t, idx) => (
                                    <div key={idx} className="text-[10px] leading-relaxed">
                                      <span className={`font-bold ${t.speaker === "Agent" ? "text-[#00C2FF]" : "text-[#00E5A0]"}`}>{t.speaker}: </span>
                                      <span className="text-[#94A3B8] font-semibold">{t.text}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ANALYTICS & REPORTS TAB */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* SVG Traffic Chart */}
                <div className="glass-card-strong p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                    <BarChart3 className="w-4.5 h-4.5 text-[#00E5A0]" />
                    Dialer Traffic Report (24h Outbound Volume)
                  </h3>
                  
                  <div className="bg-black/30 border border-white/[0.04] p-4 rounded-xl">
                    <svg viewBox="0 0 300 100" className="w-full h-[120px] overflow-visible">
                      <defs>
                        <linearGradient id="adminDialerGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      <path
                        d="M 0 90 L 30 75 Q 60 40 90 60 T 150 25 T 210 50 T 270 20 L 300 45 L 300 90 Z"
                        fill="url(#adminDialerGrad)"
                      />
                      <path
                        d="M 0 90 L 30 75 Q 60 40 90 60 T 150 25 T 210 50 T 270 20 L 300 45"
                        fill="none"
                        stroke="#00C2FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="90" cy="60" r="3" fill="#00C2FF" />
                      <circle cx="150" cy="25" r="3" fill="#00E5A0" />
                      <circle cx="270" cy="20" r="3" fill="#00C2FF" />
                    </svg>
                    <div className="flex justify-between items-center text-[8px] text-[#64748B] font-mono mt-2 uppercase">
                      <span>08:00 AM</span>
                      <span>12:00 PM</span>
                      <span>04:00 PM</span>
                      <span>08:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Additional metrics */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card-strong p-5 text-center">
                    <span className="text-[9px] uppercase font-bold text-[#64748B]">Average Handle Time (AHT)</span>
                    <p className="text-xl font-bold text-white mt-2">02 minutes 14 seconds</p>
                  </div>
                  <div className="glass-card-strong p-5 text-center">
                    <span className="text-[9px] uppercase font-bold text-[#64748B]">Average dropped Call Rate</span>
                    <p className="text-xl font-bold text-[#EF4444] mt-2">1.8% (Below Threshold)</p>
                  </div>
                  <div className="glass-card-strong p-5 text-center">
                    <span className="text-[9px] uppercase font-bold text-[#64748B]">Campaign conversion index</span>
                    <p className="text-xl font-bold text-[#00E5A0] mt-2">+12.4% vs Last Week</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SIP TRUNK SETTINGS TAB */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-card-strong p-6 space-y-6"
              >
                <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                  <Sliders className="w-4.5 h-4.5 text-[#00C2FF]" />
                  VoIP Telephony & SIP Trunk Configuration
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); alert("SIP configurations saved successfully."); playTone(600, 0.15); }} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[#64748B]">SIP Gatekeeper Host Address</label>
                      <input
                        type="text"
                        value={sipHost}
                        onChange={(e) => setSipHost(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[#64748B]">SIP Port</label>
                      <input
                        type="text"
                        value={sipPort}
                        onChange={(e) => setSipPort(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[#64748B]">Active Codec Profile</label>
                      <select
                        value={selectedCodec}
                        onChange={(e) => setSelectedCodec(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-[#94A3B8] bg-[#0c182c]"
                      >
                        <option value="Opus HD">Opus High-Definition Voice (default)</option>
                        <option value="G711 u-law">G.711 PCMU (Standard)</option>
                        <option value="G711 a-law">G.711 PCMA (Europe)</option>
                        <option value="G729">G.729 (Low Bandwidth Compression)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-[#64748B]">Max Concurrency Channel Capacity</label>
                      <input
                        type="number"
                        value={maxChannels}
                        onChange={(e) => setMaxChannels(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[10px] text-[#64748B] max-w-xl">
                    <Info className="w-4.5 h-4.5 text-[#00C2FF] flex-shrink-0" />
                    <span>Telephony routes are automatically balanced across regional delivery hubs in Navi Mumbai, Pune, Chennai, and Bengaluru for zero audio delay.</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary text-xs !py-3 !px-6 flex items-center gap-1.5 font-bold"
                  >
                    Save Telephony Middleware Settings
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

    </div>
  );
}
