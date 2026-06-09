import React from 'react';
import { useState, useEffect, InputHTMLAttributes } from 'react';
import { 
  Phone, Bot, BarChart3, Users, Globe, Layers, ArrowRight, Shield, Zap, Sparkles, 
  HelpCircle, Check, Search, MapPin, Briefcase, FileText, Activity, AlertTriangle, 
  Mail, MessageSquare, Code, Terminal, Clock, Heart, Award, CheckCircle2, ChevronRight,
  Menu, X, Sun, Moon
} from 'lucide-react';
import { Contact as CRMContact } from '../types';

interface PublicPagesProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  contacts: CRMContact[];
  currentSection: 'public' | 'applet';
  setCurrentSection: (section: 'public' | 'applet') => void;
  theme: string;
  setTheme: (theme: string) => void;
  isAuthenticated: boolean;
  currentAgentEmail?: string;
}

export default function PublicPages({ 
  currentTab, 
  setTab, 
  onLoginClick, 
  onSignupClick,
  contacts,
  currentSection,
  setCurrentSection,
  theme,
  setTheme,
  isAuthenticated,
  currentAgentEmail
}: PublicPagesProps) {
  
  // Custom states inside public pages
  const [roiAgents, setRoiAgents] = useState(25);
  const [roiCallMinutes, setRoiCallMinutes] = useState(400);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [monthlyCostSaved, setMonthlyCostSaved] = useState(0);
  
  // Blog states
  const [blogSearch, setBlogSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Job Application modal states
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [appForm, setAppForm] = useState({ name: '', email: '', portfolio: '', resumeText: '' });
  const [appSuccess, setAppSuccess] = useState(false);

  // FAQ expanded states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Status page simulated states
  const [statusIncidents, setStatusIncidents] = useState([
    { service: 'SIP Routing US-EAST-1', status: 'Operational', uptime: '99.99%', history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { service: 'AI Whisper Transcriber', status: 'Operational', uptime: '99.95%', history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { service: 'Customer API Gateway', status: 'Operational', uptime: '100.00%', history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { service: 'Stripe Callback Hook Worker', status: 'Operational', uptime: '99.98%', history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { service: 'WebRTC Browser Phone Proxy', status: 'Operational', uptime: '99.91%', history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
  ]);

  // Pricing toggle (monthly / yearly)
  const [isYearly, setIsYearly] = useState(false);

  // ROI Calculator core logic
  useEffect(() => {
    // Estimating savings: Manual call duration is cut by 45% using power dialers & AI summaries. On average call rate, saved time value is ~$18 per hour.
    const weeklyCallHours = (roiAgents * (roiCallMinutes / 60)) * 5; 
    const hoursSaved = weeklyCallHours * 0.45;
    const dollarsSaved = Math.round(hoursSaved * 4 * 22.50); // $22.50 hourly agent average blended rate
    setMonthlyCostSaved(dollarsSaved);
  }, [roiAgents, roiCallMinutes]);

  const blogPosts = [
    {
      id: 1,
      title: 'How Generative AI is Slashing Telephony Costs by 65% in 2026',
      excerpt: 'Traditional call centers are bleeding cash on idle agents, inaccurate call tagging, and manual follow-ups. See how modern LLMs are reshaping outbound workflows.',
      author: 'Dattatray Sable',
      date: 'May 20, 2026',
      readTime: '6 min read',
      category: 'AI Telephony',
      content: `The call center landscape in 2026 has crossed a digital chasm. AI is no longer just a passive Interactive Voice Response menu asking customers to repeat their input. Modern AI Voice Agents can interpret human sentiment instantly, execute API routines live during high-priority routing, and auto-populate complex CRM files on call wrap. 
      \nBy adopting AI Dialers, BPOs reduce idle wrap-up times by over 80%. Instead of spending five minutes writing call sheets, custom-tuned LLMs summarize the dial block instantly, flag objection trends, and post webhook payloads to systems like Salesforce and HubSpot within milliseconds.
      \nThis translates to direct bottom-line improvements:
      - 5x increase in contact rates via predictive dialing
      - Near-zero wrap overhead
      - Continuous coaching feedback for human reps during critical negotiations.`
    },
    {
      id: 2,
      title: 'Mastering Outbound Campaign Compliance: SEC, TCPA & Global Rules',
      excerpt: 'Avoid bankrupting structural fines. Learn how NexDials automated local-presence rotation and timezone-fenced scheduler maintains 100% dial compliance.',
      author: 'Sarah Smith',
      date: 'May 14, 2026',
      readTime: '9 min read',
      category: 'Compliance',
      content: `Operating high-volume outbound dialers carries heavy responsibility. Global telecommunication authorities specify rigid timezone limits, spam label restrictions, and drop-rate thresholds. Failing to observe TCPA limits can result in massive litigation expenses.
      \nNexDial.io incorporates automated safety valves:
      - Timezone Gating: The system parses contacts coordinates or area codes automatically, blocking calls outside certified regional hours.
      - Consent Verification: Built-in DNC (Do Not Call) list screening.
      - Dropped Call Limits: Automatic adjustment of dialing ratios to ensure dropped calls never exceed regulatory 3.0% quotas.`
    },
    {
      id: 3,
      title: 'The Guide to Connecting Twilio & Plivo to Your WebApp via SIP.js',
      excerpt: 'A complete developer overview of triggering low-latency browser-based VoIP bridges with standard WebRTC secure tunnels.',
      author: 'John Doe',
      date: 'May 08, 2026',
      readTime: '12 min read',
      category: 'Developers',
      content: `Building WebRTC voice capabilities directly within custom SAAS dashboards is historically notoriously complex. Developers grapple with STUN/TURN setups, SDP negotiation delays, Web Audio context security flags, and audio channel clipping.
      \nNexDial completely abstracts this stack by exposing unified SIP trunk connections and easy Web SDK bridges:
      - Simple Javascript calling lines
      - Native PCM format recording
      - Auto-scaling edge nodes around 12 global regions.`
    }
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden relative bg-[#0F172A] text-white font-sans min-h-screen custom-scrollbar pt-[56px] xs:pt-[64px] md:pt-[76px]">
      {/* Dynamic Header Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-[#1E293B] px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer select-none shrink-0" onClick={() => { setTab('home'); setMobileMenuOpen(false); }}>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="font-display font-extrabold text-lg xs:text-xl md:text-2xl tracking-tight text-white">
            NexDial<span className="text-[#00C2FF]">.io</span>
          </span>
        </div>

        {/* Public Nav Items (Desktop only) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => setTab('features')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'features' ? 'text-brand-primary' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={() => setTab('ai-voice')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'ai-voice' ? 'text-white flex items-center gap-1' : 'flex items-center gap-1'}`}
          >
            AI Voice <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
          </button>
          <button 
            onClick={() => setTab('pricing')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'pricing' ? 'text-brand-primary' : ''}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => setTab('solutions')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'solutions' ? 'text-brand-primary' : ''}`}
          >
            Solutions
          </button>
          <button 
            onClick={() => setTab('integrations')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'integrations' ? 'text-brand-primary' : ''}`}
          >
            Integrations
          </button>
          <button 
            onClick={() => setTab('blog')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'blog' ? 'text-brand-primary' : ''}`}
          >
            Resources
          </button>
          <button 
            onClick={() => setTab('docs')} 
            className={`hover:text-white transition-colors cursor-pointer ${currentTab === 'docs' ? 'text-brand-primary' : ''}`}
          >
            API Portal
          </button>
        </div>

        {/* Action Controls & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4 font-sans justify-end">
          {/* Showcase / Terminal Switcher - compact & high fidelity */}
          <div className="flex bg-[#0A0A0B]/85 p-0.5 rounded-lg border border-[#1E293B] font-mono text-[9px] xs:text-[10px] sm:text-[11px] select-none">
            <button 
              onClick={() => { setCurrentSection('public'); setMobileMenuOpen(false); }}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${currentSection === 'public' ? 'bg-indigo-950/40 text-indigo-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Showcase
            </button>
            <button 
              onClick={() => { setCurrentSection('applet'); setMobileMenuOpen(false); }}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${currentSection === 'applet' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Terminal
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center rounded border border-[#1E293B] hover:bg-slate-800/20 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Desktop Only CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => { setTab('status'); setMobileMenuOpen(false); }} 
              className="hidden xl:flex items-center gap-1.5 text-xs text-accent-teal bg-accent-teal/10 px-3 py-1.5 rounded-full border border-accent-teal/20 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Live Status 100%
            </button>
            <button 
              onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} 
              className="text-xs lg:text-sm font-semibold hover:text-white text-[#E2E8F0] px-3 py-1.5 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => { onSignupClick(); setMobileMenuOpen(false); }} 
              className="bg-brand-primary hover:bg-brand-secondary text-xs lg:text-sm font-bold text-white px-4 py-2 rounded-lg transition-all hover:scale-105 shadow-md shadow-brand-primary/20 cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Responsive Hamburger Icon Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-300 hover:text-white transition-all bg-[#0A0A0B]/30 hover:bg-slate-800/40 border border-[#1E293B] rounded-lg cursor-pointer flex items-center justify-center"
            title="Toggle Mobile Corporate Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 xs:w-5 xs:h-4.5" /> : <Menu className="w-4 h-4 xs:w-5 xs:h-4.5" />}
          </button>
        </div>
      </nav>

      {/* Corporate Landing Page Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[52px] xs:top-[60px] md:top-[70px] bottom-0 z-40 bg-[#0F172A] border-t border-[#1E293B] flex flex-col p-6 animate-fade-in divide-y divide-[#1E293B] overflow-y-auto font-sans">
          
          {/* Navigation Links */}
          <div className="flex flex-col py-4 space-y-4 text-base font-semibold text-slate-200">
            <button 
              onClick={() => { setTab('features'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'features' ? 'text-brand-primary' : ''}`}
            >
              Features Matrix
            </button>
            <button 
              onClick={() => { setTab('ai-voice'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 flex items-center gap-1.5 transition-colors ${currentTab === 'ai-voice' ? 'text-white font-bold' : ''}`}
            >
              AI Voice Agent Labs <Sparkles className="w-4 h-4 text-accent-teal animate-pulse" />
            </button>
            <button 
              onClick={() => { setTab('pricing'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'pricing' ? 'text-brand-primary' : ''}`}
            >
              Pricing Licenses
            </button>
            <button 
              onClick={() => { setTab('solutions'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'solutions' ? 'text-brand-primary' : ''}`}
            >
              Solutions & Compliance
            </button>
            <button 
              onClick={() => { setTab('integrations'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'integrations' ? 'text-brand-primary' : ''}`}
            >
              CRM Hub Integrations
            </button>
            <button 
              onClick={() => { setTab('blog'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'blog' ? 'text-brand-primary' : ''}`}
            >
              Resources & Industry Insights
            </button>
            <button 
              onClick={() => { setTab('docs'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-white py-1.5 transition-colors ${currentTab === 'docs' ? 'text-brand-primary' : ''}`}
            >
              API Portal & SDK Sandbox
            </button>
            <button 
              onClick={() => { setTab('status'); setMobileMenuOpen(false); }} 
              className={`text-left hover:text-accent-teal py-1.5 flex items-center gap-2 transition-colors ${currentTab === 'status' ? 'text-accent-teal font-bold' : 'text-slate-400'}`}
            >
              <Activity className="w-4 h-4 text-accent-teal animate-pulse" />
              Live SLA Status: 100% Operational
            </button>
          </div>

          {/* Mobile Login and Signup CTA Group */}
          <div className="flex flex-col py-6 space-y-4">
            <button 
              onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} 
              className="w-full py-3 rounded-xl border border-[#334155] text-indigo-400 font-bold text-sm bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Sign In to Dialer Terminal
            </button>
            <button 
              onClick={() => { onSignupClick(); setMobileMenuOpen(false); }} 
              className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-primary/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Activate Free Seat License</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Micro Credit Footer in drawer */}
            <div className="pt-4 text-center">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Secure SSL G.711 Telephony Gateway Connected</span>
            </div>
          </div>
        </div>
      )}



      {currentTab === 'home' && (
        <>
          <section className="w-full relative overflow-hidden h-screen bg-cover bg-center mb-8" style={{ backgroundImage: "url('/assets/premium_hero_bg.png')" }}>
            {/* Rich Radial/Linear Dark Overlay for seamless blending and ultra-premium contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/30 via-[#0F172A]/70 to-[#0F172A] pointer-events-none"></div>
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center space-y-8 pt-24 mb-12">
              {/* Live status tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md animate-pulse-slow">
                <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-medium">NexDial Infrastructure v2.0 Live</span>
              </div>
              
              {/* Headline with ultra-premium color styling */}
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-white mb-2 max-w-4xl leading-tight animate-float">
                Command Your Entire <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">Voice Ecosystem</span>
              </h1>
              
              {/* Sub‑headline */}
              <p className="text-base md:text-lg text-slate-350 max-w-2xl leading-relaxed font-light">
                Enterprise‑grade AI dialing, real‑time sentiment coaching, and multi‑node routing—all centralized in one high‑velocity terminal.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                  onClick={() => { onSignupClick(); setMobileMenuOpen(false); }} 
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-450 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-500/30 cursor-pointer"
                >
                  Deploy AI Dialer <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setTab('pricing')} 
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900/40 hover:bg-slate-800/60 text-slate-200 font-bold rounded-xl border border-slate-700/60 backdrop-blur-md transition-all transform hover:scale-105 shadow-md shadow-black/10 cursor-pointer"
                >
                  Book Multi‑Seat Demo
                </button>
              </div>
            </div>
          </section>


      {/* Quick Stats Floating Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto text-left mt-8 mb-24">
              <div className="glass-effect p-6 rounded-2xl border-l-4 border-l-brand-primary animate-fade-up">
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Total System Volume</p>
                <p className="font-display font-bold text-3xl md:text-4xl text-white">480M+</p>
                <span className="text-xs text-[#00E5B0] font-medium">↑ Calls Processed</span>
              </div>
              <div className="glass-effect p-6 rounded-2xl border-l-4 border-l-accent-teal animate-fade-up">
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Average Wait Time</p>
                <p className="font-display font-bold text-3xl md:text-4xl text-white">0.45s</p>
                <span className="text-xs text-[#00E5B0] font-medium">Edge SLA Routing</span>
              </div>
              <div className="glass-effect p-6 rounded-2xl border-l-4 border-l-accent-blue animate-fade-up">
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Time Saved wrap-up</p>
                <p className="font-display font-bold text-3xl md:text-4xl text-white">4.8 Min</p>
                <span className="text-xs text-accent-blue font-medium">AI Coaching</span>
              </div>
              <div className="glass-effect p-6 rounded-2xl border-l-4 border-l-accent-coral animate-fade-up">
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Global Voice Quality</p>
                <p className="font-display font-bold text-3xl md:text-4xl text-white">4.95</p>
                <span className="text-xs text-[#00E5B0] font-medium">99.99% MOS Rank</span>
              </div>
            </div>

            {/* ROI Interactive Widget Panel */}
            <div className="max-w-4xl mx-auto bg-[#1E293B]/60 p-8 rounded-3xl border border-[#334155] text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-teal/15 flex items-center justify-center border border-accent-teal/30">
                  <BarChart3 className="w-5 h-5 text-accent-teal" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Calculated ROI Potential</h3>
                  <p className="text-xs text-slate-400">Drag to instantly estimate monthly dial center savings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span>Number of Active Call Agents</span>
                      <span className="text-brand-primary font-bold">{roiAgents} seats</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="250" 
                      value={roiAgents} 
                      onChange={(e) => setRoiAgents(parseInt(e.target.value))}
                      className="w-full accent-brand-primary cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span>Daily Calling Min per Rep</span>
                      <span className="text-brand-primary font-bold">{roiCallMinutes} min</span>
                    </div>
                    <input 
                      type="range" 
                      min="30" 
                      max="600" 
                      step="30"
                      value={roiCallMinutes} 
                      onChange={(e) => setRoiCallMinutes(parseInt(e.target.value))}
                      className="w-full accent-brand-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-[#0F172A] p-6 rounded-2xl text-center flex flex-col justify-center border border-[#334155]">
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Estimated Monthly Value Saved</p>
                  <p className="font-display font-black text-4xl lg:text-5xl text-[#00E5B0] mt-2">${monthlyCostSaved.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-2">Based on TCPA Time fencing, AI coaching assistance, & wrap automation.</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#11192E] py-8 border-y border-[#1E293B] text-center overflow-hidden mt-24">
            <p className="text-xs font-mono uppercase text-slate-400 tracking-widest mb-4">Empowering global operations inside legendary complexes</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-45 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white">Aircall Pro</span>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-[#00E5B0]">Retell Group</span>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white">HubSpot Systems</span>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white">Twilio Carrier</span>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-[#00C2FF]">Vapi AI</span>
            </div>
          </div>

          {/* Value Prop Columns */}
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">Designed For Ultra High-Performance Dialing Complexes</h2>
              <p className="text-slate-400 text-sm mt-3">Replace multiple fragmented phone adapters, script sheets, and analytics dashboards with one single comprehensive command panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-effect p-8 rounded-2xl hover:border-[#3b4252] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Automated AI Call Coaching</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Let Gemini listen to your customer call stream. Get live pop-up trigger cards advising of objection handling steps to successfully close enterprise deals.</p>
              </div>

              <div className="glass-effect p-8 rounded-2xl hover:border-[#3b4252] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Interactive visual IVR Builder</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Map multi-level voice recipient nodes manually. Seamless routing to physical department phones or trigger Gemini receptionist bot flow charts instantly.</p>
              </div>

              <div className="glass-effect p-8 rounded-2xl hover:border-[#3b4252] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">TCPA & GDPR Time Gating</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Rest easy knowing regional dialing regulations are enforced automatically. System restricts hours based on Area Codes and filters DNC indexes live.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---------------- 2. FEATURES PAGE ---------------- */}
      {currentTab === 'features' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-accent-teal">Ultimate Feature Matrix</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">The Cloud Communications Flagship</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Every tool you need to dial worldwide, monitor agents live, build smart IVRs, and analyze sentiment.</p>
          </div>

          <div className="space-y-24">
            {/* Softphone row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">Unified Softphone v2.6</span>
                <h2 className="font-display font-bold text-3xl text-white mt-4 mb-4">Enterprise Dialer Terminal</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  NexDial embeds a high-fidelity browser-based phone supporting SIP calling lines and secure STUN/TURN tunneling. Agents dial manually using our click-to-dial contacts, view live conversation wave indicators, and save immediate notes.
                </p>
                <div className="space-y-3 font-light text-sm text-slate-350">
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Predictive Dialer modes boosting outgoing capacity by 4x</div>
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Embedded click-to-call inside HubSpot & Salesforce integration</div>
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Live Mute, Hold, speed-transfer and Warm Supervisor Consult</div>
                </div>
              </div>
              <div className="glass-effect p-6 rounded-3xl border border-[#334155] shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-[#334155] pb-4 mb-4">
                  <span className="text-xs text-slate-400 font-mono">Dialer Preview Monitor</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-teal" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  </div>
                </div>
                <div className="space-y-3 bg-[#0F172A] p-4 rounded-xl font-mono text-xs text-slate-300">
                  <p className="text-[#00C2FF]">{"$ nexdial connect -u tenant_admin_40270"}</p>
                  <p className="text-[#00E5B0]">{"[CONNECTED] SIP trunk registration completed. Port 3000 mapping: OK"}</p>
                  <p className="text-slate-405">{"Status: Waiting for click action on contacts panel..."}</p>
                </div>
              </div>
            </div>

            {/* AI Call analytics row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
              <div className="lg:order-2">
                <span className="text-xs uppercase tracking-wider font-mono text-accent-teaser text-accent-coral bg-accent-coral/10 px-3 py-1 rounded-full border border-accent-coral/20">Real-Time QA</span>
                <h2 className="font-display font-bold text-3xl text-white mt-4 mb-4">AI Transcriber & Live Coaching Advice</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Get absolute full disclosure on ongoing call topics. Whisper AI translates conversational stream elements instantly. The central Gemini agent extracts customer core sentiment trends and highlights prompt scripts for objection scenarios.
                </p>
                <div className="space-y-3 font-light text-sm text-slate-350">
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Real-time speech-to-text generating live dialog tickers</div>
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Sentiment tagging (Positive/Neutral/Negative) flagged directly inside call logs</div>
                  <div className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Gemini-driven objection suggestions triggered during agent conversation</div>
                </div>
              </div>
              <div className="lg:order-1 glass-effect p-8 rounded-3xl border border-[#334155]">
                <div className="p-4 bg-brand-primary/10 border border-brand-primary/25 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-brand-primary uppercase">Gemini Coaching Suggestions</span>
                    <span className="text-xs bg-accent-teal/15 text-accent-teal px-2 py-0.5 rounded-full">92% Confidence</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light italic mb-2">"Customer mentions existing Five9 contract and pricing concerns..."</p>
                  <div className="bg-[#0F172A] p-3 rounded-xl border border-[#334155]">
                    <p className="text-xs font-semibold text-[#00E5B0]">Recommended Pitch Trigger:</p>
                    <p className="text-xs text-slate-400 font-light mt-1">Offer NexDials Dual-Trunk Buyout Program. If they switch 50+ lines, we waiver license subscription fees for 6 months.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Automations row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/20">Smart Integrations</span>
                <h2 className="font-display font-bold text-3xl text-white mt-4 mb-4">Dynamic Omnichannel workflows</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  NexDial bridges telephony to WhatsApp, SMS, and Email pipelines effortlessly. Trigger automated SMS followups upon outbound dial wrap, push transcriptions to Slack teams, or sync recordings to cloud AWS S3 storages.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
                  <MessageSquare className="w-8 h-8 text-pink-500 mb-4" />
                  <h4 className="font-semibold text-white text-sm mb-1">Slack Incident Warnings</h4>
                  <p className="text-slate-400 text-xs font-light">Posts updates instantly if call center SLAs drop below limits.</p>
                </div>
                <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
                  <Bot className="w-8 h-8 text-accent-teal mb-4" />
                  <h4 className="font-semibold text-white text-sm mb-1">WhatsApp Survey automation</h4>
                  <p className="text-slate-400 text-xs font-light">Send auto loyalty surveys after agent logs successful deal wraps.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 3. PRICING PAGE ---------------- */}
      {currentTab === 'pricing' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#00C2FF]">Fair & Straightforward</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">Simple Corporate Seat Licenses</h1>
            
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!isYearly ? 'text-white font-bold' : 'text-slate-400 font-light'}`}>Monthly Billing</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-12 h-6 rounded-full bg-brand-primary relative transition-all cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isYearly ? 'right-1' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${isYearly ? 'text-white font-bold' : 'text-slate-400 font-light'}`}>
                Yearly Billing <span className="text-xs bg-accent-teal/15 text-accent-teal px-2 py-0.5 rounded-full font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
            {/* Starter Plan */}
            <div className="glass-effect p-8 rounded-3xl border border-[#334155] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-450 tracking-white tracking-widest">Starter Tier</span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">Team Base</h3>
                <p className="text-xs text-slate-400 mt-2 font-light">Essential cloud calling features for emerging remote groups.</p>
                <div className="my-8">
                  <span className="text-4xl font-display font-extrabold text-white">
                    ${isYearly ? '19' : '25'}
                  </span>
                  <span className="text-xs text-slate-400 font-light"> / agent / mo</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-350 font-light">
                  <li className="flex items-center gap-2"><Check className="text-[#00C2FF] w-4 h-4" /> 1 Central Phone SIP Adaptor</li>
                  <li className="flex items-center gap-2"><Check className="text-[#00C2FF] w-4 h-4" /> Unlimited incoming calls</li>
                  <li className="flex items-center gap-2"><Check className="text-[#00C2FF] w-4 h-4" /> Auto Call Wrap logging</li>
                  <li className="flex items-center gap-2"><Check className="text-[#00C2FF] w-4 h-4" /> Click-to-dial contacts directory</li>
                </ul>
              </div>
              <button onClick={onSignupClick} className="w-full mt-8 py-3 bg-[#1E293B] hover:bg-[#334155] text-white font-bold text-xs rounded-xl transition-all cursor-pointer border border-[#334155]">
                Start Free Trial
              </button>
            </div>

            {/* Growth Plan */}
            <div className="glass-effect p-8 rounded-3xl border-2 border-brand-primary relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1 rounded-full border border-brand-secondary">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-brand-primary tracking-widest font-bold">Growth Tier</span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">Dialer Pro</h3>
                <p className="text-xs text-slate-400 mt-2 font-light">High capacity auto dialer setups and deep CRM adapters.</p>
                <div className="my-8">
                  <span className="text-4xl font-display font-extrabold text-white">
                    ${isYearly ? '39' : '49'}
                  </span>
                  <span className="text-xs text-slate-400 font-light"> / agent / mo</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-350 font-light">
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Everything inside Starter</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Predictive & Power dialing</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Full HubSpot & Salesforce adapter</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Whisper / Supervisor consult</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> HIPAA voice storage cloud option</li>
                </ul>
              </div>
              <button onClick={onSignupClick} className="w-full mt-8 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs rounded-xl transition-all hover:scale-105 cursor-pointer">
                Upgrade to Growth
              </button>
            </div>

            {/* AI Suite */}
            <div className="ai-pricing-card bg-gradient-to-b from-[#1D1E3A] to-[#11122C] p-8 rounded-3xl border border-accent-teal flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-teal text-[#0F172A] text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1 rounded-full border border-accent-teal/50">
                AI Powered Flagship
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-[#00E5B0] tracking-widest font-bold">Automation Suite</span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">AI Agent Suite</h3>
                <p className="text-xs text-slate-400 mt-2 font-light">Gemini real-time transcription, coaching, and automated voicemails.</p>
                <div className="my-8">
                  <span className="text-4xl font-display font-extrabold text-white">
                    ${isYearly ? '59' : '75'}
                  </span>
                  <span className="text-xs text-slate-400 font-light"> / agent / mo</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-350 font-light">
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Everything inside Growth Plan</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Live Web Speech Transcriber</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Gemini Live Objection Assistant</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Automated IVR Gemini Screen bots</li>
                  <li className="flex items-center gap-2"><Check className="text-accent-teal w-4 h-4" /> Advanced sentiment metrics tracker</li>
                </ul>
              </div>
              <button onClick={onSignupClick} className="w-full mt-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                Deploy AI Suite
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-effect p-8 rounded-3xl border border-[#334155] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-450 tracking-widest">Enterprise Tier</span>
                <h3 className="font-display font-bold text-2xl text-white mt-2">Custom SLA</h3>
                <p className="text-xs text-slate-400 mt-2 font-light">Full telemetry access, private VPC proxy, dedicated SIP configuration.</p>
                <div className="my-8">
                  <span className="text-2xl font-display font-extrabold text-white">Custom Pitch</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-350 font-light">
                  <li className="flex items-center gap-2"><Check className="text-slate-400 w-4 h-4" /> Dedicated Private SIP trunks</li>
                  <li className="flex items-center gap-2"><Check className="text-slate-400 w-4 h-4" /> Multi-tenant tenant setups</li>
                  <li className="flex items-center gap-2"><Check className="text-slate-400 w-4 h-4" /> Custom white-label branding options</li>
                  <li className="flex items-center gap-2"><Check className="text-slate-400 w-4 h-4" /> Uptime backup failover configuration</li>
                </ul>
              </div>
              <button onClick={() => setTab('contact')} className="w-full mt-8 py-3 bg-[#11192E] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl transition-all cursor-pointer border border-[#334155]">
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 4. SOLUTIONS PAGE ---------------- */}
      {currentTab === 'solutions' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-brand-primary">Industry Focus</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">Solutions for High Stakes Systems</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Whether maintaining HIPAA patient privacy guidelines or rotating complex real-estate broker listings, we provide certified, fast routing solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] space-y-4">
              <span className="text-xs font-mono text-accent-teal font-extrabold bg-accent-teal/10 px-2.5 py-1 rounded-full">Healthcare</span>
              <h3 className="font-display font-bold text-xl text-white">Fully Certified HIPAA Patient Calling Lines</h3>
              <p className="text-slate-400 text-xs leading-relaxed">NexDial enforces automatic end-to-end payload encryption. Call logs omit medical identifiers and recordings store securely on private cloud AWS S3 compartments with dedicated audit trails.</p>
            </div>
            
            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] space-y-4">
              <span className="text-xs font-mono text-[#00C2FF] font-extrabold bg-[#00C2FF]/10 px-2.5 py-1 rounded-full">Real Estate</span>
              <h3 className="font-display font-bold text-xl text-white">Active Power Dialers for High Density Outreach</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Let teams process up to 450 contacts daily. Clicking listings dials immediate warm lines. System detects voicemail inboxes automatically and drops customizable recordings with single taps.</p>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] space-y-4">
              <span className="text-xs font-mono text-brand-primary font-extrabold bg-brand-primary/10 px-2.5 py-1 rounded-full">FinTech & Banking</span>
              <h3 className="font-display font-bold text-xl text-white">Secure Encrypted Inbound Routing</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Deploy secure PIN menus for premium accounts. Integrates directly into database ledger states, validating account information before agents ever answer calls.</p>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] space-y-4">
              <span className="text-xs font-mono text-accent-coral font-extrabold bg-accent-coral/10 px-2.5 py-1 rounded-full">Logistics & Support</span>
              <h3 className="font-display font-bold text-xl text-white">Global Fleet Coordination Hub</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Coordinate drivers on route. Outgoing dial routines automatically trigger instant SMS maps coordinates or follow-up email notifications upon final disposition wrap codes.</p>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] space-y-4">
              <span className="text-xs font-mono text-white font-extrabold bg-white/10 px-2.5 py-1 rounded-full">Global BPOs</span>
              <h3 className="font-display font-bold text-xl text-white">Multi-seat Cloud Virtual Class</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Administer several isolated corporate accounts on demand. Monitor agent active queues, whisper suggestions unnoticed to training agents, and inspect SLA compliance sheets.</p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 5. INTEGRATIONS PAGE ---------------- */}
      {currentTab === 'integrations' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-accent-teal">Hub Integration Portal</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">Bridges Into Your Native CRM</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Eliminate duplicate contact indexing. Sync outgoing recordings, call wraps, client history notes, and live sentiment tags bi-directionally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] hover:scale-105 transition-all">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Salesforce Cloud adapter</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Embeds client calling widgets directly within customer account panels. Real-time logging of dialing duration and automatic tape uploading.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-accent-teal font-mono font-medium">● Complete Support v2.6</span>
                <span className="text-[10px] bg-[#334155] px-2 py-1 rounded font-mono">Installed</span>
              </div>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🧡</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">HubSpot Pipeline sync</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Map lead deals steps instantly depending on caller wrap notes. Auto routes incoming repeat tickets to original account managers.</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-accent-teal font-mono font-medium">● Complete Support v2.6</span>
                <span className="text-[10px] bg-[#334155] px-2 py-1 rounded font-mono">Installed</span>
              </div>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-2xl border border-[#334155] opacity-80 hover:opacity-100 transition-all">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">WhatsApp Business Integration</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Automate delivery updates or patient survey loops via secure SMS template channels immediately upon ending calling events.</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#334155] pt-4">
                <span className="text-xs text-slate-400 font-mono">Setup In Platform Settings</span>
                <span className="text-xs text-brand-primary font-bold">Configure</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 6. AI VOICE PAGE ---------------- */}
      {currentTab === 'ai-voice' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#00E5B0]">NexDial Speech Labs</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">Next-Generation AI Speech Bots</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Eliminate call wait times entirely. Deploy ultra-lifelike Gemini voice recipients capable of screen answering, dynamic bookings, and automated screening logs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-display font-bold text-3xl mb-4">Lifelike 24/7 Digital Assistants</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Our voice models support dynamic state interactions. They consult private database schedules, handle complex routing, and answer with human-speed 0.5s response thresholds.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-[#1E293B] flex items-center justify-center font-bold text-[#00E5B0]">1</div>
                  <div>
                    <h4 className="font-bold text-sm">Ultra-low Latency Pipeline</h4>
                    <p className="text-xs text-slate-400">Under 0.5s responses using Whisper stream listener and ElevenLabs PCM output streams.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-[#1E293B] flex items-center justify-center font-bold text-[#00C2FF]">2</div>
                  <div>
                    <h4 className="font-bold text-sm">Synthetic Actor Cloning</h4>
                    <p className="text-xs text-slate-400">Clone professional actors speaking voices with custom 10-second mp3 sample files.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#11192E] p-8 rounded-3xl border border-[#334155]">
              <h3 className="font-display font-bold text-xl mb-4 text-[#00E5B0]">Demonstration Pitch Audio</h3>
              <p className="text-xs text-slate-400 mb-6">Listen to our standard synthetic receptionist (Liam):</p>
              
              <div className="bg-[#0F172A] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-brand-primary animate-pulse-slow" />
                  <div>
                    <p className="text-xs font-bold">Liam - AI Recipient</p>
                    <p className="text-[10px] text-slate-400">Prebuilt voice: Zephyr model</p>
                  </div>
                </div>
                <button onClick={() => alert("Simulating Voice Agent Liam: 'Hi! Thank you for dialing NexDial today! How can I route your corporate line?'")} className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-xs rounded-lg font-bold">
                  Play Interactive Sample
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 7. ABOUT PAGE ---------------- */}
      {currentTab === 'about' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">The NexDial Story</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Pioneering edge telephony from cloud clusters. Our mission is to bridge business call interfaces into unified real-time spaces with the help of artificial intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-[#1E293B] p-6 rounded-2xl text-center">
              <Award className="w-10 h-10 text-brand-primary mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Our Core Value</h3>
              <p className="text-xs text-slate-400">Deliver transparent pricing rate calculations and robust uptime SLAs above 99.99%.</p>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-2xl text-center">
              <Globe className="w-10 h-10 text-accent-teal mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Cloud Telephony Edge</h3>
              <p className="text-xs text-slate-400">Hosted on multiple geographic Cloud Run containers delivering high speed connection trunks worldwide.</p>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-2xl text-center">
              <Heart className="w-10 h-10 text-accent-coral mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Built For High Volume</h3>
              <p className="text-xs text-slate-400">Ready to accommodate enterprise workspaces with up to 10,000 concurrent call lines.</p>
            </div>
          </div>

          {/* Core Developer Profile */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-3xl p-8 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden mt-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white text-xl font-bold font-display shadow-lg shrink-0">
              DS
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                <h3 className="font-display font-extrabold text-xl text-white">Datta Sable</h3>
                <span className="text-[10px] font-mono bg-brand-primary/15 text-brand-primary border border-brand-primary/20 px-2.5 py-0.5 rounded-full inline-block self-center">
                  Core Creator & Developer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Lead telecom systems architect who envisioned and engineered the NexDial.io platform to scale high-velocity outbound campaign operations with world-class design precision.
              </p>
              <div className="pt-2">
                <a 
                  href="https://dattasable.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs text-[#00C2FF] hover:text-white transition-colors duration-150 font-medium group"
                >
                  Visit Portfolio (dattasable.com)
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 duration-150 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 8. CAREERS PAGE ---------------- */}
      {currentTab === 'careers' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-accent-teal">Join The Team</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">Pioneer Telephony Innovation</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Build low-latency audio pipelines, stateful visual building systems, and scale modern telecommunication apps.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-[#00C2FF] font-mono">Engineering — Remote US / Europe</span>
                <h3 className="font-display font-bold text-lg text-white mt-1">Senior VoIP & WebRTC Protocol Engineer</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">Scale SIP.js bridges, STUN/TURN clusters, and ensure latency values remain under 80ms.</p>
              </div>
              <button 
                onClick={() => setApplyingJob('Senior VoIP Engineer')}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-xs font-bold rounded-lg cursor-pointer"
              >
                Apply Direct
              </button>
            </div>

            <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-[#00C2FF] font-mono">AI Systems — SF / Bengaluru</span>
                <h3 className="font-display font-bold text-lg text-white mt-1">Lead Gemini API Voice Designer</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">Implement low-latency Whisper streaming protocols and voice synthesis prompts.</p>
              </div>
              <button 
                onClick={() => setApplyingJob('Lead Gemini API Voice Designer')}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-xs font-bold rounded-lg cursor-pointer"
              >
                Apply Direct
              </button>
            </div>

            <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-[#00C2FF] font-mono">Product Sales — Singapore / London</span>
                <h3 className="font-display font-bold text-lg text-white mt-1">BPO Corporate Account Executive</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">Introduce multi-seat dialing suites to major medical and logistical complexes.</p>
              </div>
              <button 
                onClick={() => setApplyingJob('BPO Corporate Account Executive')}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-xs font-bold rounded-lg cursor-pointer"
              >
                Apply Direct
              </button>
            </div>
          </div>

          {/* Job application modal */}
          {applyingJob && (
            <div className="fixed inset-0 bg-[#0F172A]/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full relative">
                <h3 className="font-display font-bold text-xl text-white mb-2">Apply for position</h3>
                <p className="text-xs text-slate-405 font-mono mb-4">{applyingJob}</p>

                {appSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-[#00E5B0] mx-auto mb-4" />
                    <p className="font-display font-semibold text-lg">Application Submitted!</p>
                    <p className="text-xs text-slate-400 mt-2">Dattatray and our talent acquisition group will audit your credentials shortly.</p>
                    <button onClick={() => { setApplyingJob(null); setAppSuccess(false); }} className="mt-6 px-6 py-2 bg-[#334155] text-xs font-bold rounded-xl hover:bg-[#475569]">
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setAppSuccess(true); }} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Full Legal Name</label>
                      <input 
                        type="text" 
                        required 
                        value={appForm.name}
                        onChange={(e) => setAppForm({...appForm, name: e.target.value})}
                        className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={appForm.email}
                        onChange={(e) => setAppForm({...appForm, email: e.target.value})}
                        className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Github / Portfolio URL</label>
                      <input 
                        type="url" 
                        placeholder="https://" 
                        required 
                        value={appForm.portfolio}
                        onChange={(e) => setAppForm({...appForm, portfolio: e.target.value})}
                        className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Paste Resume Cover (Markdown / Text)</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={appForm.resumeText}
                        onChange={(e) => setAppForm({...appForm, resumeText: e.target.value})}
                        className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs custom-scrollbar"
                      />
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setApplyingJob(null)} className="flex-1 py-2.5 bg-[#334155] text-xs rounded-xl font-bold">
                        Cancel
                      </button>
                      <button type="submit" className="flex-1 py-2.5 bg-brand-primary text-xs rounded-xl font-bold">
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ---------------- 9. CONTACT PAGE ---------------- */}
      {currentTab === 'contact' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase text-brand-primary">Corporate Office Trunks</span>
              <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-2 mb-4">Connect With Outpost Representatives</h1>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Are you looking to replace an active telecommunication platform, inquire about bulk pricing on SIP call trunks, or partner with NexDial.io? Complete our form and receive custom-engineered proposals in 3 hours.
              </p>
              
              <div className="space-y-4 text-xs font-light text-slate-350">
                <div className="flex items-center gap-2"><MapPin className="text-accent-teal w-4 h-4" /> Global Headquarters: Delaware Corporate Complex / Remote Team</div>
                <div className="flex items-center gap-2"><Mail className="text-accent-teal w-4 h-4" /> Enterprise Support: support@nexdial.io</div>
                <div className="flex items-center gap-2"><MessageSquare className="text-accent-teal w-4 h-4" /> Chat Platform Support: Available live inside systems dial-panel</div>
              </div>
            </div>

            <div className="bg-[#1E293B] p-8 rounded-3xl border border-[#334155]">
              <h3 className="font-display font-bold text-xl mb-6">Request Callback / Proposals</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! Proposal inquiry recorded. Dattatray Sable or our sales engineers will contact your firm shortly."); }} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Company legal name</label>
                  <input type="text" required className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-xs" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Estimated Call Licenses Required</label>
                  <select className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-xs">
                    <option>Starter: 5 - 20 seats</option>
                    <option>Growth: 21 - 100 seats</option>
                    <option>AI Suite Platform: 10 + automated seats</option>
                    <option>Enterprise BPO SLA: 100+ seats</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Corporate email</label>
                  <input type="email" required className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-xs" />
                </div>
                <button type="submit" className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl transition-all">
                  Schedule Custom SLA Demo
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 10. BLOG SYSTEM ---------------- */}
      {currentTab === 'blog' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-brand-primary">Industry Reports</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mt-3">The Telephony Dispatch</h1>
            <p className="text-slate-450 mt-4 text-sm font-light">Stay updated on compliance regulations, live coaching architectures, and corporate telephony migrations.</p>

            <div className="max-w-md mx-auto mt-8 flex gap-2">
              <input 
                type="text" 
                placeholder="Search blog articles..." 
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="flex-1 bg-[#1E293B] border border-[#334155] px-4 py-2.5 rounded-xl text-xs text-white"
              />
              <button className="px-4 bg-[#334155] rounded-xl text-xs font-bold">Search</button>
            </div>
          </div>

          {selectedPost ? (
            <div className="max-w-3xl mx-auto bg-[#1E293B] p-8 rounded-3xl border border-[#334155]">
              <button onClick={() => setSelectedPost(null)} className="text-xs text-slate-400 hover:text-white mb-6 flex items-center gap-1 cursor-pointer">
                ← Back to publications list
              </button>
              <span className="text-xs text-[#00C2FF] font-mono uppercase bg-[#00C2FF]/10 px-2 py-0.5 rounded">
                {blogPosts[selectedPost - 1].category}
              </span>
              <h2 className="font-display font-black text-3xl text-white mt-4 mb-2">
                {blogPosts[selectedPost - 1].title}
              </h2>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Published on {blogPosts[selectedPost - 1].date} by {blogPosts[selectedPost - 1].author} | {blogPosts[selectedPost - 1].readTime}
              </p>
              <div className="text-slate-350 text-sm leading-relaxed space-y-4 font-light whitespace-pre-line">
                {blogPosts[selectedPost - 1].content}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter(post => post.title.toLowerCase().includes(blogSearch.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearch.toLowerCase()))
                .map(post => (
                  <div key={post.id} className="bg-[#1E293B] p-6 rounded-2xl border border-[#334155] flex flex-col justify-between hover:border-[#3b4252] transition-colors">
                    <div>
                      <span className="text-[10px] text-accent-teal font-mono uppercase tracking-wider bg-accent-teal/10 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <h3 className="font-display font-semibold text-lg text-white mt-3 mb-2 hover:text-[#00C2FF] transition-colors cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                      <button className="text-xs text-brand-primary font-bold flex items-center gap-1">
                        Read full post <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      )}

      {/* ---------------- 11. DOCUMENTATION PORTAL ---------------- */}
      {currentTab === 'docs' && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="space-y-2 lg:sticky lg:top-24 h-fit">
              <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest pl-2 mb-4">REST API ENDPOINTS</h3>
              <button className="w-full text-left bg-brand-primary/10 text-brand-primary pl-4 py-2 rounded-lg text-xs font-mono border-l-2 border-l-brand-primary">
                POST /v1/calls/dial
              </button>
              <button className="w-full text-left text-slate-400 hover:text-white pl-4 py-2 rounded-lg text-xs font-mono">
                GET /v1/recordings
              </button>
              <button className="w-full text-left text-slate-400 hover:text-white pl-4 py-2 rounded-lg text-xs font-mono">
                PUT /v1/ivr/update
              </button>
              <button className="w-full text-left text-slate-400 hover:text-white pl-4 py-2 rounded-lg text-xs font-mono">
                POST /v1/sms/broadcast
              </button>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#00C2FF]">Developer Guild</span>
                <h1 className="font-display font-black text-3xl text-white mt-2">Trigger SIP Calling Lines Programmatically</h1>
                <p className="text-slate-400 text-sm mt-2">
                  NexDial exposes clean developer endpoints. Launch cold call queues or bot receptionists dynamically with raw HTTP POST requests.
                </p>
              </div>

              <div className="bg-[#11192E] rounded-2xl p-6 border border-[#334155] space-y-4">
                <div className="flex items-center justify-between border-b border-[#334155] pb-3 text-xs">
                  <span className="font-mono text-slate-400">cURL Demonstration Snippet</span>
                  <span className="font-mono text-accent-teal">HTTPS</span>
                </div>
                <pre className="font-mono text-[11px] text-[#00e5b0]/95 leading-relaxed overflow-x-auto whitespace-pre">
{`curl -X POST "https://api.nexdial.io/v1/calls/dial" \\
  -H "Authorization: Bearer nex_pk_live_40270a3f9e8" \\
  -H "Content-Type: application/json" \\
  -d '{
    "toNumber": "+15552345678",
    "callerId": "+15551002000",
    "autoCoaching": true,
    "scriptId": "warm-lead-sheet",
    "webhookOnWrap": "https://callback.mycrm.com/leads"
  }'`}
                </pre>
              </div>

              <div className="bg-[#11192E] rounded-2xl p-6 border border-[#334155] space-y-4">
                <div className="flex items-center justify-between border-b border-[#334155] pb-3 text-xs">
                  <span className="font-mono text-slate-400">Node JS Web SDK Bridge</span>
                  <span className="font-mono text-accent-blue">ESModule</span>
                </div>
                <pre className="font-mono text-[11px] text-[#00E5B0] leading-relaxed overflow-x-auto whitespace-pre">
{`import { NexDialGateway } from '@nexdial/sdk';

const nex = new NexDialGateway({ apiKey: process.env.NEXDIAL_KEY });

// Launch automated outbound campaign block
const dial = await nex.dialer.create({
  contacts: ['c-1', 'c-2', 'c-4'],
  rateMultiplier: 3, // Outbound speed slider
  agents: ['ag-1', 'ag-3']
});

console.log(\`Launched campaign with session ID: \${dial.id}\`);`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 12. STATUS PAGE ---------------- */}
      {currentTab === 'status' && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-[#11192E] rounded-3xl p-8 border border-accent-teal shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#334155] pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-teal/10 rounded-full flex items-center justify-center border border-accent-teal/30">
                  <Activity className="w-6 h-6 text-accent-teal" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-2xl">All Operational Trunks Secure</h1>
                  <p className="text-xs text-slate-400">System metrics checked globally for real-time latency.</p>
                </div>
              </div>
              <span className="bg-accent-teal/15 text-accent-teal px-4 py-1.5 rounded-full font-mono text-xs font-semibold">
                ● Status Operational
              </span>
            </div>

            {/* Individual services */}
            <div className="space-y-6">
              {statusIncidents.map((incident, i) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-white">{incident.service}</h4>
                    <p className="text-[10px] text-slate-400">Average historic uptime index: {incident.uptime}</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    {incident.history.map((pt, j) => (
                      <span key={j} className="w-2 h-6 bg-accent-teal rounded-sm" />
                    ))}
                    <span className="text-[10px] text-slate-400 font-mono pl-2">90D Uptime OK</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent incidents */}
            <div className="border-t border-[#334155] pt-6">
              <h3 className="font-display font-bold text-lg mb-3">Historical Incident Feed</h3>
              <p className="text-xs text-slate-450 leading-relaxed font-light">
                No major outages reported during May 2026. Uptime maintained securely over Cloud Run geo-redundancy routers with failovers active.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Generic Site Footer */}
      <footer className="w-full bg-[#070B16] border-t border-[#1E293B] mt-28 relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-brand-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            {/* Branding Column */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setTab('home')}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-white animate-fade-in">
                  NexDial<span className="text-[#00C2FF]">.io</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                Next-generation cloud-native predictive dialer & AI copilot CRM platform engineered to scale outbound high-velocity campaigns, customer surveys, and automated lead intelligence with custom-tailored precision.
              </p>
              <div className="flex items-center gap-4 text-slate-400 flex-wrap">
                <span className="text-[10px] font-mono border border-slate-800 bg-[#0A0E1A] px-2 py-1 rounded text-slate-450 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Operational
                </span>
                <span className="text-[10px] font-mono border border-slate-800 bg-[#0A0E1A] px-2 py-1 rounded text-slate-450 flex items-center gap-1.5 shadow-sm">
                  <Shield className="w-3 h-3 text-brand-primary" />
                  SOC2 Certified
                </span>
              </div>
            </div>

            {/* Core Products Column */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">Core Products</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('features')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Cloud Auto Dialer
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('ai-voice')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Gemini Live Coaching
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('features')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Interactive IVR Builder
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('integrations')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Salesforce Integration
                </li>
              </ul>
            </div>

            {/* SaaS Company Column */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">SaaS Company</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('about')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> About Corporate
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('careers')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Careers (Positions)
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('status')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Live Cloud Status
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('blog')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Telephony Dispatch
                </li>
              </ul>
            </div>

            {/* Developers / Legal Column */}
            <div className="space-y-4 col-span-1">
              <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest border-l-2 border-brand-primary pl-2">Security & Legal</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => alert("Terms elements: GDPR Compliant, standard corporate SaaS SLA active for users. Delaware Corporate jurisdiction.")}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Terms of Service
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => alert("Privacy specifications: Full HIPAA ready compartmentalization for patient audio recordings.")}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Privacy Policy
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => alert("GDPR Compliance certification registered under index GDP-Nex-4027. All tracking opt-out switches available.")}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> GDPR Compliance
                </li>
                <li className="cursor-pointer hover:text-white hover:translate-x-1 duration-150 transition-all flex items-center gap-1" onClick={() => setTab('docs')}>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" /> Core Web API Docs
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Footer Bottom Bar */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#1E293B] gap-4 text-xs text-slate-500 font-light">
            <div>
              © 2026 NexDial.io Communications. Handcrafted by <a href="https://dattasable.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-secondary underline transition-all font-medium">Datta Sable</a> with ultimate design precision.
            </div>
            <div className="flex items-center gap-6 text-slate-500 text-xs">
              <span className="hover:text-slate-350 cursor-pointer transition-colors" onClick={() => alert("NexDial.io SLA: 99.99% uptime guarantee with multi-cloud fallback")}>99.99% SLA Uptime</span>
              <span>•</span>
              <span className="hover:text-slate-350 cursor-pointer transition-colors" onClick={() => setTab('status')}>Global Edge Status</span>
              <span>•</span>
              <span className="hover:text-slate-350 cursor-pointer transition-colors" onClick={() => setTab('docs')}>API v1.14.2</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Minimal placeholder interfaces for custom input typing
export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  accentColor?: string;
}
