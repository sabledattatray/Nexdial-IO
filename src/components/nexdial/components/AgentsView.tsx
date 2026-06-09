import React, { useState } from 'react';
import { 
  Users, UserPlus, ShieldAlert, Phone, Clock, Smile, Trash2, Check, AlertCircle 
} from 'lucide-react';
import { Agent } from '../types';

interface AgentsViewProps {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
}

export default function AgentsView({ agents, setAgents }: AgentsViewProps) {

  // Form states to provision a new SIP extension agent
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState<'agent' | 'team_manager' | 'admin'>('agent');
  const [isProvisionFormOpen, setIsProvisionFormOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const freshSeat: Agent = {
      id: `ag-${Date.now()}`,
      name: newAgentName,
      role: newAgentRole,
      status: 'Available',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80',
      callsToday: 0,
      talkTime: 0,
      qualityScore: 90,
      sentiment: 'Happy'
    };

    setAgents(prev => [...prev, freshSeat]);
    setNewAgentName('');
    setIsProvisionFormOpen(false);
    setNotification(`Agent extension successfully mapped to ${newAgentName}.`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDecommissionAgent = (id: string) => {
    setAgents(prev => prev.filter(ag => ag.id !== id));
  };

  const formatSecsToMins = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">SIP Dialers & Agent Seats</h2>
          <p className="text-xs text-slate-450 mt-1 font-light">Provision local VoIP SIP extensions, configure group routing, and observe real-time representatives status logs.</p>
        </div>
        <button
          onClick={() => setIsProvisionFormOpen(!isProvisionFormOpen)}
          className="px-3.5 py-1.5 bg-[#818CF8]/15 hover:bg-[#818CF8]/25 text-[#818CF8] hover:text-[#818CF8] text-xs font-bold border border-[#818CF8]/20 hover:border-[#818CF8]/40 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <UserPlus className="w-4.5 h-4.5" />
          <span>Provision Seat</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Provision input form */}
      {isProvisionFormOpen && (
        <form onSubmit={handleCreateAgent} className="p-5 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-4 animate-fade-in max-w-md">
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300">Register Outbound Gateway Extension</h3>
          
          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 pl-1 uppercase font-mono">Agent Name</label>
              <input 
                type="text" 
                placeholder="e.g. Priyanjali Sen"
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#0A0A0B] border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 pl-1 uppercase font-mono">Operations Class</label>
              <select 
                value={newAgentRole}
                onChange={(e: any) => setNewAgentRole(e.target.value)}
                className="w-full px-3 py-2 bg-[#0A0A0B] border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="agent">Standard Outbound Agent</option>
                <option value="team_manager">Lead Team Supervisor</option>
                <option value="admin">Operations SuperAdmin</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => setIsProvisionFormOpen(false)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 font-semibold border border-slate-800 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer"
              >
                Assemble Extension
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid of registered active representatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
        {agents.map((ag) => (
          <div key={ag.id} className="p-4.5 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src={ag.avatar} 
                  alt={ag.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-800 bg-[#0A0A0B] shrink-0" 
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-100 truncate">{ag.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-medium">{ag.role.replace('_', ' ')}</span>
                    <span className="text-[10px] text-slate-600 font-mono">•</span>
                    <span className="text-[9px] font-mono text-slate-500 italic">SIP_ext_{ag.id}</span>
                  </div>
                </div>
              </div>

              {/* Status capsule */}
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wide ${
                ag.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                ag.status === 'On Call' ? 'bg-indigo-500/10 text-[#818CF8] border border-indigo-500/20' :
                ag.status === 'Idle' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-slate-900 text-slate-500 border border-slate-800'
              }`}>
                {ag.status}
              </span>
            </div>

            {/* Micro details indicators */}
            <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-900 text-center font-mono text-[10px]">
              <div className="space-y-0.5">
                <p className="text-slate-500 text-[8px] uppercase tracking-wider">Processed</p>
                <p className="text-slate-200 font-bold">{ag.callsToday} calls</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-500 text-[8px] uppercase tracking-wider">Talktime</p>
                <p className="text-slate-200 font-bold">{formatSecsToMins(ag.talkTime)}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-slate-500 text-[8px] uppercase tracking-wider">QA Score</p>
                <p className="text-emerald-400 font-bold">{ag.qualityScore}%</p>
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex justify-between items-center text-[10px] pl-1 font-mono">
              <span className="text-slate-500 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-indigo-400" />
                Mood: {ag.sentiment}
              </span>

              {ag.id !== 'ag-1' && (
                <button
                  onClick={() => handleDecommissionAgent(ag.id)}
                  className="p-1 text-slate-500 hover:text-red-400 cursor-pointer rounded hover:bg-slate-900 transition-all font-bold"
                  title="Force decommission sip mapping"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
