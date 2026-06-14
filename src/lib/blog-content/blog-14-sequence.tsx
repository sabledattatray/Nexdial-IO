/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle } from "lucide-react";

export const sevenTouchSequence: BlogPost = {
  title: "The Psychology of the 7-Touch Sales Sequence",
  excerpt: "Why do most reps give up after two calls? Explore the psychology behind persistence and why it takes an average of 7 touches to close a modern B2B deal.",
  date: "June 23, 2026",
  author: "Nisha P.",
  category: "Sales Strategy",
  readTime: "8 min read",
  schemaImage: "/images/blog/seven_touch_sequence.png",
  sections: [
    { id: "giving-up", label: "Giving Up Too Early" },
    { id: "the-psychology", label: "The Psychology of Persistence" },
    { id: "structuring-the-sequence", label: "Structuring the 7 Touches" },
    { id: "wrap-up", label: "Bottom Line" }
  ],
  content: (
    <>
      <h2 id="giving-up" className="scroll-mt-28">Giving Up Too Early</h2>
      <p>
        Here is a stat that should terrify every sales manager: 44% of salespeople give up after exactly one follow-up call. If the prospect doesn't answer or reply to the first email, the rep marks them as "Dead" and moves on to the next shiny new lead.
      </p>

      <p>
        But here is the reality of modern B2B sales: it takes an average of 7 to 8 touches just to get a qualified meeting. If your team is quitting after attempt number two, you are literally leaving 80% of your potential revenue on the table.
      </p>

      <h2 id="the-psychology" className="scroll-mt-28">The Psychology of Persistence</h2>
      <p>
        Why do reps quit so early? It's human nature. Rejection hurts. Silence feels like rejection. When a rep sends three emails and gets no reply, their brain tells them, "This person hates me, I should stop bothering them."
      </p>

      <p>
        But you have to reframe this psychology. Silence is rarely malicious. Your prospect is a busy executive. They are putting out fires, dealing with HR issues, and attending back-to-back Zoom meetings. When they see your second email, they probably think, "Oh right, I need to reply to this," but then their kid walks into the room, and the email is forgotten.
      </p>

      <p>
        Professional persistence isn't annoying; it's a service. You are politely keeping your solution at the top of their inbox until they finally have 5 minutes of breathing room to engage with you.
      </p>

      <h2 id="structuring-the-sequence" className="scroll-mt-28">Structuring the 7 Touches</h2>
      <p>
        The key to a 7-touch sequence is that it cannot just be you saying "Just checking in!" seven times in a row. That actually *is* annoying. Every touch must provide new value.
      </p>

      <ul>
        <li><strong>Touch 1 & 2 (Day 1):</strong> The immediate double-tap. An email with the core value prop, followed by a phone call.</li>
        <li><strong>Touch 3 (Day 3):</strong> An email sharing a highly relevant case study of a competitor you helped.</li>
        <li><strong>Touch 4 (Day 5):</strong> A polite phone call. Leave a 15-second voicemail.</li>
        <li><strong>Touch 5 (Day 7):</strong> A LinkedIn connection request with a personalized note, engaging them on a different platform.</li>
        <li><strong>Touch 6 (Day 10):</strong> A short email with a loom video walking through a specific feature they would care about.</li>
        <li><strong>Touch 7 (Day 14):</strong> The "Break-up" email. "It seems like this isn't a priority right now, I'll stop reaching out. Let me know if things change." (Ironically, this often gets the highest reply rate).</li>
      </ul>

      <h2 id="wrap-up" className="scroll-mt-28">Bottom Line</h2>
      <p>
        You cannot expect human reps to manually remember to execute a 14-day, 7-touch sequence across 50 different prospects. It's mathematically impossible without software. You must use a CRM that automates the emails and schedules the call tasks, ensuring your team executes the psychology of persistence flawlessly.
      </p>

      <p className="mt-8 italic text-slate-400">
        <em>Want to read more on how human intent maps to software execution? Check out my framework on <a href="https://dattasable.com/blog/operator-intent-mapping-framework" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline">Operator Intent Mapping™</a>.</em>
      </p>

      <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Automate your persistence.
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          NexDial allows you to program multi-touch cadences, ensuring your reps never drop the ball on follow-ups again.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors">
          Start Your Free Trial
        </a>
      </div>
    </>
  )
};
