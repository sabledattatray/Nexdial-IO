"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Inbox, 
  KanbanSquare, 
  CalendarClock, 
  Settings, 
  Plus, 
  Menu, 
  X, 
  Bell
} from "lucide-react";
import AddLeadModal from "@/components/crm/AddLeadModal";

const navLinks = [
  { name: "Inbox", href: "/crm", icon: Inbox },
  { name: "Pipeline", href: "/crm/pipeline", icon: KanbanSquare },
  { name: "Follow-ups", href: "/crm/follow-ups", icon: CalendarClock },
  { name: "Analytics", href: "/crm/dashboard", icon: LayoutDashboard },
  { name: "Settings", href: "/crm/settings", icon: Settings },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadAvatar = () => {
      setAvatarUrl(localStorage.getItem("nexdial_user_avatar"));
    };
    loadAvatar();
    window.addEventListener("nexdial-avatar-change", loadAvatar);
    return () => window.removeEventListener("nexdial-avatar-change", loadAvatar);
  }, []);

  const user = session?.user;
  const userInitials = user?.name 
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) 
    : "U";

  const currentLink = navLinks.find(l => {
    if (l.href === '/crm') {
      return pathname === '/crm' || pathname.startsWith('/crm/leads');
    }
    return pathname === l.href || pathname.startsWith(l.href);
  });
  
  const headerTitle = currentLink?.name || 'Overview';

  return (
    <div className="flex h-screen bg-[#081120] text-slate-200 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0A1628]">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/crm" className="text-xl font-extrabold text-white tracking-tight flex items-center">
            Nexdial<sup className="text-sm font-light ml-0.5 opacity-80 mt-1">&reg;</sup>
            <span className="ml-2 text-[10px] uppercase tracking-widest text-[#00C2FF] bg-[#00C2FF]/10 px-1.5 py-0.5 rounded border border-[#00C2FF]/20">
              CRM
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = link.href === '/crm'
              ? pathname === '/crm' || pathname.startsWith('/crm/leads')
              : pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? "bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <link.icon className={`w-4 h-4 ${isActive ? "text-[#00C2FF]" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsAddLeadModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-[#0057D9]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-[#0A1628] border-r border-white/10 flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
              <span className="text-xl font-extrabold text-white flex items-center">
                Nexdial<sup className="text-sm font-light ml-0.5 opacity-80 mt-1">&reg;</sup>
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-6 px-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/crm'
                  ? pathname === '/crm' || pathname.startsWith('/crm/leads')
                  : pathname === link.href || pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      isActive
                        ? "bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAddLeadModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0057D9] text-white text-sm font-semibold py-2.5 rounded-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Lead
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#081120] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white hidden sm:block">
              {headerTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Top-Header Add Lead Button */}
            <button 
              onClick={() => setIsAddLeadModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-lg shadow-[#0057D9]/10 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Lead
            </button>

            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#081120]" />
            </button>
            
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={user?.name || "User"} 
                className="w-8 h-8 rounded-full object-cover border border-[#00C2FF]/30 cursor-default select-none"
              />
            ) : (
              <div 
                title={user?.name || "User"}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-xs font-bold text-white border border-[#00C2FF]/30 select-none cursor-default"
              >
                {userInitials}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-[#050A15]">
          <div className="p-4 sm:p-6 max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>

      {/* Global Add Lead Modal */}
      {isAddLeadModalOpen && (
        <AddLeadModal onClose={() => setIsAddLeadModalOpen(false)} />
      )}
    </div>
  );
}
