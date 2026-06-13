"use client";

import { useState, useEffect } from "react";
import { 
  IndianRupee, 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Users
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { formatDistanceToNow } from "date-fns";

type BillingData = {
  mrr: number;
  arr: number;
  activeSubscriptionsCount: number;
  failedPayments: number;
  trialConversionRate: string;
  revenueChartData: { name: string; revenue: number }[];
  recentTransactions: any[];
};

export default function AdminBillingPage() {
  const [data, setData] = useState<BillingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/billing");
      if (res.ok) setData(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#00C2FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <IndianRupee className="w-6 h-6 text-emerald-400" />
            Billing & Revenue
          </h1>
          <p className="text-slate-400 text-sm mt-1">Platform-wide financial telemetry, subscriptions, and MRR growth.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchBillingData}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg text-sm font-medium transition-colors">
            <ExternalLink className="w-4 h-4" /> Gateway Dashboard
          </button>
        </div>
      </div>

      {/* Top Level Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* MRR */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">MRR</p>
              <h3 className="text-3xl font-black text-white mt-1">₹{data.mrr.toLocaleString("en-IN")}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ARR */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2FF]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#00C2FF]/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">ARR</p>
              <h3 className="text-3xl font-black text-white mt-1">₹{data.arr.toLocaleString("en-IN")}</h3>
            </div>
            <div className="p-3 bg-[#00C2FF]/10 rounded-lg border border-[#00C2FF]/20 text-[#00C2FF]">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Active Subs</p>
              <h3 className="text-3xl font-black text-white mt-1">{data.activeSubscriptionsCount}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Trial Conversion / Failed Payments */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-orange-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Trial Conv.</p>
              <h3 className="text-3xl font-black text-white mt-1">{data.trialConversionRate}%</h3>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-medium">
            {data.failedPayments > 0 ? (
              <span className="text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {data.failedPayments} Failed Payments
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> 0 Failed Payments
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Revenue Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#10B981' }}
                  formatter={(value: number) => [`₹${value}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#020610] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Transactions</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {data.recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
                <CreditCard className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No transactions found</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.recentTransactions.map(tx => (
                  <div key={tx.id} className="p-4 px-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <h4 className="text-sm font-bold text-white">{tx.workspace?.name || 'Unknown Workspace'}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {tx.paymentMethod || 'Credit Card'} • {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-white">₹{tx.amount}</span>
                      <div>
                        {tx.status === 'SUCCESS' ? (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">SUCCESS</span>
                        ) : (
                          <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">FAILED</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
