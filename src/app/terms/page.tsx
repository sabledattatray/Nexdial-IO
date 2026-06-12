"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Shield, BookOpen, AlertCircle, FileText, CheckCircle2, ChevronRight, CreditCard, RefreshCw, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("agreement");
  const placeholderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);
  const [sidebarTop, setSidebarTop] = useState<number>(112);
  const [computedTop, setComputedTop] = useState<number>(112);

  const sections = [
    { id: "agreement",        label: "1. Agreement & Services" },
    { id: "trial-billing",    label: "2. Trial, Billing & Mandate" },
    { id: "cancellation",     label: "3. Cancellation & Refunds" },
    { id: "acceptable-use",   label: "4. Acceptable Use" },
    { id: "whatsapp",         label: "5. WhatsApp Business Rules" },
    { id: "intellectual-property", label: "6. Intellectual Property" },
    { id: "liability",        label: "7. Liability & Indemnity" },
    { id: "governing-law",    label: "8. Governing Law & Disputes" },
  ];

  useEffect(() => {
    const updateSidebarPos = () => {
      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        setSidebarLeft(rect.left);
      }
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const top = gridRect.top + window.scrollY - window.scrollY;
        setSidebarTop(top);
        setComputedTop(top);
      }
    };
    updateSidebarPos();
    window.addEventListener("resize", updateSidebarPos);

    const clampSidebar = () => {
      if (!gridRef.current || !sidebarRef.current) return;
      const gridBottom = gridRef.current.getBoundingClientRect().bottom;
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const gap = 24;
      setSidebarTop((initTop) => {
        let top = initTop;
        if (top + sidebarHeight + gap > gridBottom) {
          top = gridBottom - sidebarHeight - gap;
        }
        setComputedTop(Math.max(0, top));
        return initTop; // don't mutate initTop
      });
    };

    const handleScroll = () => {
      clampSidebar();
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updateSidebarPos);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-x-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">

        {/* Page Header */}
        <AnimatedSection className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center gap-2 w-fit">
            <BookOpen className="w-3.5 h-3.5" />
            Terms of Service
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Terms &amp; <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            These Terms of Service govern your use of NexDial — an AI-powered CRM and WhatsApp communication platform for Indian small and medium businesses. By signing up and completing the onboarding process, you agree to these terms.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-[#64748B] font-mono">
            <span>DOCUMENT ID: NEXDIAL-TOS-2026-V1</span>
            <span>•</span>
            <span>LAST UPDATED: JUNE 12, 2026</span>
          </div>
        </AnimatedSection>

        {/* Content Body Grid */}
        <div ref={gridRef} className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">

          {/* Placeholder: reserves grid column space for the fixed sidebar */}
          <div ref={placeholderRef} className="hidden lg:block w-[280px] shrink-0" />

          {/* Fixed TOC Sidebar */}
          {sidebarLeft !== null && (
            <aside
              ref={sidebarRef}
              className="hidden lg:block bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-md"
              style={{
                position: "fixed",
                top: computedTop,
                left: sidebarLeft,
                width: 260,
                maxHeight: `calc(100vh - ${computedTop}px - 1rem)`,
                overflowY: "auto",
                zIndex: 40,
                transition: "top 0.15s ease",
              }}
            >
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.06] pb-3">
              Table of Contents
            </h3>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      activeSection === section.id
                        ? "bg-[#0057D9]/15 text-[#00C2FF] border-l-2 border-[#00C2FF]"
                        : "text-[#64748B] hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${activeSection === section.id ? "translate-x-0.5" : "opacity-0"}`} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/[0.05]">
              <Link href="/privacy" className="text-xs text-[#00C2FF] hover:underline flex items-center gap-1">
                <Shield className="w-3 h-3" /> Privacy Policy →
              </Link>
            </div>
          </aside>
          )}

          {/* Right Policy Content */}
          <div className="glass-card-strong p-6 sm:p-10 lg:p-12 border border-white/[0.06] rounded-3xl max-w-4xl text-[#CBD5E1] text-xs sm:text-sm font-light leading-relaxed space-y-10">

            {/* 1. Agreement & Services */}
            <section id="agreement" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                1. Agreement &amp; Services
              </h2>
              <p>
                By creating a NexDial account, completing the onboarding wizard, or using any feature of the NexDial platform, you ("User" or "Business") agree to be bound by these Terms. NexDial ("we", "us", "our") is a SaaS product operated by NexDial Technologies, India.
              </p>
              <p>
                NexDial provides a cloud-based CRM platform including lead management, WhatsApp Business inbox, sales pipeline (Kanban), call logging, AI-powered lead scoring, automated follow-up reminders, team collaboration tools, and analytics dashboards — collectively referred to as "the Service."
              </p>
              <p>
                We reserve the right to update, modify, or discontinue any feature of the Service with reasonable notice. Continued use after updates constitutes acceptance of the revised terms.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 2. Trial, Billing & Mandate */}
            <section id="trial-billing" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <CreditCard className="w-5 h-5 text-[#00C2FF]" />
                2. Trial Period, Billing &amp; Razorpay e-Mandate
              </h2>

              <div className="p-4 rounded-xl bg-[#0057D9]/10 border border-[#0057D9]/20 space-y-2 text-xs">
                <p className="font-bold text-[#60A5FA] flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" /> ₹1 MANDATE AUTHORIZATION — WHAT THIS MEANS
                </p>
                <p className="text-slate-300">
                  During onboarding, we collect a fully refundable ₹1 authorization charge via Razorpay to establish a secure auto-pay e-mandate (NACH mandate). This ₹1 is a verification-only charge — not a subscription fee. It confirms your payment method is valid and sets up recurring billing consent as required by RBI guidelines.
                </p>
              </div>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">Free Trial</h3>
              <p>
                Upon successful mandate setup, your workspace is activated for a <strong>15-day free trial</strong> with full access to all NexDial features including calling, lead scoring, WhatsApp inbox, and team management. No additional charges occur during this period.
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider">Post-Trial Auto-Renewal</h3>
              <p>
                After your 15-day trial expires, your plan automatically renews monthly at the rate corresponding to your business size:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Starter / Small Business (Solo – 10 users):</strong> ₹499/month</li>
                <li><strong>Professional / Medium Business (11 – 50 users):</strong> ₹599/month</li>
                <li><strong>Growth Engine (51+ users, AI features):</strong> ₹999/month</li>
              </ul>
              <p>
                You will receive an email reminder <strong>3 days before your trial ends</strong> with your upcoming plan details. The auto-debit will occur via the Razorpay e-mandate you authorized during onboarding.
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider">Failed Payments</h3>
              <p>
                If a monthly auto-debit fails (insufficient funds, expired card, etc.), your workspace access will be restricted after a 3-day grace period. You will receive email notifications to update your payment method via the Razorpay dashboard.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 3. Cancellation & Refunds */}
            <section id="cancellation" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <RefreshCw className="w-5 h-5 text-[#00C2FF]" />
                3. Cancellation &amp; Refund Policy
              </h2>
              <p>
                You may cancel your subscription at any time — no questions asked.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cancel during trial:</strong> Cancel before day 15 and you will never be charged beyond the ₹1 mandate authorization. The ₹1 is non-refundable as it covers payment gateway processing costs.</li>
                <li><strong>Cancel after first billing:</strong> Your access continues until the end of the paid billing cycle. No prorated refunds are issued for partial months.</li>
                <li><strong>How to cancel:</strong> Log in to your Razorpay dashboard and cancel the active mandate, or contact us at <a href="mailto:support@nexdial.io" className="text-[#00C2FF] hover:underline">support@nexdial.io</a> and we will process cancellation within 24 hours.</li>
              </ul>
              <div className="p-4 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex gap-3 items-start text-xs text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                <span>We do not lock you in. Cancel anytime from your Razorpay dashboard or by emailing support. No hidden fees, no cancellation penalty.</span>
              </div>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 4. Acceptable Use */}
            <section id="acceptable-use" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                4. Acceptable Use Policy
              </h2>
              <p>You agree not to use NexDial to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send unsolicited bulk messages (spam) via WhatsApp or email to contacts who have not opted in.</li>
                <li>Store, process, or transmit any unlawful, defamatory, or fraudulent content.</li>
                <li>Impersonate any person or entity or falsely represent your business identity.</li>
                <li>Attempt to reverse-engineer, copy, scrape, or clone any part of the NexDial platform.</li>
                <li>Use the platform to conduct illegal business activities under Indian law.</li>
                <li>Share your account credentials with unauthorized parties outside your registered organization.</li>
              </ul>
              <p>
                Violation of this policy may result in immediate account suspension without refund and, where applicable, reporting to relevant authorities.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 5. WhatsApp Business Rules */}
            <section id="whatsapp" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <MessageSquare className="w-5 h-5 text-[#00C2FF]" />
                5. WhatsApp Business Usage Rules
              </h2>
              <p>
                NexDial integrates with the WhatsApp Business API. By using the WhatsApp channel features, you additionally agree to comply with <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">Meta's WhatsApp Business Policy</a> and <a href="https://www.whatsapp.com/legal/commerce-policy/" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">Commerce Policy</a>.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must only message contacts who have explicitly opted in to receive messages from your business.</li>
                <li>Message templates must be pre-approved by Meta/WhatsApp before use in bulk campaigns.</li>
                <li>You are responsible for your own WhatsApp Business Account (WABA) compliance. NexDial is not liable for account bans or restrictions imposed by Meta.</li>
                <li>NexDial does not store the content of WhatsApp messages beyond what is necessary to display your conversation history in the inbox.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 6. Intellectual Property */}
            <section id="intellectual-property" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                6. Intellectual Property &amp; Licenses
              </h2>
              <p>
                NexDial retains all intellectual property rights in the platform, including but not limited to the software, UI/UX design, CRM database schema, AI lead-scoring algorithms, and branding. The NexDial name, logo, and product names are trademarks of NexDial Technologies.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business operations. Your data (leads, contacts, pipeline records, call logs) remains your property. We do not claim ownership over your business data.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 7. Liability & Indemnity */}
            <section id="liability" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <AlertCircle className="w-5 h-5 text-[#00C2FF]" />
                7. Limitation of Liability &amp; Indemnification
              </h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEXDIAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF BUSINESS DATA, REVENUE, OR PROFITS.
              </p>
              <p>
                Our total aggregate liability for any claim arising out of or related to these Terms or the Service shall not exceed the amount you paid to NexDial in the 3 months preceding the event giving rise to the claim.
              </p>
              <p>
                You agree to indemnify and hold harmless NexDial, its directors, employees, and agents from any claims, damages, or expenses (including legal fees) arising out of your use of the Service, your violation of these Terms, or your violation of any third-party rights.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 8. Governing Law */}
            <section id="governing-law" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                8. Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved amicably. If unresolved within 30 days, disputes shall be referred to arbitration in Pune, Maharashtra, under the Arbitration and Conciliation Act, 1996. The courts of Pune, Maharashtra shall have exclusive jurisdiction.
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2 text-xs mt-4">
                <p className="font-bold text-white">NexDial Support &amp; Legal</p>
                <p className="text-slate-400">Email: <a href="mailto:support@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">support@nexdial.io</a></p>
                <p className="text-slate-400">For billing disputes: <a href="mailto:billing@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">billing@nexdial.io</a></p>
                <p className="text-slate-400">India — Maharashtra</p>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
