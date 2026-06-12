"use client";

import { useState, useEffect, use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import { LeadStatus, CallOutcome } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, User, Phone, Mail, Globe, CalendarClock, Tag, 
  MessageSquare, FileText, CheckCircle2, MoreVertical, Building, MapPin,
  Sparkles, AlertTriangle, Flame
} from "lucide-react";
import Link from "next/link";
import { 
  generateLeadAISummary, 
  calculateLeadHealth, 
  auditLeadCleanliness 
} from "@/lib/crmUtils";

const STATUSES = [
  { id: "NEW", name: "New Lead" },
  { id: "CONTACTED", name: "Contacted" },
  { id: "IN_PROGRESS", name: "In Progress" },
  { id: "INTERESTED", name: "Interested" },
  { id: "CONVERTED", name: "Converted" },
  { id: "LOST", name: "Lost" },
];

export default function LeadProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Modals state
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newCall, setNewCall] = useState({ type: 'outgoing' as const, outcome: '' as CallOutcome, notes: '' });

  useEffect(() => {
    params.then(p => setResolvedParams(p));
  }, [params]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: lead, isLoading } = useQuery({
    queryKey: ["lead", resolvedParams?.id],
    queryFn: () => fetcher(`/api/leads/${resolvedParams?.id}`),
    enabled: !!resolvedParams?.id,
  });

  const updateLeadMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!resolvedParams?.id) throw new Error("Params not resolved");
      const res = await fetch(`/api/leads/${resolvedParams.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lead", resolvedParams?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
    },
  });

  const logCallMutation = useMutation({
    mutationFn: async (callData: any) => {
      const res = await fetch(`/api/calls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(callData),
      });
      if (!res.ok) throw new Error("Failed to log call");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lead", resolvedParams?.id] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
    },
  });

  if (!mounted || !resolvedParams) return null;

  if (isLoading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (!lead) return <div className="p-8 text-center text-white">Lead not found.</div>;

  const leadActivities = lead.activities || [];
  const aiSummary = generateLeadAISummary(lead);
  const health = calculateLeadHealth(lead);
  const cleanlinessWarnings = auditLeadCleanliness(lead);

  const handleStatusChange = (newStatus: string) => {
    updateLeadMutation.mutate({ status: newStatus });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateLeadMutation.mutate({ followUpDate: val ? new Date(val).toISOString() : null });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    updateLeadMutation.mutate({ notes: newNote });
    setNewNote("");
    setIsNoteOpen(false);
  };

  const handleLogCall = () => {
    logCallMutation.mutate({
      leadId: lead.id,
      type: newCall.type.toUpperCase(),
      outcome: newCall.outcome.toUpperCase().replace(" ", "_") || "NO_ANSWER",
      notes: newCall.notes,
    });
    setNewCall({ type: 'outgoing', outcome: '' as CallOutcome, notes: '' });
    setIsCallOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 bg-[#0A1628] hover:bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {lead.name}
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                lead.status === 'CONVERTED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                lead.status === 'LOST' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                'bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20'
              }`}>
                {STATUSES.find(s => s.id === lead.status)?.name || lead.status}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-[#0A1628] border border-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:border-[#00C2FF] transition-colors appearance-none pr-10 cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
          >
            {STATUSES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <button onClick={() => setIsNoteOpen(true)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/10 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Note
          </button>
          <button onClick={() => setIsCallOpen(true)} className="px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#0057D9]/20 transition-all flex items-center gap-2">
            <Phone className="w-4 h-4" /> Log Call
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Details */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          
          <div className="bg-[#0A1628] rounded-2xl border border-white/5 p-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {lead.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">{lead.name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> Source: {lead.source}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Phone Number</label>
                <div className="flex items-center gap-2 text-sm text-slate-200 bg-[#050A15] p-2.5 rounded-lg border border-white/5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  {lead.phone}
                </div>
              </div>
              
              {lead.email && (
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Email Address</label>
                  <div className="flex items-center gap-2 text-sm text-slate-200 bg-[#050A15] p-2.5 rounded-lg border border-white/5 truncate">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    {lead.email}
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 block">Follow-up Schedule</label>
                <div className="relative">
                  <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  <input 
                    type="date" 
                    value={lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ''}
                    onChange={handleDateChange}
                    className="w-full bg-[#050A15] border border-amber-500/20 text-amber-400 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            {lead.tags.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {lead.tags?.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-xs text-slate-300">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Health Score */}
            <div className="pt-4 border-t border-white/5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Lead Health Score</label>
              <div className="flex items-center gap-3 bg-[#050A15] p-3 rounded-lg border border-white/5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border shrink-0 ${
                  health.category === 'HOT' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  health.category === 'WARM' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {health.score}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {health.category === 'HOT' ? '🔥 Hot Lead' : health.category === 'WARM' ? '🟡 Warm Lead' : '❄ Cold Lead'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Calculated from status and interaction velocity
                  </span>
                </div>
              </div>
            </div>

            {/* Data Cleanliness Warnings */}
            {cleanlinessWarnings.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-2 block">CRM Cleanliness Warnings</label>
                <div className="space-y-1.5">
                  {cleanlinessWarnings.map((warn: string) => (
                    <div key={warn} className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="flex-1 bg-[#0A1628] rounded-2xl border border-white/5 flex flex-col min-h-0">
          <div className="p-5 border-b border-white/5 bg-white/[0.02]">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00C2FF]" /> Activity Timeline
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            {/* AI Summary Box */}
            <div className="bg-gradient-to-r from-[#0057D9]/20 to-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-xl p-5 mb-6 relative overflow-hidden shadow-lg shadow-[#00C2FF]/5">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-[#00C2FF] animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">AI Lead Interaction Summary</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {aiSummary}
              </p>
            </div>

            {leadActivities.map((act: any, i: number) => (
              <div key={act.id} className="relative pl-8">
                {/* Line connector */}
                {i !== leadActivities.length - 1 && (
                  <div className="absolute left-3 top-6 bottom-[-24px] w-px bg-white/10" />
                )}
                
                {/* Timeline dot */}
                <div className={`absolute left-[9px] top-1.5 w-2 h-2 rounded-full border-2 border-[#0A1628] ring-2 ${
                  act.type === 'CALL_LOGGED' ? 'bg-[#0057D9] ring-[#0057D9]/20' :
                  act.type === 'STATUS_CHANGED' ? 'bg-purple-500 ring-purple-500/20' :
                  act.type === 'NOTE_ADDED' ? 'bg-amber-500 ring-amber-500/20' :
                  'bg-emerald-500 ring-emerald-500/20'
                }`} />

                <div className="bg-[#050A15] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{act.type.replace("_", " ")}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {new Date(act.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {isNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsNoteOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0F172A] rounded-2xl border border-white/10 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Add Note</h3>
            <textarea 
              rows={4} 
              autoFocus
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full bg-[#050A15] border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00C2FF] resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsNoteOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleAddNote} className="px-6 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#0057D9]/20 transition-colors">Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Log Call Modal */}
      {isCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCallOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0F172A] rounded-2xl border border-white/10 shadow-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Log a Call</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Call Type</label>
                <select 
                  value={newCall.type}
                  onChange={(e) => setNewCall({...newCall, type: e.target.value as any})}
                  className="w-full bg-[#050A15] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00C2FF]"
                >
                  <option value="outgoing">Outbound</option>
                  <option value="incoming">Inbound</option>
                  <option value="missed">Missed</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Call Outcome</label>
                <select 
                  value={newCall.outcome}
                  onChange={(e) => setNewCall({...newCall, outcome: e.target.value as any})}
                  className="w-full bg-[#050A15] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00C2FF]"
                >
                  <option value="">Select an outcome...</option>
                  <option value="No answer">No Answer</option>
                  <option value="Interested">Interested</option>
                  <option value="Not interested">Not Interested</option>
                  <option value="Callback later">Callback Later</option>
                  <option value="Left voicemail">Left Voicemail</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Notes / Summary</label>
                <textarea 
                  rows={3} 
                  value={newCall.notes}
                  onChange={(e) => setNewCall({...newCall, notes: e.target.value})}
                  className="w-full bg-[#050A15] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00C2FF] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsCallOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleLogCall} className="px-6 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#0057D9]/20 transition-colors">Save Call Log</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
