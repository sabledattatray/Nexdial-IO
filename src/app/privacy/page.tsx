"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Shield, Lock, Eye, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "1. Introduction & Scope" },
    { id: "data-collection", label: "2. Information We Collect" },
    { id: "data-usage", label: "3. How We Use Data" },
    { id: "compliance-gdpr", label: "4. GDPR & HIPAA Sovereignty" },
    { id: "data-sharing", label: "5. Third-Party Disclosures" },
    { id: "retention", label: "6. Data Retention & Disposal" },
    { id: "user-rights", label: "7. Your Rights & Access" },
    { id: "contact", label: "8. Contact & Officer" },
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
            <Shield className="w-3.5 h-3.5" />
            Compliance & Privacy Desk
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            Nexdial is committed to maintaining the highest security, data isolation, and confidentiality standards. This policy governs data processing across our multi-tenant SaaS portals, predictive dialer clusters, BPO services, and AI voice copilots.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-[#64748B] font-mono">
            <span>DOCUMENT ID: CCOS-PRV-2026-V4</span>
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
            
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                1. Introduction & Scope
              </h2>
              <p>
                Nexdial (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides a multi-tenant cloud-native Contact Center Operating System, Voice AI virtual agents, CRM integration adapters, and specialized Business Process Outsourcing (BPO) solutions.
              </p>
              <p>
                This Privacy Policy describes how we collect, use, process, and secure user credentials, tenant databases, telephony call details, and audio data. It applies to all platforms hosted under our domains (including <code>*.nexdial.com</code>), administrative dashboards, agent softphone consoles, and client reporting terminals.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[#00E5A0]/20 flex gap-3 items-start text-xs text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                <span>By provisioning tenant credentials or using the platform channels, you acknowledge data mapping practices in accordance with GDPR, HIPAA, and regional telecom rules.</span>
              </div>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 2. Information We Collect */}
            <section id="data-collection" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Eye className="w-5 h-5 text-[#00C2FF]" />
                2. Information We Collect
              </h2>
              <p>
                To deliver enterprise-grade predictive dialing and AI quality scoring, we collect three distinct tiers of data:
              </p>
              
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">A. Tenant Configuration & Profile Data</h3>
              <p>
                This includes corporate organization details, business mailing addresses, SIP trunk gateway credentials, payment tokens (managed securely via Stripe), custom subdomain parameters, and employee login profiles (roles, names, and emails).
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider">B. Telephony Logs & CRM Records</h3>
              <p>
                In the course of campaigns, we process Call Detail Records (CDRs) containing timestamp markers, destination telephone numbers, trunk route carriers, connection durations, call dispositions (AMD classifications), and lead information (names, emails, account IDs, and balance parameters).
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider">C. Audio Streams & AI Transcriptions</h3>
              <p>
                We capture live WebRTC audio streams, telephone voice recordings (WAV/MP3 files for audit and QA scoring), and real-time speech-to-text transcriptions generated by our conversational AI engines.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 3. How We Use Data */}
            <section id="data-usage" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00C2FF]" />
                3. How We Use Data
              </h2>
              <p>
                Our processing of tenant data is governed strictly by service agreements. We use collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Route telephony packets, manage SIP audio streams, and trigger predictive dialing queues.</li>
                <li>Generate real-time AI transcription prompts, live whispering responses, and QA scoring matrices.</li>
                <li>Process billing, compute telecom minute outlays, and monitor usage limits.</li>
                <li>Compile analytical reports, SVG data frequency charts, and tenant logs.</li>
                <li>Prevent fraudulent calls, secure API endpoints, and monitor system health indicators.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 4. Compliance, GDPR & HIPAA */}
            <section id="compliance-gdpr" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                4. GDPR & HIPAA Sovereignty
              </h2>
              <p>
                Nexdial provides standard regulatory assurances to satisfy security and privacy rules globally:
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mt-4">HIPAA & Healthcare Data</h3>
              <p>
                For tenants operating in healthcare and medical sectors, we establish Business Associate Agreements (BAAs). Data fields are configured to support automatic scrubbing of Protected Health Information (PHI) from log indexes, and recordings are encrypted with tenant-specific hardware keys.
              </p>

              <h3 className="text-white font-semibold text-xs uppercase tracking-wider">GDPR & Sovereignty</h3>
              <p>
                We maintain isolated database zones and storage clusters. European Union (EU) tenant records are stored strictly within designated European data centers (Azure/AWS) and do not cross international borders without authorized transfer safeguards.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 5. Third-Party Disclosures */}
            <section id="data-sharing" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <FileText className="w-5 h-5 text-[#00C2FF]" />
                5. Third-Party Disclosures
              </h2>
              <p>
                We do not sell, rent, or trade client directories or voice records. Information is shared only with authorized partners necessary to operate core features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Telephony Carriers:</strong> Standard SIP carriers (e.g., Twilio, Exotel) receive outbound phone numbers to establish VoIP routing lines.</li>
                <li><strong>AI Models:</strong> Real-time audio segments may be processed via secure API endpoints of cognitive partners (e.g., OpenAI, Microsoft Azure AI) under strictly non-training contracts where data is deleted post-inference.</li>
                <li><strong>Payment Processors:</strong> Credit card invoicing and recurring subscriptions are processed securely by Stripe under PCI-DSS compliance.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 6. Data Retention & Disposal */}
            <section id="retention" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00C2FF]" />
                6. Data Retention & Disposal
              </h2>
              <p>
                We retain tenant data for the duration of the active subscription period, or in accordance with custom compliance rules set by the tenant administrator:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Call Recordings:</strong> Retained for 90 days by default, after which they are permanently deleted or archived to cold storage based on your selected tier.</li>
                <li><strong>Telephony Transcripts:</strong> Purged from active indexes within 30 days unless pinned to specific CRM customer tickets.</li>
                <li><strong>System Logs:</strong> Stored for 365 days to support compliance audits and security tracking.</li>
              </ul>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 7. Your Rights & Access */}
            <section id="user-rights" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Eye className="w-5 h-5 text-[#00C2FF]" />
                7. Your Rights & Access
              </h2>
              <p>
                Depending on your location, you have rights to access, correct, port, or request deletion of your personal data processed by our systems. Super administrators can export complete contact lists, billing receipts, and CDR tables directly from the Admin Console at any time.
              </p>
              <p>
                If you are a customer of one of our tenants (e.g. a consumer called during an outreach campaign), you should contact that organization directly to exercise your privacy rights, as Nexdial processes that data solely as a service processor under their instruction.
              </p>
            </section>

            <div className="h-px bg-white/[0.06]" />

            {/* 8. Contact & Officer */}
            <section id="contact" className="space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00C2FF]" />
                8. Contact & Data Officer
              </h2>
              <p>
                For questions about our security controls, SOC2 audit sheets, or to submit data deletion requests, contact our legal and data protection team:
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2 text-xs">
                <p className="font-bold text-white">Nexdial Data Protection Office</p>
                <p className="text-slate-400">Email: <a href="mailto:info@nexdial.io" className="text-[#00E5A0] hover:text-[#00C2FF] transition-colors">info@nexdial.io</a></p>
                <p className="text-slate-400">Head Office: 123 Innovation Boulevard, Tech District, San Francisco, CA 94105</p>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
