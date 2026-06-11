"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Shield, Lock, Server, Eye, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "1. Security Overview" },
    { id: "data-encryption", label: "2. Encryption & Keys" },
    { id: "network-telephony", label: "3. VoIP & WebRTC Security" },
    { id: "tenant-isolation", label: "4. Database & Pod Isolation" },
    { id: "access-rbac", label: "5. RBAC & SSO Access" },
    { id: "backups-dr", label: "6. Business Continuity" },
    { id: "compliance-cert", label: "7. Audits & Certifications" },
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
          <span className="text-xs font-semibold text-[#00E5A0] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center gap-2 w-fit">
            <Lock className="w-3.5 h-3.5" />
            Security & Controls Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Security <span className="gradient-text">Architecture</span>
          </h1>
          <p className="text-[#94A3B8] text-base mt-4">
            At Nexdial, our security architecture is designed to protect multi-tenant cloud databases, VoIP signaling streams, and CRM client profiles with bank-grade encryption controls.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xs text-[#64748B] font-mono">
            <span>DOCUMENT ID: CCOS-SEC-2026-V4</span>
            <span>•</span>
            <span>LAST UPDATED: JUNE 09, 2026</span>
          </div>
        </AnimatedSection>

        {/* Content Body Grid */}
        <div className="grid lg:grid-cols-[280px,1fr] gap-12 items-start">
          
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
                        ? "bg-[#00E5A0]/15 text-[#00E5A0] border-l-2 border-[#00E5A0]"
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

          {/* Right Scrollable Policy Content */}
          <div className="space-y-12 max-w-4xl text-[#CBD5E1] text-xs sm:text-sm font-light leading-relaxed">
            
            {/* 1. Security Overview */}
            <section id="overview" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00E5A0]" />
                1. Security Overview
              </h2>
              <p>
                We deploy a defense-in-depth framework across our hosted services, network layers, and physical BPO offices. Our Contact Center OS has been engineered to maintain data privacy and compliance under strict regulatory bodies including SOC2, HIPAA, and GDPR.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#00E5A0]" /> SOC2 compliance
                  </h4>
                  <p className="text-xs text-[#94A3B8]">Continuous vulnerability scanning, automated alerts, and audit logs tracking configuration changes.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-[#00E5A0]" /> Isolated Clusters
                  </h4>
                  <p className="text-xs text-[#94A3B8]">Multi-tenant isolation using Docker/Kubernetes namespaces, separate Redis databases, and KMS keys.</p>
                </div>
              </div>
            </section>

            {/* 2. Encryption & Keys */}
            <section id="data-encryption" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00E5A0]" />
                2. Encryption & Keys Management
              </h2>
              <p>
                Data processed through our CRM modules and dialers is encrypted both in transit and at rest:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>In Transit:</strong> Telephony dashboards, API payloads, and WebRTC signaling sessions utilize TLS 1.3 encryption with strict HSTS policies.</li>
                <li><strong>At Rest:</strong> Physical databases, call details tables, and audio files are encrypted using hardware-accelerated AES-256 standards.</li>
                <li><strong>Key Management:</strong> We utilize Key Management Services (KMS) with automatic annual key rotation. Tenants can also configure Bring Your Own Key (BYOK) for dedicated Azure clusters.</li>
              </ul>
            </section>

            {/* 3. VoIP & WebRTC Security */}
            <section id="network-telephony" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Server className="w-5 h-5 text-[#00E5A0]" />
                3. VoIP & WebRTC Security
              </h2>
              <p>
                Traditional VoIP trunking can be vulnerable to packet sniffing. We safeguard outbound and inbound voice streams using secure protocols:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>SRTP & DTLS:</strong> Live in-browser WebRTC agent calls are encrypted using Secure Real-time Transport Protocol (SRTP) combined with Datagram Transport Layer Security (DTLS).</li>
                <li><strong>SIP Digest Authentication:</strong> SIP credentials and trunk registration protocols require strong password algorithms and IP-based firewalls.</li>
                <li><strong>Network Firewalls:</strong> Upstream carrier connections are established via secure IP tunnels (IPsec VPN) or dedicated Twilio Interconnect ports.</li>
              </ul>
            </section>

            {/* 4. Database & Pod Isolation */}
            <section id="tenant-isolation" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Eye className="w-5 h-5 text-[#00E5A0]" />
                4. Database & Namespace Isolation
              </h2>
              <p>
                Nexdial leverages a multi-tenant cloud architecture that prevents cross-tenant data leaks:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Data Separation:</strong> Each tenant organization resides in an isolated logical schema or database container. Tenant routing scripts cannot execute queries across database boundaries.</li>
                <li><strong>Container Isolation:</strong> Microservices run within separate Kubernetes namespaces with restricted pod-to-pod network policies.</li>
                <li><strong>API Protection:</strong> Every inbound gateway request is validated against JWT signatures and Tenant ID parameters.</li>
              </ul>
            </section>

            {/* 5. RBAC & SSO Access */}
            <section id="access-rbac" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Lock className="w-5 h-5 text-[#00E5A0]" />
                5. Access Controls & Audit Logging
              </h2>
              <p>
                Platform access requires authorization corresponding to tenant roles:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Role-Based Access Control (RBAC):</strong> Standard roles include Agent, Supervisor, Tenant Admin, and System Super-Admin. Access to system configurations is limited based on roles.</li>
                <li><strong>Single Sign-On (SSO):</strong> We support SAML 2.0 and OpenID Connect (OIDC) integrations (e.g. Azure AD, Okta, Google Workspace) to enforce corporate MFA policies.</li>
                <li><strong>Audit Logging:</strong> Every action taken by administrators (e.g., uploading contact CSVs, altering IVR routing nodes, downloading call recordings) is recorded in immutable compliance logs.</li>
              </ul>
            </section>

            {/* 6. Business Continuity */}
            <section id="backups-dr" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5A0]" />
                6. Business Continuity & Disaster Recovery
              </h2>
              <p>
                We maintain active-passive replica clusters in geographically separated cloud zones to provide high availability:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Database Backups:</strong> Automated daily snapshot backups are encrypted and stored in durable cloud repositories with 35-day retention.</li>
                <li><strong>Failover Recovery:</strong> Telephony gateways auto-route connections to backup SIP trunks if primary lines encounter latency spikes.</li>
                <li><strong>RTO / RPO:</strong> Our Recovery Time Objective (RTO) is &lt; 2 hours, and our Recovery Point Objective (RPO) is &lt; 15 minutes for critical transaction tables.</li>
              </ul>
            </section>

            {/* 7. Audits & Certifications */}
            <section id="compliance-cert" className="glass-card-strong p-8 rounded-3xl border border-white/[0.06] space-y-4 scroll-mt-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.04] pb-3">
                <Shield className="w-5 h-5 text-[#00E5A0]" />
                7. Audits, Certifications & Pentesting
              </h2>
              <p>
                To provide transparency, we undergo regular security audits:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Penetration Testing:</strong> Annual third-party penetration testing is performed on our API gateways, database clusters, and WebRTC signaling servers.</li>
                <li><strong>Vulnerability Management:</strong> Automated CI/CD dependency scans are run to identify code vulnerabilities before deployment.</li>
                <li><strong>Physical Security:</strong> Our Navi Mumbai HQ and branch delivery offices enforce strict access controls, including biometric scanning, CCTV, and isolated workspace restrictions.</li>
              </ul>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
