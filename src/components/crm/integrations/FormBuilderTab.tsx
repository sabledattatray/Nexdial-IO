import { FormInput, Settings, Edit3, Eye, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function FormBuilderTab() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(`<script src="https://cdn.nexdial.io/embed.js" data-form="f_123" async></script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Form Builder</h2>
          <p className="text-sm text-slate-400">Design embedded forms and landing pages to capture leads.</p>
        </div>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors text-sm">
          Create New Form
        </button>
      </div>

      {/* Forms List */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Mock Form 1 */}
        <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden group">
          <div className="h-32 bg-[#00C2FF]/5 relative flex items-center justify-center border-b border-white/5">
            {/* Visual mock of a form */}
            <div className="w-48 bg-[#050A15] border border-white/10 rounded-lg p-3 shadow-2xl opacity-80 group-hover:scale-105 transition-transform">
              <div className="h-2 w-1/2 bg-white/10 rounded mb-3"></div>
              <div className="h-6 w-full bg-white/5 rounded mb-2"></div>
              <div className="h-6 w-full bg-white/5 rounded mb-3"></div>
              <div className="h-8 w-full bg-[#00C2FF] rounded"></div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white">Main Website Contact Form</h3>
                <p className="text-xs text-slate-400">4 fields • Dark Theme</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20">LIVE</span>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white transition-colors">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button 
                onClick={copyCode}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#00C2FF]/10 hover:bg-[#00C2FF]/20 text-[#00C2FF] rounded-lg text-xs font-semibold transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} 
                {copied ? "Copied" : "Embed"}
              </button>
              <button className="w-10 flex items-center justify-center py-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
