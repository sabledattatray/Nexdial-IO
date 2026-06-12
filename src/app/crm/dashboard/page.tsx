"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  CalendarClock, 
  PhoneCall, 
  ArrowRight,
  TrendingUp,
  Activity,
  AlertCircle,
  HelpCircle,
  FileText,
  ShieldCheck,
  TrendingDown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => fetcher("/api/dashboard"),
    enabled: mounted,
  });

  const { data: followUpsData, isLoading: followUpsLoading } = useQuery({
    queryKey: ["followUps"],
    queryFn: () => fetcher("/api/follow-ups"),
    enabled: mounted,
  });

  const { data: newLeadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ["newLeads"],
    queryFn: () => fetcher("/api/leads?status=NEW&limit=10"),
    enabled: mounted,
  });

  if (!mounted) return null;

  if (statsLoading || followUpsLoading || leadsLoading) {
    return <div className="p-8 text-center text-slate-400">Loading Analytics Dashboard...</div>;
  }

  const statsObj = dashboardStats || { totalLeads: 0, newLeads: 0, converted: 0, lost: 0, overdueFollowUps: 0, statusCounts: {} };
  const dueToday = followUpsData?.map((f: any) => f.lead) || [];
  const newLeadsList = newLeadsData?.data || [];

  const statusCounts = statsObj.statusCounts || {};
  const pipelineStates = [
    { label: "New Leads", key: "NEW", color: "bg-blue-500", text: "text-blue-400" },
    { label: "Contacted", key: "CONTACTED", color: "bg-yellow-500", text: "text-yellow-400" },
    { label: "In Progress", key: "IN_PROGRESS", color: "bg-purple-500", text: "text-purple-400" },
    { label: "Interested", key: "INTERESTED", color: "bg-pink-500", text: "text-pink-400" },
    { label: "Converted", key: "CONVERTED", color: "bg-emerald-500", text: "text-emerald-400" },
    { label: "Lost", key: "LOST", color: "bg-red-500", text: "text-red-400" }
  ];

  const stats = [
    { name: 'Total Leads', value: statsObj.totalLeads, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'New Today', value: statsObj.newLeads, icon: UserPlus, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Converted', value: statsObj.converted, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Lost Leads', value: statsObj.lost || 0, icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-400/10' },
    { name: 'Pending Follow-ups', value: dueToday.length, icon: CalendarClock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { name: 'Overdue Follow-ups', value: statsObj.overdueFollowUps, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Revenue Action Layer (Critical Alert System) */}
      {statsObj.overdueFollowUps > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-red-500/5"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400 shrink-0">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Action Required: Overdue Follow-ups Detected</h3>
              <p className="text-slate-300 text-sm mt-0.5">
                You have <strong className="text-red-400 font-bold">{statsObj.overdueFollowUps} leads</strong> that are currently past their scheduled contact time. Follow up immediately to avoid losing them.
              </p>
            </div>
          </div>
          <Link 
            href="/crm/follow-ups" 
            className="self-start md:self-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-red-500/20"
          >
            Resolve Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      )}

      {/* Welcome & Target Summary */}
      <div className="bg-gradient-to-r from-[#0057D9]/20 to-[#00C2FF]/10 rounded-2xl p-6 border border-[#00C2FF]/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Nexdial Sales Insights</h2>
            <p className="text-[#94A3B8] max-w-xl">
              Monitor conversion metrics, lead velocity, and actionable contact requirements.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#0A1628]/80 border border-white/5 rounded-xl px-4 py-3 text-center min-w-[100px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Conversion</p>
              <p className="text-xl font-bold text-[#00E5A0] mt-1">
                {statsObj.totalLeads > 0 ? Math.round((statsObj.converted / statsObj.totalLeads) * 100) : 0}%
              </p>
            </div>
            <div className="bg-[#0A1628]/80 border border-white/5 rounded-xl px-4 py-3 text-center min-w-[100px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Win/Loss Ratio</p>
              <p className="text-xl font-bold text-white mt-1">
                {statsObj.lost > 0 ? (statsObj.converted / statsObj.lost).toFixed(1) : statsObj.converted}x
              </p>
            </div>
          </div>
        </div>
        <Activity className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 text-white/5 pointer-events-none" />
      </div>

      {/* Revenue Forecast Panel */}
      <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00E5A0]" />
              Self-Learning Revenue & Pipeline Forecasting
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Three-curve forecasting model calculated using dynamic conversion probabilities.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#00C2FF]/10 text-[#00C2FF] font-bold border border-[#00C2FF]/20">
            AI Learning Loop Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Conservative Forecast */}
          <div className="bg-[#050A15] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Conservative Forecast</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-yellow-400">${statsObj.forecast?.conservative?.toLocaleString() || "0"}</span>
              <span className="text-xs text-slate-500 font-medium">USD</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Stage probabilities: 5% NEW - 55% INTERESTED</p>
          </div>

          {/* Realistic Forecast */}
          <div className="bg-[#050A15] border border-[#00C2FF]/20 rounded-xl p-4 flex flex-col justify-between shadow-lg shadow-[#00C2FF]/5">
            <span className="text-xs text-[#00C2FF] font-semibold uppercase tracking-wider">Realistic Forecast (AI Standard)</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#00E5A0]">${statsObj.forecast?.realistic?.toLocaleString() || "0"}</span>
              <span className="text-xs text-slate-500 font-medium">USD</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Stage probabilities: 10% NEW - 75% INTERESTED</p>
          </div>

          {/* Aggressive Forecast */}
          <div className="bg-[#050A15] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Aggressive Forecast</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-[#00C2FF]">${statsObj.forecast?.aggressive?.toLocaleString() || "0"}</span>
              <span className="text-xs text-slate-500 font-medium">USD</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Stage probabilities: 20% NEW - 90% INTERESTED</p>
          </div>

          {/* AI Certainty Score */}
          <div className="bg-[#050A15] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI Certainty Score</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold text-emerald-400">{statsObj.forecast?.aiCertainty || 100}%</span>
              <span className="text-xs text-slate-500 font-medium">confidence</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              {statsObj.forecast?.aiCertainty >= 80 
                ? "Optimal lead cleanliness and active schedules."
                : statsObj.forecast?.aiCertainty >= 50 
                ? "Moderate quality. Clean up overdue schedules."
                : "Low certainty. Stale schedules and missing profiles."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Pipeline (Gross)</span>
            <p className="text-base font-bold text-white mt-0.5">${statsObj.forecast?.totalPipeline?.toLocaleString() || "0"}</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Closed Revenue (Won)</span>
            <p className="text-base font-bold text-emerald-400 mt-0.5">${statsObj.forecast?.closedRevenue?.toLocaleString() || "0"}</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Lost Opportunities</span>
            <p className="text-base font-bold text-red-400 mt-0.5">${statsObj.forecast?.lostOpportunity?.toLocaleString() || "0"}</p>
          </div>
        </div>
      </div>

      {/* Pipeline Intelligence Alerts Panel */}
      <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#00C2FF]" />
          Pipeline Leakage & Bottleneck Analysis
        </h3>
        
        {statsObj.anomalies && statsObj.anomalies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statsObj.anomalies.map((anomaly: any, idx: number) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border flex gap-3 ${
                  anomaly.type === 'critical' 
                    ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                }`}
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">{anomaly.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{anomaly.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs text-slate-200">
              <strong className="text-white">All systems optimal:</strong> No lead leakage, stage bottlenecks, or incomplete contact profiles detected. Sales execution is highly efficient.
            </p>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0A1628] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-slate-600" />
            </div>
            <p className="text-sm text-slate-400 font-medium">{stat.name}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.name.includes("Overdue") && stat.value > 0 ? "text-red-400" : "text-white"}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline Kanban Preview */}
      <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#00C2FF]" />
          Sales Pipeline Distribution Flow
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStates.map((state) => {
            const count = statusCounts[state.key] || 0;
            const percentage = statsObj.totalLeads > 0 ? Math.round((count / statsObj.totalLeads) * 100) : 0;
            
            return (
              <div key={state.key} className="bg-[#050A15] border border-white/5 rounded-xl p-3.5 flex flex-col justify-between hover:border-white/10 transition-colors">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{state.label}</span>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-2xl font-bold text-white">{count}</span>
                    <span className="text-xs text-slate-500">leads</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1">
                    <span>Share</span>
                    <span className={state.text}>{percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${state.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Action List */}
        <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-[#00C2FF]" />
              Today's Action List
            </h3>
            <Link href="/crm/follow-ups" className="text-sm text-[#00C2FF] hover:text-white transition-colors">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {dueToday.length > 0 ? (
              dueToday.slice(0, 4).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-lg bg-[#050A15] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                      {lead?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{lead.name || "Unknown"}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <PhoneCall className="w-3 h-3 text-slate-500" /> {lead.phone}
                      </p>
                    </div>
                  </div>
                  <Link 
                    href={`/crm/leads/${lead.id}`}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm">No follow-ups due today. Great job!</p>
              </div>
            )}
          </div>
        </div>

        {/* Leads to Call Today */}
        <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#0057D9]" />
              Leads to Call Today
            </h3>
            <Link href="/crm" className="text-sm text-[#00C2FF] hover:text-white transition-colors">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {newLeadsList.length > 0 ? (
              newLeadsList.slice(0, 4).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-lg bg-[#050A15] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                      {lead?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{lead.name || "Unknown"}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <PhoneCall className="w-3 h-3 text-slate-500" /> {lead.phone}
                      </p>
                    </div>
                  </div>
                  <Link 
                    href={`/crm/leads/${lead.id}`}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">No new leads require a call right now.</p>
              </div>
            )}
          </div>
        </div>

        {/* New Leads to Contact */}
        <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00E5A0]" />
              New Leads to Contact
            </h3>
            <Link href="/crm" className="text-sm text-[#00C2FF] hover:text-white transition-colors">
              Go to Inbox
            </Link>
          </div>

          <div className="space-y-3">
            {newLeadsList.length > 0 ? (
              newLeadsList.slice(0, 4).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-lg bg-[#050A15] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                      {lead?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{lead.name || "Unknown"}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-semibold">
                          {lead.source}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/crm/leads/${lead.id}`}
                    className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">Inbox Zero! No new leads pending contact.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
