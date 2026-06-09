"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Mail, Phone, MessageSquare, Calendar, Send, ShieldAlert, CheckCircle, ArrowRight, Building, MapPin } from "lucide-react";

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<"message" | "demo">("message");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    interest: "AI Contact Center",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        interest: "AI Contact Center",
      });
    }, 4000);
  };

  // Mock Calendar Dates
  const calendarDates = [
    { day: "Wed", date: "10", slots: ["2:00 PM", "3:30 PM", "5:00 PM"] },
    { day: "Thu", date: "11", slots: ["10:00 AM", "11:30 AM", "4:00 PM"] },
    { day: "Fri", date: "12", slots: ["1:00 PM", "2:30 PM", "4:30 PM"] },
  ];
  const [selectedDate, setSelectedDate] = useState("10");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [demoBooked, setDemoBooked] = useState(false);

  return (
    <section className="relative section-padding overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[#081120]" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00E5A0]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <AnimatedSection>
              <p className="text-sm font-semibold text-[#00C2FF] uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Let&apos;s Build the Future of <span className="gradient-text">Customer Relations</span>
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed mt-4">
                Have questions about our multi-tenant SaaS capabilities, Voice AI integrations, or custom VoIP pricing? Connect with our global solutions architecture team today.
              </p>
            </AnimatedSection>

            {/* Quick Contact Items - Asymmetric grid layout with premium glows & visual borders */}
            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              <AnimatedSection delay={0.1} className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex gap-4 items-start overflow-hidden group hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 hover:shadow-[0_4px_25px_rgba(0,194,255,0.06)] transition-all duration-300">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#00C2FF]" />
                <div className="w-11 h-11 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] flex-shrink-0 transition-transform group-hover:scale-105">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Enterprise Sales</p>
                  <a href="mailto:prithviraj.singh@dbsmintek.in" className="text-sm font-extrabold text-white hover:text-[#00C2FF] transition-colors mt-1 block">
                    prithviraj.singh@dbsmintek.in
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex gap-4 items-start overflow-hidden group hover:border-[#00E5A0]/30 hover:bg-[#00E5A0]/5 hover:shadow-[0_4px_25px_rgba(0,229,160,0.06)] transition-all duration-300">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#00E5A0]" />
                <div className="w-11 h-11 rounded-lg bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center text-[#00E5A0] flex-shrink-0 transition-transform group-hover:scale-105">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Global Hotline</p>
                  <a href="tel:+918308211113" className="text-sm font-extrabold text-white hover:text-[#00E5A0] transition-colors mt-1 block">
                    +91 83082 11113
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3} className="sm:col-span-2 relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex gap-4 items-center justify-between overflow-hidden group hover:border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/5 hover:shadow-[0_4px_25px_rgba(139,92,246,0.06)] transition-all duration-300">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#8B5CF6]" />
                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] flex-shrink-0 transition-transform group-hover:scale-105">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                      WhatsApp Business Support
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
                      </span>
                    </p>
                    <a href="https://wa.me/918308211113" target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold text-[#00E5A0] hover:underline mt-1 block">
                      Chat with an AI Advisor
                    </a>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#8B5CF6] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </AnimatedSection>
            </div>

            {/* Corporate Headquarters Card */}
            <div className="space-y-3 pt-6 border-t border-white/[0.06] relative z-10">
              <h4 className="text-[10px] uppercase font-bold text-[#64748B] tracking-widest ml-1">
                Corporate Headquarters Node
              </h4>
              <div className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex gap-4 items-start overflow-hidden group hover:border-[#00C2FF]/20 transition-all duration-300 shadow-md">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00E5A0] to-[#00C2FF]" />
                <div className="absolute right-4 top-4 px-2 py-0.5 rounded bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[8px] font-bold text-[#00E5A0] uppercase tracking-widest">
                  HQ Cluster
                </div>
                <div className="w-11 h-11 rounded-lg bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center text-[#00E5A0] flex-shrink-0">
                  <Building className="w-5 h-5 text-[#00E5A0]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-[#CBD5E1] tracking-wider">DBS MINTEK PVT. LTD</span>
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
                    Arihant Aura, B-Tower, 6th Floor, Thane-Belapur Road, opposite Turbhe Railway Station, Turbhe MIDC, Navi Mumbai, Maharashtra 400705
                  </p>
                </div>
              </div>
            </div>

            <AnimatedSection delay={0.4} className="p-4 rounded-xl bg-white/[0.02] border border-[#EF4444]/20 text-xs text-[#94A3B8] flex gap-3 items-start">
              <ShieldAlert className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
              <span>We value data security. All contact submissions are processed over highly encrypted TLS channels and comply strictly with SOC2/GDPR guidelines.</span>
            </AnimatedSection>
          </div>

          {/* Right Column - Interactive Form Panel */}
          <AnimatedSection delay={0.2} className="glass-card-strong p-8 relative overflow-hidden shadow-2xl">
            {/* Form Mode Selector Tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-8">
              <button
                onClick={() => setActiveTab("message")}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "message"
                    ? "bg-[#0057D9] text-white border border-[#0057D9]/50 shadow-[0_0_10px_rgba(0,87,217,0.3)]"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                <Send className="w-4 h-4" />
                Quick Message
              </button>
              <button
                onClick={() => setActiveTab("demo")}
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "demo"
                    ? "bg-[#0057D9] text-white border border-[#0057D9]/50 shadow-[0_0_10px_rgba(0,87,217,0.3)]"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Schedule Demo
              </button>
            </div>

            {/* TAB CONTENT */}
            <AnimatePresence mode="wait">
              {activeTab === "message" ? (
                <motion.div
                  key="message-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {formSubmitted ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center mx-auto text-[#00E5A0]">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Message Received Successfully</h3>
                      <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                        Thank you for reaching out. A solutions architect will contact you within 15 minutes.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">Work Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">Company Name</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Acme Corp"
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#94A3B8]">Product/Service of Interest</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-[#94A3B8] transition-all"
                        >
                          <option value="AI Contact Center" className="bg-[#0f172a] text-white">AI Contact Center & Copilots</option>
                          <option value="CRM Dialer" className="bg-[#0f172a] text-white">CRM & Predictive Dialer Platform</option>
                          <option value="Omnichannel CX" className="bg-[#0f172a] text-white">Omnichannel Digital CX</option>
                          <option value="Managed Team" className="bg-[#0f172a] text-white">Managed Outsourcing & Support Team</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#94A3B8]">Message / Requirements</label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your team size, expected call volumes, and platform requirements..."
                          className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all resize-none"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 group">
                        Send Message
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="demo-booking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {demoBooked ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center mx-auto text-[#00E5A0]">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Consultation Booked</h3>
                      <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                        Your live demo is scheduled for June {selectedDate}th at {selectedSlot}. Calendar invite sent.
                      </p>
                      <button onClick={() => setDemoBooked(false)} className="btn-secondary text-xs !py-2 !px-4 mt-2">
                        Book Another Time
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Select Date (June 2026)</h4>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                          {calendarDates.map((d) => (
                            <button
                              key={d.date}
                              onClick={() => {
                                setSelectedDate(d.date);
                                setSelectedSlot("");
                              }}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                selectedDate === d.date
                                  ? "bg-[#0057D9]/20 border-[#0057D9] text-white"
                                  : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/[0.12]"
                              }`}
                            >
                              <p className="text-[10px] uppercase font-semibold text-[#64748B]">{d.day}</p>
                              <p className="text-lg font-bold mt-1">{d.date}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Select Available Time Slot</h4>
                        <div className="grid grid-cols-3 gap-2.5 mt-3">
                          {calendarDates
                            .find((d) => d.date === selectedDate)
                            ?.slots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
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

                      <div className="pt-4 border-t border-white/[0.06] space-y-4">
                        <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                          <span>Duration:</span>
                          <span className="font-bold text-white">30 Min Consultation</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                          <span>Platform:</span>
                          <span className="font-bold text-white">Google Meet / Teams</span>
                        </div>

                        <button
                          disabled={!selectedSlot}
                          onClick={() => setDemoBooked(true)}
                          className={`w-full py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            selectedSlot
                              ? "bg-gradient-to-r from-[#0057D9] to-[#00C2FF] text-white hover:shadow-lg hover:shadow-[#00C2FF]/20"
                              : "bg-white/[0.04] border border-white/[0.08] text-[#475569] cursor-not-allowed"
                          }`}
                        >
                          Confirm & Book Demonstration
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
