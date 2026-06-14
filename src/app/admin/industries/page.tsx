// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { getAuthenticatedSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Briefcase, Search, Plus, Trash2, Edit2, Layers, Tag } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const dynamic = "force-dynamic";

function getIcon(iconName: string) {
  const IconComponent = LucideIcons[iconName] || Briefcase;
  return <IconComponent className="w-4 h-4" />;
}

export default async function AdminIndustriesPage() {
  const session = await getAuthenticatedSession();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const categories = await prisma.industryCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      industries: {
        orderBy: { name: "asc" },
      },
    },
  });

  const totalIndustries = categories.reduce((acc, cat) => acc + cat.industries.length, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Industry Configuration Center</h1>
          <p className="text-sm text-slate-400 mt-1">Manage {totalIndustries} industry templates across {categories.length} categories.</p>
        </div>
        <button className="px-4 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-[#081120] text-sm font-bold rounded-xl transition-all shadow-md shadow-[#00E5A0]/25 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Industry</span>
        </button>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center gap-3">
              <div className="p-2 bg-[#00C2FF]/10 rounded-lg text-[#00C2FF]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">{category.name}</h2>
                <p className="text-xs text-slate-400">{category.industries.length} Industries</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.industries.map((ind) => (
                  <div key={ind.id} className="p-4 bg-[#060D1A] border border-white/5 hover:border-white/20 rounded-xl transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg text-[#00C2FF]">
                          {getIcon(ind.icon)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-200">{ind.name}</h3>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{ind.slug}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-red-500/20 rounded text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2">
                      <div className="flex items-start gap-2 text-[10px]">
                        <Tag className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                        <div className="flex flex-wrap gap-1">
                          {ind.pipelineStages.slice(0, 4).map(stage => (
                            <span key={stage} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">{stage}</span>
                          ))}
                          {ind.pipelineStages.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">+{ind.pipelineStages.length - 4} more</span>
                          )}
                        </div>
                      </div>
                      
                      {ind.isPopular && (
                        <div className="inline-block mt-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-[#00C2FF]/10 text-[#00C2FF] px-2 py-0.5 rounded">Popular</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
