import React, { useState } from 'react';
import { 
  Users, Activity, Key, Shield, Layers, Plus, Trash2, Check, RefreshCw, 
  Terminal, ShieldCheck, Mail, Server, Database, Globe, Play, Save, Settings, Heart
} from 'lucide-react';
import { SystemLog, SystemHealthMetrics, Integration } from '../types';

interface AdminPagesProps {
  logs: SystemLog[];
  metrics: SystemHealthMetrics;
  integrations: Integration[];
  adminTab?: 'status' | 'users' | 'sip' | 'tokens';
  setAdminTab?: (tab: 'status' | 'users' | 'sip' | 'tokens') => void;
}

export default function AdminPages({ 
  logs, 
  metrics, 
  integrations,
  adminTab: propAdminTab,
  setAdminTab: propSetAdminTab
}: AdminPagesProps) {
  
  // Admin sub-navigation tabs
  const [internalAdminTab, setInternalAdminTab] = useState<'status' | 'users' | 'sip' | 'tokens'>('status');
  const adminTab = propAdminTab || internalAdminTab;
  const setAdminTab = propSetAdminTab || setInternalAdminTab;

  // API Tokens states
  const [tokensList, setTokensList] = useState([
    { id: 'tok-1', name: 'Salesforce Webhook Sync Key', value: 'nex_pk_live_4a11f930e1d8cd3be9ea', dateCreated: '12-04-2026' },
    { id: 'tok-2', name: 'Dr Evelyne HIPAA Hospital Line Feed', value: 'nex_pk_live_32f91a0c8413b83f08ca', dateCreated: '21-05-2026' }
  ]);
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');

  // SIP configs state
  const [sipRegion, setSipRegion] = useState('us-east-virginia.nexdial.io');
  const [sipChannels, setSipChannels] = useState(150);
  const [sipSavesNotice, setSipSavesNotice] = useState(false);

  // Users lists management states
  const [usersList, setUsersList] = useState([
    { id: 'u-1', name: 'Dattatray Sable', email: 'sabledattatray@gmail.com', role: 'Tenant Super Admin', group: 'HQ Complex' },
    { id: 'u-2', name: 'Sarah Smith', email: 's.smith@bpo_services.com', role: 'Team Leader', group: 'SaaS outbound' },
    { id: 'u-3', name: 'John Doe', email: 'john.doe@bpo_services.com', role: 'Agent Representative', group: 'Customer Success' }
  ]);

  const [isUserSpawnOpen, setIsUserSpawnOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'Agent Representative', group: 'SaaS outbound' });

  // Handle Token Generator
  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName) return;

    const id = `tok-${Date.now()}`;
    const value = `nex_pk_live_${Array(20).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const dateCreated = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

    setTokensList([...tokensList, { id, name: newTokenName, value, dateCreated }]);
    setIsTokenOpen(false);
    setNewTokenName('');
  };

  const handleRevokeToken = (id: string) => {
    setTokensList(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateSipConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSipSavesNotice(true);
    setTimeout(() => setSipSavesNotice(false), 3000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `u-${Date.now()}`;
    setUsersList([...usersList, { id, ...newUserForm }]);
    setIsUserSpawnOpen(false);
    setNewUserForm({ name: '', email: '', role: 'Agent Representative', group: 'SaaS outbound' });
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Upper header */}
      <div className="flex bg-[#11192E] p-1.5 rounded-2xl border border-[#334155] gap-1 text-xs w-full max-w-xl mx-auto md:mx-0">
        <button 
          onClick={() => setAdminTab('status')}
          className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${adminTab === 'status' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Systems & Logs
        </button>
        <button 
          onClick={() => setAdminTab('users')}
          className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${adminTab === 'users' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          User Licenses
        </button>
        <button 
          onClick={() => setAdminTab('sip')}
          className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${adminTab === 'sip' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          SIP Telephony GW
        </button>
        <button 
          onClick={() => setAdminTab('tokens')}
          className={`px-4 py-2 font-bold rounded-lg transition-all cursor-pointer ${adminTab === 'tokens' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          API Tokens
        </button>
      </div>

      {/* ---------------- SECTION 1: SYSTEMS METRICS & LOGS ---------------- */}
      {adminTab === 'status' && (
        <div className="space-y-8">
          
          {/* Health indicators panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] text-left">
              <Server className="w-8 h-8 text-accent-teal mb-3" />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">SIP Latency ping</p>
              <h4 className="font-display font-black text-2xl text-white mt-1">{metrics.pingLatencyMs}ms</h4>
              <span className="text-[9px] text-[#00E5B0] font-mono leading-none block mt-1">SLA Target &lt; 80ms: OK</span>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] text-left">
              <Database className="w-8 h-8 text-accent-blue mb-3" />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Database CPU</p>
              <h4 className="font-display font-black text-2xl text-white mt-1">{metrics.cpuUsage}%</h4>
              <span className="text-[9px] text-slate-450 font-mono leading-none block mt-1">Multi-VPC active</span>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] text-left">
              <Activity className="w-8 h-8 text-brand-primary mb-3" />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Active Voice lines</p>
              <h4 className="font-display font-black text-2xl text-white mt-1">{metrics.activeVoipLines} lines</h4>
              <span className="text-[9px] text-[#00E5B0] font-mono leading-none block mt-1">G.711 PCMU channels</span>
            </div>
            <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] text-left">
              <Globe className="w-8 h-8 text-pink-500 mb-3" />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Server Region</p>
              <h4 className="font-display font-black text-xl text-white mt-1.5 truncate">{metrics.serverRegion}</h4>
              <span className="text-[9px] text-slate-450 font-mono leading-none block mt-1">Cloud Run Ingress</span>
            </div>
          </div>

          {/* Scrolling system logs console terminal */}
          <div className="bg-[#0F172A] rounded-3xl border border-[#334155] overflow-hidden">
            <div className="p-5 border-b border-[#334155]/65 flex justify-between items-center bg-[#11192E]">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent-teal" />
                <h4 className="font-display font-bold text-sm text-white">Central System Logs Console</h4>
              </div>
              <span className="text-[10px] text-slate-500 font-mono uppercase">Streaming active</span>
            </div>

            <div className="p-6 font-mono text-[11px] h-[280px] overflow-y-auto custom-scrollbar space-y-2.5">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <span className="text-slate-500 flex-shrink-0">{log.timestamp}</span>
                  <span className={`uppercase font-bold flex-shrink-0 w-16 ${log.level === 'error' ? 'text-accent-coral' : log.level === 'warning' ? 'text-amber-500' : 'text-[#00C2FF]'}`}>
                    [{log.level}]
                  </span>
                  <span className="text-slate-400 flex-shrink-0">({log.service}):</span>
                  <span className="text-white font-light">{log.message}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#11192E] border-t border-[#334155] text-[10px] text-slate-500 font-mono text-center">
              Active Cloud Run process logs. Tenant complexity: 1 isolation key active.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SECTION 2: USER MANAGEMENT ---------------- */}
      {adminTab === 'users' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display font-extrabold text-[#00C2FF] text-lg">Multi-seat Corporate Seats list</h3>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Audit and suspend active rep permissions on this tenant database.</p>
            </div>
            <button 
              onClick={() => setIsUserSpawnOpen(true)}
              className="px-4 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Provision seat license
            </button>
          </div>

          <div className="bg-[#1E293B] rounded-3xl border border-[#334155] overflow-hidden">
            <table className="w-full text-left font-light border-collapse text-xs">
              <thead>
                <tr className="bg-[#11192E] border-b border-[#334155] text-slate-450 uppercase font-mono text-[9px] tracking-wider py-4 px-6">
                  <th className="py-4 px-6">Staff name</th>
                  <th className="py-4 px-6">Direct email</th>
                  <th className="py-4 px-6">Dialer group permission</th>
                  <th className="py-4 px-6">Staff Role</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]/60">
                {usersList.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">{usr.name}</td>
                    <td className="py-4 px-6 text-slate-300 font-mono">{usr.email}</td>
                    <td className="py-4 px-6 text-slate-400">{usr.group}</td>
                    <td className="py-4 px-6">
                      <span className="bg-brand-primary/10 text-brand-secondary border border-brand-primary/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {usr.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => {
                          if (usr.id === 'u-1') {
                            alert("Cannot revoke permissions for default billing administrator.");
                            return;
                          }
                          setUsersList(prev => prev.filter(u => u.id !== usr.id));
                        }}
                        className="text-slate-400 hover:text-accent-coral p-1 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add user modal card */}
          {isUserSpawnOpen && (
            <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full relative">
                <h3 className="font-display font-bold text-xl text-white mb-2">Configure Seat license</h3>
                <p className="text-xs text-slate-404 mb-6 font-light">Provision and invite active staff members onto this business tenant index.</p>

                <form onSubmit={handleAddUser} className="space-y-4 text-xs font-light">
                  <div>
                    <label className="text-slate-400 block mb-1">Full legal name</label>
                    <input 
                      type="text" 
                      required 
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                      className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Work Address (Email)</label>
                    <input 
                      type="email" 
                      required 
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                      className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 block mb-1">Dialer group</label>
                      <input 
                        type="text" 
                        required 
                        value={newUserForm.group}
                        onChange={(e) => setNewUserForm({ ...newUserForm, group: e.target.value })}
                        className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Target permissions</label>
                      <select 
                        value={newUserForm.role}
                        onChange={(e: any) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                        className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                      >
                        <option value="Agent Representative">Agent Rep</option>
                        <option value="Team Leader">Team Supervisor</option>
                        <option value="Billing Administrator">Billing Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setIsUserSpawnOpen(false)} className="flex-1 py-3 bg-[#334155] text-white font-bold rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl">Provision Seat</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ---------------- SECTION 3: SIP TRUNKS REGISTER ---------------- */}
      {adminTab === 'sip' && (
        <div className="max-w-2xl mx-auto bg-[#1E293B] p-8 rounded-3xl border border-[#334155] space-y-6">
          <div className="border-b border-[#334155]/65 pb-4">
            <h3 className="font-display font-extrabold text-white text-lg">Central PSTN Telephony Gateway Config</h3>
            <p className="text-[10px] text-slate-405 font-mono mt-0.5">Parameters linking Nexdial to physical telecom providers (Twilio, FreeSWITCH trunking)</p>
          </div>

          {sipSavesNotice && (
            <div className="flex items-center gap-1.5 text-xs text-accent-teal bg-accent-teal/10 px-4 py-2.5 border border-accent-teal/20 rounded-xl">
              <Check className="w-4 h-4" /> Telephony gateway mapping written successfully. Low ping SLA active!
            </div>
          )}

          <form onSubmit={handleUpdateSipConfig} className="space-y-4 text-xs font-light">
            <div>
              <label className="text-slate-400 block mb-1">SIP Trunk Server Hostaddress</label>
              <input 
                type="text" 
                required 
                value={sipRegion}
                onChange={(e) => setSipRegion(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Max Concurrent dial trunks (SIP channels)</label>
                <input 
                  type="number" 
                  required 
                  value={sipChannels}
                  onChange={(e) => setSipChannels(parseInt(e.target.value))}
                  className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Primary voice encapsulation</label>
                <select className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white text-xs font-mono">
                  <option>G.711 PCMU Law (Low Delay)</option>
                  <option>G.722 Audio (High definition)</option>
                  <option>Opus Voice scale (Adaptive)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#00E5B0] hover:bg-[#00c294] text-[#0F172A] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#00E5B0]/15">
              Sync Gateway parameters
            </button>
          </form>
        </div>
      )}

      {/* ---------------- SECTION 4: API TOKENS GENERATORS ---------------- */}
      {adminTab === 'tokens' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display font-extrabold text-[#00E5B0] text-lg">REST API Keys & Webhooks</h3>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Generate keys to integrate CRM portals or hook wrap call events programmatically.</p>
            </div>
            <button 
              onClick={() => setIsTokenOpen(true)}
              className="px-4 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create API Token
            </button>
          </div>

          <div className="space-y-4">
            {tokensList.map((tok) => (
              <div key={tok.id} className="bg-[#1E293B] p-5 rounded-2xl border border-[#334155] flex justify-between items-center gap-4">
                <div className="space-y-2 truncate">
                  <h4 className="font-bold text-sm text-white">{tok.name}</h4>
                  <p className="text-xs font-mono text-slate-400 bg-[#0F172A] p-2 rounded border border-[#1E293B] truncate">
                    {tok.value}
                  </p>
                  <span className="text-[9px] text-slate-500 font-mono tracking-wider block">Created on {tok.dateCreated}</span>
                </div>
                
                <button 
                  onClick={() => handleRevokeToken(tok.id)}
                  className="px-3 py-1.5 bg-accent-coral/10 hover:bg-accent-coral/20 text-accent-coral text-xs rounded-lg transition font-bold"
                >
                  Revoke key
                </button>
              </div>
            ))}
          </div>

          {/* Create token modal wrapper */}
          {isTokenOpen && (
            <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full relative">
                <h3 className="font-display font-bold text-xl text-white mb-2">Generate integration Key</h3>
                <p className="text-xs text-slate-404 mb-6 font-light">Choose a friendly descriptive name to identify this token in active usage feeds.</p>

                <form onSubmit={handleGenerateToken} className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Friendly key description name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Sales Onboarding Callback integration"
                      value={newTokenName}
                      onChange={(e) => setNewTokenName(e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white font-medium"
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setIsTokenOpen(false)} className="flex-1 py-3 bg-[#334155] text-white font-bold rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl">Generate key</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
