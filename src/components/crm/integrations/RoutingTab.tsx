import { Route, Plus, ArrowRight, Play } from "lucide-react";

export default function RoutingTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Lead Routing Rules</h2>
          <p className="text-sm text-slate-400">Build IF/THEN logic to automatically assign leads and change statuses.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-black font-semibold rounded-lg transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      <div className="space-y-4">
        {/* Mock Rule 1 */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">High Value FB Leads</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Priority 1</span>
              <div className="w-10 h-5 bg-[#00C2FF]/20 rounded-full flex items-center p-0.5 cursor-pointer border border-[#00C2FF]/30">
                <div className="w-4 h-4 bg-[#00C2FF] rounded-full translate-x-5"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1">
              <span className="text-slate-400 font-semibold mr-2">IF</span>
              <span className="text-white">Source</span> <span className="text-slate-400 mx-1">equals</span> <span className="text-[#00C2FF] font-mono">Facebook Ads</span>
              <span className="text-slate-400 font-semibold mx-3">AND</span>
              <span className="text-white">Budget</span> <span className="text-slate-400 mx-1">&gt;</span> <span className="text-[#00E5A0] font-mono">$500</span>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90 md:rotate-0" />
            </div>

            <div className="bg-white/5 border border-[#00C2FF]/20 rounded-lg p-3 flex-1">
              <span className="text-[#00C2FF] font-semibold mr-2">THEN</span>
              <span className="text-white">Assign to</span> <span className="text-[#00C2FF] font-mono">Sarah Jenkins</span>
              <span className="text-slate-400 font-semibold mx-3">AND</span>
              <span className="text-white">Add Tag</span> <span className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded ml-1 text-xs">High Intent</span>
            </div>
          </div>
        </div>

        {/* Mock Rule 2 */}
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 opacity-60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Default Website Routing</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Priority 2</span>
              <div className="w-10 h-5 bg-white/10 rounded-full flex items-center p-0.5 cursor-pointer border border-white/5">
                <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1">
              <span className="text-slate-400 font-semibold mr-2">IF</span>
              <span className="text-white">Source</span> <span className="text-slate-400 mx-1">equals</span> <span className="text-[#00C2FF] font-mono">Website Form</span>
            </div>
            
            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90 md:rotate-0" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1">
              <span className="text-slate-300 font-semibold mr-2">THEN</span>
              <span className="text-white">Assign to</span> <span className="text-slate-300 font-mono">Round Robin (Sales Team)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
