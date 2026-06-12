"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Code, 
  TerminalSquare, 
  FileSpreadsheet, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Share2,
  Users,
  Camera,
  Briefcase,
  Video
} from "lucide-react";

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Integrations & Lead Sources</h1>
        <p className="text-slate-400">Connect your external platforms to instantly pipe leads into your NexDial CRM inbox.</p>
      </div>

      <div className="grid lg:grid-cols-[280px,1fr] gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
              activeTab === "whatsapp" 
                ? "bg-[#25D366]/10 border border-[#25D366]/20 text-white" 
                : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === "whatsapp" ? "bg-[#25D366]/20" : "bg-white/5"}`}>
              <MessageSquare className={`w-5 h-5 ${activeTab === "whatsapp" ? "text-[#25D366]" : "text-slate-400"}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">WhatsApp API</h3>
              <p className="text-[11px] opacity-70 mt-0.5">Meta webhook sync</p>
            </div>
            {activeTab === "whatsapp" && <ChevronRight className="w-4 h-4 text-[#25D366]" />}
          </button>

          <button
            onClick={() => setActiveTab("website")}
            className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
              activeTab === "website" 
                ? "bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-white" 
                : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === "website" ? "bg-[#00C2FF]/20" : "bg-white/5"}`}>
              <Code className={`w-5 h-5 ${activeTab === "website" ? "text-[#00C2FF]" : "text-slate-400"}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Website Form</h3>
              <p className="text-[11px] opacity-70 mt-0.5">Embed HTML snippet</p>
            </div>
            {activeTab === "website" && <ChevronRight className="w-4 h-4 text-[#00C2FF]" />}
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
              activeTab === "api" 
                ? "bg-[#0057D9]/10 border border-[#0057D9]/20 text-white" 
                : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === "api" ? "bg-[#0057D9]/20" : "bg-white/5"}`}>
              <TerminalSquare className={`w-5 h-5 ${activeTab === "api" ? "text-[#0057D9]" : "text-slate-400"}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Developer API</h3>
              <p className="text-[11px] opacity-70 mt-0.5">Zapier & Custom HTTP</p>
            </div>
            {activeTab === "api" && <ChevronRight className="w-4 h-4 text-[#0057D9]" />}
          </button>

          <button
            onClick={() => setActiveTab("csv")}
            className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
              activeTab === "csv" 
                ? "bg-purple-500/10 border border-purple-500/20 text-white" 
                : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === "csv" ? "bg-purple-500/20" : "bg-white/5"}`}>
              <FileSpreadsheet className={`w-5 h-5 ${activeTab === "csv" ? "text-purple-400" : "text-slate-400"}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">CSV Import</h3>
              <p className="text-[11px] opacity-70 mt-0.5">Bulk manual upload</p>
            </div>
            {activeTab === "csv" && <ChevronRight className="w-4 h-4 text-purple-400" />}
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
              activeTab === "social" 
                ? "bg-pink-500/10 border border-pink-500/20 text-white" 
                : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === "social" ? "bg-pink-500/20" : "bg-white/5"}`}>
              <Share2 className={`w-5 h-5 ${activeTab === "social" ? "text-pink-500" : "text-slate-400"}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Social Media</h3>
              <p className="text-[11px] opacity-70 mt-0.5">FB & Instagram Leads</p>
            </div>
            {activeTab === "social" && <ChevronRight className="w-4 h-4 text-pink-500" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-[#050A15] border border-white/10 rounded-2xl p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "whatsapp" && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center border border-[#25D366]/30">
                    <MessageSquare className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">WhatsApp Webhook</h2>
                    <p className="text-sm text-slate-400">Receive WhatsApp leads instantly via Meta's Cloud API.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">1. Configure your Webhook URL</h3>
                  <p className="text-sm text-slate-400">Paste this exact URL into your Meta Developer Dashboard under "WhatsApp &gt; Configuration".</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#020610] border border-white/10 rounded-lg p-3 font-mono text-sm text-[#00C2FF] overflow-x-auto">
                      https://api.nexdial.io/v1/webhook/whatsapp/ws_12345abcde
                    </div>
                    <button 
                      onClick={() => copyToClipboard("https://api.nexdial.io/v1/webhook/whatsapp/ws_12345abcde", "wa-url")}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
                    >
                      {copied === "wa-url" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white">2. Webhook Verify Token</h3>
                  <p className="text-sm text-slate-400">Meta requires this token to verify your server connection.</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#020610] border border-white/10 rounded-lg p-3 font-mono text-sm text-[#00E5A0] overflow-x-auto">
                      nexdial_verify_8f7d6a5s4d
                    </div>
                    <button 
                      onClick={() => copyToClipboard("nexdial_verify_8f7d6a5s4d", "wa-token")}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
                    >
                      {copied === "wa-token" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#00C2FF] hover:underline font-semibold">
                    Read the step-by-step setup guide <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === "website" && (
              <motion.div
                key="website"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00C2FF]/20 flex items-center justify-center border border-[#00C2FF]/30">
                    <Code className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Website Form Embed</h2>
                    <p className="text-sm text-slate-400">Drop a high-converting form onto your website.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Embed Script</h3>
                  <p className="text-sm text-slate-400">Copy and paste this script directly into your website's HTML where you want the form to appear. Works on WordPress, Shopify, Webflow, and custom sites.</p>
                  
                  <div className="relative group">
                    <pre className="bg-[#020610] border border-white/10 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`<div id="nexdial-form-container"></div>
<script 
  src="https://cdn.nexdial.io/embed.js" 
  data-workspace="ws_12345abcde" 
  data-theme="dark" 
  async>
</script>`}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`<div id="nexdial-form-container"></div>\n<script \n  src="https://cdn.nexdial.io/embed.js" \n  data-workspace="ws_12345abcde" \n  data-theme="dark" \n  async>\n</script>`, "form-code")}
                      className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded backdrop-blur-sm transition-colors text-white"
                    >
                      {copied === "form-code" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-full bg-[#0057D9]/20 flex items-center justify-center border border-[#0057D9]/30">
                    <TerminalSquare className="w-6 h-6 text-[#0057D9]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Developer API</h2>
                    <p className="text-sm text-slate-400">Create leads programmatically using our REST API.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">Your Secret API Key</h3>
                  <p className="text-sm text-slate-400">Include this in the <code className="text-white bg-white/10 px-1 rounded">Authorization</code> header. Keep this secret!</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#020610] border border-white/10 rounded-lg p-3 font-mono text-sm text-[#00C2FF] overflow-x-auto blur-[3px] hover:blur-none transition-all duration-300">
                      nd_live_abcd1234efgh5678ijkl9012mnop
                    </div>
                    <button 
                      onClick={() => copyToClipboard("nd_live_abcd1234efgh5678ijkl9012mnop", "api-key")}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
                    >
                      {copied === "api-key" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white">cURL Example</h3>
                  
                  <div className="relative group">
                    <pre className="bg-[#020610] border border-white/10 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`curl -X POST https://api.nexdial.io/v1/leads \\
  -H "Authorization: Bearer nd_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Doe",
    "phone": "+919876543210",
    "email": "jane@example.com",
    "source": "API"
  }'`}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`curl -X POST https://api.nexdial.io/v1/leads \\\n  -H "Authorization: Bearer nd_live_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "Jane Doe",\n    "phone": "+919876543210",\n    "email": "jane@example.com",\n    "source": "API"\n  }'`, "curl-code")}
                      className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded backdrop-blur-sm transition-colors text-white"
                    >
                      {copied === "curl-code" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "csv" && (
              <motion.div
                key="csv"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <FileSpreadsheet className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">CSV Bulk Import</h2>
                    <p className="text-sm text-slate-400">Upload thousands of leads instantly from your old spreadsheets.</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-white/10 hover:border-purple-500/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center bg-[#020610]/50 group">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet className="w-8 h-8 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Drag & Drop your CSV file here</h3>
                  <p className="text-xs text-slate-500 mb-6">Must include columns for Name and Phone Number.</p>
                  <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors">
                    Browse Files
                  </button>
                </div>
                
                <div className="flex justify-center">
                  <button className="text-sm text-purple-400 hover:underline font-semibold flex items-center gap-2">
                    Download CSV Template <Copy className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "social" && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                    <Share2 className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Social Media Lead Ads</h2>
                    <p className="text-sm text-slate-400">Automatically sync leads from Facebook and Instagram Ads.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Facebook */}
                  <div className="bg-[#020610]/80 border border-white/5 hover:border-[#1877F2]/50 rounded-xl p-5 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#1877F2]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded">OFFICIAL</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">Facebook Lead Ads</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">Sync leads instantly from your FB Page campaigns.</p>
                    <button className="w-full bg-white/5 hover:bg-[#1877F2] text-white py-2 rounded-lg text-xs font-semibold transition-colors">
                      Connect
                    </button>
                  </div>

                  {/* Instagram */}
                  <div className="bg-[#020610]/80 border border-white/5 hover:border-[#E1306C]/50 rounded-xl p-5 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#F56040] to-[#E1306C] flex items-center justify-center opacity-80">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded">OFFICIAL</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">Instagram Business</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">Capture leads straight from Instagram forms.</p>
                    <button className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-[#F56040] hover:to-[#E1306C] text-white py-2 rounded-lg text-xs font-semibold transition-all">
                      Connect
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div className="bg-[#020610]/80 border border-white/5 hover:border-[#0A66C2]/50 rounded-xl p-5 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#0A66C2]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 bg-white/5 px-2 py-1 rounded">COMING SOON</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">LinkedIn Gen Forms</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">Perfect for B2B pipeline growth and tracking.</p>
                    <button disabled className="w-full bg-white/5 text-slate-500 py-2 rounded-lg text-xs font-semibold cursor-not-allowed">
                      Connect
                    </button>
                  </div>

                  {/* TikTok */}
                  <div className="bg-[#020610]/80 border border-white/5 hover:border-[#00F2FE]/50 rounded-xl p-5 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#000000] border border-white/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 bg-white/5 px-2 py-1 rounded">COMING SOON</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">TikTok Lead Generation</h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">Sync your viral campaign signups instantly.</p>
                    <button disabled className="w-full bg-white/5 text-slate-500 py-2 rounded-lg text-xs font-semibold cursor-not-allowed">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white">Manual Zapier Sync</h3>
                  <p className="text-sm text-slate-400">If you prefer using Zapier to route your social leads, use this dedicated webhook URL specifically for tracking Social campaigns.</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#020610] border border-white/10 rounded-lg p-3 font-mono text-sm text-[#00E5A0] overflow-x-auto">
                      https://api.nexdial.io/v1/webhook/social/ws_12345abcde
                    </div>
                    <button 
                      onClick={() => copyToClipboard("https://api.nexdial.io/v1/webhook/social/ws_12345abcde", "social-url")}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-slate-300"
                    >
                      {copied === "social-url" ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
