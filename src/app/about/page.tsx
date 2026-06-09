"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Shield, Target, Award, Users, MapPin, Zap } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Operational Excellence",
    desc: "Providing premium BPO services with continuous metric optimization, high first-contact-resolution rates, and elite agent training workflows.",
    color: "#0057D9"
  },
  {
    icon: Zap,
    title: "AI-First Technology",
    desc: "Developing next-generation AI agents, predictive scoring tools, and LLM automation to augment human capacity and reduce overhead.",
    color: "#00C2FF"
  },
  {
    icon: Shield,
    title: "Sovereign Compliance",
    desc: "Upholding peak security benchmarks. Fully aligned with SOC2 Type II, HIPAA, ISO 27001, and regional GDPR policies.",
    color: "#00E5A0"
  }
];

const leaders = [
  { name: "Vikram Dev", role: "Chief Executive Officer", desc: "Ex-Genesys Lead Architect, 20+ years of telecom and CRM engineering experience." },
  { name: "Dr. Ananya Roy", role: "VP of Artificial Intelligence", desc: "PhD in NLP & Deep Learning. Oversees our Voice AI nodes and transcript models." },
  { name: "Marcus Stone", role: "Head of Global Support Operations", desc: "Oversees 1,200+ agents across APAC, Europe, and North American delivery hubs." }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            About DBS Mintek®
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">
            Pioneering the Future of <span className="gradient-text">Customer CX</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4 leading-relaxed">
            DBS Mintek® is a global Contact Center Operating System and premium BPO provider. We merge enterprise CRM, predictive dialing, and advanced cognitive AI to streamline enterprise outreach and inbound support.
          </p>
        </AnimatedSection>

        {/* Founder's Vision */}
        <AnimatedSection className="mb-20 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Leadership Team
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              The leadership driving DBS Mintek®'s global expansion and operational success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Founder 1: Shiv Singh */}
            <div className="glass-card-strong p-8 relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl flex flex-col justify-between group hover:border-[#00C2FF]/30 transition-all duration-300">
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#0057D9]/5 blur-[80px]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img 
                    src="/Shiv_Singh.jpg" 
                    alt="Shiv Singh" 
                    className="w-24 h-24 rounded-2xl border border-white/[0.08] object-cover object-top shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white font-space-grotesk">Shiv Singh</h3>
                    <p className="text-xs text-[#00C2FF] font-semibold mt-0.5">Owner & Founder</p>
                    <p className="text-[10px] text-[#64748B] font-mono mt-1">DBS Mintek®</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-5xl text-white/5 font-serif select-none">&ldquo;</span>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed italic relative z-10 pl-2">
                    As the owner of DBS Mintek®, I have been leading a successful business consulting firm for over 16 years. My expertise lies in providing strategic guidance to clients across various industries, helping them navigate complex challenges and achieve their goals. Our mission is to empower businesses to grow and thrive in today&apos;s competitive landscape.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder 2: Prithviraj Singh */}
            <div className="glass-card-strong p-8 relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl flex flex-col justify-between group hover:border-[#00E5A0]/30 transition-all duration-300">
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#00E5A0]/5 blur-[80px]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img 
                    src="/Prithvi_ex.jpg" 
                    alt="Prithviraj Singh" 
                    className="w-24 h-24 rounded-2xl border border-white/[0.08] object-cover object-top shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white font-space-grotesk">Prithviraj Singh</h3>
                    <p className="text-xs text-[#00E5A0] font-semibold mt-0.5">Executive Head</p>
                    <p className="text-[10px] text-[#64748B] font-mono mt-1">DBS Mintek®</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-5xl text-white/5 font-serif select-none">&ldquo;</span>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed italic relative z-10 pl-2">
                    We specialize in delivering robust BPO services and AI-driven workflow architectures tailored to global client operations. By combining direct cloud telephony integrations and predictive dialing consoles, we translate customer contacts into measurable commercial growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Vice President: Ajay Giri */}
            <div className="glass-card-strong p-8 relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl flex flex-col justify-between group hover:border-[#A855F7]/30 transition-all duration-300">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#A855F7]/5 blur-[80px]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img 
                    src="/ajay_giri.jpg" 
                    alt="Ajay Giri" 
                    className="w-24 h-24 rounded-2xl border border-white/[0.08] object-cover object-top shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white font-space-grotesk">Ajay Giri</h3>
                    <p className="text-xs text-[#A855F7] font-semibold mt-0.5">Vice President</p>
                    <p className="text-[10px] text-[#64748B] font-mono mt-1">DBS Mintek®</p>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-5xl text-white/5 font-serif select-none">&ldquo;</span>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed italic relative z-10 pl-2">
                    Our focus is on driving operational excellence and scale across our delivery units. By implementing cutting-edge quality management systems and performance tracking, we ensure our global BPO and contact center operations consistently exceed client SLAs and compliance benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Award/Certification Section */}
        <AnimatedSection className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              National Recognition & Awards
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              DBS Mintek®'s commitment to operational excellence and delivery performance.
            </p>
          </div>

          <div className="glass-card-strong p-8 lg:p-12 rounded-3xl border border-white/[0.06] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00C2FF]/5 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#00E5A0]/5 blur-[100px] pointer-events-none" />
            
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Image Frame */}
              <div className="md:col-span-5 relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#00C2FF] via-[#0057D9] to-[#00E5A0] opacity-25 group-hover:opacity-40 transition duration-500 blur-md" />
                <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden bg-[#060D1B]">
                  <img 
                    src="/certication.jpg" 
                    alt="PAN India prepaid retention award presentation" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Award Content */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-xs font-semibold text-[#00E5A0]">
                  <Award className="w-3.5 h-3.5" />
                  PAN India Award
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-space-grotesk">
                  2nd Position PAN India <br />
                  <span className="gradient-text">Prepaid Retention Process</span>
                </h3>
                
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-xs sm:text-sm text-[#94A3B8]">
                  Awarded by <span className="text-white font-bold">Mr. Navnit Shukla</span> — SD Head Vi (Maharashtra & GOA)
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  <p>
                    We are proud to announce that DBS Mintek® has achieved 2nd position PAN India in the Prepaid Retention Process, receiving this award from Mr. Navnit Shukla- SD Head Vi ( Maharashtra & GOA).
                  </p>
                  <p>
                    This recognition reflects our team’s dedication, consistent efforts, customer-first approach, and strong focus on performance excellence.
                  </p>
                  <p>
                    A big thank you to our client leadership for their trust and guidance, and heartfelt congratulations to the entire DBS Mintek® team for making this achievement possible.
                  </p>
                  <p className="font-semibold text-white">
                    This is just the beginning — we will continue to work harder, perform better, and aim for the No. 1 position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Pillars Section */}
        <AnimatedSection className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Operational Pillars
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              The core principles driving our technology development and service delivery globally.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <StaggerItem key={pil.title}>
                  <div className="glass-card p-8 h-full relative overflow-hidden group hover:border-white/[0.1] transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: pil.color }} />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${pil.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: pil.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{pil.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{pil.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimatedSection>

        {/* Leadership Team */}
        <AnimatedSection className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Executive Leadership
            </h2>
            <p className="text-[#64748B] text-[#64748B] text-sm mt-2">
              Meet the industry architects driving our global customer experience strategy.
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
            {leaders.map((leader) => (
              <StaggerItem key={leader.name}>
                <div className="glass-card p-6 h-full border-white/[0.04] flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{leader.name}</h3>
                    <p className="text-xs font-semibold text-[#00C2FF] mt-0.5">{leader.role}</p>
                    <p className="text-xs text-[#94A3B8] leading-relaxed mt-4">{leader.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex gap-2">
                    <span className="text-[10px] text-[#64748B] font-mono">Expertise: Telephony, AI Systems</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Security certification showcase */}
        <AnimatedSection className="glass-card-strong p-8 lg:p-12 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Enterprise Compliance & Security Assured</h3>
          <p className="text-[#94A3B8] text-sm max-w-2xl mx-auto mb-8">
            DBS Mintek® processes millions of calls and transactions securely every single day. We undergo continuous audit scans to meet HIPAA, GDPR, SOC2 Type II, and ISO requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["SOC2 Type II Certified", "GDPR Data Sovereign", "HIPAA Health Compliance", "ISO 27001 ISMS"].map((cert) => (
              <div key={cert} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#00E5A0]" />
                {cert}
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
