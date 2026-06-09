import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, PhoneCall, BarChart3, Clock, Sparkles, AlertCircle, Play, ChevronRight,
  Server, Headphones, MessageSquare, PhoneForwarded, Send, Volume2, ShieldCheck, Heart, User,
  Activity, RefreshCw, BarChart, Sliders, CheckCircle, Brain, Smile, Flame, Coffee, Battery, 
  ThumbsUp, HelpCircle, PhoneOff, Calendar, Award
} from 'lucide-react';
import { Contact, CallLog, Campaign, Agent } from '../types';

interface DashboardViewProps {
  mode?: 'agent' | 'admin';
  agents?: Agent[];
  setAgents?: React.Dispatch<React.SetStateAction<Agent[]>>;
  contacts: Contact[];
  callLogs: CallLog[];
  campaigns: Campaign[];
  onSetTab: (tab: any) => void;
  onOpenDialerForContact?: (contact: Contact) => void;
}

// Simulated active conversation transcript turns for the listening console
const SIMULATED_CONVERSATIONS: Record<string, { speaker: 'agent' | 'customer' | 'system'; text: string; timestamp: string }[]> = {
  'ag-2': [
    { speaker: 'agent', text: 'Thank you for calling NexDial support. This is John. How can I help you today?', timestamp: '10:02:00' },
    { speaker: 'customer', text: 'Hi John, I need to check if your voice streams support low-latency OPUS encoding.', timestamp: '10:02:10' },
    { speaker: 'agent', text: 'Yes, we use the G.711 and OPUS codecs dynamically to ensure high voice quality.', timestamp: '10:02:22' },
    { speaker: 'customer', text: 'Great, we have about 40 agents working simultaneously. Will we face bandwidth issues?', timestamp: '10:02:35' },
    { speaker: 'agent', text: 'Not at all. Our WebRTC gateways handle load balancing across AWS clusters automatically.', timestamp: '10:02:48' },
    { speaker: 'customer', text: 'Perfect. Let me verify the compliance parameters for recording retention.', timestamp: '10:03:00' },
    { speaker: 'agent', text: 'All voice recordings are securely stored and encrypted at rest with AES-256 keys.', timestamp: '10:03:12' },
    { speaker: 'customer', text: 'Excellent, I will proceed with standard tenant activation.', timestamp: '10:03:25' }
  ],
  'ag-1': [
    { speaker: 'agent', text: 'Hello, this is Dattatray. I am calling regarding your enterprise demo request.', timestamp: '14:10:05' },
    { speaker: 'customer', text: 'Hi Dattatray, we reviewed the pricing sheet and want to move forward.', timestamp: '14:10:15' },
    { speaker: 'agent', text: 'Wonderful! We will configure a custom 150-agent predictive dialer for your group.', timestamp: '14:10:28' },
    { speaker: 'customer', text: 'Does that include the AI Live Coach feature for whisper tips?', timestamp: '14:10:40' },
    { speaker: 'agent', text: 'Yes, the AI Suite includes live sentiment monitoring and real-time guidance.', timestamp: '14:10:52' }
  ],
  'ag-3': [
    { speaker: 'agent', text: 'Hello, Sarah here. I see your dynamic IVR routing flow is throwing errors?', timestamp: '11:15:05' },
    { speaker: 'customer', text: 'Yes, callers are hitting the voicemail fallback instead of the standard queue.', timestamp: '11:15:15' },
    { speaker: 'agent', text: 'Ah, let me check the dial plan connection triggers in your workspace.', timestamp: '11:15:28' },
    { speaker: 'customer', text: 'Thank you. It looks like the gather-input trigger was set to a different digit key.', timestamp: '11:15:40' }
  ],
  'agent-ai': [
    { speaker: 'agent', text: 'Welcome to NexDial. I am Liam, your AI voice receptionist. Please speak your inquiry.', timestamp: '14:20:00' },
    { speaker: 'customer', text: 'I need to connect with the billing department.', timestamp: '14:20:10' },
    { speaker: 'agent', text: 'Understood. Transferring you to Stripe Billing gateway agents queue. Hold on.', timestamp: '14:20:20' }
  ]
};

// Help mapping agent ID to simulated active customer
const getAgentActiveCustomer = (agentId: string): string => {
  switch (agentId) {
    case 'ag-1': return 'Robert Stark';
    case 'ag-2': return 'Dr. Evelyn Martinez';
    case 'ag-3': return 'Marcus Vance';
    case 'agent-ai': return 'Amara Okafor';
    default: return '—';
  }
};

export default function DashboardView({ 
  mode,
  agents = [],
  setAgents,
  contacts, 
  callLogs, 
  campaigns, 
  onSetTab,
  onOpenDialerForContact
}: DashboardViewProps) {
  
  // Dashboard States (For Admin Dialer Monitor)
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('ag-2');
  const [activeListenAgentId, setActiveListenAgentId] = useState<string | null>(null);
  
  // Live Monitor Panel Simulation
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [whisperInput, setWhisperInput] = useState('');
  const [whisperSuccessMsg, setWhisperSuccessMsg] = useState('');
  const [bargeSuccessMsg, setBargeSuccessMsg] = useState('');
  const [isBarged, setIsBarged] = useState(false);
  
  // Selected Agent Scorecard Sliders
  const [compliance, setCompliance] = useState(90);
  const [softSkills, setSoftSkills] = useState(90);
  const [productKnowledge, setProductKnowledge] = useState(90);
  const [scriptAdherence, setScriptAdherence] = useState(90);
  const [scorecardSaved, setScorecardSaved] = useState(false);

  // Auto-increment transcript scrolling turns when listening
  useEffect(() => {
    if (!activeListenAgentId) return;
    setTranscriptIndex(1); // Start with first turn
    const interval = setInterval(() => {
      setTranscriptIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeListenAgentId]);

  // Sync scorecard sliders when selectedAgent changes
  useEffect(() => {
    if (!selectedAgentId) return;
    const ag = agents.find(a => a.id === selectedAgentId);
    if (ag) {
      setCompliance(ag.qualityScore);
      setSoftSkills(Math.max(50, ag.qualityScore - 4));
      setProductKnowledge(Math.min(100, ag.qualityScore + 2));
      setScriptAdherence(ag.qualityScore);
      setScorecardSaved(false);
    }
  }, [selectedAgentId, agents]);

  // Compute standard Agent Dashboard stats
  const totalLeads = contacts.length;
  const contactedLeads = contacts.filter(c => c.status !== 'Lead').length;
  const closedWonRevenue = contacts
    .filter(c => c.status === 'Closed_Won')
    .reduce((sum, c) => sum + (c.revenueValue || 0), 0);
  const avgQA = Math.round(callLogs.reduce((acc, log) => acc + log.score, 0) / (callLogs.length || 1)) || 92;
  const activeCampaignsCount = campaigns.filter(c => c.status === 'Active').length;

  if (mode === 'admin') {
    // Computes for Live Admin Dialer view
    const loggedInAgentsCount = agents.filter(a => a.status !== 'Offline').length;
    const idleAgentsCount = agents.filter(a => a.status === 'Available' || a.status === 'Idle').length;
    const onCallAgentsCount = agents.filter(a => a.status === 'On Call').length;
    
    // Aggregated talktime formatted
    const totalTalkTimeSecs = agents.reduce((sum, a) => sum + a.talkTime, 0);
    const formatTalkTime = (totalSecs: number) => {
      const hrs = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      return `${hrs}h ${mins}m`;
    };

    // Total calls aggregated
    const totalCallsToday = agents.reduce((sum, a) => sum + a.callsToday, 0);
    
    // Weighted Admin Conversion Rate (calculated from campaigns success rates)
    const activeCampaignSuccessSum = campaigns.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.successRate, 0);
    const avgCampaignConversion = activeCampaignsCount ? Math.round(activeCampaignSuccessSum / activeCampaignsCount * 10) / 10 : 72.4;

    // Sentiment ratio counters (live + baseline)
    const posCount = callLogs.filter(l => l.sentiment === 'Positive').length + 312;
    const neuCount = callLogs.filter(l => l.sentiment === 'Neutral').length + 128;
    const negCount = callLogs.filter(l => l.sentiment === 'Negative').length + 48;
    const totalSent = posCount + neuCount + negCount || 1;

    const posPct = Math.round((posCount / totalSent) * 100);
    const neuPct = Math.round((neuCount / totalSent) * 100);
    const negPct = Math.round((negCount / totalSent) * 100);

    // SVG Chart points
    const points = [
      { x: 30, y: 160, day: 'Mon', count: 120 },
      { x: 100, y: 110, day: 'Tue', count: 240 },
      { x: 170, y: 130, day: 'Wed', count: 190 },
      { x: 240, y: 60, day: 'Thu', count: 340 },
      { x: 310, y: 80, day: 'Fri', count: 290 },
      { x: 380, y: 140, day: 'Sat', count: 150 },
      { x: 450, y: 40, day: 'Sun', count: 420 },
    ];

    const linePathStr = points.map(p => `${p.x},${p.y}`).join(' L ');
    const areaPathStr = `M ${points[0].x},180 L ${linePathStr} L ${points[points.length - 1].x},180 Z`;

    const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];
    
    // Filter call logs for selected agent
    const selectedAgentCallLogs = callLogs.filter(log => {
      if (!selectedAgent) return false;
      const firstName = selectedAgent.name.split(' ')[0].toLowerCase();
      return log.agentName.toLowerCase().includes(firstName);
    });

    const handleSendWhisper = (e: React.FormEvent) => {
      e.preventDefault();
      if (!whisperInput.trim() || !activeListenAgentId) return;
      const target = agents.find(a => a.id === activeListenAgentId);
      if (target) {
        setWhisperSuccessMsg(`Whisper tip injected to ${target.name}'s HUD: "${whisperInput}"`);
        setWhisperInput('');
        setTimeout(() => setWhisperSuccessMsg(''), 4000);
      }
    };

    const handleToggleBarge = () => {
      if (!activeListenAgentId) return;
      
      const newBargeState = !isBarged;
      setIsBarged(newBargeState);
      
      if (setAgents) {
        setAgents(prev => prev.map(a => {
          if (a.id === activeListenAgentId) {
            // Alter state to simulate 3-way conference
            return {
              ...a,
              status: newBargeState ? 'On Call' : 'On Call', // Remains On Call but we can display state
            };
          }
          return a;
        }));
      }

      if (newBargeState) {
        setBargeSuccessMsg('Active Barge-in established. 3-way conference bridge connected.');
        setTimeout(() => setBargeSuccessMsg(''), 4500);
      } else {
        setBargeSuccessMsg('Barge bridge terminated. Back to standard monitoring mode.');
        setTimeout(() => setBargeSuccessMsg(''), 3000);
      }
    };

    const handleSaveScorecard = () => {
      if (!selectedAgentId || !setAgents) return;
      const weightedScore = Math.round((compliance * 0.3) + (softSkills * 0.3) + (productKnowledge * 0.25) + (scriptAdherence * 0.15));
      
      setAgents(prev => prev.map(a => {
        if (a.id === selectedAgentId) {
          return {
            ...a,
            qualityScore: weightedScore
          };
        }
        return a;
      }));

      setScorecardSaved(true);
      setTimeout(() => setScorecardSaved(false), 3000);
    };

    // Calculate current dynamic QA Score based on sliders
    const currentSlidersQA = Math.round((compliance * 0.3) + (softSkills * 0.3) + (productKnowledge * 0.25) + (scriptAdherence * 0.15));

    return (
      <div className="space-y-6">
        <style>{`
          @keyframes equalizer {
            0% { height: 12%; }
            100% { height: 100%; }
          }
          .animate-eq-1 { animation: equalizer 0.8s ease-in-out infinite alternate; }
          .animate-eq-2 { animation: equalizer 0.5s ease-in-out infinite alternate; }
          .animate-eq-3 { animation: equalizer 1.1s ease-in-out infinite alternate; }
          .animate-eq-4 { animation: equalizer 0.7s ease-in-out infinite alternate; }
          .animate-eq-5 { animation: equalizer 0.9s ease-in-out infinite alternate; }
        `}</style>

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">Supervisor Operations Cockpit</h2>
            <p className="text-xs text-slate-450 mt-1 font-light">Realtime live dialer monitoring, supervisor barge/whisper consoles, and agent performance QA analytics.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-2.5 py-0.5 rounded uppercase font-semibold">Live Dialing Stream</span>
          </div>
        </div>

        {/* Admin KPI Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">Logged In</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{loggedInAgentsCount}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Active extensions</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">Idle Agents</span>
              <Coffee className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{idleAgentsCount}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Ready to take calls</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">On Call</span>
              <PhoneCall className="w-4 h-4 text-[#00C2FF]" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{onCallAgentsCount}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Active voice sessions</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">Total Calls</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{totalCallsToday}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Processed sweeps today</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">Total Talktime</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{formatTalkTime(totalTalkTimeSecs)}</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Aggregated VoIP pipes</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[9px] uppercase font-mono tracking-wider">Campaign Conv.</span>
              <TrendingUp className="w-4 h-4 text-[#00E5B0]" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-100">{avgCampaignConversion}%</p>
              <p className="text-[9px] text-emerald-400 mt-0.5 font-mono">↑ 1.2% SLA TARGET</p>
            </div>
          </div>
        </div>

        {/* Dashboard Analytics/Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart 1: Dialing Frequency Spectrum */}
          <div className="bg-[#0E0E10] border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">Dialing Frequency</h4>
                <p className="text-[9px] text-slate-500 font-mono tracking-wide mt-0.5">Dialed contacts volume trends vs Day schedule</p>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Call Volume Baseline</span>
              </div>
            </div>

            <div className="w-full">
              <svg viewBox="0 0 480 200" className="w-full h-40 select-none">
                <defs>
                  <linearGradient id="dashChartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B5EFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5B5EFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <line x1="10" y1="180" x2="470" y2="180" stroke="#1E293B" strokeWidth="1" />
                
                {points.map((p, i) => (
                  <g key={i}>
                    <line x1={p.x} y1="30" x2={p.x} y2="180" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x={p.x} y="195" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">{p.day}</text>
                    <circle cx={p.x} cy={p.y} r="4" fill="#00E5B0" stroke="#5B5EFF" strokeWidth="1.5" />
                    <text x={p.x} y={p.y - 10} fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{p.count}</text>
                  </g>
                ))}

                <path d={areaPathStr} fill="url(#dashChartGlow)" />
                <path d={`M ${linePathStr}`} fill="none" stroke="#5B5EFF" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Chart 2: Call Channels Bar Chart */}
          <div className="bg-[#0E0E10] border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="border-b border-slate-900 pb-2.5">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">Call Channels</h4>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">Weekly Call directions ratio</p>
            </div>

            <div className="w-full py-2">
              <svg viewBox="0 0 200 120" className="w-full h-32 select-none">
                {/* Y-axis gridlines */}
                <line x1="45" y1="10" x2="45" y2="100" stroke="#1E293B" strokeWidth="1" />
                <line x1="45" y1="100" x2="190" y2="100" stroke="#1E293B" strokeWidth="1" />
                <line x1="81.25" y1="10" x2="81.25" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="117.5" y1="10" x2="117.5" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="153.75" y1="10" x2="153.75" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="190" y1="10" x2="190" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* X-axis labels at bottom */}
                <text x="45" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">0%</text>
                <text x="81.25" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">25%</text>
                <text x="117.5" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">50%</text>
                <text x="153.75" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">75%</text>
                <text x="190" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">100%</text>

                {/* Outbound (60%): 60% of 145px is 87px */}
                <rect x="45" y="20" width="87" height="14" rx="3" fill="#818CF8" />
                <text x="40" y="30" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">OUT</text>
                <text x="137" y="30" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">60%</text>

                {/* Inbound (25%): 25% of 145px is 36.25px */}
                <rect x="45" y="50" width="36.25" height="14" rx="3" fill="#00C2FF" />
                <text x="40" y="60" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">IN</text>
                <text x="86.25" y="60" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">25%</text>

                {/* AI Automated (15%): 15% of 145px is 21.75px */}
                <rect x="45" y="80" width="21.75" height="14" rx="3" fill="#00E5B0" />
                <text x="40" y="90" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">AI</text>
                <text x="71.75" y="90" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">15%</text>
              </svg>
            </div>

            <div className="space-y-1.5 text-[9px] font-mono">
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                  <span className="text-slate-400">Outbound:</span>
                </div>
                <span className="text-slate-200 font-bold">60.0%</span>
              </div>
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                  <span className="text-slate-400">Inbound:</span>
                </div>
                <span className="text-slate-200 font-bold">25.0%</span>
              </div>
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                  <span className="text-slate-400">AI Automated:</span>
                </div>
                <span className="text-slate-200 font-bold">15.0%</span>
              </div>
            </div>
          </div>

          {/* Chart 3: Call Sentiment Donut Chart */}
          <div className="bg-[#0E0E10] border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="border-b border-slate-900 pb-2.5">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">Call Sentiment</h4>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">Speech tone & mood vectors</p>
            </div>

            <div className="flex justify-center items-center relative py-4">
              <svg width="140" height="140" viewBox="0 0 36 36" className="w-28 h-28 select-none transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00E5B0" strokeWidth="3.5" strokeDasharray={`${posPct} ${100 - posPct}`} strokeDashoffset="100" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00C2FF" strokeWidth="3.5" strokeDasharray={`${neuPct} ${100 - neuPct}`} strokeDashoffset={`${100 - posPct}`} />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeDasharray={`${negPct} ${100 - negPct}`} strokeDashoffset={`${100 - posPct - neuPct}`} />
              </svg>
              <div className="absolute text-center">
                <span className="text-[7px] text-slate-500 font-mono block">Positive Ratio</span>
                <span className="text-lg font-display font-black text-[#00E5B0]">{posPct}%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[9px] font-mono">
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                  <span className="text-slate-400">Positive:</span>
                </div>
                <span className="text-slate-200 font-bold">{posPct}%</span>
              </div>
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                  <span className="text-slate-400">Neutral:</span>
                </div>
                <span className="text-slate-200 font-bold">{neuPct}%</span>
              </div>
              <div className="flex justify-between items-center bg-[#070708] px-3 py-1.5 rounded-xl border border-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                  <span className="text-slate-400">Negative:</span>
                </div>
                <span className="text-slate-200 font-bold">{negPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Supervisor Monitor split layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Live Agents grid table & Coaching console */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Live Agents Grid Table */}
            <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00C2FF]" />
                  <h3 className="text-xs uppercase font-mono tracking-wider text-slate-200 font-bold">Live Representatives Extensions Monitor</h3>
                </div>
                <span className="text-[9px] text-slate-550 font-mono">Click agent to examine performance drilldowns</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800/60 text-slate-500 uppercase font-mono text-[9px] tracking-wider">
                      <th className="py-2.5">Agent Details</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5">Calls Today</th>
                      <th className="py-2.5">Talktime</th>
                      <th className="py-2.5">Active Call Context</th>
                      <th className="py-2.5">QA Rating</th>
                      <th className="py-2.5 text-right">Supervisor Live Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/40">
                    {agents.map((ag) => {
                      const isActiveCustomer = ag.status === 'On Call' || ag.status === 'Available'; // simulation contexts
                      const customerName = (ag.status === 'On Call') ? getAgentActiveCustomer(ag.id) : '—';
                      const isSelected = selectedAgentId === ag.id;

                      return (
                        <tr 
                          key={ag.id} 
                          className={`hover:bg-slate-900/35 transition-colors cursor-pointer group ${
                            isSelected ? 'bg-indigo-950/10 border-l-2 border-indigo-500' : ''
                          }`}
                          onClick={() => setSelectedAgentId(ag.id)}
                        >
                          <td className="py-3 pr-2">
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={ag.avatar} 
                                alt={ag.name}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full border border-slate-800 object-cover shrink-0" 
                              />
                              <div>
                                <p className="font-bold text-slate-200 hover:text-indigo-400 transition-colors">{ag.name}</p>
                                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tight">{ag.role.replace('_', ' ')} • Ext {ag.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full relative flex shrink-0`}>
                                {ag.status !== 'Offline' && (
                                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                    ag.status === 'Available' ? 'bg-emerald-400' :
                                    ag.status === 'On Call' ? 'bg-indigo-400' : 'bg-amber-400'
                                  }`}></span>
                                )}
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                  ag.status === 'Available' ? 'bg-emerald-500' :
                                  ag.status === 'On Call' ? 'bg-indigo-500' :
                                  ag.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-700'
                                }`}></span>
                              </span>
                              <span className="font-mono text-[10px] text-slate-350">{ag.status}</span>
                            </div>
                          </td>

                          <td className="py-3 font-mono text-[10px] font-semibold text-slate-300">
                            {ag.callsToday}
                          </td>

                          <td className="py-3 font-mono text-[10px] text-slate-400">
                            {Math.round(ag.talkTime / 60)}m
                          </td>

                          <td className="py-3">
                            {ag.status === 'On Call' ? (
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                <span className="font-medium text-indigo-400 truncate max-w-[120px]">{customerName}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>

                          <td className="py-3 font-mono text-[10px]">
                            <span className={`font-bold px-1.5 py-0.5 rounded ${
                              ag.qualityScore >= 90 ? 'text-emerald-400 bg-emerald-950/20' :
                              ag.qualityScore >= 80 ? 'text-[#00C2FF] bg-[#00C2FF]/10' : 'text-amber-400 bg-amber-950/20'
                            }`}>
                              {ag.qualityScore}%
                            </span>
                          </td>

                          <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setActiveListenAgentId(ag.id === activeListenAgentId ? null : ag.id);
                                  setIsBarged(false);
                                }}
                                disabled={ag.status === 'Offline'}
                                className={`p-1.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                  activeListenAgentId === ag.id 
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' 
                                    : ag.status === 'Offline' 
                                      ? 'bg-slate-900 text-slate-600 border-slate-900 cursor-not-allowed'
                                      : 'bg-indigo-950/20 text-indigo-400 border-indigo-500/10 hover:bg-indigo-600 hover:text-white'
                                }`}
                                title={activeListenAgentId === ag.id ? "Disconnect supervisor monitoring" : "Listen in live call stream"}
                              >
                                <Headphones className="w-3.5 h-3.5" />
                                <span className="hidden md:inline">{activeListenAgentId === ag.id ? 'Monitoring' : 'Listen'}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Supervisor Coaching Live Console (Listen In) */}
            {activeListenAgentId && (
              <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl relative overflow-hidden animate-fade-in">
                {/* Visual grid backdrop lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3.5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400">
                      <Volume2 className="w-4.5 h-4.5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-200">
                        VoIP Audio interception console
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Interrogating SIP extensions trunks • Channel: <span className="text-[#00C2FF] font-bold">Trunk-US-East-3</span>
                      </p>
                    </div>
                  </div>

                  {/* Equalizer animation wrapper */}
                  <div className="flex items-center gap-3 bg-[#0A0A0B] border border-slate-850 px-3.5 py-1.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-mono">Equalizer:</span>
                    <div className="flex items-end gap-1 h-5 w-16">
                      <div className="w-1 bg-[#818CF8] rounded animate-eq-1" style={{ height: '30%' }}></div>
                      <div className="w-1 bg-[#00C2FF] rounded animate-eq-2" style={{ height: '70%', animationDelay: '0.1s' }}></div>
                      <div className="w-1 bg-[#00E5B0] rounded animate-eq-3" style={{ height: '40%', animationDelay: '0.3s' }}></div>
                      <div className="w-1 bg-indigo-500 rounded animate-eq-4" style={{ height: '90%', animationDelay: '0.2s' }}></div>
                      <div className="w-1 bg-[#00C2FF] rounded animate-eq-5" style={{ height: '50%', animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>

                {/* Subtitle active state description */}
                <div className="flex justify-between items-center text-[10px] font-mono bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 relative z-10">
                  <div className="text-slate-350">
                    Agent: <span className="text-slate-100 font-bold">{agents.find(a => a.id === activeListenAgentId)?.name}</span> • 
                    Customer: <span className="text-[#00C2FF] font-bold">{getAgentActiveCustomer(activeListenAgentId)}</span>
                  </div>
                  <span className="text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                    SUPERVISOR_EAVESDROP_ON
                  </span>
                </div>

                {/* System notification feedback messages */}
                {whisperSuccessMsg && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-xs flex items-center gap-2 animate-fade-in relative z-10">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{whisperSuccessMsg}</span>
                  </div>
                )}

                {bargeSuccessMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-fade-in relative z-10">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{bargeSuccessMsg}</span>
                  </div>
                )}

                {/* Live Transcript Stream Simulator */}
                <div className="bg-[#0A0A0B] border border-slate-900 rounded-2xl p-4.5 space-y-3.5 max-h-56 overflow-y-auto custom-scrollbar relative z-10">
                  <p className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-slate-650 mb-1">Live Dialog stream (Auto-scrolling)</p>
                  
                  {(() => {
                    const dialogueList = SIMULATED_CONVERSATIONS[activeListenAgentId] || [];
                    const activeTurns = dialogueList.slice(0, Math.min(dialogueList.length, transcriptIndex));
                    
                    if (activeTurns.length === 0) {
                      return (
                        <div className="text-center py-6 text-slate-600 font-mono text-[10px]">
                          Initialising SIP WebRTC transport stream buffer...
                        </div>
                      );
                    }

                    return activeTurns.map((turn, idx) => (
                      <div 
                        key={idx} 
                        className={`flex gap-3 text-xs leading-relaxed animate-fade-in ${
                          turn.speaker === 'agent' ? 'text-indigo-300' : 'text-slate-350'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-slate-600 shrink-0 font-bold">
                          [{turn.timestamp || 'Live'}]
                        </span>
                        <div className="min-w-0">
                          <span className="font-mono uppercase text-[9px] font-black mr-2 tracking-wider">
                            {turn.speaker === 'agent' ? 'Agent HUD' : 'Customer Line'}:
                          </span>
                          <span className="font-light">{turn.text}</span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Supervisor controls: Whisper & Barge-in trigger forms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-2">
                  {/* Whisper tips HUD coach */}
                  <form onSubmit={handleSendWhisper} className="bg-[#0A0A0B] border border-slate-900 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">HUD Whisper Coach</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-light leading-snug">
                      Inject textual advice directly onto the agent's screen HUD. The active customer cannot hear this.
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={whisperInput}
                        onChange={(e) => setWhisperInput(e.target.value)}
                        placeholder="e.g. Try offering a 10% compliance discount..."
                        className="flex-1 px-3 py-1.5 bg-[#0E0E10] border border-slate-800 text-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 text-xs placeholder:text-slate-600"
                      />
                      <button 
                        type="submit"
                        className="px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer"
                        title="Transmit tip to HUD"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* Barge-In active bridge trigger */}
                  <div className="bg-[#0A0A0B] border border-slate-900 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <PhoneForwarded className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Three-way Bridge Barge</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-light leading-snug">
                        Actively merge yourself into the calling queue trunk. Both the agent and customer will establish a three-way call bridge.
                      </p>
                    </div>
                    
                    <button
                      onClick={handleToggleBarge}
                      className={`w-full py-2 border font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isBarged 
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-700/10'
                      }`}
                    >
                      {isBarged ? (
                        <>
                          <PhoneOff className="w-4 h-4" />
                          <span>Hangup Supervisor Bridge</span>
                        </>
                      ) : (
                        <>
                          <PhoneForwarded className="w-4 h-4" />
                          <span>Barge-in (Join Call)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT: Individual Agent Performance Analyzer Drilldown */}
          <div className="space-y-6">
            
            {selectedAgent ? (
              <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl relative overflow-hidden">
                
                {/* Agent Profile Summary */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedAgent.avatar} 
                      alt={selectedAgent.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border-2 border-indigo-500/30 object-cover shrink-0" 
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">{selectedAgent.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-mono">{selectedAgent.role.replace('_', ' ')}</span>
                        <span className="text-[10px] text-slate-650">•</span>
                        <span className="text-[10px] text-slate-400 font-mono">Ext {selectedAgent.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase ${
                      selectedAgent.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      selectedAgent.status === 'On Call' ? 'bg-indigo-500/10 text-[#818CF8] border border-indigo-500/20' :
                      selectedAgent.status === 'Idle' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {selectedAgent.status}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">Mood: {selectedAgent.sentiment}</p>
                  </div>
                </div>

                {/* Scorecard updated success chimes */}
                {scorecardSaved && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>QA Scorecard saved. Agent scorecard metrics updated.</span>
                  </div>
                )}

                {/* Aggregated Individual Stats */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-[#0A0A0B] border border-slate-900 p-3.5 rounded-2xl text-center space-y-1">
                    <span className="text-[9px] uppercase font-mono text-slate-500">Processed Calls</span>
                    <p className="text-lg font-black text-slate-200">{selectedAgent.callsToday}</p>
                  </div>
                  <div className="bg-[#0A0A0B] border border-slate-900 p-3.5 rounded-2xl text-center space-y-1">
                    <span className="text-[9px] uppercase font-mono text-slate-500">Global QA Score</span>
                    <p className="text-lg font-black text-[#00C2FF]">{selectedAgent.qualityScore}%</p>
                  </div>
                </div>

                {/* Custom SVG Performance Area Chart */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                    Call Load Distribution (Hourly)
                  </h4>
                  <div className="bg-[#0A0A0B] border border-slate-900 rounded-2xl p-4.5 flex flex-col justify-center">
                    <svg viewBox="0 0 300 100" className="w-full h-24 overflow-visible">
                      <defs>
                        <linearGradient id="glow-area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {/* Grid Guide Lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                      
                      {/* Area Area */}
                      <path 
                        d="M0,80 Q30,30 60,60 T120,20 T180,55 T240,30 T300,45 L300,100 L0,100 Z" 
                        fill="url(#glow-area)" 
                      />
                      {/* Area Line */}
                      <path 
                        d="M0,80 Q30,30 60,60 T120,20 T180,55 T240,30 T300,45" 
                        fill="none" 
                        stroke="#00C2FF" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                      {/* Active points */}
                      <circle cx="60" cy="60" r="3" fill="#818CF8" stroke="#0A0A0B" strokeWidth="1" />
                      <circle cx="120" cy="20" r="3" fill="#00E5B0" stroke="#0A0A0B" strokeWidth="1" />
                      <circle cx="240" cy="30" r="3" fill="#00C2FF" stroke="#0A0A0B" strokeWidth="1" />
                    </svg>
                    <div className="flex justify-between items-center text-[8px] text-slate-550 font-mono mt-1 px-1">
                      <span>09:00 AM</span>
                      <span>12:00 PM</span>
                      <span>03:00 PM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Interactive QA Scorecard Adjuster */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                      QA Scorecard Adjuster
                    </h4>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">
                      Target: {currentSlidersQA}%
                    </span>
                  </div>

                  <div className="bg-[#0A0A0B] border border-slate-900 rounded-2xl p-4.5 space-y-4 text-xs font-mono">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Compliance & Script Adherence (30%)</span>
                        <span className="text-slate-300 font-bold">{compliance}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="100" 
                        value={compliance}
                        onChange={(e) => setCompliance(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Soft Skills & Active Listening (30%)</span>
                        <span className="text-slate-300 font-bold">{softSkills}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="100" 
                        value={softSkills}
                        onChange={(e) => setSoftSkills(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00C2FF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Product Knowledge & Accuracy (25%)</span>
                        <span className="text-slate-300 font-bold">{productKnowledge}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="100" 
                        value={productKnowledge}
                        onChange={(e) => setProductKnowledge(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5B0]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Hold Time & Conversation Flow (15%)</span>
                        <span className="text-slate-300 font-bold">{scriptAdherence}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="100" 
                        value={scriptAdherence}
                        onChange={(e) => setScriptAdherence(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                      />
                    </div>

                    <button
                      onClick={handleSaveScorecard}
                      className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Update Extension Scorecard</span>
                    </button>
                  </div>
                </div>

                {/* Call Log History Archive for this Agent */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                    Recent Outbound Transcripts
                  </h4>
                  
                  <div className="space-y-2">
                    {selectedAgentCallLogs.length === 0 ? (
                      <div className="p-4 bg-[#0A0A0B] border border-slate-900 rounded-xl text-center text-[10px] text-slate-600 font-mono">
                        No recent archived recordings found.
                      </div>
                    ) : (
                      selectedAgentCallLogs.map((log) => (
                        <div key={log.id} className="p-3 bg-[#0A0A0B] border border-slate-900 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-200 font-bold">{log.contactName}</span>
                            <span className="text-slate-500">{Math.round(log.duration / 60)}m {log.duration % 60}s</span>
                          </div>
                          <p className="text-[11px] text-slate-450 font-light leading-relaxed">
                            {log.summary}
                          </p>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-900/60 text-[9px] font-mono">
                            <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-850 text-indigo-400 uppercase font-black">
                              Sentiment: {log.sentiment}
                            </span>
                            <span className="text-[#00C2FF] font-bold">
                              Score: {log.score}%
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#0E0E10] border border-slate-800 rounded-2xl text-slate-500 font-light text-xs">
                Select an active representative line to audit performance logs.
              </div>
            )}

          </div>

        </div>

      </div>
    );
  }

  // STANDARD AGENT DIRECT COCKPIT DASHBOARD VIEWPORT
  return (
    <div className="space-y-6">
      {/* Visual Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">Hub Commander Dashboard</h2>
          <p className="text-xs text-slate-450 mt-1 font-light">Realtime orchestration indices for inbound VoIP pipelines, AI dispatching, and outreach conversions.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-2 py-0.5 rounded uppercase">Trunks Live</span>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-2 hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Total CRM Leads</span>
            <Users className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-100">{totalLeads}</p>
            <p className="text-[10px] text-slate-500 mt-1">{contactedLeads} leads processed ({Math.round(contactedLeads / (totalLeads || 1) * 100)}%)</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-2 hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Connected Tries</span>
            <PhoneCall className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-100">{callLogs.length}</p>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">↑ 100% stable carriers</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-2 hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Active Campaigns</span>
            <Sparkles className="w-4.5 h-4.5 text-[#00C2FF]" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-100">{activeCampaignsCount}</p>
            <p className="text-[10px] text-slate-500 mt-1">{campaigns.length} configured pipelines</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0E0E10] space-y-2 hover:border-slate-700 transition-all">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Estimated Revenue</span>
            <TrendingUp className="w-4.5 h-4.5 text-[#00E5B0]" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-100">${closedWonRevenue.toLocaleString()}</p>
            <p className="text-[10px] text-slate-500 mt-1">From qualified Won CRM deals</p>
          </div>
        </div>
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Quick Actions and Campaign Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">Outstanding Outreach Campaigns</h3>
              <button 
                onClick={() => onSetTab('campaigns')}
                className="text-[10px] text-[#00C2FF] hover:underline flex items-center gap-1 font-semibold"
              >
                Manage Schemes <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {campaigns.slice(0, 3).map((camp) => (
                <div key={camp.id} className="flex items-center justify-between p-3.5 bg-[#0A0A0B] border border-slate-900 rounded-xl">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">{camp.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">{camp.type}</span>
                      <span>Target size: {camp.contactsCount} leads</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                      camp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {camp.status}
                    </span>
                    <p className="text-xs font-bold text-slate-300 mt-1">{camp.successRate}% Success</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">Recommended Leads to Dialer</h3>
              <button 
                onClick={() => onSetTab('crm')}
                className="text-[10px] text-[#00C2FF] hover:underline flex items-center gap-1 font-semibold"
              >
                Lead Directory <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contacts.slice(0, 4).map((con) => (
                <div key={con.id} className="p-3 bg-[#0A0A0B] border border-slate-900 rounded-xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">{con.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{con.company} • {con.phone}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-950/30">
                    <span className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-indigo-400 font-bold">
                      {con.segment}
                    </span>
                    <button
                      onClick={() => onOpenDialerForContact?.(con)}
                      className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[9px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 shrink-0" />
                      <span>Dial Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Recent Logs & Call Quality Score Gauge */}
        <div className="space-y-6">
          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold border-b border-slate-900 pb-2.5">Average QA Target Score</h3>
            
            <div className="flex flex-col items-center justify-center p-4 space-y-3">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* SVG Radial Progress Arc */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="52" 
                    stroke="#1E293B" 
                    strokeWidth="8" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="52" 
                    stroke="#4F46E5" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - avgQA / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="text-center space-y-0.5 z-10">
                  <span className="text-3xl font-black text-slate-100">{avgQA}%</span>
                  <p className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">Optimal Codec</p>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 font-light px-2">
                Your outbound pitch is maintaining a strong <span className="text-indigo-400 font-bold">{avgQA}% rating</span> calculated over last {callLogs.length} simulated telemetries.
              </div>
            </div>
          </div>

          <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">Carrier Transports</h3>
              <span className="text-[9px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-1.5 py-0.5 rounded font-mono font-semibold">OK</span>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">VOIP SIP Protocol</span>
                <span className="text-slate-300">WebRTC (OPUS)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Security Cipher</span>
                <span className="text-[#00E5B0] font-semibold">SRTP / TLSv1.3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Local STUN Ring</span>
                <span className="text-[#818CF8]">STUN:twilio_edge</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
