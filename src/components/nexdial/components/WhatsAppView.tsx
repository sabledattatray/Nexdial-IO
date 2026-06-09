import React, { useState } from 'react';
import { 
  MessageSquare, Send, CheckCheck, Smile, HelpCircle, Bot, Sparkles, User, RefreshCw, Layers 
} from 'lucide-react';

interface WhatsAppChat {
  id: string;
  name: string;
  phone: string;
  unreadCount: number;
  lastMessage: string;
  time: string;
  messages: { sender: 'customer' | 'agent' | 'bot'; text: string; time: string }[];
}

export default function WhatsAppView() {
  
  // Set up 5 unread threads (badge count: 5!)
  const [chats, setChats] = useState<WhatsAppChat[]>([
    {
      id: 'wa-1',
      name: 'Dr. Harish Vyas (Healthcare)',
      phone: '+91 98452 10492',
      unreadCount: 1,
      lastMessage: 'Let’s set up a calendar invite to test your SaaS voice latency.',
      time: 'Just now',
      messages: [
        { sender: 'agent', text: 'Hi Dr. Vyas! Thanks for responding to our WhatsApp notification campaigns.', time: '11:00 AM' },
        { sender: 'customer', text: 'Let’s set up a calendar invite to test your SaaS voice latency.', time: '11:04 AM' }
      ]
    },
    {
      id: 'wa-2',
      name: 'Rohan Deshmukh',
      phone: '+91 88291 00382',
      unreadCount: 1,
      lastMessage: 'Are the outbound campaigns rates cheaper than standard VoIP trunks?',
      time: '12m ago',
      messages: [
        { sender: 'bot', text: 'Greeting from NexDial Business Support. Outbound dialing rates start at $0.009/minute.', time: '10:50 AM' },
        { sender: 'customer', text: 'Are the outbound campaigns rates cheaper than standard VoIP trunks?', time: '10:52 AM' }
      ]
    },
    {
      id: 'wa-3',
      name: 'Sneha Patil',
      phone: '+91 77382 99482',
      unreadCount: 1,
      lastMessage: 'Can we integrate the CRM leads list with our custom webhook?',
      time: '1h ago',
      messages: [
        { sender: 'customer', text: 'Can we integrate the CRM leads list with our custom webhook?', time: '10:00 AM' }
      ]
    },
    {
      id: 'wa-4',
      name: 'Abhishek Roy',
      phone: '+91 99023 11204',
      unreadCount: 1,
      lastMessage: 'I am in the middle of a patient visit, call me after 4 PM.',
      time: '2h ago',
      messages: [
        { sender: 'customer', text: 'I am in the middle of a patient visit, call me after 4 PM.', time: '09:05 AM' }
      ]
    },
    {
      id: 'wa-5',
      name: 'Aiden Smith',
      phone: '+1 415 883 0029',
      unreadCount: 1,
      lastMessage: 'Excellent, is there a template configure system inside?',
      time: '4h ago',
      messages: [
        { sender: 'customer', text: 'Excellent, is there a template configure system inside?', time: '07:12 AM' }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState('wa-1');
  const [typedMsg, setTypedMsg] = useState('');
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedMsg.trim()) return;

    // Create fresh agent turn
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const outboundTurn = {
      sender: 'agent' as const,
      text: typedMsg,
      time: timeNow
    };

    setChats(prev => prev.map(ch => {
      if (ch.id === activeChatId) {
        return {
          ...ch,
          unreadCount: 0,
          lastMessage: typedMsg,
          messages: [...ch.messages, outboundTurn]
        };
      }
      return ch;
    }));

    setTypedMsg('');

    // Trigger funny automated customer answer/receipt
    setTimeout(() => {
      const responses = [
        "That works perfectly for us. Let's arrange a voice sweep trial regarding this integration.",
        "Understood, we are reviewing your SIP trunk proposals with our network administrators.",
        "Perfect, sounds interesting indeed!"
      ];
      const botResponse = {
        sender: 'customer' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prev => prev.map(ch => {
        if (ch.id === activeChatId) {
          return {
            ...ch,
            lastMessage: botResponse.text,
            messages: [...ch.messages, botResponse]
          };
        }
        return ch;
      }));
    }, 1200);
  };

  const handlePresetTrigger = (presetText: string) => {
    setTypedMsg(presetText);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-display font-extrabold text-[#00E5B0] text-2xl tracking-tight">WhatsApp Business API Hub</h2>
        <p className="text-xs text-slate-450 mt-1 font-light">Interact over secure multi-channel WhatsApp channels, configure automated template dispatches, and trigger followups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[500px] border border-slate-800 bg-[#0E0E10] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Chat Threads Sidebar (col-span-4) */}
        <div className="md:col-span-4 border-r border-slate-850 bg-[#0D0D10] flex flex-col h-full min-w-0">
          <div className="p-4 border-b border-slate-850 flex justify-between items-center bg-[#070709] flex-shrink-0">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400">Conversations</span>
            <span className="px-2 py-0.5 bg-[#00E5B0]/10 text-[#00E5B0] border border-[#00E5B0]/20 rounded-full font-mono text-[9px] font-bold">5 UNREAD MESSAGES</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {chats.map(ch => (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChatId(ch.id);
                  // Mark read
                  setChats(prev => prev.map(c => c.id === ch.id ? { ...c, unreadCount: 0 } : c));
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex justify-between gap-2.5 items-start cursor-pointer border ${
                  activeChatId === ch.id 
                    ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-100 shadow' 
                    : 'bg-transparent border-transparent hover:bg-slate-900/35 text-slate-450'
                }`}
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-200 truncate">{ch.name}</p>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate font-light leading-none">{ch.lastMessage}</p>
                  <p className="text-[9px] text-slate-600 mt-1 font-mono">{ch.phone}</p>
                </div>

                <div className="text-right flex-shrink-0 space-y-2">
                  <p className="text-[9px] text-slate-650 font-mono whitespace-nowrap">{ch.time}</p>
                  {ch.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#00E5B0] text-[#0A0A0B] text-[9px] font-black font-mono flex items-center justify-center shadow-[0_0_6px_rgba(0,229,176,0.3)] shrink-0 ml-auto">
                      {ch.unreadCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messaging Area (col-span-8) */}
        <div className="md:col-span-8 flex flex-col h-full bg-[#0A0A0B]">
          
          {/* Header */}
          <div className="p-4 bg-[#0E0E10] border-b border-slate-850 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-[#00E5B0]">
                <User className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">{activeChat.name}</p>
                <p className="text-[9px] text-slate-500 font-mono">WhatsApp Channel: {activeChat.phone}</p>
              </div>
            </div>

            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-2 py-0.5 rounded uppercase">Connected API</span>
          </div>

          {/* Messages stream viewport */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-slate-900/10">
            {activeChat.messages.map((ms, index) => (
              <div key={index} className={`flex ${ms.sender === 'agent' ? 'justify-end' : ms.sender === 'bot' ? 'justify-center' : 'justify-start'}`}>
                {ms.sender === 'bot' ? (
                  <div className="px-3.5 py-1.5 bg-indigo-950/20 border border-indigo-500/10 text-indigo-400 text-[10px] font-mono rounded-xl max-w-md flex items-center gap-1.5 shadow">
                    <Bot className="w-3.5 h-3.5 shrink-0" />
                    <span>[API Dispatch]: {ms.text}</span>
                  </div>
                ) : (
                  <div className={`p-3 max-w-sm rounded-2xl border text-xs shadow-md space-y-1 ${
                    ms.sender === 'agent'
                      ? 'bg-indigo-600/15 border-indigo-500/20 text-indigo-150 rounded-tr-none'
                      : 'bg-slate-900/70 border-slate-850 text-slate-300 rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed font-light">{ms.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[8px] text-slate-500 font-mono">
                      <span>{ms.time}</span>
                      {ms.sender === 'agent' && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Presets footer hooks picker */}
          <div className="px-4 py-2 border-t border-slate-900 bg-[#0E0E10] flex gap-2 overflow-x-auto custom-scrollbar flex-shrink-0 text-[10px] font-mono select-none">
            <span className="text-slate-500 self-center shrink-0">Presetted:</span>
            {[
              { label: 'Outbound Calendar invite link', text: 'Hi Dr. Vyas, details can be coordinated over our calendar scheduling page.' },
              { label: 'Telephony SLA Proposal', text: 'Please review our standard G.711 carrier pricing block sheet.' },
              { label: 'Call back trigger query', text: 'Let’s hop on a call sweeps line when you are free of meetings.' }
            ].map((pre, index) => (
              <button
                key={index}
                onClick={() => handlePresetTrigger(pre.text)}
                className="px-2.5 py-1 rounded bg-[#0A0A0B]/80 hover:bg-[#0A0A0B] border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all shrink-0 cursor-pointer text-[9px]"
              >
                {pre.label}
              </button>
            ))}
          </div>

          {/* Text message Input panel */}
          <form onSubmit={handleSend} className="p-4 bg-[#0E0E10] border-t border-slate-850 flex gap-2.5 items-center flex-shrink-0">
            <input 
              type="text" 
              placeholder="Send instant WhatsApp message / dispatcher template..." 
              value={typedMsg}
              onChange={(e) => setTypedMsg(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#0A0A0B] border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none focus:border-[#00E5B0] transition-colors"
            />
            <button 
              type="submit"
              className="p-2.5 bg-[#00E5B0] text-[#0A0A0B] hover:scale-105 rounded-xl transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
