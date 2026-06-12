import { Activity, Search, Filter } from "lucide-react";

export default function SyncLogsTab() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Sync Logs</h2>
          <p className="text-sm text-slate-400">Live feed of all incoming leads and system events.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00C2FF] transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 grid grid-cols-5 text-sm font-semibold text-slate-300">
          <div>Time</div>
          <div>Event Type</div>
          <div>Integration</div>
          <div>Lead Detail</div>
          <div>Status</div>
        </div>
        
        <div className="divide-y divide-white/5">
          {/* Mock Log 1 */}
          <div className="px-6 py-4 grid grid-cols-5 text-sm items-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400">Just now</div>
            <div className="text-white">Lead Created</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span>
              <span className="text-slate-300">Facebook Ads</span>
            </div>
            <div className="text-slate-300">John Doe (+1 234...)</div>
            <div><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium border border-green-500/20">Success</span></div>
          </div>

          {/* Mock Log 2 */}
          <div className="px-6 py-4 grid grid-cols-5 text-sm items-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400">5 min ago</div>
            <div className="text-white">Webhook Received</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF]"></span>
              <span className="text-slate-300">Website Form</span>
            </div>
            <div className="text-slate-300">Jane Smith (jane@...)</div>
            <div><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium border border-green-500/20">Success</span></div>
          </div>

          {/* Mock Log 3 */}
          <div className="px-6 py-4 grid grid-cols-5 text-sm items-center hover:bg-white/[0.02] transition-colors">
            <div className="text-slate-400">1 hour ago</div>
            <div className="text-white">Lead Parsing</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span className="text-slate-300">Custom API</span>
            </div>
            <div className="text-slate-300">Missing Phone Field</div>
            <div><span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs font-medium border border-red-500/20">Failed</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
