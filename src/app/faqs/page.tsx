"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Plus, Minus, Search, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    name: "General & Product",
    items: [
      {
        q: "What is NexDial?",
        a: "NexDial is a lightweight CRM and unified customer inbox designed specifically for small businesses. It replaces scattered Excel sheets, WhatsApp groups, and email threads with a single dashboard to track customer conversations, manage pipelines, and ensure you never miss a follow-up.",
      },
      {
        q: "How is NexDial different from traditional enterprise CRMs?",
        a: "Traditional CRMs are often overly complex, expensive, and require weeks of training. NexDial is designed to be set up in under 5 minutes. It focuses only on the essentials: capturing leads from web forms and WhatsApp, managing them on a simple pipeline, and showing you exactly who to contact next.",
      },
      {
        q: "Who is NexDial built for?",
        a: "NexDial is built for small business owners, sales agents, and customer success teams who want a simple, fast tool to keep track of their customer pipeline without the bloat of enterprise systems.",
      },
      {
        q: "Does NexDial offer a free trial, and how do I get started?",
        a: "Yes! We offer a 14-day free trial with full access to all features (pipeline, WhatsApp templates, and AI recommendations) so you can experience how easy it is to manage your leads before committing.",
      },
      {
        q: "Can I invite my team members to NexDial?",
        a: "Yes, NexDial supports multi-user collaboration. You can invite your team members, assign leads to specific agents, and view performance metrics across the entire team from a centralized dashboard.",
      }
    ]
  },
  {
    id: "features",
    name: "Features & Integrations",
    items: [
      {
        q: "How does the WhatsApp integration work?",
        a: "NexDial lets you trigger WhatsApp messages directly from the lead profile. It formats customized follow-up templates using the lead's name and details so you can click a button and launch pre-filled chats in your WhatsApp Web or Desktop application instantly.",
      },
      {
        q: "Can I import existing leads via CSV?",
        a: "Yes, absolutely! NexDial features a built-in CSV import module. You can map your existing spreadsheet columns (Name, Phone, Email, Tags, Source) and upload hundreds of leads to your inbox in seconds.",
      },
      {
        q: "Does NexDial prevent duplicate leads?",
        a: "Yes. When new leads are imported or added, NexDial automatically scans for existing records with matching phone numbers or email addresses, flagging them with 'Duplicate' warnings to prevent double-contacting.",
      },
      {
        q: "Can I customize the pipeline stages to fit my sales process?",
        a: "Absolutely! You can rename, add, or delete pipeline stages to match your exact workflow, whether you are managing property sales, consulting inquiries, or e-commerce leads.",
      },
      {
        q: "How does NexDial handle custom fields for leads?",
        a: "You can create custom fields for your leads to store specific information like budget, preferred contact time, or product interest. These custom fields can also be mapped during CSV imports.",
      }
    ]
  },
  {
    id: "ai",
    name: "AI & Automation",
    items: [
      {
        q: "How does the AI 'Next Best Action' recommendation engine work?",
        a: "Our Priority Engine continuously analyzes lead activity recency, source intent, and schedules. It automatically recommends the next logical step (e.g., calling a new hot lead, messaging a WhatsApp inquiry, or setting a follow-up date) to help you close deals faster.",
      },
      {
        q: "What is the Lead Health Score?",
        a: "The Lead Health Score (0-100) measures how likely a lead is to convert. It increases with positive touchpoints (calls, notes, WhatsApp interactions) and penalizes leads that are going stale or have overdue follow-up dates.",
      },
      {
        q: "How does Daily Execution Mode work?",
        a: "Daily Execution Mode is a focused workspace that queues up your top active leads sorted by priority and AI Health Score. It lets you go through them one-by-one to log calls, send quick WhatsApp messages, or update statuses in a single distraction-free interface.",
      },
      {
        q: "What parameters determine the AI priority recommendation score?",
        a: "The Priority Engine evaluates recency of interaction, lead age, engagement frequency, and custom follow-up dates. This ensures hot, new leads and critical follow-ups are always positioned at the top of your queue.",
      },
      {
        q: "Can I automate follow-up reminders?",
        a: "Yes. You can set specific follow-up dates for any lead. The AI priority engine will automatically flag these leads as high priority on the scheduled date and send you a notification to follow up.",
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
              placeholder="Search general questions, features, or AI priority engine..."
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
              No matching questions found. Try search keywords like &quot;WhatsApp&quot;, &quot;import&quot; or &quot;Health Score&quot;.
            </div>
          )}
        </AnimatedSection>

      </div>
    </div>
  );
}
