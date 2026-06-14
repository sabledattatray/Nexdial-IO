"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Users, IndianRupee, Radio, Terminal, Settings, LogOut, ExternalLink, Activity, HeartPulse, Briefcase } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Shield },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/success", label: "Customer Success", icon: HeartPulse },
  { href: "/admin/billing", label: "Billing & Revenue", icon: IndianRupee },
  { href: "/admin/audit-logs", label: "System Logs", icon: Activity },
  { href: "/admin/communications", label: "Communication Center", icon: Radio },
  { href: "/admin/analytics", label: "SaaS Analytics", icon: Terminal },
  { href: "/admin/industries", label: "Industries", icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#050A15] border-r border-white/10 h-screen fixed top-0 left-0 flex flex-col pt-6 pb-6 shadow-2xl z-50">
      
      {/* Brand */}
      <div className="px-6 mb-8">
        <Link href="/admin/clients" className="flex items-center gap-3">
          <div className="p-2 bg-[#00C2FF]/10 rounded-lg border border-[#00C2FF]/20">
            <Shield className="w-6 h-6 text-[#00C2FF]" />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wide">NexDial<span className="text-[#00C2FF]">.Admin</span></h1>
            <p className="text-[10px] text-[#00C2FF] font-semibold tracking-widest uppercase">Control Center</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                isActive 
                  ? "bg-[#00C2FF]/10 text-white border border-[#00C2FF]/20 shadow-[0_0_15px_rgba(0,194,255,0.05)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#00C2FF]" : "text-slate-500"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="px-4 space-y-1 pt-6 border-t border-white/10">
        <Link href="/crm" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.02] transition-colors text-sm font-medium">
          <ExternalLink className="w-4 h-4 text-slate-500" />
          Exit to My CRM
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
