"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Globe, MapPin, Building, Users, Server, ShieldCheck } from "lucide-react";
import indiaMap from "@/lib/indiaMapData";

const locations = [
  {
    id: "noida",
    city: "Noida (HQ)",
    country: "India",
    role: "Global Head Office & AI Development Hub",
    details: "1,200+ Seats, Tier-3 Data Center, 24/7 Operations, SOC2 & ISO 27001 Certified",
    coordinates: { x: 195, y: 205 }, // Absolute SVG coordinates on 612x696 grid
    servers: "Primary Cloud & Local Clusters",
    agents: "800+",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    role: "Financial CX Center & Enterprise Relations",
    details: "Financial-grade secure operations, PCI-DSS compliant BPO & backup nodes",
    coordinates: { x: 120, y: 445 },
    servers: "AWS Mumbai (ap-south-1)",
    agents: "450+",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    role: "Technology Innovation & R&D Hub",
    details: "Speech AI research, cloud telephony architecture, and system integration testing",
    coordinates: { x: 210, y: 580 },
    servers: "Azure India Central (Pune/Bangalore)",
    agents: "350+",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    role: "AI Model Training & KPO Center",
    details: "Deep learning transcript optimization, agent training simulator engine support",
    coordinates: { x: 240, y: 480 },
    servers: "Google Cloud Region (me-central2)",
    agents: "300+",
  },
  {
    id: "chennai",
    city: "Chennai",
    country: "India",
    role: "Omnichannel Support & Regional Hub",
    details: "Multilingual regional support, SLA tracking systems, and telecom endpoints",
    coordinates: { x: 280, y: 590 },
    servers: "AWS Mumbai Local Zone",
    agents: "250+",
  },
  {
    id: "pune",
    city: "Pune",
    country: "India",
    role: "Quality Assurance & DevOps Node",
    details: "Continuous integration pipelines, WebRTC diagnostics, and 99.99% uptime control",
    coordinates: { x: 140, y: 460 },
    servers: "AWS Mumbai / Local Nodes",
    agents: "200+",
  },
  {
    id: "kolkata",
    city: "Kolkata",
    country: "India",
    role: "East India CX & Operations Hub",
    details: "Inbound customer service, dialer campaign execution, and disaster recovery center",
    coordinates: { x: 440, y: 350 },
    servers: "Azure India South (Chennai/Kolkata)",
    agents: "180+",
  }
];

export function GlobalPresence() {
  const [activeLoc, setActiveLoc] = useState(locations[0]);

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
            India Infrastructure
          </p>
          <h2 className="section-title text-white mb-4">
            National Scale. <span className="gradient-text">Local TRAI Compliance.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Operational footprint and cloud clusters strategically located across India to ensure low-latency WebRTC routing, strict telecom guidelines alignment, and active redundancy.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          {/* Interactive World Map SVG Wrapper */}
          <AnimatedSection direction="none" className="relative p-6 glass-card border-white/[0.05] shadow-2xl">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#94A3B8] z-30">
              <Globe className="w-3.5 h-3.5 text-[#00C2FF] animate-spin-slow" />
              <span>Interactive Operations Map — India</span>
            </div>

            {/* India Map Outline Graphic using SVG for responsive plotting */}
            <div className="relative w-full aspect-[612/696] max-h-[550px] mx-auto bg-[#0c182c]/40 rounded-xl overflow-hidden border border-white/[0.03] p-4 flex items-center justify-center">
              <svg viewBox={indiaMap.viewBox} className="w-full h-full opacity-30 select-none pointer-events-none">
                {/* Simple grid coordinate system lines */}
                <line x1="0" y1="348" x2="612" y2="348" stroke="rgba(255,255,255,0.03)" strokeDasharray="3" />
                <line x1="306" y1="0" x2="306" y2="696" stroke="rgba(255,255,255,0.03)" strokeDasharray="3" />
                
                {/* Detailed India State paths */}
                {indiaMap.locations.map((state) => (
                  <path
                    key={state.id}
                    d={state.path}
                    fill="rgba(0, 87, 217, 0.05)"
                    stroke="rgba(0, 194, 255, 0.2)"
                    strokeWidth="1.2"
                    className="transition-colors duration-300 hover:fill-[#0057D9]/10 hover:stroke-[#00C2FF]/40"
                  />
                ))}
              </svg>

              {/* Plotted Dots */}
              {locations.map((loc) => {
                const isActive = activeLoc.id === loc.id;
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
                    <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#00C2FF]/20 scale-100" : "bg-transparent scale-0 group-hover:scale-75 group-hover:bg-[#0057D9]/10"
                    }`} />
                    
                    {/* Pulsing Core */}
                    <div className={`relative w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-[#00C2FF] border-white shadow-[0_0_15px_#00C2FF]"
                        : "bg-[#0057D9] border-[#00C2FF] group-hover:bg-[#00C2FF]"
                    }`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </div>

                    {/* Simple Label Tooltip */}
                    <span className={`absolute top-6 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#0f172a] border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                      {loc.city}
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
                className="glass-card-strong p-8 relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2FF]/10 rounded-full blur-[40px]" />
                
                <span className="text-xs font-semibold text-[#00C2FF] tracking-wider uppercase mb-2 block">
                  Active Region Profile
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#EF4444]" />
                  {activeLoc.city}, {activeLoc.country}
                </h3>
                
                <p className="text-sm font-medium text-[#94A3B8] border-b border-white/[0.06] pb-4 mb-6">
                  {activeLoc.role}
                </p>

                <div className="space-y-6">
                  {/* Item Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Building className="w-4.5 h-4.5 text-[#00E5A0]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Capacity & Certs</p>
                      <p className="text-sm text-[#E2E8F0] mt-0.5">{activeLoc.details}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Server className="w-4.5 h-4.5 text-[#00C2FF]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Cloud Nodes & Servers</p>
                      <p className="text-sm text-[#E2E8F0] mt-0.5">{activeLoc.servers}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Users className="w-4.5 h-4.5 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">Active Professionals</p>
                      <p className="text-sm text-[#E2E8F0] mt-0.5">{activeLoc.agents} BPO & Tech Specialists</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#00E5A0]/5 border border-[#00E5A0]/10 text-xs text-[#00E5A0] font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Guaranteed TRAI, OSP, & ISO 27001 Telecom Compliance
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
