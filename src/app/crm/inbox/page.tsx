"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import { Search, Send, MessageCircle, User, Phone, CheckCircle2, Clock } from "lucide-react";

export default function SharedInboxPage() {
  const queryClient = useQueryClient();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetcher("/api/conversations"),
    refetchInterval: 5000, // Poll every 5s for new messages
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: { conversationId: string; content: string }) => {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      setMessageText("");
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const handleSend = () => {
    if (!activeConversationId || !messageText.trim()) return;
    sendMessageMutation.mutate({
      conversationId: activeConversationId,
      content: messageText.trim(),
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading Inbox...</div>;
  }

  const activeConversation = conversations?.find((c: any) => c.id === activeConversationId);

  return (
    <div className="h-full flex flex-col xl:flex-row gap-6">
      
      {/* Left Sidebar: Conversation List */}
      <div className="w-full xl:w-96 flex flex-col bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden shrink-0 h-[600px] xl:h-full">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Inbox
          </h2>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[#050A15] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#25D366] transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations?.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No active conversations.</div>
          ) : (
            conversations?.map((conv: any) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors flex items-start gap-3 ${
                  activeConversationId === conv.id ? "bg-white/5 border-l-2 border-l-[#25D366]" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shrink-0">
                  {conv.lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold text-white truncate">{conv.lead.name}</h3>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {conv.messages && conv.messages.length > 0 
                      ? conv.messages[conv.messages.length - 1].content 
                      : "No messages yet"}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Pane: Chat Window */}
      <div className="flex-1 flex flex-col bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden h-[600px] xl:h-full relative">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {activeConversation.lead.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm">{activeConversation.lead.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {activeConversation.lead.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold ${
                  activeConversation.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                }`}>
                  {activeConversation.status}
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#050A15]">
              {activeConversation.messages?.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <MessageCircle className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">Start the conversation</p>
                </div>
              ) : (
                activeConversation.messages?.map((msg: any) => {
                  const isOutbound = msg.direction === "OUTBOUND";
                  return (
                    <div key={msg.id} className={`flex flex-col ${isOutbound ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        isOutbound 
                          ? 'bg-[#0057D9] text-white rounded-tr-sm' 
                          : 'bg-[#1E293B] text-slate-200 border border-white/5 rounded-tl-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-slate-500">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isOutbound && (
                          msg.status === 'READ' ? <CheckCircle2 className="w-3 h-3 text-[#00C2FF]" /> :
                          msg.status === 'DELIVERED' ? <CheckCircle2 className="w-3 h-3 text-slate-400" /> :
                          <Clock className="w-3 h-3 text-slate-600" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/5 bg-[#0A1628]">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#050A15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#25D366] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!messageText.trim() || sendMessageMutation.isPending}
                  className="w-12 h-12 rounded-xl bg-[#25D366] hover:bg-[#25D366]/80 disabled:opacity-50 flex items-center justify-center text-white transition-colors shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-bold text-white mb-2">Shared Inbox</h3>
            <p className="text-sm">Select a conversation to start chatting</p>
          </div>
        )}
      </div>

    </div>
  );
}
