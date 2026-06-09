"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { LayoutDashboard, PhoneCall, FileText, Ticket, ArrowUpRight, Plus, HelpCircle, CheckCircle } from "lucide-react";

const initialTickets = [
  { id: "tick-1", subject: "Stripe billing webhook error", priority: "High", status: "Open" },
  { id: "tick-2", subject: "Increase outbound dialing limit to 50 calls/sec", priority: "Medium", status: "Resolved" }
];

export default function ClientPortal() {
  const [tickets, setTickets] = useState(initialTickets);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [ticketLogged, setTicketLogged] = useState(false);

  const logTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) return;
    const newT = {
      id: `tick-${Date.now()}`,
      subject,
      priority,
      status: "Open"
    };
    setTickets([newT, ...tickets]);
    setSubject("");
    setTicketLogged(true);
    setTimeout(() => {
      setTicketLogged(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">Self-Service Client Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Campaign Performance & Support</h1>
          </div>
        </AnimatedSection>

        {/* Global Campaign Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.05}>
          {[
            { label: "Active Campaigns", value: "3 Campaigns", icon: PhoneCall, color: "#0057D9" },
            { label: "Calls Answered (24h)", value: "12,482 Calls", icon: PhoneCall, color: "#00C2FF" },
            { label: "Service Level Agreement", value: "99.98% SLA", icon: LayoutDashboard, color: "#00E5A0" },
            { label: "Support Tickets logged", value: `${tickets.length} Tickets`, icon: Ticket, color: "#8B5CF6" }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="glass-card-strong p-6 group hover:border-white/[0.1] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold text-[#64748B]">{stat.label}</span>
                    <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {stat.value}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Support Tickets & Log Form */}
        <div className="grid lg:grid-cols-[2fr,1.1fr] gap-12 items-start">
          
          {/* Ticket List */}
          <AnimatedSection className="glass-card-strong p-8">
            <h3 className="text-lg font-bold text-white mb-6">Your Support Tickets</h3>
            
            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">{t.subject}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        t.priority === "High" ? "bg-[#EF4444]/15 text-[#EF4444]" : "bg-[#64748B]/15 text-[#94A3B8]"
                      }`}>
                        {t.priority} Priority
                      </span>
                      <span className="text-[9px] text-[#64748B]">Ticket ID: {t.id}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    t.status === "Open" ? "bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20" : "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Log Ticket Form */}
          <AnimatedSection delay={0.1} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-6 border-b border-white/[0.06] pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00C2FF]" />
              Log New Support Ticket
            </h3>

            {ticketLogged ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle className="w-8 h-8 text-[#00E5A0] mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Ticket Logged Successfully</h4>
                <p className="text-[10px] text-[#94A3B8]">A customer support specialist will review your request shortly.</p>
              </div>
            ) : (
              <form onSubmit={logTicket} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#64748B]">Subject / Issue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Upgrade SIP Trunk capacity"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#64748B]">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-[#94A3B8] transition-all"
                  >
                    <option value="High" className="bg-[#0f172a] text-white">High Priority</option>
                    <option value="Medium" className="bg-[#0f172a] text-white">Medium Priority</option>
                    <option value="Low" className="bg-[#0f172a] text-white">Low Priority</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5" />
                  Submit Support Ticket
                </button>
              </form>
            )}
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
