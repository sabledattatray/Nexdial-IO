"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowLeft, User, Calendar, Clock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function BlogClient({ 
  article, 
  sections,
  prevPost,
  nextPost,
  relatedPosts,
  children 
}: { 
  article: any, 
  sections: { id: string, label: string }[],
  prevPost: { slug: string, title: string } | null,
  nextPost: { slug: string, title: string } | null,
  relatedPosts: any[],
  children: React.ReactNode 
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const placeholderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);
  const [computedTop, setComputedTop] = useState<number>(112);

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScrollAndPos = () => {
      // 1. Position Logic
      if (placeholderRef.current) {
        setSidebarLeft(placeholderRef.current.getBoundingClientRect().left);
      }

      if (placeholderRef.current && gridRef.current && sidebarRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        
        const absoluteGridTop = gridRect.top + window.scrollY;
        const absoluteGridBottom = gridRect.bottom + window.scrollY;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        
        let desiredTop = absoluteGridTop - window.scrollY;
        
        // Pin to top underneath navbar
        if (desiredTop < 112) {
          desiredTop = 112;
        }
        
        // Clamp at footer
        const gap = 24;
        const absoluteSidebarBottom = window.scrollY + desiredTop + sidebarHeight;
        if (absoluteSidebarBottom + gap > absoluteGridBottom) {
          desiredTop = (absoluteGridBottom - gap - sidebarHeight) - window.scrollY;
        }
        
        setComputedTop(desiredTop);
      }

      // 2. Active Section Logic
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    handleScrollAndPos();
    const timeoutId = setTimeout(handleScrollAndPos, 150);

    window.addEventListener("resize", handleScrollAndPos);
    window.addEventListener("scroll", handleScrollAndPos);
    
    const observer = new ResizeObserver(handleScrollAndPos);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleScrollAndPos);
      window.removeEventListener("scroll", handleScrollAndPos);
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 font-sans text-slate-300">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00C2FF] mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <header className="space-y-6 mb-12 max-w-[800px]">
          <span className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider bg-[#00C2FF]/10 px-3 py-1 rounded-full border border-[#00C2FF]/20">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-b border-white/5 pb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-500" />
              By {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              {article.readTime}
            </span>
          </div>
        </header>

        {article.schemaImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#081120] to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.schemaImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {sections.length > 0 ? (
          <div ref={gridRef} className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            <div ref={placeholderRef} className="hidden lg:block w-[280px] shrink-0" />
            
            {sidebarLeft !== null && (
              <aside
                ref={sidebarRef}
                className="hidden lg:block bg-white/[0.01] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-md"
                style={{
                  position: "fixed",
                  top: computedTop,
                  left: sidebarLeft,
                  width: 260,
                  maxHeight: `calc(100vh - ${computedTop}px - 1rem)`,
                  overflowY: "auto",
                  zIndex: 40,
                }}
              >
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.06] pb-3">
                  Table of Contents
                </h3>
                <ul className="space-y-1">
                  {sections.map((section: any) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          activeSection === section.id
                            ? "bg-[#0057D9]/15 text-[#00C2FF] border-l-2 border-[#00C2FF]"
                            : "text-[#64748B] hover:text-white hover:bg-white/[0.02]"
                        }`}
                      >
                        <span>{section.label}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${activeSection === section.id ? "translate-x-0.5" : "opacity-0"}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="w-full">
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2 prose-strong:text-[#00C2FF] text-slate-300">
                {children}
              </article>

              {/* Author Card */}
              <div className="mt-16 p-6 bg-[#0A1628]/45 border border-white/5 rounded-2xl flex items-start gap-4">
                {article.author === "Datta Sable" ? (
                  <Image src="/datta.png" alt="Datta Sable" width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#00C2FF]/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]" />
                ) : article.author === "Nisha P." ? (
                  <Image src="/nisha.png" alt="Nisha P." width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#00C2FF]/30" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 flex items-center justify-center shrink-0 border border-[#00C2FF]/20">
                    <User className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                )}
                <div>
                  <h4 className="text-white font-bold text-base mb-1 flex items-center gap-2">
                    Written by {article.author === "Datta Sable" ? (
                      <span className="flex items-center gap-1.5">
                        <a href="https://dattasable.com" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline transition-all">Datta Sable</a>
                        <BadgeCheck className="w-4 h-4 text-[#00C2FF] fill-[#00C2FF]/10" />
                      </span>
                    ) : article.author}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {article.author === "Datta Sable"
                      ? "Founder & CEO at NexDial. Documenting modern sales architecture, enterprise workflow automation, and the systems required to scale revenue."
                      : "Growth and technology researcher sharing insights on modern sales architecture, automation, and building scalable ecosystems."}
                  </p>
                </div>
              </div>

              {/* Next / Prev Navigation */}
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group p-4 bg-[#0A1628]/30 rounded-xl border border-white/5 hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/60 transition-all text-left flex flex-col items-start gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1"><ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Article</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00C2FF] line-clamp-2 transition-colors">{prevPost.title}</span>
                  </Link>
                ) : <div />}
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group p-4 bg-[#0A1628]/30 rounded-xl border border-white/5 hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/60 transition-all text-right flex flex-col items-end gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">Next Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00C2FF] line-clamp-2 transition-colors">{nextPost.title}</span>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2 prose-strong:text-[#00C2FF] text-slate-300 max-w-[800px]">
              {children}
            </article>

            {/* Author Card */}
            <div className="mt-16 max-w-[800px] p-6 bg-[#0A1628]/45 border border-white/5 rounded-2xl flex items-start gap-4">
              {article.author === "Datta Sable" ? (
                <Image src="/datta.png" alt="Datta Sable" width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#00C2FF]/30 shadow-[0_0_15px_rgba(0,194,255,0.2)]" />
              ) : article.author === "Nisha P." ? (
                <Image src="/nisha.png" alt="Nisha P." width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#00C2FF]/30" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 flex items-center justify-center shrink-0 border border-[#00C2FF]/20">
                  <User className="w-5 h-5 text-[#00C2FF]" />
                </div>
              )}
              <div>
                <h4 className="text-white font-bold text-base mb-1 flex items-center gap-2">
                  Written by {article.author === "Datta Sable" ? (
                    <span className="flex items-center gap-1.5">
                      <a href="https://dattasable.com" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline transition-all">Datta Sable</a>
                      <BadgeCheck className="w-4 h-4 text-[#00C2FF] fill-[#00C2FF]/10" />
                    </span>
                  ) : article.author}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {article.author === "Datta Sable"
                    ? "Founder & CEO at NexDial. Documenting modern sales architecture, enterprise workflow automation, and the systems required to scale revenue."
                    : "Growth and technology researcher sharing insights on modern sales architecture, automation, and building scalable ecosystems."}
                </p>
              </div>
            </div>

            {/* Next / Prev Navigation */}
            <div className="mt-8 pt-8 max-w-[800px] border-t border-white/5 grid grid-cols-2 gap-4">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group p-4 bg-[#0A1628]/30 rounded-xl border border-white/5 hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/60 transition-all text-left flex flex-col items-start gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1"><ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous Article</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#00C2FF] line-clamp-2 transition-colors">{prevPost.title}</span>
                </Link>
              ) : <div />}
              
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group p-4 bg-[#0A1628]/30 rounded-xl border border-white/5 hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/60 transition-all text-right flex flex-col items-end gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">Next Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
                  <span className="text-sm font-bold text-white group-hover:text-[#00C2FF] line-clamp-2 transition-colors">{nextPost.title}</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        )}

        {/* Related Posts Grid */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="bg-[#0A1628]/45 border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-between group hover:border-[#00C2FF]/20 hover:bg-[#0A1628]/80 transition-all duration-300 shadow-xl"
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
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
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
                      Read
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
