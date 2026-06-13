"use client";

import { useState, useEffect } from "react";
import { Activity, Search, ShieldAlert, UserPlus, Trash, Server, LogIn, CreditCard } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type AuditLog = {
  id: string;
  action: string;
  adminId: string | null;
  workspaceId: string | null;
  details: any;
  createdAt: string;
  workspace?: {
    name: string;
  };
};

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) setLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const getActionIcon = (action: string) => {
    if (action.includes("LOGIN")) return <LogIn className="w-4 h-4 text-emerald-400" />;
    if (action.includes("USER")) return <UserPlus className="w-4 h-4 text-[#00C2FF]" />;
    if (action.includes("WORKSPACE_CREATED")) return <Server className="w-4 h-4 text-purple-400" />;
    if (action.includes("DELETED") || action.includes("SUSPEND")) return <Trash className="w-4 h-4 text-red-400" />;
    if (action.includes("PAYMENT") || action.includes("PLAN")) return <CreditCard className="w-4 h-4 text-yellow-500" />;
    return <Activity className="w-4 h-4 text-slate-400" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes("LOGIN")) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (action.includes("USER")) return "text-[#00C2FF] bg-[#00C2FF]/10 border-[#00C2FF]/20";
    if (action.includes("WORKSPACE_CREATED")) return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    if (action.includes("DELETED") || action.includes("SUSPEND")) return "text-red-400 bg-red-400/10 border-red-400/20";
    if (action.includes("PAYMENT") || action.includes("PLAN")) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    return "text-slate-400 bg-white/5 border-white/10";
  };

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.workspace?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-orange-500" />
            System Logs
          </h1>
          <p className="text-slate-400 text-sm mt-1">Platform-wide audit trail for compliance, troubleshooting, and tracking critical actions.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by action or workspace..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#020610] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 uppercase font-semibold text-xs bg-white/[0.02]">
              <th className="p-4 pl-6">Action</th>
              <th className="p-4">Workspace</th>
              <th className="p-4">Details</th>
              <th className="p-4 text-right pr-6">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading audit logs...</td></tr>
            ) : filteredLogs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No logs found matching your criteria.</td></tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)}
                      </div>
                      <span className="font-bold text-white text-xs">{log.action.replace(/_/g, " ")}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">{log.workspace?.name || <span className="text-slate-500 italic">System / Unknown</span>}</span>
                  </td>
                  <td className="p-4">
                    <pre className="text-[10px] text-slate-400 font-mono bg-white/5 p-2 rounded border border-white/10 max-w-sm truncate">
                      {JSON.stringify(log.details) || "No extra details"}
                    </pre>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <span className="text-xs text-slate-500 block">
                      {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
