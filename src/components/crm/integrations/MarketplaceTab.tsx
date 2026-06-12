"use client";

import { useState } from "react";
import { 
  Share2, Users, Camera, Briefcase, Video, 
  MessageSquare, Phone, Mail, 
  Code, FormInput, MessageCircle, 
  Database, ShoppingCart, CreditCard, Calendar,
  CheckCircle2, Loader2, Copy, X
} from "lucide-react";

export default function MarketplaceTab() {
  const [connectingApp, setConnectingApp] = useState<string | null>(null);
  const [createdIntegration, setCreatedIntegration] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleConnect = async (providerName: string) => {
    setConnectingApp(providerName);
    try {
      const res = await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerName })
      });
      const data = await res.json();
      if (data.id) {
        setCreatedIntegration(data);
      } else {
        alert(data.error || "Failed to create integration");
      }
    } catch(e) {
      console.error(e);
      alert("Network error.");
    }
    setConnectingApp(null);
  };

  const copyToClipboard = () => {
    if (!createdIntegration) return;
    const url = `${window.location.origin}/api/webhooks/${createdIntegration.id}?secret=${createdIntegration.secretKey}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    {
      title: "Popular Integrations",
      description: "The most widely used connections by NexDial users.",
      items: [
        { name: "WhatsApp Business", desc: "Official Meta API sync", icon: MessageSquare, color: "text-[#25D366]", bg: "bg-[#25D366]/10", border: "hover:border-[#25D366]/50", status: "COMING SOON" },
        { name: "Facebook Lead Ads", desc: "Sync FB page leads", icon: Users, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", border: "hover:border-[#1877F2]/50", status: "OFFICIAL" },
        { name: "Instagram Business", desc: "Sync IG forms", icon: Camera, color: "text-[#E1306C]", bg: "bg-[#E1306C]/10", border: "hover:border-[#E1306C]/50", status: "OFFICIAL" },
        { name: "Embedded Form", desc: "Drop-in HTML form", icon: Code, color: "text-[#00C2FF]", bg: "bg-[#00C2FF]/10", border: "hover:border-[#00C2FF]/50", status: "OFFICIAL" },
      ]
    },
    {
      title: "Social Media",
      description: "Capture leads from social ads and campaigns.",
      items: [
        { name: "Facebook Lead Ads", desc: "Sync FB page leads", icon: Users, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", border: "hover:border-[#1877F2]/50", status: "OFFICIAL" },
        { name: "Instagram Business", desc: "Sync IG forms", icon: Camera, color: "text-[#E1306C]", bg: "bg-[#E1306C]/10", border: "hover:border-[#E1306C]/50", status: "OFFICIAL" },
        { name: "LinkedIn Gen Forms", desc: "B2B pipeline growth", icon: Briefcase, color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/10", border: "hover:border-[#0A66C2]/50", status: "COMING SOON" },
        { name: "TikTok Lead Gen", desc: "Sync viral campaigns", icon: Video, color: "text-white", bg: "bg-white/10", border: "hover:border-white/50", status: "COMING SOON" }
      ]
    },
    {
      title: "Communication Channels",
      description: "Funnel chats and calls into the CRM.",
      items: [
        { name: "WhatsApp Business", desc: "Official Meta API sync", icon: MessageSquare, color: "text-[#25D366]", bg: "bg-[#25D366]/10", border: "hover:border-[#25D366]/50", status: "COMING SOON" },
        { name: "Telegram Bot", desc: "Sync channel leads", icon: MessageCircle, color: "text-[#0088cc]", bg: "bg-[#0088cc]/10", border: "hover:border-[#0088cc]/50", status: "COMING SOON" },
        { name: "Call Tracking", desc: "Log incoming calls", icon: Phone, color: "text-purple-400", bg: "bg-purple-400/10", border: "hover:border-purple-400/50", status: "COMING SOON" },
        { name: "Email Inbox", desc: "Parse lead emails", icon: Mail, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "hover:border-yellow-400/50", status: "COMING SOON" }
      ]
    },
    {
      title: "Website Lead Sources",
      description: "Turn your traffic into sales pipeline.",
      items: [
        { name: "Embedded Form", desc: "Drop-in HTML form", icon: Code, color: "text-[#00C2FF]", bg: "bg-[#00C2FF]/10", border: "hover:border-[#00C2FF]/50", status: "OFFICIAL" },
        { name: "Landing Pages", desc: "Host custom pages", icon: FormInput, color: "text-pink-400", bg: "bg-pink-400/10", border: "hover:border-pink-400/50", status: "COMING SOON" }
      ]
    }
  ];

  return (
    <>
      {!!createdIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl w-full max-w-xl text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setCreatedIntegration(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                Integration Ready
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                We generated a secure Webhook URL for your <b>{createdIntegration.provider}</b> integration. 
                Paste this endpoint into your app's webhook settings (or use it in Zapier/Make) to instantly pipe leads into NexDial!
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Receiver Webhook URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#020610] p-3 rounded-lg font-mono text-xs break-all border border-white/10 text-green-400 overflow-x-auto whitespace-nowrap">
                    {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/${createdIntegration.id}?secret=${createdIntegration.secretKey}` : ''}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center shrink-0 text-white"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setCreatedIntegration(null)} 
                  className="px-6 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/80 text-black font-semibold rounded-lg text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 h-full overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-2">App Marketplace</h2>
          <p className="text-sm text-slate-400">Browse and connect 40+ third-party tools to automatically sync leads.</p>
        </div>

        <div className="space-y-12 pb-12">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="mb-4 border-b border-white/5 pb-2">
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
                <p className="text-sm text-slate-400">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isAvailable = item.status === "OFFICIAL";
                  const isConnecting = connectingApp === item.name;

                  return (
                    <div key={itemIdx} className={`bg-[#020610]/80 border border-white/5 ${item.border} rounded-xl p-5 transition-colors group flex flex-col`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded ${isAvailable ? 'text-green-400 bg-green-400/10' : 'text-slate-400 bg-white/5'}`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-slate-400 mb-6 line-clamp-2 flex-1">{item.desc}</p>
                      <button 
                        disabled={!isAvailable || isConnecting}
                        onClick={() => handleConnect(item.name)}
                        className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                          isAvailable 
                            ? 'bg-white/5 hover:bg-white/10 text-white' 
                            : 'bg-transparent border border-white/5 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        {isConnecting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                        {isConnecting ? "Connecting..." : isAvailable ? "Connect" : "Waitlist"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
