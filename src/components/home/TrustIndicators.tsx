"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { 
  Home, Megaphone, GraduationCap, Stethoscope, Shield, Scale, Compass, Calendar, 
  Car, Dumbbell, Wrench, Briefcase, Laptop, ShoppingBag, Users, 
  Star, Activity, ShieldCheck, TrendingUp, Sparkles 
} from "lucide-react";

const clientTypes = [
  { name: "Real Estate Agencies", icon: Home, color: "#00E5A0" },
  { name: "Marketing Agencies", icon: Megaphone, color: "#00C2FF" },
  { name: "Education Consultants", icon: GraduationCap, color: "#8B5CF6" },
  { name: "Healthcare Clinics", icon: Stethoscope, color: "#EF4444" },
  { name: "Insurance Brokers", icon: Shield, color: "#3B82F6" },
  { name: "Legal Firms", icon: Scale, color: "#F59E0B" },
  { name: "Travel Agencies", icon: Compass, color: "#EC4899" },
  { name: "Event Planners", icon: Calendar, color: "#10B981" },
  { name: "Auto Dealers", icon: Car, color: "#6366F1" },
  { name: "Fitness Studios", icon: Dumbbell, color: "#F43F5E" },
  { name: "Home Services", icon: Wrench, color: "#84CC16" },
  { name: "Financial Advisors", icon: Briefcase, color: "#06B6D4" },
  { name: "SaaS Companies", icon: Laptop, color: "#A855F7" },
  { name: "E-Commerce Stores", icon: ShoppingBag, color: "#F97316" },
  { name: "Recruitment Firms", icon: Users, color: "#14B8A6" },
];

const trustBadges = [
  { name: "1,000+ Businesses", desc: "Active Workspaces", icon: TrendingUp, color: "#00E5A0" },
  { name: "4.8★ Rating", desc: "Customer Satisfaction", icon: Star, color: "#F59E0B" },
  { name: "99.9% Uptime", desc: "WebRTC Telephony", icon: Activity, color: "#00C2FF" },
  { name: "GDPR Compliant", desc: "TRAI & ISO Aligned", icon: ShieldCheck, color: "#8B5CF6" },
];

export function TrustIndicators() {
  return (
    <section className="relative py-20 border-y border-white/[0.04] overflow-hidden">
      {/* Premium ambient backdrop */}
      <div className="absolute inset-0 bg-[#081120]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#00C2FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#00E5A0]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span className="text-[10px] font-semibold text-[#CBD5E1] uppercase tracking-wider">Universal Adaptability</span>
          </div>
          <p className="text-sm font-semibold text-[#64748B] uppercase tracking-widest">
            Trusted by 1,000+ small businesses across industries
          </p>
        </AnimatedSection>

        {/* Industry Carousel */}
        <div className="relative mb-16">
          {/* Edge fading gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#081120] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#081120] to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden py-4">
            <div className="animate-marquee hover-pause flex gap-4 sm:gap-6 items-center whitespace-nowrap">
              {[...clientTypes, ...clientTypes].map((client, i) => {
                const IconComponent = client.icon;
                return (
                  <div
                    key={`${client.name}-${i}`}
                    className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer group shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] group-hover:scale-110 duration-300"
                      style={{ color: client.color }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#94A3B8] group-hover:text-white transition-colors tracking-wide">
                      {client.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust Badges - Grid based premium layout */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {trustBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.name}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-default group shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] group-hover:scale-110 duration-300"
                    style={{ color: badge.color }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white block tracking-wide">{badge.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mt-0.5">{badge.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
