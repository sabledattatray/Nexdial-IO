"use client";

import { AnimatedSection } from "@/components/animations/AnimatedSection";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 space-y-6 text-white text-xs">
        <AnimatedSection>
          <h1 className="text-3xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-[#64748B] mb-2">Last Updated: June 2026</p>
          <p className="text-[#94A3B8] leading-relaxed">
            DBS Mintek is committed to protecting the privacy of our clients and their customers. This policy details how we handle information processed across our SaaS platforms and BPO services.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-base font-bold mb-2">1. Information We Collect</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            We collect login credentials, business names, custom domain mapping profiles, voice audio streams, chat histories, and platform analytics necessary to optimize dialer campaigns and CRM workflows.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h2 className="text-base font-bold mb-2">2. Data Security & Sovereignty</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            All data processed is encrypted in transit via TLS and at rest using AES-256 standards. Staging environments and tenant data centers comply with HIPAA, SOC2 Type II, and GDPR requirements.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
