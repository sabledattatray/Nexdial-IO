"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Check, HelpCircle, Info, Zap, Brain, Inbox } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter Inbox",
    price: { USD: 19, INR: 1500 },
    icon: Inbox,
    desc: "Perfect for solopreneurs or micro-businesses looking to organize customer inquiries in one place.",
    features: [
      "1 Unified Inbox (WhatsApp & Web Forms)",
      "Core Lead Management (Profiles & Tags)",
      "Basic Interaction Timeline History",
      "Manual Follow-Up Reminders",
      "Single Agent Seat included",
      "Standard Email Support"
    ],
    color: "#0057D9",
    popular: false
  },
  {
    name: "Professional CRM",
    price: { USD: 39, INR: 3200 },
    icon: Zap,
    desc: "For growing teams that want to automate follow-ups and track leads in a visual pipeline.",
    features: [
      "Everything in Starter Inbox",
      "Unlimited Leads & Unified Inbox feeds",
      "Visual Kanban Drag-and-Drop Pipeline",
      "Automated Follow-Up Reminders",
      "Interactive Call Logging & Outcomes",
      "Team Collaboration & Lead Assignment",
      "Daily Performance Analytics Dashboard"
    ],
    color: "#8B5CF6",
    popular: true
  },
  {
    name: "Growth Engine",
    price: { USD: 79, INR: 6500 },
    icon: Brain,
    desc: "For businesses wanting to leverage self-learning AI recommendations and advanced pipeline forecasting.",
    features: [
      "Everything in Professional CRM",
      "AI Next Best Action Suggestions",
      "Adaptive CRM Learning Feedback Loop",
      "Distraction-Free Daily Execution Mode",
      "Three-Curve Revenue Forecasting",
      "Pipeline Bottleneck Diagnostics",
      "Custom Webhook & API Integrations"
    ],
    color: "#00E5A0",
    popular: false
  }
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  // Custom Quote Calculator state
  const [users, setUsers] = useState(5);
  const [leads, setLeads] = useState(1000);

  const calculateCustomQuote = () => {
    const basePrice = 15;
    const perUser = 10;
    const perLead = 0.005;
    const rawUSD = basePrice + (users * perUser) + (leads * perLead);
    const multiplier = billingPeriod === "yearly" ? 0.8 : 1; // 20% discount
    const finalUSD = Math.round(rawUSD * multiplier);
    return currency === "USD" 
      ? `$${finalUSD.toLocaleString("en-US")}` 
      : `₹${Math.round(finalUSD * 83).toLocaleString("en-IN")}`;
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Nexdial Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Predictable Plans, <span className="gradient-text">Transparent Pricing</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Select a simple, value-packed plan for your business or estimate custom deployment costs using our interactive estimator below.
          </p>
        </AnimatedSection>

        {/* Currency & Billing Period Toggle */}
        <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {/* Currency Toggle */}
          <div className="flex p-1 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currency === "USD" ? "bg-[#0057D9] text-white" : "text-[#64748B] hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currency === "INR" ? "bg-[#0057D9] text-white" : "text-[#64748B] hover:text-white"
              }`}
            >
              INR (₹)
            </button>
          </div>

          {/* Period Toggle */}
          <div className="flex p-1 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingPeriod === "monthly" ? "bg-[#0057D9] text-white" : "text-[#64748B] hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === "yearly" ? "bg-[#0057D9] text-white" : "text-[#64748B] hover:text-white"
              }`}
            >
              Yearly Billing
              <span className="px-1.5 py-0.5 rounded bg-[#00E5A0]/20 text-[#00E5A0] text-[9px] font-extrabold uppercase">Save 20%</span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Cards Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.06}>
          {plans.map((plan) => {
            const Icon = plan.icon;
            const rawPrice = plan.price[currency];
            const displayPrice = billingPeriod === "yearly" ? Math.round(rawPrice * 0.8) : rawPrice;
            const symbol = currency === "USD" ? "$" : "₹";
            
            return (
              <StaggerItem key={plan.name} className="h-full">
                <div className={`glass-card-strong p-8 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  plan.popular ? "border-[#8B5CF6]/50 shadow-[0_20px_50px_rgba(139,92,246,0.15)] scale-102" : "border-white/[0.06] hover:border-white/[0.1]"
                }`}>
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[9px] font-extrabold uppercase tracking-wider text-[#A78BFA]">
                      Most Popular
                    </div>
                  )}

                  {/* Top */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${plan.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: plan.color }} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    </div>

                    <p className="text-xs text-[#64748B] min-h-[40px] leading-relaxed">
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-1.5 border-b border-white/[0.06] pb-6">
                      <span className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {symbol}{displayPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#64748B]">/ user / month</span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <Check className="w-4.5 h-4.5 text-[#00E5A0] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[#CBD5E1] font-semibold">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-8">
                    <Link
                      href="/signup"
                      className={`w-full py-3.5 rounded-lg text-xs font-bold text-center block transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white hover:shadow-lg hover:shadow-[#8B5CF6]/30"
                          : "bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      Get Started with {plan.name}
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Custom Quote Estimator */}
        <AnimatedSection delay={0.2} className="glass-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-wider block mb-1">
                  Flexible Scaling
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Estimate Your Monthly Outlay
                </h3>
              </div>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#94A3B8]">Team Member Seats:</span>
                  <span className="text-[#00C2FF]">{users} Seats</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-[#0057D9]"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#94A3B8]">Monthly Leads Tracked:</span>
                  <span className="text-[#00C2FF]">{leads.toLocaleString()} Leads</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={leads}
                  onChange={(e) => setLeads(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/[0.06] rounded-lg appearance-none cursor-pointer accent-[#0057D9]"
                />
              </div>

              <div className="flex gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[10px] text-[#64748B]">
                <Info className="w-4.5 h-4.5 text-[#00C2FF] flex-shrink-0" />
                <span>Estimate includes secure cloud hosting, daily automated database backups, WhatsApp API webhook config, custom lead capture forms, and general support.</span>
              </div>
            </div>

            {/* Price Output */}
            <div className="lg:border-l lg:border-white/[0.06] lg:pl-12 flex flex-col items-center justify-center text-center py-6">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">
                Estimated Outlay ({billingPeriod})
              </span>
              <span className="text-5xl lg:text-6xl font-extrabold text-white mt-4 tracking-tight leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {calculateCustomQuote()}
              </span>
              <span className="text-xs text-[#64748B] mt-2 block">per month</span>

              <div className="mt-8 flex gap-4 w-full justify-center">
                <Link href="/signup" className="btn-primary text-xs !py-3 !px-6 w-full max-w-xs flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Proceed to Sign Up
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
