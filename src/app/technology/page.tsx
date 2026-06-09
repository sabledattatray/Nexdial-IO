"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Server, Database, Code, Cpu, ShieldCheck, Terminal, GitBranch, Share2 } from "lucide-react";

const techStack = [
  {
    category: "Frontend Layer",
    techs: ["Next.js 15 (App Router)", "TypeScript", "Tailwind CSS", "ShadCN UI", "Framer Motion / GSAP", "Zustand State Store"],
    icon: Code,
    color: "#00C2FF",
  },
  {
    category: "Backend Services",
    techs: ["NestJS Framework", "Node.js cluster instances", "GraphQL & REST APIs", "WebSockets (Socket.io)", "JWT & OAuth 2.0 Auth"],
    icon: Terminal,
    color: "#8B5CF6",
  },
  {
    category: "Data & Caching",
    techs: ["PostgreSQL (Relational data)", "Redis (Session & socket state)", "Elasticsearch (Call summaries)", "Prisma ORM integration"],
    icon: Database,
    color: "#00E5A0",
  },
  {
    category: "Telephony & VoIP",
    techs: ["Asterisk PBX / FreePBX", "Vicidial campaigns integrator", "Twilio / Exotel Voice API", "SIP trunks / WebRTC endpoints"],
    icon: Server,
    color: "#0057D9",
  },
  {
    category: "DevOps & Cloud Clusters",
    techs: ["Microsoft Azure Cloud", "Azure Blob / AWS S3 buckets", "Docker & Kubernetes (K8s)", "Prometheus & Grafana monitors"],
    icon: GitBranch,
    color: "#EF4444",
  },
  {
    category: "Cognitive AI Integrations",
    techs: ["OpenAI API (GPT-4o)", "Anthropic Claude API", "Google Gemini Flash API", "Whisper Transcription Engine"],
    icon: Cpu,
    color: "#F59E0B",
  }
];

export default function TechnologyPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            Technical Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Developer-First <span className="gradient-text">CX Infrastructure</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Engineered for 99.99% system availability, low-latency WebRTC, white-label Multi-Tenancy, and plug-and-play API triggers.
          </p>
        </AnimatedSection>

        {/* Tech Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.05}>
          {techStack.map((stack) => {
            const Icon = stack.icon;
            return (
              <StaggerItem key={stack.category}>
                <div className="glass-card-strong p-8 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: stack.color }} />
                  
                  <div className="space-y-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stack.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stack.color }} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00C2FF] transition-colors">{stack.category}</h3>
                    
                    <ul className="space-y-2.5">
                      {stack.techs.map((tech) => (
                        <li key={tech} className="flex items-center gap-2.5 text-xs text-[#CBD5E1] font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stack.color }} />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Integration Architecture */}
        <AnimatedSection className="glass-card p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/10 rounded-full blur-[80px]" />
          
          <div className="grid lg:grid-cols-[1.3fr,1fr] gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-[#00E5A0] uppercase tracking-wider block mb-2">Omnichannel Integration Hub</span>
              <h3 className="text-2xl font-bold text-white">Direct CRM & Dialer Hook Middleware</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mt-3">
                Our webhook engine sends real-time payload updates (JSON format) directly to Salesforce, HubSpot, and Zoho. Connect dialers directly to SIP trunk providers with minimal latency using our optimized WebRTC browser-call architecture.
              </p>
              <div className="flex gap-4 mt-6">
                <button className="px-4 py-2 text-xs font-bold text-white rounded bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#00C2FF]" />
                  Explore Developer API Docs
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] font-mono text-xs text-[#CBD5E1] space-y-2">
              <p className="text-[#64748B]"># Webhook WebRTC Call Trigger</p>
              <p className="text-[#00E5A0]">POST <span className="text-white">/api/v1/calls/initiate</span></p>
              <p className="text-[#8B5CF6]">{`{`}</p>
              <p className="pl-4"><span className="text-[#00C2FF]">&quot;campaignId&quot;</span>: <span className="text-white">&quot;cmp_9281a&quot;</span>,</p>
              <p className="pl-4"><span className="text-[#00C2FF]">&quot;phoneNumber&quot;</span>: <span className="text-white">&quot;+15550199&quot;</span>,</p>
              <p className="pl-4"><span className="text-[#00C2FF]">&quot;aiCopilotEnabled&quot;</span>: <span className="text-white">true</span>,</p>
              <p className="pl-4"><span className="text-[#00C2FF]">&quot;tenantSubdomain&quot;</span>: <span className="text-white">&quot;acme-support&quot;</span></p>
              <p className="text-[#8B5CF6]">{`}`}</p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
