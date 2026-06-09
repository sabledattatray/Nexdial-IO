import React, { useState } from 'react';
import { 
  Bot, Sparkles, Send, RefreshCw, Layers, ShieldCheck, Heart, User 
} from 'lucide-react';

export default function AICopilotView() {
  
  const [promptInput, setPromptInput] = useState('');
  const [responseOutput, setResponseOutput] = useState<string>(
    "Hello Agent! I am your NexDial AI Copilot. How can I assist you in routing outreach leads or countering sales objections today?"
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePromptSubmit = (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = customPrompt || promptInput;
    if (!query.trim()) return;

    setIsGenerating(true);
    setResponseOutput('');

    // Preconfigured response mock map for realistic answers
    setTimeout(() => {
      setIsGenerating(false);
      let answer = '';
      const trimmedQuery = query.toLowerCase();

      if (trimmedQuery.includes('objection') || trimmedQuery.includes('budget')) {
        answer = `*AI Objection Response (Budget Override)*
👉 **Acknowledge:** Value their pricing sensitivity instantly.
👉 **Pivot Strategy:** "I completely understand, Dr. Vyas. Many clinics starting out request simpler tiers. However, because our predictive dialers process 220 leads under 4 minutes, you generally convert enough qualified consultations on our $30 Starter tier to pay off your monthly gateway fees in your first week."
👉 **Close Prompt:** "Could we align a dynamic 5-minute sandbox test on your patient list in the morning?"`;
      } else if (trimmedQuery.includes('pitch') || trimmedQuery.includes('saas')) {
        answer = `*AI Outreach Cold-Pitch Draft (Enterprise SaaS)*
🎤 **Hook [0:00 - 0:10]:** "Hi, this is Dattatray with NexDial. Is your tech team currently using manual dialing or standard legacy SIP lines for inbound medical leads scheduling?"
🎤 **Value [0:10 - 0:25]:** "The reason I call is we pre-bundle Twilio trunk pathways to route predictive dial logs directly. It cuts wrap times by 40% and keeps latency below 12ms."
🎤 **CTA [0:25 - 0:35]:** "I can provision a free SIP testing seat for your manager is morning, do you have 2 minutes to inspect the canvas tools?"`;
      } else {
        answer = `*AI Core Consultation Summary regarding "${query}"*
💡 **Analysis:** Active campaign filters indicate target stakeholders are highly responsive to high-contrast codec speed and SLA call routing parameters.
💡 **Action Item:** Integrate dynamic calendar booking webhooks inside your WhatsApp Business API campaigns template to automate offline leads follow-up loops.
💡 **Recommended Pitch Script Override:** Focus heavily on the OPUS Fullband 48kHz acoustic clarity when presenting.`;
      }

      setResponseOutput(answer);
      if (!customPrompt) setPromptInput('');
    }, 1500);

  };

  const handleSelectPreset = (pText: string) => {
    handlePromptSubmit(undefined, pText);
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-display font-extrabold text-[#818CF8] text-2xl tracking-tight">AI Outbound Sales Copilot</h2>
        <p className="text-xs text-slate-450 mt-1 font-light">Leverage generative intelligence sandbox triggers to get real-time objection rebuttals, cold pitching templates, and call summaries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Playbook Templates sidebar (col-span-4) */}
        <div className="lg:col-span-4 bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
          <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 border-b border-slate-900 pb-1.5 pl-1">Playbook Scenarios</p>
          
          <div className="space-y-2 text-xs">
            {[
              { label: "Overcome 'No Budget' objections", prompt: "How do I overcome no budget objections?" },
              { label: "Cold Pitch SaaS platforms hook", prompt: "Draft a modern 30-second cold pitch script for enterprise SaaS partners." },
              { label: "Draft call follow-up parameters", prompt: "Create a standard professional follow-up email after a completed call." }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p.prompt)}
                className="w-full text-left p-3 rounded-xl bg-[#0A0A0B]/80 hover:bg-[#0A0A0B] border border-slate-900 hover:border-slate-800 transition-all text-slate-400 hover:text-slate-200 cursor-pointer block"
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{p.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Playground Output block (col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 flex flex-col h-80 justify-between">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase font-mono text-slate-300">
                <Bot className="w-4.5 h-4.5 text-[#818CF8]" />
                <span>AI Sandbox Output Terminal</span>
              </div>

              {isGenerating && (
                <div className="flex items-center gap-1.5 text-[#818CF8] text-[10px] font-mono whitespace-nowrap">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing logic rules...</span>
                </div>
              )}
            </div>

            {/* Generated results block */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-4 font-light text-slate-300 leading-relaxed text-xs">
              {isGenerating ? (
                <div className="h-full flex items-center justify-center text-slate-500 italic">
                  Running sandbox rules through NexDial neural networks...
                </div>
              ) : (
                <pre className="font-sans whitespace-pre-wrap">{responseOutput}</pre>
              )}
            </div>

            <div className="border-t border-slate-900 pt-3 text-[10px] text-slate-500 font-mono flex items-center justify-between flex-shrink-0 select-none">
              <span>Model Reference: Gemini 2.5 Flash Sandbox</span>
              <span>100% Secure Pipeline</span>
            </div>

          </div>

          {/* Prompt Form */}
          <form onSubmit={handlePromptSubmit} className="flex gap-2.5 items-center">
            <input 
              type="text" 
              placeholder="Ask Copilot for custom pitch scripts, rebuttals, or summaries..." 
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              disabled={isGenerating}
              className="flex-1 px-4 py-2.5 bg-[#0E0E10] border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="p-2.5 bg-indigo-650 hover:bg-indigo-500 text-white rounded-xl transition-all cursor-pointer shadow shrink-0"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
