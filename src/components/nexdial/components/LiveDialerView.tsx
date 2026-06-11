import React, { useState, useEffect } from 'react';
import { 
  Phone, PhoneOff, Users, Play, AlertCircle, Sparkles, Volume2, Mic, MicOff, PlayCircle, 
  HelpCircle, CheckCircle, Clock, ShieldAlert, Star, MessageSquare, Smartphone, Send, ExternalLink
} from 'lucide-react';
import { Contact, CallLog } from '../types';

interface LiveDialerViewProps {
  contacts: Contact[];
  onDialContactNow: (contact: Contact) => void;
  selectedContactForDial: Contact | null;
  onClearDialContact: () => void;
  addSimulationLog: (log: CallLog) => void;
  currentAgentName: string;
}

export default function LiveDialerView({
  contacts,
  onDialContactNow,
  selectedContactForDial,
  onClearDialContact,
  addSimulationLog,
  currentAgentName
}: LiveDialerViewProps) {

  // Dial States
  const [typedNumber, setTypedNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<any[]>([]);
  const [sentimentValue, setSentimentValue] = useState<'Positive' | 'Neutral' | 'Negative'>('Neutral');
  const [objectionResponseAlert, setObjectionResponseAlert] = useState('');

  // Real / Simulated Text Call on Mobile States
  const [userMobile, setUserMobile] = useState('');
  const [smsSimulating, setSmsSimulating] = useState(false);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const [smsMethod, setSmsMethod] = useState<'real-wa' | 'real-sms' | 'sim' | null>(null);

  const getSharedText = () => {
    const contactName = selectedContactForDial?.name || 'Awaiting dynamic pickup...';
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Find the last turns for customer and agent
    const lastCustomerTurn = activeSpeech.slice().reverse().find(s => s.speaker === 'customer')?.text || "Hello?";
    const lastAgentTurn = activeSpeech.slice().reverse().find(s => s.speaker === 'agent')?.text || "Hi, this is Dattatray Sable.";
    
    return `Nexdial Live Call Alert:\nContact: ${contactName}\nLine Status: Connected\nDuration: ${formattedTime(duration)}\nSentiment: ${sentimentValue}\n\nLast Customer: "${lastCustomerTurn}"\nLast Agent: "${lastAgentTurn}"\n\n- Powered by Nexdial Enterprise Live Sync`;
  };

  const handleSmsTrigger = (method: 'real-wa' | 'real-sms' | 'sim') => {
    if (!userMobile) return;
    setSmsMethod(method);
    setSmsSimulating(true);
    setSmsSuccess(false);

    const textMessageBody = getSharedText();

    setTimeout(() => {
      setSmsSimulating(false);
      setSmsSuccess(true);
      
      if (method === 'real-wa') {
        const cleanNumber = userMobile.replace(/[^0-9]/g, '');
        const waLink = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(textMessageBody)}`;
        window.open(waLink, '_blank');
      } else if (method === 'real-sms') {
        const smsLink = `sms:${userMobile}?body=${encodeURIComponent(textMessageBody)}`;
        window.open(smsLink, '_blank');
      }
      
      setTimeout(() => {
        setSmsSuccess(false);
      }, 5000);
    }, 1200);
  };

  // Auto-duration ticker when connected
  useEffect(() => {
    let timer: any;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  // If a contact is selected, prep the input line
  useEffect(() => {
    if (selectedContactForDial) {
      setTypedNumber(selectedContactForDial.phone);
    }
  }, [selectedContactForDial]);

  const handleKeyPress = (num: string) => {
    setTypedNumber(prev => prev + num);
  };

  const handleBackspace = () => {
    setTypedNumber(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setTypedNumber('');
    onClearDialContact();
  };

  const startDialing = () => {
    if (!typedNumber) return;
    setCallStatus('calling');
    setActiveSpeech([{ speaker: 'system', text: 'Negotiating carrier handshake route over TLS SIP trunk...', timestamp: 'Just now' }]);

    // Find if the typed number belongs to a known Contact
    const targetContact = contacts.find(c => c.phone.trim() === typedNumber.trim()) || {
      id: `anon-${Date.now()}`,
      name: 'External Call Target',
      phone: typedNumber,
      company: 'Adhoc Inbound Lead Routing',
      status: 'Lead' as any,
      segment: 'General' as any,
      sentiment: 'Neutral' as any,
      revenueValue: 0,
      notes: [],
      tags: []
    };

    setTimeout(() => {
      setCallStatus('connected');
      setActiveSpeech([
        { speaker: 'system', text: `Connected securely to Twilio Edge Carrier node. Active codec: OPUS 48kHz HD.`, timestamp: '00:01' },
        { speaker: 'customer', text: `Hello, this is ${targetContact.name}. Who is calling?`, timestamp: '00:03' },
        { speaker: 'agent', text: `Hi ${targetContact.name}! I am calling on behalf of Nexdial outbound sweeps regarding lead acceleration workflows. How are you today?`, timestamp: '00:07' },
        { speaker: 'customer', text: `Oh yes, we were actually looking for outbound telephony providers since our active cold rate is low. Is this predictive?`, timestamp: '00:15' }
      ]);
      setSentimentValue('Positive');
    }, 1500);
  };

  const endCall = () => {
    if (callStatus === 'idle') return;

    // Compile simulations log payload
    const finalContact = contacts.find(c => c.phone.trim() === typedNumber.trim()) || {
      name: 'Adhoc Target Caller',
      id: `anon-${Date.now()}`
    };

    const newLogItem: CallLog = {
      id: `sim-call-${Date.now()}`,
      contactId: finalContact.id,
      contactName: finalContact.name,
      phoneNumber: typedNumber,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: duration || 12,
      type: 'Outbound',
      status: 'Completed',
      agentName: currentAgentName,
      sentiment: sentimentValue,
      score: Math.floor(Math.random() * 15) + 82, // Standard QA range: 82 - 97
      summary: `Outbound sales pitch completed successfully. Customer sentiment registered ${sentimentValue} during discussion of SIP Trunk routing and predictive dialed lists. Configured follow-up tasks.`,
      transcription: activeSpeech
    };

    addSimulationLog(newLogItem);
    setCallStatus('idle');
    setObjectionResponseAlert('');
    onClearDialContact();
  };

  const handleTriggerObjectionSlay = () => {
    const objections = [
      "Objection: 'No Budget'. Recommended reply: Focus on the monthly SaaS tier savings compared to current Twilio trunk charges. Highlight 40% reduction.",
      "Objection: 'Send Email'. Recommended reply: Agree immediately, but establish a dynamic 5-min Zoom placeholder first. Pitch immediate SIP rates.",
      "Objection: 'Too Busy'. Recommended reply: Value their time immediately, explain we dial 200 leads in under 4 minutes with predictive campaigns, then offer a callback."
    ];
    setObjectionResponseAlert(objections[Math.floor(Math.random() * objections.length)]);
  };

  const formattedTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">Active VoIP Dialer Terminal</h2>
        <p className="text-xs text-slate-450 mt-1 font-light">
          Simulate outgoing SIP voice routes, access direct dial-pads, and review customer sentiment transcription in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dialer Pad (Left Column, col-span-3) */}
        <div className="lg:col-span-4 bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
          <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold border-b border-slate-900 pb-1.5 pl-1">Live Multi-Line SIP</p>
          
          <div className="space-y-3">
            {/* Direct Phone Number Input field */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter SIP address / Phone" 
                value={typedNumber}
                onChange={(e) => setTypedNumber(e.target.value)}
                disabled={callStatus !== 'idle'}
                className="w-full text-center py-3 px-4 bg-[#0A0A0B] border border-slate-800 text-base font-mono text-[#00C2FF] rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder-slate-700 dial-input"
              />
              {typedNumber && callStatus === 'idle' && (
                <button 
                  onClick={handleClear} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Direct responsive dial pad mapping */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                <button
                  key={digit}
                  disabled={callStatus !== 'idle'}
                  onClick={() => handleKeyPress(digit)}
                  className="py-3 bg-slate-900/60 hover:bg-slate-900 hover:text-slate-100 active:scale-95 text-slate-200 text-sm font-mono border border-slate-800/80 hover:border-slate-700 rounded-xl transition-all cursor-pointer select-none dial-key"
                >
                  {digit}
                </button>
              ))}
            </div>

            {/* Calling triggers Action keys */}
            <div className="space-y-2.5">
              {callStatus === 'idle' ? (
                <button
                  disabled={!typedNumber}
                  onClick={startDialing}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 font-bold text-xs text-white uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 dial-action-btn"
                >
                  <Phone className="w-4 h-4" />
                  <span>Establish WebRTC Handshake</span>
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-600/10 dial-action-btn-rose"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Terminate Pipeline</span>
                </button>
              )}

              {callStatus === 'idle' && typedNumber && (
                <a 
                  href={`tel:${typedNumber}`}
                  className="w-full py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-xl font-display font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all hover:scale-101"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Call via Cellular Carrier</span>
                </a>
              )}

              <div className="bg-[#070708] border border-slate-900 rounded-xl p-3 space-y-1 text-center">
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans italic">
                  💡 WebRTC establishes dynamic live speech transcriptions and real-time AI compliance evaluations. For placing physical outbound telephone calls using your device cellular networks directly, choose "Call via Cellular Carrier".
                </p>
              </div>
            </div>

            {/* Quick Actions checklist under dialer */}
            {callStatus === 'connected' && (
              <div className="pt-2.5 border-t border-slate-900 grid grid-cols-2 gap-2 text-[10px] font-mono">
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className={`py-1.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors dial-mute-btn ${
                    isMuted ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isMuted ? "MUTED" : "MUTE"}</span>
                </button>
                <button 
                  onClick={() => setIsOnHold(!isOnHold)} 
                  className={`py-1.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors dial-hold-btn ${
                    isOnHold ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' : 'bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{isOnHold ? "ON HOLD" : "HOLD"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Call Center Display Board (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Call details bar */}
          {callStatus !== 'idle' ? (
            <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                    <Phone className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{selectedContactForDial?.name || 'Awaiting dynamic pickup...'}</h3>
                    <p className="text-[10px] text-slate-500 font-mono">Routing trunk over {typedNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div className="font-mono text-xs text-slate-300">
                    <span className="text-slate-500">Duration:</span> <span className="text-[#00C2FF] font-bold">{formattedTime(duration)}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    callStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                  }`}>
                    {callStatus === 'connected' ? 'CONNECTED' : 'CARRIER HANDSHAKE'}
                  </span>
                </div>
              </div>

              {/* Dynamic Transcript text stream */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase font-mono">
                  <span>VoIP Whisper Transcript</span>
                  <div className="flex items-center gap-1.5">
                    <span>Customer mood:</span>
                    <span className={`px-1 rounded ${
                      sentimentValue === 'Positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-500'
                    }`}>{sentimentValue}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#0A0A0B] rounded-xl border border-slate-900 h-44 overflow-y-auto space-y-3 custom-scrollbar text-xs">
                  {activeSpeech.map((turn, idx) => (
                    <div key={idx} className={`space-y-0.5 ${turn.speaker === 'agent' ? 'text-right' : 'text-left'}`}>
                      <p className={`text-[9px] font-mono uppercase tracking-wide font-bold ${
                        turn.speaker === 'agent' ? 'text-indigo-400' : turn.speaker === 'system' ? 'text-slate-600' : 'text-emerald-400'
                      }`}>
                        {turn.speaker}
                      </p>
                      <p className={`px-3 py-1.5 inline-block rounded-xl max-w-sm ${
                        turn.speaker === 'agent' 
                          ? 'bg-indigo-600/15 border border-indigo-500/25 text-indigo-200 rounded-tr-none' 
                          : turn.speaker === 'system'
                          ? 'bg-slate-950 border border-slate-900 text-slate-500 italic text-[10px]'
                          : 'bg-emerald-900/15 border border-emerald-500/25 text-emerald-250 rounded-tl-none'
                      }`}>
                        {turn.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI prompt objection handler trigger */}
                <div className="pt-2 bg-[#0E0E10] flex justify-between gap-4 items-center">
                  <button
                    onClick={handleTriggerObjectionSlay}
                    className="py-1.5 px-3 bg-indigo-950/25 border border-indigo-500/10 hover:border-indigo-500/30 text-[#818CF8] hover:text-[#818CF8] text-[10px] font-bold font-mono rounded-lg transition-all flex items-center gap-1.5 cursor-pointer uppercase dial-ai-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Generate AI objection counter</span>
                  </button>
                  <span className="text-[9px] font-mono text-slate-500 italic">Objections SLA: AI assistant active</span>
                </div>

                {objectionResponseAlert && (
                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/15 text-indigo-300 text-xs flex gap-2 animate-fade-in font-light">
                    <Sparkles className="w-4.5 h-4.5 text-[#00C2FF] mt-0.5 shrink-0" />
                    <p>{objectionResponseAlert}</p>
                  </div>
                )}

                {/* Send Live Call Text to Mobile Number Section */}
                <div className="pt-4 mt-2 border-t border-slate-900 space-y-3">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#00C2FF]" />
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-300">
                      Sync Live Call to Your Mobile
                    </span>
                  </div>

                  <div className="bg-[#070708] border border-slate-900 rounded-xl p-4 space-y-4">
                    <p className="text-[11px] text-slate-500 font-light">
                      Input your phone number to text this active conversation metadata, sentiment reports, and live transcript logs directly to your real device, or watch the simulated real-time telemetry pipeline.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Column: Actions */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 block mb-1">Your Mobile Phone (with country code):</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="e.g., +919876543210 or +14155550199" 
                              value={userMobile}
                              onChange={(e) => setUserMobile(e.target.value)}
                              className="flex-1 text-xs py-2 px-3 bg-[#0A0A0B] border border-slate-800 text-[#00C2FF] font-mono rounded-lg focus:outline-none focus:border-indigo-500 font-bold placeholder-slate-700"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            disabled={!userMobile || smsSimulating}
                            onClick={() => handleSmsTrigger('sim')}
                            className="text-[10px] font-mono font-bold px-2.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-40 transition-all uppercase"
                          >
                            <Send className="w-3 h-3" />
                            <span>Simulate Carrier Send</span>
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
                            className={`text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase ${
                              userMobile 
                                				? 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 cursor-pointer' 
                                				: 'bg-slate-900 border border-slate-850 text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp redirect</span>
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
                            className={`text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase ${
                              userMobile 
                                				? 'bg-[#00C2FF]/10 hover:bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/20 cursor-pointer' 
                                				: 'bg-slate-900 border border-slate-850 text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>Native SMS</span>
                          </a>
                        </div>

                        {smsSimulating && (
                          <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 animate-pulse bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10">
                            <div className="w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Contacting virtual carrier proxy trunk gateway over TLS...</span>
                          </div>
                        )}

                        {smsSuccess && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10 animate-fade-in">
                            <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                            <span>Successfully dispatched payload block! Check your mobile device.</span>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Visualized Mobile Screen Demo Display */}
                      <div className="border border-slate-900 bg-slate-950 rounded-xl p-3 flex flex-col justify-between min-h-[140px] relative overflow-hidden shadow-inner font-sans">
                        {/* Status bar */}
                        <div className="flex justify-between items-center text-[8px] text-slate-600 font-mono select-none px-1">
                          <span>Carrier LTE</span>
                          <span>11:51 AM</span>
                          <span>94% [🔋]</span>
                        </div>

                        {/* Interactive incoming SMS message body bubble */}
                        <div className="my-auto space-y-2">
                          {smsSimulating ? (
                            <div className="flex justify-start">
                              <div className="bg-slate-900 text-slate-500 text-[10px] py-1.5 px-3 rounded-2xl rounded-bl-none max-w-[90%] font-mono animate-pulse">
                                Receiving dispatch pak...
                              </div>
                            </div>
                          ) : smsSuccess ? (
                            <div className="flex flex-col gap-1 items-start animate-fade-in">
                              <span className="text-[8px] font-mono font-bold text-indigo-400 pl-1 uppercase tracking-wider">Nexdial Service • Just now</span>
                              <div className="bg-[#1e1e2e] text-slate-100 text-[10px] p-2.5 rounded-2xl rounded-tl-none max-w-[95%] shadow-md border border-indigo-500/15 leading-relaxed font-mono whitespace-pre-line">
                                {getSharedText()}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              <p className="text-[10px] text-slate-600 font-mono italic">
                                [Standby: Enter your phone & press dispatch to transmit live data]
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Message Input indicator */}
                        <div className="border-t border-slate-900/50 pt-1.5 flex justify-between items-center text-[8px] text-[#00C2FF] px-1 font-mono">
                          <span>iMessage / Text Message</span>
                          <span className="text-emerald-500 animate-pulse">● Active Connection</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-900/40 border border-slate-800 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-300">Choose a Contact or Input a number to dial</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-light leading-relaxed">
                  Select a partner from the lists below to pipe outbound voice trunk channels, load specialized script hooks, or manage customer profiles.
                </p>
              </div>
            </div>
          )}

          {/* Connected Lead directory quick lists */}
          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold border-b border-slate-900 pb-2.5">Available Multi-Sector Lead Pool</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
              {contacts.map((con) => (
                <div 
                  key={con.id} 
                  className={`p-3 rounded-xl border transition-all duration-150 flex items-center justify-between ${
                    typedNumber === con.phone ? 'bg-indigo-505/10 border-[#818CF8] shadow-md' : 'bg-[#0A0A0B] border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <div className="space-y-1 leading-none">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-200">{con.name}</span>
                      <span className="text-[8px] bg-slate-900 border border-slate-850 px-1 py-0.1 text-slate-500 rounded text-[9px]">{con.segment}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">{con.company} • {con.phone}</p>
                  </div>

                  <button
                    onClick={() => {
                      onDialContactNow(con);
                      setTypedNumber(con.phone);
                    }}
                    disabled={callStatus !== 'idle'}
                    className="p-1 px-2.5 bg-[#00C2FF]/10 text-[#00C2FF] hover:bg-[#00C2FF]/20 text-[9px] font-mono font-bold rounded-lg border border-[#00C2FF]/20 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 dial-load-btn"
                  >
                    <PlayCircle className="w-3 h-3 shrink-0" />
                    <span>LOAD</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
