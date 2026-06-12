import { Terminal, Key, Copy, CheckCircle2, RotateCw, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ApiCenterTab() {
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText("nd_live_abcd1234efgh5678ijkl9012mnop");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-[#00C2FF]/20 flex items-center justify-center border border-[#00C2FF]/30">
          <Terminal className="w-6 h-6 text-[#00C2FF]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Developer API</h2>
          <p className="text-sm text-slate-400">Manage your REST API keys to programmatically push leads into NexDial.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-[#00C2FF]" />
              Production API Key
            </h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded border border-green-500/20">Active</span>
          </div>
          
          <p className="text-sm text-slate-400 mb-4">Include this key in the <code className="bg-white/10 text-white px-1.5 py-0.5 rounded text-xs">Authorization: Bearer &lt;key&gt;</code> header of your requests.</p>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-black border border-white/10 rounded-lg p-3 font-mono text-sm text-[#00C2FF] overflow-x-auto blur-[4px] hover:blur-none transition-all duration-300">
              nd_live_abcd1234efgh5678ijkl9012mnop
            </div>
            <button 
              onClick={copyKey}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300 tooltip" title="Regenerate Key">
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Usage This Month</h4>
            <div className="text-2xl font-bold text-white mb-1">1,204 <span className="text-sm font-normal text-slate-500">/ 10,000</span></div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00C2FF] h-full w-[12%] rounded-full"></div>
            </div>
          </div>
          <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Rate Limits</h4>
            <div className="text-2xl font-bold text-white mb-1">600</div>
            <p className="text-sm text-slate-500">Requests per minute</p>
          </div>
          <div className="bg-[#020610] border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <h4 className="text-sm font-semibold text-white mb-2">Read the Docs</h4>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors w-full">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
