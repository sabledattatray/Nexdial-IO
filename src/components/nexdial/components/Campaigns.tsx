import React, { useState } from 'react';
import { 
  Bot, Award, Play, Pause, Plus, Trash2, Edit3, Settings, Save, Check, Sparkles, 
  HelpCircle, Layers, Calendar, Users, FileText, ChevronRight, RefreshCcw
} from 'lucide-react';
import { Campaign, ScriptTemplate } from '../types';

interface CampaignsProps {
  campaigns: Campaign[];
  scripts: ScriptTemplate[];
  onAddCampaign: (campaign: Campaign) => void;
  onAddScript: (script: ScriptTemplate) => void;
  onDeleteCampaign: (id: string) => void;
}

export default function Campaigns({ 
  campaigns, 
  scripts, 
  onAddCampaign, 
  onAddScript,
  onDeleteCampaign 
}: CampaignsProps) {
  
  // Tab within Campaigns workspace
  const [campaignTab, setCampaignTab] = useState<'runs' | 'scripts'>('runs');

  // New Campaign overlay form state
  const [isSpawnOpen, setIsSpawnOpen] = useState(false);
  const [newCamForm, setNewCamForm] = useState({
    name: '', type: 'Outbound' as any, scriptId: 'sc-1', date: '2026-05-22', contacts: 100
  });

  // Script editor states
  const [activeScriptId, setActiveScriptId] = useState<string>('sc-1');
  const [scriptEditTitle, setScriptEditTitle] = useState('');
  const [scriptEditContent, setScriptEditContent] = useState('');
  const [scriptSavedNotice, setScriptSavedNotice] = useState(false);

  // Spawns Script templates creation
  const handleSpawnScript = () => {
    const id = `sc-${Date.now()}`;
    const newSc: ScriptTemplate = {
      id,
      title: 'New Dynamic Telephony Script',
      content: 'Greet caller: Hello {contactName}! This is {agentName} from NexDial. I am calling to discuss our latest campaigns workflows...',
      tags: ['Sales', 'Draft']
    };
    onAddScript(newSc);
    setActiveScriptId(id);
    setScriptEditTitle(newSc.title);
    setScriptEditContent(newSc.content);
  };

  const selectedScript = scripts.find(s => s.id === activeScriptId);

  // Sync edit selectors on mount/trigger
  React.useEffect(() => {
    if (selectedScript) {
      setScriptEditTitle(selectedScript.title);
      setScriptEditContent(selectedScript.content);
    }
  }, [activeScriptId]);

  const handleUpdateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScript) return;

    const modified: ScriptTemplate = {
      ...selectedScript,
      title: scriptEditTitle,
      content: scriptEditContent
    };

    onAddScript(modified);
    setScriptSavedNotice(true);
    setTimeout(() => setScriptSavedNotice(false), 3000);
  };

  const handleSpawnCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const camp: Campaign = {
      id: `cam-${Date.now()}`,
      name: newCamForm.name,
      type: newCamForm.type,
      status: 'Active',
      contactsCount: Number(newCamForm.contacts),
      calledCount: 0,
      successRate: 0,
      scriptId: newCamForm.scriptId,
      scheduleDate: newCamForm.date,
      agentsAssigned: ['ag-1']
    };

    onAddCampaign(camp);
    setIsSpawnOpen(false);
    setNewCamForm({ name: '', type: 'Outbound', scriptId: 'sc-1', date: '2026-05-22', contacts: 100 });
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Upper Navigation deck for campaigns workspace */}
      <div className="flex justify-between items-center bg-[#1E293B] p-4 rounded-3xl border border-[#334155]">
        <div className="flex bg-[#0F172A] p-1.5 rounded-xl border border-[#334155] gap-1 text-xs">
          <button 
            onClick={() => setCampaignTab('runs')}
            className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${campaignTab === 'runs' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Running Campaigns
          </button>
          <button 
            onClick={() => setCampaignTab('scripts')}
            className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${campaignTab === 'scripts' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Script sheets manager
          </button>
        </div>

        {campaignTab === 'runs' && (
          <button 
            onClick={() => setIsSpawnOpen(true)}
            className="px-4 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-primary/10 transition-transform hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Schedule New Campaign
          </button>
        )}

        {campaignTab === 'scripts' && (
          <button 
            onClick={handleSpawnScript}
            className="px-4 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-primary/10 transition-transform hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Custom Script
          </button>
        )}
      </div>

      {/* ---------------- SUB VIEW 1: CAMPAIGNS RUNNING DASHBOARD ---------------- */}
      {campaignTab === 'runs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const progress = camp.contactsCount > 0 ? Math.round((camp.calledCount / camp.contactsCount) * 100) : 0;
            return (
              <div key={camp.id} className="bg-[#1E293B] border border-[#334155] p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-brand-primary duration-155">
                
                {/* Header status */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-[#00C2FF] uppercase bg-accent-blue/10 px-2.5 py-1 rounded border border-accent-blue/20">
                      Type: {camp.type}
                    </span>
                    <h4 className="font-display font-bold text-base text-white mt-2.5 leading-snug">{camp.name}</h4>
                  </div>
                  
                  <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider ${camp.status === 'Active' ? 'text-accent-teal bg-accent-teal/10 border border-accent-teal/20 animate-pulse' : 'text-slate-400 bg-slate-800'}`}>
                    ● {camp.status}
                  </span>
                </div>

                {/* Quantitative Dial Progress Loader */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-mono text-[10px] text-slate-400">
                    <span>Contact dial count</span>
                    <span>{camp.calledCount} / {camp.contactsCount} ({progress}%)</span>
                  </div>
                  <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Success Ratio and scheduled time */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#334155]/60 pt-4 text-xs font-light">
                  <div>
                    <span className="text-[9px] font-mono text-slate-550 uppercase tracking-widest block">Success Value</span>
                    <span className="text-white font-bold text-sm block mt-0.5">
                      {camp.calledCount > 0 ? `${camp.successRate}%` : 'SLA Pending'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-550 uppercase tracking-widest block">Schedule Targets</span>
                    <span className="text-slate-300 font-mono text-xs block mt-0.5">{camp.scheduleDate}</span>
                  </div>
                </div>

                {/* Operations bar */}
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => alert(`Starting predictive auto-pilot sequence for ${camp.name}`)} className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-xs text-[#00E5B0] font-bold rounded-lg border border-[#334155] flex items-center justify-center gap-1 cursor-pointer">
                    <Play className="w-3.5 h-3.5" /> Start AutoPilot
                  </button>
                  <button 
                    onClick={() => onDeleteCampaign(camp.id)}
                    className="p-2 text-slate-400 hover:text-accent-coral hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Archive Campaign Run"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- SUB VIEW 2: AGENT SCRIPTS WORKSPACE ---------------- */}
      {campaignTab === 'scripts' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Scripts Navigation list */}
          <div className="lg:col-span-1 space-y-2 bg-[#1E293B] p-4 rounded-3xl border border-[#334155] h-fit">
            <h4 className="text-[10px] text-slate-450 uppercase font-mono tracking-widest pl-2 mb-3">Available Pitch Templates</h4>
            {scripts.map((s) => (
              <button 
                key={s.id}
                onClick={() => setActiveScriptId(s.id)}
                className={`w-full text-left pl-4 py-2.5 rounded-xl text-xs font-medium font-display transition-all cursor-pointer ${activeScriptId === s.id ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary' : 'text-slate-400 hover:text-white'}`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Right Script Editor area */}
          <div className="lg:col-span-3">
            {selectedScript ? (
              <form onSubmit={handleUpdateScript} className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] space-y-6">
                
                <div className="flex justify-between items-center border-b border-[#334155] pb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Interactive Editor: Script Engine</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Workspace variables supported: {"{contactName}, {agentName}"}</p>
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-[#00E5B0] hover:bg-[#00c294] text-[#0F172A] text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1 transition-all">
                    <Save className="w-4 h-4" /> Save Script Sheet
                  </button>
                </div>

                {scriptSavedNotice && (
                  <div className="flex items-center gap-1.5 text-xs text-accent-teal bg-accent-teal/10 px-4 py-2 border border-accent-teal/20 rounded-xl">
                    <Check className="w-4 h-4" /> Script template updated programmatically. All connected dial queues synced!
                  </div>
                )}

                <div className="space-y-4 text-xs font-light">
                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Friendly Script Title</label>
                    <input 
                      type="text" 
                      required 
                      value={scriptEditTitle}
                      onChange={(e) => setScriptEditTitle(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">Script Payload Context (Markdown enabled)</label>
                    <textarea 
                      rows={8}
                      required 
                      value={scriptEditContent}
                      onChange={(e) => setScriptEditContent(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs leading-relaxed font-mono custom-scrollbar"
                    />
                  </div>
                </div>

              </form>
            ) : (
              <div className="bg-[#1E293B] p-12 text-center rounded-3xl border border-[#334155] py-24">
                <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400 text-xs font-mono font-light">No script selected. Click side panels script title names to launch editor canvas.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ---------------- 4. CREATE CAMPAIGN SPAWNER OVERLAY ---------------- */}
      {isSpawnOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full relative">
            <h3 className="font-display font-bold text-xl text-white mb-2">Schedule Outbound Dialer Campaign</h3>
            <p className="text-xs text-slate-400 mb-6 font-light">Configure high-speed predictive auto dial filters to process customer directories.</p>

            <form onSubmit={handleSpawnCampaign} className="space-y-4 text-xs font-light">
              <div>
                <label className="text-slate-400 block mb-1">Campaign Campaign Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Q2 Customer Outbound Outreach"
                  value={newCamForm.name}
                  onChange={(e) => setNewCamForm({ ...newCamForm, name: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Dialer Model Type</label>
                  <select 
                    value={newCamForm.type}
                    onChange={(e: any) => setNewCamForm({ ...newCamForm, type: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs"
                  >
                    <option value="Outbound">Predictive Outbound</option>
                    <option value="Inbound">Dedicated Inbound</option>
                    <option value="AI Bot">Synthetic AI Bot Desk</option>
                    <option value="SMS">SMS Broadcaster</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Scheduled Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newCamForm.date}
                    onChange={(e) => setNewCamForm({ ...newCamForm, date: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Link Agent Pitch Script</label>
                  <select 
                    value={newCamForm.scriptId}
                    onChange={(e: any) => setNewCamForm({ ...newCamForm, scriptId: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs"
                  >
                    {scripts.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Estimated Contact count</label>
                  <input 
                    type="number" 
                    required 
                    value={newCamForm.contacts}
                    onChange={(e) => setNewCamForm({ ...newCamForm, contacts: Number(e.target.value) })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsSpawnOpen(false)}
                  className="flex-1 py-3 bg-[#334155] text-white font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl"
                >
                  Initiate Campaign
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
