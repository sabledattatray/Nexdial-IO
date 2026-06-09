"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import {
  Phone, PhoneOutgoing, MessageSquare, Target,
  Wrench, Mail, Database, Bot,
  HeadphonesIcon, Users, Building, Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Phone,
    title: "Inbound Support",
    description: "24/7 multi-channel customer support with AI-assisted agents for instant resolution",
    color: "#0057D9",
    href: "/services#inbound",
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound Sales",
    description: "Revenue-driven campaigns with predictive dialing and intelligent lead prioritization",
    color: "#00C2FF",
    href: "/services#outbound",
  },
  {
    icon: Target,
    title: "Lead Generation",
    description: "Qualified pipeline building with multi-channel outreach and AI lead scoring",
    color: "#00E5A0",
    href: "/services#leads",
  },
  {
    icon: MessageSquare,
    title: "Chat & WhatsApp",
    description: "Omnichannel digital CX with AI chatbots, live agents, and automated workflows",
    color: "#8B5CF6",
    href: "/services#digital",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    description: "Tier 1-3 technical assistance with knowledge-base powered resolution",
    color: "#F59E0B",
    href: "/services#tech",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "AI-powered email management with smart routing, templates, and analytics",
    color: "#EF4444",
    href: "/services#email",
  },
  {
    icon: Database,
    title: "Back Office",
    description: "Data processing, verification services, and operational support at scale",
    color: "#06B6D4",
    href: "/services#backoffice",
  },
  {
    icon: Bot,
    title: "AI Contact Center",
    description: "Fully autonomous AI agents handling calls, chats, and emails 24/7",
    color: "#10B981",
    href: "/services#ai",
  },
  {
    icon: HeadphonesIcon,
    title: "Managed Contact Center",
    description: "End-to-end managed services with dedicated teams and infrastructure",
    color: "#6366F1",
    href: "/services#managed",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "Exclusive agent teams trained on your products, processes, and brand voice",
    color: "#EC4899",
    href: "/services#dedicated",
  },
  {
    icon: Building,
    title: "BPO Services",
    description: "Complete business process outsourcing with proven delivery frameworks",
    color: "#14B8A6",
    href: "/services#bpo",
  },
  {
    icon: Shield,
    title: "Collections",
    description: "Compliant debt recovery with AI-optimized contact strategies and analytics",
    color: "#F97316",
    href: "/services#collections",
  },
];

export function ServicesShowcase() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00E5A0] uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h2 className="section-title text-white mb-4">
            Complete <span className="gradient-text">Customer Experience</span> Solutions
          </h2>
          <p className="section-subtitle mx-auto">
            From inbound support to AI-powered automation — every touchpoint covered with enterprise-grade solutions
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.06}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link href={service.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="glass-card group p-6 h-full cursor-pointer hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: service.color }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)` }}
                    >
                      <service.icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#0057D9] group-hover:text-[#00C2FF] transition-colors">
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
