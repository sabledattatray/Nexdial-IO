/* eslint-disable react/no-unescaped-entities */
import { BlogPost } from "./types";
import { CheckCircle, Route, Users, RefreshCw } from "lucide-react";

export const sevenTouchSequence: BlogPost = {
  title: "The 7-Touch Sales Sequence That Actually Converts",
  excerpt: "Most reps send two emails and quit. Learn the exact 14-day, 7-touch omnichannel sequence used by elite B2B sales teams to pierce through executive noise and secure high-value meetings.",
  date: "June 23, 2026",
  author: "Datta Sable",
  category: "Sales Strategy",
  readTime: "11 min read",
  schemaImage: "/images/blog/seven_touch_sequence_1781468840915.png",
  sections: [
    { id: "the-myth-of-annoying", label: "The Myth of 'Annoying' the Prospect" },
    { id: "the-value-driven-framework", label: "The Value-Driven Framework" },
    { id: "touch-1-2-the-double-tap", label: "Touches 1 & 2: The Double Tap" },
    { id: "touch-3-4-proof-and-voice", label: "Touches 3 & 4: Proof and Voice" },
    { id: "touch-5-6-social-and-video", label: "Touches 5 & 6: Social and Video" },
    { id: "touch-7-the-break-up", label: "Touch 7: The Break-Up" },
    { id: "wrap-up", label: "Conclusion & Final Thoughts" }
  ],
  content: (
    <>
      <h2 id="the-myth-of-annoying" className="scroll-mt-28">The Myth of 'Annoying' the Prospect</h2>
      <p>
        The number one reason junior sales reps fail is their intense, paralyzing fear of "annoying" the prospect. When a rep sends an email on Monday and doesn't get a reply, their brain invents a narrative: "The prospect hated my email, they think I'm a spammer, and they never want to speak to me." Therefore, the rep doesn't send the follow-up email on Thursday.
      </p>

      <p>
        This narrative is completely fabricated. In B2B sales, your prospect is an executive operating with a completely overflowing inbox. When they see your first cold email, they do not hate it—they simply deprioritize it because they are dealing with an HR crisis, a delayed vendor shipment, or a board meeting. 
      </p>

      <p>
        Silence is not rejection; silence is just a lack of immediate priority. To pierce through the noise of an executive's day, you must abandon the fear of being annoying and embrace the discipline of professional persistence. Statistically, it takes an average of seven touchpoints to generate a meaningful response from a B2B buyer. 
      </p>

      <h2 id="the-value-driven-framework" className="scroll-mt-28">The Value-Driven Framework</h2>
      <p>
        However, persistence is only effective if it is tied to value. If your 7-touch sequence consists of you sending "Just checking in!" seven times in a row, you actually *will* be annoying, and you will be blocked.
      </p>

      <p>
        A professional sequence provides net-new value in every single interaction. You must educate the buyer, share industry insights, and prove your competence over the course of 14 days. Furthermore, you must be omnichannel. Sending 7 emails is boring. You need to mix email, phone calls, LinkedIn, and video to create a surround-sound effect. Here is the exact blueprint.
      </p>

      <div className="bg-[#0A1628]/60 p-6 rounded-xl border border-[#00C2FF]/20 my-8">
        <h4 className="text-[#00C2FF] font-bold mb-3 flex items-center gap-2">
          <RefreshCw className="w-5 h-5" /> Automating the Cadence
        </h4>
        <p className="text-sm text-slate-300">
          A human rep cannot manually remember to execute a 14-day sequence across 50 prospects. You must use CRM automation. The CRM should automatically send the emails and generate tasks for the rep to make the phone calls on the exact correct days. Execution must be systematized, not reliant on memory.
        </p>
      </div>

      <h2 id="touch-1-2-the-double-tap" className="scroll-mt-28">Touches 1 & 2: The Double Tap (Day 1)</h2>
      <p>
        The sequence begins with high energy. 
      </p>

      <p>
        <strong>Touch 1 (Email):</strong> A highly personalized, 4-sentence cold email. Identify a specific pain point relevant to their exact role, state how your product solves it, and end with a low-friction call to action (e.g., "Are you open to a brief chat next Tuesday?").
      </p>

      <p>
        <strong>Touch 2 (Phone Call):</strong> Exactly 2 hours after sending the email, call the prospect. The goal is to catch them while the email is fresh. If they don't answer, do NOT leave a voicemail. You want to save your voicemails for later in the cadence when they have more context on who you are.
      </p>

      <h2 id="touch-3-4-proof-and-voice" className="scroll-mt-28">Touches 3 & 4: Proof and Voice (Day 4)</h2>
      <p>
        You have given them a few days to breathe. Now, you inject value.
      </p>

      <p>
        <strong>Touch 3 (Email):</strong> Send an email that provides proof. "Hi Sarah, following up on my note from Tuesday. I know companies in [Industry] often struggle with [Specific Problem]. Here is a 1-page case study showing how we helped [Competitor] reduce that friction by 30%." Do not ask for a meeting in this email. Just provide the asset.
      </p>

      <p>
        <strong>Touch 4 (Voicemail):</strong> Later that afternoon, call them again. When it goes to voicemail, leave a 15-second, high-energy message. "Hey Sarah, it's John from NexDial. I just sent over a quick case study I thought you'd find interesting. No need to call me back, just wanted to put it on your radar. Talk soon."
      </p>

      <h2 id="touch-5-6-social-and-video" className="scroll-mt-28">Touches 5 & 6: Social and Video (Day 8)</h2>
      <p>
        The prospect has now received your emails and heard your voice. It is time to shift channels to break the pattern of the email inbox.
      </p>

      <p>
        <strong>Touch 5 (LinkedIn):</strong> Send a LinkedIn connection request with a personalized note. Keep it casual. "Hi Sarah, been trying to reach you via email regarding [Topic]. Thought I'd try connecting here. Would love to share some insights on how we are solving [Problem] for teams like yours."
      </p>

      <p>
        <strong>Touch 6 (Video Email):</strong> If they accept the LinkedIn request but don't reply, go back to email on Day 10. This time, send a customized, 60-second Loom video. Seeing a human face vastly increases trust. Briefly show your software solving their specific pain point on screen. 
      </p>

      <h2 id="touch-7-the-break-up" className="scroll-mt-28">Touch 7: The Break-Up (Day 14)</h2>
      <p>
        If you have reached Day 14 with absolutely zero engagement, it is time to deploy the most powerful email in the sequence: The Break-Up.
      </p>

      <p>
        <strong>Touch 7 (Email):</strong> "Hi Sarah, I've reached out a few times regarding [Solution], but haven't heard back. Usually, when this happens, it means fixing [Problem] isn't a priority for your team right now. I completely understand, so I'll stop reaching out. If things change in the future, my contact info is below."
      </p>

      <p>
        Ironically, the Break-Up email often has the highest reply rate of the entire sequence. It triggers a psychological phenomenon known as "Loss Aversion." The prospect realizes you are taking the opportunity away, which forces them to finally make a decision and reply.
      </p>

      <h2 id="wrap-up" className="scroll-mt-28">Conclusion & Final Thoughts</h2>
      <p>
        Professional sales is an exercise in disciplined persistence. By architecting a multi-touch, omnichannel sequence that leads with value and leverages automated CRM workflows, you can systematically break through the noise, build trust, and drastically increase your meeting booked rate. Stop quitting on Day 2.
      </p>

      <p className="mt-12 italic text-slate-400 bg-white/[0.02] p-6 rounded-xl border border-white/[0.05]">
        <em>If you want to read more about how automation architecture drives real business outcomes, check out my deep dive: <a href="https://dattasable.com/blog/case-study-workflow-automation-roi" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-bold">Automating 400+ Manual MIS Hours</a>.</em>
      </p>

      <div className="my-12 p-8 bg-gradient-to-br from-[#0A1628] to-[#0A1628]/40 border border-[#00C2FF]/30 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Route className="w-32 h-32 text-[#00C2FF]" />
        </div>
        <h4 className="text-white font-bold mb-4 text-xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-[#00C2FF]" /> Program your success.
        </h4>
        <p className="text-base text-slate-300 mb-8 max-w-2xl leading-relaxed">
          NexDial allows sales leaders to program these complex 7-touch sequences directly into the CRM. When a lead enters the system, the platform automatically triggers the exact emails, SMS messages, and call tasks on the perfect days.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-[#00C2FF] text-[#081120] text-sm font-bold rounded-lg hover:bg-[#00E5A0] transition-colors shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)]">
          Start Your Free Trial Today
        </a>
      </div>
    </>
  )
};
