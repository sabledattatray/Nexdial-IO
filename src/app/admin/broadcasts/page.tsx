"use client";

import { useState } from "react";
import { Radio, Send } from "lucide-react";

export default function AdminBroadcastsPage() {
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: broadcastTitle, message: broadcastMessage })
      });
      setBroadcastTitle("");
      setBroadcastMessage("");
      alert("Broadcast sent successfully to all clients!");
    } catch (e) {
      console.error(e);
      alert("Failed to send broadcast");
    }
    setIsSending(false);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Radio className="w-6 h-6 text-[#00C2FF]" />
            Global Broadcasts
          </h1>
          <p className="text-slate-400 text-sm mt-1">Push emergency alerts and maintenance notices to all client CRM screens instantly.</p>
        </div>
      </div>

      <div className="bg-[#020610] border border-[#00C2FF]/20 shadow-[0_0_20px_rgba(0,194,255,0.05)] rounded-xl overflow-hidden max-w-3xl">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00C2FF]/10 flex items-center justify-center border border-[#00C2FF]/20">
              <Radio className="w-5 h-5 text-[#00C2FF]" />
            </div>
            <h3 className="text-xl font-bold text-white">Create Announcement</h3>
          </div>
        </div>
        <div className="p-8">
          <form onSubmit={sendBroadcast} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Announcement Title</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#081120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] transition-colors" 
                placeholder="e.g. Scheduled Maintenance Notice" 
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message Body</label>
              <textarea 
                required 
                rows={5} 
                className="w-full bg-[#081120] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00C2FF] resize-none transition-colors" 
                placeholder="Type the message that will be shown to your clients..." 
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isSending}
                className="px-8 py-3 bg-[#00C2FF] hover:bg-[#00C2FF]/90 disabled:opacity-50 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                {isSending ? <span className="animate-spin text-xl">⟳</span> : <Send className="w-4 h-4" />}
                Push to All Clients
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
