/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const shortSalesCycle: BlogPost = {
  title: "Why Your B2B Sales Cycle is Too Long (And How to Fix It)",
  excerpt: "If your deals are taking 6 months to close, you have a friction problem. Here is how to audit your pipeline and drastically shorten your B2B sales cycle.",
  date: "June 21, 2026",
  author: "Nisha P.",
  category: "B2B Sales",
  readTime: "8 min read",
  schemaImage: "/images/blog/shorten_sales_cycle.png",
  sections: [
    { id: "the-time-kill", label: "Time Kills All Deals" },
    { id: "identifying-friction", label: "Where is the Friction?" },
    { id: "accelerating-trust", label: "Accelerating Trust" },
    { id: "wrap-up", label: "Bottom Line" }
  ],
  content: (
    <>
      <h2 id="the-time-kill" className="scroll-mt-28">Time Kills All Deals</h2>
      <p>
        There is a golden rule in B2B sales that you can never ignore: <strong>Time kills all deals.</strong> 
      </p>

      <p>
        Every extra week a prospect spends "thinking about it," the probability of them signing drops exponentially. Budgets get frozen, champions leave the company, or a competitor swoops in with a better pitch. If your average sales cycle is creeping up past 90 or 120 days, you aren't just losing time—you're actively losing revenue.
      </p>

      <h2 id="identifying-friction" className="scroll-mt-28">Where is the Friction?</h2>
      <p>
        To fix a bloated sales cycle, you need to audit your pipeline and find the friction points. Where do deals get stuck?
      </p>

      <p>
        Often, the bottleneck isn't the prospect—it's your own internal process. I've seen enterprise sales teams where it takes three days just to get a custom pricing proposal approved by management. I've seen legal departments take two weeks to redline a standard NDA. When you put up roadblocks for someone who actually wants to buy your product, you are begging them to walk away.
      </p>

      <p>
        You need to use your CRM to track "Time in Stage." Look at your Kanban board. Are leads spending an average of 14 days in the "Proposal Sent" stage? Why? Is your proposal confusing? Are you failing to schedule a mandatory review call when you send the pricing? The data will tell you exactly where the process is breaking down.
      </p>

      <h2 id="accelerating-trust" className="scroll-mt-28">Accelerating Trust</h2>
      <p>
        The core reason B2B deals take so long is that enterprise software is expensive, and buyers are terrified of making a mistake. The entire sales process is just an exercise in building trust and reducing perceived risk.
      </p>

      <p>
        If you want to shorten the cycle, you have to accelerate trust. How?
      </p>

      <ul>
        <li><strong>Stop holding back information:</strong> Put your pricing and technical documentation online. Let them evaluate you before the first call.</li>
        <li><strong>Automate the busywork:</strong> Use your CRM to auto-generate NDAs and standard contracts so reps can send them while still on the phone.</li>
        <li><strong>Never leave a meeting without a next step:</strong> If you send a proposal, do not hang up until you have a calendar invite for the review call locked in.</li>
      </ul>

      <h2 id="wrap-up" className="scroll-mt-28">Bottom Line</h2>
      <p>
        You can't force a buyer to move faster than their procurement department allows, but you can absolutely eliminate the internal friction on your end. Tighten your follow-ups, automate your paperwork, and watch your close velocity double.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>Want to understand the financial ROI of real-time pipeline visibility? Read my deep dive: <a href="https://dattasable.com/blog/financial-bi-impact" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">The ROI of Real-Time Financial Visibility in SaaS</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Track your deal velocity.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          NexDial's visual pipelines highlight stuck deals instantly, so you can unblock your reps and close faster.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
