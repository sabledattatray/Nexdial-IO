"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

const clientLogos = [
  "Microsoft", "Amazon", "Google", "Salesforce", "HubSpot",
  "Oracle", "SAP", "IBM", "Cisco", "Adobe",
  "Twilio", "Zendesk", "ServiceNow", "Freshworks", "Zoho",
];

const certifications = [
  { name: "SOC2 Type II", color: "#0057D9" },
  { name: "ISO 27001", color: "#00C2FF" },
  { name: "GDPR", color: "#00E5A0" },
  { name: "HIPAA", color: "#8B5CF6" },
  { name: "PCI DSS", color: "#F59E0B" },
];

export function TrustIndicators() {
  return (
    <section className="relative py-16 border-y border-white/[0.03] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-medium text-[#64748B] uppercase tracking-widest">
            Trusted by 500+ enterprises worldwide
          </p>
        </AnimatedSection>

        {/* Logo Carousel */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#081120] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#081120] to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 items-center whitespace-nowrap"
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all cursor-pointer group"
                >
                  <span className="text-sm font-semibold text-[#475569] group-hover:text-[#94A3B8] transition-colors tracking-wide">
                    {logo}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-center gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-default"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cert.color }}
              />
              <span className="text-xs font-medium text-[#94A3B8]">{cert.name}</span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
