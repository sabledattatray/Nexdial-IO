/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle, BookOpen, GraduationCap, Users } from "lucide-react";

export const salesTrainingPlaybooks: BlogPost = {
  title: "Why Your New Sales Reps Are Failing (And How Playbooks Fix It)",
  excerpt: "The traditional 'shadowing' method of onboarding new sales reps is highly inefficient. Learn how to digitize your company's proprietary sales knowledge into interactive playbooks built directly into your CRM.",
  date: "June 20, 2026",
  author: "Datta Sable",
  category: "Sales Leadership",
  readTime: "11 min read",
  schemaImage: "/images/blog/sales_training_playbooks.png",
  sections: [
    { id: "the-shadowing-problem", label: "The Problem with 'Shadowing'" },
    { id: "tribal-knowledge", label: "The Danger of Tribal Knowledge" },
    { id: "digitizing-the-playbook", label: "Digitizing the Playbook" },
    { id: "crm-integrated-training", label: "CRM-Integrated Training" },
    { id: "measuring-ramp-time", label: "Measuring Ramp Time" },
    { id: "wrap-up", label: "Conclusion & Final Thoughts" }
  ],
  content: (
    <>
      <h2 id="the-shadowing-problem" className="scroll-mt-28">The Problem with "Shadowing"</h2>
      <p>
        If you ask most sales directors how they onboard a brand-new junior sales rep, the answer is almost universally the same: "We have them shadow our top performer, Dave, for two weeks." 
      </p>

      <p>
        On paper, this sounds like a great idea. Dave is closing $1M a year; obviously, the new rep should watch him work. In reality, "shadowing" is a fundamentally flawed training methodology that destroys productivity. 
      </p>

      <p>
        First, Dave is a salesperson, not a teacher. He operates on instinct. When a prospect raises an objection, Dave intuitively knows exactly how to respond based on 5 years of domain expertise. If you ask Dave to explain *why* he said what he said, he usually can't articulate the underlying framework. Second, you are actively distracting your highest-grossing employee. By forcing Dave to babysit a junior rep, you are pulling him away from closing high-ticket deals, which directly impacts your quarterly revenue.
      </p>

      <h2 id="tribal-knowledge" className="scroll-mt-28">The Danger of Tribal Knowledge</h2>
      <p>
        When you rely entirely on shadowing, your company's intellectual property is locked inside the brains of a few key individuals. This is called "Tribal Knowledge." 
      </p>

      <p>
        If Dave quits tomorrow to join a competitor, he takes the entire sales framework with him. The junior reps who were relying on him are suddenly left completely rudderless. They don't know how to handle the "Your product is too expensive" objection because Dave used to just handle it for them.
      </p>

      <p>
        To build a truly scalable, resilient organization, you must extract that tribal knowledge and codify it into a structural, repeatable asset. You need a Sales Playbook.
      </p>

      <div className="bg-[#0A1628]/60 p-6 rounded-xl border border-[#00C2FF]/20 my-8">
        <h4 className="text-[#00C2FF] font-bold mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> What is a Playbook?
        </h4>
        <p className="text-sm text-slate-300">
          A modern sales playbook is not a dusty 50-page PDF sitting on a shared Google Drive that nobody ever reads. It is a living, breathing digital document. It contains exact word-for-word cold call scripts, email templates for every stage of the funnel, objection-handling matrices, and competitive battle cards detailing exactly how your product stacks up against your three biggest rivals.
        </p>
      </div>

      <h2 id="digitizing-the-playbook" className="scroll-mt-28">Digitizing the Playbook</h2>
      <p>
        The mistake most companies make is separating the training material from the execution environment. If a rep is on a live phone call and faces a sudden objection regarding integration capabilities, they do not have time to open a new tab, log into an intranet portal, find the training PDF, scroll to page 34, and read the answer. The moment of hesitation will kill the deal.
      </p>

      <p>
        Your playbook must be digitized and fully integrated into the software where the rep actually works: the CRM.
      </p>

      <h2 id="crm-integrated-training" className="scroll-mt-28">CRM-Integrated Training</h2>
      <p>
        When a new lead card drops into the visual pipeline, the CRM should contextually surface the necessary training materials right next to the lead data. 
      </p>

      <p>
        If the lead is marked as "Healthcare Industry," the CRM should automatically display the Healthcare Battlecard, highlighting the specific compliance features the rep needs to pitch. If the rep moves the lead to the "Proposal Sent" stage, the CRM should instantly provide the three approved follow-up email templates specifically designed for that stage. 
      </p>

      <p>
        This is "Just-In-Time" learning. You are feeding the junior rep the exact information they need, precisely at the moment they need to execute it. This completely eliminates the anxiety of "What do I say next?" and allows a rep with only 2 weeks of experience to sound like a seasoned industry veteran.
      </p>

      <h2 id="measuring-ramp-time" className="scroll-mt-28">Measuring Ramp Time</h2>
      <p>
        The ultimate metric of a successful onboarding process is "Ramp Time"—how many days it takes a new hire to close their first deal and achieve full quota capacity. 
      </p>

      <p>
        When a company relies on shadowing, average ramp time in B2B SaaS is typically 3 to 6 months. By deploying a CRM-integrated digital playbook, organizations regularly reduce their ramp time to under 45 days. By drastically cutting the time it takes to get a rep profitable, you fundamentally change the economics of scaling your sales floor.
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Conclusion & Final Thoughts</h2>
      <p>
        Stop treating sales training as an informal, unstructured event. Your company's sales methodology is a proprietary asset that must be documented, digitized, and injected directly into your reps' daily workflow. Give your new hires the exact scripts and templates they need to win, and watch your onboarding costs plummet while your team's confidence skyrockets.
      </p>

      <p className="mt-12 italic text-slate-400 bg-white/[0.02] p-6 rounded-xl border border-white/[0.05]">
        <em>If you want to see how we build robust documentation systems and dashboards to track rep performance, read my breakdown: <a href="https://dattasable.com/blog/strategic-bi-guide-india-2026" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-bold">The 2026 Strategic BI Guide</a>.</em>
      </p>

      <div className="my-12 p-8 bg-gradient-to-br from-[#0A1628] to-[#0A1628]/40 border border-[#00C2FF]/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-32 h-32 text-[#00C2FF]" />
        </div>
        <h4 className="text-white font-bold mb-4 text-xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-[#00C2FF]" /> Onboard reps faster.
        </h4>
        <p className="text-base text-slate-300 mb-8 max-w-2xl leading-relaxed">
          NexDial allows sales leaders to build automated templates, scripts, and workflows directly into the visual pipeline, ensuring every new rep executes the perfect follow-up sequence from day one.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)]">
          Start Your Free Trial Today
        </a>
      </div>
    </>
  )
};
