import { Activity, ArrowUpRight, Zap, CheckCircle2, AlertCircle } from "lucide-react";

export default function DashboardTab() {
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
          <div className="text-3xl font-bold text-white">4</div>
        </div>
        
        <div className="bg-[#020610] border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2 text-slate-400">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider">Leads Today</span>
          </div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-white">128</div>
            <div className="text-xs font-medium text-green-400 flex items-center mb-1">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </div>
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
      
      <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
        
        {/* WhatsApp */}
        <div className="bg-[#020610] p-6 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
              <span className="text-[#25D366] font-bold">WA</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">WhatsApp Webhook</h4>
              <p className="text-xs text-slate-400">Last sync: 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-sm font-bold text-white">45</div>
              <div className="text-xs text-slate-500">leads today</div>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-bold text-green-400">Healthy</span>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-colors">
              Settings
            </button>
          </div>
        </div>

        {/* Website Form */}
        <div className="bg-[#020610] p-6 flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#00C2FF]/10 flex items-center justify-center">
              <span className="text-[#00C2FF] font-bold">WF</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Website Main Form</h4>
              <p className="text-xs text-slate-400">Last sync: 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-sm font-bold text-white">12</div>
              <div className="text-xs text-slate-500">leads today</div>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs font-bold text-green-400">Healthy</span>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-colors">
              Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
