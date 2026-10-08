"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import {
  FileSpreadsheet,
  BarChart,
  PieChart,
  Database,
  Settings,
  Zap,
  Code,
  LineChart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Advanced Excel Solutions",
    description: "Complex formulas, dynamic modeling, and workbook redesign to reduce errors and improve reliability.",
    color: "#0057D9",
    href: "/services/advanced-excel",
  },
  {
    icon: BarChart,
    title: "MIS & Management Reporting",
    description: "Daily, weekly, and monthly MIS structures tailored for operations, sales, and finance teams.",
    color: "#00C2FF",
    href: "/services/mis-reporting",
  },
  {
    icon: PieChart,
    title: "Excel Dashboards",
    description: "Interactive KPI dashboards that turn complex tables into clear, actionable management views.",
    color: "#00E5A0",
    href: "/services/excel-dashboard",
  },
  {
    icon: Database,
    title: "Data Cleaning & Management",
    description: "Standardize formatting, handle missing data, and consolidate messy files into structured datasets.",
    color: "#8B5CF6",
    href: "/services/data-cleaning",
  },
  {
    icon: Settings,
    title: "Excel Automation",
    description: "Automate repetitive calculations, template updates, and report generation processes.",
    color: "#F59E0B",
    href: "/services/excel-automation",
  },
  {
    icon: Zap,
    title: "Power Query Solutions",
    description: "Automated data import, transformation, and consolidation workflows from multiple sources.",
    color: "#EC4899",
    href: "/services/power-query",
  },
  {
    icon: Code,
    title: "VBA & Macro Automation",
    description: "Custom macros for button-driven workflows, formatting, and complex data processing.",
    color: "#10B981",
    href: "/services/vba-automation",
  },
  {
    icon: LineChart,
    title: "Power BI Dashboards",
    description: "Next-level data visualization with Power BI for robust, shareable business intelligence.",
    color: "#F43F5E",
    href: "/services/power-bi",
  },
];

export function ServicesShowcase() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081120] via-[#0a1628] to-[#081120]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00E5A0] uppercase tracking-widest mb-4">
            Services
          </p>
          <h2 className="section-title text-white mb-4">
            From Raw Data to <span className="gradient-text">Decision-Ready Reporting</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore how we help businesses transform messy spreadsheets into automated, structured solutions.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Link href={feature.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="glass-card group p-6 h-full cursor-pointer hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: feature.color }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                      style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)` }}
                    >
                      <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#0057D9] group-hover:text-[#00C2FF] transition-colors">
                      Explore service
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
