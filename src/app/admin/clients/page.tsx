"use client";

import { useState, useEffect } from "react";
import { Users, LogIn, Pause, Search, User, Mail, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type WorkspaceOwner = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

type Workspace = {
  id: string;
  name: string;
  plan: string;
  status: string;
  healthScore: number;
  lastLoginAt: string | null;
  createdAt: string;
  users: WorkspaceOwner[]; // Fetched from our API update
  _count: {
    users: number;
    leads: number;
  };
};

export default function AdminClientsPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await fetch("/api/admin/workspaces");
      if (res.ok) setWorkspaces(await res.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleImpersonate = async (id: string) => {
    if (!confirm("You are about to switch your active session to this client's workspace. Continue?")) return;
    
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: id })
      });
      if (res.ok) {
        window.location.href = "/crm";
      } else {
        alert("Failed to initiate impersonation.");
      }
    } catch (e) {
      console.error(e);
      alert("Error initiating impersonation.");
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  const filteredWorkspaces = workspaces.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) || 
    w.users.some(u => u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-[#00C2FF]" />
            Client Workspaces
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage onboarded clients, monitor health scores, and troubleshoot via impersonation.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by client or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#020610] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#00C2FF] transition-colors w-64"
            />
          </div>
          <button className="bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> New Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 uppercase font-semibold text-xs bg-white/[0.02]">
                <th className="p-4 pl-6">Workspace & Owner</th>
                <th className="p-4">Plan & Status</th>
                <th className="p-4">Usage (Users / Leads)</th>
                <th className="p-4 text-center">Health</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading workspaces...</td></tr>
              ) : filteredWorkspaces.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No workspaces found.</td></tr>
              ) : (
                filteredWorkspaces.map((w) => {
                  const owner = w.users?.[0]; // Assume first ADMIN is the primary owner
                  
                  return (
                    <tr key={w.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-white text-base mb-1">{w.name}</div>
                        {owner ? (
                          <div className="flex items-center gap-2 text-slate-400 mt-2">
                            {owner.image ? (
                              <img src={owner.image} alt="" className="w-6 h-6 rounded-full" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="w-3 h-3 text-slate-400" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-slate-300">{owner.name || "Unnamed"}</span>
                              <span className="text-[10px] text-slate-500">{owner.email}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-red-400/80 italic">No admin assigned</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2 items-start">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/20">
                            {w.plan}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${w.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                            {w.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-3 w-48">
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-slate-400">Users</span>
                              <span className="font-mono text-white">{w._count.users}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-[#00C2FF] rounded-full" style={{ width: `${Math.min(100, (w._count.users / 10) * 100)}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="text-slate-400">Leads</span>
                              <span className="font-mono text-white">{w._count.leads}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(100, (w._count.leads / 500) * 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold border ${getHealthColor(w.healthScore)}`}>
                          {w.healthScore}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        {owner?.email && (
                          <a href={`mailto:${owner.email}`} className="inline-block p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 transition-colors" title="Email Client">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => handleImpersonate(w.id)} className="p-2 rounded-lg bg-white/5 hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] text-slate-400 transition-colors" title="Login As Client">
                          <LogIn className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors" title="Suspend Workspace">
                          <Pause className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
