"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import Link from "next/link";
import { KanbanSquare, Phone, Mail, MessageSquare, MoreVertical, Search, Plus, Loader2 } from "lucide-react";
import AddLeadModal from "@/components/crm/AddLeadModal";

const STATUSES = [
  { id: "NEW", name: "New Lead", color: "bg-emerald-500" },
  { id: "CONTACTED", name: "Contacted", color: "bg-blue-500" },
  { id: "IN_PROGRESS", name: "In Progress", color: "bg-purple-500" },
  { id: "INTERESTED", name: "Interested", color: "bg-amber-500" },
  { id: "CONVERTED", name: "Converted", color: "bg-green-500" },
  { id: "LOST", name: "Lost", color: "bg-slate-500" },
];

export default function PipelinePage() {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [activeDropdownLeadId, setActiveDropdownLeadId] = useState<string | null>(null);

  // Drag and Drop State
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch leads for Kanban board (fetch 200 leads limit to populate board columns)
  const { data: leadsData, isLoading } = useQuery<any>({
    queryKey: ["leads", "pipeline"],
    queryFn: () => fetcher("/api/leads?limit=200"),
    enabled: mounted,
  });

  // Drag-and-drop status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: string }) => {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update lead status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });

  if (!mounted) return null;

  const leads = leadsData?.data || [];

  const filteredLeads = leads.filter(
    (l: any) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery)
  );

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.effectAllowed = "move";
    // Small delay to allow the drag ghost to render
    setTimeout(() => {
      const el = document.getElementById(`lead-${id}`);
      if (el) el.classList.add("opacity-50");
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(null);
    const el = document.getElementById(`lead-${id}`);
    if (el) el.classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStatusId: string) => {
    e.preventDefault();
    if (draggedLeadId) {
      updateStatusMutation.mutate({ leadId: draggedLeadId, status: targetStatusId });
    }
  };

  const KanbanColumn = ({
    statusId,
    statusName,
    color,
  }: {
    statusId: string;
    statusName: string;
    color: string;
  }) => {
    const columnLeads = filteredLeads.filter((l: any) => l.status === statusId);

    return (
      <div
        className="flex-shrink-0 w-72 xl:w-full flex flex-col bg-[#0A1628] rounded-xl border border-white/5 h-full overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, statusId)}
      >
        {/* Column Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <h3 className="font-bold text-white text-sm">{statusName}</h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
            {columnLeads.length}
          </span>
        </div>

        {/* Column Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-[300px]">
          {columnLeads.map((lead: any) => (
            <div
              key={lead.id}
              id={`lead-${lead.id}`}
              draggable
              onDragStart={(e) => handleDragStart(e, lead.id)}
              onDragEnd={(e) => handleDragEnd(e, lead.id)}
              className="bg-[#050A15] p-3.5 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing hover:border-white/20 transition-all shadow-sm relative"
            >
              {updateStatusMutation.isPending && draggedLeadId === lead.id && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg z-10" />
              )}
              <div className="flex items-start justify-between mb-2">
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="font-bold text-sm text-white hover:text-[#00C2FF] transition-colors"
                >
                  {lead.name}
                </Link>
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdownLeadId(activeDropdownLeadId === lead.id ? null : lead.id);
                    }}
                    className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeDropdownLeadId === lead.id && (
                    <>
                      <div 
                        className="fixed inset-0 z-20" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownLeadId(null);
                        }}
                      />
                      <div 
                        className="absolute right-0 mt-1 bg-[#0F172A] border border-white/10 rounded-lg shadow-xl py-1 w-36 z-30 overflow-hidden text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={`/crm/leads/${lead.id}`}
                          className="w-full text-left block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => {
                            window.open(`tel:${lead.phone}`, '_self');
                            setActiveDropdownLeadId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3 h-3 text-orange-400" />
                          Quick Call
                        </button>
                        <button
                          onClick={() => {
                            const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
                            const text = encodeURIComponent(`Hello ${lead.name},\n\nThank you for your interest. I'd love to schedule a quick call to understand your requirements better and share how we can help.\n\nWhen would be a convenient time for you?\n\nBest regards`);
                            window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
                            setActiveDropdownLeadId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3 text-green-400" />
                          WhatsApp
                        </button>
                        {lead.email && (
                          <button
                            onClick={() => {
                              const subject = encodeURIComponent("Following up from NexDial");
                              const body = encodeURIComponent(`Hi ${lead.name},\n\nBest regards,\nSales Team`);
                              window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`, '_blank');
                              setActiveDropdownLeadId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Mail className="w-3 h-3 text-[#00C2FF]" />
                            Email Lead
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  {lead.phone}
                </div>
                {lead.followUpDate && (
                  <div
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded inline-block ${
                      new Date(lead.followUpDate) < new Date()
                        ? "bg-red-500/10 text-red-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    Follow-up: {new Date(lead.followUpDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[10px] text-slate-500 font-medium">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  {lead.email && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const subject = encodeURIComponent("Following up from NexDial");
                        const body = encodeURIComponent(`Hi ${lead.name},\n\nBest regards,\nSales Team`);
                        window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`, '_blank');
                      }}
                      className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-[#00C2FF] transition-colors cursor-pointer"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const cleanPhone = lead.phone.replace(/[^0-9+]/g, '');
                      const text = encodeURIComponent(`Hello ${lead.name},\n\nThank you for reaching out to us. I'd like to follow up on your enquiry and discuss how we can assist you.\n\nPlease let me know a suitable time to connect.\n\nBest regards`);
                      window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`, '_blank');
                    }}
                    className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-green-400 transition-colors cursor-pointer"
                    title="Send WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {columnLeads.length === 0 && (
            <div className="h-24 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center">
              <span className="text-xs text-slate-500 font-medium">Drop leads here</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <KanbanSquare className="w-6 h-6 text-[#00E5A0]" />
            Sales Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Drag and drop leads to update their status.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#0057D9]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#00C2FF] animate-spin mb-4" />
          <p className="text-slate-400 text-sm">Loading pipeline board...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex h-full gap-3 items-start min-w-max xl:min-w-0 xl:w-full xl:grid xl:grid-cols-6 px-1">
            {STATUSES.map((s) => (
              <KanbanColumn key={s.id} statusId={s.id} statusName={s.name} color={s.color} />
            ))}
          </div>
        </div>
      )}

      {isAddLeadOpen && <AddLeadModal onClose={() => setIsAddLeadOpen(false)} />}
    </div>
  );
}
