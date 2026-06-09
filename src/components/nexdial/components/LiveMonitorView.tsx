import React, { useState, useEffect } from 'react';
import { 
  Activity, Play, Pause, Terminal, Server, Globe, Cpu, AlertCircle, RefreshCw 
} from 'lucide-react';
import { SystemLog } from '../types';

interface LiveMonitorViewProps {
  logs: SystemLog[];
}

export default function LiveMonitorView({ logs: initialLogs }: LiveMonitorViewProps) {
  
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [tick, setTick] = useState(0);

  // Monitor parameters simulation
  const [cpuUsage, setCpuUsage] = useState(24.8);
  const [memoryUsage, setMemoryUsage] = useState(4.2);
  const [sipLines, setSipLines] = useState(8);

  // Simulate streaming logs & telemetry jittering
  useEffect(() => {
    if (!isMonitoringActive) return;

    const interval = setInterval(() => {
      setTick(t => t + 1);

      // Random jittering
      setCpuUsage(prev => Math.max(12, Math.min(85, +(prev + (Math.random() * 8) - 4).toFixed(1))));
      setMemoryUsage(prev => Math.max(2, Math.min(16, +(prev + (Math.random() * 0.4) - 0.2).toFixed(2))));
      setSipLines(prev => Math.max(1, Math.min(32, prev + (Math.random() > 0.7 ? 1 : Math.random() < 0.3 ? -1 : 0))));

      // Add a fresh log item periodically
      if (Math.random() > 0.6) {
        const services = ['Asterisk VoIP Core', 'Carrier Gateway', 'STUN Server', 'Whisper Transcriber', 'SIP Registry'];
        const levels: ('info' | 'warning' | 'error')[] = ['info', 'info', 'warning', 'info'];
        const messages = [
          'Handshake accepted for inbound peer SIP-ID 2049.',
          'Dynamic carrier ping latency settled. Edge response: 14ms.',
          'Barging audio pipeline pre-warmed for outbound campaign sweep.',
          'Muted audio stream frame detected. Initiating buffer correction.',
          'SIP register credentials validated for region ap-south-1.'
        ];

        const newLog: SystemLog = {
          id: `sys-log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          level: levels[Math.floor(Math.random() * levels.length)],
          service: services[Math.floor(Math.random() * services.length)],
          message: messages[Math.floor(Math.random() * messages.length)]
        };

        setLogs(prev => [newLog, ...prev.slice(0, 30)]);
      }

    }, 2500);

    return () => clearInterval(interval);
  }, [isMonitoringActive]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl tracking-tight">Active VoIP Telemetry Monitor</h2>
          <p className="text-xs text-slate-450 mt-1 font-light">Realtime performance indicators of SIP trunk allocations, STUN gateways, and microservices queues.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle monitoring state */}
          <button
            onClick={() => setIsMonitoringActive(!isMonitoringActive)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              isMonitoringActive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {isMonitoringActive ? (
              <>
                <Pause className="w-3.5 h-3.5 shrink-0" />
                <span>MONITORING STREAM ACTIVE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                <span>PAUSED STREAM</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resource Indices Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">SIP VoIP Trunks</span>
            <Server className="w-4 h-4 text-[#818CF8]" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-100 font-mono">{sipLines} / 32</p>
            <p className="text-[10px] text-slate-500 mt-1">Simulated channels assigned</p>
          </div>
        </div>

        <div className="p-4 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Asterisk CPU Core</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-100 font-mono">{cpuUsage}%</p>
            <div className="w-full h-1 bg-slate-950 border border-slate-900 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full transition-all duration-300 ${cpuUsage > 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">VoIP Memory Leak SLA</span>
            <Activity className="w-4 h-4 text-[#00C2FF]" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-100 font-mono">{memoryUsage} GB</p>
            <p className="text-[10px] text-slate-500 mt-1">Allocated cluster buffering heap</p>
          </div>
        </div>

        <div className="p-4 bg-[#0E0E10] border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] uppercase font-mono tracking-wider">Region Ping latency</span>
            <Globe className="w-4 h-4 text-[#00E5B0]" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-100 font-mono">14.2 ms</p>
            <p className="text-[10px] text-emerald-400 mt-1">APAC Mumbai interconnect</p>
          </div>
        </div>

      </div>

      {/* Rolling System Logs Terminal block */}
      <div className="bg-[#0E0E10] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-96">
        
        {/* Terminal Header */}
        <div className="bg-[#0A0A0B] border-b border-slate-800 px-5 py-3.5 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-[#00C2FF]" />
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300">VOIP CORE STACK STREAMS</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <button 
              onClick={handleClearLogs}
              className="text-slate-500 hover:text-slate-350 px-2 py-0.5 border border-slate-800 hover:border-slate-700 rounded transition-all cursor-pointer"
            >
              CLEAR SCREEN
            </button>
            <span className="text-slate-600">Buffer size: {logs.length} lines</span>
          </div>
        </div>

        {/* Terminal logs viewport */}
        <div className="flex-1 p-5 overflow-y-auto space-y-2.5 font-mono text-[11px] custom-scrollbar bg-[#0A0A0B]">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-600">
              No active syslog occurrences recorded inside buffer. Wait for jittering stream ticks...
            </div>
          ) : (
            logs.map((lg) => (
              <div key={lg.id} className="flex gap-4 p-2 bg-[#0E0E10]/40 rounded hover:bg-[#0E0E10]/85 border border-slate-900/60 transition-colors">
                <span className="text-slate-600 shrink-0 select-none">[{lg.timestamp}]</span>
                <span className={`px-1.5 py-0.1 border rounded text-[9px] font-bold tracking-wider shrink-0 uppercase select-none ${
                  lg.level === 'error' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  lg.level === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-indigo-500/10 text-[#818CF8] border-indigo-500/20'
                }`}>
                  {lg.level}
                </span>
                <span className="text-slate-500 font-bold shrink-0">[{lg.service}]</span>
                <p className="text-slate-300 leading-relaxed font-light">{lg.message}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
