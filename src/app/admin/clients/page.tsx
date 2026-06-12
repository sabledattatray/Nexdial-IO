"use client";

import React, { useState, useEffect } from "react";
import { Users, LogIn, Pause, Search, User, Mail, Plus, ChevronDown, ChevronUp, Briefcase, Target, Filter, MessageCircle, CreditCard, Phone, CalendarClock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

type WorkspaceOwner = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  phone?: string | null;
  jobTitle?: string | null;
};

type Workspace = {
  id: string;
  name: string;
  plan: string;
  status: string;
  healthScore: number;
  lastLoginAt: string | null;
  createdAt: string;
  trialEndsAt?: string | null;
  users: WorkspaceOwner[]; // Fetched from our API update
  onboardingData: {
    companyName?: string;
    leadSources?: string[];
    goals?: string[];
    teamSize?: number;
    [key: string]: any;
  } | null;
  _count: {
    users: number;
    leads: number;
  };
};

export default function AdminClientsPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
                    <React.Fragment key={w.id}>
                      <tr className="hover:bg-white/[0.02] transition-colors group">
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
                                <span className="text-xs font-medium text-slate-300">
                                  {owner.name || "Unnamed"} {owner.jobTitle ? <span className="text-[10px] text-slate-500 ml-1">({owner.jobTitle})</span> : null}
                                </span>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {owner.email}</span>
                                {owner.phone && <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-2.5 h-2.5" /> {owner.phone}</span>}
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
                            {w.plan === 'TRIAL' && w.trialEndsAt && (
                              <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-1">
                                <CalendarClock className="w-3 h-3 text-yellow-500" />
                                {format(new Date(w.trialEndsAt), "MMM d, yyyy")}
                              </span>
                            )}
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
                          <button 
                            onClick={() => setExpandedId(expandedId === w.id ? null : w.id)} 
                            className={`p-2 rounded-lg transition-colors ${expandedId === w.id ? 'bg-[#00C2FF]/20 text-[#00C2FF]' : 'bg-white/5 hover:bg-white/10 text-slate-400'}`} 
                            title="View Onboarding Data"
                          >
                            {expandedId === w.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          {owner?.email && (
                            <a href={`mailto:${owner.email}`} className="inline-block p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 transition-colors" title="Email Client">
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {owner?.phone && (
                            <a href={`https://wa.me/${owner.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="inline-block p-2 rounded-lg bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-slate-400 transition-colors" title="WhatsApp Client">
                              <MessageCircle className="w-4 h-4" />
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
                      {expandedId === w.id && (
                        <tr className="bg-[#050a15] border-y border-[#00C2FF]/20 shadow-[inset_0_0_20px_rgba(0,194,255,0.02)]">
                          <td colSpan={5} className="p-6 pl-8">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-6 h-6 rounded-full bg-[#00C2FF]/10 flex items-center justify-center border border-[#00C2FF]/20">
                                <Briefcase className="w-3 h-3 text-[#00C2FF]" />
                              </div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Client Onboarding Profile</h4>
                            </div>
                            
                            {w.onboardingData ? (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                  
                                  {/* Column 1: Onboarding Details */}
                                  <div className="space-y-4 col-span-1 lg:col-span-2">
                                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">Business Profile</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Company Name</span>
                                        <span className="text-sm text-slate-300">{w.onboardingData.companyName || "Not provided"}</span>
                                      </div>
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Industry</span>
                                        <span className="text-sm text-slate-300">{w.onboardingData.industry || "N/A"} - {w.onboardingData.businessType || "N/A"}</span>
                                      </div>
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Website</span>
                                        <span className="text-sm text-slate-300 truncate max-w-[200px] block">{w.onboardingData.companyWebsite || "N/A"}</span>
                                      </div>
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Location</span>
                                        <span className="text-sm text-slate-300">{w.onboardingData.location || "N/A"} ({w.onboardingData.timeZone || "N/A"})</span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Goals</span>
                                        <div className="flex flex-wrap gap-1.5">
                                          {w.onboardingData.goals?.map((g: string, i: number) => (
                                            <span key={i} className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">{g}</span>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Lead Sources</span>
                                        <div className="flex flex-wrap gap-1.5">
                                          {w.onboardingData.leadSources?.map((s: string, i: number) => (
                                            <span key={i} className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">{s}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Column 2: Team Members & Billing */}
                                  <div className="space-y-6">
                                    <div>
                                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Team Members</h5>
                                      <div className="space-y-3">
                                        {w.users?.map((u, i) => (
                                          <div key={i} className="flex items-center gap-3">
                                            {u.image ? (
                                              <img src={u.image} alt="" className="w-8 h-8 rounded-full" />
                                            ) : (
                                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                                <User className="w-4 h-4 text-slate-400" />
                                              </div>
                                            )}
                                            <div className="flex flex-col">
                                              <span className="text-xs font-medium text-slate-300">{u.name || "Unnamed"}</span>
                                              <span className="text-[10px] text-slate-500">{u.email}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Billing Status</h5>
                                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-xs text-slate-400">Current Plan</span>
                                          <span className="text-xs font-bold text-[#00C2FF]">{w.plan}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-xs text-slate-400">Estimated MRR</span>
                                          <span className="text-xs font-bold text-emerald-400">
                                            {w.plan === 'TRIAL' ? '₹0' : w.plan === 'SMALL' ? '₹2,500' : w.plan === 'MEDIUM' ? '₹5,000' : '₹10,000+'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* QUICK ACTIONS BAR */}
                                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                                  {owner?.phone && (
                                    <a 
                                      href={`https://wa.me/${owner.phone.replace(/[^0-9]/g, '')}`} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded text-xs font-bold transition-colors"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                      WhatsApp Client
                                    </a>
                                  )}
                                  {owner?.email && (
                                    <a 
                                      href={`mailto:${owner.email}?subject=NexDial%20Support`}
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded text-xs font-bold transition-colors"
                                    >
                                      <CreditCard className="w-3.5 h-3.5" />
                                      Email Client
                                    </a>
                                  )}
                                  <button 
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-xs font-bold transition-colors"
                                    onClick={() => alert('Plan Override dialog opens here.')}
                                  >
                                    <Target className="w-3.5 h-3.5" />
                                    Change Plan Manually
                                  </button>
                                  {w.plan === 'TRIAL' && (
                                    <button 
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00C2FF]/10 hover:bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30 rounded text-xs font-bold transition-colors"
                                      onClick={() => alert('Trial extension endpoint pending integration.')}
                                    >
                                      <CalendarClock className="w-3.5 h-3.5" />
                                      Extend Trial
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-slate-400 italic">No onboarding data recorded for this legacy workspace.</div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
