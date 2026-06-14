/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const poorPipelineCosts: BlogPost = {
  title: "The Hidden Costs of Poor Pipeline Management",
  excerpt: "You are losing way more money than you think. Let's break down the massive psychological and financial toll of a chaotic sales pipeline.",
  date: "June 19, 2026",
  author: "Nisha P.",
  category: "Sales Strategy",
  readTime: "8 min read",
  schemaImage: "/images/blog/poor_pipeline.png",
  sections: [
    { id: "the-illusion", label: "The 'Busy' Illusion" },
    { id: "cost-of-ghosting", label: "The Price of Ghosting" },
    { id: "sales-rep-burnout", label: "Burning Out Your Best People" },
    { id: "wrap-up", label: "Stop the Bleeding" }
  ],
  content: (
    <>
      <h2 id="the-illusion" className="scroll-mt-28">The 'Busy' Illusion</h2>
      <p>
        Walk onto any poorly managed sales floor and it looks incredible. Everyone is frantically typing, shouting over the phones, and complaining about how they have zero free time. It looks like high-performance hustle. But when you look at the actual closed revenue at the end of the month? It's completely flat.
      </p>

      <p>
        This is the illusion of busyness. When you don't have a clean, structured pipeline, your reps spend 60% of their day just trying to figure out *who* they are supposed to call next. They're digging through old email threads, scrolling WhatsApp chats, and fighting with Excel filters just to find a prospect's phone number. That isn't selling—that's admin work.
      </p>

      <h2 id="cost-of-ghosting" className="scroll-mt-28">The Price of Ghosting</h2>
      <p>
        The most painful cost of a messy pipeline is the "ghosted" lead. You know the drill: your rep has an amazing discovery call on Tuesday, promises to send a proposal by Thursday, and then... completely forgets.
      </p>

      <p>
        By the time the rep remembers the following Monday, it's too late. The prospect's trust is broken. If your marketing team spent $150 in ad spend to acquire that lead, you haven't just lost the commission—you literally set $150 on fire because your infrastructure couldn't remind a rep to send an email. Multiply that by 20 dropped leads a month, and you're bleeding serious cash.
      </p>

      <h2 id="sales-rep-burnout" className="scroll-mt-28">Burning Out Your Best People</h2>
      <p>
        Let's talk about the human cost. Sales is already a brutal, high-rejection job. When you force your team to fight against their own software just to do their jobs, you are guaranteeing burnout.
      </p>

      <p>
        A-player salespeople want to be on the phone closing deals, not acting as data entry clerks. If your CRM requires them to click 14 times just to log a single phone call, they're going to hate it. They'll stop using it, your data will become garbage, and eventually, your top performers will quit to work for a competitor who actually gives them decent tools.
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Stop the Bleeding</h2>
      <p>
        Pipeline management isn't just corporate jargon—it's the absolute foundation of your revenue. Giving your team a clean, intuitive system that explicitly tells them who to call next is the highest ROI investment you can make. It transforms frantic chaos into surgical execution.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>Curious how to design interfaces that actually drive action? Read my breakdown on <a href="https://dattasable.com/blog/dashboard-ux-principles" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">7 UI/UX Principles for High-Stakes Executive Dashboards</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Stop burning your leads.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          NexDial organizes your chaos into clear, actionable visual pipelines. Focus on selling, not searching.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
