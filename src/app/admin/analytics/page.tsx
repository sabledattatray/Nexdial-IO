"use client";

import { useState, useEffect } from "react";
import { Terminal, Users, Database, Globe, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

type AnalyticsData = {
  metrics: {
    totalWorkspaces: number;
    totalUsers: number;
    totalLeads: number;
  };
  charts: {
    plans: { name: string; value: number }[];
    integrations: { name: string; value: number }[];
    growth: { name: string; Workspaces: number }[];
  };
};

const PLAN_COLORS = ["#00C2FF", "#25D366", "#A855F7", "#F59E0B"];
const INTEGRATION_COLORS = ["#10B981", "#3B82F6", "#EF4444", "#8B5CF6"];

export default function SaaSAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        setData(await res.json());
      }
    } catch (e) {
      console.error("Failed to load analytics", e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading SaaS Analytics...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-400">Failed to load analytics data.</div>;
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Terminal className="w-6 h-6 text-purple-500" />
          SaaS Analytics & Forecasting
        </h1>
        <p className="text-slate-400 text-sm mt-1">Platform-wide metrics, feature adoption, and growth trajectories.</p>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe className="w-16 h-16 text-purple-400" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Workspaces</p>
          <div className="text-3xl font-bold text-white flex items-end gap-3">
            {data.metrics.totalWorkspaces}
          </div>
        </div>
        
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-emerald-400" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Active Users</p>
          <div className="text-3xl font-bold text-white flex items-end gap-3">
            {data.metrics.totalUsers}
          </div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Database className="w-16 h-16 text-[#00C2FF]" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Leads Managed</p>
          <div className="text-3xl font-bold text-white flex items-end gap-3">
            {data.metrics.totalLeads.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Workspace Growth Area Chart */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl lg:col-span-2">
          <h2 className="text-white font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            Workspace Acquisition (Last 6 Months)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.charts.growth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="Workspaces" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl">
          <h2 className="text-white font-bold mb-6">Plan Distribution</h2>
          <div className="h-[250px] w-full flex justify-center items-center">
            {data.charts.plans.length === 0 ? (
              <span className="text-slate-500 italic">No plan data available.</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.charts.plans}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.charts.plans.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PLAN_COLORS[index % PLAN_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Feature Adoption (Integrations) */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl">
          <h2 className="text-white font-bold mb-6">Feature Adoption (Integrations)</h2>
          <div className="h-[250px] w-full flex justify-center items-center">
            {data.charts.integrations.length === 0 ? (
              <span className="text-slate-500 italic">No integrations connected yet.</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.charts.integrations}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.charts.integrations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INTEGRATION_COLORS[index % INTEGRATION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
