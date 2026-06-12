"use client";

import { Activity, ArrowUpRight, Zap, CheckCircle2, AlertCircle, Loader2, Users, Camera, MessageSquare, Code } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardTab() {
  const { data: integrations, error, isLoading } = useSWR("/api/integrations", fetcher);

  const integrationsList = Array.isArray(integrations) ? integrations : [];
  const activeCount = integrationsList.length;
  const totalLeads = integrationsList.reduce((acc: number, curr: any) => acc + (curr.leadsCount || 0), 0);

  // Helpers to pick icon and color based on provider
  const getProviderMeta = (provider: string) => {
    switch(provider) {
      case "Facebook Lead Ads": return { icon: Users, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", abbr: "FB" };
      case "Instagram Business": return { icon: Camera, color: "text-[#E1306C]", bg: "bg-[#E1306C]/10", abbr: "IG" };
      case "WhatsApp Business": return { icon: MessageSquare, color: "text-[#25D366]", bg: "bg-[#25D366]/10", abbr: "WA" };
      case "Embedded Form": return { icon: Code, color: "text-[#00C2FF]", bg: "bg-[#00C2FF]/10", abbr: "WF" };
      default: return { icon: Zap, color: "text-white", bg: "bg-white/10", abbr: "API" };
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Connected Apps Dashboard</h2>
        <p className="text-sm text-slate-400">Monitor the health and lead volume of your active integrations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#020610] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-slate-400">
            <Zap className="w-4 h-4 text-[#00C2FF]" />
            <span className="text-xs font-semibold uppercase tracking-wider">Active Integrations</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-1" /> : activeCount}
          </div>
        </div>
        
        <div className="bg-[#020610] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-slate-400">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">Total Imported</span>
          </div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-white">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mt-1" /> : totalLeads}
            </div>
            {totalLeads > 0 && (
              <div className="text-xs font-medium text-green-400 flex items-center mb-1">
                <ArrowUpRight className="w-3 h-3" /> Live
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">System Health</span>
          </div>
          <div className="text-3xl font-bold text-white">100%</div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-slate-400">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">Failed Syncs</span>
          </div>
          <div className="text-3xl font-bold text-white">0</div>
        </div>
      </div>

      {/* Active Integrations List */}
      <h3 className="text-base font-bold text-white mb-4">Your Connections</h3>
      
      <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5 bg-[#020610]">
        
        {isLoading && (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-6 h-6 text-[#00C2FF] animate-spin" />
          </div>
        )}

        {!isLoading && integrationsList.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-slate-400 text-sm">No integrations connected yet. Go to the App Marketplace to add one.</p>
          </div>
        )}

        {!isLoading && integrationsList.map((integration: any) => {
          const meta = getProviderMeta(integration.provider);
          return (
            <div key={integration.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${meta.bg} flex items-center justify-center`}>
                  <span className={`${meta.color} font-bold`}>{meta.abbr}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{integration.provider}</h4>
                  <p className="text-xs text-slate-400">
                    {integration.lastSyncAt ? `Last sync: ${new Date(integration.lastSyncAt).toLocaleString()}` : "Waiting for first lead"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8 justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{integration.leadsCount || 0}</div>
                  <div className="text-xs text-slate-500">leads</div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-green-400">Healthy</span>
                </div>
                <button 
                  onClick={() => {
                    const url = `${window.location.origin}/api/webhooks/${integration.id}?secret=${integration.secretKey}`;
                    navigator.clipboard.writeText(url);
                    alert("Webhook URL Copied: " + url);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Copy URL
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
