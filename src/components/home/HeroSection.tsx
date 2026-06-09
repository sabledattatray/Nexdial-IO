"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, ArrowRight, Sparkles } from "lucide-react";
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
              <div className="glass-card-strong p-6 rounded-2xl shadow-2xl shadow-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <div className="flex-1 h-6 rounded-md bg-white/[0.04] flex items-center px-3">
                    <span className="text-[10px] text-[#475569]">app.dbsmintek.com/dashboard</span>
                  </div>
                </div>

                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Active Calls", value: "847", color: "from-[#0057D9] to-[#00C2FF]", change: "+12%" },
                      { label: "CSAT Score", value: "98.2%", color: "from-[#00E5A0] to-[#00C896]", change: "+2.1%" },
                      { label: "Revenue", value: "₹20 Cr", color: "from-[#8B5CF6] to-[#A78BFA]", change: "+18%" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                        <p className="text-[10px] text-[#64748B] mb-1">{stat.label}</p>
                        <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {stat.value}
                        </p>
                        <p className="text-[10px] text-[#22C55E]">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mini Chart */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 h-[140px] relative overflow-hidden">
                    <p className="text-[10px] text-[#64748B] mb-2">Call Volume (24h)</p>
                    <svg viewBox="0 0 300 80" className="w-full h-[80px]">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0057D9" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0057D9" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,60 C30,50 60,30 90,35 C120,40 150,20 180,25 C210,30 240,10 270,15 C285,17 300,20 300,20 L300,80 L0,80 Z" fill="url(#chartGrad)" />
                      <path d="M0,60 C30,50 60,30 90,35 C120,40 150,20 180,25 C210,30 240,10 270,15 C285,17 300,20" fill="none" stroke="#0057D9" strokeWidth="2" />
                      <circle cx="270" cy="15" r="3" fill="#00C2FF" className="animate-pulse" />
                    </svg>
                  </div>

                  {/* Agent List */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                    <p className="text-[10px] text-[#64748B] mb-2">Active Agents</p>
                    <div className="space-y-2">
                      {["Sarah Chen", "Alex Kumar", "Maria Santos"].map((name, i) => (
                        <div key={name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${i === 0 ? "from-[#0057D9] to-[#00C2FF]" : i === 1 ? "from-[#00E5A0] to-[#00C896]" : "from-[#8B5CF6] to-[#A78BFA]"} flex items-center justify-center`}>
                              <span className="text-[8px] font-bold text-white">{name.split(" ").map(n => n[0]).join("")}</span>
                            </div>
                            <span className="text-[11px] text-[#94A3B8]">{name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            <span className="text-[10px] text-[#22C55E]">On Call</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-12 glass-card p-3 rounded-xl shadow-xl shadow-black/20 w-48"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-[#22C55E]/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-[#22C55E]" />
                  </div>
                  <span className="text-[10px] font-medium text-[#22C55E]">AI Insight</span>
                </div>
                <p className="text-[10px] text-[#94A3B8]">Sentiment trending positive. Recommend upsell for Account #4521.</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 bottom-20 glass-card p-3 rounded-xl shadow-xl shadow-black/20 w-44"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-[#00C2FF]/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-[#00C2FF]" />
                  </div>
                  <span className="text-[10px] font-medium text-[#00C2FF]">Live</span>
                </div>
                <p className="text-[10px] text-[#94A3B8]">847 active calls across 12 campaigns</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
