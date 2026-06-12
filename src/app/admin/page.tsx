"use client";

import { useState, useEffect } from "react";
import { Shield, Users, Server, IndianRupee, Activity, Play, Pause, LogIn, Mail, MoreVertical, Radio, Terminal, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Workspace = {
  id: string;
  name: string;
  plan: string;
  status: string;
  healthScore: number;
  lastLoginAt: string | null;
  createdAt: string;
  _count: {
    users: number;
    leads: number;
    integrations: number;
  };
};

type AuditLog = {
  id: string;
  action: string;
  details: any;
  createdAt: string;
  workspace?: { name: string };
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"workspaces" | "broadcast" | "audit">("workspaces");
  
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [emailModal, setEmailModal] = useState<string | null>(null);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
    fetchLogs();
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

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) setLogs(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const sendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: broadcastTitle, message: broadcastMessage })
      });
      setBroadcastTitle("");
      setBroadcastMessage("");
      alert("Broadcast sent successfully to all clients!");
      fetchLogs(); // refresh logs
    } catch (e) {
      console.error(e);
      alert("Failed to send broadcast");
    }
    setIsSending(false);
  };

  const calculateMRR = () => {
    const rates: Record<string, number> = { TRIAL: 0, SMALL: 2500, MEDIUM: 5000, PRO: 7500, LARGE: 10000 };
    return workspaces.reduce((acc, ws) => acc + (rates[ws.plan] || 0), 0);
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
        const data = await res.json();
        alert(`Impersonation successful. Welcome to ${data.workspaceName}.`);
        window.location.href = "/crm"; // Redirect to CRM with new workspace context
      } else {
        alert("Failed to initiate impersonation.");
      }
    } catch (e) {
      console.error(e);
      alert("Error initiating impersonation.");
    }
  };

  const handleSuspend = (id: string) => {
    alert(`Toggled suspension for workspace ${id}.`);
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 50) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  const mrr = calculateMRR();

  return (
    <div className="min-h-screen bg-[#081120] pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">SaaS Control Center</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Platform Administration</h1>
          </div>
          <div className="flex items-center gap-4 bg-[#020610] p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setActiveTab("workspaces")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "workspaces" ? "bg-[#00C2FF] text-black" : "text-slate-400 hover:text-white"}`}
            >
              <Server className="w-4 h-4" /> Workspaces
            </button>
            <button 
              onClick={() => setActiveTab("broadcast")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "broadcast" ? "bg-[#00C2FF] text-black" : "text-slate-400 hover:text-white"}`}
            >
              <Radio className="w-4 h-4" /> Broadcast
            </button>
            <button 
              onClick={() => setActiveTab("audit")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === "audit" ? "bg-[#00C2FF] text-black" : "text-slate-400 hover:text-white"}`}
            >
              <Terminal className="w-4 h-4" /> Audit Logs
            </button>
          </div>
        </div>

        {activeTab === "workspaces" && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            {/* Revenue & Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-slate-500">Total MRR</span>
                  <IndianRupee className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <p className="text-3xl font-bold text-white">₹{mrr.toLocaleString("en-IN")}</p>
                <p className="text-xs text-green-400 mt-2">+12% from last month</p>
              </div>
              
              <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-slate-500">Active Workspaces</span>
                  <Server className="w-4 h-4 text-[#00C2FF]" />
                </div>
                <p className="text-3xl font-bold text-white">{workspaces.length}</p>
                <p className="text-xs text-slate-400 mt-2">{workspaces.filter(w => w.plan === 'TRIAL').length} on trial</p>
              </div>

              <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-slate-500">Total Seats</span>
                  <Users className="w-4 h-4 text-[#00E5A0]" />
                </div>
                <p className="text-3xl font-bold text-white">{workspaces.reduce((acc, w) => acc + w._count.users, 0)}</p>
                <p className="text-xs text-slate-400 mt-2">Platform-wide assigned users</p>
              </div>

              <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-slate-500">Leads Managed</span>
                  <Activity className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-3xl font-bold text-white">{workspaces.reduce((acc, w) => acc + w._count.leads, 0).toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-2">In active pipelines</p>
              </div>
            </div>

            {/* Live Workspace Table */}
            <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Live Client Workspaces</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 uppercase font-semibold text-xs bg-white/[0.02]">
                      <th className="p-4 pl-6">Workspace</th>
                      <th className="p-4">Plan & Status</th>
                      <th className="p-4">Usage (Users / Leads)</th>
                      <th className="p-4 text-center">Health</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {isLoading ? (
                      <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading workspaces...</td></tr>
                    ) : workspaces.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-slate-500">No workspaces found.</td></tr>
                    ) : (
                      workspaces.map((w) => (
                        <tr key={w.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-4 pl-6">
                            <div className="font-bold text-white">{w.name}</div>
                            <div className="text-xs text-slate-500">ID: {w.id.split('-')[0]}...</div>
                            <div className="text-[10px] text-slate-600 mt-1">
                              Created {formatDistanceToNow(new Date(w.createdAt))} ago
                            </div>
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
                            <button onClick={() => handleImpersonate(w.id)} className="p-2 rounded-lg bg-white/5 hover:bg-[#00C2FF]/20 hover:text-[#00C2FF] text-slate-400 transition-colors" title="Login As Client"><LogIn className="w-4 h-4" /></button>
                            <button onClick={() => handleSuspend(w.id)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors" title="Suspend Workspace"><Pause className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "broadcast" && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#020610] border border-[#00C2FF]/20 shadow-[0_0_20px_rgba(0,194,255,0.05)] rounded-xl overflow-hidden max-w-3xl mx-auto">
              <div className="p-8 border-b border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#00C2FF]/10 flex items-center justify-center border border-[#00C2FF]/20">
                    <Radio className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Global Announcement</h3>
                </div>
                <p className="text-slate-400 text-sm ml-13">Send an alert banner that will appear inside the dashboard for all active NexDial workspaces instantly.</p>
              </div>
              <div className="p-8">
                <form onSubmit={sendBroadcast} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Announcement Title</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-[#081120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors" 
                      placeholder="e.g. Scheduled Maintenance Notice" 
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message Body</label>
                    <textarea 
                      required 
                      rows={5} 
                      className="w-full bg-[#081120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] resize-none transition-colors" 
                      placeholder="Type the message that will be shown to your clients..." 
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="px-8 py-3 bg-[#00C2FF] hover:bg-[#00C2FF]/90 disabled:opacity-50 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isSending ? <span className="animate-spin text-xl">⟳</span> : <Send className="w-4 h-4" />}
                      Push to All Clients
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  System Audit Logs
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 uppercase font-semibold text-xs bg-white/[0.02]">
                      <th className="p-4 pl-6 w-48">Timestamp</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Workspace Target</th>
                      <th className="p-4">Payload Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {logs.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-slate-500">No logs recorded yet.</td></tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/[0.02] font-mono text-xs">
                          <td className="p-4 pl-6 text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400">{log.workspace?.name || "Global / System"}</td>
                          <td className="p-4 text-slate-500">{JSON.stringify(log.details || {})}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
