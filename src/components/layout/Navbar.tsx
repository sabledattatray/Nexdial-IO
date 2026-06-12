"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Inbox,
  Users,
  BarChart3,
  PhoneCall,
  CalendarCheck,
  Kanban,
  BookOpen,
  HelpCircle,
  Building2,
  Mail,
  Briefcase,
  Zap,
  LogIn,
  LayoutDashboard,
  Shield,
  Handshake,
  FileText,
  Award,
  Download,
} from "lucide-react";

const navLinks = [
  {
    label: "Product",
    href: "/solutions",
    megaMenu: [
      {
        title: "Core Features",
        items: [
          { label: "Unified Inbox", href: "/solutions#inbox", icon: Inbox, desc: "All leads in one central feed" },
          { label: "Lead Management", href: "/solutions#leads", icon: Users, desc: "Full profiles, tags & history" },
          { label: "Pipeline View", href: "/crm/pipeline", icon: Kanban, desc: "Visual Kanban board for deals" },
          { label: "Follow-Up Engine", href: "/solutions#followups", icon: CalendarCheck, desc: "Never miss a follow-up again" },
        ],
      },
      {
        title: "Tools",
        items: [
          { label: "CRM Workspace", href: "/crm", icon: LayoutDashboard, desc: "Interactive sales CRM dashboard" },
          { label: "Call Logging", href: "/solutions#calls", icon: PhoneCall, desc: "Track every call with outcomes" },
          { label: "Smart Dashboard", href: "/crm/dashboard", icon: BarChart3, desc: "Actionable business insights" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    megaMenu: [
      {
        title: "Learn",
        items: [
          { label: "Blog", href: "/blog", icon: BookOpen, desc: "Tips & insights for small businesses" },
          { label: "Knowledge Center", href: "/knowledge-center", icon: BookOpen, desc: "Guides & documentation" },
          { label: "FAQs", href: "/faqs", icon: HelpCircle, desc: "Common questions answered" },
        ],
      },
      {
        title: "Library",
        items: [
          { label: "Case Studies", href: "/case-studies", icon: FileText, desc: "Real metrics & conversion studies" },
          { label: "Success Stories", href: "/success-stories", icon: Award, desc: "Customer testimonials & wins" },
          { label: "Downloads Desk", href: "/resources", icon: Download, desc: "E-Books, playbooks & guides" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    megaMenu: [
      {
        title: "About",
        items: [
          { label: "About Us", href: "/about", icon: Building2, desc: "Our story, mission & locations" },
          { label: "Contact Us", href: "/contact", icon: Mail, desc: "Get in touch with support & sales" },
          { label: "Careers", href: "/careers", icon: Briefcase, desc: "Open positions in India & remote" },
        ],
      },
      {
        title: "Relations",
        items: [
          { label: "Client Roster", href: "/clients", icon: Users, desc: "Trusted by 1,000+ businesses" },
          { label: "Partners", href: "/partners", icon: Handshake, desc: "Platform integrators & partners" },
          { label: "Security & Trust", href: "/security", icon: Shield, desc: "Data compliance & security standards" },
        ],
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const isConsolePage = pathname?.startsWith("/crm") || 
                        pathname?.startsWith("/admin") || 
                        pathname?.startsWith("/supervisor") || 
                        pathname?.startsWith("/client-portal") || 
                        pathname?.startsWith("/dialer");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isConsolePage) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isConsolePage]);

  useEffect(() => {
    if (isConsolePage) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, isConsolePage]);

  if (isConsolePage) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#081120]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Inbox className="w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#0057D9]/30 to-[#00C2FF]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-none flex items-center">
                  Nexdial<sup className="text-base font-light ml-0.5 opacity-100 mt-1">&reg;</sup>
                </span>
                <span className="text-[8.5px] text-[#64748B] font-medium tracking-widest uppercase leading-none mt-1.5">
                  Unified Communication Inbox
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && setActiveMenu(link.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
                  >
                    {link.label}
                    {link.megaMenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeMenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu && activeMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="glass-card-strong !bg-[#0F172A] p-5 min-w-[560px] shadow-2xl shadow-black/40">
                          <div className={`grid ${link.megaMenu.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                            {link.megaMenu.map((group) => (
                              <div key={group.title}>
                                <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 px-2">
                                  {group.title}
                                </h4>
                                <div className="space-y-0.5">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0057D9]/20 to-[#00C2FF]/10 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#0057D9]/30 group-hover/item:to-[#00C2FF]/20 transition-all">
                                        <item.icon className="w-4.5 h-4.5 text-[#00C2FF]" />
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium text-white block leading-tight">
                                          {item.label}
                                        </span>
                                        <span className="text-xs text-[#64748B] leading-snug">
                                          {item.desc}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors px-4 py-2 flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0F172A] border-l border-white/[0.06] overflow-y-auto"
            >
              <div className="p-6 pt-24">
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between p-3 text-white font-medium rounded-xl hover:bg-white/[0.04] transition-colors"
                      >
                        {link.label}
                        {link.megaMenu && <ChevronDown className="w-4 h-4 text-[#64748B]" />}
                      </Link>
                      {link.megaMenu && (
                        <div className="ml-4 mt-1 space-y-1 mb-2">
                          {link.megaMenu.map((group) =>
                            group.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 p-2.5 text-sm text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
                              >
                                <item.icon className="w-4 h-4 text-[#00C2FF]" />
                                {item.label}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary w-full text-center block text-sm"
                  >
                    Login to CRM
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center block text-sm"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
