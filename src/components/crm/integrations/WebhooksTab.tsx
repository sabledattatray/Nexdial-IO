import { Webhook, Plus, Copy, CheckCircle2, Pause, Trash2, Activity } from "lucide-react";
import { useState } from "react";

export default function WebhooksTab() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Webhook Management</h2>
          <p className="text-sm text-slate-400">Generate unique endpoints to catch leads from Zapier, Make, or custom apps.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-black font-semibold rounded-lg transition-colors text-sm">
          <Plus className="w-4 h-4" />
          New Webhook
        </button>
      </div>

      <div className="space-y-6">
        {/* Webhook 1 */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Webhook className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Zapier Catch Hook</h3>
                <p className="text-xs text-slate-400">Created on Jun 12, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded border border-green-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Active
              </span>
              <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors tooltip" title="View Logs">
                <Activity className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors tooltip" title="Pause">
                <Pause className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors tooltip" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Endpoint URL</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-black border border-white/10 rounded-lg p-3 font-mono text-xs text-[#00C2FF] overflow-x-auto">
                  https://api.nexdial.io/v1/webhook/custom/wh_8f7d6a5s4d
                </div>
                <button 
                  onClick={() => copyToClipboard("https://api.nexdial.io/v1/webhook/custom/wh_8f7d6a5s4d", "wh1")}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
                >
                  {copied === "wh1" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
