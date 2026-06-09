"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, ArrowRight, Sparkles, BarChart2, Activity, Database, Volume2, Upload, RefreshCw } from "lucide-react";
import Link from "next/link";

const aiScript = [
  { speaker: "Customer", text: "Hello, I am calling regarding my postpaid VIP account billing discrepancy.", sentiment: "neutral" },
  { speaker: "AI Copilot", text: "Searching database. Detected double-charge on premium data pack #401. Suggestion: Approve waiver.", sentiment: "positive" },
  { speaker: "Agent", text: "I see the double charge for last month's data pack. Let me waive that for you immediately.", sentiment: "positive" },
  { speaker: "Customer", text: "Oh, that was quick! Thank you so much for resolving it without wait times.", sentiment: "positive" },
  { speaker: "AI Copilot", text: "Sentiment positive (98.2%). Customer qualified for loyalty data bundle upgrade.", sentiment: "positive" },
  { speaker: "Agent", text: "You're welcome! As a VIP customer, you also qualify for a free 10GB loyalty bonus this month.", sentiment: "positive" },
  { speaker: "Customer", text: "Perfect! Yes, please activate it. I appreciate the excellent support.", sentiment: "positive" },
];

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

        // Draw connections
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

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayed}
      <span className={`${cursor ? "opacity-100" : "opacity-0"} transition-opacity text-[#00C2FF]`}>|</span>
    </span>
  );
}

export function HeroSection() {
  // Mock Dashboard Interactive States
  const [activeTab, setActiveTab] = useState<"ops" | "ai" | "campaigns">("ops");
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  // Operations Tab live simulation
  const [activeCalls, setActiveCalls] = useState(847);
  const [csat, setCsat] = useState(98.2);
  const [revenue, setRevenue] = useState(20.145);
  const [chartData, setChartData] = useState([55, 48, 35, 42, 38, 22, 28, 18, 22, 14, 18]);

  // AI Tab live simulation
  const [aiStep, setAiStep] = useState(0);
  const [isPlayingAi, setIsPlayingAi] = useState(true);

  // Campaigns Tab live simulation
  const [campaignList, setCampaignList] = useState([
    { id: 1, name: "VI Prepaid Retention", progress: 84, called: 2432, total: 3000, status: "Active" },
    { id: 2, name: "VIP Outbound Sales", progress: 62, called: 1860, total: 3000, status: "Active" },
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Periodic Operations Telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate active calls
      setActiveCalls((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal > 860 ? 858 : newVal < 835 ? 838 : newVal;
      });

      // Slowly increment revenue
      setRevenue((prev) => prev + 0.0002);

      // Fluctuate CSAT
      setCsat((prev) => {
        const change = (Math.random() - 0.5) * 0.1;
        const newVal = +(prev + change).toFixed(1);
        return newVal > 99.0 ? 98.9 : newVal < 97.5 ? 97.6 : newVal;
      });

      // Advance chart data
      setChartData((prev) => {
        const nextData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 20;
        let nextVal = Math.round(lastVal + change);
        if (nextVal < 10) nextVal = 15;
        if (nextVal > 70) nextVal = 65;
        nextData.push(nextVal);
        return nextData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // AI Dialogue Play Loop
  useEffect(() => {
    if (!isPlayingAi || activeTab !== "ai") return;
    const interval = setInterval(() => {
      setAiStep((prev) => (prev + 1) % aiScript.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlayingAi, activeTab]);

  // Campaign progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaignList((prev) => 
        prev.map((c) => {
          if (c.progress < 100 && c.status === "Active") {
            const nextProgress = Math.min(100, c.progress + (c.called === 0 ? 3 : 1));
            return {
              ...c,
              progress: nextProgress,
              called: Math.min(c.total, Math.round((nextProgress / 100) * c.total))
            };
          }
          return c;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerMockUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setCampaignList((prev) => [
            ...prev,
            { 
              id: prev.length + 1, 
              name: `Campaign #${prev.length + 1} (Uploaded Leads)`, 
              progress: 0, 
              called: 0, 
              total: 2500, 
              status: "Active" 
            }
          ]);
        }, 1000);
      }
    }, 150);
  };

  // Generate SVG chart path dynamically
  const chartWidth = 300;
  const chartHeight = 80;
  const chartPathD = chartData.reduce((acc, val, i) => {
    const x = (i * chartWidth) / (chartData.length - 1);
    const y = val;
    return acc + `${i === 0 ? "M" : "L"} ${x},${y}`;
  }, "");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0057D9]/10 border border-[#0057D9]/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#00C2FF]" />
              <span className="text-sm font-medium text-[#00C2FF]">
                AI-Powered Platform — Now with GPT-4o & Gemini
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight mb-6">
              <span className="gradient-text-hero">
                <TypingText text="Transform Customer Conversations Into Business Growth" />
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg lg:text-xl text-[#94A3B8] leading-relaxed mb-10 max-w-xl"
            >
              AI-Powered Omnichannel Customer Experience Solutions Designed For Modern
              Enterprises. CRM, Dialer, Analytics & Multi-Tenant SaaS — All In One Platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/request-demo"
                className="btn-primary text-base !py-4 !px-8 flex items-center justify-center gap-2 group"
              >
                <Zap className="w-5 h-5" />
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary text-base !py-4 !px-8 flex items-center justify-center gap-2"
              >
                Talk To Expert
              </Link>
              <button className="flex items-center justify-center gap-2 text-[#94A3B8] hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF]/10 transition-all">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <span className="text-sm font-medium">Watch Tour</span>
              </button>
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
                500+ Active Clients
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div>99.99% Uptime SLA</div>
              <div className="w-px h-4 bg-white/10" />
              <div>SOC2 Certified</div>
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="glass-card-strong p-6 rounded-2xl shadow-2xl shadow-black/30 border border-white/[0.08]">
                {/* Browser Window Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <div className="flex-1 h-6 rounded-md bg-white/[0.04] flex items-center px-3 border border-white/5">
                    <span className="text-[10px] text-[#64748B]">app.dbsmintek.com/dashboard</span>
                  </div>
                </div>

                {/* Dashboard Tab Bar */}
                <div className="flex border-b border-white/5 mb-4 text-[11px] font-semibold text-[#64748B] w-full">
                  <button 
                    onClick={() => setActiveTab("ops")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "ops" ? "border-[#00C2FF] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <BarChart2 className="w-3.5 h-3.5 text-[#00C2FF]" />
                    Live Ops
                  </button>
                  <button 
                    onClick={() => setActiveTab("ai")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "ai" ? "border-[#00E5A0] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <Activity className="w-3.5 h-3.5 text-[#00E5A0]" />
                    AI Copilot
                  </button>
                  <button 
                    onClick={() => setActiveTab("campaigns")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-all duration-300 ${activeTab === "campaigns" ? "border-[#8B5CF6] text-white bg-white/[0.02]" : "border-transparent hover:text-white"}`}
                  >
                    <Database className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Campaigns
                  </button>
                </div>

                {/* Dashboard Content Container */}
                <div className="min-h-[360px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeTab === "ops" && (
                      <motion.div
                        key="ops-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Operations KPI Metrics */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Active Calls", value: activeCalls.toString(), color: "from-[#0057D9] to-[#00C2FF]", change: "+12%" },
                            { label: "CSAT Score", value: `${csat}%`, color: "from-[#00E5A0] to-[#00C896]", change: "+2.1%" },
                            { label: "Revenue", value: `₹${revenue.toFixed(3)} Cr`, color: "from-[#8B5CF6] to-[#A78BFA]", change: "+18%" },
                          ].map((stat) => (
                            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                              <p className="text-[10px] text-[#64748B] mb-1">{stat.label}</p>
                              <p className={`text-sm sm:text-base font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                                {stat.value}
                              </p>
                              <p className="text-[10px] text-[#22C55E] font-semibold flex items-center gap-0.5 mt-0.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                                {stat.change}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Crawling Line Chart */}
                        <div className="bg-[#081120] border border-white/[0.06] rounded-xl p-3.5 h-[130px] relative overflow-hidden flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">Live Call Volume (24h)</span>
                            <span className="text-[10px] text-[#00C2FF] font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-ping" />
                              Real-time Telemetry
                            </span>
                          </div>
                          <div className="h-[70px] relative mt-2">
                            <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="liveChartGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#0057D9" stopOpacity="0.35" />
                                  <stop offset="100%" stopColor="#0057D9" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <style>{`
                                @keyframes equalize {
                                  0% { transform: scaleY(0.3); }
                                  100% { transform: scaleY(1); }
                                }
                              `}</style>
                              {/* Area under chart */}
                              <path 
                                d={`${chartPathD} L 300,80 L 0,80 Z`} 
                                fill="url(#liveChartGrad)" 
                                className="transition-all duration-1000 ease-in-out"
                              />
                              {/* Line */}
                              <path 
                                d={chartPathD} 
                                fill="none" 
                                stroke="#0057D9" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-in-out"
                              />
                              {/* End Node Pulse */}
                              <circle 
                                cx="300" 
                                cy={chartData[chartData.length - 1]} 
                                r="4" 
                                fill="#00C2FF" 
                                className="animate-pulse"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Live Channels Visual Grid */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 shadow-inner">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">Live Call Channels</span>
                            <span className="text-[9px] text-[#00C2FF] font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                              Active Nodes: 3
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              { id: "ch-01", name: "Outbound VoIP Trunk 01", type: "SIP Session • Live", color: "from-[#0057D9] to-[#00C2FF]", barCount: 16, speed: 0.5 },
                              { id: "ch-02", name: "AI Voice Bot Gateway 04", type: "Gemini voice-v1 • Streaming", color: "from-[#00E5A0] to-[#00C896]", barCount: 16, speed: 0.3 },
                              { id: "ch-03", name: "Omnichannel Gateway 09", type: "WebRTC Endpoint • Connected", color: "from-[#8B5CF6] to-[#A78BFA]", barCount: 16, speed: 0.6 },
                            ].map((ch) => (
                              <div key={ch.id} className="p-2 rounded-lg bg-[#081120] border border-white/[0.04] flex items-center justify-between gap-4">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] font-bold text-[#CBD5E1] block">{ch.name}</span>
                                  <span className="text-[8px] text-[#64748B] uppercase tracking-widest">{ch.type}</span>
                                </div>
                                
                                {/* Equalizer waveform visualizer */}
                                <div className="flex-1 flex gap-0.5 h-6 items-end justify-end max-w-[120px]">
                                  {[...Array(ch.barCount)].map((_, idx) => (
                                    <span 
                                      key={idx} 
                                      className={`w-0.5 rounded-sm bg-gradient-to-t ${ch.color}`}
                                      style={{ 
                                        height: `${Math.floor(Math.random() * 80) + 20}%`,
                                        animation: `equalize ${ch.speed + Math.random() * 0.4}s ease-in-out infinite alternate` 
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "ai" && (
                      <motion.div
                        key="ai-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Live AI Dialogue Transcript Stream */}
                        <div className="bg-[#081120] border border-white/[0.05] rounded-xl p-3 h-[200px] overflow-y-auto space-y-2.5 flex flex-col justify-end shadow-inner relative">
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                            <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest bg-[#0a1424]/90 px-1.5 py-0.5 rounded border border-white/5">AI Speech-to-Text</span>
                            <span className="text-[9px] text-[#00E5A0] font-mono flex items-center gap-1 bg-[#0a1424]/90 px-1.5 py-0.5 rounded border border-white/5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-ping" />
                              Gemini-Voice Live
                            </span>
                          </div>

                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            {aiScript.slice(0, aiStep + 1).map((msg, idx) => (
                              <div 
                                key={idx} 
                                className={`flex flex-col max-w-[85%] ${
                                  msg.speaker === "Agent" 
                                    ? "self-end items-end ml-auto" 
                                    : msg.speaker === "Customer" 
                                      ? "self-start items-start" 
                                      : "self-start items-start w-full max-w-full"
                                }`}
                              >
                                <span className="text-[8px] text-[#64748B] mb-0.5 font-bold uppercase tracking-wider">{msg.speaker}</span>
                                <div className={`p-2.5 rounded-xl text-[10px] leading-relaxed shadow-sm ${
                                  msg.speaker === "Agent" 
                                    ? "bg-[#0057D9] text-white rounded-tr-none" 
                                    : msg.speaker === "Customer" 
                                      ? "bg-white/[0.04] border border-white/[0.08] text-[#CBD5E1] rounded-tl-none" 
                                      : "bg-[#00E5A0]/5 border border-[#00E5A0]/20 text-[#00E5A0] font-medium w-full flex items-center gap-2 rounded-tl-none"
                                }`}>
                                  {msg.speaker === "AI Copilot" && <Sparkles className="w-3.5 h-3.5 text-[#00E5A0] flex-shrink-0 animate-pulse" />}
                                  <span>{msg.text}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Controls & Sentiment Telemetry */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-[9px] uppercase font-bold text-[#64748B]">Dialogue Simulator</span>
                            <div className="flex items-center gap-2 mt-2">
                              <button 
                                onClick={() => setIsPlayingAi(!isPlayingAi)}
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all text-center ${
                                  isPlayingAi 
                                    ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" 
                                    : "bg-[#00E5A0]/20 hover:bg-[#00E5A0]/30 text-[#00E5A0] border border-[#00E5A0]/30"
                                }`}
                              >
                                {isPlayingAi ? "Pause Simulation" : "Resume Simulation"}
                              </button>
                              <button 
                                onClick={() => setAiStep(0)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                                title="Replay"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between">
                            <span className="text-[9px] uppercase font-bold text-[#64748B]">Real-Time Sentiment</span>
                            <div className="mt-1.5 flex flex-col gap-1">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-[#64748B]">Status:</span>
                                <span className={`font-bold uppercase tracking-wider ${
                                  aiScript[aiStep]?.sentiment === "positive" 
                                    ? "text-[#00E5A0]" 
                                    : "text-[#F59E0B]"
                                }`}>
                                  {aiScript[aiStep]?.sentiment || "Positive"}
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1 relative">
                                <div 
                                  className={`h-full bg-gradient-to-r from-[#00C2FF] to-[#00E5A0] transition-all duration-1000`}
                                  style={{ 
                                    width: aiScript[aiStep]?.sentiment === "positive" ? "88%" : "55%" 
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "campaigns" && (
                      <motion.div
                        key="campaigns-tab"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* Outbound Campaigns Pipeline List */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 space-y-3">
                          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">Outreach Campaign Pipeline</span>
                          <div className="space-y-3 max-h-[145px] overflow-y-auto pr-1">
                            {campaignList.map((c) => (
                              <div key={c.id} className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-semibold text-[#CBD5E1]">
                                  <span>{c.name}</span>
                                  <span className="text-[#00C2FF] font-mono">{c.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-300"
                                    style={{ width: `${c.progress}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-[9px] text-[#64748B]">
                                  <span>Called: {c.called.toLocaleString()} / {c.total.toLocaleString()} leads</span>
                                  <span className="text-[#22C55E] uppercase font-bold tracking-wider">{c.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Lead Uploader Dropzone Area */}
                        <div 
                          onClick={triggerMockUpload}
                          className="border-2 border-dashed border-white/10 hover:border-[#8B5CF6]/50 rounded-xl p-4 text-center cursor-pointer transition-all hover:bg-white/[0.01] flex flex-col items-center justify-center space-y-2 min-h-[100px] relative overflow-hidden"
                        >
                          {isUploading ? (
                            <div className="w-full space-y-2">
                              <div className="flex justify-between text-[10px] text-[#94A3B8] font-semibold">
                                <span className="flex items-center gap-1">
                                  <RefreshCw className="w-3 h-3 animate-spin text-[#8B5CF6]" />
                                  Parsing leads.csv...
                                </span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-150" 
                                  style={{ width: `${uploadProgress}%` }} 
                                />
                              </div>
                              <p className="text-[8px] text-[#64748B]">Compiling and assigning SIP channels...</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-[#64748B] hover:text-[#8B5CF6] transition-colors" />
                              <div>
                                <p className="text-[11px] font-bold text-[#CBD5E1]">Simulate Outbound Lead Upload</p>
                                <p className="text-[9px] text-[#64748B] mt-0.5">Click to import leads.csv and initiate campaign dialing</p>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Floating Cards (Interactive Badges) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => setActiveTab("ai")}
                className="absolute -right-8 top-12 glass-card p-3 rounded-xl shadow-xl shadow-black/20 w-48 border border-white/10 cursor-pointer hover:border-[#00E5A0]/40 transition-colors hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-[#22C55E]/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-[#22C55E]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#22C55E]">AI Insight Simulator</span>
                </div>
                <p className="text-[10px] text-[#94A3B8] leading-relaxed">Sentiment trending positive. Recommend loyalty data bundle upgrade.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                onClick={() => setActiveTab("campaigns")}
                className="absolute -left-6 bottom-20 glass-card p-3 rounded-xl shadow-xl shadow-black/20 w-44 border border-white/10 cursor-pointer hover:border-[#8B5CF6]/40 transition-colors hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-[#00C2FF]/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-[#00C2FF]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#00C2FF]">Live Outreach</span>
                </div>
                <p className="text-[10px] text-[#94A3B8] leading-relaxed">Active campaigns compiling. Click to upload CSV leads.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
