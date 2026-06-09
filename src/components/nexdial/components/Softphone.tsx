import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Play, Pause, AlertCircle, Sparkles, 
  ChevronRight, ArrowRight, UserCheck, ShieldClose, HelpCircle, Save, Star, Clock, User,
  Smartphone, Send, CheckCircle, MessageSquare, ExternalLink
} from 'lucide-react';
import { Contact, CallLog, DialogueTurn } from '../types';

interface SoftphoneProps {
  activeContact: Contact | null;
  onCallEnded: (contactId: string, disposition: any, log: CallLog) => void;
  onClose: () => void;
  currentAgentName: string;
}

export default function Softphone({ 
  activeContact, 
  onCallEnded, 
  onClose,
  currentAgentName 
}: SoftphoneProps) {
  
  // Dialer states
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'ringing' | 'connected' | 'wrapup'>('idle');
  const [typedPhone, setTypedPhone] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  
  // Conversation stream states
  const [conversation, setConversation] = useState<DialogueTurn[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  // Wrapup states
  const [disposition, setDisposition] = useState<'Lead' | 'Contacted' | 'Qualified' | 'Closed_Won' | 'Closed_Lost'>('Contacted');
  const [wrapNotes, setWrapNotes] = useState('');
  const [qaScore, setQaScore] = useState(90);

  // Real or Simulated Text Call on Mobile States for Softphone
  const [userMobile, setUserMobile] = useState('');
  const [smsSimulating, setSmsSimulating] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const [smsMethod, setSmsMethod] = useState<'real-wa' | 'real-sms' | 'sim' | null>(null);

  const getSharedText = () => {
    const contactName = activeContact?.name || 'Awaiting dynamic pickup...';
    const lastCustomerTurn = conversation.slice().reverse().find(s => s.speaker === 'customer')?.text || "Hello?";
    const lastAgentTurn = conversation.slice().reverse().find(s => s.speaker === 'agent')?.text || "Hi, this is Dattatray Sable.";
    
    return `NexDial Softphone Alert:\nContact: ${contactName}\nLine Status: Connected\nDuration: ${formattedTime(seconds)}\nQA Score: ${qaScore}/100\n\nLast Customer: "${lastCustomerTurn}"\nLast Agent: "${lastAgentTurn}"\n\n- Powered by NexDial Enterprise Live Sync`;
  };

  const handleSmsTrigger = (method: 'real-wa' | 'real-sms' | 'sim') => {
    if (!userMobile) return;
    setSmsMethod(method);
    setSmsSimulating(true);
    setSmsSuccess(false);

    setTimeout(() => {
      setSmsSimulating(false);
      setSmsSuccess(true);
      
      if (method === 'real-wa') {
        const cleanNumber = userMobile.replace(/[^0-9]/g, '');
        const waLink = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(getSharedText())}`;
        window.open(waLink, '_blank');
      } else if (method === 'real-sms') {
        const smsLink = `sms:${userMobile}?body=${encodeURIComponent(getSharedText())}`;
        window.open(smsLink, '_blank');
      }
      
      setTimeout(() => {
        setSmsSuccess(false);
      }, 5000);
    }, 1200);
  };

  // Audio simulation bars
  const [audioBars, setAudioBars] = useState<number[]>(Array(18).fill(3));

  // Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated conversations database based on segment
  const dialogueScripts: Record<string, { speaker: 'agent' | 'customer', text: string, delay: number, coachPrompt?: string }[]> = {
    Healthcare: [
      { speaker: 'customer', text: "Hello? This is Dr. Evelyn Martinez checking in from Pacific Medical.", delay: 1000 },
      { speaker: 'agent', text: "Thank you for answering, Dr. Martinez! This is Dattatray Sable regarding your HIPAA call recorder parameters.", delay: 4000 },
      { speaker: 'customer', text: "Ah yes. We handle extremely sensitive patient health records. Are all voice files encrypted at rest?", delay: 7000, coachPrompt: "Highlight our AWS S3 KMS double-layer envelope encryption!" },
      { speaker: 'customer', text: "And is there any possibility of custom webhook callbacks to push transcripts directly to Epic EHR?", delay: 11000, coachPrompt: "Mention epic integration module. We support HL7 secure integrations." },
      { speaker: 'customer', text: "Excellent! The pricing looks competitive. Can we arrange a multi-seat trial for my regional supervisors?", delay: 15000, coachPrompt: "Directly schedule next steps. Disposition: Qualified." }
    ],
    SaaS: [
      { speaker: 'customer', text: "Robert Stark here. Good timing, I was just checking our CRM billing integrations.", delay: 1000 },
      { speaker: 'agent', text: "Awesome Robert! Glad to connect. I wanted to see if your current outbound rates conform to TCPA guidelines?", delay: 4000 },
      { speaker: 'customer', text: "Honestly, we struggle with spam listing warnings. Carriers tag our numbers as 'Spam Likely' constantly.", delay: 7000, coachPrompt: "Highlight NexDial's Local Presence rotation & carrier STIR/SHAKEN registration system." },
      { speaker: 'customer', text: "That would be a massive savior. Does your solution connect directly in Salesforce pipelines?", delay: 11000, coachPrompt: "Reassure Salesforce integration is native. All calls auto-logged and transcription uploaded in 0.4s." },
      { speaker: 'customer', text: "Alright, let's schedule an enterprise pilot session next Tuesday.", delay: 15000, coachPrompt: "Confirm pilot. Disposition: Closed_Won." }
    ],
    General: [
      { speaker: 'customer', text: "Blue Horizon Logistics, Amara speaking. Who is calling?", delay: 1000 },
      { speaker: 'agent', text: "Hi Amara! This is Dattatray Sable. I saw you requested WebRTC dialer specifications last evening.", delay: 4000 },
      { speaker: 'customer', text: "Yes! We need an automated callback trigger if our cargo dispatcher ignores an incoming shipment confirmation query.", delay: 7000, coachPrompt: "Explain our Workflow Trigger Automation. If dispatcher is idle or misses ring -> auto SMS WhatsApp message." },
      { speaker: 'customer', text: "Oh, that is incredibly slick. We could save hours on cargo delays.", delay: 11000, coachPrompt: "Capitalize on success. Pitch our Starter Trial model." }
    ]
  };

  // Pre-fill phone if contact loaded
  useEffect(() => {
    if (activeContact) {
      setTypedPhone(activeContact.phone);
    }
  }, [activeContact]);

  // Timers and simulation trigger
  useEffect(() => {
    if (callState === 'connected') {
      // Start call duration timer
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);

      // Start call audio equalizer animation
      audioIntervalRef.current = setInterval(() => {
        setAudioBars(Array(18).fill(0).map(() => Math.floor(Math.random() * 24) + 4));
      }, 120);

      // Start text conversation simulation
      const segmentKey = activeContact?.segment === 'Healthcare' ? 'Healthcare' : activeContact?.segment === 'SaaS' ? 'SaaS' : 'General';
      const script = dialogueScripts[segmentKey] || dialogueScripts.General;
      
      const chatTimers: NodeJS.Timeout[] = [];
      const suggestionsList: string[] = ["Greet the recipient using active compliance script", "Avoid talking over customer voice"];

      setConversation([]);
      setAiSuggestions(suggestionsList);

      script.forEach((line) => {
        const t = setTimeout(() => {
          // Append dialogue line
          setConversation(prev => [
            ...prev, 
            { 
              speaker: line.speaker, 
              text: line.speaker === 'agent' ? line.text.replace('{agentName}', currentAgentName) : line.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }
          ]);

          // Push AI coach suggestion if triggered
          if (line.coachPrompt) {
            setAiSuggestions(prev => [line.coachPrompt!, ...prev.slice(0, 3)]);
            setQaScore(prev => Math.min(100, Math.max(70, prev + Math.floor(Math.random() * 5))));
          }
        }, line.delay);
        chatTimers.push(t);
      });

      // Automatically bridge to wrap-up if dialogue finishes or max 20s in mock
      const endTimer = setTimeout(() => {
        handleDisconnect();
      }, 22000);
      chatTimers.push(endTimer);

      return () => {
        chatTimers.forEach(clearTimeout);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
  }, [callState]);

  const handleDial = () => {
    if (!typedPhone) return;
    setCallState('dialing');
    
    // Simulate line ring delay
    setTimeout(() => {
      setCallState('ringing');
      setTimeout(() => {
        setCallState('connected');
        setSeconds(0);
      }, 2500);
    }, 2000);
  };

  const handleDisconnect = () => {
    setCallState('wrapup');
  };

  const handleWrapSubmit = () => {
    if (!activeContact) {
      setCallState('idle');
      setTypedPhone('');
      return;
    }

    const mockCallLog: CallLog = {
      id: `log-${Date.now()}`,
      contactId: activeContact.id,
      contactName: activeContact.name,
      phoneNumber: activeContact.phone,
      startTime: new Date(Date.now() - seconds * 1000).toISOString(),
      duration: seconds,
      type: 'Outbound',
      status: 'Completed',
      agentName: currentAgentName,
      recordingUrl: `/recordings/rec_${activeContact.id}_out.mp3`,
      sentiment: qaScore > 85 ? 'Positive' : qaScore > 70 ? 'Neutral' : 'Negative',
      summary: wrapNotes || `Outbound campaign dial wrap dispositioned as ${disposition}. Live coaching advice triggered successfully.`,
      transcription: conversation,
      score: qaScore
    };

    onCallEnded(activeContact.id, disposition, mockCallLog);
    setCallState('idle');
    setTypedPhone('');
    setWrapNotes('');
  };

  // Keyboard keypad inputs helper
  const handleKeypadPress = (val: string) => {
    setTypedPhone(prev => prev + val);
    // Play touchbeep sound simulation (pure visual alert or console log)
    console.log(`Softphone DTMF code dial trigger: ${val}`);
  };

  const formattedTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div id="nexdial-softphone-wrapper" className="w-full bg-[#1E293B] border border-[#334155] rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300">
      
      {/* Upper Panel Status Area */}
      <div className="flex items-center justify-between border-b border-[#334155] pb-4">
        <div className="flex items-center gap-2">
          <Phone className={`w-5 h-5 ${callState === 'connected' ? 'text-accent-teal animate-pulse' : 'text-slate-400'}`} />
          <span className="font-display font-bold text-sm text-white uppercase tracking-tight">NexPhone Terminal v2.6</span>
        </div>
        
        {callState === 'connected' && (
          <div className="flex items-center gap-1.5 bg-[#0F172A] px-3 py-1 rounded-full text-xs font-mono border border-accent-teal/20 text-[#00E5B0]">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>{formattedTime(seconds)}</span>
          </div>
        )}
        
        {callState === 'idle' && (
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest bg-[#0F172A] px-2.5 py-1 rounded">
            ● Line Standby
          </span>
        )}
        {callState === 'dialing' && (
          <span className="text-xs font-mono text-accent-blue uppercase tracking-widest bg-accent-blue/10 border border-accent-blue/30 px-2.5 py-1 rounded animate-pulse">
            Connecting SIP...
          </span>
        )}
        {callState === 'ringing' && (
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded animate-pulse">
            Ringing Target...
          </span>
        )}
        {callState === 'wrapup' && (
          <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/25 px-2.5 py-1 rounded animate-bounce">
            Disposition Wrap
          </span>
        )}
      </div>

      {/* Target Representative Card context */}
      {activeContact && (
        <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#334155] flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl text-brand-primary flex items-center justify-center font-display font-bold text-sm">
            {activeContact.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white">{activeContact.name}</h4>
            <p className="text-[10px] text-slate-400">{activeContact.company} • {activeContact.segment}</p>
          </div>
          <span className="text-[10px] bg-brand-primary/10 text-brand-secondary border border-brand-primary/20 px-2 py-0.5 rounded font-mono font-bold">
            {activeContact.status}
          </span>
        </div>
      )}

      {/* Main Calling Screen Logic Router */}
      {callState === 'idle' && (
        <div className="space-y-6">
          {/* Dialer phone inputs */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Dial worldwide phone number..." 
              value={typedPhone}
              onChange={(e) => setTypedPhone(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] p-4 text-center text-lg rounded-2xl font-mono text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-primary focus:outline-none"
            />
          </div>

          {/* Core Keypad grid */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((btn) => (
              <button 
                key={btn}
                onClick={() => handleKeypadPress(btn)}
                className="py-3 bg-[#11192E] hover:bg-[#334155] active:bg-[#475569] text-base font-mono font-bold text-white rounded-xl transition-all border border-[#334155] cursor-pointer"
              >
                {btn}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleDial}
              disabled={!typedPhone}
              className={`w-full py-3.5 rounded-2xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${typedPhone ? 'bg-[#00E5B0] text-[#0F172A] hover:bg-[#00c294] shadow-[#00E5B0]/20 hover:scale-103' : 'bg-[#334155] text-slate-500 cursor-not-allowed'}`}
            >
              <Phone className="w-4 h-4" />
              <span>Simulate WebRTC Live Call</span>
            </button>

            {typedPhone && (
              <a 
                href={`tel:${typedPhone}`}
                className="w-full py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-2xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>Call via Device SIM (Real PSTN)</span>
              </a>
            )}

            <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-center">
              <p className="text-[10px] text-slate-400 leading-normal font-sans italic text-center">
                💡 NexDial operates in a secured WebRTC sandbox. WebRTC simulation generates premium live speech transcripts, QA compliance reports, and supervisor suggestions. If you wish to trigger a real voice carrier call to your device, select "Call via Device SIM".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ringing & Dialing Screen */}
      {(callState === 'dialing' || callState === 'ringing') && (
        <div className="py-12 text-center space-y-6">
          <div className="w-20 h-20 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto border border-brand-primary/30 animate-pulse">
            <Phone className="w-8 h-8 text-brand-primary" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-white">
              {activeContact ? activeContact.name : typedPhone}
            </p>
            <p className="text-xs text-slate-400 font-mono mt-1">Connecting WebRTC Audio gateway lines...</p>
          </div>
          <button onClick={() => setCallState('idle')} className="px-6 py-2.5 bg-accent-coral hover:bg-red-600 text-xs font-bold rounded-xl flex items-center gap-1.5 mx-auto transition-transform hover:scale-105 cursor-pointer">
            <PhoneOff className="w-4 h-4" />
            <span>Cancel Outbound</span>
          </button>
        </div>
      )}

      {/* Call Active space with live Transcriptions and coaching */}
      {callState === 'connected' && (
        <div className="space-y-6">
          
          {/* Simulated Audio Equalizer Visualizer */}
          <div className="flex justify-center items-end gap-1 px-4 h-12 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
            {audioBars.map((bar, i) => (
              <span 
                key={i} 
                style={{ height: `${bar}px` }}
                className="w-1.5 bg-accent-teal rounded-full transition-all duration-100" 
              />
            ))}
          </div>

          {/* Interactive controls bar */}
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${isMuted ? 'bg-accent-coral/15 border-accent-coral/30 text-accent-coral' : 'bg-[#11192E] border-[#334155] text-slate-300'}`}
              title={isMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setSpeakerOn(!speakerOn)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${!speakerOn ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-[#11192E] border-[#334155] text-slate-300'}`}
              title={speakerOn ? "Mute Speaker" : "Unmute Speaker"}
            >
              {speakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setQaScore(prev => Math.max(10, prev - 10))}
              className="p-3.5 rounded-xl bg-[#11192E] border border-[#334155] hover:bg-neutral-800 text-slate-300 transition-all cursor-pointer"
              title="Supervisor Whispering Simulation"
            >
              <Sparkles className="w-5 h-5 text-accent-blue" />
            </button>
          </div>

          {/* Dual layout dialogue stream and AI dynamic suggestions coach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Conversation text stack */}
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#334155] h-[180px] overflow-y-auto custom-scrollbar flex flex-col gap-3">
              <span className="text-[10px] text-slate-450 uppercase font-mono tracking-widest sticky top-0 bg-[#0F172A] py-1 block">Live Whisper Transcription stream</span>
              
              {conversation.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-10">Qualifying speech context lines...</p>
              ) : (
                conversation.map((turn, idx) => (
                  <div key={idx} className={`space-y-1 text-xs ${turn.speaker === 'agent' ? 'text-right self-end bg-brand-primary/10 border border-brand-primary/20 p-2.5 rounded-2xl max-w-[85%]' : 'text-left self-start bg-[#11192E] border border-[#334155] p-2.5 rounded-2xl max-w-[85%]'}`}>
                    <span className="font-mono text-[9px] uppercase tracking-wider block text-slate-450">
                      {turn.speaker === 'agent' ? 'You' : (activeContact ? activeContact.name : 'Customer')} • {turn.timestamp}
                    </span>
                    <p className="text-white font-light">{turn.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Gemini Live coaching recommendations panel */}
            <div className="bg-[#1D1E3A] p-4 rounded-2xl border border-brand-primary/30 h-[180px] overflow-y-auto custom-scrollbar space-y-3">
              <div className="flex items-center gap-1.5 sticky top-0 bg-[#1D1E3A] py-1 border-b border-brand-primary/10 justify-between">
                <span className="text-[10px] text-brand-primary uppercase font-mono tracking-widest block font-bold">Gemini Live Suggestion Coach</span>
                <span className="text-[9px] font-mono text-accent-teal uppercase bg-accent-teal/10 px-2 py-0.5 rounded">Dynamic Score: {qaScore}/100</span>
              </div>

              {aiSuggestions.map((sug, idx) => (
                <div key={idx} className="bg-[#0F172A] p-2.5 rounded-xl border border-brand-primary/20 flex gap-2.5 items-start">
                  <Sparkles className="w-4 h-4 text-[#00E5B0] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-slate-300 font-light">{sug}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Sync Live Call to Your Mobile Section */}
          <div className="pt-4 mt-2 border-t border-[#334155] space-y-3">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#00C2FF]" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-300">
                Sync Live Call to Your Mobile
              </span>
            </div>

            <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 space-y-4">
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Enter your phone number to text this active call's metadata report, live speech transcript logs, and AI QA sentiment scores directly to your mobile device.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Actions column */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-mono text-slate-400 block mb-1">Your Mobile Phone (with country code):</label>
                    <input 
                      type="text" 
                      placeholder="e.g., +919000000000 or +14155550199" 
                      value={userMobile}
                      onChange={(e) => setUserMobile(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-[#11192E] border border-[#334155] text-white font-mono rounded-lg focus:outline-none focus:border-indigo-500 font-bold placeholder-slate-700"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 font-mono">
                    <button
                      disabled={!userMobile || smsSimulating}
                      onClick={() => handleSmsTrigger('sim')}
                      className="text-[10px] font-bold px-2.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-40 transition-all uppercase"
                    >
                      <Send className="w-3 h-3" />
                      <span>Simulate Dispatch</span>
                    </button>

                    <a
                      href={userMobile ? `https://api.whatsapp.com/send?phone=${userMobile.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(getSharedText())}` : '#'}
                      target={userMobile ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!userMobile) {
                          e.preventDefault();
                        } else {
                          handleSmsTrigger('real-wa');
                        }
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase ${
                        userMobile 
                          ? 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 cursor-pointer' 
                          : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp sync</span>
                    </a>

                    <a
                      href={userMobile ? `sms:${userMobile}?body=${encodeURIComponent(getSharedText())}` : '#'}
                      onClick={(e) => {
                        if (!userMobile) {
                          e.preventDefault();
                        } else {
                          handleSmsTrigger('real-sms');
                        }
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase ${
                        userMobile 
                          ? 'bg-[#00C2FF]/10 hover:bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/20 cursor-pointer' 
                          : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Native SMS</span>
                    </a>
                  </div>

                  {smsSimulating && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 animate-pulse bg-indigo-505/5 p-2 rounded-lg border border-indigo-500/10">
                      <div className="w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting virtual carrier proxy gateway over TLS secure tunnel...</span>
                    </div>
                  )}

                  {smsSuccess && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 animate-fade-in">
                      <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                      <span>Payload block dispatched! Verify your mobile device notification trunk.</span>
                    </div>
                  )}
                </div>

                {/* Device Display Preview */}
                <div className="border border-[#334155] bg-[#0A0A0B] rounded-xl p-3 flex flex-col justify-between min-h-[140px] relative overflow-hidden shadow-inner font-sans">
                  {/* Status bar */}
                  <div className="flex justify-between items-center text-[8px] text-slate-650 font-mono select-none px-1">
                    <span>NexTrunk WiFi</span>
                    <span>1:06 PM</span>
                    <span>98% [🔋]</span>
                  </div>

                  {/* Incoming bubble */}
                  <div className="my-auto space-y-2">
                    {smsSimulating ? (
                      <div className="flex justify-start">
                        <div className="bg-slate-900 text-slate-500 text-[10px] py-1.5 px-3 rounded-2xl rounded-bl-none max-w-[90%] font-mono animate-pulse">
                          Fetching SMS packet...
                        </div>
                      </div>
                    ) : smsSuccess ? (
                      <div className="flex flex-col gap-1 items-start animate-fade-in">
                        <span className="text-[8px] font-mono font-bold text-indigo-400 pl-1 uppercase tracking-wider">NexDial Service • Just now</span>
                        <div className="bg-[#1E293B] text-slate-100 text-[10px] p-2.5 rounded-2xl rounded-tl-none max-w-[95%] shadow-md border border-[#334155] leading-relaxed font-mono whitespace-pre-line text-left">
                          {getSharedText()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-[10px] text-slate-600 font-mono italic">
                          [Standby: Submit phone number above to transmit dynamic logs]
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom indicator */}
                  <div className="border-t border-[#334155]/30 pt-1.5 flex justify-between items-center text-[8px] text-[#00C2FF] px-1 font-mono">
                    <span>Incoming Payload</span>
                    <span className="text-emerald-500 animate-pulse">● Trunk Connected</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <button 
            onClick={handleDisconnect}
            className="w-full py-3.5 bg-accent-coral hover:bg-red-600 text-[#0F172A] font-display font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Wrap call session</span>
          </button>

        </div>
      )}

      {/* Dispositions wrapup details forms */}
      {callState === 'wrapup' && (
        <div className="space-y-4">
          <div className="bg-[#0F172A] p-4 rounded-2xl border border-brand-primary/20">
            <h4 className="text-xs font-bold text-white uppercase tracking-tight mb-2">Assign final call state disposition</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['Lead', 'Contacted', 'Qualified', 'Closed_Won', 'Closed_Lost'] as const).map((dsp) => (
                <button 
                  key={dsp}
                  onClick={() => setDisposition(dsp)}
                  className={`py-2 px-3 rounded-lg border text-left font-semibold transition-all cursor-pointer ${disposition === dsp ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-[#11192E] border-[#334155] text-slate-400'}`}
                >
                  {dsp.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Enter Call Review Notes (Syncs to CRM Database)</label>
            <textarea 
              rows={3} 
              placeholder="e.g., Target interested in pilot contract. We mapped pricing. Ready for next Tuesday review..."
              value={wrapNotes}
              onChange={(e) => setWrapNotes(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] p-3 text-xs text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>

          <button 
            onClick={handleWrapSubmit}
            className="w-full py-4 bg-[#00E5B0] hover:bg-[#00c294] text-[#0F172A] font-display font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shadow-[#00E5B0]/15"
          >
            <Save className="w-4 h-4" />
            <span>Process disposition wrap</span>
          </button>
        </div>
      )}

    </div>
  );
}
