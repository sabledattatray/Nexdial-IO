import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "NexDial Blog — CRM for Small Businesses & WhatsApp Alternatives",
  description:
    "Expert insights, guides, and articles about lead tracking systems, WhatsApp CRM alternatives, and maximizing sales conversions for small businesses.",
  keywords: [
    "CRM for small business",
    "WhatsApp CRM alternative",
    "lead tracking software India",
    "customer inbox CRM",
    "sales follow up guide",
  ],
};

import { ARTICLES } from "@/lib/blog-content";

const posts = Object.entries(ARTICLES).map(([slug, post]) => ({ slug, ...post }));

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Insights & Guides
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-6 leading-tight">
            Grow Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0057D9] to-[#00C2FF]">Smart CRM Insights</span>
          </h1>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Simple, practical tips to manage lead pipelines, replace messy spreadsheets, and close deals faster.
          </p>
        </header>

        {/* Posts Grid */}
        <main className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-[#0A1628]/45 border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/80 transition-all duration-300 shadow-xl hover:shadow-2xl shadow-black/10"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500">
                  <span className="text-[#00C2FF] bg-[#00C2FF]/5 px-2 py-0.5 rounded border border-[#00C2FF]/10">{post.category}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-[#00C2FF] transition-colors duration-200 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {post.author}
                </span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-[#00C2FF] group-hover:text-white transition-colors duration-200 font-bold"
                >
                  Read Post 
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </main>

      </div>
    </div>
  );
}
