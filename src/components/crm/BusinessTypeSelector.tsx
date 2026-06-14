"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Building } from "lucide-react";

const BUSINESS_TYPES = [
  { id: "b2b", label: "B2B (Business to Business)" },
  { id: "b2c", label: "B2C (Business to Consumer)" },
  { id: "d2c", label: "D2C (Direct to Consumer)" },
  { id: "b2b2c", label: "B2B2C (Business to B2C)" },
  { id: "saas", label: "SaaS / Product" },
  { id: "agency", label: "Agency / Services" },
  { id: "marketplace", label: "Marketplace / Platform" },
  { id: "ecommerce", label: "Ecommerce / Retail" },
  { id: "freelance", label: "Freelance / Solo Practitioner" },
  { id: "nonprofit", label: "Non-Profit / NGO" },
  { id: "government", label: "Government / Public Sector" },
  { id: "enterprise", label: "Enterprise" },
  { id: "other", label: "Other" }
];

interface BusinessTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function BusinessTypeSelector({ value, onChange, disabled }: BusinessTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedType = BUSINESS_TYPES.find(t => t.id === value || t.label === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className={`w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs flex items-center justify-between transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#00C2FF]/50'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedType ? (
            <span className="text-white">{selectedType.label}</span>
          ) : (
            <span className="text-slate-400">Select business type...</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0A1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-64 flex flex-col">
          <div className="overflow-y-auto flex-1 p-2 space-y-0.5">
            {BUSINESS_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => { onChange(type.id); setIsOpen(false); }}
                className={`flex items-center gap-2 w-full text-left px-2 py-2 rounded-lg hover:bg-white/5 transition-colors ${value === type.id || value === type.label ? "bg-[#0057D9]/20" : ""}`}
              >
                <Building className="w-4 h-4 text-[#00C2FF]" />
                <span className="text-xs text-slate-300">{type.label}</span>
                {(value === type.id || value === type.label) && <Check className="w-3 h-3 text-[#00C2FF] ml-auto" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
