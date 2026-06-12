"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Briefcase, MapPin, Clock, IndianRupee, Send, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Senior CRM Developer (Next.js & Supabase)",
    department: "Software Engineering",
    location: "Navi Mumbai (HQ) / Hybrid",
    type: "Full-Time",
    salary: "₹18L - ₹26L / Year",
    desc: "Lead the design of our high-speed Next.js and Supabase backend, including real-time lead inbox queues and PostgreSQL database indexing."
  },
  {
    title: "NLP & Conversational AI Specialist",
    department: "AI Research Desk",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "₹24L - ₹36L / Year",
    desc: "Develop and fine-tune OpenAI and Google Gemini RAG recommendation pipelines, and lead priority automation algorithms."
  },
  {
    title: "Product Designer (SaaS & CRM)",
    department: "Product Design",
    location: "London / Hybrid",
    type: "Full-Time",
    salary: "₹12L - ₹18L / Year",
    desc: "Craft premium visual elements, Kanban boards, conversation feeds, and custom dashboards for high-velocity sales teams."
  }
];

export default function CareersPage() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
 
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted successfully for: ${appliedJob}`);
    setAppliedJob(null);
    setApplicantName("");
    setApplicantEmail("");
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            Join Our Global Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Build the Future of <span className="gradient-text">Customer CX</span>
          </h1>
          <p className="text-[#94A3B8] text-lg mt-4">
            Help us shape the next generation of conversational AI recommendation engines, visual sales pipelines, and high-velocity inbox hubs.
          </p>
        </AnimatedSection>

        {/* Jobs List */}
        <StaggerContainer className="space-y-6 max-w-4xl mx-auto" staggerDelay={0.06}>
          {jobs.map((job) => (
            <StaggerItem key={job.title}>
              <div className="group relative bg-gradient-to-b from-[#101B30] to-[#0A1224] hover:from-[#132038] hover:to-[#0C152B] p-6 sm:p-8 rounded-3xl border border-white/[0.04] hover:border-[#00C2FF]/30 hover:shadow-[0_20px_50px_rgba(0,194,255,0.08)] transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                {/* Visual Highlight Decorator */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00C2FF]/10 to-[#8B5CF6]/0 rounded-full blur-[30px] group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                
                {/* Left accent glowing bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-[#00C2FF] to-[#8B5CF6] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Main Content Area */}
                <div className="flex-1 space-y-4 min-w-0">
                  {/* Category Pill and Metadata Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9.5px] tracking-wider uppercase font-extrabold text-[#8B5CF6] px-2.5 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                      {job.department}
                    </span>
                    <span className="h-3 w-px bg-white/[0.08] hidden sm:block" />
                    <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
                      <MapPin className="w-3.5 h-3.5 text-[#00C2FF] flex-shrink-0" />
                      {job.location}
                    </span>
                    <span className="h-3 w-px bg-white/[0.08] hidden sm:block" />
                    <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
                      <Clock className="w-3.5 h-3.5 text-[#00E5A0] flex-shrink-0" />
                      {job.type}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#00C2FF] transition-colors duration-250">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl font-light">
                      {job.desc}
                    </p>
                  </div>
                </div>

                {/* Right Side Action Section (Inline Salary + CTA button) */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t border-white/[0.06] md:border-t-0 pt-4 md:pt-0 md:pl-6 md:border-l md:border-white/[0.06] flex-shrink-0 w-full md:w-auto">
                  <div className="md:text-right">
                    <div className="text-[9px] uppercase font-bold tracking-widest text-[#64748B]">Yearly Compensation</div>
                    <div className="text-sm sm:text-base font-bold text-[#00E5A0] tracking-tight mt-0.5 whitespace-nowrap">
                      {job.salary}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setAppliedJob(job.title)}
                    className="inline-flex items-center justify-center gap-1.5 font-bold rounded-full px-5 py-2.5 text-xs bg-[#0057D9] text-white hover:bg-[#00C2FF] hover:text-[#081120] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg shadow-[#0057D9]/20 hover:shadow-[#00C2FF]/20 flex-shrink-0"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Apply Modal Mockup */}
        {appliedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <div className="glass-card-strong p-8 max-w-md w-full relative overflow-hidden">
              <h3 className="text-lg font-bold text-white mb-2">Apply for Position</h3>
              <p className="text-xs text-[#94A3B8] mb-6">{appliedJob}</p>
              
              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8]">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setAppliedJob(null)}
                    className="btn-secondary flex-1 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
