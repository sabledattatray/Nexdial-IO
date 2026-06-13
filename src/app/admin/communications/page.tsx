"use client";

import { useState } from "react";
import { Radio, Mail, MessageCircle, Send, Users, AlignLeft, Info, CheckCircle2 } from "lucide-react";

type Channel = "EMAIL" | "WHATSAPP";
type Audience = "ALL" | "TRIAL" | "ACTIVE" | "AT_RISK" | "STARTER" | "GROWTH" | "PRO" | "ENTERPRISE";

export default function CommunicationCenterPage() {
  const [channel, setChannel] = useState<Channel>("EMAIL");
  const [audience, setAudience] = useState<Audience>("ALL");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!message || (channel === "EMAIL" && !subject)) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!confirm(`Are you sure you want to broadcast this to the ${audience} segment via ${channel}?`)) {
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, audience, subject, message })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setSubject("");
          setMessage("");
        }, 5000);
      } else {
        alert("Broadcast failed.");
      }
    } catch (e) {
      console.error(e);
      alert("Error sending broadcast.");
    }

    setIsSending(false);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Radio className="w-6 h-6 text-[#00C2FF]" />
          Communication Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">Broadcast product updates, billing notices, or retention campaigns to your clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#020610] border border-white/10 rounded-xl p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Compose Broadcast</h2>
            
            {/* Channel Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Delivery Channel</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setChannel("EMAIL")}
                  className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${channel === 'EMAIL' ? 'bg-[#00C2FF]/10 border-[#00C2FF] text-[#00C2FF]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  <Mail className="w-5 h-5" /> Email
                </button>
                <button 
                  onClick={() => setChannel("WHATSAPP")}
                  className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${channel === 'WHATSAPP' ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </button>
              </div>
            </div>

            {/* Audience Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Target Audience</label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <select 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] appearance-none"
                >
                  <option value="ALL">All Workspaces</option>
                  <option value="ACTIVE">All Active Workspaces (Paid)</option>
                  <option value="TRIAL">Trial Workspaces (Not converted yet)</option>
                  <option value="AT_RISK">At-Risk Workspaces (Health &lt; 80)</option>
                  <option value="STARTER">Starter Plan Clients</option>
                  <option value="GROWTH">Growth Plan Clients</option>
                  <option value="PRO">Pro Plan Clients</option>
                  <option value="ENTERPRISE">Enterprise Plan Clients</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {channel === "EMAIL" && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Line</label>
                  <input 
                    type="text" 
                    placeholder="Enter email subject..." 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" /> Message Body
                </label>
                <textarea 
                  rows={8}
                  placeholder={`Write your ${channel.toLowerCase()} message here... Use {{first_name}} and {{company_name}} for personalization.`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] resize-none font-mono text-sm"
                />
              </div>
            </div>

            {/* Action */}
            <div className="mt-8">
              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-lg flex items-center justify-center gap-2 font-bold animate-in fade-in zoom-in">
                  <CheckCircle2 className="w-5 h-5" />
                  Broadcast Queued Successfully!
                </div>
              ) : (
                <button 
                  onClick={handleSend}
                  disabled={isSending || !message || (channel === "EMAIL" && !subject)}
                  className="w-full bg-gradient-to-r from-[#00C2FF] to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    "Queuing Broadcast..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Broadcast
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#00C2FF]/10 to-transparent border border-[#00C2FF]/20 rounded-xl p-6">
            <h3 className="text-[#00C2FF] font-bold flex items-center gap-2 mb-4">
              <Info className="w-5 h-5" />
              Dynamic Variables
            </h3>
            <p className="text-sm text-slate-400 mb-4">You can personalize your broadcast by inserting these variables into the message body or subject line:</p>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-white">{"{{first_name}}"}</span>
                <span className="text-slate-500">Workspace Owner First Name</span>
              </li>
              <li className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-white">{"{{company_name}}"}</span>
                <span className="text-slate-500">Workspace Name</span>
              </li>
              <li className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-white">{"{{plan_name}}"}</span>
                <span className="text-slate-500">Current Subscription Plan</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#020610] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Delivery Guidelines</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                <strong className="text-white block mb-1">Email Deliverability</strong>
                Emails are sent via your configured SMTP provider (e.g., SendGrid/AWS SES). Keep subjects clear and avoid spam triggers to ensure high inbox placement.
              </p>
              <p>
                <strong className="text-white block mb-1">WhatsApp Broadcasts</strong>
                WhatsApp messages require a pre-approved Meta template if sending outside the 24-hour service window. Ensure your message matches an approved utility or marketing template.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
