import React, { useState } from 'react';
import { 
  Play, Pause, Download, Volume2, Search, Calendar, ChevronRight, FileText, Check, Music 
} from 'lucide-react';
import { CallLog } from '../types';

interface RecordingsViewProps {
  callLogs: CallLog[];
}

export default function RecordingsView({ callLogs }: RecordingsViewProps) {
  
  const [selectedLogId, setSelectedLogId] = useState<string | null>(callLogs[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeLog = callLogs.find(l => l.id === selectedLogId);

  const filteredLogs = callLogs.filter(log => 
    log.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.phoneNumber.includes(searchQuery)
  );

  const formatSecsToMins = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">SIP Audio Recordings Depot</h2>
        <p className="text-xs text-slate-450 mt-1 font-light">Audit completed campaign call recordings, examine speech transcriptions, and review customer satisfaction scoring indices.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Filter recordings by lead name / phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#0E0E10] border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recordings List (col-span-5) */}
        <div className="lg:col-span-5 bg-[#0E0E10] border border-slate-800 rounded-2xl p-4.5 space-y-3.5 h-[450px] flex flex-col overflow-hidden">
          <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 border-b border-slate-900 pb-1.5 pl-1 shrink-0">Historic call archives</p>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1 text-xs">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-10 text-slate-600 font-mono text-[10px]">
                No recordings match your directory search filter.
              </div>
            ) : (
              filteredLogs.map(log => (
                <button
                  key={log.id}
                  onClick={() => {
                    setSelectedLogId(log.id);
                    setIsPlaying(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex justify-between items-center cursor-pointer ${
                    selectedLogId === log.id 
                      ? 'bg-indigo-600/10 border-indigo-500/25 text-indigo-100 shadow' 
                      : 'bg-[#0A0A0B]/80 border-slate-900 hover:border-slate-800 text-slate-450'
                  }`}
                >
                  <div className="space-y-1 truncate pr-2">
                    <p className="font-bold text-slate-200 truncate">{log.contactName}</p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono leading-none">
                      <span>{log.startTime}</span>
                      <span>•</span>
                      <span>{formatSecsToMins(log.duration)}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold shrink-0 ${
                    log.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-400' :
                    log.sentiment === 'Negative' ? 'bg-rose-500/10 text-rose-400' :
                    'bg-slate-900 text-slate-500'
                  }`}>
                    {log.score}% QA
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Player and Transcription details (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {activeLog ? (
            <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-5 space-y-5">
              
              {/* Profile Bar */}
              <div className="flex justify-between items-start border-b border-slate-900 pb-3">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-100">{activeLog.contactName}</h3>
                  <p className="text-[10px] text-slate-500 font-mono">Agent extension assigned: {activeLog.agentName} • Track ID: {activeLog.id}</p>
                </div>

                <button 
                  onClick={() => alert(`Downloading VoIP Audio stream of selected call ID: ${activeLog.id}...`)}
                  className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audio</span>
                </button>
              </div>

              {/* Graphical waveform player simulation */}
              <div className="p-4 bg-[#0A0A0B] rounded-xl border border-slate-900 space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all cursor-pointer shadow"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-slate-450 font-bold">VOIP FLAC AUDIO WAVEFORM STREAM</p>
                    {/* Simulated Waveform Visual Bar Blocks */}
                    <div className="flex items-center gap-0.5 h-6 overflow-hidden">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const h = isPlaying 
                          ? Math.sin(i / 2 + Date.now() / 300) * 8 + 12 
                          : Math.floor(Math.random() * 12) + 4;
                        return (
                          <div 
                            key={i} 
                            style={{ height: `${h}px` }}
                            className={`w-[3px] rounded-full transition-all duration-150 ${
                              isPlaying ? 'bg-indigo-500' : 'bg-slate-800'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Summary section */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-450 pl-1">Speech Transcription Summary</h4>
                <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs text-indigo-250 leading-relaxed font-light">
                  {activeLog.summary}
                </div>
              </div>

              {/* Detailed Dialogue Streams transcript */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-450 pl-1">Speech Timeline turns</h4>
                <div className="p-4 bg-[#0A0A0B] rounded-xl border border-slate-900 max-h-40 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
                  {activeLog.transcription?.map((turn, i) => (
                    <div key={i} className={`space-y-0.5 ${turn.speaker === 'agent' ? 'text-right' : 'text-left'}`}>
                      <span className={`text-[9px] font-mono tracking-wider font-bold uppercase ${
                        turn.speaker === 'agent' ? 'text-[#818CF8]' : 'text-[#00E5B0]'
                      }`}>
                        {turn.speaker} [{turn.timestamp}]
                      </span>
                      <p className={`px-3 py-1.5 inline-block rounded-xl max-w-sm font-light ${
                        turn.speaker === 'agent' 
                          ? 'bg-indigo-650/15 border border-indigo-500/20 text-indigo-150 rounded-tr-none' 
                          : 'bg-emerald-950/15 border border-emerald-500/20 text-emerald-250 rounded-tl-none'
                      }`}>
                        {turn.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl p-10 text-center text-slate-500 font-mono text-xs">
              Select any call recording thread from the archive directories list to retrieve audio parameters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
