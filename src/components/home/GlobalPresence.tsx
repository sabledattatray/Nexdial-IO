"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Globe, MapPin, Building, Users, Server, ShieldCheck } from "lucide-react";
import indiaMap from "@/lib/indiaMapData";

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
    id: "badlapur",
    city: "Badlapur, Thane (HQ)",
    country: "India",
    role: "Global Head Office & NexDial Command Center",
    details: "Financial-grade secure operations, PCI-DSS compliant BPO & primary cloud clusters",
    address: "Badlapur East, Dist- Thane, Maharashtra, India- 421503",
    coordinates: { x: 120, y: 445 },
    servers: "AWS Mumbai (ap-south-1) Primary Hub",
    agents: "650+",
    sla: "99.99%",
    latency: "4ms",
    load: "58%",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    role: "Technology Innovation & R&D Hub",
    details: "Speech AI research, cloud telephony architecture, and system integration testing",
    address: "Prestige Tech Park, Block B, 4th Floor, Marathahalli-Sarjapur Outer Ring Road, Bengaluru, Karnataka 560103",
    coordinates: { x: 210, y: 580 },
    servers: "Azure India Central (Pune/Bangalore)",
    agents: "350+",
    sla: "99.99%",
    latency: "11ms",
    load: "52%",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    role: "AI Model Training & KPO Center",
    details: "Deep learning transcript optimization, agent training simulator engine support",
    address: "Mindspace IT Park, Building 20, 8th Floor, Madhapur, Hyderabad, Telangana 500081",
    coordinates: { x: 240, y: 480 },
    servers: "Google Cloud Region (me-central2)",
    agents: "300+",
    sla: "99.97%",
    latency: "12ms",
    load: "41%",
  },
  {
    id: "chennai",
    city: "Chennai",
    country: "India",
    role: "Omnichannel Support & Regional Hub",
    details: "Multilingual regional support, SLA tracking systems, and telecom endpoints",
    address: "Taramani IIT Research Park, Phase II, 3rd Floor, Chennai, Tamil Nadu 600113",
    coordinates: { x: 280, y: 590 },
    servers: "AWS Mumbai Local Zone",
    agents: "250+",
    sla: "99.95%",
    latency: "15ms",
    load: "35%",
  },
  {
    id: "pune",
    city: "Pune (Baner)",
    country: "India",
    role: "Quality Assurance & DevOps Node",
    details: "Continuous integration pipelines, WebRTC diagnostics, and 99.99% uptime control",
    address: "Amar Apex, 4th Floor, Baner Road, Baner, Pune, Maharashtra 411045",
    coordinates: { x: 140, y: 460 },
    servers: "AWS Mumbai / Local Nodes",
    agents: "200+",
    sla: "99.99%",
    latency: "13ms",
    load: "28%",
  },
  {
    id: "kolkata",
    city: "Kolkata",
    country: "India",
    role: "East India CX & Operations Hub",
    details: "Inbound customer service, dialer campaign execution, and disaster recovery center",
    address: "DLF IT Park 1, Tower C, 6th Floor, Major Arterial Road, New Town, Kolkata, West Bengal 700156",
    coordinates: { x: 440, y: 350 },
    servers: "Azure India South (Chennai/Kolkata)",
    agents: "180+",
    sla: "99.92%",
    latency: "19ms",
    load: "30%",
  },
  {
    id: "jaipur",
    city: "Jaipur (Rajasthan)",
    country: "India",
    role: "West India Operations Node & DR Center",
    details: "Highly redundant disaster recovery center, local storage backup, 24/7 support delivery",
    address: "Mahindra World City, IT/ITES SEZ, Jaipur, Rajasthan 302037",
    coordinates: { x: 160, y: 260 },
    servers: "Local Storage Arrays & AWS Backup",
    agents: "120+",
    sla: "99.90%",
    latency: "22ms",
    load: "18%",
  },
  {
    id: "lucknow",
    city: "Lucknow",
    country: "India",
    role: "North India Support & Regional Hub",
    details: "Enterprise client support center, multi-language inbound services, training modules",
    address: "Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    coordinates: { x: 275, y: 240 },
    servers: "AWS Central & local replication",
    agents: "150+",
    sla: "99.94%",
    latency: "16ms",
    load: "24%",
  },
  {
    id: "srinagar",
    city: "Srinagar (Jammu & Kashmir)",
    country: "India",
    role: "North India Gateway & Security Hub",
    details: "High-security WebRTC node, low-latency regional gateways, and backup network links",
    address: "SIDCO Electronic Complex, Rangreth, Srinagar, Jammu & Kashmir 190007",
    coordinates: { x: 180, y: 110 },
    servers: "AWS Mumbai / local secure caches",
    agents: "80+",
    sla: "99.93%",
    latency: "18ms",
    load: "15%",
  }
];

const connectionPaths = [
  { from: { x: 120, y: 445 }, to: { x: 140, y: 460 } }, // Badlapur -> Pune
  { from: { x: 120, y: 445 }, to: { x: 160, y: 260 } }, // Badlapur -> Jaipur
  { from: { x: 120, y: 445 }, to: { x: 275, y: 240 } }, // Badlapur -> Lucknow
  { from: { x: 120, y: 445 }, to: { x: 210, y: 580 } }, // Badlapur -> Bengaluru
  { from: { x: 120, y: 445 }, to: { x: 240, y: 480 } }, // Badlapur -> Hyderabad
  { from: { x: 120, y: 445 }, to: { x: 280, y: 590 } }, // Badlapur -> Chennai
  { from: { x: 120, y: 445 }, to: { x: 440, y: 350 } }, // Badlapur -> Kolkata
  { from: { x: 120, y: 445 }, to: { x: 180, y: 110 } }, // Badlapur -> Srinagar
];

export function GlobalPresence() {
  const [activeLoc, setActiveLoc] = useState<Location>(locations[0]);

  return (
    <section className="relative pt-20 lg:pt-32 pb-0 overflow-hidden">
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

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 items-stretch">
          {/* Interactive World Map SVG Wrapper */}
          <AnimatedSection direction="none" className="relative p-6 glass-card border-white/[0.05] shadow-2xl flex flex-col justify-center">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#94A3B8] z-30">
              <Globe className="w-3.5 h-3.5 text-[#00C2FF] animate-spin-slow" />
              <span>Interactive Operations Map — India</span>
            </div>

            {/* India Map Outline Graphic using SVG for responsive plotting */}
            <div 
              className="relative w-full mx-auto bg-[#0a1424] rounded-xl overflow-hidden border border-white/[0.05] shadow-inner"
              style={{ maxWidth: "483px", maxHeight: "550px", aspectRatio: "612/696" }}
            >
              <svg viewBox={indiaMap.viewBox} className="w-full h-full select-none">
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
                
                {/* Detailed India State paths */}
                <g className="cursor-default">
                  {indiaMap.locations.map((state) => (
                    <path
                      key={state.id}
                      d={state.path}
                      fill="rgba(15, 23, 42, 0.75)"
                      stroke="rgba(0, 194, 255, 0.18)"
                      strokeWidth="1"
                      className="transition-colors duration-300 hover:fill-[#0057D9]/15 hover:stroke-[#00C2FF]/50"
                    />
                  ))}
                </g>

                {/* Badlapur HQ Radial Glow */}
                <circle cx="120" cy="445" r="28" fill="#0057D9" opacity="0.12" className="animate-pulse" />

                {/* Connection lines from Badlapur HQ */}
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
                const isHQ = loc.id === "badlapur";
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
                  Guaranteed TRAI, OSP, & ISO 27001 Telecom Compliance
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
