"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Headphones,
  BarChart3,
  Brain,
  Users,
  Building2,
  Cpu,
  BookOpen,
  Briefcase,
  Globe,
  Shield,
  Zap,
  MessageSquare,
  Target,
  TrendingUp,
  Layers,
  Bot,
  PhoneCall,
  LayoutDashboard,
  UserCheck,
  MonitorSmartphone,
} from "lucide-react";

const navLinks = [
  {
    label: "Solutions",
    href: "/solutions",
    megaMenu: [
      {
        title: "Platform",
        items: [
          { label: "AI Contact Center", href: "/ai-platform", icon: Bot, desc: "Intelligent automation for every interaction" },
          { label: "CRM Suite", href: "/solutions#crm", icon: Users, desc: "360° customer relationship management" },
          { label: "Dialer Platform", href: "/solutions#dialer", icon: PhoneCall, desc: "Predictive, power & progressive dialers" },
          { label: "Analytics Hub", href: "/solutions#analytics", icon: BarChart3, desc: "Real-time insights & reporting" },
        ],
      },
      {
        title: "Portals",
        items: [
          { label: "Agent Portal", href: "/solutions#agent", icon: Headphones, desc: "AI-assisted agent workspace" },
          { label: "Supervisor Portal", href: "/solutions#supervisor", icon: MonitorSmartphone, desc: "Live monitoring & coaching" },
          { label: "Client Portal", href: "/solutions#client", icon: LayoutDashboard, desc: "Self-service client dashboard" },
          { label: "Admin Panel", href: "/solutions#admin", icon: Shield, desc: "Multi-tenant system management" },
        ],
      },
      {
        title: "AI & Automation",
        items: [
          { label: "Conversation Intelligence", href: "/ai-platform#conversation", icon: Brain, desc: "NLP-powered call analysis" },
          { label: "Workflow Automation", href: "/ai-platform#automation", icon: Zap, desc: "No-code automation builder" },
          { label: "Voice AI Agents", href: "/ai-platform#voice", icon: MessageSquare, desc: "Autonomous voice interactions" },
          { label: "Predictive Analytics", href: "/ai-platform#predictive", icon: TrendingUp, desc: "AI-driven forecasting" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    megaMenu: [
      {
        title: "Customer Engagement",
        items: [
          { label: "Inbound Support", href: "/services#inbound", icon: Phone, desc: "24/7 multi-channel support" },
          { label: "Outbound Sales", href: "/services#outbound", icon: Target, desc: "Revenue-driven campaigns" },
          { label: "Chat & Email Support", href: "/services#digital", icon: MessageSquare, desc: "Omnichannel digital CX" },
          { label: "Technical Support", href: "/services#tech", icon: Cpu, desc: "Tier 1-3 tech assistance" },
        ],
      },
      {
        title: "Business Operations",
        items: [
          { label: "Lead Generation", href: "/services#leads", icon: TrendingUp, desc: "Qualified pipeline building" },
          { label: "Back Office", href: "/services#backoffice", icon: Layers, desc: "Data processing & operations" },
          { label: "Collections", href: "/services#collections", icon: Briefcase, desc: "Debt recovery solutions" },
          { label: "KPO Services", href: "/services#kpo", icon: BookOpen, desc: "Knowledge process outsourcing" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Technology",
    href: "/technology",
  },
  {
    label: "Company",
    href: "/about",
    megaMenu: [
      {
        title: "About",
        items: [
          { label: "About Us", href: "/about", icon: Building2, desc: "Our mission & vision" },
          { label: "Clients", href: "/clients", icon: Users, desc: "Trusted by 500+ brands" },
          { label: "Case Studies", href: "/case-studies", icon: BarChart3, desc: "Real results, real impact" },
          { label: "Partners", href: "/partners", icon: Globe, desc: "Strategic partnerships" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Blog", href: "/blog", icon: BookOpen, desc: "Insights & thought leadership" },
          { label: "Knowledge Center", href: "/knowledge-center", icon: Brain, desc: "Guides & documentation" },
          { label: "Careers", href: "/careers", icon: UserCheck, desc: "Join our team" },
          { label: "FAQs", href: "/faqs", icon: MessageSquare, desc: "Common questions answered" },
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
                  <span className="text-white font-extrabold text-lg">D</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#0057D9]/30 to-[#00C2FF]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-none">
                  DBS Mintek
                </span>
                <span className="text-[10px] text-[#64748B] font-medium tracking-[0.2em] uppercase leading-none mt-0.5">
                  Contact Center OS
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
                        <div className="glass-card-strong !bg-[#0F172A] p-6 min-w-[680px] shadow-2xl shadow-black/40">
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {link.megaMenu.map((group) => (
                              <div key={group.title}>
                                <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3 px-2">
                                  {group.title}
                                </h4>
                                <div className="space-y-1">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
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
                href="/contact"
                className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors px-4 py-2"
              >
                Contact
              </Link>
              <Link
                href="/request-demo"
                className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Request Demo
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
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary w-full text-center block text-sm"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/request-demo"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center block text-sm"
                  >
                    Request Demo
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
