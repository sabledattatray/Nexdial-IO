"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, Briefcase, Plus, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface Industry {
  id: string;
  name: string;
  slug: string;
  icon: string;
  isPopular: boolean;
  pipelineStages: string[];
  leadSources: string[];
}

interface Category {
  id: string;
  name: string;
  industries: Industry[];
}

interface IndustrySelectorProps {
  value: string;
  onChange: (slug: string, industry: Industry | null) => void;
}

export default function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/industries")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const popularIndustries = useMemo(() => {
    const popular: Industry[] = [];
    categories.forEach(c => {
      c.industries.forEach(i => {
        if (i.isPopular) popular.push(i);
      });
    });
    return popular;
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    const lowerSearch = search.toLowerCase();
    
    return categories.map(c => ({
      ...c,
      industries: c.industries.filter(i => i.name.toLowerCase().includes(lowerSearch))
    })).filter(c => c.industries.length > 0);
  }, [categories, search]);

  const selectedIndustry = useMemo(() => {
    for (const c of categories) {
      const found = c.industries.find(i => i.slug === value);
      if (found) return found;
    }
    return null;
  }, [value, categories]);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const IconComponent = LucideIcons[iconName] || Briefcase;
    return <IconComponent className="w-4 h-4 text-[#00C2FF]" />;
  };

  return (
    <div className="relative">
      <div 
        className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          ) : selectedIndustry ? (
            <>
              {getIcon(selectedIndustry.icon)}
              <span className="text-white">{selectedIndustry.name}</span>
            </>
          ) : value === "custom" ? (
             <>
              <Plus className="w-4 h-4 text-[#00E5A0]" />
              <span className="text-white">Custom Industry</span>
            </>
          ) : (
            <span className="text-slate-400">Select your industry...</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0A1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-80 flex flex-col">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-[#060D1A]">
            <Search className="w-4 h-4 text-slate-400 ml-1" />
            <input 
              type="text" 
              placeholder="Search industries..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-white focus:outline-none"
            />
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-4">
            {!search && popularIndustries.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-1">Popular Industries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {popularIndustries.map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => { onChange(ind.slug, ind); setIsOpen(false); }}
                      className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors ${value === ind.slug ? "bg-[#0057D9]/20" : ""}`}
                    >
                      {getIcon(ind.icon)}
                      <span className="text-xs text-slate-300">{ind.name}</span>
                      {value === ind.slug && <Check className="w-3 h-3 text-[#00C2FF] ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredCategories.map(category => (
              <div key={category.id}>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-1">{category.name}</h3>
                <div className="space-y-0.5">
                  {category.industries.map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => { onChange(ind.slug, ind); setIsOpen(false); }}
                      className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors ${value === ind.slug ? "bg-[#0057D9]/20" : ""}`}
                    >
                      {getIcon(ind.icon)}
                      <span className="text-xs text-slate-300">{ind.name}</span>
                      {value === ind.slug && <Check className="w-3 h-3 text-[#00C2FF] ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="p-4 text-center text-slate-400 text-xs">
                No industries found for "{search}".
              </div>
            )}
            
            <button
              onClick={() => { onChange("custom", null); setIsOpen(false); }}
              className={`flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg hover:bg-white/5 transition-colors border-t border-white/5 mt-2 ${value === "custom" ? "bg-[#00E5A0]/10" : ""}`}
            >
              <Plus className="w-4 h-4 text-[#00E5A0]" />
              <span className="text-xs text-[#00E5A0]">Create Custom Industry</span>
              {value === "custom" && <Check className="w-3 h-3 text-[#00E5A0] ml-auto" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
