"use client";

import { AnimatedSection } from "@/components/animations/AnimatedSection";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 space-y-6 text-white text-xs">
        <AnimatedSection>
          <h1 className="text-3xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-[#64748B] mb-2">Last Updated: June 2026</p>
          <p className="text-[#94A3B8] leading-relaxed">
            Welcome to DBS Mintek. By accessing our platform administration consoles, dialers, or CRM modules, you agree to comply with our usage guidelines.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h2 className="text-base font-bold mb-2">1. Use License</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Permission is granted to provision tenant profiles and run calling campaigns in accordance with your subscription SLA. Automated outbound campaigns must scrub numbers against local DNC lists to comply with FCC regulations.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h2 className="text-base font-bold mb-2">2. Billing & Subscription</h2>
          <p className="text-[#94A3B8] leading-relaxed">
            Billing cycles are processed monthly or annually. Taxes, custom domain server allocations, and carrier telephony minutes are billed dynamically based on actual usage.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
