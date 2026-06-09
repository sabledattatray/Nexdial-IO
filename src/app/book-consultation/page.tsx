"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Calendar, Clock, Globe, ArrowRight, CheckCircle, Info } from "lucide-react";

export default function BookConsultationPage() {
  const [selectedDate, setSelectedDate] = useState("10");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booked, setBooked] = useState(false);
  const [email, setEmail] = useState("");

  const calendarDates = [
    { day: "Mon", date: "15", slots: ["9:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"] },
    { day: "Tue", date: "16", slots: ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"] },
    { day: "Wed", date: "17", slots: ["9:30 AM", "11:00 AM", "3:00 PM", "5:00 PM"] },
    { day: "Thu", date: "18", slots: ["10:00 AM", "2:00 PM", "3:30 PM", "4:00 PM"] },
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#00C2FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Solutions Architecture Desk
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-6">
            Book a 1-on-1 <span className="gradient-text">Design Consultation</span>
          </h1>
          <p className="text-[#94A3B8] text-sm mt-3">
            Schedule a session with an enterprise systems architect to draft compliance configurations, VoIP trunk maps, and custom call center flows.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="glass-card-strong p-8 relative overflow-hidden max-w-2xl mx-auto">
          {booked ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center mx-auto text-[#00E5A0] animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Consultation Confirmed</h2>
              <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                We have locked in June {selectedDate}th at {selectedSlot}. A calendar invite and Google Meet link have been dispatched to <span className="text-[#00C2FF] font-semibold">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-6">
              
              {/* Calendar Date picker */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Select Date (June 2026)
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {calendarDates.map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.date);
                        setSelectedSlot("");
                      }}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        selectedDate === d.date
                          ? "bg-[#0057D9]/20 border-[#0057D9] text-white"
                          : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/[0.12]"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold text-[#64748B] block">{d.day}</span>
                      <span className="text-xl font-bold mt-1 block">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-[#00C2FF]" />
                  Select Available Time Slot
                </h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {calendarDates
                    .find((d) => d.date === selectedDate)
                    ?.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          selectedSlot === slot
                            ? "bg-[#00E5A0]/20 border-[#00E5A0] text-[#00E5A0]"
                            : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/[0.12]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                </div>
              </div>

              {/* Input for Email */}
              <div className="space-y-1.5 pt-4 border-t border-white/[0.06]">
                <label className="text-xs font-semibold text-[#94A3B8]">Work Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                />
              </div>

              {/* Information disclaimer */}
              <div className="flex gap-2.5 p-3 rounded-lg bg-[#00E5A0]/5 border border-[#00E5A0]/10 text-xs text-[#00E5A0] font-semibold">
                <Globe className="w-4.5 h-4.5" />
                Timezones automatically align to your browser locale.
              </div>

              <button
                type="submit"
                disabled={!selectedSlot || !email}
                className={`w-full py-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedSlot && email
                    ? "bg-gradient-to-r from-[#0057D9] to-[#00C2FF] text-white hover:shadow-lg hover:shadow-[#00C2FF]/20"
                    : "bg-white/[0.04] border border-white/[0.08] text-[#475569] cursor-not-allowed"
                }`}
              >
                Confirm Solutions Architecture Call
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
