"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Sparkles,
  AlertCircle,
  History,
  Users,
  CheckCircle,
  MessageSquare,
  Play,
  Pause,
  CheckSquare,
  Square,
  Disc,
  User,
  ChevronRight
} from "lucide-react";

// Initial Campaigns and Leads
const initialLeads = [
  { id: "l-1", name: "David Miller", company: "Zeta Inc.", phone: "+91 83082 11113", status: "Queue", key: "zeta", campaign: "Zeta Invoice Discrepancy" },
  { id: "l-2", name: "Sarah Connor", company: "Cyberdyne Systems", phone: "+91 99821 77722", status: "Queue", key: "cyberdyne", campaign: "Outbound AI Telephony Demo" },
  { id: "l-3", name: "Thomas Anderson", company: "Meta Cortex", phone: "+91 78221 00982", status: "Follow Up", key: "zeta", campaign: "SaaS License Consulting" },
  { id: "l-4", name: "Ellen Ripley", company: "Weyland-Yutani", phone: "+91 92831 01844", status: "CallBack", key: "cyberdyne", campaign: "SLA Custom Review" }
];

const initialHistory = [
  { id: "h-1", name: "Marcus Wright", company: "Project Angel", date: "Today, 11:20 AM", duration: "02:45", disposition: "Resolved", sentiment: 88, status: "Interested" },
  { id: "h-2", name: "Kyle Reese", company: "TechCom", date: "Yesterday, 04:15 PM", duration: "01:12", disposition: "Follow-Up Needed", sentiment: 42, status: "Neutral" },
  { id: "h-3", name: "John Connor", company: "Resistance HQ", date: "Yesterday, 02:30 PM", duration: "00:45", disposition: "No Answer", sentiment: 50, status: "Abandoned" }
];

// Dialog step trees
interface DialogOption {
  agentText: string;
  nextStep: number;
  sentiment: number;
  complianceChecks: string[];
  aiScript: string;
}

interface DialogStep {
  customerText: string;
  options: DialogOption[];
}

const CAMPAIGN_DIALOGS: Record<string, Record<number, DialogStep>> = {
  "zeta": {
    0: {
      customerText: "Hello, this is David Miller from Zeta Inc. Am I speaking with DBS Mintek?",
      options: [
        {
          agentText: "Hello David, yes! I'm John from support. How can I help you today?",
          nextStep: 1,
          sentiment: 65,
          complianceChecks: ["Verify Caller Name"],
          aiScript: "Greet the customer warmly and confirm company brand identity."
        },
        {
          agentText: "Yes, this is DBS Mintek. What is your concern?",
          nextStep: 1,
          sentiment: 50,
          complianceChecks: ["Verify Caller Name"],
          aiScript: "Keep tone helpful, but try to use a more customer-centric opening."
        }
      ]
    },
    1: {
      customerText: "Our monthly invoice shows ₹13,70,000, but our agreement states ₹10,00,000. Can you check why we have this difference?",
      options: [
        {
          agentText: "I understand your concern. Let me verify your Account ID or sub-domain to pull up the contract.",
          nextStep: 2,
          sentiment: 75,
          complianceChecks: ["Identity Verification Requested"],
          aiScript: "Request customer's subdomain or Account ID to check CRM Zeta E-Commerce database."
        }
      ]
    },
    2: {
      customerText: "Sure, our subdomain is zeta.dbsmintek.com and our Account ID is APEX-9981.",
      options: [
        {
          agentText: "Thank you. I see the contract is ₹10L/mo for 400 seats. However, you scaled to 550 active seats mid-cycle. Let me apply our special enterprise rebate coupon.",
          nextStep: 3,
          sentiment: 85,
          complianceChecks: ["Verify Contract Terms", "Identify Discrepancy"],
          aiScript: "Explain seat scaling (150 extra agents). Offer coupon DBS16YEARS for 20% discount."
        }
      ]
    },
    3: {
      customerText: "Ah, that makes sense. Yes, we did add 150 agents for our seasonal sale. If you could apply the rebate coupon, that would be wonderful.",
      options: [
        {
          agentText: "Done! I have applied the coupon 'DBS16YEARS' to adjust the bill back to ₹10,00,000 for this billing cycle. Is there anything else I can help you with?",
          nextStep: 4,
          sentiment: 95,
          complianceChecks: ["Apply Rebate Coupon", "Billing Discrepancy Resolved"],
          aiScript: "Confirm coupon application. Ask for other concerns before wrapping up."
        }
      ]
    },
    4: {
      customerText: "No, that resolves everything! Thank you so much for the prompt help. Have a good day.",
      options: [
        {
          agentText: "It was my pleasure, David! Thank you for choosing DBS Mintek. Have a great day ahead.",
          nextStep: 5,
          sentiment: 98,
          complianceChecks: ["Polite Closing", "Call Wrap-up"],
          aiScript: "Politely close. Disconnect call and select 'Resolved' disposition."
        }
      ]
    }
  },
  "cyberdyne": {
    0: {
      customerText: "Hello, Sarah Connor here. What is this call about?",
      options: [
        {
          agentText: "Hello Sarah, I'm John calling from DBS Mintek regarding your interest in our Multi-Tenant AI Dialer. Do you have a few minutes?",
          nextStep: 1,
          sentiment: 55,
          complianceChecks: ["Introduce Company & Purpose"],
          aiScript: "Introduce yourself and check for availability."
        }
      ]
    },
    1: {
      customerText: "Yes, we are setting up a medical hub and need an outbound dialer with real-time AI scripting that meets HIPAA guidelines. Can your system do that?",
      options: [
        {
          agentText: "Absolutely! Our dialer is fully HIPAA compliant with database audit logs, WebRTC encryption, and real-time AI copilot scripting. We can set up a demo sandbox for you.",
          nextStep: 2,
          sentiment: 78,
          complianceChecks: ["Confirm Compliance Standards"],
          aiScript: "Discuss HIPAA compliance and WebRTC softphone capabilities."
        }
      ]
    },
    2: {
      customerText: "Excellent. What would the pricing look like for about 120 agents?",
      options: [
        {
          agentText: "For 120 agents, we recommend our Cognitive Enterprise tier. That is ₹12,500 per user/month, but with yearly billing, we offer a 20% discount which brings it to ₹10,000 per user/month.",
          nextStep: 3,
          sentiment: 85,
          complianceChecks: ["Provide Accurate Quote"],
          aiScript: "Quote Cognitive Enterprise rate. Pitch the 20% yearly discount."
        }
      ]
    },
    3: {
      customerText: "That fits our budget. Can you send over the setup instructions and the SLA contract?",
      options: [
        {
          agentText: "Yes, I will trigger the registration link and the draft contract to your email right now. Could you confirm your official email?",
          nextStep: 4,
          sentiment: 90,
          complianceChecks: ["Verify Contact Details", "Send SLA Proposal"],
          aiScript: "Ask for email verification. Trigger draft proposal."
        }
      ]
    },
    4: {
      customerText: "My email is sarah.connor@cyberdyne.io. I'll watch out for it.",
      options: [
        {
          agentText: "Thank you, Sarah. I have sent the details. I will follow up tomorrow to assist with sandbox provisioning. Thank you and goodbye!",
          nextStep: 5,
          sentiment: 95,
          complianceChecks: ["Confirm Email Address", "Polite Closing"],
          aiScript: "Confirm email, set follow-up appointment, and politely end call."
        }
      ]
    }
  }
};

export default function DialerDashboard() {
  // Audio state
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringOscsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Core Dialer State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState<"Idle" | "Calling" | "Connected" | "Ended" | "WrapUp">("Idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [hold, setHold] = useState(false);

  // Active Lead State
  const [leads, setLeads] = useState(initialLeads);
  const [activeLead, setActiveLead] = useState<typeof initialLeads[0] | null>(null);
  
  // Call transcript & Interactive Simulator State
  const [transcript, setTranscript] = useState<{ speaker: "Agent" | "Customer" | "System"; text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sentiment, setSentiment] = useState(50);
  const [completedCompliance, setCompletedCompliance] = useState<string[]>([]);
  const [aiScriptText, setAiScriptText] = useState("Select a lead and initiate call to start AI assistance.");

  // Call history log
  const [history, setHistory] = useState(initialHistory);
  const [selectedDisposition, setSelectedDisposition] = useState("Resolved");

  // Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Play dual-tone DTMF sounds programmatically
  const playDTMFTone = (key: string) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const dtmfFrequencies: Record<string, [number, number]> = {
        "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
        "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
        "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
        "*": [941, 1209], "0": [941, 1336], "#": [941, 1477]
      };
      const freqs = dtmfFrequencies[key];
      if (!freqs) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.12);
      osc2.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.error(e);
    }
  };

  const playTone = (frequency: number, duration: number, volume = 0.08) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore audio context failures due to browser constraints
    }
  };

  const startRingingSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = 440;
      osc2.frequency.value = 480;
      gain.gain.setValueAtTime(0, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ringOscsRef.current = { osc1, osc2, gain };

      // US ring pattern: 1.5s on, 3s off
      let now = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.setValueAtTime(0, now + 1.5);
        now += 4.5;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stopRingingSound = () => {
    try {
      if (ringOscsRef.current) {
        ringOscsRef.current.osc1.stop();
        ringOscsRef.current.osc2.stop();
        ringOscsRef.current.gain.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    } catch {
      // ignore
    }
  };

  // Scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Duration Timer
  useEffect(() => {
    if (callStatus === "Connected" && !hold) {
      timerRef.current = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus, hold]);

  const selectLead = (lead: typeof initialLeads[0]) => {
    if (callStatus !== "Idle") return;
    setActiveLead(lead);
    setPhoneNumber(lead.phone);
    playTone(520, 0.15);
  };

  const handleKeyPress = (num: string) => {
    if (callStatus === "Idle") {
      setPhoneNumber((prev) => prev + num);
      playDTMFTone(num);
    }
  };

  const handleClear = () => {
    if (callStatus === "Idle") {
      setPhoneNumber("");
      playTone(300, 0.1);
    }
  };

  const handleBackspace = () => {
    if (callStatus === "Idle") {
      setPhoneNumber((prev) => prev.slice(0, -1));
      playTone(400, 0.08);
    }
  };

  // Start Call flow
  const handleCallAction = () => {
    if (callStatus === "Idle") {
      if (!phoneNumber) return;
      
      setCallSeconds(0);
      setTranscript([{ speaker: "System", text: `SIP Outbound campaign call to ${activeLead ? activeLead.name : phoneNumber}...` }]);
      setCallStatus("Calling");
      setCompletedCompliance([]);
      setSentiment(50);
      setCurrentStep(0);
      
      // Play ringback tone
      startRingingSound();

      // Trigger automatic connection after 3 seconds
      setTimeout(() => {
        stopRingingSound();
        playTone(660, 0.15, 0.1); // Connection chime
        setCallStatus("Connected");
        
        // Load default dialogue or campaign
        const campaignKey = activeLead ? activeLead.key : "zeta";
        const campaignTree = CAMPAIGN_DIALOGS[campaignKey];
        if (campaignTree && campaignTree[0]) {
          setTranscript((prev) => [
            ...prev,
            { speaker: "System", text: "VoIP Trunk connected. Recording active." },
            { speaker: "Customer", text: campaignTree[0].customerText }
          ]);
          setAiScriptText(campaignTree[0].options[0].aiScript);
        } else {
          setTranscript((prev) => [
            ...prev,
            { speaker: "System", text: "VoIP Trunk connected. Recording active." },
            { speaker: "Customer", text: "Hello? Is anyone there?" }
          ]);
          setAiScriptText("No campaign configuration detected. Proceed with generic scripts.");
        }
      }, 3000);
      
    } else {
      // Manual Disconnect
      stopRingingSound();
      playTone(320, 0.3, 0.08); // Disconnect beep
      setCallStatus("WrapUp");
    }
  };

  // Agent Dialogue Options Clicked
  const handleDialogueChoice = (option: DialogOption) => {
    // 1. Add agent text to transcript
    setTranscript((prev) => [...prev, { speaker: "Agent", text: option.agentText }]);
    
    // 2. Add compliance marks
    if (option.complianceChecks) {
      setCompletedCompliance((prev) => [...Array.from(new Set([...prev, ...option.complianceChecks]))]);
    }
    
    // 3. Update sentiment
    setSentiment(option.sentiment);

    // 4. Progress step
    const next = option.nextStep;
    setCurrentStep(next);

    // If next is 5 (ended), prepare system disconnect
    if (next === 5) {
      setTimeout(() => {
        setTranscript((prev) => [...prev, { speaker: "System", text: "Call completed by subscriber." }]);
        playTone(320, 0.3, 0.08);
        setCallStatus("WrapUp");
      }, 1500);
      return;
    }

    // Load customer response after short simulated speaking delay
    const campaignKey = activeLead ? activeLead.key : "zeta";
    const campaignTree = CAMPAIGN_DIALOGS[campaignKey];
    if (campaignTree && campaignTree[next]) {
      setTimeout(() => {
        setTranscript((prev) => [...prev, { speaker: "Customer", text: campaignTree[next].customerText }]);
        setAiScriptText(campaignTree[next].options[0]?.aiScript || "End of scripted prompts.");
      }, 1200);
    }
  };

  // Submit wrap-up code
  const submitDisposition = () => {
    const durationStr = `${Math.floor(callSeconds / 60).toString().padStart(2, "0")}:${(callSeconds % 60).toString().padStart(2, "0")}`;
    const newLog = {
      id: `h-${Date.now()}`,
      name: activeLead ? activeLead.name : "Ad-hoc Call",
      company: activeLead ? activeLead.company : "External Outbound",
      date: "Just Now",
      duration: durationStr,
      disposition: selectedDisposition,
      sentiment: sentiment,
      status: selectedDisposition === "Resolved" ? "Interested" : "Neutral"
    };

    setHistory([newLog, ...history]);

    // Update status of leads if in queue
    if (activeLead) {
      setLeads(leads.map(l => l.id === activeLead.id ? { ...l, status: selectedDisposition === "Resolved" ? "Completed" : "Follow Up" } : l));
    }

    // Reset dialer
    setCallStatus("Idle");
    setPhoneNumber("");
    setCallSeconds(0);
    setActiveLead(null);
    setTranscript([]);
    setMuted(false);
    setHold(false);
    setRecording(false);
    setAiScriptText("Select a lead and initiate call to start AI assistance.");
    playTone(520, 0.1);
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Disc className={`w-5 h-5 ${callStatus === "Connected" ? "text-[#EF4444] animate-pulse" : "text-[#00C2FF]"}`} />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">WebRTC Contact Center Softphone</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">Interactive Agent Dialer Console</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1.5 rounded bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-xs font-semibold text-[#00E5A0] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-ping" />
              SIP Trunk: Registered (Turbhe HQ)
            </span>
          </div>
        </AnimatedSection>

        {/* Dashboard Panels */}
        <div className="grid lg:grid-cols-[1.1fr,1.8fr,1.1fr] gap-8 items-start">
          
          {/* LEFT COLUMN: Campaign Queue & History */}
          <div className="space-y-6">
            
            {/* Campaign Queue Card */}
            <AnimatedSection className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <Users className="w-4.5 h-4.5 text-[#00C2FF]" />
                Campaign Queue (India Outbound)
              </h3>
              
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => selectLead(lead)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                      activeLead?.id === lead.id
                        ? "bg-[#0057D9]/20 border-[#0057D9] shadow-lg shadow-[#0057D9]/10"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white leading-none">{lead.name}</h4>
                        <p className="text-[10px] text-[#64748B] mt-1">{lead.company}</p>
                      </div>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                        lead.status === "Queue"
                          ? "bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20"
                          : lead.status === "Completed"
                          ? "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20"
                          : "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-semibold text-[#94A3B8] mt-3 border-t border-white/[0.04] pt-2">
                      <span>{lead.phone}</span>
                      <span className="text-[9px] text-[#00E5A0] truncate max-w-[110px]">{lead.campaign}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Dialer Call Logs Card */}
            <AnimatedSection delay={0.1} className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <History className="w-4.5 h-4.5 text-[#8B5CF6]" />
                Recent Call Logs
              </h3>

              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                {history.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.04] text-[10px] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{log.name}</span>
                      <span className="text-[#64748B] font-mono text-[8px]">{log.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#94A3B8]">
                      <span>{log.company}</span>
                      <span className="font-mono text-white bg-white/[0.05] px-1.5 py-0.5 rounded">{log.duration}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/[0.04] pt-2 text-[9px]">
                      <span className={`font-semibold ${
                        log.status === "Interested" ? "text-[#00E5A0]" : "text-[#94A3B8]"
                      }`}>{log.disposition}</span>
                      <span className="text-[#00C2FF] font-semibold">CSAT: {log.sentiment}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>

          {/* MIDDLE COLUMN: WebRTC Dialer Interface & Call Transcript */}
          <div className="space-y-6">
            
            {/* Softphone & Screen */}
            <AnimatedSection className="glass-card-strong p-6 relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Visual Softphone UI */}
                <div className="bg-[#0c182c]/80 border border-white/[0.06] p-5 rounded-2xl relative overflow-hidden">
                  
                  {/* Screen */}
                  <div className="bg-[#081120] border border-white/[0.04] p-4 rounded-xl text-center space-y-2 mb-4">
                    <div className="flex justify-between items-center text-[8px] font-bold text-[#64748B] tracking-wider">
                      <span>WEBRTC SIP CLIENT</span>
                      <span className={`w-2 h-2 rounded-full ${callStatus === "Connected" ? "bg-[#EF4444]" : callStatus === "Calling" ? "bg-[#F59E0B] animate-pulse" : "bg-[#00E5A0]"}`} />
                    </div>
                    
                    <div className="text-base font-bold text-white min-h-[24px] tracking-wide overflow-hidden truncate">
                      {phoneNumber || "Enter number..."}
                    </div>

                    <div className="text-[9px] text-[#94A3B8] font-bold h-3">
                      {callStatus === "Idle" ? "SIP Registered" : callStatus === "Calling" ? "Ringing Local Exchange..." : `Connected • ${formatTime(callSeconds)}`}
                    </div>
                  </div>

                  {/* Keyboard dialpad for Idle state */}
                  {callStatus === "Idle" && (
                    <div className="grid grid-cols-3 gap-2.5 mb-4">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleKeyPress(num)}
                          className="py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-bold text-white hover:bg-white/[0.08] active:bg-[#0057D9] transition-all"
                        >
                          {num}
                        </button>
                      ))}
                      
                      <button
                        onClick={handleClear}
                        className="py-1 text-[9px] font-bold text-[#64748B] hover:text-white"
                      >
                        Clear
                      </button>
                      <div />
                      <button
                        onClick={handleBackspace}
                        className="py-1 text-[9px] font-bold text-[#64748B] hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Active call statistics view */}
                  {callStatus !== "Idle" && callStatus !== "WrapUp" && (
                    <div className="py-6 flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center animate-pulse">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        {recording && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <h4 className="text-xs font-bold text-white">{activeLead ? activeLead.name : "Ad-hoc Dial"}</h4>
                        <p className="text-[9px] text-[#64748B] mt-0.5">{activeLead ? activeLead.company : "External Outbound"}</p>
                      </div>

                      {/* WebRTC Telephony controls */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => setMuted(!muted)}
                          className={`p-2.5 rounded-lg border text-[9px] font-bold transition-all flex flex-col items-center gap-1 ${
                            muted ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]" : "bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.05]"
                          }`}
                          title="Mute Audio"
                        >
                          {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          <span>{muted ? "Muted" : "Mute"}</span>
                        </button>
                        
                        <button
                          onClick={() => setHold(!hold)}
                          className={`p-2.5 rounded-lg border text-[9px] font-bold transition-all flex flex-col items-center gap-1 ${
                            hold ? "bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]" : "bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.05]"
                          }`}
                          title="Hold Call"
                        >
                          {hold ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{hold ? "On Hold" : "Hold"}</span>
                        </button>

                        <button
                          onClick={() => setRecording(!recording)}
                          className={`p-2.5 rounded-lg border text-[9px] font-bold transition-all flex flex-col items-center gap-1 ${
                            recording ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]" : "bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.05]"
                          }`}
                          title="Record Stream"
                        >
                          <Disc className={`w-4 h-4 ${recording ? "animate-spin text-red-500" : ""}`} />
                          <span>{recording ? "Recording" : "Record"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* WrapUp screen */}
                  {callStatus === "WrapUp" && (
                    <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl space-y-3 mb-4">
                      <span className="text-[8px] font-bold text-[#F59E0B] uppercase tracking-wider block">Call Wrap-Up Disposition</span>
                      <div className="space-y-2.5">
                        <label className="text-[9px] font-bold uppercase text-[#64748B] block">Disposition Status</label>
                        <select
                          value={selectedDisposition}
                          onChange={(e) => setSelectedDisposition(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white"
                        >
                          <option value="Resolved" className="bg-[#0f172a] text-white">Resolved / Closed</option>
                          <option value="Follow-Up Needed" className="bg-[#0f172a] text-white">Follow-Up Needed</option>
                          <option value="No Interest" className="bg-[#0f172a] text-white">No Interest / Declined</option>
                          <option value="Busy / CallBack" className="bg-[#0f172a] text-white">Busy / Call Back</option>
                        </select>
                      </div>

                      <button
                        onClick={submitDisposition}
                        className="w-full py-2 bg-[#00E5A0] hover:bg-[#00C896] text-[#081120] font-bold rounded-lg text-xs transition-all mt-3"
                      >
                        Submit & Reset Dialer
                      </button>
                    </div>
                  )}

                  {/* Primary Call Trigger Button */}
                  {callStatus !== "WrapUp" && (
                    <button
                      onClick={handleCallAction}
                      disabled={!phoneNumber && callStatus === "Idle"}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        callStatus === "Idle"
                          ? phoneNumber
                            ? "bg-[#22C55E] text-white hover:shadow-lg hover:shadow-[#22C55E]/20"
                            : "bg-white/[0.03] border border-white/[0.06] text-[#475569] cursor-not-allowed"
                          : "bg-[#EF4444] text-white hover:shadow-lg hover:shadow-[#EF4444]/20"
                      }`}
                    >
                      {callStatus === "Idle" ? (
                        <>
                          <Phone className="w-4 h-4" />
                          Initiate SIP Call
                        </>
                      ) : (
                        <>
                          <PhoneOff className="w-4 h-4" />
                          Disconnect Call
                        </>
                      )}
                    </button>
                  )}

                </div>

                {/* Live Call Telephony Metadata */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-2.5">
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block">Trunk Connection Details</span>
                    <div className="grid grid-cols-2 gap-3 text-[10px] font-semibold text-white">
                      <div>
                        <span className="text-[#64748B] block text-[8px] uppercase">Protocol</span>
                        <span>WebRTC / SIP</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block text-[8px] uppercase">Audio Codec</span>
                        <span>Opus HD Audio</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block text-[8px] uppercase">SIP Server IP</span>
                        <span>103.88.22.61:5060</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block text-[8px] uppercase">Network RTT</span>
                        <span className="text-[#00E5A0]">24 ms (Excellent)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-2">
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block">Outbound Dial Settings</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[9px] font-bold text-white">AMD Enabled</span>
                      <span className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[9px] font-bold text-white">Caller ID Masked</span>
                      <span className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[9px] font-bold text-white">DNC Wash Active</span>
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedSection>

            {/* Simulated Live Call Transcript */}
            <AnimatedSection delay={0.1} className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4.5 h-4.5 text-[#00E5A0]" />
                  Live Call Transcript (Simulator)
                </span>
                {callStatus === "Connected" && (
                  <span className="text-[8px] uppercase font-bold px-2 py-0.5 rounded bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] animate-pulse">
                    LIVE CAPTURE
                  </span>
                )}
              </h3>

              <div className="h-[200px] overflow-y-auto space-y-4 pr-1 mb-6 flex flex-col">
                {transcript.length > 0 ? (
                  transcript.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.speaker === "Agent"
                          ? "self-end items-end"
                          : msg.speaker === "Customer"
                          ? "self-start items-start"
                          : "self-center text-center max-w-full"
                      }`}
                    >
                      <span className="text-[8px] font-bold text-[#64748B] mb-1">
                        {msg.speaker === "System" ? "" : msg.speaker}
                      </span>
                      <div
                        className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                          msg.speaker === "Agent"
                            ? "bg-[#0057D9] text-white rounded-tr-none"
                            : msg.speaker === "Customer"
                            ? "bg-white/[0.04] border border-white/[0.06] text-[#E2E8F0] rounded-tl-none"
                            : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-[9px] rounded-lg px-4 py-1"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 text-[#64748B] text-xs my-auto">
                    Initiate a call or select a lead from the queue to start conversation dialog simulator.
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>

              {/* Agent Option Selectors */}
              {callStatus === "Connected" && CAMPAIGN_DIALOGS[activeLead?.key || "zeta"]?.[currentStep] && (
                <div className="space-y-2.5 border-t border-white/[0.06] pt-4">
                  <span className="text-[10px] font-bold text-[#00C2FF] uppercase tracking-wider block mb-1">Select Agent Response (Dialer Sim):</span>
                  <div className="grid gap-2">
                    {CAMPAIGN_DIALOGS[activeLead?.key || "zeta"][currentStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleDialogueChoice(opt)}
                        className="w-full text-left p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:bg-[#0057D9]/10 hover:border-[#0057D9]/50 text-xs text-white transition-all font-semibold flex items-center justify-between gap-3 group"
                      >
                        <span>&ldquo;{opt.agentText}&rdquo;</span>
                        <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#00C2FF] flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>

          </div>

          {/* RIGHT COLUMN: AI Copilot & Real-Time Analytics */}
          <div className="space-y-6">
            
            {/* AI Real-time Analytics */}
            <AnimatedSection className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <Sparkles className="w-4.5 h-4.5 text-[#00C2FF]" />
                Live Call Analytics
              </h3>

              <div className="space-y-5">
                {/* Sentiment Meter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#64748B]">Customer Sentiment:</span>
                    <span className={`${sentiment >= 75 ? "text-[#00E5A0]" : sentiment >= 50 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
                      {sentiment}% {sentiment >= 75 ? "Positive" : sentiment >= 50 ? "Neutral" : "Dissatisfied"}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${
                        sentiment >= 75
                          ? "from-[#00E5A0] to-[#00C896]"
                          : sentiment >= 50
                          ? "from-[#F59E0B] to-[#D97706]"
                          : "from-[#EF4444] to-[#DC2626]"
                      }`}
                      animate={{ width: `${sentiment}%` }}
                      transition={{ type: "spring", damping: 15 }}
                    />
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/[0.04] pt-4">
                  <div className="bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                    <span className="text-[8px] text-[#64748B] uppercase block">Speaking Rate</span>
                    <span className="text-xs font-bold text-white mt-1 block">142 WPM</span>
                  </div>
                  <div className="bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                    <span className="text-[8px] text-[#64748B] uppercase block">Voice Pitch Jitter</span>
                    <span className="text-xs font-bold text-[#00E5A0] mt-1 block">0.8% (Stable)</span>
                  </div>
                  <div className="bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                    <span className="text-[8px] text-[#64748B] uppercase block">RAG Context Lock</span>
                    <span className="text-xs font-bold text-[#00C2FF] mt-1 block">99.4% Acc</span>
                  </div>
                  <div className="bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                    <span className="text-[8px] text-[#64748B] uppercase block">Telephony Jitter</span>
                    <span className="text-xs font-bold text-white mt-1 block">2.1ms</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* AI Copilot Prompts Scripting */}
            <AnimatedSection delay={0.1} className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <Sparkles className="w-4.5 h-4.5 text-[#00C2FF]" />
                AI Suggested Scripting
              </h3>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] min-h-[110px] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">
                  {aiScriptText}
                </p>
              </div>
            </AnimatedSection>

            {/* Dynamic Compliance Checklist */}
            <AnimatedSection delay={0.2} className="glass-card-strong p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <CheckCircle className="w-4.5 h-4.5 text-[#00E5A0]" />
                FCA / HIPAA Compliance Audit
              </h3>

              <div className="space-y-3">
                {[
                  "Verify Caller Name",
                  "Identity Verification Requested",
                  "Verify Contract Terms",
                  "Identify Discrepancy",
                  "Confirm Compliance Standards",
                  "Provide Accurate Quote",
                  "Confirm Email Address",
                  "Apply Rebate Coupon",
                  "Polite Closing",
                  "Call Wrap-up"
                ].map((item) => {
                  const checked = completedCompliance.includes(item);
                  return (
                    <div key={item} className="flex items-center gap-3 text-xs">
                      {checked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-[#00E5A0] flex-shrink-0" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-[#64748B] flex-shrink-0" />
                      )}
                      <span className={`font-semibold transition-colors ${checked ? "text-[#E2E8F0]" : "text-[#64748B]"}`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>

          </div>

        </div>
      </div>
    </div>
  );
}
