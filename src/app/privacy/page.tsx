"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Shield, Lock, Eye, FileText, CheckCircle2, ChevronRight, Database, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const placeholderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);
  const [sidebarTop, setSidebarTop] = useState<number>(112);
  const [computedTop, setComputedTop] = useState<number>(112);

  const sections = [
    { id: "introduction",    label: "1. Who We Are & Scope" },
    { id: "data-collection", label: "2. What We Collect" },
    { id: "data-usage",      label: "3. How We Use Your Data" },
    { id: "data-sharing",    label: "4. Who We Share Data With" },
    { id: "storage",         label: "5. Data Storage & Security" },
    { id: "retention",       label: "6. Retention & Deletion" },
    { id: "user-rights",     label: "7. Your Rights" },
    { id: "contact",         label: "8. Contact Us" },
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
            <Shield className="w-3.5 h-3.5" />
            Privacy &amp; Data Policy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            NexDial is committed to protecting your personal data and your customers&apos; data. This policy explains what we collect, why we collect it, and how we keep it safe — in plain language, without legal jargon.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-[#64748B] font-mono">
            <span>DOCUMENT ID: NEXDIAL-PRV-2026-V1</span>
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
              <Link href="/terms" className="text-xs text-[#00C2FF] hover:underline flex items-center gap-1">
                <FileText className="w-3 h-3" /> Terms of Service →
              </Link>
            </div>
          </aside>
          )}

          {/* Right Policy Content */}
          <div className="glass-card-strong p-6 sm:p-10 lg:p-12 border border-white/[0.06] rounded-3xl max-w-4xl text-[#CBD5E1] text-xs sm:text-sm font-light leading-relaxed space-y-10">

            {/* 1. Introduction */}
            <section id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                1. Who We Are &amp; Scope of This Policy
              </h2>
              <p>
                NexDial (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a B2B Data, Excel, and Business Automation service provider designed for businesses globally. We provide custom dashboarding, automated reporting, data cleaning, and BI solutions.
              </p>
              <p>
                This Privacy Policy applies to all users of NexDial — including clients who engage our services (&quot;Clients&quot;), their team members, and the data processed on their behalf. It covers all data processed through our website, forms, and tools.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#00E5A0]/20 flex gap-3 items-start text-xs text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                <span>By using NexDial, you agree to the data practices described in this policy. If you do not agree, please do not use the Service.</span>
              </div>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 2. What We Collect */}
            <section id="data-collection" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Eye className="w-5 h-5 text-[#00C2FF]" />
                2. What Data We Collect
              </h2>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-2">A. Account & Profile Data</h3>
              <p>When you sign up, we collect:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Full name, work email address, mobile number</li>
                <li>Company name, business type, industry, company size</li>
                <li>Job title, time zone, business location</li>
                <li>Profile avatar (if uploaded)</li>
                <li>Google OAuth profile data (if you sign in with Google)</li>
              </ul>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">B. Project & Requirement Data</h3>
              <p>During initial consultation and onboarding we collect:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Business goals, pain points, and process bottlenecks</li>
                <li>Sample data formats and structures</li>
                <li>Current software stack details</li>
                <li>Reporting preferences and KPIs</li>
              </ul>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">C. Client Data Processing</h3>
              <p>
                Data you securely share with us for processing, cleaning, or dashboarding:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Raw Excel, CSV, or database exports</li>
                <li>System-generated reports</li>
                <li>Confidential business metrics</li>
                <li>We process this data strictly within secure environments as per Non-Disclosure Agreements (NDAs).</li>
              </ul>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">D. Payment & Billing Data</h3>
              <p>
                We do <strong>not</strong> store your card number, bank account details, or UPI credentials. All payment processing is handled by <strong>Razorpay</strong> (PCI-DSS compliant). We only store:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Razorpay Order ID and Payment ID (for verification and receipts)</li>
                <li>Mandate status and subscription plan</li>
                <li>Billing history (plan, amount, date)</li>
              </ul>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">E. Technical & Usage Data</h3>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>IP address, browser type, device information</li>
                <li>Pages visited, features used, session duration</li>
                <li>Error logs and crash reports (for debugging)</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 3. How We Use Data */}
            <section id="data-usage" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00C2FF]" />
                3. How We Use Your Data
              </h2>
              <p>We use your data strictly to provide and improve the NexDial service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Deliver the Service:</strong> Build and deliver custom automated solutions, dashboards, and reports.</li>
                <li><strong>Authentication:</strong> Verify your identity on login to our client portal (if applicable).</li>
                <li><strong>Billing:</strong> Process payments for our services securely via Razorpay or bank transfer.</li>
                <li><strong>Communication:</strong> Send you project updates, delivery files, and meeting invitations.</li>
                <li><strong>Support:</strong> Respond to your requests and troubleshoot deployed tools.</li>
                <li><strong>Product Improvement:</strong> Analyze aggregated usage to improve our service offerings.</li>
              </ul>
              <p>We do <strong>not</strong> use your data for advertising, profiling for third-party marketing, or selling to data brokers.</p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 4. Third-Party Sharing */}
            <section id="data-sharing" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Globe className="w-5 h-5 text-[#00C2FF]" />
                4. Who We Share Your Data With
              </h2>
              <p>
                We do not sell or rent your data. We share data only with trusted service providers who help operate NexDial, under strict data processing agreements:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Cloud Storage:</strong> Your project files and data are stored in secure cloud environments (e.g., AWS, Microsoft Azure, Google Cloud) with strict access controls.
                </li>
                <li>
                  <strong>Razorpay (Payments):</strong> Payment processing. Razorpay is PCI-DSS Level 1 certified. We share only the minimum data required.
                </li>
                <li>
                  <strong>Microsoft/Google (OAuth):</strong> If you use &quot;Sign in with Google/Microsoft,&quot; standard OAuth data is shared.
                </li>
                <li>
                  <strong>Vercel (Hosting):</strong> Our application is deployed on Vercel&apos;s edge network.
                </li>
              </ul>
              <p>We disclose data to authorities only if required by law, court order, or to protect NexDial from fraud.</p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 5. Data Storage & Security */}
            <section id="storage" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Database className="w-5 h-5 text-[#00C2FF]" />
                5. Data Storage &amp; Security
              </h2>
              <p>
                All NexDial data is stored in India or AWS ap-southeast-1 (Singapore) region. We implement the following security measures:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption in Transit:</strong> All data between your browser and NexDial servers is encrypted via HTTPS/TLS 1.3.</li>
                <li><strong>Encryption at Rest:</strong> Client data files are encrypted at rest using industry-standard protocols.</li>
                <li><strong>Password Security:</strong> Passwords are hashed using bcrypt.</li>
                <li><strong>Access Control:</strong> Strict internal access policies ensure only authorized analysts can view your specific project data.</li>
                <li><strong>No Card Storage:</strong> We never store your payment card details.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 6. Retention & Deletion */}
            <section id="retention" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00C2FF]" />
                6. Data Retention &amp; Deletion
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Active Projects:</strong> Your data is retained securely for the duration of the project or ongoing retainer.</li>
                <li><strong>Post-Delivery:</strong> We retain project data for 30 days after final delivery for revisions, after which raw client data is permanently deleted unless a specific archival agreement is in place.</li>
                <li><strong>Inquiries:</strong> Information from contact forms is kept to maintain communication history.</li>
                <li><strong>Activity logs:</strong> Retained for debugging and security purposes, then purged.</li>
                <li><strong>Billing records:</strong> Invoices and payment references are retained for 7 years as required by regulations.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 7. Your Rights */}
            <section id="user-rights" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Eye className="w-5 h-5 text-[#00C2FF]" />
                7. Your Data Rights
              </h2>
              <p>
                Under Indian IT Act and global best practices, you have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of all personal data we hold about you.</li>
                <li><strong>Correction:</strong> Update or correct inaccurate data by emailing us.</li>
                <li><strong>Deletion:</strong> Request full deletion of your project data from our active systems.</li>
                <li><strong>Withdraw Consent:</strong> Cancel your ongoing retainer at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:privacy@nexdial.io" className="text-[#00C2FF] hover:underline">privacy@nexdial.io</a>. We will respond within 7 business days.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 8. Contact */}
            <section id="contact" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Mail className="w-5 h-5 text-[#00C2FF]" />
                8. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests about this Privacy Policy or how your data is handled, please contact us:
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2 text-xs">
                <p className="font-bold text-white">NexDial Data &amp; Privacy Team</p>
                <p className="text-slate-400">General Support: <a href="mailto:support@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">support@nexdial.io</a></p>
                <p className="text-slate-400">Privacy Requests: <a href="mailto:privacy@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">privacy@nexdial.io</a></p>
                <p className="text-slate-400">Billing Queries: <a href="mailto:billing@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">billing@nexdial.io</a></p>
                <p className="text-slate-400">Location: India — Maharashtra</p>
              </div>
              <p className="text-xs text-[#64748B]">
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice in your NexDial dashboard.
              </p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
