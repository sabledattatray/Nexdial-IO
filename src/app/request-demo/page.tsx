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
    teamSize: "5-20",
    useCase: "Lightweight CRM",
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
                Experience the Power of <span className="gradient-text">NexDial CRM</span>
              </h1>
              <p className="text-[#94A3B8] text-base leading-relaxed mt-4">
                Deploy a sandbox instance of NexDial in seconds. Test our unified lead inbox, WhatsApp follow-up templates, pipelines, and AI recommendation priority engines with pre-loaded mock data.
              </p>
            </AnimatedSection>

            {/* Bullet points */}
            <div className="space-y-4">
              {[
                "Explore the visual Kanban drag-and-drop pipelines",
                "Trigger personalized WhatsApp message follow-ups in 1-click",
                "See the AI Priority Engine recommend 'Next Best Actions'",
                "Test CSV lead importing with automated duplicate warning flags"
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
                    <label className="text-xs font-semibold text-[#94A3B8]">Team Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-[#94A3B8] transition-all"
                    >
                      <option value="1-5" className="bg-[#0f172a] text-white">1 - 5 Users</option>
                      <option value="5-20" className="bg-[#0f172a] text-white">5 - 20 Users</option>
                      <option value="20-100" className="bg-[#0f172a] text-white">20 - 100 Users</option>
                      <option value="100+" className="bg-[#0f172a] text-white">100+ Users</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#94A3B8]">Primary Interest</label>
                    <select
                      value={formData.useCase}
                      onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-[#94A3B8] transition-all"
                    >
                      <option value="Lightweight CRM" className="bg-[#0f172a] text-white">Lightweight CRM Suite</option>
                      <option value="WhatsApp Outreach" className="bg-[#0f172a] text-white">WhatsApp Unified Inbox</option>
                      <option value="AI Priority Engine" className="bg-[#0f172a] text-white">AI Priority Recommendations</option>
                      <option value="Analytics" className="bg-[#0f172a] text-white">Sales Pipeline Analytics</option>
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
