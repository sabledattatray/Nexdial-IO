"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Check, Mail, Phone, Building, Send, Globe, ChevronRight } from "lucide-react";

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "10-50",
    useCase: "AI Dialer",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-center">
          
          {/* Info Column */}
          <div className="space-y-8">
            <AnimatedSection>
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                Sandbox Environment Demo
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-6 leading-tight">
                Experience the Future of <span className="gradient-text">Omnichannel CX</span>
              </h1>
              <p className="text-[#94A3B8] text-base leading-relaxed mt-4">
                Deploy dbs-mintek inside a secure sandbox sandbox. Test our Conversational AI agents, Predictive Dialers, and real-time dashboard analytics with demo accounts.
              </p>
            </AnimatedSection>

            {/* Bullet points */}
            <div className="space-y-4">
              {[
                "Deploy Voice AI Agents with custom prompts inside 5 minutes",
                "Explore multi-tenant BPO white-label administrative panels",
                "Integrate simulated Asterisk VoIP endpoints in your web browser",
                "Review automated transcriptions, sentiment analysis, and QA scorecards"
              ].map((bullet, i) => (
                <AnimatedSection key={bullet} delay={i * 0.08} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center text-[#00E5A0] flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-[#CBD5E1] font-semibold">{bullet}</span>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <AnimatedSection delay={0.2} className="glass-card-strong p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0057D9]/10 rounded-full blur-[60px]" />
            
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center mx-auto text-[#00E5A0] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sandbox Access Requested</h2>
                <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                  A verification link and temporary staging login tokens have been sent to your business email. Check your spam if you don&apos;t see it in 2 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white border-b border-white/[0.06] pb-4 mb-4">Request Sandbox Staging Token</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#94A3B8]">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#94A3B8]">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#94A3B8]">Agent Seats</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-[#94A3B8] transition-all"
                    >
                      <option value="10-50" className="bg-[#0f172a] text-white">10 - 50 Seats</option>
                      <option value="50-200" className="bg-[#0f172a] text-white">50 - 200 Seats</option>
                      <option value="200-1000" className="bg-[#0f172a] text-white">200 - 1000 Seats</option>
                      <option value="1000+" className="bg-[#0f172a] text-white">1000+ Seats (Enterprise)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#94A3B8]">Primary Module</label>
                    <select
                      value={formData.useCase}
                      onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-[#94A3B8] transition-all"
                    >
                      <option value="AI Dialer" className="bg-[#0f172a] text-white">Predictive AI Dialer</option>
                      <option value="Voice Agents" className="bg-[#0f172a] text-white">Autonomous Voice AI</option>
                      <option value="Multi-Tenant SaaS" className="bg-[#0f172a] text-white">Multi-Tenant Tenant Panel</option>
                      <option value="Omnichannel CRM" className="bg-[#0f172a] text-white">Omnichannel Digital CRM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-xs font-semibold flex items-center justify-center gap-2 group">
                  Submit Sandbox Request
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
