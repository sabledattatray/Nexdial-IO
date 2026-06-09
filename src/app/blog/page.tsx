"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How Answering Machine Detection (AMD) Speeds Agent Pipelines",
    excerpt: "Learn how mathematical frequency checks filter out 98% of machine responses in under 2 seconds.",
    date: "June 08, 2026",
    author: "Vikram Dev",
    category: "VoIP Telephony"
  },
  {
    title: "Setting Up RAG Pipelines for Support Agent Screen suggestions",
    excerpt: "A look at embedding knowledge base documents inside local LLMs for low-latency copilot script matches.",
    date: "June 04, 2026",
    author: "Dr. Ananya Roy",
    category: "Conversational AI"
  },
  {
    title: "Top HIPAA Requirements for Telehealth Dialers & Recording systems",
    excerpt: "Essential steps to encrypt patient data and mask recording segments to ensure compliance.",
    date: "May 29, 2026",
    author: "Marcus Stone",
    category: "Compliance Desk"
  }
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            DBS Mintek® Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Enterprise CX & <span className="gradient-text">AI Insights</span>
          </h1>
        </AnimatedSection>

        {/* Posts Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.06}>
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <div className="glass-card-strong p-6 h-full flex flex-col justify-between group hover:border-white/[0.1] transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#64748B]">
                    <span>{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-semibold text-[#0057D9] group-hover:text-[#00C2FF] transition-colors">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    By {post.author}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
