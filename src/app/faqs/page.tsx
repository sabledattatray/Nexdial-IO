"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Plus, Minus, Search, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    name: "General & SaaS",
    items: [
      {
        q: "What is Nexdial?",
        a: "Nexdial is an enterprise-grade Contact Center Operating System (CCOS) combined with professional BPO services. It integrates CRM systems, outbound dialers, Voice AI agents, auto quality assurance, and multi-tenant portals into a single dashboard.",
      },
      {
        q: "Does Nexdial support multi-tenancy?",
        a: "Yes, absolutely. Nexdial was designed from the ground up to support unlimited independent organizations (tenants). Each tenant gets its own configuration settings, sub-domains, branding, agent teams, dialers, and database clusters.",
      },
      {
        q: "Can I host this on my own private cloud?",
        a: "Yes. In addition to our fully managed cloud service, we offer hybrid cloud and on-premise installation plans utilizing Kubernetes (K8s) clusters on Microsoft Azure and AWS.",
      }
    ]
  },
  {
    id: "telephony",
    name: "Telephony & Dialers",
    items: [
      {
        q: "Which VoIP providers are supported?",
        a: "Nexdial integrates directly with Asterisk, FreePBX, Vicidial, Twilio, Exotel, and any standard SIP-compliant trunk provider.",
      },
      {
        q: "What dialing modes are available?",
        a: "Our dialer engine supports Predictive (dynamic algorithm), Power (consecutive calling), Progressive (only dials when agent is free), and Preview (displays record before calling) modes.",
      },
      {
        q: "Does the dialer include Answering Machine Detection (AMD)?",
        a: "Yes, we integrate low-latency AI-based Answering Machine Detection that filters out voicemail, busy signals, and disconnected tones with >98% accuracy.",
      }
    ]
  },
  {
    id: "ai",
    name: "AI & Compliance",
    items: [
      {
        q: "Is Nexdial HIPAA compliant?",
        a: "Yes, all patient data streams, dialer campaigns, and recording repositories meet HIPAA standards with end-to-end TLS/AES encryption, BAA contracts, and database audit logs.",
      },
      {
        q: "How does the AI Agent Copilot work?",
        a: "During a live call, our system transcribes the speech in real-time. It queries internal SOP documentation using semantic search (RAG) and displays answers and script suggestions directly on the agent's screen.",
      }
    ]
  }
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCat = faqCategories.find(c => c.id === activeCategory) || faqCategories[0];

  // Filtering FAQs if search is present
  const allFilteredFaqs = searchQuery
    ? faqCategories.flatMap(cat => cat.items.filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    : selectedCat.items;

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-6">
            FAQ & <span className="gradient-text">Documentation Support</span>
          </h1>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection delay={0.1} className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search general questions, compliance specs, or VoIP configurations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
            />
          </div>
        </AnimatedSection>

        {/* Categories Tab Selector */}
        {!searchQuery && (
          <AnimatedSection delay={0.15} className="flex justify-center gap-2 mb-8 flex-wrap">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0057D9]/20 border-[#0057D9] text-white"
                    : "bg-white/[0.01] border-white/[0.06] text-[#94A3B8] hover:border-white/[0.1]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </AnimatedSection>
        )}

        {/* Accordions */}
        <AnimatedSection delay={0.2} className="space-y-3">
          {allFilteredFaqs.length > 0 ? (
            allFilteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-white focus:outline-none"
                  >
                    <span className="text-sm font-semibold flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#00C2FF] flex-shrink-0" />
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#64748B]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#64748B]" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs text-[#94A3B8] leading-relaxed border-t border-white/[0.03]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-[#64748B] text-xs">
              No matching questions found. Try search keywords like &quot;SaaS&quot;, &quot;dialer&quot; or &quot;compliance&quot;.
            </div>
          )}
        </AnimatedSection>

      </div>
    </div>
  );
}
