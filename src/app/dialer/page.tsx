"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  Upload,
  BarChart3,
  Search,
  Volume2,
  Headphones,
  Sliders,
  Database,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Trash2,
  Settings,
  Eye,
  AudioLines,
  Info,
  X,
  RotateCcw,
  Send
} from "lucide-react";

// Initial Queue Leads
const initialLeads = [
  { id: "l-1", name: "David Miller", company: "Zeta Inc.", phone: "+91 83082 11113", status: "Queue", key: "zeta", campaign: "Zeta Invoice Discrepancy" },
  { id: "l-2", name: "Sarah Connor", company: "Cyberdyne Systems", phone: "+91 99821 77722", status: "Queue", key: "cyberdyne", campaign: "Outbound AI Telephony Demo" },
  { id: "l-3", name: "Thomas Anderson", company: "Meta Cortex", phone: "+91 78221 00982", status: "Follow Up", key: "zeta", campaign: "SaaS License Consulting" },
  { id: "l-4", name: "Ellen Ripley", company: "Weyland-Yutani", phone: "+91 92831 01844", status: "CallBack", key: "cyberdyne", campaign: "SLA Custom Review" }
];

// Initial Call Recordings / Logs
const initialHistory = [
  { id: "h-1", name: "Marcus Wright", company: "Project Angel", date: "Today, 11:20 AM", duration: "02:45", disposition: "Resolved", sentiment: 88, status: "Interested", transcript: [
    { speaker: "Customer", text: "Hello, looking for active SIP integrations." },
    { speaker: "Agent", text: "We provide WebRTC codecs with low latency." },
    { speaker: "Customer", text: "Awesome, please send the documentation." }
  ]},
  { id: "h-2", name: "Kyle Reese", company: "TechCom", date: "Yesterday, 04:15 PM", duration: "01:12", disposition: "Follow-Up Needed", sentiment: 42, status: "Neutral", transcript: [
    { speaker: "Customer", text: "Is the dialer HIPAA compliant?" },
    { speaker: "Agent", text: "Yes, we have complete audit logs and encryption." },
    { speaker: "Customer", text: "I need to confirm this with our IT supervisor first." }
  ]},
  { id: "h-3", name: "John Connor", company: "Resistance HQ", date: "Yesterday, 02:30 PM", duration: "00:45", disposition: "No Answer", sentiment: 50, status: "Abandoned", transcript: [] }
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

export default function UnifiedDialerDashboard() {
  // Navigation / View state
  const [currentView, setCurrentView] = useState<"agent" | "admin">("agent");

  // Shared Core States
  const [leads, setLeads] = useState(initialLeads);
  const [history, setHistory] = useState(initialHistory);
  const [activeLead, setActiveLead] = useState<typeof initialLeads[0] | null>(null);

  // Audio Refs & State
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringOscsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const [muted, setMuted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [hold, setHold] = useState(false);

  // AGENT DIALER STATES
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState<"Idle" | "Calling" | "Connected" | "Ended" | "WrapUp">("Idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const [transcript, setTranscript] = useState<{ speaker: "Agent" | "Customer" | "System"; text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sentiment, setSentiment] = useState(50);
  const [completedCompliance, setCompletedCompliance] = useState<string[]>([]);
  const [aiScriptText, setAiScriptText] = useState("Select a lead and initiate call to start AI assistance.");
  const [selectedDisposition, setSelectedDisposition] = useState("Resolved");

  // CSV Lead Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ADMIN MONITORING STATES
  const [monitoredAgent, setMonitoredAgent] = useState<{ name: string; callDuration: string; campaign: string; status: string; customer: string; sentiment: number; transcript: { speaker: string; text: string }[] } | null>(null);
  const [adminWhisper, setAdminWhisper] = useState("");
  const [activeWhispers, setActiveWhispers] = useState<string[]>([]);
  const [adminBargeIn, setAdminBargeIn] = useState(false);

  // CALL RECORDING PLAYER STATES
  const [playingRecordingId, setPlayingRecordingId] = useState<string | null>(null);
  const [playerProgress, setPlayerProgress] = useState(0);
  const playerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for Scroll and Timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Sound Synth Helpers
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
    } catch {
      // Catch silently
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
      // ignore
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

      let now = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.setValueAtTime(0, now + 1.5);
        now += 4.5;
      }
    } catch {
      // ignore
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

  // Duration Timer for active agent call
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

  // Lead selection handler
  const selectLead = (lead: typeof initialLeads[0]) => {
    if (callStatus !== "Idle") return;
    setActiveLead(lead);
    setPhoneNumber(lead.phone);
    playTone(520, 0.15);
  };

  // Dialpad Keypress
  const handleDialpadPress = (num: string) => {
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

  // Initiate call trigger
  const handleCallAction = () => {
    if (callStatus === "Idle") {
      if (!phoneNumber) return;
      
      setCallSeconds(0);
      setTranscript([{ speaker: "System", text: `SIP Outbound call to ${activeLead ? activeLead.name : phoneNumber}...` }]);
      setCallStatus("Calling");
      setCompletedCompliance([]);
      setSentiment(50);
      setCurrentStep(0);
      
      startRingingSound();

      setTimeout(() => {
        stopRingingSound();
        playTone(660, 0.15, 0.1); 
        setCallStatus("Connected");
        
        const campaignKey = activeLead ? activeLead.key : "zeta";
        const campaignTree = CAMPAIGN_DIALOGS[campaignKey];
        if (campaignTree && campaignTree[0]) {
          setTranscript((prev) => [
            ...prev,
            { speaker: "System", text: "VoIP Trunk connected. Call recording enabled." },
            { speaker: "Customer", text: campaignTree[0].customerText }
          ]);
          setAiScriptText(campaignTree[0].options[0].aiScript);
        } else {
          setTranscript((prev) => [
            ...prev,
            { speaker: "System", text: "VoIP Trunk connected. Call recording enabled." },
            { speaker: "Customer", text: "Hello? Who is calling?" }
          ]);
          setAiScriptText("No campaign configuration detected. Proceed with generic scripts.");
        }
      }, 3000);
      
    } else {
      stopRingingSound();
      playTone(320, 0.3, 0.08); 
      setCallStatus("WrapUp");
    }
  };

  // Agent dialogue selection
  const handleDialogueChoice = (option: DialogOption) => {
    setTranscript((prev) => [...prev, { speaker: "Agent", text: option.agentText }]);
    
    if (option.complianceChecks) {
      setCompletedCompliance((prev) => [...Array.from(new Set([...prev, ...option.complianceChecks]))]);
    }
    
    setSentiment(option.sentiment);
    const next = option.nextStep;
    setCurrentStep(next);

    if (next === 5) {
      setTimeout(() => {
        setTranscript((prev) => [...prev, { speaker: "System", text: "Call hung up by subscriber." }]);
        playTone(320, 0.3, 0.08);
        setCallStatus("WrapUp");
      }, 1500);
      return;
    }

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
    
    // Create new history log (which acts as a call recording)
    const newLog = {
      id: `h-${Date.now()}`,
      name: activeLead ? activeLead.name : "Outbound Call",
      company: activeLead ? activeLead.company : "Unassigned Lead",
      date: "Just Now",
      duration: durationStr,
      disposition: selectedDisposition,
      sentiment: sentiment,
      status: selectedDisposition === "Resolved" ? "Interested" : "Neutral",
      transcript: transcript.filter(t => t.speaker !== "System")
    };

    setHistory([newLog, ...history]);

    if (activeLead) {
      setLeads(leads.map(l => l.id === activeLead.id ? { ...l, status: selectedDisposition === "Resolved" ? "Completed" : "Follow Up" } : l));
    }

    // Reset
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

  // CSV Lead Upload Handlers
  const parseLeadsContent = (content: string) => {
    const rows = content.split("\n");
    const addedLeads = [];
    for (const r of rows) {
      if (!r.trim()) continue;
      // Format: Name, Company, Phone, Campaign
      const cols = r.split(",");
      if (cols.length >= 3) {
        const name = cols[0].trim();
        const company = cols[1].trim();
        const phone = cols[2].trim();
        const campaign = cols[3] ? cols[3].trim() : "Ad-hoc Outbound";
        addedLeads.push({
          id: `l-upload-${Date.now()}-${Math.random()}`,
          name,
          company,
          phone,
          status: "Queue",
          key: name.toLowerCase().includes("sarah") ? "cyberdyne" : "zeta",
          campaign
        });
      }
    }
    return addedLeads;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const newLeads = parseLeadsContent(text);
      if (newLeads.length > 0) {
        setLeads([...newLeads, ...leads]);
        setUploadSuccess(`Successfully uploaded ${newLeads.length} leads to queue.`);
        playTone(600, 0.15);
      } else {
        alert("Invalid CSV format. Expected: Name, Company, Phone, [Campaign]");
      }
    };
    reader.readAsText(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const newLeads = parseLeadsContent(text);
      if (newLeads.length > 0) {
        setLeads([...newLeads, ...leads]);
        setUploadSuccess(`Successfully uploaded ${newLeads.length} leads to queue.`);
        playTone(600, 0.15);
      } else {
        alert("Invalid CSV/TXT format. Expected: Name, Company, Phone, [Campaign]");
      }
    };
    reader.readAsText(file);
  };

  // Live Agent Monitoring details (Mock active agent data)
  const mockActiveAgents = [
    {
      name: "Sarah Connor",
      callDuration: "01:42",
      campaign: "Outbound AI Telephony Demo",
      status: "On Call",
      customer: "David Miller",
      sentiment: 82,
      transcript: [
        { speaker: "Customer", text: "Hello? Yes, Sarah here." },
        { speaker: "Agent", text: "Hello Sarah, I'm calling from DBS Mintek regarding your dialer request." },
        { speaker: "Customer", text: "Oh, perfect. I wanted to see if the dialer includes real-time compliance scripting?" },
        { speaker: "Agent", text: "Yes, our AI Copilot provides live prompt guidelines and checklist tracking." }
      ]
    },
    {
      name: "Marcus Wright",
      callDuration: "00:00",
      campaign: "Zeta Invoice Discrepancy",
      status: "Idle",
      customer: "",
      sentiment: 0,
      transcript: []
    },
    {
      name: "Kyle Reese",
      callDuration: "00:00",
      campaign: "SLA Custom Review",
      status: "On Break",
      customer: "",
      sentiment: 0,
      transcript: []
    }
  ];

  const handleListenIn = (agent: typeof mockActiveAgents[0]) => {
    setMonitoredAgent(agent);
    setActiveWhispers([]);
    setAdminBargeIn(false);
    playTone(520, 0.15);
  };

  const sendWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminWhisper) return;
    setActiveWhispers([...activeWhispers, adminWhisper]);
    setAdminWhisper("");
    playTone(660, 0.08);
  };

  // Completed Call Recording Waveform Player
  const startPlayingRecording = (log: typeof initialHistory[0]) => {
    if (playingRecordingId === log.id) {
      // Pause
      setPlayingRecordingId(null);
      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
      playTone(440, 0.1, 0.05); // Pause chime
    } else {
      // Play
      setPlayingRecordingId(log.id);
      setPlayerProgress(0);
      playTone(880, 0.15, 0.05); // Play chime
      
      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
      playerTimerRef.current = setInterval(() => {
        setPlayerProgress((p) => {
          if (p >= 100) {
            setPlayingRecordingId(null);
            if (playerTimerRef.current) clearInterval(playerTimerRef.current);
            return 0;
          }
          return p + 5;
        });
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (playerTimerRef.current) clearInterval(playerTimerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1550px] mx-auto px-6">
        
        {/* Unified Ecosystem Header */}
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/[0.06] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">DBS Mintek Dialer Ecosystem</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">VoIP Telephony Console</h1>
          </div>

          {/* Toggle Tabs */}
          <div className="flex p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] max-w-sm self-start">
            <button
              onClick={() => {
                setCurrentView("agent");
                playTone(440, 0.1);
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                currentView === "agent" ? "bg-[#0057D9] text-white shadow-lg shadow-[#0057D9]/20" : "text-[#64748B] hover:text-white"
              }`}
            >
              <Headphones className="w-4 h-4" />
              Agent Workspace
            </button>
            <button
              onClick={() => {
                setCurrentView("admin");
                playTone(440, 0.1);
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                currentView === "admin" ? "bg-[#0057D9] text-white shadow-lg shadow-[#0057D9]/20" : "text-[#64748B] hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Admin Dashboard
            </button>
          </div>
        </AnimatedSection>

        {/* View Render Conditional */}
        {currentView === "agent" ? (
          
          /* ---------------------------------------------------- */
          /* AGENT WORKSPACE VIEW                                 */
          /* ---------------------------------------------------- */
          <div className="grid lg:grid-cols-[1.1fr,1.8fr,1.1fr] gap-8 items-start">
            
            {/* Left Panel: Campaign Queue & CSV Uploader */}
            <div className="space-y-6">
              
              {/* CSV / Lead File Uploader */}
              <AnimatedSection className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Upload className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Upload Lead Campaign
                </h3>

                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-[#00C2FF] bg-[#00C2FF]/10 scale-102"
                      : "border-white/[0.08] bg-white/[0.01] hover:border-white/[0.2] hover:bg-white/[0.03]"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".csv,.txt"
                    className="hidden"
                  />
                  <FileSpreadsheet className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
                  <p className="text-xs font-bold text-white mb-1">Drag & Drop CSV / TXT File</p>
                  <p className="text-[10px] text-[#64748B]">Expected Format: Name, Company, Phone, [Campaign]</p>
                </div>

                {uploadSuccess && (
                  <div className="mt-3 p-2 bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded text-[10px] text-[#00E5A0] font-semibold flex items-center justify-between">
                    <span>{uploadSuccess}</span>
                    <button onClick={() => setUploadSuccess(null)}><X className="w-3.5 h-3.5" /></button>
                  </div>
                )}
              </AnimatedSection>

              {/* Leads Campaign Queue */}
              <AnimatedSection delay={0.1} className="glass-card-strong p-6">
                <div className="flex justify-between items-center mb-4 border-b border-white/[0.06] pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4.5 h-4.5 text-[#00C2FF]" />
                    Leads Queue ({leads.length})
                  </h3>
                  <button
                    onClick={() => {
                      setLeads(initialLeads);
                      playTone(300, 0.15);
                    }}
                    className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[9px] text-[#94A3B8] flex items-center gap-1 font-bold"
                    title="Reset Queue"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
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
                        <span className="text-[9px] text-[#00E5A0] truncate max-w-[120px]">{lead.campaign}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

            </div>

            {/* Middle Panel: Softphone Panel & Live Transcript */}
            <div className="space-y-6">
              
              {/* WebRTC Softphone client */}
              <AnimatedSection className="glass-card-strong p-6 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  
                  {/* Visual Client UI */}
                  <div className="bg-[#0c182c]/80 border border-white/[0.06] p-5 rounded-2xl relative overflow-hidden">
                    
                    {/* Screen */}
                    <div className="bg-[#081120] border border-white/[0.04] p-4 rounded-xl text-center space-y-2 mb-4">
                      <div className="flex justify-between items-center text-[8px] font-bold text-[#64748B] tracking-wider">
                        <span>SIP PHONE CLIENT</span>
                        <span className={`w-2 h-2 rounded-full ${callStatus === "Connected" ? "bg-[#EF4444]" : callStatus === "Calling" ? "bg-[#F59E0B] animate-pulse" : "bg-[#00E5A0]"}`} />
                      </div>
                      
                      <div className="text-base font-bold text-white min-h-[24px] tracking-wide overflow-hidden truncate">
                        {phoneNumber || "Enter number..."}
                      </div>

                      <div className="text-[9px] text-[#94A3B8] font-bold h-3">
                        {callStatus === "Idle" ? "SIP Registered" : callStatus === "Calling" ? "Line Ringing..." : `Connected • ${formatTime(callSeconds)}`}
                      </div>
                    </div>

                    {/* Keypad */}
                    {callStatus === "Idle" && (
                      <div className="grid grid-cols-3 gap-2.5 mb-4">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleDialpadPress(num)}
                            className="py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-bold text-white hover:bg-white/[0.08] active:bg-[#0057D9] transition-all"
                          >
                            {num}
                          </button>
                        ))}
                        
                        <button onClick={handleClear} className="py-1 text-[9px] font-bold text-[#64748B] hover:text-white">Clear</button>
                        <div />
                        <button onClick={handleBackspace} className="py-1 text-[9px] font-bold text-[#64748B] hover:text-white">Delete</button>
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
                          <h4 className="text-xs font-bold text-white">{activeLead ? activeLead.name : "Ad-hoc Call"}</h4>
                          <p className="text-[9px] text-[#64748B] mt-0.5">{activeLead ? activeLead.company : "External Outbound"}</p>
                        </div>

                        {/* Call controls */}
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
                            title="Record Call"
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
                        <span className="text-[8px] font-bold text-[#F59E0B] uppercase tracking-wider block">Call Wrap-Up Code</span>
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase text-[#64748B] block">Disposition Status</label>
                          <select
                            value={selectedDisposition}
                            onChange={(e) => setSelectedDisposition(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-[#081120] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white"
                          >
                            <option value="Resolved">Resolved / Closed</option>
                            <option value="Follow-Up Needed">Follow-Up Needed</option>
                            <option value="No Interest">No Interest / Declined</option>
                            <option value="Busy / CallBack">Busy / Call Back</option>
                          </select>
                        </div>

                        <button
                          onClick={submitDisposition}
                          className="w-full py-2 bg-[#00E5A0] hover:bg-[#00C896] text-[#081120] font-bold rounded-lg text-xs transition-all mt-3"
                        >
                          Submit Wrap-Up Code
                        </button>
                      </div>
                    )}

                    {/* Primary Call Button */}
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
                            Initiate Call
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

                  {/* Operational Settings */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-2.5">
                      <span className="text-[9px] uppercase font-bold text-[#64748B] block">Network Status</span>
                      <div className="grid grid-cols-2 gap-3 text-[10px] font-semibold text-white">
                        <div>
                          <span className="text-[#64748B] block text-[8px] uppercase">Engine</span>
                          <span>WebRTC (Opus)</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[8px] uppercase">Jitter Buffer</span>
                          <span className="text-[#00E5A0]">Normal (12ms)</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[8px] uppercase">Server Region</span>
                          <span>Navi Mumbai HQ</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[8px] uppercase">Telemetry</span>
                          <span className="text-[#00E5A0]">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-2">
                      <span className="text-[9px] uppercase font-bold text-[#64748B] block">Campaign Masking</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[9px] font-bold text-white">CallerID Verified</span>
                        <span className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-[9px] font-bold text-white">DNC Compliant</span>
                      </div>
                    </div>
                  </div>

                </div>
              </AnimatedSection>

              {/* Simulated Call Transcript flow */}
              <AnimatedSection delay={0.1} className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4.5 h-4.5 text-[#00E5A0]" />
                    Live Conversation Stream
                  </span>
                  {callStatus === "Connected" && (
                    <span className="text-[8px] uppercase font-bold px-2 py-0.5 rounded bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] animate-pulse">
                      Live VoIP Feed
                    </span>
                  )}
                </h3>

                <div className="h-[210px] overflow-y-auto space-y-4 pr-1 mb-6 flex flex-col justify-start">
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
                              ? "bg-white/[0.03] border border-white/[0.06] text-[#E2E8F0] rounded-tl-none"
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

                {/* Interactive Script Options */}
                {callStatus === "Connected" && CAMPAIGN_DIALOGS[activeLead?.key || "zeta"]?.[currentStep] && (
                  <div className="space-y-2.5 border-t border-white/[0.06] pt-4">
                    <span className="text-[10px] font-bold text-[#00C2FF] uppercase tracking-wider block mb-1">Select Dialogue Response:</span>
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

            {/* Right Panel: AI Copilot & Performance Scorecard */}
            <div className="space-y-6">
              
              {/* Agent Scorecard */}
              <AnimatedSection className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <User className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Agent Daily Scorecard
                </h3>
                <div className="grid grid-cols-2 gap-3 text-white">
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                    <span className="text-[8px] text-[#64748B] uppercase block">Outbound Calls</span>
                    <span className="text-sm font-bold block mt-1">{history.filter(h => h.status !== "Abandoned").length} Calls</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                    <span className="text-[8px] text-[#64748B] uppercase block">Success rate</span>
                    <span className="text-sm font-bold text-[#00E5A0] block mt-1">
                      {Math.round((history.filter(h => h.disposition === "Resolved").length / (history.length || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                    <span className="text-[8px] text-[#64748B] uppercase block">Talk Time Avg</span>
                    <span className="text-sm font-bold block mt-1">02:14</span>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                    <span className="text-[8px] text-[#64748B] uppercase block">Average CSAT</span>
                    <span className="text-sm font-bold text-[#00C2FF] block mt-1">
                      {Math.round(history.reduce((acc, h) => acc + h.sentiment, 0) / (history.length || 1))}%
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* AI Real-time Sentiment */}
              <AnimatedSection delay={0.1} className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Sparkles className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Live Call Analytics
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#64748B]">Customer Mood:</span>
                      <span className={`${sentiment >= 75 ? "text-[#00E5A0]" : sentiment >= 50 ? "text-[#F59E0B]" : "text-[#EF4444]"}`}>
                        {sentiment}% {sentiment >= 75 ? "Positive" : sentiment >= 50 ? "Neutral" : "Displeased"}
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

                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block mb-1">AI Copilot Script Assist:</span>
                    <p className="text-[11px] text-[#CBD5E1] leading-relaxed font-medium">{aiScriptText}</p>
                  </div>

                  {/* Compliance Checklist */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <span className="text-[9px] uppercase font-bold text-[#64748B] block mb-1">FCA/HIPAA Compliance Audit</span>
                    {[
                      "Verify Caller Name",
                      "Identity Verification Requested",
                      "Verify Contract Terms",
                      "Identify Discrepancy",
                      "Apply Rebate Coupon",
                      "Polite Closing"
                    ].map((item) => {
                      const checked = completedCompliance.includes(item);
                      return (
                        <div key={item} className="flex items-center gap-2 text-[10px] font-semibold text-[#CBD5E1]">
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-[#00E5A0]" />
                          ) : (
                            <Square className="w-4 h-4 text-[#64748B]" />
                          )}
                          <span className={checked ? "text-white" : "text-[#64748B]"}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

            </div>

          </div>
        ) : (
          
          /* ---------------------------------------------------- */
          /* ADMIN/SUPERVISOR DIALER DASHBOARD VIEW               */
          /* ---------------------------------------------------- */
          <div className="grid lg:grid-cols-[1.8fr,1.2fr] gap-8 items-start">
            
            {/* Left Block: Active Agents & Call Recording Player */}
            <div className="space-y-6">
              
              {/* Active Agent Monitoring Grid */}
              <AnimatedSection className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Users className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Active Agent Call Monitoring (Live Grid)
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {mockActiveAgents.map((agent) => (
                    <div key={agent.name} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-col justify-between min-h-[140px]">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">{agent.name}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                            agent.status === "On Call"
                              ? "bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]"
                              : agent.status === "Idle"
                              ? "bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0]"
                              : "bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]"
                          }`}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#64748B] truncate">{agent.campaign}</p>
                        {agent.status === "On Call" && (
                          <div className="mt-3 flex justify-between items-center text-[10px] text-white">
                            <span className="font-mono text-[#00C2FF]">{agent.callDuration}</span>
                            <span className="text-[#00E5A0] font-bold">CSAT: {agent.sentiment}%</span>
                          </div>
                        )}
                      </div>

                      {agent.status === "On Call" ? (
                        <button
                          onClick={() => handleListenIn(agent)}
                          className="w-full mt-4 py-2 bg-[#0057D9] hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#0057D9]/15"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Listen Live & Whisper
                        </button>
                      ) : (
                        <div className="text-[9px] text-[#64748B] mt-4 text-center">Agent stands by.</div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Call Recording Repository */}
              <AnimatedSection delay={0.1} className="glass-card-strong p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Disc className="w-4.5 h-4.5 text-[#8B5CF6]" />
                  Call Recording & Transcript Repository
                </h3>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {history.map((log) => {
                    const isPlaying = playingRecordingId === log.id;
                    return (
                      <div key={log.id} className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-2">
                              {log.name}
                              <span className="text-[10px] text-[#64748B] font-mono">({log.company})</span>
                            </h4>
                            <p className="text-[9px] text-[#64748B] mt-0.5">{log.date} • Disposition: <span className="text-[#00E5A0] font-semibold">{log.disposition}</span></p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white bg-white/[0.05] px-2 py-0.5 rounded">{log.duration}</span>
                            <button
                              onClick={() => {
                                startPlayingRecording(log);
                                if (!isPlaying) {
                                  playTone(880, 0.1, 0.05);
                                }
                              }}
                              className={`px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                                isPlaying ? "bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444]" : "bg-[#00E5A0]/20 border border-[#00E5A0]/30 text-[#00E5A0] hover:bg-[#00E5A0]/30"
                              }`}
                            >
                              {isPlaying ? <Pause className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                              {isPlaying ? "Pause Player" : "Listen Recording"}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Waveform Audio Player */}
                        {isPlaying && (
                          <div className="bg-[#0c182c]/80 border border-white/[0.06] p-3 rounded-lg space-y-3">
                            <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                              <span>Opus High-Definition Voice (Simulated Playback)</span>
                              <span className="font-mono text-white">{playerProgress}%</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startPlayingRecording(log)}
                                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white"
                              >
                                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              </button>
                              
                              {/* Audio Waveform visualization */}
                              <div className="flex-1 flex items-end gap-0.5 h-8">
                                {Array.from({ length: 48 }).map((_, i) => {
                                  const isActive = i * 2 <= playerProgress;
                                  const height = Math.sin(i * 0.4 + playerProgress * 0.1) * 12 + 16;
                                  return (
                                    <div
                                      key={i}
                                      className={`flex-1 rounded-sm transition-all duration-300 ${
                                        isActive ? "bg-gradient-to-t from-[#0057D9] to-[#00C2FF]" : "bg-white/[0.06]"
                                      }`}
                                      style={{ height: `${height}px` }}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Playback Progress Slider */}
                            <div className="relative w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                              <div className="absolute h-full bg-[#00C2FF]" style={{ width: `${playerProgress}%` }} />
                            </div>

                            {/* Call Transcript review */}
                            {log.transcript.length > 0 && (
                              <div className="border-t border-white/[0.04] pt-3.5 space-y-2">
                                <span className="text-[8px] uppercase font-bold text-[#64748B] block mb-1">Archived Call Transcript:</span>
                                <div className="space-y-2.5 max-h-[120px] overflow-y-auto pr-1">
                                  {log.transcript.map((t, idx) => (
                                    <div key={idx} className="text-[10px] leading-relaxed">
                                      <span className={`font-bold ${t.speaker === "Agent" ? "text-[#00C2FF]" : "text-[#00E5A0]"}`}>{t.speaker}: </span>
                                      <span className="text-[#94A3B8] font-semibold">{t.text}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>

            </div>

            {/* Right Block: Live Monitoring & Analytics Reports */}
            <div className="space-y-6">
              
              {/* Silent Monitor Console */}
              {monitoredAgent ? (
                <AnimatedSection className="glass-card-strong p-6 border-[#00C2FF]/30 shadow-xl shadow-[#00C2FF]/5 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00C2FF]/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-4 border-b border-white/[0.06] pb-3">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#00C2FF] tracking-wider block">Silent Monitor Feed</span>
                      <h3 className="text-sm font-bold text-white mt-1">Monitoring: {monitoredAgent.name}</h3>
                    </div>
                    <button
                      onClick={() => setMonitoredAgent(null)}
                      className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[#64748B] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-white">
                      <span>Customer: {monitoredAgent.customer}</span>
                      <span>Sentiment: <span className="text-[#00E5A0]">{monitoredAgent.sentiment}%</span></span>
                    </div>

                    {/* Live Scrolling Monitor Transcript */}
                    <div className="h-[140px] overflow-y-auto bg-black/30 border border-white/[0.04] p-3 rounded-lg space-y-2.5 text-[10px]">
                      {monitoredAgent.transcript.map((t, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <span className={`font-bold ${t.speaker === "Agent" ? "text-[#00C2FF]" : "text-[#00E5A0]"}`}>{t.speaker}: </span>
                          <span className="text-[#94A3B8] font-semibold">{t.text}</span>
                        </div>
                      ))}
                      {activeWhispers.map((w, idx) => (
                        <div key={idx} className="leading-relaxed bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-1.5 rounded mt-1 flex items-start gap-1">
                          <span className="font-bold text-[#A78BFA] flex-shrink-0">Admin Whisper:</span>
                          <span className="text-[#A78BFA] font-semibold italic">{w}</span>
                        </div>
                      ))}
                    </div>

                    {/* Admin Whisper input */}
                    <form onSubmit={sendWhisper} className="space-y-2 border-t border-white/[0.04] pt-3">
                      <label className="text-[9px] font-bold uppercase text-[#64748B] block">Agent Coaching (Whisper Note)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={adminWhisper}
                          onChange={(e) => setAdminWhisper(e.target.value)}
                          placeholder="Type whisper advice directly to agent's AI feed..."
                          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-xs text-white placeholder-[#475569]"
                        />
                        <button type="submit" className="p-2 bg-[#8B5CF6] hover:bg-purple-600 rounded-lg text-white">
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => {
                          setAdminBargeIn(!adminBargeIn);
                          playTone(adminBargeIn ? 440 : 660, 0.15);
                        }}
                        className={`py-2 text-[10px] font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                          adminBargeIn ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]" : "bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        {adminBargeIn ? "Disconnect Barge" : "Barge-In Call"}
                      </button>
                      
                      <button
                        onClick={() => {
                          playTone(400, 0.1);
                          alert("Supervisor intervention flagged. Campaign routing updated.");
                        }}
                        className="py-2 text-[10px] font-bold bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] rounded-lg transition-all"
                      >
                        Flag Intervention
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ) : (
                <div className="p-6 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center text-xs text-[#64748B]">
                  Click <b>Listen Live</b> on an active call to monitor live conversations, perform whispers, or barge-in.
                </div>
              )}

              {/* performance report */}
              <AnimatedSection delay={0.1} className="glass-card-strong p-6 space-y-4">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <BarChart3 className="w-4.5 h-4.5 text-[#00E5A0]" />
                  Dialer Performance Reports
                </h3>

                {/* SVG Performance Chart */}
                <div className="bg-black/30 border border-white/[0.04] p-3 rounded-lg">
                  <span className="text-[9px] uppercase font-bold text-[#64748B] block mb-2">Outbound Campaign Traffic (24h)</span>
                  <svg viewBox="0 0 300 100" className="w-full h-[100px] overflow-visible">
                    <defs>
                      <linearGradient id="adminChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* SVG grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    
                    {/* Area Graph */}
                    <path
                      d="M 0 90 L 30 75 Q 60 40 90 60 T 150 25 T 210 50 T 270 20 L 300 45 L 300 90 Z"
                      fill="url(#adminChartGrad)"
                    />
                    {/* Line path */}
                    <path
                      d="M 0 90 L 30 75 Q 60 40 90 60 T 150 25 T 210 50 T 270 20 L 300 45"
                      fill="none"
                      stroke="#00C2FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Data Points */}
                    <circle cx="90" cy="60" r="3" fill="#00C2FF" />
                    <circle cx="150" cy="25" r="3" fill="#00E5A0" />
                    <circle cx="270" cy="20" r="3" fill="#00C2FF" />
                  </svg>
                  <div className="flex justify-between items-center text-[8px] text-[#64748B] font-mono mt-2 uppercase">
                    <span>08:00 AM</span>
                    <span>12:00 PM</span>
                    <span>04:00 PM</span>
                    <span>08:00 PM</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#CBD5E1] font-semibold">Total Campaigns Active:</span>
                    <span className="font-bold text-white">4 Campaigns</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#CBD5E1] font-semibold">Dialer Mode:</span>
                    <span className="font-bold text-[#00C2FF]">Predictive Algorithm</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#CBD5E1] font-semibold">Avg Connection Rate:</span>
                    <span className="font-bold text-[#00E5A0]">86.4%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#CBD5E1] font-semibold">Dropped Call Rate:</span>
                    <span className="font-bold text-white">1.8%</span>
                  </div>
                </div>
              </AnimatedSection>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
