"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Phone, PhoneOff, Mic, MicOff, Volume2, Plus, VolumeX, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

export default function DialerDashboard() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState<"Idle" | "Calling" | "Connected" | "Ended">("Idle");
  const [callSeconds, setCallSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === "Connected") {
      timer = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  // AI Script Suggestion simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === "Connected") {
      const suggestions = [
        "Greeting: Hello, thank you for reaching out to DBS Mintek customer support. How can I help you?",
        "AI Assist: Customer mentioned billing queries. Recommend moving to Stripe subscription overview.",
        "Compliance: Ensure the caller confirms the final 4 digits of the card before updating account details."
      ];
      timer = setTimeout(() => {
        setAiSuggestions(suggestions);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [callStatus]);

  const handleKeyPress = (num: string) => {
    if (callStatus === "Idle") {
      setPhoneNumber((prev) => prev + num);
    }
  };

  const handleClear = () => {
    if (callStatus === "Idle") {
      setPhoneNumber("");
    }
  };

  const handleBackspace = () => {
    if (callStatus === "Idle") {
      setPhoneNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleCallAction = () => {
    if (callStatus === "Idle") {
      if (!phoneNumber) return;
      setCallSeconds(0);
      setAiSuggestions([]);
      setCallStatus("Calling");
      setTimeout(() => {
        setCallStatus("Connected");
      }, 2000);
    } else if (callStatus === "Calling" || callStatus === "Connected") {
      setCallStatus("Ended");
      setTimeout(() => {
        setCallStatus("Idle");
        setPhoneNumber("");
        setCallSeconds(0);
        setAiSuggestions([]);
      }, 1500);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0057D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest">WebRTC softphone dialer</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">VoIP Browser Dialer</h1>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1.1fr,1.5fr] gap-12 items-start">
          
          {/* Softphone Panel */}
          <AnimatedSection className="glass-card-strong p-8 relative overflow-hidden max-w-sm mx-auto w-full">
            {/* Screen */}
            <div className="bg-[#0c182c]/80 border border-white/[0.06] p-6 rounded-xl text-center space-y-2 mb-6">
              <span className="text-[10px] uppercase font-bold text-[#64748B]">
                {callStatus === "Idle" ? "SIP Registered" : callStatus}
              </span>
              
              <div className="text-lg font-bold text-white min-h-[28px] overflow-hidden truncate">
                {phoneNumber || "Enter number..."}
              </div>

              {callStatus === "Connected" && (
                <div className="text-xs text-[#00E5A0] font-mono tracking-wider font-semibold">
                  {formatTime(callSeconds)}
                </div>
              )}
            </div>

            {/* Dialpad */}
            {callStatus === "Idle" && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num)}
                    className="py-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm font-bold text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                  >
                    {num}
                  </button>
                ))}
                
                <button
                  onClick={handleClear}
                  className="py-2 text-[10px] font-bold text-[#64748B] hover:text-white"
                >
                  Clear
                </button>
                <div />
                <button
                  onClick={handleBackspace}
                  className="py-2 text-[10px] font-bold text-[#64748B] hover:text-white"
                >
                  Delete
                </button>
              </div>
            )}

            {/* In-Call Controls */}
            {callStatus === "Connected" && (
              <div className="flex justify-center gap-6 mb-6">
                <button
                  onClick={() => setMuted(!muted)}
                  className={`p-4 rounded-full border transition-all ${
                    muted
                      ? "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
                      : "bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <div className="p-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-white">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>
            )}

            {/* Call Action Button */}
            <button
              onClick={handleCallAction}
              disabled={!phoneNumber && callStatus === "Idle"}
              className={`w-full py-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                callStatus === "Idle"
                  ? phoneNumber
                    ? "bg-[#22C55E] text-white hover:shadow-lg hover:shadow-[#22C55E]/20"
                    : "bg-white/[0.04] border border-white/[0.08] text-[#475569] cursor-not-allowed"
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
          </AnimatedSection>

          {/* AI Copilot Suggestion Box */}
          <AnimatedSection delay={0.1} className="glass-card p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#00C2FF] animate-pulse" />
                  AI Agent Copilot (Real-Time Scripting)
                </h3>
                <span className="text-[9px] uppercase font-bold text-[#00E5A0] px-2 py-0.5 rounded bg-[#00E5A0]/10 border border-[#00E5A0]/20">
                  Active Listen
                </span>
              </div>

              <div className="space-y-4">
                {aiSuggestions.length > 0 ? (
                  aiSuggestions.map((suggestion, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 text-[#00C2FF] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">{suggestion}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-16 text-[#64748B] text-xs">
                    Initiate a VoIP call to begin real-time transcription, translation, and AI agent prompt scripting.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#64748B]">
              <span>Latency: 120ms</span>
              <span>RAG Accuracy: 99.2%</span>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
