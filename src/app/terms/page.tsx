"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Shield, BookOpen, AlertCircle, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("agreement");

  const sections = [
    { id: "agreement", label: "1. Agreement & Services" },
    { id: "accounts-billing", label: "2. Accounts & Billing" },
    { id: "acceptable-use", label: "3. Acceptable Use & DNC" },
    { id: "telephony-sms", label: "4. Telephony & SMS Rules" },
    { id: "sla-uptime", label: "5. SLA & Support Uptime" },
    { id: "intellectual-property", label: "6. Proprietary Software" },
    { id: "liability", label: "7. Liability & Indemnity" },
    { id: "governing-law", label: "8. Dispute & Governing Law" },
  ];

  useEffect(() => {
    const handleScroll = () => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
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
            Terms & <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            These Terms of Service govern your organization’s deployment and administrative usage of the Nexdial Contact Center Operating System, virtual agent nodes, and outbound dialers.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-[#64748B] font-mono">
            <span>DOCUMENT ID: CCOS-TOS-2026-V4</span>
            <span>•</span>
            <span>LAST UPDATED: JUNE 09, 2026</span>
          </div>
        </AnimatedSection>

        {/* Content Body Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          
          {/* Left Sticky Sidebar (Table of Contents) */}
          <aside className="hidden lg:block sticky top-28 bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-md">
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
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeSection === section.id ? "translate-x-0.5" : "opacity-0"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Scrollable Policy Content (Unified Document Card) */}
          <div className="glass-card-strong p-6 sm:p-10 lg:p-12 border border-white/[0.06] rounded-3xl max-w-4xl text-[#CBD5E1] text-xs sm:text-sm font-light leading-relaxed space-y-10">
            
            {/* 1. Agreement & Services */}
            <section id="agreement" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                1. Agreement & Services
              </h2>
              <p>
                By provisioning an organization tenant, registering credentials, or accessing the administration cockpit of Nexdial, you agree to bind your company and agents to this Agreement.
              </p>
              <p>
                We agree to deliver access to our cloud-hosted suite including Predictive Dialers, CRM pipelines, Speech-to-Text equalizers, and multi-tenant billing panels. We reserve the right to alter, update, or patch software parameters to maintain platform security and performance standards.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 2. Accounts & Billing */}
            <section id="accounts-billing" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <AlertCircle className="w-5 h-5 text-[#00C2FF]" />
                2. Accounts, Seats & Billing
              </h2>
              <p>
                To utilize the services, you must purchase subscription seats for your agents and deposit pre-paid calling credits to cover SIP telephony minute outlays:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Seat Subscriptions:</strong> Billed monthly or annually as per your designated contract tier. Accounts are restricted to a single human user per seat.</li>
                <li><strong>Telephony Minute Outlays:</strong> Billed dynamically against your pre-paid credit balance. Rates depend on call duration, destination carrier grids, and voice AI transcription features.</li>
                <li><strong>Late Payments:</strong> Accounts with negative credit balances or overdue seat invoices may experience automated temporary dialer pipeline pausing until accounts are cleared.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 3. Acceptable Use & DNC */}
            <section id="acceptable-use" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                3. Acceptable Use & DNC compliance
              </h2>
              <p>
                Nexdial provides powerful high-velocity telephony routing engines. Tenants are solely responsible for compliance with regional dialing, telesales, and consumer protection laws:
              </p>
              <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 space-y-2 text-xs">
                <p className="font-bold text-[#EF4444] flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> TCPA, FCC & DNC REGULATORY COMPLIANCE IS MANDATORY
                </p>
                <p className="text-slate-300">
                  Outbound campaigns must scrub destination contact lists against regional Do-Not-Call (DNC) registries. You represent and warrant that your lists are fully scrubbed, and that your campaigns comply with the Telephone Consumer Protection Act (TCPA), Federal Communications Commission (FCC) guidelines, and other regional laws.
                </p>
              </div>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 4. Telephony & SMS Rules */}
            <section id="telephony-sms" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                4. Telephony & SMS Rules
              </h2>
              <p>
                Tenants are prohibited from utilizing Nexdial to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Spoof caller ID headers or transmit false network tracking parameters.</li>
                <li>Initiate unauthorized political calls, spam messaging campaigns, or pre-recorded marketing sweeps without explicit opt-in.</li>
                <li>Operate arbitrary scanning loops designed to tie up telecom carrier trunks or test credit card numbers.</li>
                <li>Exceed typical conversational CPS (Calls Per Second) limits on outbound trunk ports.</li>
              </ul>
              <p>
                Violation of these rules may trigger immediate SIP gateway shutdown and account termination without refund.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 5. SLA & Support Uptime */}
            <section id="sla-uptime" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2FF]" />
                5. Service Level Agreement (SLA)
              </h2>
              <p>
                We target a 99.9% uptime metric for our hosted dialer engines and database services, excluding scheduled maintenance windows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Maintenance:</strong> Pushed during low-volume hours (typically Sunday 02:00–04:00 IST). Administrators receive 48-hour alerts.</li>
                <li><strong>Credits:</strong> If uptime falls below 99.9% in a given month, tenants may request credit adjustments to their seat invoices in accordance with their signed SLA schedule.</li>
                <li><strong>Carrier Outages:</strong> Outages caused by upstream SIP providers, internet network routes, or local ISP networks are outside our scope and do not count toward SLA calculations.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 6. Proprietary Software */}
            <section id="intellectual-property" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                6. Proprietary Software & Licenses
              </h2>
              <p>
                Nexdial retains all intellectual property rights in the software platform, CRM source layouts, database schemas, and AI speech classification neural networks.
              </p>
              <p>
                You are granted a non-exclusive, non-transferable, revocable license to access the dashboards for business operations. You may not decompile, copy, reverse engineer, or sell elements of the platform without our written consent.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 7. Liability & Indemnity */}
            <section id="liability" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <AlertCircle className="w-5 h-5 text-[#00C2FF]" />
                7. Limitation of Liability & Indemnification
              </h2>
              <p>
                IN NO EVENT WILL Nexdial® BE LIABLE FOR ANY INDIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF REVENUE, DATA COMPROMISE, OR TELECOM INVOICING DISPUTES.
              </p>
              <p>
                Tenants shall indemnify, defend, and hold harmless Nexdial from and against any claims, losses, fines, or liabilities arising from the tenant&apos;s campaigns, regulatory TCPA/FCC violations, or caller list sourcing disputes.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 8. Dispute & Governing Law */}
            <section id="governing-law" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                8. Dispute & Governing Law
              </h2>
              <p>
                This Agreement is governed by and construed in accordance with the laws of India. Any disputes arising under this Agreement shall be referred to arbitration in Mumbai, Maharashtra, in accordance with the Arbitration and Conciliation Act, 1996. The courts of Mumbai shall have exclusive jurisdiction.
              </p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
