"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, ArrowLeft, User, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function BlogClient({ 
  article, 
  sections, 
  children 
}: { 
  article: any, 
  sections: { id: string, label: string }[],
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

            <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2 prose-strong:text-[#00C2FF] text-slate-300">
              {children}
            </article>
          </div>
        ) : (
          <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2 prose-strong:text-[#00C2FF] text-slate-300 max-w-[800px]">
            {children}
          </article>
        )}
      </div>
    </div>
  );
}
