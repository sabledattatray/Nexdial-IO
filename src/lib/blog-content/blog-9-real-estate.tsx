/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const realEstateCrm: BlogPost = {
  title: "Why Top Real Estate Agents Are Ditching Excel",
  excerpt: "Real estate is pure hustle. If you're managing your buyers and sellers out of Apple Notes and Excel, you're leaving massive commission checks on the table.",
  date: "June 18, 2026",
  author: "Datta Sable",
  category: "Small Business",
  readTime: "9 min read",
  schemaImage: "/images/blog/real_estate_crm.png",
  sections: [
    { id: "the-hustle", label: "Pure Hustle Isn't Enough" },
    { id: "the-memory-limit", label: "The Memory Limit" },
    { id: "visual-pipelines", label: "Seeing the Board" },
    { id: "wrap-up", label: "Bottom Line" }
  ],
  content: (
    <>
      <h2 id="the-hustle" className="scroll-mt-28">Pure Hustle Isn't Enough</h2>
      <p>
        Real estate is absolute chaos. On any given Tuesday, you're juggling three property showings, negotiating a repair credit, texting a mortgage broker, and trying to follow up with leads from Sunday's open house. It's a business built 100% on relationships and speed.
      </p>

      <p>
        But here's the crazy part: I still see agents closing multi-million dollar deals using nothing but their iPhone contacts, Apple Notes, and maybe a messy Excel spreadsheet they update once a week (if they remember). 
      </p>

      <h2 id="the-memory-limit" className="scroll-mt-28">The Memory Limit</h2>
      <p>
        Look, running your business out of your head works fine when you're doing one deal a month. You can easily remember that Dave is looking for a condo downtown, and Sarah needs to list her house by August.
      </p>

      <p>
        But what happens when you turn on Facebook Ads and suddenly get 40 new buyer leads? What happens when you have 15 active clients and 60 "maybe next year" prospects? You hit a cognitive wall.
      </p>

      <p>
        When you rely on sticky notes and raw memory, things fall apart. You forget to call Dave back about a new listing. Sarah ends up listing her house with another agent because you didn't check in. In real estate, dropping the ball just once can cost you $15,000 in commission. That's an incredibly expensive mistake just because you didn't have a follow-up reminder.
      </p>

      <h2 id="visual-pipelines" className="scroll-mt-28">Seeing the Board</h2>
      <p>
        Top-producing brokers don't rely on their memory. They use their CRM as an external brain.
      </p>

      <p>
        A modern, visual CRM changes everything. Instead of staring at rows in a spreadsheet, you look at a Kanban board where every client is a drag-and-drop card. You can literally see your pipeline:
      </p>

      <ul>
        <li><strong>New Leads:</strong> The people from Zillow who need a call *today*.</li>
        <li><strong>Pre-Approved:</strong> The serious buyers ready to tour.</li>
        <li><strong>In Escrow:</strong> The deals pending inspection.</li>
        <li><strong>Past Clients:</strong> The folks you need to send a holiday card to for referrals.</li>
      </ul>

      <p>
        With one glance at your phone between showings, you know exactly who needs your attention. Plus, the CRM logs your calls and texts, so you never have to guess, "Wait, did I text them the address yet?"
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Bottom Line</h2>
      <p>
        In this industry, being disorganized literally costs you money. Stop relying on your brain to remember follow-ups. Upgrade to a tool that works the way you do, and watch your GCI (Gross Commission Income) soar.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>Curious about the backend systems that power massive data operations? Read my architectural guide: <a href="https://dattasable.com/blog/modern-bi-stack-2026" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">The 2026 Modern Data Stack</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Built for high-velocity agents.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          Manage your buyers, sellers, and open house leads right from your phone with NexDial's visual pipelines.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
