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
    { id: "billing",          label: "2. Project Fees & Retainers" },
    { id: "cancellation",     label: "3. Cancellation & Delivery" },
    { id: "acceptable-use",   label: "4. Acceptable Use" },
    { id: "confidentiality",  label: "5. Data Handling & Confidentiality" },
    { id: "intellectual-property", label: "6. Intellectual Property" },
    { id: "liability",        label: "7. Liability & Indemnity" },
    { id: "governing-law",    label: "8. Governing Law & Disputes" },
  ];

  useEffect(() => {
    const handleScrollAndPos = () => {
      // 1. Position Logic
      if (placeholderRef.current) {
        setSidebarLeft(placeholderRef.current.getBoundingClientRect().left);
      }

      if (placeholderRef.current && gridRef.current && sidebarRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        
        const absoluteGridTop = gridRect.top + window.scrollY;
        const absoluteGridBottom = gridRect.bottom + window.scrollY;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        
        let desiredTop = absoluteGridTop - window.scrollY;
        
        // Pin to top underneath navbar
        if (desiredTop < 112) {
          desiredTop = 112;
        }
        
        // Clamp at footer
        const gap = 24;
        const absoluteSidebarBottom = window.scrollY + desiredTop + sidebarHeight;
        if (absoluteSidebarBottom + gap > absoluteGridBottom) {
          desiredTop = (absoluteGridBottom - gap - sidebarHeight) - window.scrollY;
        }
        
        setComputedTop(desiredTop);
      }

      // 2. Active Section Logic
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

    handleScrollAndPos();
    const timeoutId = setTimeout(handleScrollAndPos, 150);

    window.addEventListener("resize", handleScrollAndPos);
    window.addEventListener("scroll", handleScrollAndPos);
    
    const observer = new ResizeObserver(handleScrollAndPos);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleScrollAndPos);
      window.removeEventListener("scroll", handleScrollAndPos);
      observer.disconnect();
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
            These Terms of Service govern your use of NexDial — a Data, Excel, and Business Automation service provider. By engaging our services, you agree to these terms.
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
                By engaging NexDial for custom dashboards, data cleaning, VBA macros, or BI solutions ("the Service"), you ("Client" or "Business") agree to be bound by these Terms.
              </p>
              <p>
                We reserve the right to update, modify, or discontinue any feature of our service model with reasonable notice.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 2. Project Fees & Retainers */}
            <section id="billing" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <CreditCard className="w-5 h-5 text-[#00C2FF]" />
                2. Project Fees &amp; Retainers
              </h2>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">Fixed-Fee Projects</h3>
              <p>
                For custom dashboard development and data automation tools, we charge a fixed project fee. Typically, 50% is due upfront to commence work, and 50% is due upon final delivery and acceptance.
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">Monthly Retainers</h3>
              <p>
                For ongoing MIS reporting and BI maintenance, we offer monthly retainers. Retainers are billed at the beginning of each calendar month.
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">Late Payments</h3>
              <p>
                Invoices are due within 15 days of receipt. Late payments may result in a suspension of ongoing services and support until the balance is cleared.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 3. Cancellation & Delivery */}
            <section id="cancellation" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <RefreshCw className="w-5 h-5 text-[#00C2FF]" />
                3. Cancellation &amp; Delivery Policy
              </h2>
              <p>
                You may cancel a monthly retainer with 30 days written notice.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Project Cancellation:</strong> If a fixed-fee project is cancelled by the client before completion, NexDial retains the upfront deposit to cover hours worked.</li>
                <li><strong>Delivery Revisions:</strong> Fixed-fee projects include a specified number of revision rounds. Additional scope changes will be billed at an hourly rate.</li>
                <li><strong>Refunds:</strong> Due to the custom nature of our data engineering work, payments are non-refundable once work has commenced.</li>
              </ul>
              <div className="p-4 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex gap-3 items-start text-xs text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                <span>We pride ourselves on delivery. If the final tool does not meet the agreed-upon technical specifications, we will fix it at no additional cost.</span>
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
                <li>Provide false or misleading data files that result in legal liability.</li>
                <li>Request automation tools designed to conduct unlawful activities (e.g., unauthorized data scraping).</li>
                <li>Resell our custom tools as your own SaaS product without a white-label agreement.</li>
              </ul>
              <p>
                Violation of this policy may result in immediate account suspension without refund and, where applicable, reporting to relevant authorities.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 5. Data Handling & Confidentiality */}
            <section id="confidentiality" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <MessageSquare className="w-5 h-5 text-[#00C2FF]" />
                5. Data Handling &amp; Confidentiality
              </h2>
              <p>
                We understand that we process your highly sensitive business data.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We treat all client data as strictly confidential and are happy to sign custom Non-Disclosure Agreements (NDAs).</li>
                <li>We will never share, sell, or distribute your raw data, reports, or business models to third parties.</li>
                <li>We securely delete client source files 30 days after project completion, unless an ongoing retainer requires data retention.</li>
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
                NexDial retains intellectual property rights to the underlying macro code, automation scripts, and BI templates we develop, unless a specific "Work for Hire" buyout is agreed upon.
              </p>
              <p>
                You are granted a perpetual, non-exclusive license to use the delivered tools internally. You own 100% of the data processed by these tools.
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
