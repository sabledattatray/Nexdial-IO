"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  Star,
  Zap,
  Inbox,
} from "lucide-react";

// Inline social SVGs
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const footerLinks = {
  product: [
    { label: "Unified Inbox", href: "/solutions#inbox" },
    { label: "Lead Management", href: "/solutions#leads" },
    { label: "Pipeline View", href: "/crm/pipeline" },
    { label: "Follow-Up Engine", href: "/solutions#followups" },
    { label: "Dashboard", href: "/crm/dashboard" },
    { label: "Call Logging", href: "/solutions#calls" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Knowledge Center", href: "/knowledge-center" },
    { label: "FAQs", href: "/faqs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book a Demo", href: "/request-demo" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const badges = [
  { icon: Shield, label: "GDPR Compliant" },
  { icon: Clock, label: "99.9% Uptime" },
  { icon: Star, label: "4.8★ Rated" },
];

export function Footer() {
  const pathname = usePathname();
  const [currentYear] = useState(() => new Date().getFullYear());

  const isConsolePage = pathname?.startsWith("/crm") || 
                        pathname?.startsWith("/admin") || 
                        pathname?.startsWith("/supervisor") || 
                        pathname?.startsWith("/client-portal") || 
                        pathname?.startsWith("/dialer");
  if (isConsolePage) return null;

  return (
    <footer className="relative bg-[#060D1B] border-t border-white/[0.04]">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
          <div className="glass-card-strong p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0057D9]/10 via-transparent to-[#00C2FF]/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Stop Losing Leads?
              </h2>
              <p className="text-[#94A3B8] text-lg mb-8 max-w-2xl mx-auto">
                Join 1,000+ small businesses that track every customer conversation
                and never miss a follow-up with NexDial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="btn-primary text-base !py-3.5 !px-8 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Free Trial
                </Link>
                <Link href="/contact" className="btn-secondary text-base !py-3.5 !px-8 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Inbox className="w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#0057D9]/30 to-[#00C2FF]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-2xl tracking-tighter leading-none flex items-center" style={{ fontFamily: "var(--font-outfit)" }}>
                  Nexdial<sup className="inline-flex items-center justify-center w-[14px] h-[14px] ml-0.5 rounded-full border border-[#00C2FF] text-[#00C2FF] text-[9px] font-light shadow-[0_0_8px_rgba(0,194,255,0.2)]">R</sup>
                </span>
                <span className="text-[8.5px] text-[#64748B] font-medium tracking-widest uppercase leading-none mt-1.5">
                  Unified Communication Inbox
                </span>
              </div>
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6 max-w-sm">
              The simplest CRM for small businesses who manage customers via
              WhatsApp, calls, and forms. Track every lead, automate follow-ups,
              and close more deals.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+918010803756" className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#00C2FF] transition-colors">
                <Phone className="w-4 h-4" />
                +91 8010803756
              </a>
              <a href="mailto:info@nexdial.io" className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#00C2FF] transition-colors">
                <Mail className="w-4 h-4" />
                info@nexdial.io
              </a>
              <div className="flex items-start gap-3 text-sm text-[#94A3B8]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-[#64748B]">Badlapur East, Dist- Thane, Maharashtra, India- 421503</span>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#64748B] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#64748B] hover:text-[#00C2FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#64748B] hover:text-[#00C2FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#64748B] hover:text-[#00C2FF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-white/[0.04]">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-[#94A3B8]"
              >
                <badge.icon className="w-3.5 h-3.5 text-[#00E5A0]" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-[#475569]">
              © {currentYear} Nexdial. All rights reserved.
            </p>
            <span className="hidden sm:inline text-[#334155] text-xs">|</span>
            <div className="text-xs text-[#475569] flex items-center flex-wrap gap-1.5">
              <span>Designed & Engineered by</span>
              <a 
                href="https://dattasable.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] hover:bg-[#00C2FF]/10 hover:border-[#00C2FF]/20 hover:text-[#00C2FF] font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
                Datta Sable
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/918010803756?text=Hi%20NexDial%20Team,%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 group hover:shadow-[#25D366]/30 hover:shadow-xl cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-bold pl-1">
          Chat with Us
        </span>
        <svg
          className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.356 1.449 5.483 0 9.944-4.461 9.947-9.948.002-2.659-1.036-5.158-2.92-7.046C17.15 1.722 14.656.682 12 0 .682 6.561 0 12.02.003 17.503c.002 2.059.463 3.697 1.453 5.358L2.43 21.222l4.217.932zm12.307-5.355c-.33-.165-1.951-.963-2.253-1.074-.302-.11-.522-.165-.741.165-.22.33-.85.85-1.042 1.074-.192.224-.384.247-.714.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.641-1.953-1.833-2.282-.192-.33-.02-.508.145-.671.149-.147.33-.384.495-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.082-.165-.741-1.786-1.014-2.446-.267-.64-.537-.55-.741-.56h-.632c-.22 0-.577.082-.88.412-.302.33-1.154 1.127-1.154 2.746 0 1.62 1.181 3.187 1.346 3.406.165.22 2.325 3.55 5.632 4.978.787.34 1.4.54 1.88.692.79.25 1.5.21 2.07.13.63-.09 1.95-.8 2.225-1.57.275-.77.275-1.43.192-1.57-.082-.14-.302-.22-.632-.385z"/>
        </svg>
      </a>
    </footer>
  );
}
