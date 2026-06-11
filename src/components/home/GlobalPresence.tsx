"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Globe, MapPin, Building, Users, Server, ShieldCheck } from "lucide-react";

interface Location {
  id: string;
  city: string;
  country: string;
  role: string;
  details: string;
  address: string;
  coordinates: { x: number; y: number };
  servers: string;
  agents: string;
  sla: string;
  latency: string;
  load: string;
}

const locations: Location[] = [
  {
    id: "sf",
    city: "San Francisco (HQ)",
    country: "USA",
    role: "Global Head Office & Innovation Hub",
    details: "Primary AI research, global routing architecture, and core enterprise platform",
    address: "123 Innovation Boulevard, Tech District, San Francisco, CA 94105",
    coordinates: { x: 80, y: 250 },
    servers: "AWS US-West (N. California) Primary Hub",
    agents: "450+",
    sla: "99.99%",
    latency: "3ms",
    load: "62%",
  },
  {
    id: "ny",
    city: "New York",
    country: "USA",
    role: "East Coast Financial CX Center",
    details: "High-frequency trading support, financial compliance operations",
    address: "One World Trade Center, Suite 4500, New York, NY 10007",
    coordinates: { x: 160, y: 240 },
    servers: "AWS US-East Local Zone",
    agents: "300+",
    sla: "99.99%",
    latency: "8ms",
    load: "45%",
  },
  {
    id: "london",
    city: "London",
    country: "UK",
    role: "EMEA Operations & Compliance",
    details: "GDPR compliant data handling, European enterprise support",
    address: "Level 39, One Canada Square, Canary Wharf, London E14 5AB",
    coordinates: { x: 280, y: 200 },
    servers: "AWS EU-West (London)",
    agents: "500+",
    sla: "99.98%",
    latency: "12ms",
    load: "55%",
  },
  {
    id: "frankfurt",
    city: "Frankfurt",
    country: "Germany",
    role: "European Data Sovereignty Node",
    details: "Strict data localization, high-throughput message queuing",
    address: "Taunusanlage 8, 60329 Frankfurt am Main, Germany",
    coordinates: { x: 310, y: 190 },
    servers: "Azure Germany Central",
    agents: "250+",
    sla: "99.99%",
    latency: "9ms",
    load: "38%",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    role: "MENA Regional Hub",
    details: "Multilingual regional support, 24/7 global operations center",
    address: "Dubai Internet City, Building 1, Dubai, UAE",
    coordinates: { x: 360, y: 300 },
    servers: "AWS Middle East (UAE)",
    agents: "350+",
    sla: "99.95%",
    latency: "15ms",
    load: "42%",
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    role: "APAC Gateway & Tech Hub",
    details: "Ultra-low latency routing for Asia-Pacific, regional failover",
    address: "Marina Bay Financial Centre Tower 1, Singapore 018981",
    coordinates: { x: 450, y: 420 },
    servers: "Google Cloud Region (asia-southeast1)",
    agents: "400+",
    sla: "99.99%",
    latency: "11ms",
    load: "48%",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    role: "East Asia Enterprise Support",
    details: "Premium Japanese language support, automated QA processing",
    address: "Roppongi Hills Mori Tower, Minato City, Tokyo",
    coordinates: { x: 520, y: 220 },
    servers: "AWS AP-Northeast (Tokyo)",
    agents: "280+",
    sla: "99.97%",
    latency: "6ms",
    load: "35%",
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    role: "Oceania Operations Hub",
    details: "ANZ market support, continuous integration pipelines",
    address: "Barangaroo Avenue, Sydney NSW 2000, Australia",
    coordinates: { x: 540, y: 520 },
    servers: "Azure Australia East",
    agents: "200+",
    sla: "99.95%",
    latency: "14ms",
    load: "30%",
  }
];

const connectionPaths = [
  { from: { x: 80, y: 250 }, to: { x: 160, y: 240 } },
  { from: { x: 160, y: 240 }, to: { x: 280, y: 200 } },
  { from: { x: 280, y: 200 }, to: { x: 310, y: 190 } },
  { from: { x: 310, y: 190 }, to: { x: 360, y: 300 } },
  { from: { x: 360, y: 300 }, to: { x: 450, y: 420 } },
  { from: { x: 450, y: 420 }, to: { x: 520, y: 220 } },
  { from: { x: 450, y: 420 }, to: { x: 540, y: 520 } },
  { from: { x: 80, y: 250 }, to: { x: 280, y: 200 } },
  { from: { x: 80, y: 250 }, to: { x: 520, y: 220 } },
];

export function GlobalPresence() {
  const [activeLoc, setActiveLoc] = useState<Location>(locations[0]);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[#081120]" />
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.02] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.04] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00E5A0] uppercase tracking-widest mb-4">
            Global Infrastructure
          </p>
          <h2 className="section-title text-white mb-4">
            Worldwide Scale. <span className="gradient-text">Global Compliance.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Operational footprint and cloud clusters strategically located across the globe to ensure low-latency WebRTC routing, strict regional guidelines alignment, and active redundancy.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-stretch">
          {/* Interactive World Map SVG Wrapper */}
          <AnimatedSection direction="none" className="relative p-6 glass-card border-white/[0.05] shadow-2xl flex flex-col justify-center">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#94A3B8] z-30">
              <Globe className="w-3.5 h-3.5 text-[#00C2FF] animate-spin-slow" />
              <span>Interactive Operations Map — Worldwide</span>
            </div>

            {/* Worldwide Map Outline Graphic using SVG for responsive plotting */}
            <div 
              className="relative w-full mx-auto bg-[#0a1424] rounded-xl overflow-hidden border border-white/[0.05] shadow-inner"
              style={{ maxWidth: "483px", maxHeight: "550px", aspectRatio: "612/696" }}
            >
              <svg viewBox="0 0 612 696" className="w-full h-full select-none">
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .animate-dash {
                    animation: dash 2.5s linear infinite;
                  }
                `}</style>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0057D9" />
                    <stop offset="50%" stopColor="#00C2FF" />
                    <stop offset="100%" stopColor="#00E5A0" />
                  </linearGradient>
                </defs>

                {/* Simple grid coordinate system lines */}
                <line x1="0" y1="348" x2="612" y2="348" stroke="rgba(255,255,255,0.02)" strokeDasharray="3" />
                <line x1="306" y1="0" x2="306" y2="696" stroke="rgba(255,255,255,0.02)" strokeDasharray="3" />

                {/* San Francisco HQ Radial Glow */}
                <circle cx="80" cy="250" r="28" fill="#0057D9" opacity="0.12" className="animate-pulse" />

                {/* Connection lines from HQ */}
                <g opacity="0.6">
                  {connectionPaths.map((path, index) => (
                    <g key={index}>
                      <path
                        d={`M ${path.from.x} ${path.from.y} Q ${(path.from.x + path.to.x)/2 - 30} ${(path.from.y + path.to.y)/2} ${path.to.x} ${path.to.y}`}
                        fill="none"
                        stroke="rgba(0, 194, 255, 0.08)"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M ${path.from.x} ${path.from.y} Q ${(path.from.x + path.to.x)/2 - 30} ${(path.from.y + path.to.y)/2} ${path.to.x} ${path.to.y}`}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="5, 5"
                        className="animate-dash"
                      />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Plotted Dots */}
              {locations.map((loc) => {
                const isActive = activeLoc.id === loc.id;
                const isHQ = loc.id === "sf";
                const xPercent = (loc.coordinates.x / 612) * 100;
                const yPercent = (loc.coordinates.y / 696) * 100;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLoc(loc)}
                    className="absolute group focus:outline-none -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                    style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                  >
                    {/* Ring Pulse */}
                    <div className={`absolute rounded-full transition-all duration-300 ${
                      isHQ ? "-inset-5" : "-inset-4"
                    } ${
                      isActive ? "bg-[#00C2FF]/20 scale-100 animate-pulse" : "bg-transparent scale-0 group-hover:scale-75 group-hover:bg-[#0057D9]/10"
                    }`} />
                    
                    {/* Pulsing Core */}
                    <div className={`relative rounded-full flex items-center justify-center border transition-all ${
                      isHQ 
                        ? isActive 
                          ? "w-6 h-6 bg-[#00E5A0] border-white shadow-[0_0_15px_#00E5A0]" 
                          : "w-5 h-5 bg-[#0057D9] border-[#00E5A0] group-hover:bg-[#00C2FF]"
                        : isActive
                          ? "w-4 h-4 bg-[#00C2FF] border-white shadow-[0_0_15px_#00C2FF]"
                          : "w-3.5 h-3.5 bg-[#0057D9] border-[#00C2FF] group-hover:bg-[#00C2FF]"
                    }`}>
                      <div className={`bg-white rounded-full ${isHQ ? "w-2 h-2" : "w-1.5 h-1.5"}`} />
                    </div>

                    {/* Simple Label Tooltip */}
                    <span className={`absolute top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#0f172a] border border-white/10 text-[9px] font-semibold text-white whitespace-nowrap transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                      {loc.city} {isHQ && "⭐"}
                    </span>
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Details Sidebar panel */}
          <AnimatedSection delay={0.2} className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLoc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card-strong p-8 relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  {/* Glow accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2FF]/10 rounded-full blur-[40px]" />
                  
                  <span className="text-xs font-semibold text-[#00C2FF] tracking-wider uppercase mb-2 block">
                    Active Region Profile
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#EF4444]" />
                    {activeLoc.city}, {activeLoc.country}
                  </h3>
                  
                  <p className="text-sm font-medium text-[#94A3B8] border-b border-white/[0.06] pb-4 mb-4">
                    {activeLoc.role}
                  </p>

                  {/* Telemetry Panel */}
                  <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
                    <div className="text-center">
                      <span className="text-[9px] uppercase font-bold text-[#64748B] block">Uptime SLA</span>
                      <span className="text-sm font-mono font-bold text-[#00E5A0] mt-0.5 block">{activeLoc.sla}</span>
                    </div>
                    <div className="text-center border-x border-white/[0.06]">
                      <span className="text-[9px] uppercase font-bold text-[#64748B] block">Ping Latency</span>
                      <span className="text-sm font-mono font-bold text-[#00C2FF] mt-0.5 block">{activeLoc.latency}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] uppercase font-bold text-[#64748B] block">Node Load</span>
                      <span className="text-sm font-mono font-bold text-[#F59E0B] mt-0.5 block">{activeLoc.load}</span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Official Physical Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4.5 h-4.5 text-[#EF4444]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Official Address</p>
                        <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium leading-relaxed">{activeLoc.address}</p>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Building className="w-4.5 h-4.5 text-[#00E5A0]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Capacity & Certs</p>
                        <p className="text-xs text-[#CBD5E1] mt-0.5">{activeLoc.details}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Server className="w-4.5 h-4.5 text-[#00C2FF]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Cloud Nodes & Servers</p>
                        <p className="text-xs text-[#CBD5E1] mt-0.5">{activeLoc.servers}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Users className="w-4.5 h-4.5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Active Professionals</p>
                        <p className="text-xs text-[#CBD5E1] mt-0.5">{activeLoc.agents} BPO & Tech Specialists</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 mt-6 rounded-xl bg-[#00E5A0]/5 border border-[#00E5A0]/10 text-[11px] text-[#00E5A0] font-medium">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  Guaranteed Global GDPR, HIPAA, & ISO 27001 Compliance
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
