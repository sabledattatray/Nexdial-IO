"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Inbox, 
  KanbanSquare, 
  CalendarClock, 
  Settings, 
  Plus, 
  Menu, 
  X, 
  Bell,
  LogOut,
  User as UserIcon,
  Shield,
  MessageSquare,
  Sparkles,
  Check,
  BellOff
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
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Hot Lead 🔥",
      message: "Rahul Sharma registered via WhatsApp form.",
      time: "2 mins ago",
      read: false,
      type: "lead",
    },
    {
      id: "2",
      title: "Follow-up Scheduled 📅",
      message: "Call scheduled with Nisha Patel in 30 mins.",
      time: "15 mins ago",
      read: false,
      type: "followup",
    },
    {
      id: "3",
      title: "Missed Call Alert 📞",
      message: "Outbound campaign dialer call to Amit Kumar was unanswered.",
      time: "1 hour ago",
      read: true,
      type: "call",
    }
  ]);

  useEffect(() => {
    const loadAvatar = () => {
      setAvatarUrl(localStorage.getItem("nexdial_user_avatar"));
    };
    loadAvatar();
    window.addEventListener("nexdial-avatar-change", loadAvatar);
    return () => window.removeEventListener("nexdial-avatar-change", loadAvatar);
  }, []);

  // Redirect guard: if user is logged in but has not onboarded, redirect to /onboarding
  useEffect(() => {
    if (session && session.user && !(session.user as any).onboarded) {
      router.replace("/onboarding");
    }
  }, [session, router]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".header-dropdown-container")) {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <Link href="/crm" className="text-xl font-bold text-white tracking-tighter flex items-center" style={{ fontFamily: "var(--font-outfit)" }}>
            Nexdial<sup className="inline-flex items-center justify-center w-[12px] h-[12px] ml-0.5 rounded-full border border-white text-white text-[8px] font-light shadow-[0_0_8px_rgba(255,255,255,0.2)]">R</sup>
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
              <span className="text-xl font-bold text-white tracking-tighter flex items-center" style={{ fontFamily: "var(--font-outfit)" }}>
                Nexdial<sup className="inline-flex items-center justify-center w-[12px] h-[12px] ml-0.5 rounded-full border border-white text-white text-[8px] font-light shadow-[0_0_8px_rgba(255,255,255,0.2)]">R</sup>
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

            {/* Notifications Popover */}
            <div className="relative header-dropdown-container">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="relative text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#081120]" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0F172A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Notifications</span>
                    {notifications.some(n => !n.read) && (
                      <button 
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-[10px] text-[#00C2FF] hover:underline cursor-pointer font-medium bg-transparent border-none"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            // Mark single notification as read
                            setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                          }}
                          className={`p-3.5 flex gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer ${!n.read ? 'bg-white/[0.01]' : 'opacity-60'}`}
                        >
                          <div className="mt-0.5">
                            {n.type === 'lead' ? (
                              <Sparkles className="w-4 h-4 text-[#00E5A0]" />
                            ) : n.type === 'followup' ? (
                              <CalendarClock className="w-4 h-4 text-[#00C2FF]" />
                            ) : (
                              <Bell className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-xs font-bold text-slate-100 truncate">{n.title}</span>
                              <span className="text-[9px] text-slate-500 dry-run whitespace-nowrap shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-400 mt-0.5 leading-relaxed break-words">{n.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
                        <BellOff className="w-8 h-8 text-slate-650" />
                        <span className="text-xs">No notifications yet</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative header-dropdown-container">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer border-none bg-transparent"
              >
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={user?.name || "User"} 
                    className="w-8 h-8 rounded-full object-cover border border-[#00C2FF]/30 select-none"
                  />
                ) : (
                  <div 
                    title={user?.name || "User"}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-xs font-bold text-white border border-[#00C2FF]/30 select-none"
                  >
                    {userInitials}
                  </div>
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0F172A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs font-bold text-white truncate">{user?.name || "Nexdial User"}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{user?.email || "user@nexdial.io"}</p>
                    
                    {/* Role badge */}
                    <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-950/20 text-[#818CF8] border border-indigo-500/10 text-[9px] font-mono font-bold uppercase">
                      <Shield className="w-3 h-3" />
                      <span>{(user as any)?.role || "VIEWER"}</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link 
                      href="/crm/settings" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Settings</span>
                    </Link>
                    <Link 
                      href="/" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Public Website</span>
                    </Link>
                  </div>

                  <div className="h-px bg-white/5 my-1" />

                  {/* Sign Out */}
                  <div className="py-1">
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-left cursor-pointer border-none bg-transparent"
                    >
                      <LogOut className="w-4 h-4 text-red-400/80" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
