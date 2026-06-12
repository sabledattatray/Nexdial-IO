"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

const clientTypes = [
  "Real Estate Agencies", "Marketing Agencies", "Education Consultants", "Healthcare Clinics",
  "Insurance Brokers", "Legal Firms", "Travel Agencies", "Event Planners",
  "Auto Dealers", "Fitness Studios", "Home Services", "Financial Advisors",
  "SaaS Companies", "E-Commerce Stores", "Recruitment Firms",
];

const trustBadges = [
  { name: "1,000+ Businesses", color: "#0057D9" },
  { name: "4.8★ Rating", color: "#F59E0B" },
  { name: "99.9% Uptime", color: "#00E5A0" },
  { name: "GDPR Compliant", color: "#8B5CF6" },
];

export function TrustIndicators() {
  const controls = useAnimation();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 18 : 30;

    controls.start({
      x: ["0%", "-50%"],
      transition: { duration, repeat: Infinity, ease: "linear" },
    });
  }, [controls]);

  return (
    <section className="relative py-16 border-y border-white/[0.03] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-medium text-[#64748B] uppercase tracking-widest">
            Trusted by 1,000+ small businesses across industries
          </p>
        </AnimatedSection>

        {/* Industry Carousel */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#081120] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#081120] to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              animate={controls}
              className="flex gap-8 sm:gap-16 items-center whitespace-nowrap"
            >
              {[...clientTypes, ...clientTypes].map((label, i) => (
                <div
                  key={`${label}-${i}`}
                  className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all cursor-pointer group"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#475569] group-hover:text-[#94A3B8] transition-colors tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-default"
            >
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: badge.color }}
              />
              <span className="text-xs font-medium text-[#94A3B8]">{badge.name}</span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
