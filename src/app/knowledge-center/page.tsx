"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { BookOpen, Code, Terminal, Server, Shield, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    category: "VoIP Telephony",
    title: "Mapping Vicidial Campaign Trunks to DBS Mintek Route queues",
    desc: "Configure Asterisk dynamic routing priorities to distribute incoming callers to active agent groups.",
    icon: Server,
    color: "#0057D9"
  },
  {
    category: "Developer API",
    title: "Securing Tenant authentication channels with OAuth 2.0 & JWT",
    desc: "A developer guide to setting up custom single sign-on (SSO) domains per organization tenant.",
    icon: Code,
    color: "#8B5CF6"
  },
  {
    category: "Compliance",
    title: "Configuring Data Masking and HIPAA audit logging protocols",
    desc: "Ensuring patient names, credit cards, and SSNs are masked from live call logs and transcript files.",
    icon: Shield,
    color: "#00E5A0"
  },
  {
    category: "User Guides",
    title: "Setting up AI Agent Copilot script templates inside agent panels",
    desc: "Build drag-and-drop SOP paths using our workflow builder to assist agents during live customer calls.",
    icon: BookOpen,
    color: "#F59E0B"
  }
];

export default function KnowledgeCenterPage() {
  const [search, setSearch] = useState("");

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.desc.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            DBS Mintek Documentation
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-6">
            Knowledge & <span className="gradient-text">Developer Center</span>
          </h1>
          <p className="text-[#94A3B8] text-sm mt-3">
            Read technical whitepapers, developer APIs, setup guides, and administrative document files.
          </p>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={0.1} className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search API docs, user guides, or compliance specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
            />
          </div>
        </AnimatedSection>

        {/* Articles Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.06}>
          {filtered.length > 0 ? (
            filtered.map((art) => {
              const Icon = art.icon;
              return (
                <StaggerItem key={art.title}>
                  <div className="glass-card p-6 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">{art.category}</span>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${art.color}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: art.color }} />
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mt-4 leading-snug group-hover:text-[#00C2FF] transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                        {art.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-semibold text-[#0057D9] group-hover:text-[#00C2FF] transition-colors">
                      <span>Read Documentation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </StaggerItem>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 text-[#64748B] text-xs">
              No documentation matches found.
            </div>
          )}
        </StaggerContainer>

      </div>
    </div>
  );
}
