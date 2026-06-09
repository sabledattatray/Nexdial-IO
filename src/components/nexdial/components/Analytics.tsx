import React, { useState } from 'react';
import { 
  BarChart3, Sparkles, TrendingUp, Calendar, AlertCircle, FileText, ChevronRight, 
  Smile, ShieldCheck, Heart, CircleCheck, Info, X, Clock, Play, ChevronDown, Award
} from 'lucide-react';
import { CallLog, Agent } from '../types';

interface AnalyticsProps {
  logs: CallLog[];
  agents: Agent[];
}

// Complete industry-standard collection and dialer dispositions schema
const DISPOSITIONS_BASELINE: Record<string, { code: string; label: string; count: number; desc: string; category: string }> = {
  PTP: { code: 'PTP', label: 'Promise to Pay', count: 64, desc: 'Debtor committed to a payment schedule', category: 'Payment' },
  PTPB: { code: 'PTPB', label: 'Promise to Pay Broken', count: 12, desc: 'Debtor defaulted on active promise window', category: 'Default' },
  PAID: { code: 'PAID', label: 'Paid in Full', count: 42, desc: 'Account cleared and settled in full', category: 'Payment' },
  PP: { code: 'PP', label: 'Partial Payment', count: 18, desc: 'Received partial account payment', category: 'Payment' },
  SETT: { code: 'SETT', label: 'Settlement Accepted', count: 10, desc: 'Agreed settlement discount finalized', category: 'Payment' },
  DISP: { code: 'DISP', label: 'Dispute Raised', count: 8, desc: 'Debtor raised formal account dispute', category: 'Administrative' },
  CB: { code: 'CB', label: 'Callback Requested', count: 24, desc: 'Callback scheduled for specific slot', category: 'Follow-Up' },
  FUP: { code: 'FUP', label: 'Follow-Up Required', count: 32, desc: 'Follow-up actions or paperwork needed', category: 'Follow-Up' },
  RPC: { code: 'RPC', label: 'Right Party Contact', count: 120, desc: 'Verified and reached targeted debtor', category: 'Contact' },
  TPC: { code: 'TPC', label: 'Third Party Contact', count: 15, desc: 'Reached spouse, colleague, or relative', category: 'Contact' },
  NA: { code: 'NA', label: 'No Answer', count: 50, desc: 'Call trunk rang out without answer', category: 'Unreached' },
  BUSY: { code: 'BUSY', label: 'Busy Line', count: 28, desc: 'Line busy signal received', category: 'Unreached' },
  VM: { code: 'VM', label: 'Voicemail', count: 40, desc: 'Call routed to voicemail machine', category: 'Unreached' },
  WN: { code: 'WN', label: 'Wrong Number', count: 14, desc: 'Incorrect target contact reached', category: 'Invalid' },
  INV: { code: 'INV', label: 'Invalid Number', count: 9, desc: 'Number syntax is incorrect', category: 'Invalid' },
  DISC: { code: 'DISC', label: 'Disconnected Number', count: 6, desc: 'Number out of service/deactivated', category: 'Invalid' },
  DNC: { code: 'DNC', label: 'Do Not Call', count: 11, desc: 'Contact added to DNC suppression list', category: 'Compliance' },
  REF: { code: 'REF', label: 'Refused to Pay', count: 19, desc: 'Contact refused pay agreement', category: 'Response' },
  HARDSHIP: { code: 'HARDSHIP', label: 'Financial Hardship', count: 7, desc: 'Exempt due to verified financial hardship', category: 'Compliance' },
  BK: { code: 'BK', label: 'Bankruptcy', count: 3, desc: 'Exempt due to active bankruptcy filing', category: 'Compliance' },
  DEC: { code: 'DEC', label: 'Deceased', count: 2, desc: 'Account holder deceased', category: 'Compliance' },
  SKIP: { code: 'SKIP', label: 'Skip Trace Required', count: 11, desc: 'Contact details require skip tracing', category: 'Administrative' },
  LEGAL: { code: 'LEGAL', label: 'Sent to Legal', count: 5, desc: 'Account escalated to legal collection', category: 'Administrative' },
  ESC: { code: 'ESC', label: 'Escalated', count: 9, desc: 'Call escalated to team manager', category: 'Administrative' },
  PEND: { code: 'PEND', label: 'Pending Review', count: 13, desc: 'Pending administrative/backoffice review', category: 'Administrative' },
  PA: { code: 'PA', label: 'Payment Arrangement', count: 30, desc: 'Active instalment agreement running', category: 'Payment' },
  PADEF: { code: 'PADEF', label: 'Arrangement Defaulted', count: 8, desc: 'Instalment payment defaulted', category: 'Default' },
  NRP: { code: 'NRP', label: 'Not Reachable', count: 22, desc: 'Network carrier issue or out of area', category: 'Unreached' },
  LANG: { code: 'LANG', label: 'Language Barrier', count: 6, desc: 'Target speaks a different language', category: 'Response' },
  DROP: { code: 'DROP', label: 'Dropped Call', count: 12, desc: 'Trunk dropped before agent connect', category: 'Default' }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Payment': return { text: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', progress: '#10B981' };
    case 'Default': return { text: '#F43F5E', bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.2)', progress: '#F43F5E' };
    case 'Contact': return { text: '#00C2FF', bg: 'rgba(0,194,255,0.1)', border: 'rgba(0,194,255,0.2)', progress: '#00C2FF' };
    case 'Unreached': return { text: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', progress: '#F59E0B' };
    case 'Invalid': return { text: '#94A3B8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)', progress: '#94A3B8' };
    case 'Compliance': return { text: '#D946EF', bg: 'rgba(217,70,239,0.1)', border: 'rgba(217,70,239,0.2)', progress: '#D946EF' };
    case 'Response': return { text: '#FF6B6B', bg: 'rgba(255,107,107,0.1)', border: 'rgba(255,107,107,0.2)', progress: '#FF6B6B' };
    default: return { text: '#818CF8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)', progress: '#818CF8' };
  }
};

export default function Analytics({ logs, agents }: AnalyticsProps) {
  
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedDropdownCode, setSelectedDropdownCode] = useState<string>('WN');
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  // Date-Picker States
  const [startDateStr, setStartDateStr] = useState<string>('');
  const [endDateStr, setEndDateStr] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Filter logs dynamically based on selected date ranges
  const filteredLogs = React.useMemo(() => {
    return logs.filter(log => {
      const logDate = new Date(log.startTime);
      if (startDateStr) {
        const start = new Date(startDateStr);
        start.setHours(0,0,0,0);
        if (logDate < start) return false;
      }
      if (endDateStr) {
        const end = new Date(endDateStr);
        end.setHours(23,59,59,999);
        if (logDate > end) return false;
      }
      return true;
    });
  }, [logs, startDateStr, endDateStr]);

  const activeLog = filteredLogs.find(l => l.id === selectedLogId);

  // Initialize dynamic counts map with baselines
  const dispositionCounts: Record<string, number> = {};
  Object.keys(DISPOSITIONS_BASELINE).forEach(code => {
    dispositionCounts[code] = DISPOSITIONS_BASELINE[code].count;
  });

  // Increment based on live logs to ensure total mathematical synchronicity
  filteredLogs.forEach(log => {
    const status = (log.status || '').toUpperCase();
    const summary = (log.summary || '').toLowerCase();
    
    if (status === 'COMPLETED') {
      if (summary.includes('ptp') || summary.includes('promise')) {
        dispositionCounts['PTP']++;
      } else if (summary.includes('paid') || summary.includes('full')) {
        dispositionCounts['PAID']++;
      } else {
        dispositionCounts['RPC']++;
      }
    } else if (status === 'MISSED') {
      dispositionCounts['NA']++;
    } else if (status === 'VOICEMAIL') {
      dispositionCounts['VM']++;
    } else if (status === 'DNC') {
      dispositionCounts['DNC']++;
    } else if (dispositionCounts[status] !== undefined) {
      dispositionCounts[status]++;
    } else {
      dispositionCounts['DROP']++;
    }
  });

  const totalCallsCount = Object.values(dispositionCounts).reduce((a, b) => a + b, 0);
  const totalTalkTimeSecs = filteredLogs.reduce((sum, l) => sum + l.duration, 0) + 78200; // Live logs + 21.7 hrs baseline
  
  const averageQuality = Math.round(filteredLogs.reduce((acc, l) => acc + l.score, 0) / (filteredLogs.length || 1)) || 92;
  const avgDuration = Math.round(totalTalkTimeSecs / totalCallsCount);

  // Sentiment ratio counters (live + baseline)
  const posCount = filteredLogs.filter(l => l.sentiment === 'Positive').length + 312;
  const neuCount = filteredLogs.filter(l => l.sentiment === 'Neutral').length + 128;
  const negCount = filteredLogs.filter(l => l.sentiment === 'Negative').length + 48;
  const totalSent = posCount + neuCount + negCount || 1;

  const posPct = Math.round((posCount / totalSent) * 100);
  const neuPct = Math.round((neuCount / totalSent) * 100);
  const negPct = Math.round((negCount / totalSent) * 100);

  // SVG Chart points
  const points = [
    { x: 30, y: 160, day: 'Mon', count: 120 },
    { x: 100, y: 110, day: 'Tue', count: 240 },
    { x: 170, y: 130, day: 'Wed', count: 190 },
    { x: 240, y: 60, day: 'Thu', count: 340 },
    { x: 310, y: 80, day: 'Fri', count: 290 },
    { x: 380, y: 140, day: 'Sat', count: 150 },
    { x: 450, y: 40, day: 'Sun', count: 420 },
  ];

  const linePathStr = points.map(p => `${p.x},${p.y}`).join(' L ');
  const areaPathStr = `M ${points[0].x},180 L ${linePathStr} L ${points[points.length - 1].x},180 Z`;

  const formatTalkTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const formattedTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const getPct = (count: number) => {
    return totalCallsCount ? Math.round((count / totalCallsCount) * 1000) / 10 : 0;
  };

  const handleExportToExcel = () => {
    // 1. Prepare CSV Header
    let csvContent = 'Call ID,Contact Name,Phone Number,Start Time,Duration (secs),Direction,Agent Name,QA Score,Sentiment,Summary\n';
    
    // 2. Map logs to rows
    filteredLogs.forEach(log => {
      csvContent += `${log.id},"${log.contactName.replace(/"/g, '""')}",`;
      csvContent += `"${log.phoneNumber}","${new Date(log.startTime).toLocaleString()}",`;
      csvContent += `${log.duration},${log.type},"${log.agentName.replace(/"/g, '""')}",`;
      csvContent += `${log.score},${log.sentiment},"${log.summary.replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    });

    // 3. Append detailed 30-Dispositions Summary worksheet at the bottom
    csvContent += '\n\n';
    csvContent += 'DIALER DISPOSITIONS CONTRIBUTION WORKSHEET SUMMARY\n';
    csvContent += 'Disposition Code,Meaning/Label,Operational Category,Occurrences Count,Percentage Contribution\n';
    
    Object.keys(DISPOSITIONS_BASELINE).forEach(code => {
      const item = DISPOSITIONS_BASELINE[code];
      const count = dispositionCounts[code];
      const pct = getPct(count);
      csvContent += `${code},"${item.label}","${item.category}",${count},${pct}%\n`;
    });

    // 4. Trigger file download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nexdial_dispositions_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 5. Trigger notification
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  // Important dispositions to show as premium cards (18 codes in a 6/3 layout)
  const IMPORTANT_CODES = [
    'PTP', 'PTPB', 'PAID', 'PP', 'SETT', 'DISP', 
    'CB', 'FUP', 'RPC', 'TPC', 'NA', 'BUSY', 
    'VM', 'DNC', 'REF', 'HARDSHIP', 'BK', 'DROP'
  ];

  // Remaining dispositions to load inside the dropdown selector
  const REMAINING_CODES = Object.keys(DISPOSITIONS_BASELINE).filter(code => !IMPORTANT_CODES.includes(code));
  const activeDropdownItem = DISPOSITIONS_BASELINE[selectedDropdownCode];
  const activeDropdownCount = dispositionCounts[selectedDropdownCode] || 0;

  const handleExportReport = (reportType: string) => {
    let csvContent = '';
    let filename = '';

    if (reportType === 'dialer_metrics') {
      filename = `dialer_metrics_report_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Metric Name,Value,Benchmark/Status,Description\n';
      csvContent += `Weekly Call Volume,${totalCallsCount},↑ 14%,Dialed contacts volume trends\n`;
      csvContent += `Total Talk Time,"${formatTalkTime(totalTalkTimeSecs)}",Live,VoIP core channel utilization\n`;
      csvContent += `Average Call Duration,"${formattedTime(avgDuration)}",Stable,Wrap timers not included\n`;
      csvContent += `Blended QA Score,${averageQuality}%,SLA Benchmark: 85%,QA evaluation averages\n`;
      csvContent += `Positive Sentiment Ratio,${posPct}%,Target: >60%,Happy mood quotient percentage\n`;
    } 
    else if (reportType === 'agent_dispositions') {
      filename = `agent_dispositions_report_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Agent Name,Role,Status,Calls Today,Talk Time (secs),QA Score (%),Sentiment\n';
      agents.forEach(agent => {
        csvContent += `"${agent.name.replace(/"/g, '""')}",${agent.role},${agent.status},${agent.callsToday},${agent.talkTime},${agent.qualityScore},${agent.sentiment}\n`;
      });
    } 
    else if (reportType === 'call_connect') {
      filename = `call_connectivity_report_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Call ID,Contact Name,Phone Number,Start Time,Duration (secs),Rep Name,Status,Connected State\n';
      logs.forEach(log => {
        const isConnected = log.status === 'Completed' || log.status === 'Transferred' || log.status === 'Whispering';
        const connState = isConnected ? 'Connected' : 'Unconnected';
        csvContent += `${log.id},"${log.contactName.replace(/"/g, '""')}",`;
        csvContent += `"${log.phoneNumber}","${new Date(log.startTime).toLocaleString()}",`;
        csvContent += `${log.duration},"${log.agentName.replace(/"/g, '""')}",${log.status},${connState}\n`;
      });
    } 
    else if (reportType === 'qa_compliance') {
      filename = `qa_compliance_audit_report_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Rep Name,Extension,Role,QA Score,Status,Compliance Threshold,Audit Status\n';
      agents.forEach(agent => {
        const auditStatus = agent.qualityScore >= 85 ? 'Compliant' : 'Under Review';
        csvContent += `"${agent.name.replace(/"/g, '""')}",SIP-${1000 + Math.floor(Math.random() * 900)},${agent.role},${agent.qualityScore}%,${agent.status},85%,${auditStatus}\n`;
      });
    } 
    else if (reportType === 'campaigns_summary') {
      filename = `campaigns_performance_report_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Campaign ID,Campaign Name,Type,Status,Contacts Count,Called Count,Success Rate (%)\n';
      csvContent += 'CAMP-01,"Early Stage Collection Sweep",Predictive Dialer,Active,1200,740,42%\n';
      csvContent += 'CAMP-02,"Late Stage Auto-Dialer",Power Dialer,Active,850,390,28%\n';
      csvContent += 'CAMP-03,"SMS Outreach Sweep",SMS broadcast,Completed,1500,1500,94%\n';
    }

    if (csvContent && filename) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }
    setIsExportDropdownOpen(false);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      
      {/* Page Header with Export Dropdown */}
      <div className="border-b border-[#334155] pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl">Visual Speech Analytics & Whispers repository</h2>
          <p className="text-xs text-slate-450 leading-relaxed font-light mt-1">Render custom SVG volume gauges, drill down into customer mood curves, and retrieve written transcription call logs.</p>
        </div>
        
        {/* Export and Date Filter controls in top right */}
        <div className="flex flex-col items-stretch md:items-end gap-2.5 shrink-0 z-20">
          
          {/* Export Dropdown Menu */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="w-full md:w-48 px-4 py-2 bg-[#1E293B] hover:bg-[#2D3A4F] text-white border border-[#334155] hover:border-brand-primary text-xs font-bold font-mono tracking-wide rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Export Report</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isExportDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isExportDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsExportDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl z-50 py-2 animate-fade-in overflow-hidden">
                  <p className="px-4 py-1.5 text-[9px] uppercase tracking-widest text-slate-500 font-bold border-b border-[#334155]/60 mb-1">Select Report Type</p>
                  <button
                    onClick={() => handleExportReport('dialer_metrics')}
                    className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8]" />
                    Dialer Metrics
                  </button>
                  <button
                    onClick={() => handleExportReport('agent_dispositions')}
                    className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    Agent Disposition
                  </button>
                  <button
                    onClick={() => handleExportReport('call_connect')}
                    className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
                    Call Connect Report
                  </button>
                  <button
                    onClick={() => handleExportReport('qa_compliance')}
                    className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D946EF]" />
                    QA SLA Compliance Audit
                  </button>
                  <button
                    onClick={() => handleExportReport('campaigns_summary')}
                    className="w-full px-4 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    Campaign Performance Summary
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Date Picker Range Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="w-full md:w-48 px-4 py-2 bg-[#1E293B] hover:bg-[#2D3A4F] text-white border border-[#334155] hover:border-brand-primary text-xs font-bold font-mono tracking-wide rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="truncate">
                  {startDateStr || endDateStr ? `${startDateStr || '*'} to ${endDateStr || '*'}` : 'Filter Date Range'}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDatePickerOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDatePickerOpen(false)} />
                <div className="absolute right-0 mt-2 w-72 bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl z-50 p-4.5 animate-fade-in space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold border-b border-[#334155]/60 pb-1.5">Date Range Filter</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase">Start Date</label>
                      <input 
                        type="date" 
                        value={startDateStr}
                        onChange={(e) => setStartDateStr(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#0F172A] border border-[#334155] text-slate-200 text-xs font-mono rounded-xl focus:outline-none focus:border-indigo-550 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase">End Date</label>
                      <input 
                        type="date" 
                        value={endDateStr}
                        onChange={(e) => setEndDateStr(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#0F172A] border border-[#334155] text-slate-200 text-xs font-mono rounded-xl focus:outline-none focus:border-indigo-550 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preset Shortcuts */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#334155]/40">
                    <button
                      onClick={() => {
                        const today = new Date().toISOString().split('T')[0];
                        setStartDateStr(today);
                        setEndDateStr(today);
                      }}
                      className="py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-medium font-mono rounded-lg transition-colors border border-transparent hover:border-[#334155] cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        const end = new Date();
                        const start = new Date();
                        start.setDate(end.getDate() - 7);
                        setStartDateStr(start.toISOString().split('T')[0]);
                        setEndDateStr(end.toISOString().split('T')[0]);
                      }}
                      className="py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-medium font-mono rounded-lg transition-colors border border-transparent hover:border-[#334155] cursor-pointer"
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => {
                        const end = new Date();
                        const start = new Date();
                        start.setDate(end.getDate() - 30);
                        setStartDateStr(start.toISOString().split('T')[0]);
                        setEndDateStr(end.toISOString().split('T')[0]);
                      }}
                      className="py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-medium font-mono rounded-lg transition-colors border border-transparent hover:border-[#334155] cursor-pointer"
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => {
                        setStartDateStr('');
                        setEndDateStr('');
                      }}
                      className="py-1 bg-slate-900/60 hover:bg-slate-800 text-[10px] text-red-400 hover:text-red-350 font-medium font-mono rounded-lg transition-colors border border-red-500/10 hover:border-red-500/20 cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>

                  <button
                    onClick={() => setIsDatePickerOpen(false)}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/15"
                  >
                    Apply Range Filter
                  </button>
                </div>
              </>
            )}
          </div>
      </div>
      </div>
      
      {/* 1. Dynamic Key Performance Indicators Tickers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] hover:border-brand-primary duration-155">
          <p className="text-[10px] text-slate-450 font-mono uppercase tracking-widest mb-1">Weekly Call Volume</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">{totalCallsCount}</span>
            <span className="text-xs text-accent-teal font-medium font-mono">↑ 14%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Active predictive dials inclusive</p>
        </div>

        <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] hover:border-[#00C2FF] duration-155">
          <p className="text-[10px] text-slate-450 font-mono uppercase tracking-widest mb-1">Total Talk Time</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-white">{formatTalkTime(totalTalkTimeSecs)}</span>
            <span className="text-xs text-accent-teal font-medium font-mono">Live</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">VoIP core channel utilization</p>
        </div>

        <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] hover:border-[#00E5B0] duration-155">
          <p className="text-[10px] text-slate-450 font-mono uppercase tracking-widest mb-1">Average Call Duration</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">{formattedTime(avgDuration)}</span>
            <span className="text-xs text-slate-400 font-medium font-mono">Stable</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Wrap timers not included</p>
        </div>

        <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] hover:border-[#FF6B6B] duration-155">
          <p className="text-[10px] text-slate-450 font-mono uppercase tracking-widest mb-1">Blended QA Score</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-white">
              {averageQuality}%
            </span>
            <span className="text-xs text-accent-teal font-medium font-mono">↑ 3.2%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Target benchmark SLA: 85%</p>
        </div>
      </div>

      {/* 2. Premium Dialer Dispositions Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-900 pb-2">
          <div>
            <h4 className="font-display font-bold text-base text-white">Primary Outbox Dispositions</h4>
            <p className="text-[10px] text-slate-450 font-mono tracking-wide mt-0.5">Highest volume outreach outcomes & contribution percentages</p>
          </div>
          <span className="text-[9px] text-slate-600 font-mono uppercase">Key Indicators</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {IMPORTANT_CODES.map(code => {
            const item = DISPOSITIONS_BASELINE[code];
            const count = dispositionCounts[code] || 0;
            const pct = getPct(count);
            const colors = getCategoryColor(item.category);
            
            return (
              <div 
                key={code} 
                className="bg-[#1E293B]/70 p-4.5 rounded-2xl border border-[#334155] hover:border-[#818CF8]/30 transition-all space-y-3 relative overflow-hidden group flex flex-col justify-between"
              >
                <div 
                  className="absolute top-0 right-0 w-12 h-12 rounded-full blur-lg pointer-events-none group-hover:opacity-100 transition-opacity" 
                  style={{ backgroundColor: colors.text, opacity: 0.04 }} 
                />
                
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold">{code}</span>
                  <span 
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
                    style={{ color: colors.text, backgroundColor: colors.bg, borderColor: colors.border }}
                  >
                    {pct}%
                  </span>
                </div>
                
                <div>
                  <p className="text-lg font-black text-slate-100 font-mono">{count}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5 truncate leading-snug" title={item.label}>{item.label}</p>
                </div>
                
                <div className="w-full h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: colors.progress }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Secondary/Remaining Dispositions Interactive Dropdown Selector */}
      <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] space-y-5 shadow-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#334155]/65 pb-3">
          <div>
            <h4 className="font-display font-bold text-base text-white">Interactive Dispositions Directory</h4>
            <p className="text-[10px] text-slate-450 font-mono mt-0.5">Audit any of the remaining 22 collection statuses and compliance codes</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-450 font-mono">Select Code:</span>
            <div className="relative">
              <select 
                value={selectedDropdownCode}
                onChange={(e) => setSelectedDropdownCode(e.target.value)}
                className="appearance-none px-4 py-2 pr-9 bg-[#0F172A] border border-[#334155] text-slate-200 text-xs font-mono rounded-xl focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {REMAINING_CODES.map(code => (
                  <option key={code} value={code}>
                    {code} — {DISPOSITIONS_BASELINE[code].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Selected Dropdown Item detail card */}
        {activeDropdownItem && (
          <div className="p-5 bg-[#0F172A] border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-fade-in relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
            
            <div className="space-y-1.5 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-950/20 text-[#818CF8] border border-indigo-500/20 text-xs font-mono font-bold rounded">
                  {activeDropdownItem.code}
                </span>
                <span className="text-sm font-bold text-slate-200">{activeDropdownItem.label}</span>
                <span className="text-[10px] text-slate-650 font-mono">•</span>
                <span className="text-[10px] text-slate-550 font-mono uppercase">{activeDropdownItem.category} Category</span>
              </div>
              <p className="text-xs text-slate-450 font-light leading-relaxed">
                {activeDropdownItem.desc}
              </p>
            </div>

            <div className="flex flex-col md:items-end justify-center space-y-2.5 bg-[#1E293B]/40 p-4 rounded-xl border border-[#334155]/60 md:border-transparent md:bg-transparent">
              <div className="flex items-baseline gap-2 md:text-right">
                <span className="text-[10px] uppercase font-mono text-slate-500">Occurrences:</span>
                <span className="text-2xl font-black text-slate-100 font-mono">{activeDropdownCount}</span>
                <span className="text-[10px] font-mono text-[#00C2FF] font-semibold bg-[#00C2FF]/10 px-1.5 py-0.5 rounded border border-[#00C2FF]/20">
                  {getPct(activeDropdownCount)}%
                </span>
              </div>
              <div className="w-full md:w-48 h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${getPct(activeDropdownCount)}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Handcrafted SVG Charts Layouts */}
      <div className="space-y-6">
        
        {/* Row 1: Line/Area Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Daily Call Volume curve layout */}
          <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] space-y-4">
            <div className="flex justify-between items-center border-b border-[#334155]/65 pb-3">
              <div>
                <h4 className="font-display font-bold text-sm text-white">Dialing Frequency Spectrum</h4>
                <p className="text-[10px] text-slate-450 font-mono tracking-wide mt-0.5">Dialed contacts volume trends vs Day schedule</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Call Volume Baseline</span>
              </div>
            </div>

            <div className="w-full">
              <svg viewBox="0 0 480 200" className="w-full h-48 select-none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B5EFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5B5EFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <line x1="10" y1="180" x2="470" y2="180" stroke="#334155" strokeWidth="1" />
                
                {points.map((p, i) => (
                  <g key={i}>
                    <line x1={p.x} y1="30" x2={p.x} y2="180" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x={p.x} y="195" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">{p.day}</text>
                    <circle cx={p.x} cy={p.y} r="4" fill="#00E5B0" stroke="#5B5EFF" strokeWidth="1.5" />
                    <text x={p.x} y={p.y - 10} fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{p.count}</text>
                  </g>
                ))}

                <path d={areaPathStr} fill="url(#chartGlow)" />
                <path d={`M ${linePathStr}`} fill="none" stroke="#5B5EFF" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Chart 2: Quality Score vs SLA Line Chart */}
          <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] space-y-4">
            <div className="flex justify-between items-center border-b border-[#334155]/65 pb-3">
              <div>
                <h4 className="font-display font-bold text-sm text-white">Quality Rating vs Target SLA</h4>
                <p className="text-[10px] text-slate-450 font-mono tracking-wide mt-0.5">Weekly agent QA score curve relative to target baseline</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <Award className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>SLA Target: 85%</span>
              </div>
            </div>

            <div className="w-full">
              <svg viewBox="0 0 480 200" className="w-full h-48 select-none">
                <defs>
                  <linearGradient id="qaGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal reference baseline */}
                <line x1="10" y1="180" x2="470" y2="180" stroke="#334155" strokeWidth="1" />
                
                {/* SLA Target Line (Dashed Red) at y = 170 - (85 * 1.4) = 51 */}
                <line x1="10" y1="51" x2="470" y2="51" stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="460" y="45" fill="#FF6B6B" fontSize="8" fontFamily="monospace" textAnchor="end">SLA LIMIT (85%)</text>
                
                {/* QA Score points mapping */}
                {(() => {
                  const qaScores = [88, 91, 90, 94, 92, 93, 95];
                  const qaPoints = points.map((p, i) => ({
                    x: p.x,
                    y: 170 - (qaScores[i] * 1.4),
                    day: p.day,
                    score: qaScores[i]
                  }));
                  
                  const qaLinePath = qaPoints.map(p => `${p.x},${p.y}`).join(' L ');
                  const qaAreaPath = `M ${qaPoints[0].x},180 L ${qaLinePath} L ${qaPoints[qaPoints.length - 1].x},180 Z`;

                  return (
                    <g>
                      {/* Grid Lines */}
                      {qaPoints.map((p, i) => (
                        <g key={i}>
                          <line x1={p.x} y1="30" x2={p.x} y2="180" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                          <text x={p.x} y="195" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">{p.day}</text>
                          <circle cx={p.x} cy={p.y} r="4.5" fill="#00C2FF" stroke="#0057D9" strokeWidth="1.5" />
                          <text x={p.x} y={p.y - 10} fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{p.score}%</text>
                        </g>
                      ))}
                      
                      {/* Area Underlay */}
                      <path d={qaAreaPath} fill="url(#qaGlow)" />
                      
                      {/* Trend Line */}
                      <path d={`M ${qaLinePath}`} fill="none" stroke="#00C2FF" strokeWidth="2.5" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

        </div>

        {/* Row 2: Pie and Donut Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Chart 3: Call Direction Bar Chart */}
          <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="border-b border-[#334155]/65 pb-2.5">
              <h4 className="font-display font-bold text-sm text-white">Call Channels (Bar Chart)</h4>
              <p className="text-[10px] text-slate-450 font-mono mt-0.5">Weekly Call directions ratio</p>
            </div>

            <div className="w-full py-2">
              <svg viewBox="0 0 200 120" className="w-full h-32 select-none">
                {/* Y-axis gridlines */}
                <line x1="45" y1="10" x2="45" y2="100" stroke="#334155" strokeWidth="1" />
                <line x1="45" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="1" />
                <line x1="81.25" y1="10" x2="81.25" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="117.5" y1="10" x2="117.5" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="153.75" y1="10" x2="153.75" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="190" y1="10" x2="190" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* X-axis labels at bottom */}
                <text x="45" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">0%</text>
                <text x="81.25" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">25%</text>
                <text x="117.5" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">50%</text>
                <text x="153.75" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">75%</text>
                <text x="190" y="112" fill="#64748B" fontSize="7" fontFamily="monospace" textAnchor="middle">100%</text>

                {/* Outbound (60%): 60% of 145px is 87px */}
                <rect x="45" y="20" width="87" height="14" rx="3" fill="#818CF8" />
                <text x="40" y="30" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">OUT</text>
                <text x="137" y="30" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">60%</text>

                {/* Inbound (25%): 25% of 145px is 36.25px */}
                <rect x="45" y="50" width="36.25" height="14" rx="3" fill="#00C2FF" />
                <text x="40" y="60" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">IN</text>
                <text x="86.25" y="60" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">25%</text>

                {/* AI Automated (15%): 15% of 145px is 21.75px */}
                <rect x="45" y="80" width="21.75" height="14" rx="3" fill="#00E5B0" />
                <text x="40" y="90" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">AI</text>
                <text x="71.75" y="90" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">15%</text>
              </svg>
            </div>

            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                  <span className="text-slate-450">Outbound:</span>
                </div>
                <span className="text-slate-200 font-bold">60.0%</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                  <span className="text-slate-450">Inbound:</span>
                </div>
                <span className="text-slate-200 font-bold">25.0%</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                  <span className="text-slate-450">AI Automated:</span>
                </div>
                <span className="text-slate-200 font-bold">15.0%</span>
              </div>
            </div>
          </div>

          {/* Chart 4: Call Sentiment Donut Chart */}
          <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="border-b border-[#334155]/65 pb-2.5">
              <h4 className="font-display font-bold text-sm text-white">Call Sentiment (Donut)</h4>
              <p className="text-[10px] text-slate-450 font-mono mt-0.5">Speech tone & mood vectors</p>
            </div>

            <div className="flex justify-center items-center relative py-4">
              <svg width="140" height="140" viewBox="0 0 36 36" className="w-32 h-32 select-none transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00E5B0" strokeWidth="3.5" strokeDasharray={`${posPct} ${100 - posPct}`} strokeDashoffset="100" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00C2FF" strokeWidth="3.5" strokeDasharray={`${neuPct} ${100 - neuPct}`} strokeDashoffset={`${100 - posPct}`} />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeDasharray={`${negPct} ${100 - negPct}`} strokeDashoffset={`${100 - posPct - neuPct}`} />
              </svg>
              <div className="absolute text-center">
                <span className="text-[8px] text-slate-500 font-mono block">Positive Ratio</span>
                <span className="text-xl font-display font-black text-[#00E5B0]">{posPct}%</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                  <span className="text-slate-450">Positive:</span>
                </div>
                <span className="text-slate-200 font-bold">{posPct}%</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                  <span className="text-slate-450">Neutral:</span>
                </div>
                <span className="text-slate-200 font-bold">{neuPct}%</span>
              </div>
              <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                  <span className="text-slate-450">Negative:</span>
                </div>
                <span className="text-slate-200 font-bold">{negPct}%</span>
              </div>
            </div>
          </div>

          {/* Chart 5: Operational Categories Donut Chart */}
          <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
            <div className="border-b border-[#334155]/65 pb-2.5">
              <h4 className="font-display font-bold text-sm text-white">Categories (Donut)</h4>
              <p className="text-[10px] text-slate-450 font-mono mt-0.5">Outbox operations classification</p>
            </div>

            {(() => {
              const catPayment = (dispositionCounts['RPC'] || 0) + (dispositionCounts['PTP'] || 0) + (dispositionCounts['PP'] || 0) + (dispositionCounts['SETT'] || 0) + (dispositionCounts['PA'] || 0);
              const catUnreached = (dispositionCounts['NA'] || 0) + (dispositionCounts['BUSY'] || 0) + (dispositionCounts['VM'] || 0) + (dispositionCounts['NRP'] || 0);
              const catCompliance = (dispositionCounts['DNC'] || 0) + (dispositionCounts['HARDSHIP'] || 0) + (dispositionCounts['BK'] || 0) + (dispositionCounts['DEC'] || 0);
              
              const payPct = Math.round((catPayment / totalCallsCount) * 100) || 35;
              const unrPct = Math.round((catUnreached / totalCallsCount) * 100) || 30;
              const compPct = Math.round((catCompliance / totalCallsCount) * 100) || 12;
              const admPct = 100 - payPct - unrPct - compPct;

              return (
                <>
                  <div className="flex justify-center items-center relative py-4">
                    <svg width="140" height="140" viewBox="0 0 36 36" className="w-32 h-32 select-none transform -rotate-90">
                      {/* Payment */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#818CF8" strokeWidth="3.5" strokeDasharray={`${payPct} ${100 - payPct}`} strokeDashoffset="100" />
                      {/* Unreached */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray={`${unrPct} ${100 - unrPct}`} strokeDashoffset={`${100 - payPct}`} />
                      {/* Compliance */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray={`${compPct} ${100 - compPct}`} strokeDashoffset={`${100 - payPct - unrPct}`} />
                      {/* Administrative */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00E5B0" strokeWidth="3.5" strokeDasharray={`${admPct} ${100 - admPct}`} strokeDashoffset={`${100 - payPct - unrPct - compPct}`} />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-[8px] text-slate-500 font-mono block">Collection</span>
                      <span className="text-xl font-display font-black text-[#818CF8]">{payPct}%</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[9px] font-mono">
                    <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#818CF8]" />
                        <span className="text-slate-500">Payment:</span>
                      </div>
                      <span className="text-slate-200 font-bold">{payPct}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        <span className="text-slate-500">Unreached:</span>
                      </div>
                      <span className="text-slate-200 font-bold">{unrPct}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                        <span className="text-slate-500">Compliance:</span>
                      </div>
                      <span className="text-slate-200 font-bold">{compPct}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5B0]" />
                        <span className="text-slate-500">Admin/Other:</span>
                      </div>
                      <span className="text-slate-200 font-bold">{admPct}%</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

        </div>

        {/* Row 3: Advanced Operational Analysis (PTP Double Line, Duration Pie, QA SLA Cohorts Donut) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chart 6: Promise to Pay Recovery Trends (Double Line Chart) */}
          {(() => {
            const basePtp = [45, 52, 48, 70, 58, 35, 82];
            const basePtpb = [8, 14, 10, 18, 12, 5, 22];
            const todayIdx = (new Date().getDay() + 6) % 7;
            
            const livePtpCount = logs.filter(log => {
              const summary = (log.summary || '').toLowerCase();
              return (log.status || '').toUpperCase() === 'COMPLETED' && (summary.includes('ptp') || summary.includes('promise'));
            }).length;

            const livePtpbCount = logs.filter(log => {
              const status = (log.status || '').toUpperCase();
              return status === 'PTPB' || (log.status || '').toUpperCase() === 'PTPB';
            }).length;

            const ptpValues = [...basePtp];
            const ptpbValues = [...basePtpb];
            ptpValues[todayIdx] += livePtpCount;
            ptpbValues[todayIdx] += livePtpbCount;

            const ptpPoints = ptpValues.map((val, idx) => ({
              x: 20 + idx * 32,
              y: 90 - (val * 0.7)
            }));
            const ptpbPoints = ptpbValues.map((val, idx) => ({
              x: 20 + idx * 32,
              y: 90 - (val * 0.7)
            }));

            const ptpPath = ptpPoints.map(p => `${p.x},${p.y}`).join(' L ');
            const ptpbPath = ptpbPoints.map(p => `${p.x},${p.y}`).join(' L ');
            
            const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

            return (
              <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
                <div className="border-b border-[#334155]/65 pb-2.5">
                  <h4 className="font-display font-bold text-sm text-white">PTP Collection Curve (Line)</h4>
                  <p className="text-[10px] text-slate-450 font-mono mt-0.5">Promise vs defaults tracking</p>
                </div>
                
                <div className="flex justify-center items-center py-2">
                  <svg viewBox="0 0 240 120" className="w-full h-32 select-none">
                    <line x1="10" y1="100" x2="230" y2="100" stroke="#334155" strokeWidth="1" />
                    <line x1="10" y1="65" x2="230" y2="65" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="10" y1="30" x2="230" y2="30" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
                    
                    <path d={`M ${ptpPath}`} fill="none" stroke="#818CF8" strokeWidth="2" />
                    <path d={`M ${ptpbPath}`} fill="none" stroke="#FF6B6B" strokeWidth="2" />

                    {days.map((day, idx) => (
                      <g key={idx}>
                        <text x={20 + idx * 32} y="112" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">{day}</text>
                        <circle cx={ptpPoints[idx].x} cy={ptpPoints[idx].y} r="2.5" fill="#818CF8" />
                        <circle cx={ptpbPoints[idx].x} cy={ptpbPoints[idx].y} r="2.5" fill="#FF6B6B" />
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                      <span className="text-slate-450">Promises Kept (PTP):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{ptpValues.reduce((a,b) => a+b, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                      <span className="text-slate-450">Broken Promises (PTPB):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{ptpbValues.reduce((a,b) => a+b, 0)}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Chart 7: Call Duration Spectrum (Pie Chart) */}
          {(() => {
            let activeShort = 0;
            let activeMedium = 0;
            let activeLong = 0;

            logs.forEach(log => {
              if (log.duration < 60) activeShort++;
              else if (log.duration <= 180) activeMedium++;
              else activeLong++;
            });

            const shortCount = 240 + activeShort;
            const mediumCount = 180 + activeMedium;
            const longCount = 80 + activeLong;
            const totalDurationCount = shortCount + mediumCount + longCount || 1;

            const shortPct = Math.round((shortCount / totalDurationCount) * 100);
            const mediumPct = Math.round((mediumCount / totalDurationCount) * 100);
            const longPct = 100 - shortPct - mediumPct;

            return (
              <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
                <div className="border-b border-[#334155]/65 pb-2.5">
                  <h4 className="font-display font-bold text-sm text-white">Call Durations (Pie)</h4>
                  <p className="text-[10px] text-slate-450 font-mono mt-0.5">Average talktime interval slices</p>
                </div>

                <div className="flex justify-center items-center py-4">
                  <svg width="140" height="140" viewBox="0 0 66 66" className="w-32 h-32 select-none transform -rotate-90">
                    <circle cx="33" cy="33" r="15.915" fill="none" stroke="#00E5B0" strokeWidth="31.83" strokeDasharray={`${shortPct} ${100 - shortPct}`} strokeDashoffset="100" />
                    <circle cx="33" cy="33" r="15.915" fill="none" stroke="#00C2FF" strokeWidth="31.83" strokeDasharray={`${mediumPct} ${100 - mediumPct}`} strokeDashoffset={`${100 - shortPct}`} />
                    <circle cx="33" cy="33" r="15.915" fill="none" stroke="#FF6B6B" strokeWidth="31.83" strokeDasharray={`${longPct} ${100 - longPct}`} strokeDashoffset={`${100 - shortPct - mediumPct}`} />
                  </svg>
                </div>

                <div className="space-y-1.5 text-[10px] font-mono">
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                      <span className="text-slate-450">Short (&lt;1m):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{shortPct}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                      <span className="text-slate-450">Medium (1-3m):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{mediumPct}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                      <span className="text-slate-450">Long (&gt;3m):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{longPct}%</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Chart 8: Agent SLA Cohorts (Donut Chart) */}
          {(() => {
            const activeAgents = agents || [];
            const eliteCount = activeAgents.filter(a => a.qualityScore >= 95).length || 3;
            const achievedCount = activeAgents.filter(a => a.qualityScore >= 85 && a.qualityScore < 95).length || 5;
            const reviewCount = activeAgents.filter(a => a.qualityScore < 85).length || 1;

            const totalAgentsCount = eliteCount + achievedCount + reviewCount || 1;

            const elitePct = Math.round((eliteCount / totalAgentsCount) * 100);
            const achievedPct = Math.round((achievedCount / totalAgentsCount) * 100);
            const reviewPct = 100 - elitePct - achievedPct;

            return (
              <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4 flex flex-col justify-between">
                <div className="border-b border-[#334155]/65 pb-2.5">
                  <h4 className="font-display font-bold text-sm text-white">QA Cohorts (Donut)</h4>
                  <p className="text-[10px] text-slate-450 font-mono mt-0.5">Agent QA score distribution</p>
                </div>

                <div className="flex justify-center items-center relative py-4">
                  <svg width="140" height="140" viewBox="0 0 36 36" className="w-32 h-32 select-none transform -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00E5B0" strokeWidth="3.5" strokeDasharray={`${elitePct} ${100 - elitePct}`} strokeDashoffset="100" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#818CF8" strokeWidth="3.5" strokeDasharray={`${achievedPct} ${100 - achievedPct}`} strokeDashoffset={`${100 - elitePct}`} />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF6B6B" strokeWidth="3.5" strokeDasharray={`${reviewPct} ${100 - reviewPct}`} strokeDashoffset={`${100 - elitePct - achievedPct}`} />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[8px] text-slate-500 font-mono block">Elite Ratio</span>
                    <span className="text-xl font-display font-black text-[#00E5B0]">{elitePct}%</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] font-mono">
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E5B0]" />
                      <span className="text-slate-450">Elite (&ge;95%):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{elitePct}% ({eliteCount})</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                      <span className="text-slate-450">Target (85-94%):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{achievedPct}% ({achievedCount})</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F172A] px-3 py-1.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                      <span className="text-slate-450">Review (&lt;85%):</span>
                    </div>
                    <span className="text-slate-200 font-bold">{reviewPct}% ({reviewCount})</span>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>

      </div>

      {/* 5. Telemetry Historic logs table index */}
      <div className="bg-[#1E293B] rounded-3xl border border-[#334155] overflow-hidden space-y-4">
        
        <div className="p-6 border-b border-[#334155] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#11192E]">
          <div>
            <h4 className="font-display font-bold text-base text-white">Call Recording & Whisper Logs Repository</h4>
            <p className="text-[10px] text-slate-450 font-mono mt-0.5">Historical dial results with text transcripts access</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportToExcel}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white border-transparent text-[10px] font-bold font-mono tracking-wide rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-700/10"
              title="Download call logs spreadsheet for Excel"
            >
              <span>Download Excel (CSV)</span>
            </button>
            <span className="text-[10px] bg-brand-primary/10 text-brand-secondary px-3 py-1.5 rounded-full font-mono font-bold">
              Audit Ready HIPAA Traced
            </span>
          </div>
        </div>

        {exportSuccess && (
          <div className="mx-6 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
            <CircleCheck className="w-4 h-4 shrink-0" />
            <span>Call reports spreadsheet successfully prepared and downloaded.</span>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar px-6 pb-6">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#334155] text-slate-450 uppercase font-mono text-[9px] tracking-wider pb-3">
                <th className="py-3 font-semibold">Contact Representative</th>
                <th className="py-3 font-semibold">Call Date/Time</th>
                <th className="py-3 font-semibold">Direction</th>
                <th className="py-3 font-semibold text-center">Duration</th>
                <th className="py-3 font-semibold">Rep Name</th>
                <th className="py-3 font-semibold">SLA Quality Mark</th>
                <th className="py-3 font-semibold">Sentiment</th>
                <th className="py-3 font-semibold text-center">Transcripts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]/40 text-xs font-light">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className="hover:bg-slate-900/20 cursor-pointer transition-all duration-150"
                  onClick={() => setSelectedLogId(log.id)}
                >
                  <td className="py-3.5 font-medium text-white">
                    {log.contactName}
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{log.phoneNumber}</p>
                  </td>
                  <td className="py-3.5 text-slate-400 font-mono">{new Date(log.startTime).toLocaleString()}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider ${log.type === 'Inbound' ? 'bg-[#00E5B0]/10 text-accent-teal border border-[#00E5B0]/20' : 'bg-[#00C2FF]/10 text-accent-blue border border-[#00C2FF]/20'}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-mono text-slate-350">{formattedTime(log.duration)}</td>
                  <td className="py-3.5 text-slate-400">{log.agentName}</td>
                  <td className="py-3.5">
                    <span className={`font-mono font-bold ${log.score >= 90 ? 'text-[#00E5B0]' : 'text-amber-500'}`}>
                      {log.score}/100
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`uppercase font-mono text-[9px] ${log.sentiment === 'Positive' ? 'text-[#00E5B0]' : log.sentiment === 'Negative' ? 'text-accent-coral' : 'text-slate-400'}`}>
                      ● {log.sentiment}
                    </span>
                  </td>
                  <td className="py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setSelectedLogId(log.id)}
                      className="px-2.5 py-1 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-secondary text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Inspect Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Transcription dialogue review slider drawer overlays */}
      {activeLog && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-[#1E293B] border-l border-[#334155] shadow-2xl z-40 transform translate-x-0 transition-transform duration-300 flex flex-col justify-between">
          <div className="p-6 border-b border-[#334155] flex justify-between items-center bg-[#11192E]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              <div>
                <h3 className="font-display font-black text-base text-white">Call Transcription Details</h3>
                <p className="text-[10px] text-slate-440 font-mono">ID Tracker: {activeLog.id}</p>
              </div>
            </div>
            <button onClick={() => setSelectedLogId(null)} className="p-1 px-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
            
            <div className="bg-[#0F172A] p-4 rounded-xl border border-brand-primary/20 space-y-2">
              <div className="flex justify-between items-center border-b border-[#334155]/60 pb-2">
                <span className="text-[10px] text-slate-440 font-mono uppercase">Call Summary</span>
                <span className="text-xs bg-brand-primary/15 text-brand-secondary font-mono font-bold px-2 py-0.5 rounded">
                  QA Score: {activeLog.score}/100
                </span>
              </div>
              <p className="text-xs text-slate-350 leading-relaxed font-light">{activeLog.summary}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] text-[#00E5B0] font-mono uppercase tracking-widest font-bold">Dialog transcripts chronicle</h4>
              
              <div className="space-y-3.5">
                {activeLog.transcription.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center py-6">No transcript recordings preloaded</p>
                ) : (
                  activeLog.transcription.map((turn, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-2xl border ${turn.speaker === 'agent' ? 'bg-brand-primary/5 border-brand-primary/15 self-end text-right' : 'bg-slate-900/40 border-[#334155] self-start text-left'}`}
                    >
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {turn.speaker === 'agent' ? 'Rep' : activeLog.contactName} • {turn.timestamp}
                      </span>
                      <p className="text-xs text-white mt-1 font-light leading-relaxed">{turn.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="p-6 border-t border-[#334155] bg-[#11192E] text-xs font-mono text-center text-slate-500">
            Registered Auditor: sabledattatray@gmail.com
          </div>
        </div>
      )}

    </div>
  );
}
