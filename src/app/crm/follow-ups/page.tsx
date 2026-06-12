"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import Link from "next/link";
import { CalendarClock, AlertCircle, CheckCircle2, ArrowRight, Phone, Mail, Loader2 } from "lucide-react";

export default function FollowUpsPage() {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch pending follow-ups
  const { data: followUpsData, isLoading } = useQuery<any[]>({
    queryKey: ["followUps"],
    queryFn: () => fetcher("/api/follow-ups"),
    enabled: mounted,
  });

  // Complete follow-up mutation (clearing followUpDate on Lead)
  const completeMutation = useMutation({
    mutationFn: async (leadId: string) => {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followUpDate: null }),
      });
      if (!res.ok) throw new Error("Failed to complete follow-up");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  if (!mounted) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingFollowUps = followUpsData || [];

  // Group follow-ups based on scheduled date relative to today
  const overdue = pendingFollowUps.filter((f) => {
    const scheduled = new Date(f.scheduledAt);
    scheduled.setHours(0, 0, 0, 0);
    return scheduled.getTime() < today.getTime();
  });

  const dueToday = pendingFollowUps.filter((f) => {
    const scheduled = new Date(f.scheduledAt);
    scheduled.setHours(0, 0, 0, 0);
    return scheduled.getTime() === today.getTime();
  });

  const upcoming = pendingFollowUps.filter((f) => {
    const scheduled = new Date(f.scheduledAt);
    scheduled.setHours(0, 0, 0, 0);
    return scheduled.getTime() > today.getTime();
  });

  const handleMarkComplete = (leadId: string) => {
    completeMutation.mutate(leadId);
  };

  const FollowUpList = ({
    title,
    icon: Icon,
    colorClass,
    list,
  }: {
    title: string;
    icon: any;
    colorClass: string;
    list: any[];
  }) => (
    <div className="bg-[#0A1628] rounded-xl border border-white/5 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Icon className={`w-5 h-5 ${colorClass}`} />
          {title}
        </h3>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded ${colorClass
            .replace("text-", "bg-")
            .replace("400", "500/10")}`}
        >
          {list.length}
        </span>
      </div>

      <div className="flex-1 p-4 space-y-3 custom-scrollbar overflow-y-auto min-h-[250px]">
        {completeMutation.isPending && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-10" />
        )}
        {list.length > 0 ? (
          list.map((followUp) => {
            const lead = followUp.lead;
            if (!lead) return null;
            return (
              <div
                key={followUp.id}
                className="p-4 rounded-xl bg-[#050A15] border border-white/5 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> {lead.phone}
                    </span>
                    {lead.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {lead.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  <span className="text-xs font-medium text-slate-400">
                    {new Date(followUp.scheduledAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkComplete(lead.id)}
                      disabled={completeMutation.isPending}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                      title="Mark Follow-up Complete"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="p-2 rounded-lg bg-white/5 text-slate-300 hover:bg-[#00C2FF] hover:text-white transition-colors"
                      title="View Lead Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-8">
            <CheckCircle2 className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No leads in this list.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-[#00C2FF]" />
            Follow-Up Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Stay on top of your schedule. Never miss a lead follow-up.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#00C2FF] animate-spin mb-4" />
          <p className="text-slate-400 text-sm">Loading follow-ups...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <FollowUpList title="Overdue" icon={AlertCircle} colorClass="text-red-400" list={overdue} />
          <FollowUpList title="Due Today" icon={CalendarClock} colorClass="text-amber-400" list={dueToday} />
          <FollowUpList title="Upcoming" icon={CalendarClock} colorClass="text-[#00C2FF]" list={upcoming} />
        </div>
      )}
    </div>
  );
}
