"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Shield, Users, Server, DollarSign, Activity, Settings, Plus, Play, Pause, Trash2, Key, Database } from "lucide-react";

// Mock Tenant Data
const initialTenants = [
  { id: "t-1", name: "Apex Financial", subdomain: "apex.dbsmintek.com", agents: 240, status: "Active", billing: "$8,400/mo" },
  { id: "t-2", name: "Zeta E-Commerce", subdomain: "zeta.dbsmintek.com", agents: 550, status: "Active", billing: "$16,500/mo" },
  { id: "t-3", name: "Global Medtech", subdomain: "medtech.dbsmintek.com", agents: 120, status: "Paused", billing: "$4,200/mo" }
];

export default function AdminDashboard() {
  const [tenants, setTenants] = useState(initialTenants);
  const [newTenantName, setNewTenantName] = useState("");
  const [newSubdomain, setNewSubdomain] = useState("");

  const toggleStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === "Active" ? "Paused" : "Active" } : t));
  };

  const deleteTenant = (id: string) => {
    setTenants(tenants.filter(t => t.id !== id));
  };

  const addTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName || !newSubdomain) return;
    const newT = {
      id: `t-${Date.now()}`,
      name: newTenantName,
      subdomain: `${newSubdomain}.dbsmintek.com`,
      agents: 10,
      status: "Active",
      billing: "$450/mo"
    };
    setTenants([...tenants, newT]);
    setNewTenantName("");
    setNewSubdomain("");
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">Super Admin Console</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Platform Administration</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-semibold text-[#22C55E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              All Systems Operational
            </span>
          </div>
        </AnimatedSection>

        {/* Global System Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.05}>
          {[
            { label: "Global Active Tenants", value: tenants.length, icon: Database, color: "#0057D9" },
            { label: "Total Managed Seats", value: tenants.reduce((acc, t) => acc + t.agents, 0), icon: Users, color: "#00C2FF" },
            { label: "Active VoIP Channels", value: "1,842 / 2,000", icon: Server, color: "#00E5A0" },
            { label: "Monthly Recurring Revenue", value: `$${(tenants.reduce((acc, t) => acc + parseInt(t.billing.replace(/[^0-9]/g, "")), 0)).toLocaleString()}`, icon: DollarSign, color: "#8B5CF6" }
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

        {/* Main Grid: Tenant List & Create Tenant */}
        <div className="grid lg:grid-cols-[2fr,1.1fr] gap-12 items-start">
          
          {/* Tenant List Table */}
          <AnimatedSection className="glass-card-strong p-8">
            <h3 className="text-lg font-bold text-white mb-6">Tenant Organizations</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[#64748B] uppercase font-semibold">
                    <th className="pb-4">Organization</th>
                    <th className="pb-4">Subdomain</th>
                    <th className="pb-4 text-center">Seats</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Billing Rate</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-white">
                  {tenants.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.01]">
                      <td className="py-4 font-bold">{t.name}</td>
                      <td className="py-4 text-[#94A3B8] font-mono">{t.subdomain}</td>
                      <td className="py-4 text-center font-semibold">{t.agents}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          t.status === "Active" ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]" : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-[#00E5A0]">{t.billing}</td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => toggleStatus(t.id)}
                          className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-[#94A3B8] hover:text-white"
                          title="Toggle Status"
                        >
                          {t.status === "Active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#22C55E]" />}
                        </button>
                        <button
                          onClick={() => deleteTenant(t.id)}
                          className="p-1.5 rounded bg-white/[0.03] border border-[#EF4444]/20 hover:bg-[#EF4444]/10 text-[#EF4444]"
                          title="Decommission Tenant"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Create Tenant Form */}
          <AnimatedSection delay={0.1} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-6 border-b border-white/[0.06] pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00C2FF]" />
              Provision New Tenant
            </h3>

            <form onSubmit={addTenant} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="Acme Inc."
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#64748B]">Custom Subdomain</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="acme"
                    value={newSubdomain}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    className="w-full pl-4 pr-32 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569] transition-all"
                  />
                  <span className="absolute right-3 top-3 text-[10px] text-[#64748B] font-mono">.dbsmintek.com</span>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Initialize Sandbox Organization
              </button>
            </form>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
