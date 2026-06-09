"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Users, Phone, Plus, Trash2, ArrowRight, Kanban, CheckCircle, Clock } from "lucide-react";

const initialLeads = [
  { id: "lead-1", name: "David Miller", company: "Zeta Inc.", status: "Incoming", value: "$4,500", phone: "+1 555-0199" },
  { id: "lead-2", name: "Sarah Connor", company: "Cyberdyne", status: "Contacted", value: "$12,000", phone: "+1 555-0182" },
  { id: "lead-3", name: "Thomas Anderson", company: "Meta Cortex", status: "Proposal", value: "$8,500", phone: "+1 555-0133" },
  { id: "lead-4", name: "Ellen Ripley", company: "Weyland-Yutani", status: "Closed", value: "$25,000", phone: "+1 555-0104" }
];

const pipelines = ["Incoming", "Contacted", "Proposal", "Closed"];

export default function CRMDashboard() {
  const [leads, setLeads] = useState(initialLeads);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Incoming");

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !value) return;
    const newL = {
      id: `lead-${Date.now()}`,
      name,
      company,
      value: `$${parseInt(value).toLocaleString()}`,
      status,
      phone: "+1 555-0100"
    };
    setLeads([...leads, newL]);
    setName("");
    setCompany("");
    setValue("");
  };

  const deleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const moveStatus = (id: string, dir: "next" | "prev") => {
    setLeads(leads.map(l => {
      if (l.id !== id) return l;
      const curIdx = pipelines.indexOf(l.status);
      let nextIdx = curIdx + (dir === "next" ? 1 : -1);
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= pipelines.length) nextIdx = pipelines.length - 1;
      return { ...l, status: pipelines[nextIdx] };
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <Kanban className="w-5 h-5 text-[#00E5A0]" />
              <span className="text-xs font-semibold text-[#00E5A0] uppercase tracking-widest">Client CRM Module</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Pipeline Kanban Board</h1>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[3fr,1fr] gap-8 items-start">
          
          {/* Kanban Columns */}
          <div className="grid sm:grid-cols-4 gap-4">
            {pipelines.map((col) => {
              const colLeads = leads.filter(l => l.status === col);
              return (
                <div key={col} className="bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[#94A3B8] font-bold">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colLeads.map((lead) => (
                      <div key={lead.id} className="glass-card p-4 space-y-3 relative group">
                        <div>
                          <h4 className="text-xs font-bold text-white leading-none">{lead.name}</h4>
                          <p className="text-[10px] text-[#64748B] mt-1">{lead.company}</p>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-[#00E5A0]">{lead.value}</span>
                          <span className="text-[#64748B]">{lead.phone}</span>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/[0.04] pt-2">
                          <button
                            onClick={() => moveStatus(lead.id, "prev")}
                            className="text-[9px] text-[#64748B] hover:text-white"
                          >
                            ◀ Prev
                          </button>
                          
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 rounded hover:bg-white/5 text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => moveStatus(lead.id, "next")}
                            className="text-[9px] text-[#00C2FF] hover:underline"
                          >
                            Next ▶
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Lead Panel */}
          <AnimatedSection delay={0.1} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-6 border-b border-white/[0.06] pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00C2FF]" />
              Quick Capture Lead
            </h3>

            <form onSubmit={addLead} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Lead Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Deals Value (USD)</label>
                <input
                  type="number"
                  required
                  placeholder="5000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Status Stage</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-[#94A3B8] transition-all"
                >
                  {pipelines.map(p => (
                    <option key={p} value={p} className="bg-[#0f172a] text-white">{p}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Add to Pipeline
              </button>
            </form>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
