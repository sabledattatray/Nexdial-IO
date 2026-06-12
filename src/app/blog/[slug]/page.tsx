import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, CheckCircle } from "lucide-react";

// Local database of SEO-optimized articles
const ARTICLES: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  date: string;
  author: string;
  category: string;
  readTime: string;
  schemaImage: string;
  content: React.ReactNode;
}> = {
  "whatsapp-crm-alternative": {
    title: "WhatsApp CRM Alternatives: Why Spreadsheets are Killing Your Conversions",
    description: "Discover why tracking leads in scattered WhatsApp threads and Excel sheets slows sales down, and how a unified inbox drives conversions.",
    keywords: ["WhatsApp CRM alternative", "customer inbox CRM", "lead tracking system India", "Excel vs CRM"],
    date: "June 10, 2026",
    author: "Vikram Dev",
    category: "Lead Tracking",
    readTime: "5 min read",
    schemaImage: "https://nexdial.io/blog-whatsapp-crm.png",
    content: (
      <>
        <p>
          For many small businesses, WhatsApp is the primary communication channel. Customers message you about pricing, products, or support, and you respond in real time. It is fast, intuitive, and immediate.
        </p>
        <p>
          But as you grow from 5 queries a day to 50, WhatsApp threads become a nightmare. Messages slip through the cracks. Conversions plummet. To cope, you probably export details to an Excel spreadsheet. Now, you have two disjointed systems: WhatsApp for talking, and Excel for logging.
        </p>

        <h2>The Spreadsheets Trap: Why It Fails</h2>
        <p>
          Spreadsheets are static. They do not send follow-up notifications. They do not log calls automatically. They do not tell you if an agent has already responded. 
          When your lead data is locked in cells and your conversation is locked in chat history, three things happen:
        </p>
        <ul>
          <li><strong>Overlooked Conversations:</strong> Fresh incoming leads get buried under older chats.</li>
          <li><strong>Duplicate Effort:</strong> Multiple team members message the same customer, leading to confusion.</li>
          <li><strong>Zero Follow-up Discipline:</strong> Without structured alarms or tasks, "call back next Wednesday" simply never happens.</li>
        </ul>

        <h2>Choosing a WhatsApp CRM Alternative</h2>
        <p>
          A true <strong>WhatsApp CRM alternative</strong> does not mean getting rid of WhatsApp. It means bridging the gap. By funneling incoming chats, SMS, and missed calls into a <strong>unified customer inbox</strong>, your team can coordinate responses from a single board.
        </p>
        <p>
          NexDial solves this by organizing your incoming channels. If a lead sends a WhatsApp message or calls your number, it automatically generates a visual card in the CRM. You can log call outcomes, set reminders, and transition leads through a clean pipeline.
        </p>

        <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
          <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Ready to harden your sales pipeline?
          </h4>
          <p className="text-slate-400 text-xs mb-4">
            Ditch scattered Excel sheets and WhatsApp threads. Get a unified customer inbox today.
          </p>
          <Link href="/request-demo" className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0057D9] hover:bg-[#0057D9]/80 px-4 py-2 rounded-lg transition-colors">
            Book a Demo Session
          </Link>
        </div>
      </>
    )
  },
  "crm-for-small-business": {
    title: "The Ultimate Guide to CRM for Small Businesses in 2026",
    description: "A lightweight checklist of CRM features small business teams actually use, avoiding enterprise bloat and saving hours of manual admin.",
    keywords: ["CRM for small business", "lead management software", "small business CRM", "lightweight CRM"],
    date: "June 06, 2026",
    author: "Dr. Ananya Roy",
    category: "Small Business",
    readTime: "8 min read",
    schemaImage: "https://nexdial.io/blog-small-business-crm.png",
    content: (
      <>
        <p>
          Most Customer Relationship Management (CRM) tools are built for enterprises. They are packed with complex forecasting algorithms, AI lead scoring systems, and massive settings panels.
        </p>
        <p>
          But for small businesses, this complexity is a burden. Agents spend more time filling out forms and categorizing fields than actually calling clients. The result? The team abandons the CRM and goes back to Excel.
        </p>

        <h2>What Small Businesses Actually Need in a CRM</h2>
        <p>
          To be effective, a small business CRM must focus on speed and simplicity. You do not need automated chatbots; you need to know who to call next. Here is the lightweight feature set that matters:
        </p>
        <ol>
          <li><strong>One-Click Action Boards:</strong> Quickly view today's call list, overdue follow-ups, and new signups.</li>
          <li><strong>Manual Call Logging:</strong> Log the outcome of a phone call (Interested, No Answer, Left Voicemail) in under 3 seconds.</li>
          <li><strong>Kanban Pipelines:</strong> Visually drag and drop leads through stages like Contacted, In Progress, and Converted.</li>
          <li><strong>Zero Setup Overheads:</strong> A simple interface that anyone can master in under 5 minutes.</li>
        </ol>

        <h2>Setting Up Your CRM Pipeline</h2>
        <p>
          Do not overcomplicate your sales stages. Start with five basic columns:
          <br />
          <strong>New</strong> (incoming queries) &rarr; <strong>Contacted</strong> (initial pitch done) &rarr; <strong>Interested</strong> (proposal sent) &rarr; <strong>Converted</strong> (paid/won) &rarr; <strong>Lost</strong> (uninterested).
          Keep your lead cards moving from left to right.
        </p>

        <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
          <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Simplify your CRM workspace
          </h4>
          <p className="text-slate-400 text-xs mb-4">
            NexDial is custom-built for small business teams. Clean interfaces, quick call logging, and direct follow-ups.
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0057D9] hover:bg-[#0057D9]/80 px-4 py-2 rounded-lg transition-colors">
            View Simple Pricing
          </Link>
        </div>
      </>
    )
  },
  "lead-tracking-software-india": {
    title: "Best Lead Tracking Software in India: Streamlining Local Business Sales",
    description: "How small businesses in India utilize mobile-friendly unified customer inboxes to track leads, schedule call logs, and secure follow-ups.",
    keywords: ["lead tracking software India", "lead tracking system", "follow-up management", "India sales CRM"],
    date: "May 30, 2026",
    author: "Marcus Stone",
    category: "Sales Strategy",
    readTime: "6 min read",
    schemaImage: "https://nexdial.io/blog-lead-tracking-india.png",
    content: (
      <>
        <p>
          The Indian small business ecosystem is fast-paced. Customers expect instant callbacks, localized communication, and immediate follow-ups. 
        </p>
        <p>
          Whether you are running a real estate advisory, an educational consultancy, or a financial services firm, lead response time (speed-to-lead) is the single biggest factor in winning deals.
        </p>

        <h2>Local Challenges in Lead Tracking</h2>
        <p>
          Many Indian businesses capture leads from varied platforms: Facebook Leads, Google Ads, IndiaMART, Justdial, and direct website forms. 
          Manually copying these contacts into Excel leads to major delays. By the time your sales representative calls, the prospect has already contacted a competitor.
        </p>
        <p>
          Using a localized <strong>lead tracking system</strong> changes this:
        </p>
        <ul>
          <li><strong>Instant Aggregation:</strong> Leads are automatically pushed into a single inbox folder the second they register.</li>
          <li><strong>Indian Phone Normalization:</strong> Handle +91 prefixes and direct dial codes natively.</li>
          <li><strong>Activity Timelines:</strong> Track exactly when a lead called back, what notes were logged, and when the next follow-up is scheduled.</li>
        </ul>

        <h2>Discipline Over Automation</h2>
        <p>
          You do not need complex AI agents sending robotic automated WhatsApp texts. Prospects value human interaction. 
          The best lead tracking software simply enforces **agent discipline**. By showing the representative who needs to be called today and tracking follow-up dates, you ensure no prospect goes cold.
        </p>

        <div className="my-8 p-6 bg-[#0A1628] border border-[#00C2FF]/20 rounded-2xl">
          <h4 className="text-white font-bold mb-2 text-base flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00C2FF]" /> Boost your team's speed-to-lead
          </h4>
          <p className="text-slate-400 text-xs mb-4">
            Connect your inquiry channels to NexDial. Call, log, and follow-up on a single workspace.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0057D9] hover:bg-[#0057D9]/80 px-4 py-2 rounded-lg transition-colors">
            Get Started Free
          </Link>
        </div>
      </>
    )
  }
};

// Generate static routes metadata for SEO crawler
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ARTICLES[resolvedParams.slug];
  if (!article) return {};

  return {
    title: `${article.title} | NexDial Blog`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
      images: [{ url: article.schemaImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = ARTICLES[resolvedParams.slug];

  if (!article) {
    notFound();
  }

  // Schema.org structured JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": article.schemaImage,
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": new Date(article.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexDial",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nexdial.io/icon",
      },
    },
    "description": article.description,
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 font-sans text-slate-300">
      {/* JSON-LD Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00C2FF] mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <span className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider bg-[#00C2FF]/10 px-3 py-1 rounded-full border border-[#00C2FF]/20">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-b border-white/5 pb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-500" />
              By {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-sm prose-p:leading-relaxed prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2 text-slate-350">
          {article.content}
        </article>
      </div>
    </div>
  );
}
