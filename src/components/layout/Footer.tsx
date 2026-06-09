"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  Globe,
  Zap,
  Headphones,
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

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
  solutions: [
    { label: "AI Contact Center", href: "/ai-platform" },
    { label: "CRM Suite", href: "/solutions#crm" },
    { label: "Dialer Platform", href: "/solutions#dialer" },
    { label: "Admin Dialer", href: "/admin/dialer" },
    { label: "Analytics Hub", href: "/solutions#analytics" },
    { label: "Agent Portal", href: "/solutions#agent" },
    { label: "Client Portal", href: "/solutions#client" },
    { label: "Workflow Automation", href: "/ai-platform#automation" },
  ],
  services: [
    { label: "Inbound Support", href: "/services#inbound" },
    { label: "Outbound Sales", href: "/services#outbound" },
    { label: "Technical Support", href: "/services#tech" },
    { label: "Lead Generation", href: "/services#leads" },
    { label: "Back Office Operations", href: "/services#backoffice" },
    { label: "Collections", href: "/services#collections" },
    { label: "Managed Contact Center", href: "/services#managed" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Clients", href: "/clients" },
    { label: "Partners", href: "/partners" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Knowledge Center", href: "/knowledge-center" },
    { label: "Documentation", href: "/resources" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "FAQs", href: "/faqs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book Consultation", href: "/book-consultation" },
    { label: "Request Demo", href: "/request-demo" },
  ],
};

const socialLinks = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const badges = [
  { icon: Shield, label: "SOC2 Compliant" },
  { icon: Shield, label: "ISO 27001" },
  { icon: Award, label: "GDPR Ready" },
  { icon: Globe, label: "99.99% Uptime" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname && (pathname === "/dialer" || pathname === "/admin/dialer")) {
    return null;
  }

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
                Ready to Transform Your Contact Center?
              </h2>
              <p className="text-[#94A3B8] text-lg mb-8 max-w-2xl mx-auto">
                Join 500+ enterprises that have elevated their customer experience with
                DBS Mintek®&apos;s AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo" className="btn-primary text-base !py-3.5 !px-8 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Request a Demo
                </Link>
                <Link href="/contact" className="btn-secondary text-base !py-3.5 !px-8 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Talk to Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#0057D9]/30 to-[#00C2FF]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-none">
                  DBS Mintek®
                </span>
                <span className="text-[10px] text-[#64748B] font-medium tracking-[0.2em] uppercase leading-none mt-2">
                  Contact Center OS
                </span>
              </div>
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6 max-w-sm">
              Enterprise-grade AI-powered contact center platform built for modern
              businesses. Transform customer conversations into growth with omnichannel
              CX solutions.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+918308211113" className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#00C2FF] transition-colors">
                <Phone className="w-4 h-4" />
                +91 83082 11113
              </a>
              <a href="mailto:prithviraj.singh@dbsmintek.in" className="flex items-center gap-3 text-sm text-[#94A3B8] hover:text-[#00C2FF] transition-colors">
                <Mail className="w-4 h-4" />
                prithviraj.singh@dbsmintek.in
              </a>
              <div className="flex items-start gap-3 text-sm text-[#94A3B8]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-semibold text-white text-xs">Official Head Office:</span>
                  <span className="block text-xs text-[#64748B] mt-0.5">Arihant Aura, B-Tower, 6th Floor, Thane-Belapur Road, opposite Turbhe Railway Station, Turbhe MIDC, Navi Mumbai, Maharashtra 400705</span>
                </div>
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
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
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
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
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
        </div>

        {/* Compliance Badges */}
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
              © {new Date().getFullYear()} DBS Mintek®. All rights reserved.
            </p>
            <span className="hidden sm:inline text-[#334155] text-xs">|</span>
            <p className="text-xs text-[#475569]">
              Made for <span className="text-[#00E5A0] font-medium">High Performance</span> by{" "}
              <a 
                href="https://dattasable.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#00E5A0] hover:text-[#00C2FF] font-medium transition-colors"
              >
                Datta Sable
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Security
            </Link>
            <Link href="/sitemap" className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
