"use client";

import { useState, useEffect } from "react";
import { HeartPulse, AlertTriangle, CheckCircle, ShieldAlert, Users, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type WorkspaceOwner = {
  name: string | null;
  email: string | null;
  phone?: string | null;
};

type Workspace = {
  id: string;
  name: string;
  plan: string;
  healthScore: number;
  lastLoginAt: string | null;
  users: WorkspaceOwner[];
  _count: {
    users: number;
    leads: number;
  };
};

export default function CustomerSuccessPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch("/api/admin/workspaces");
      if (res.ok) setWorkspaces(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const healthy = workspaces.filter(w => w.healthScore >= 80);
  const atRisk = workspaces.filter(w => w.healthScore < 80 && w.healthScore >= 50);
  const critical = workspaces.filter(w => w.healthScore < 50);

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <HeartPulse className="w-6 h-6 text-rose-500" />
          Customer Success & Health Engine
        </h1>
        <p className="text-slate-400 text-sm mt-1">Identify churn risks before they happen by tracking workspace adoption and activity.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><CheckCircle className="w-16 h-16 text-emerald-400" /></div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Healthy Workspaces</p>
          <div className="text-3xl font-bold text-white">{healthy.length}</div>
          <p className="text-emerald-400 text-xs mt-2 font-medium">Score 80-100</p>
        </div>
        
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><AlertTriangle className="w-16 h-16 text-yellow-400" /></div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">At-Risk Workspaces</p>
          <div className="text-3xl font-bold text-white">{atRisk.length}</div>
          <p className="text-yellow-400 text-xs mt-2 font-medium">Score 50-79</p>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><ShieldAlert className="w-16 h-16 text-red-400" /></div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Critical Churn Risk</p>
          <div className="text-3xl font-bold text-white">{critical.length}</div>
          <p className="text-red-400 text-xs mt-2 font-medium">Score &lt; 50</p>
        </div>
      </div>

      {/* Actionable Table for At-Risk and Critical */}
      <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-white font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Attention Required
          </h2>
          <p className="text-xs text-slate-400 mt-1">Workspaces that require immediate outreach based on low activity.</p>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 uppercase font-semibold text-xs bg-white/[0.02]">
              <th className="p-4 pl-6">Workspace</th>
              <th className="p-4 text-center">Health Score</th>
              <th className="p-4">Key Risk Factors</th>
              <th className="p-4">Last Activity</th>
              <th className="p-4 text-right pr-6">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Scanning workspace health...</td></tr>
            ) : [...critical, ...atRisk].length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-emerald-400 flex justify-center items-center gap-2"><CheckCircle className="w-4 h-4" /> All workspaces are perfectly healthy!</td></tr>
            ) : (
              [...critical, ...atRisk].map(w => {
                const owner = w.users?.[0];
                const daysSinceLogin = w.lastLoginAt ? (Date.now() - new Date(w.lastLoginAt).getTime()) / (1000 * 60 * 60 * 24) : 999;
                
                return (
                  <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-white text-sm mb-1">{w.name}</div>
                      <div className="flex gap-2 text-xs text-slate-400">
                        <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{w.plan}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold border ${getHealthColor(w.healthScore)}`}>
                        {w.healthScore}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {daysSinceLogin > 14 && <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-1 rounded w-max border border-red-400/20">No login in {Math.floor(daysSinceLogin)} days</span>}
                        {w._count.leads === 0 && <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded w-max border border-yellow-400/20">0 Leads uploaded</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {w.lastLoginAt ? formatDistanceToNow(new Date(w.lastLoginAt), { addSuffix: true }) : "Never"}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      {owner?.email && (
                        <a href={`mailto:${owner.email}?subject=Checking in on your NexDial Workspace`} className="inline-block p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors" title="Send Check-in Email">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {owner?.phone && (
                        <a href={`https://wa.me/${owner.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="inline-block p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors" title="WhatsApp Client">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
