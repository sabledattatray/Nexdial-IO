"use client";

import { AnimatedSection } from "@/components/animations/AnimatedSection";

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 space-y-6 text-white text-xs">
        <AnimatedSection>
          <h1 className="text-3xl font-extrabold mb-4">Security Policy</h1>
          <p className="text-[#64748B] mb-2">Last Updated: June 2026</p>
          <p className="text-[#94A3B8] leading-relaxed">
            DBS Mintek implements robust physical, administrative, and technical controls to maintain peak data integrity and compliance status.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-base font-bold mb-2">1. Encryption Policies</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            All calls, text messages, database keys, and transaction logs are encrypted in transit via TLS 1.3 and at rest with hardware AES-256 modules.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h2 className="text-base font-bold mb-2">2. Vulnerability Management</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            We undergo quarterly penetration tests and maintain automated rate limiting, threat monitoring dashboards, and dedicated firewall rules on Microsoft Azure.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
