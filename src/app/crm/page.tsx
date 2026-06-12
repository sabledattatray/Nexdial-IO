"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import Link from "next/link";
import {
  Inbox as InboxIcon,
  Search,
  Filter,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  User,
  Upload,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertTriangle,
  Calendar,
  Check,
  Plus,
  MessageSquare,
  X,
  TrendingUp,
  AlertCircle,
  Sparkles,
  PhoneCall,
  CalendarCheck
} from "lucide-react";
import ImportLeadsModal from "@/components/crm/ImportLeadsModal";
import { motion, AnimatePresence } from "framer-motion";

const validStatuses = ["NEW", "CONTACTED", "IN_PROGRESS", "INTERESTED", "CONVERTED", "LOST"];

export default function InboxPage() {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [activeCallLeadId, setActiveCallLeadId] = useState<string | null>(null);
  const [activeScheduleLeadId, setActiveScheduleLeadId] = useState<string | null>(null);
  
  // Note modal state
  const [noteLeadId, setNoteLeadId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Toast alert state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Daily Execution Mode & Popover states
  const [isExecutionMode, setIsExecutionMode] = useState(false);
  const [executionQueue, setExecutionQueue] = useState<any[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [activeActionPopoverId, setActiveActionPopoverId] = useState<string | null>(null);

  const limit = 20;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce search query to prevent typing lag / too many DB queries
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Query leads: we list all leads in the inbox
  const { data, isLoading } = useQuery<any>({
    queryKey: ["leads", "inbox", page, debouncedSearch],
    queryFn: () =>
      fetcher(
        `/api/leads?limit=${limit}&page=${page}${
          debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""
        }`
      ),
    enabled: mounted,
  });

  // Query dashboard statistics for the mini header cards
  const { data: dashboardStats } = useQuery<any>({
    queryKey: ["dashboardStats"],
    queryFn: () => fetcher("/api/dashboard"),
    enabled: mounted,
  });

  // Mutation: Log AI Recommendation Feedback
  const logRecommendationFeedbackMutation = useMutation({
    mutationFn: async ({
      leadId,
      recommendation,
      category,
      status,
      reasoning,
    }: {
      leadId: string;
      recommendation: string;
      category: string;
      status: string;
      reasoning: string[];
    }) => {
      const res = await fetch(`/api/leads/${leadId}/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendation, category, status, reasoning }),
      });
      if (!res.ok) throw new Error("Failed to log recommendation feedback");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  // Mutation: Update status inline
  const updateStatusMutation = useMutation({
    mutationFn: async ({ leadId, status, activityType, activityDescription }: { leadId: string; status: string; activityType?: string; activityDescription?: string }) => {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, activityType, activityDescription }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setToastMessage(`Lead status updated to ${data.status.replace("_", " ")}!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    },
  });

  // Mutation: Log a quick call with outcome
  const logCallMutation = useMutation({
    mutationFn: async ({ leadId, type, outcome, notes }: { leadId: string; type: string; outcome: string; notes?: string }) => {
      const res = await fetch(`/api/calls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, type, outcome, notes }),
      });
      if (!res.ok) throw new Error("Failed to log call");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setToastMessage("Call outcome logged and status automated!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  });

  // Mutation: Schedule follow-up date
  const setFollowUpMutation = useMutation({
    mutationFn: async ({ leadId, followUpDate }: { leadId: string; followUpDate: string }) => {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followUpDate }),
      });
      if (!res.ok) throw new Error("Failed to schedule follow-up");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setToastMessage("Follow-up scheduled!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  });

  // Mutation: Save inline note
  const addNoteMutation = useMutation({
    mutationFn: async ({ leadId, note }: { leadId: string; note: string }) => {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: note }),
      });
      if (!res.ok) throw new Error("Failed to add note");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setToastMessage("Note added successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setNoteLeadId(null);
      setNoteText("");
    },
  });

  if (!mounted) return null;

  const leads = data?.data || [];
  const pagination = data?.pagination || { page: 1, limit: 20, total: 0 };
  const totalPages = Math.ceil(pagination.total / limit) || 1;

  const handleStatusChange = (leadId: string, newStatus: string) => {
    updateStatusMutation.mutate({ leadId, status: newStatus });
    setActiveDropdownId(null);
  };

  const startExecutionMode = () => {
    const allLeads = data?.data || [];
    if (allLeads.length > 0) {
      const sortedActive = [...allLeads]
        .filter((l: any) => l.status !== "CONVERTED" && l.status !== "LOST")
        .sort((a: any, b: any) => (b.healthScore || 0) - (a.healthScore || 0))
        .slice(0, 10);
      
      if (sortedActive.length === 0) {
        setToastMessage("No active leads found in this view to execute!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
      
      setExecutionQueue(sortedActive);
      setQueueIndex(0);
      setIsExecutionMode(true);
    } else {
      setToastMessage("No leads loaded yet.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const stopExecutionMode = () => {
    setIsExecutionMode(false);
    setExecutionQueue([]);
    setQueueIndex(0);
  };

  const handleDone = (lead: any) => {
    const next = lead.nextBestAction;
    
    logRecommendationFeedbackMutation.mutate({
      leadId: lead.id,
      recommendation: next.action,
      category: next.category,
      status: "FOLLOWED",
      reasoning: next.reasons,
    });

    if (next.category === 'call') {
      window.open(`tel:${lead.phone}`, '_self');
      setActiveCallLeadId(lead.id); // Triggers outcome logger
    } else if (next.category === 'message') {
      const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
      const text = encodeURIComponent(`Hello ${lead.name},\n\nThank you for your interest. I'd like to follow up and discuss how we can assist you further.\n\nPlease let me know a convenient time to connect.\n\nBest regards`);
      window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
      updateStatusMutation.mutate({
        leadId: lead.id,
        status: lead.status,
        activityType: "MESSAGE_SENT",
        activityDescription: "Sent WhatsApp recommendation follow-up in Daily Execution Mode."
      } as any);
      setQueueIndex(prev => prev + 1);
    } else if (next.category === 'schedule') {
      if (lead.suggestedFollowUp?.isoString) {
        setFollowUpMutation.mutate({ leadId: lead.id, followUpDate: lead.suggestedFollowUp.isoString });
      }
      setQueueIndex(prev => prev + 1);
    } else {
      setQueueIndex(prev => prev + 1);
    }
  };

  const handleSnooze = (lead: any) => {
    const next = lead.nextBestAction;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    logRecommendationFeedbackMutation.mutate({
      leadId: lead.id,
      recommendation: next.action,
      category: next.category,
      status: "SNOOZED",
      reasoning: next.reasons,
    });

    setFollowUpMutation.mutate({ leadId: lead.id, followUpDate: tomorrow.toISOString() });
    setQueueIndex(prev => prev + 1);
  };

  const handleSkip = (lead: any) => {
    const next = lead.nextBestAction;

    logRecommendationFeedbackMutation.mutate({
      leadId: lead.id,
      recommendation: next.action,
      category: next.category,
      status: "SKIPPED",
      reasoning: next.reasons,
    });

    setQueueIndex(prev => prev + 1);
  };

  const handleLogCall = (leadId: string, outcome: string) => {
    logCallMutation.mutate({ leadId, type: "OUTGOING", outcome }, {
      onSuccess: () => {
        if (isExecutionMode) {
          setQueueIndex(prev => prev + 1);
        }
      }
    });
    setActiveCallLeadId(null);
  };

  const handleCancelCall = () => {
    setActiveCallLeadId(null);
    if (isExecutionMode) {
      setQueueIndex(prev => prev + 1);
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !noteLeadId) return;
    setIsSubmittingNote(true);
    addNoteMutation.mutate(
      { leadId: noteLeadId, note: noteText.trim() },
      {
        onSettled: () => setIsSubmittingNote(false)
      }
    );
  };

  const getSourceIcon = (source: string) => {
    switch (source?.toUpperCase()) {
      case "WEBSITE":
        return <Globe className="w-4 h-4 text-[#00C2FF]" />;
      case "FORM":
        return <Mail className="w-4 h-4 text-purple-400" />;
      case "CALL":
        return <Phone className="w-4 h-4 text-red-400" />;
      default:
        return <User className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "NEW":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "CONTACTED":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "IN_PROGRESS":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "INTERESTED":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "CONVERTED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "LOST":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-white/5 text-slate-400 border-white/10";
    }
  };

  const isOverdue = (dateStr: string | null) => {
    if (!dateStr) return false;
    const now = new Date();
    return new Date(dateStr).getTime() < now.getTime();
  };

  const isDueToday = (dateStr: string | null) => {
    if (!dateStr) return false;
    const today = new Date();
    const date = new Date(dateStr);
    return today.toDateString() === date.toDateString();
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#00E5A0] text-[#081120] font-bold px-4 py-3 rounded-lg shadow-lg shadow-[#00E5A0]/20"
          >
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {noteLeadId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setNoteLeadId(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0A1628] border border-white/10 rounded-2xl p-6 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Add Quick Note</h3>
                <button onClick={() => setNoteLeadId(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddNoteSubmit} className="space-y-4">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type notes regarding call outcomes or lead requests..."
                  rows={4}
                  className="w-full bg-[#050A15] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00C2FF]"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setNoteLeadId(null)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingNote}
                    className="px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingNote && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Save Note
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <InboxIcon className="w-6 h-6 text-[#00C2FF]" />
            Unified Lead Inbox
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track customer communications, log lead outcomes, and monitor urgency tasks.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* View Toggle */}
          <div className="flex bg-[#0A1628] p-1 rounded-lg border border-white/10 select-none shrink-0">
            <button
              onClick={stopExecutionMode}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                !isExecutionMode
                  ? "bg-[#0057D9] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Inbox List
            </button>
            <button
              onClick={startExecutionMode}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isExecutionMode
                  ? "bg-[#0057D9] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 font-bold" />
              Execution Mode ⚡
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 bg-[#0A1628] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00C2FF] transition-colors"
            />
          </div>
          <button
            className="p-2 bg-[#0A1628] border border-white/10 rounded-lg text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            title="Filter Leads"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/10 transition-colors cursor-pointer"
            title="Import CSV"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
        </div>
      </div>

      {/* Mini Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Today's Follow-ups</p>
            <p className="text-2xl font-bold text-white mt-1">{dashboardStats?.todayFollowUpsCount || 0}</p>
          </div>
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Overdue Tasks</p>
            <p className={`text-2xl font-bold mt-1 ${dashboardStats?.overdueFollowUps > 0 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {dashboardStats?.overdueFollowUps || 0}
            </p>
          </div>
          <div className={`p-2 rounded-lg ${dashboardStats?.overdueFollowUps > 0 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-400'}`}>
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Hot Leads</p>
            <p className="text-2xl font-bold text-orange-400 mt-1">{dashboardStats?.hotLeadsCount || 0}</p>
          </div>
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Conversion Rate</p>
            <p className="text-2xl font-bold text-[#00E5A0] mt-1">
              {dashboardStats ? (dashboardStats.totalLeads > 0 ? Math.round((dashboardStats.converted / dashboardStats.totalLeads) * 100) : 0) : 0}%
            </p>
          </div>
          <div className="p-2 bg-[#00E5A0]/10 rounded-lg text-[#00E5A0]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Real-time Alerts Banner */}
      {dashboardStats?.overdueFollowUps > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-slate-200">
              <strong className="text-white">Critical Alert:</strong> You have <span className="text-red-400 font-bold">{dashboardStats.overdueFollowUps} follow-ups</span> past due. Contact these leads now to prevent conversion drop-off.
            </p>
          </div>
          <Link href="/crm/follow-ups" className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs rounded transition-colors shrink-0">
            Resolve
          </Link>
        </div>
      )}

      {isExecutionMode ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Progress Bar Header */}
          <div className="bg-[#0A1628] border border-white/5 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">Daily Execution Mode ⚡</span>
              </div>
              <button
                onClick={stopExecutionMode}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                Exit Focus Mode
              </button>
            </div>
            
            {executionQueue.length > 0 && queueIndex < executionQueue.length ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Queue Progress</span>
                  <span>Lead {queueIndex + 1} of {executionQueue.length}</span>
                </div>
                <div className="w-full bg-[#050A15] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00E5A0] h-full transition-all duration-300"
                    style={{ width: `${((queueIndex) / executionQueue.length) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* Current Lead Details vs AI Action Split Card */}
          {queueIndex < executionQueue.length ? (
            (() => {
              const currentLead = executionQueue[queueIndex];
              const getHealthBadgeStyle = (category: string) => {
                switch (category) {
                  case "HOT": return "bg-red-500/10 text-red-400 border border-red-500/20";
                  case "WARM": return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
                  case "COLD": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                  default: return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                }
              };

              const getNextActionStyle = (category: string) => {
                switch (category) {
                  case "call": return "text-orange-400 font-semibold";
                  case "message": return "text-green-400 font-semibold";
                  case "schedule": return "text-amber-400 font-semibold";
                  case "onboard": return "text-emerald-400 font-semibold";
                  case "archive": return "text-slate-400 font-semibold";
                  default: return "text-slate-300";
                }
              };

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
                  {/* Left Column: Lead Information & Cleanup Alerts */}
                  <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xl text-slate-300 select-none">
                          {currentLead.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">{currentLead.name}</h2>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="p-0.5 rounded bg-white/5">
                              {getSourceIcon(currentLead.source)}
                            </span>
                            <span className="text-xs text-slate-400 capitalize">
                              {currentLead.source.toLowerCase()} • Registered {new Date(currentLead.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Health Rating</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getHealthBadgeStyle(currentLead.healthCategory)}`}>
                              {currentLead.healthCategory === "HOT" ? "🔥 HOT" : currentLead.healthCategory === "WARM" ? "🟡 WARM" : "❄ COLD"}
                            </span>
                            <span className="text-sm font-bold text-slate-200">{currentLead.healthScore}</span>
                          </div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Momentum</span>
                          <span className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-1">
                            {currentLead.momentumLabel}
                          </span>
                        </div>
                      </div>

                      {/* Cleanliness Alerts */}
                      {currentLead.cleanlinessWarnings && currentLead.cleanlinessWarnings.length > 0 && (
                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Lead Profile Cleanliness Warnings:</span>
                          </div>
                          <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                            {currentLead.cleanlinessWarnings.map((warn: string) => (
                              <li key={warn}>{warn}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Details & Contacts */}
                      <div className="bg-white/[0.01] rounded-xl p-4 border border-white/5 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Phone</span>
                          <a href={`tel:${currentLead.phone}`} className="text-white hover:text-[#00C2FF] font-medium transition-colors">
                            {currentLead.phone}
                          </a>
                        </div>
                        {currentLead.email && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Email</span>
                            <a href={`mailto:${currentLead.email}`} className="text-white hover:text-[#00C2FF] font-medium transition-colors">
                              {currentLead.email}
                            </a>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Lead Status</span>
                          <span className="text-slate-300 font-medium capitalize">{currentLead.status.toLowerCase().replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/crm/leads/${currentLead.id}`}
                      className="w-full text-center py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View Full Interaction History & Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Right Column: AI Action Panel & Execution Controls */}
                  <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 bg-[#0057D9]/10 border border-[#0057D9]/20 rounded-lg px-3 py-1.5 w-fit">
                        <Sparkles className="w-4 h-4 text-[#00C2FF]" />
                        <span className="text-xs font-bold text-[#00C2FF] uppercase tracking-wide">Next Best Action Recommended by AI</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className={`text-xl font-extrabold ${getNextActionStyle(currentLead.nextBestAction?.category)}`}>
                          {currentLead.nextBestAction?.action}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {currentLead.nextBestAction?.description}
                        </p>
                      </div>

                      {/* Explainable AI reasons */}
                      {currentLead.nextBestAction?.reasons && currentLead.nextBestAction.reasons.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Why this matters:</span>
                          <ul className="text-xs text-slate-400 space-y-2 list-none">
                            {currentLead.nextBestAction.reasons.map((reason: string, idx: number) => (
                              <li key={idx} className="flex gap-2 items-start text-left">
                                <span className="text-[#00C2FF] shrink-0 mt-0.5">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Actions Controller */}
                    <div className="space-y-3">
                      {activeCallLeadId === currentLead.id ? (
                        <div className="bg-[#050A15] border border-white/10 rounded-xl p-4 space-y-3">
                          <span className="text-xs font-bold text-slate-400 block text-center">Log Call Outcome to Advance:</span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleLogCall(currentLead.id, "NO_ANSWER")}
                              className="py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Missed (No Answer)
                            </button>
                            <button
                              onClick={() => handleLogCall(currentLead.id, "CALLBACK")}
                              className="py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Scheduled Callback
                            </button>
                            <button
                              onClick={() => handleLogCall(currentLead.id, "INTERESTED")}
                              className="py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Interested
                            </button>
                            <button
                              onClick={() => handleLogCall(currentLead.id, "CONVERTED")}
                              className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Closed Won
                            </button>
                          </div>
                          <button
                            onClick={() => handleCancelCall()}
                            className="w-full py-1.5 text-center text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                          >
                            Cancel & Next
                          </button>
                        </div>
                      ) : activeScheduleLeadId === currentLead.id ? (
                        <div className="bg-[#050A15] border border-white/10 rounded-xl p-4 space-y-3">
                          <span className="text-xs font-bold text-slate-400 block text-center">Select Calendar Schedule:</span>
                          <div className="grid grid-cols-2 gap-2">
                            {currentLead.suggestedFollowUp?.isoString && (
                              <button
                                onClick={() => {
                                  setFollowUpMutation.mutate({ leadId: currentLead.id, followUpDate: currentLead.suggestedFollowUp.isoString });
                                  setActiveScheduleLeadId(null);
                                  setQueueIndex(prev => prev + 1);
                                }}
                                className="py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                              >
                                Auto: {currentLead.suggestedFollowUp.label}
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(10, 0, 0, 0);
                                setFollowUpMutation.mutate({ leadId: currentLead.id, followUpDate: tomorrow.toISOString() });
                                setActiveScheduleLeadId(null);
                                setQueueIndex(prev => prev + 1);
                              }}
                              className="py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Tomorrow 10 AM
                            </button>
                          </div>
                          <button
                            onClick={() => setActiveScheduleLeadId(null)}
                            className="w-full py-1.5 text-center text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSkip(currentLead)}
                            className="flex-1 py-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Skip Action
                          </button>
                          <button
                            onClick={() => handleSnooze(currentLead)}
                            className="flex-1 py-3 bg-white/5 hover:bg-yellow-500/10 text-slate-400 hover:text-yellow-400 border border-white/10 hover:border-yellow-500/20 text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Snooze Tomorrow
                          </button>
                          <button
                            onClick={() => handleDone(currentLead)}
                            className="flex-[2] py-3 bg-[#00E5A0] hover:bg-[#00C2FF] text-[#081120] hover:text-white text-xs font-extrabold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            Done (Execute AI recommendation)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            /* Queue Finished screen */
            <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-[#00E5A0]/10 rounded-full flex items-center justify-center text-[#00E5A0] animate-bounce">
                <Check className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">All caught up! 🚀</h2>
                <p className="text-sm text-slate-400 max-w-md">
                  You have successfully executed actions for all high-priority leads in your queue. Your pipeline status is fully synchronized.
                </p>
              </div>
              <button
                onClick={stopExecutionMode}
                className="px-6 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Back to Inbox List
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Leads Table Card */
        <div className="flex-1 bg-[#0A1628] rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between min-h-[450px]">
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/[0.02] text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
              <div className="col-span-3 pl-2">Lead details</div>
              <div className="col-span-2 text-center">Lead Health</div>
              <div className="col-span-3">Next Best Action</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right pr-2">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5 overflow-y-auto flex-1 min-h-0 custom-scrollbar">

              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-8 h-8 text-[#00C2FF] animate-spin mb-4" />
                  <p className="text-sm text-slate-400">Loading leads database...</p>
                </div>
              ) : leads.length > 0 ? (
                leads.map((lead: any) => {
                  const overdue = lead.followUpDate && new Date(lead.followUpDate).getTime() < Date.now();
                  const cleanlinessWarnings = lead.cleanlinessWarnings || [];

                  // Health Category styling
                  const getHealthBadgeStyle = (category: string) => {
                    switch (category) {
                      case "HOT":
                        return "bg-red-500/10 text-red-400 border border-red-500/20";
                      case "WARM":
                        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
                      case "COLD":
                        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                      default:
                        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                    }
                  };

                  // Next Action Styling
                  const getNextActionStyle = (category: string) => {
                    switch (category) {
                      case "call":
                        return "text-orange-400 font-semibold";
                      case "message":
                        return "text-green-400 font-semibold";
                      case "schedule":
                        return "text-amber-400 font-semibold";
                      case "onboard":
                        return "text-emerald-400 font-semibold";
                      case "archive":
                        return "text-slate-400 font-semibold";
                      default:
                        return "text-slate-300";
                    }
                  };

                  return (
                    <div
                      key={lead.id}
                      className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors group ${
                        overdue ? "bg-red-500/[0.02]" : ""
                      }`}
                    >
                      {/* Name & Source */}
                      <div className="col-span-3 flex items-center gap-3 pl-2 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 select-none shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#00C2FF] transition-colors truncate">
                            {lead.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                            <span className="shrink-0 p-0.5 rounded bg-white/5" title={lead.source}>
                              {getSourceIcon(lead.source)}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate capitalize">
                              {lead.source.toLowerCase()} • {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Lead Health & Cleanliness Alerts */}
                      <div className="col-span-2 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getHealthBadgeStyle(lead.healthCategory)}`}>
                            {lead.healthCategory === "HOT" ? "🔥 HOT" : lead.healthCategory === "WARM" ? "🟡 WARM" : "❄ COLD"}
                          </span>
                          <span className="text-xs font-bold text-slate-300">
                            {lead.healthScore}
                          </span>
                        </div>
                        {cleanlinessWarnings.length > 0 && (
                          <div className="mt-1 flex flex-col items-center">
                            {cleanlinessWarnings.map((warn: string) => (
                              <span key={warn} className="text-[9px] text-red-400 font-medium leading-tight">
                                • {warn}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Next Best Action */}
                      <div className="col-span-3 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#00C2FF] shrink-0" />
                          <span className={`text-xs truncate block ${getNextActionStyle(lead.nextBestAction?.category)}`}>
                            {lead.nextBestAction?.action}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                          {lead.nextBestAction?.description}
                        </span>
                      </div>

                      {/* Inline Status Dropdown */}
                      <div className="col-span-2 flex justify-center relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(activeDropdownId === lead.id ? null : lead.id);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 select-none ${getStatusStyle(
                            lead.status
                          )}`}
                        >
                          {lead.status.replace("_", " ")}
                          <span className="opacity-60 text-[9px] mt-0.5">▼</span>
                        </button>

                        {/* Dropdown Options List */}
                        {activeDropdownId === lead.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveDropdownId(null)}
                            />
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0F172A] border border-white/10 rounded-lg shadow-xl py-1 w-32 z-20 overflow-hidden">
                              {validStatuses.map((st) => (
                                <button
                                  key={st}
                                  onClick={() => handleStatusChange(lead.id, st)}
                                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-white/5 ${
                                    lead.status === st ? "text-[#00C2FF] font-bold" : "text-slate-400"
                                  }`}
                                >
                                  {st.replace("_", " ")}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* One-Click Action Mode Column */}
                      <div className="col-span-2 flex items-center justify-end gap-1.5 pr-2">
                        {activeCallLeadId === lead.id ? (
                          <div className="flex items-center justify-end gap-1 bg-[#091120] border border-white/10 rounded-lg p-1 z-10 shrink-0">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider ml-1 select-none">Outcome:</span>
                            <button
                              onClick={() => handleLogCall(lead.id, "NO_ANSWER")}
                              className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                              title="No Answer"
                            >
                              Miss
                            </button>
                            <button
                              onClick={() => handleLogCall(lead.id, "CALLBACK")}
                              className="px-1.5 py-0.5 bg-yellow-600 hover:bg-yellow-500 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                              title="Callback Later"
                            >
                              CB
                            </button>
                            <button
                              onClick={() => handleLogCall(lead.id, "INTERESTED")}
                              className="px-1.5 py-0.5 bg-purple-600 hover:bg-purple-500 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                              title="Interested"
                            >
                              Int
                            </button>
                            <button
                              onClick={() => handleLogCall(lead.id, "CONVERTED")}
                              className="px-1.5 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                              title="Converted"
                            >
                              Conv
                            </button>
                            <button
                              onClick={() => handleCancelCall()}
                              className="p-0.5 text-red-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : activeScheduleLeadId === lead.id ? (
                          <div className="flex items-center justify-end gap-1 bg-[#091120] border border-white/10 rounded-lg p-1 z-10 shrink-0">
                            {lead.suggestedFollowUp?.isoString && (
                              <button
                                onClick={() => {
                                  setFollowUpMutation.mutate({ leadId: lead.id, followUpDate: lead.suggestedFollowUp.isoString });
                                  setActiveScheduleLeadId(null);
                                }}
                                className="px-1.5 py-0.5 bg-[#0057D9] hover:bg-[#0057D9]/80 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                                title={`AI Suggested: ${lead.suggestedFollowUp.label}`}
                              >
                                Auto
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(10, 0, 0, 0);
                                setFollowUpMutation.mutate({ leadId: lead.id, followUpDate: tomorrow.toISOString() });
                                setActiveScheduleLeadId(null);
                              }}
                              className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 text-[9px] font-bold text-white rounded transition-colors cursor-pointer"
                            >
                              Tmrw 10AM
                            </button>
                            <button
                              onClick={() => setActiveScheduleLeadId(null)}
                              className="p-0.5 text-red-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2 relative">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActionPopoverId(activeActionPopoverId === lead.id ? null : lead.id);
                                }}
                                className="px-3 py-1.5 bg-[#0057D9]/10 hover:bg-[#0057D9] text-[#00C2FF] hover:text-white font-semibold text-xs rounded-lg border border-[#0057D9]/20 transition-all flex items-center gap-1 cursor-pointer select-none"
                              >
                                Take Action
                                <span className="opacity-60 text-[9px] mt-0.5">▼</span>
                              </button>
                              
                              {activeActionPopoverId === lead.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setActiveActionPopoverId(null)} />
                                  <div className="absolute right-0 mt-1.5 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl py-1.5 w-48 z-20 overflow-hidden text-left">
                                    <button
                                      onClick={() => {
                                        window.open(`tel:${lead.phone}`, '_self');
                                        setActiveCallLeadId(lead.id);
                                        setActiveActionPopoverId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                      <Phone className="w-3.5 h-3.5 text-orange-400" />
                                      Quick Call
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
                                        const text = encodeURIComponent(`Hello ${lead.name},\n\nI tried reaching you earlier but couldn't connect. I'd love to discuss your requirements at a time that works for you.\n\nCould you share your availability?\n\nBest regards`);
                                        window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
                                        updateStatusMutation.mutate({
                                          leadId: lead.id,
                                          status: lead.status,
                                          activityType: "MESSAGE_SENT",
                                          activityDescription: "Sent follow-up message on WhatsApp."
                                        } as any);
                                        setActiveActionPopoverId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                                      Send WhatsApp
                                    </button>

                                    {lead.email && (
                                      <button
                                        onClick={() => {
                                          const subject = encodeURIComponent("Following up from NexDial");
                                          const body = encodeURIComponent(`Hi ${lead.name},\n\nI wanted to follow up on our previous conversation.\n\nBest regards,\nSales Team`);
                                          window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`, '_blank');
                                          updateStatusMutation.mutate({
                                            leadId: lead.id,
                                            status: lead.status,
                                            activityType: "EMAIL_SENT",
                                            activityDescription: `Sent follow-up email to ${lead.email}.`
                                          } as any);
                                          setActiveActionPopoverId(null);
                                        }}
                                        className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                                      >
                                        <Mail className="w-3.5 h-3.5 text-[#00C2FF]" />
                                        Send Email
                                      </button>
                                    )}

                                    <button
                                      onClick={() => {
                                        setActiveScheduleLeadId(lead.id);
                                        setActiveActionPopoverId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                      Schedule Follow-up
                                    </button>

                                    <button
                                      onClick={() => {
                                        const next = lead.nextBestAction;
                                        logRecommendationFeedbackMutation.mutate({
                                          leadId: lead.id,
                                          recommendation: next.action,
                                          category: next.category,
                                          status: "FOLLOWED",
                                          reasoning: next.reasons,
                                        });
                                        
                                        if (next.category === 'call') {
                                          window.open(`tel:${lead.phone}`, '_self');
                                          setActiveCallLeadId(lead.id);
                                        } else if (next.category === 'message') {
                                          const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
                                          const text = encodeURIComponent(`Hello ${lead.name},\n\nThank you for your interest. I'd like to follow up and understand your needs better so we can offer the right solution.\n\nWhen would be a good time to connect?\n\nBest regards`);
                                          window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
                                          updateStatusMutation.mutate({
                                            leadId: lead.id,
                                            status: lead.status,
                                            activityType: "MESSAGE_SENT",
                                            activityDescription: "Auto-sent WhatsApp message recommendation."
                                          } as any);
                                        } else if (next.category === 'schedule') {
                                          if (lead.suggestedFollowUp?.isoString) {
                                            setFollowUpMutation.mutate({ leadId: lead.id, followUpDate: lead.suggestedFollowUp.isoString });
                                          }
                                        } else {
                                          window.location.href = `/crm/leads/${lead.id}`;
                                        }
                                        setActiveActionPopoverId(null);
                                      }}
                                      className="w-full text-left px-4 py-2 text-xs text-[#00C2FF] font-semibold hover:bg-white/5 transition-colors flex items-center gap-2 border-t border-white/5 mt-1 pt-2 cursor-pointer"
                                    >
                                      <Sparkles className="w-3.5 h-3.5" />
                                      Approve Autopilot
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>

                            <Link
                              href={`/crm/leads/${lead.id}`}
                              className="p-1.5 rounded bg-white/5 hover:bg-[#0057D9] text-slate-400 hover:text-white transition-all shadow-sm cursor-pointer"
                              title="View Profile Details"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <InboxIcon className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Inbox is empty</h3>
                  <p className="text-sm text-slate-400 max-w-sm px-4">
                    You've processed all incoming leads. New form submissions, calls, and manual entries will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Server-side Pagination controls */}
          {leads.length > 0 && (
            <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
              <span className="text-xs text-slate-400 select-none">
                Showing page <strong className="text-white">{page}</strong> of{" "}
                <strong className="text-white">{totalPages}</strong> ({pagination.total} leads)
              </span>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-lg bg-[#0057D9] hover:bg-[#0057D9]/80 text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isImportOpen && <ImportLeadsModal onClose={() => setIsImportOpen(false)} />}
    </div>
  );
}
