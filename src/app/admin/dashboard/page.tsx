// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  Building2, 
  Users, 
  IndianRupee, 
  MessageCircle, 
  Mail, 
  Activity,
  AlertTriangle,
  ArrowUpRight,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAuthenticatedSession();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  // 1. Fetch High-Level SaaS Metrics
  const workspaces = await prisma.workspace.findMany({
    include: {
      _count: {
        select: {
          users: true,
          leads: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const totalWorkspaces = workspaces.length;
  const activeWorkspaces = workspaces.filter(w => w.status === "ACTIVE").length;
  const trialWorkspaces = workspaces.filter(w => w.plan === "TRIAL").length;
  const paidWorkspaces = totalWorkspaces - trialWorkspaces;

  // Approximate MRR (Assuming SMALL=2500, MEDIUM=5000, LARGE=10000)
  const mrr = workspaces.reduce((acc, w) => {
    if (w.plan === "SMALL") return acc + 2500;
    if (w.plan === "MEDIUM") return acc + 5000;
    if (w.plan === "LARGE") return acc + 10000;
    return acc;
  }, 0);

  // 2. Fetch Usage Metrics
  const totalLeads = workspaces.reduce((acc, w) => acc + w._count.leads, 0);
  const totalUsers = workspaces.reduce((acc, w) => acc + w._count.users, 0);
  
  // Connect WA Accounts: Check how many have a whatsapp number
  const waConnectedCount = workspaces.filter(w => w.whatsappNumber || (w.onboardingData && (w.onboardingData as any).channels?.whatsappNumber)).length;

  // 3. Compute Health Scores for "At-Risk" widget
  const workspacesWithHealth = workspaces.map(ws => {
    let score = 100;
    if (ws._count.users <= 1) score -= 15;
    if (ws._count.leads === 0) score -= 25;
    // We will build the full engine in Phase 2
    return { ...ws, healthScore: Math.max(0, score) };
  });

  const atRiskClients = workspacesWithHealth.filter(w => w.healthScore < 60).slice(0, 5);
  const recentWorkspaces = workspaces.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">SaaS Operations Center</h1>
        <p className="text-sm text-slate-400 mt-1">Global overview of NexDial's revenue, usage, and client health.</p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2FF]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#00C2FF]/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total MRR</p>
              <h3 className="text-3xl font-black text-white mt-1">₹{mrr.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-[#00C2FF]/10 rounded-lg border border-[#00C2FF]/20 text-[#00C2FF]">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 relative z-10">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12% this month</span>
          </div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Workspaces</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalWorkspaces}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 relative z-10">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>{paidWorkspaces} Paid</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>{trialWorkspaces} Trial</span>
          </div>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Users</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalUsers}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-400 relative z-10">Across all {activeWorkspaces} active workspaces</p>
        </div>

        <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-orange-500/10"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Leads Managed</p>
              <h3 className="text-3xl font-black text-white mt-1">{totalLeads.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-400 relative z-10">Cumulative system-wide pipeline volume</p>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* At-Risk Clients Widget */}
        <div className="bg-[#020610] border border-red-500/20 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.03)] overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-sm font-bold text-white">At-Risk Clients</h2>
            </div>
            <Link href="/admin/clients?filter=at-risk" className="text-xs font-medium text-[#00C2FF] hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {atRiskClients.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No clients currently at risk.</div>
            ) : (
              atRiskClients.map(w => (
                <div key={w.id} className="p-4 px-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-white">{w.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{w.plan}</span>
                      <span>{w._count.users} Users</span>
                      <span>{w._count.leads} Leads</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs font-bold text-red-400">Health: {w.healthScore}</span>
                    <Link href={`/admin/clients?expand=${w.id}`} className="text-[10px] text-slate-500 hover:text-white underline mt-1 transition-colors">Diagnose</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Widget */}
        <div className="bg-[#020610] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg">
                <UserPlus className="w-5 h-5 text-slate-400" />
              </div>
              <h2 className="text-sm font-bold text-white">Recent Signups</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {recentWorkspaces.map(w => (
              <div key={w.id} className="relative pl-4 border-l-2 border-[#00C2FF]/30 pb-1 last:pb-0">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#00C2FF] ring-4 ring-[#020610]" />
                <h4 className="text-sm font-medium text-slate-200">{w.name}</h4>
                <p className="text-xs text-slate-500 mt-1">Joined {formatDistanceToNow(new Date(w.createdAt), { addSuffix: true })}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/5 bg-white/[0.02] text-center">
            <Link href="/admin/clients" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
              Manage All Workspaces →
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
