"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Calendar, Send, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<"message" | "demo">("message");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    interest: "Excel Dashboards & Power BI",
    volume: "Under 100k Rows",
    source: "Excel / CSV Files",
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
        interest: "Excel Dashboards & Power BI",
        volume: "Under 100k Rows",
        source: "Excel / CSV Files",
      });
    }, 4000);
  };

  // Dynamic next 3 business days
  const [dates, setDates] = useState<{ day: string; date: string; slots: string[] }[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [demoStep, setDemoStep] = useState<1 | 2>(1);
  const [demoBooked, setDemoBooked] = useState(false);

  useEffect(() => {
    const getNext3BusinessDays = () => {
      const result = [];
      let currentDate = new Date();
      while (result.length < 3) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          result.push({
            day: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
            date: currentDate.getDate().toString(),
            slots: ["10:00 AM", "1:30 PM", "4:00 PM"]
          });
        }
      }
      return result;
    };
    const nextDays = getNext3BusinessDays();
    setDates(nextDays);
    if (nextDays.length > 0) {
      setSelectedDate(nextDays[0].date);
    }
  }, []);

  return (
    <section className="relative pt-20 lg:pt-32 pb-20 lg:pb-32 overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[#081120]" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0057D9]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00E5A0]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <AnimatedSection>
              <p className="text-sm font-semibold text-[#00C2FF] uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Are your spreadsheets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00E5A0]">slowing you down?</span>
              </h2>
              <p className="text-[#94A3B8] text-lg leading-relaxed mt-6 max-w-lg">
                Let us build an automated data solution that works for you. Fill out the form, or reach out directly to chat with our team.
              </p>
            </AnimatedSection>
          </div>

          {/* Right Column - Interactive Form Panel */}
          <div className="space-y-6">
            <AnimatedSection delay={0.2} className="glass-card-strong p-6 sm:p-8 relative overflow-hidden shadow-2xl rounded-[2rem] border border-white/[0.08]">
              {/* Form Mode Selector Tabs */}
              <div className="flex gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-8">
                <button
                  onClick={() => setActiveTab("message")}
                  className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "message"
                      ? "bg-[#0057D9] text-white border border-[#0057D9]/50 shadow-[0_0_15px_rgba(0,87,217,0.4)]"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Quick Message
                </button>
                <button
                  onClick={() => setActiveTab("demo")}
                  className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "demo"
                      ? "bg-[#0057D9] text-white border border-[#0057D9]/50 shadow-[0_0_15px_rgba(0,87,217,0.4)]"
                      : "text-[#94A3B8] hover:text-white"
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
                        <h3 className="text-xl font-bold text-white">Message Received</h3>
                        <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                          Thank you for reaching out! A member of our team will contact you shortly to help.
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
                            <label className="text-xs font-semibold text-[#94A3B8]">Email ID</label>
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
                            <label className="text-xs font-semibold text-[#94A3B8]">Business Name</label>
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
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#94A3B8]">Primary Interest</label>
                            <div className="relative">
                              <select
                                name="interest"
                                aria-label="Select your interest"
                                value={formData.interest}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:bg-[#081120] focus:outline-none text-sm text-white appearance-none transition-all cursor-pointer"
                              >
                                <option value="Excel Dashboards & Power BI" className="bg-[#0f172a] text-white">Excel Dashboards & Power BI</option>
                                <option value="VBA & Workflow Automation" className="bg-[#0f172a] text-white">VBA & Workflow Automation</option>
                                <option value="Data Cleaning & Processing" className="bg-[#0f172a] text-white">Data Cleaning & Processing</option>
                                <option value="MS Access to Web Migration" className="bg-[#0f172a] text-white">MS Access to Web Migration</option>
                                <option value="SQL Database Architecture" className="bg-[#0f172a] text-white">SQL Database Architecture</option>
                                <option value="Google Sheets Automation" className="bg-[#0f172a] text-white">Google Sheets Automation</option>
                                <option value="API Integrations & Syncing" className="bg-[#0f172a] text-white">API Integrations & Syncing</option>
                                <option value="Financial Modeling" className="bg-[#0f172a] text-white">Financial Modeling</option>
                                <option value="Custom Software Development" className="bg-[#0f172a] text-white">Custom Software Development</option>
                                <option value="Other" className="bg-[#0f172a] text-white">Other</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#94A3B8]">Data Volume</label>
                            <div className="relative">
                              <select
                                name="volume"
                                aria-label="Select data volume"
                                value={formData.volume}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:bg-[#081120] focus:outline-none text-sm text-white appearance-none transition-all cursor-pointer"
                              >
                                <option value="Under 100k Rows" className="bg-[#0f172a] text-white">Under 100k Rows</option>
                                <option value="100k - 1 Million Rows" className="bg-[#0f172a] text-white">100k - 1 Million Rows</option>
                                <option value="1 Million - 10 Million Rows" className="bg-[#0f172a] text-white">1 Million - 10 Million Rows</option>
                                <option value="10 Million+ Rows" className="bg-[#0f172a] text-white">10 Million+ Rows</option>
                                <option value="Not Sure" className="bg-[#0f172a] text-white">Not Sure</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">Primary Data Source</label>
                          <div className="relative">
                            <select
                              name="source"
                              aria-label="Select data source"
                              value={formData.source}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:bg-[#081120] focus:outline-none text-sm text-white appearance-none transition-all cursor-pointer"
                            >
                              <option value="Excel / CSV Files" className="bg-[#0f172a] text-white">Excel / CSV Files</option>
                              <option value="ERP / CRM Export" className="bg-[#0f172a] text-white">ERP / CRM Export</option>
                              <option value="SQL Database" className="bg-[#0f172a] text-white">SQL Database</option>
                              <option value="Web Scraping" className="bg-[#0f172a] text-white">Web Scraping</option>
                              <option value="Other" className="bg-[#0f172a] text-white">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#94A3B8]">How can we help your business?</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Tell us about your team, current workflow, and what you are looking to solve..."
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] resize-none transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-lg bg-[#0057D9] hover:bg-[#0057D9]/90 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_15px_rgba(0,87,217,0.4)]"
                        >
                          Send Message
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="demo-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {demoBooked ? (
                      <div className="py-16 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 flex items-center justify-center mx-auto text-[#00E5A0]">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Demonstration Scheduled</h3>
                        <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                          Your live data consultation is booked for the {selectedDate}th at {selectedSlot}. A calendar invite has been sent to {formData.email || 'your email'}.
                        </p>
                      </div>
                    ) : demoStep === 1 ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Select Date</h3>
                          <p className="text-xs text-[#94A3B8] mb-4">Pick a convenient day for your 30-min consultation.</p>
                          
                          <div className="grid grid-cols-3 gap-3">
                            {dates.map((d) => (
                              <button
                                key={d.date}
                                onClick={() => {
                                  setSelectedDate(d.date);
                                  setSelectedSlot("");
                                  setCustomDate("");
                                }}
                                className={`p-3 rounded-xl border text-center transition-all ${
                                  selectedDate === d.date && !customDate
                                    ? "bg-[#0057D9]/20 border-[#0057D9] shadow-[0_0_15px_rgba(0,87,217,0.2)]"
                                    : "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]"
                                }`}
                              >
                                <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${selectedDate === d.date && !customDate ? "text-[#00C2FF]" : "text-[#94A3B8]"}`}>
                                  {d.day}
                                </span>
                                <span className="block text-2xl font-black text-white">{d.date}</span>
                              </button>
                            ))}
                          </div>

                          <div className="mt-5">
                            <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-3">
                              <span className="flex-1 h-[1px] bg-white/[0.06]"></span>
                              Or choose from calendar
                              <span className="flex-1 h-[1px] bg-white/[0.06]"></span>
                            </h4>
                            <div className="relative">
                              <input 
                                type="date"
                                aria-label="Pick a custom date"
                                style={{ colorScheme: "dark" }}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => {
                                  setCustomDate(e.target.value);
                                  setSelectedDate(e.target.value);
                                  setSelectedSlot("");
                                }}
                                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#00C2FF] transition-all cursor-pointer text-sm accent-[#00C2FF] [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 ${
                                  customDate && selectedDate === customDate
                                    ? "bg-[#0057D9]/20 border-[#0057D9] text-white"
                                    : "bg-[#081120] border-white/[0.08] text-[#94A3B8] hover:border-white/[0.12]"
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">Select Available Time Slot</h3>
                          <div className="grid grid-cols-3 gap-2.5 mt-3">
                            {(
                              dates.find((d) => d.date === selectedDate)?.slots || 
                              ["10:00 AM", "1:30 PM", "4:00 PM"]
                            ).map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-2.5 rounded-lg border text-sm font-bold transition-all ${
                                  selectedSlot === slot
                                    ? "bg-[#00E5A0]/20 border-[#00E5A0] text-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.2)]"
                                    : "bg-white/[0.02] border-white/[0.05] text-[#94A3B8] hover:bg-white/[0.06] hover:text-white"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          disabled={!selectedSlot}
                          onClick={() => setDemoStep(2)}
                          className={`w-full py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            selectedSlot
                              ? "bg-gradient-to-r from-[#0057D9] to-[#00C2FF] text-white hover:shadow-lg hover:shadow-[#00C2FF]/20"
                              : "bg-white/[0.04] border border-white/[0.08] text-[#475569] cursor-not-allowed"
                          }`}
                        >
                          Continue to Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/[0.06]">
                          <button onClick={() => setDemoStep(1)} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] flex items-center justify-center text-white transition-all shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                          </button>
                          <div>
                            <h3 className="text-sm font-bold text-white">Your Details</h3>
                            <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold mt-0.5">Booking: {selectedDate}th at {selectedSlot}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all" placeholder="John Doe" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#94A3B8]">Email ID</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all" placeholder="john@company.com" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#94A3B8]">Company</label>
                            <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] focus:border-[#00C2FF] focus:outline-none text-sm text-white placeholder-[#475569] transition-all" placeholder="Acme Corp" />
                          </div>
                          <button
                            onClick={() => {
                              if(formData.name && formData.email) {
                                setDemoBooked(true);
                                setTimeout(() => {
                                  setDemoBooked(false);
                                  setDemoStep(1);
                                  setFormData(prev => ({...prev, name: "", email: "", company: ""}));
                                  setSelectedSlot("");
                                }, 4000);
                              }
                            }}
                            className={`w-full py-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all mt-4 ${
                              formData.name && formData.email
                                ? "bg-gradient-to-r from-[#00E5A0] to-[#00C2FF] text-white hover:shadow-lg hover:shadow-[#00E5A0]/20"
                                : "bg-white/[0.04] border border-white/[0.08] text-[#475569] cursor-not-allowed"
                            }`}
                          >
                            Confirm & Book Demonstration
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="p-4 rounded-xl bg-white/[0.02] border border-[#00E5A0]/20 text-xs text-[#94A3B8] flex gap-3 items-center">
              <ShieldCheck className="w-5 h-5 text-[#00E5A0] flex-shrink-0" />
              <span>We value your privacy. Your information is processed over encrypted channels and stored securely. We will never sell or share your contact data.</span>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </section>
  );
}
