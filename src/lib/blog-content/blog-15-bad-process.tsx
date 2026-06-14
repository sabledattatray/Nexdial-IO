/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const fiveSignsBadProcess: BlogPost = {
  title: "5 Signs Your Current Sales Process is Costing You Thousands",
  excerpt: "Think your sales process is 'good enough'? Here are the 5 glaring red flags that indicate you are bleeding revenue through operational inefficiencies.",
  date: "June 24, 2026",
  author: "Datta Sable",
  category: "Small Business",
  readTime: "6 min read",
  schemaImage: "/images/blog/bad_sales_process.png",
  sections: [
    { id: "the-red-flags", label: "The Red Flags" },
    { id: "the-spreadsheet-trap", label: "Sign 1: The Spreadsheet Trap" },
    { id: "no-visibility", label: "Sign 2: No Manager Visibility" },
    { id: "wrap-up", label: "Bottom Line" }
  ],
  content: (
    <>
      <h2 id="the-red-flags" className="scroll-mt-28">The Red Flags</h2>
      <p>
        Most founders and sales directors don't realize their sales process is broken until it's too late. They assume that because deals are occasionally closing, the system must be working. But "closing some deals" is not the same as maximizing revenue.
      </p>

      <p>
        If you tolerate operational inefficiencies, you are quietly bleeding thousands of dollars every month. Here are the red flags you need to look out for.
      </p>

      <h2 id="the-spreadsheet-trap" className="scroll-mt-28">Sign 1: The Spreadsheet Trap</h2>
      <p>
        If your primary method of tracking who to call today is a shared Google Sheet, you have already failed. Spreadsheets are static. They don't send push notifications. They don't log when an email is opened. Forcing a highly-paid sales rep to manually type notes into a tiny Excel cell is a catastrophic waste of their time and your money.
      </p>

      <h2 id="no-visibility" className="scroll-mt-28">Sign 2: Zero Manager Visibility</h2>
      <p>
        If I asked you right now: "How many deals are currently in the proposal stage, and what is the total projected revenue?" could you answer me in under 10 seconds?
      </p>

      <p>
        If the answer involves you texting your reps and asking them to "send over their numbers," your process is broken. A modern sales director needs a live, visual dashboard. You should be able to open your CRM and instantly see the exact health of your entire pipeline without ever asking a rep for a status update.
      </p>

      <p>
        <strong>Sign 3: Reps are Cherry-Picking Leads.</strong> If your reps are only calling the "easy" leads and ignoring the older, harder-to-reach prospects, you have a discipline problem caused by a lack of automated follow-up rules.
      </p>

      <p>
        <strong>Sign 4: Reps Sound Different.</strong> If Rep A is sending highly polished, beautifully formatted proposals, and Rep B is sending three-sentence emails with typos, you lack standardized templates. Your brand experience should be identical regardless of who is assigned the lead.
      </p>

      <p>
        <strong>Sign 5: "I forgot."</strong> If you ever hear a rep say they forgot to call someone back, your infrastructure is to blame.
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Bottom Line</h2>
      <p>
        "Good enough" is the enemy of great. If you recognize any of these 5 signs in your own team, it is time to burn the spreadsheets and upgrade to a CRM that enforces discipline and visualizes your pipeline.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>For a deep dive into how I build highly visual, executive-grade tracking systems, read my guide on <a href="https://dattasable.com/blog/mastering-surgical-ui-dashboard-engineering" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">Mastering the 'Surgical' UI: Dashboard Engineering</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Fix your broken process.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          NexDial provides the exact visual pipelines and automation needed to eliminate these costly sales errors forever.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
