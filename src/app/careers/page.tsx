"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Briefcase, MapPin, Clock, DollarSign, Send, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Senior VoIP & Infrastructure Engineer",
    department: "Systems Architecture",
    location: "Navi Mumbai (HQ) / Hybrid",
    type: "Full-Time",
    salary: "₹18L - ₹26L / Year",
    desc: "Oversee Asterisk configurations, WebRTC cluster balancing, and Vicidial campaign route middleware integrations."
  },
  {
    title: "Conversational NLP Specialist",
    department: "AI Research Desk",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$110,000 - $140,000 / Year",
    desc: "Develop and fine-tune OpenAI RAG integrations, LLM prompt engineering, and voice bot audio transcription tuning."
  },
  {
    title: "Support Operations Shift Supervisor",
    department: "Client Services",
    location: "London / Hybrid",
    type: "Full-Time",
    salary: "£42,000 - £50,000 / Year",
    desc: "Oversee digital omnichannel chat agents and lead outbound dialer monitoring dashboards during EMEA schedules."
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
            Help us shape the next generation of conversational AI nodes, predictive telephony clusters, and multi-tenant SaaS panels.
          </p>
        </AnimatedSection>

        {/* Jobs List */}
        <StaggerContainer className="space-y-6 max-w-4xl mx-auto" staggerDelay={0.06}>
          {jobs.map((job) => (
            <StaggerItem key={job.title}>
              <div className="glass-card-strong p-8 hover:border-white/[0.1] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-[#0057D9]/10 border border-[#0057D9]/20 text-[10px] font-bold text-[#00C2FF] uppercase">
                      {job.department}
                    </span>
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed max-w-2xl">{job.desc}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t border-white/[0.04] pt-4 md:border-t-0 md:pt-0">
                  <span className="text-sm font-bold text-[#00E5A0] flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                  <button
                    onClick={() => setAppliedJob(job.title)}
                    className="btn-primary text-xs !py-2.5 !px-5 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
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
