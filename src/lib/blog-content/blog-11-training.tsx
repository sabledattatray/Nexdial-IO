/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const salesTrainingPlaybooks: BlogPost = {
  title: "How to Train Your New Sales Reps in 48 Hours Using Pre-Built Playbooks",
  excerpt: "Onboarding new sales hires shouldn't take three months. Discover how to use CRM-integrated playbooks to get your new reps closing deals by their first Friday.",
  date: "June 20, 2026",
  author: "Datta Sable",
  category: "Sales Strategy",
  readTime: "7 min read",
  schemaImage: "/images/blog/sales_training_playbooks.png",
  sections: [
    { id: "the-ramp-up-problem", label: "The Ramp-Up Nightmare" },
    { id: "pre-built-playbooks", label: "The Playbook Solution" },
    { id: "scripting-success", label: "Scripting the Success" },
    { id: "wrap-up", label: "Bottom Line" }
  ],
  content: (
    <>
      <h2 id="the-ramp-up-problem" className="scroll-mt-28">The Ramp-Up Nightmare</h2>
      <p>
        We've all been there. You just hired a promising new sales rep. You're paying them a solid base salary, and you're excited for them to start crushing their quota. But right now? They're basically useless.
      </p>

      <p>
        The traditional sales onboarding process is a nightmare. It usually involves making the new hire shadow your senior reps for three weeks, reading a bunch of outdated PDF manuals, and practicing pitches in awkward role-play sessions. Best case scenario? It takes them three months to fully ramp up and start generating positive ROI.
      </p>

      <p>
        For a fast-moving startup or local business, burning 90 days of payroll just to train someone is unacceptable. You need a system that gets them dialing and closing by their first Friday.
      </p>

      <h2 id="pre-built-playbooks" className="scroll-mt-28">The Playbook Solution</h2>
      <p>
        The secret to hyper-fast onboarding isn't better classroom training—it's building the training directly into your CRM. We call these <strong>Pre-Built Playbooks</strong>.
      </p>

      <p>
        Instead of expecting a new hire to memorize your entire sales process, you bake the process into the software. When they open a lead card in your CRM, the system shouldn't just show them a phone number. It should explicitly tell them what to do next.
      </p>

      <ul>
        <li>If the lead is marked "New," the CRM prompts: <em>"Call immediately. Use Introduction Script A."</em></li>
        <li>If the prospect says "Send me more info," the rep clicks a single button that auto-generates the exact follow-up email your top performers use.</li>
        <li>If the lead goes cold, the system automatically enrolls them in a 7-day re-engagement sequence.</li>
      </ul>

      <p>
        By removing the guesswork, you remove the anxiety. The new rep doesn't have to figure out what to say or when to call—they just execute the plays you've already proven to work.
      </p>

      <h2 id="scripting-success" className="scroll-mt-28">Scripting the Success</h2>
      <p>
        I know what you're thinking: "But I don't want my reps sounding like robots reading a script!"
      </p>

      <p>
        Here's the truth: your top performers are already using scripts. They just memorized them. Providing a battle-tested script to a new hire doesn't make them robotic; it gives them a safety net while they learn your product. Once they understand the core value proposition, they will naturally start injecting their own personality into the pitch. 
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Bottom Line</h2>
      <p>
        Stop relying on tribal knowledge and slow shadowing. Systematize your sales process inside your CRM, build explicit playbooks for every scenario, and watch your new hires hit their quotas in record time.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>Looking for the technical infrastructure behind building automated workflows? Read my breakdown: <a href="https://dattasable.com/blog/building-modular-ai-workflow-systems" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">Building Modular AI Workflow Systems for Scale</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Onboard reps in days, not months.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          NexDial allows you to build standardized pipelines and email templates so your new hires can start selling on day one.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
