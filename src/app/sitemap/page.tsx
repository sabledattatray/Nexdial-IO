"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { 
  Globe, LayoutDashboard, FileText, HelpCircle, PhoneCall, 
  Map, Headphones, Users, Server, Shield, Database, Compass 
} from "lucide-react";
import Link from "next/link";

export default function HTMLSitemapPage() {
  const categories = [
    {
      title: "Core Platform",
      icon: Globe,
      color: "#0057D9",
      links: [
        { label: "Home Cockpit", href: "/", desc: "Main landing interface and features list" },
        { label: "About Nexdial", href: "/about", desc: "Our history, leadership, and Pan-India awards" },
        { label: "Omnichannel Services", href: "/services", desc: "Voice, SMS, Chat, and BPO operations" },
        { label: "Industry Solutions", href: "/solutions", desc: "Interactive modules details & SaaS portal specs" },
        { label: "Target Sectors", href: "/industries", desc: "Vertical workflows for Fintech, Healthcare & Retail" },
        { label: "Technology Stack", href: "/technology", desc: "Network routing, Asterisk & Azure framework" },
        { label: "Cognitive AI Voice", href: "/ai-platform", desc: "Real-time speech RAG & agent transcript scripts" },
      ],
    },
    {
      title: "Operations & Portals",
      icon: LayoutDashboard,
      color: "#8B5CF6",
      links: [
        { label: "Dialer Agent Workspace", href: "/dialer", desc: "WebRTC softphone console and transcript panel" },
        { label: "Supervisor Admin Dialer", href: "/admin/dialer", desc: "Barge-in telemetry and live agent equalizers" },
        { label: "Enterprise CRM Suite", href: "/crm", desc: "Leads board, customer cards, and deal flow" },
        { label: "Multi-Tenant Super Admin", href: "/admin", desc: "Tenant configuration & Billing dashboard" },
        { label: "Agent Portal Workspace", href: "/agent", desc: "Direct shift schedules and individual stats" },
        { label: "Supervisor Board Console", href: "/supervisor", desc: "Call center sweep parameters & reporting" },
        { label: "Tenant Client Portal", href: "/client-portal", desc: "BPO report exports & billing summaries" },
      ],
    },
    {
      title: "Resources & Relations",
      icon: Users,
      color: "#00E5A0",
      links: [
        { label: "Case Studies Insights", href: "/case-studies", desc: "Metrics demonstrating AHT reduction and sales boosts" },
        { label: "Success Stories Board", href: "/success-stories", desc: "Real testimonials and operational wins" },
        { label: "Active Client Roster", href: "/clients", desc: "Trusted partners including Velo Payments & Apex" },
        { label: "Careers & Salaries", href: "/careers", desc: "Open positions in Mumbai, Noida, Lucknow & salary tags" },
        { label: "Platform Blog Sheets", href: "/blog", desc: "AMD detection whitepapers and security blogs" },
        { label: "Alliance Partners", href: "/partners", desc: "SIP carrier trunks & CRM connector details" },
      ],
    },
    {
      title: "Support & Compliance",
      icon: Shield,
      color: "#EF4444",
      links: [
        { label: "Knowledge Center", href: "/knowledge-center", desc: "Vicidial configurations and OAuth integration guides" },
        { label: "Frequently Asked FAQs", href: "/faqs", desc: "Questions regarding HIPAA, multi-tenant billing & hosting" },
        { label: "Contact Hotline Team", href: "/contact", desc: "Office maps, WhatsApp advisor, and support email" },
        { label: "Request Demo System", href: "/request-demo", desc: "Deploy sandbox test dialers and CRM instances" },
        { label: "Book Consultation Slot", href: "/book-consultation", desc: "Solutions architecture scoping sessions" },
        { label: "Privacy Policy Document", href: "/privacy", desc: "Data isolation, HIPAA BAAs, and retention details" },
        { label: "Terms of Service", href: "/terms", desc: "TCPA/DNC scrubbing obligations & SLA guidelines" },
        { label: "Security Architecture Desk", href: "/security", desc: "SRTP WebRTC audio keys & cluster firewalls" },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00E5A0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center gap-2 w-fit">
            <Compass className="w-3.5 h-3.5" />
            Platform Navigation Map
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            HTML <span className="gradient-text">Sitemap</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            Navigate through all public pages, operational dashboards, agent softphones, support document centers, and compliance reports of the Nexdial Contact Center Operating System.
          </p>
        </AnimatedSection>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <AnimatedSection key={category.title} className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none" style={{ backgroundColor: category.color }} />
                
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h2 className="text-lg font-bold text-white font-space-grotesk">{category.title}</h2>
                  </div>

                  {/* Links List */}
                  <ul className="space-y-4">
                    {category.links.map((link) => (
                      <li key={link.href} className="group/item">
                        <Link href={link.href} className="block space-y-1">
                          <span className="text-sm font-semibold text-[#CBD5E1] group-hover/item:text-[#00C2FF] transition-colors flex items-center gap-1.5">
                            {link.label}
                            <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-xs font-mono font-bold text-[#00C2FF]">&rarr;</span>
                          </span>
                          <span className="text-xs text-[#64748B] block leading-relaxed">{link.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </div>
  );
}
