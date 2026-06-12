"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Server, Users, Activity, ExternalLink, ArrowUpRight } from "lucide-react";

type Workspace = {
  id: string;
  name: string;
  plan: string;
  _count: { users: number; leads: number };
};

export default function AdminBillingPage() {
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

  const calculateMRR = () => {
    const rates: Record<string, number> = { TRIAL: 0, SMALL: 2500, MEDIUM: 5000, PRO: 7500, LARGE: 10000 };
    return workspaces.reduce((acc, ws) => acc + (rates[ws.plan] || 0), 0);
  };

  const mrr = calculateMRR();

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <IndianRupee className="w-6 h-6 text-emerald-400" />
            Billing & Revenue
          </h1>
          <p className="text-slate-400 text-sm mt-1">Platform-wide MRR, plan distribution, and payment gateway health.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" /> Razorpay Dashboard
          </button>
        </div>
      </div>

      {/* Revenue & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-emerald-500/20">
            <IndianRupee className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm uppercase font-bold text-emerald-500">Total MRR</span>
            </div>
            <p className="text-4xl font-black text-white mt-2">₹{mrr.toLocaleString("en-IN")}</p>
            <p className="text-sm text-emerald-400 font-bold mt-4 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +12% from last month
            </p>
          </div>
        </div>
        
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-slate-500">Active Workspaces</span>
            <Server className="w-4 h-4 text-[#00C2FF]" />
          </div>
          <p className="text-3xl font-bold text-white">{workspaces.length}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
              <strong className="text-white">{workspaces.filter(w => w.plan === 'TRIAL').length}</strong> Trial
            </span>
            <span className="text-[10px] px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <strong className="text-purple-300">{workspaces.filter(w => w.plan !== 'TRIAL').length}</strong> Paid
            </span>
          </div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-slate-500">Platform Scale</span>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">{workspaces.reduce((acc, w) => acc + w._count.users, 0)} Seats</p>
          <p className="text-xs text-slate-400 mt-4">{workspaces.reduce((acc, w) => acc + w._count.leads, 0).toLocaleString()} Leads Processed</p>
        </div>
      </div>
      
      {/* Plan Distribution */}
      <div className="bg-[#020610] border border-white/10 rounded-xl p-8 text-center text-slate-500">
        <h3 className="text-lg text-white font-bold mb-2">Subscription Analytics</h3>
        <p>Charts and historical MRR growth will appear here.</p>
      </div>

    </div>
  );
}
