import React, { useState, useEffect } from 'react';
import { 
  Users, Bot, Layers, BarChart3, ShieldCheck, Heart, Sparkles, Phone, PhoneCall, ChevronUp, ChevronDown, 
  X, Briefcase, Globe, Star, Activity, User, Server, Terminal, ExternalLink, Sun, Moon, LogOut, Key,
  LayoutDashboard, MessageSquare, Play, Upload, Volume2, Menu, Lock
} from 'lucide-react';

import './index.css';

// Import local page components
import PublicPages from './pages/PublicPages';
import CRM from './components/CRM';
import Campaigns from './components/Campaigns';
import IVRBuilder from './components/IVRBuilder';
import Analytics from './components/Analytics';
import AdminPages from './pages/AdminPages';
import Softphone from './components/Softphone';
import AuthModal from './components/AuthModal';
import GoogleSignIn from './components/GoogleSignIn';

// Import newly created custom views
import DashboardView from './components/DashboardView';
import LiveDialerView from './components/LiveDialerView';
import AgentsView from './components/AgentsView';
import LiveMonitorView from './components/LiveMonitorView';
import WhatsAppView from './components/WhatsAppView';
import RecordingsView from './components/RecordingsView';
import AICopilotView from './components/AICopilotView';
import ImportLeadsView from './components/ImportLeadsView';

// Import initial database templates
import { 
  INITIAL_CONTACTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_SCRIPTS, 
  DEFAULT_IVR_NODES, 
  DEFAULT_IVR_CONNECTIONS, 
  INITIAL_SYSTEM_LOGS, 
  INITIAL_CALL_LOGS, 
  INITIAL_INTEGRATIONS,
  INITIAL_HEALTH_METRICS,
  INITIAL_AGENTS
} from './mockData';

import { Contact, Campaign, ScriptTemplate, IVRNode, IVRConnection, CallLog, Agent } from './types';

interface AppProps {
  mode?: 'agent' | 'admin';
}

export default function App({ mode }: AppProps) {
  
  // Unified Global State Database
  const [contacts, setContacts] = useState<Contact[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexdial_contacts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved contacts:', e);
        }
      }
    }
    return INITIAL_CONTACTS;
  });

  useEffect(() => {
    localStorage.setItem('nexdial_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [scripts, setScripts] = useState<ScriptTemplate[]>(INITIAL_SCRIPTS);
  const [ivrNodes, setIvrNodes] = useState<IVRNode[]>(DEFAULT_IVR_NODES);
  const [ivrConnections, setIvrConnections] = useState<IVRConnection[]>(DEFAULT_IVR_CONNECTIONS);
  const [callLogs, setCallLogs] = useState<CallLog[]>(INITIAL_CALL_LOGS);
  const [systemLogs, setSystemLogs] = useState(INITIAL_SYSTEM_LOGS);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

  // Router States
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexdial_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('nexdial_theme', theme);
  }, [theme]);
  const [currentSection, setCurrentSection] = useState<'public' | 'applet'>(() => {
    if (mode) return 'applet';
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexdial_authenticated') === 'true' ? 'applet' : 'public';
    }
    return 'public';
  });
  const [appletTab, setAppletTab] = useState<'dashboard' | 'dialer' | 'campaigns' | 'crm' | 'agents' | 'monitor' | 'whatsapp' | 'recordings' | 'reports' | 'copilot' | 'import'>('dashboard');
  const [adminTab, setAdminTab] = useState<'status' | 'users' | 'sip' | 'tokens'>('status');
  const [publicSubTab, setPublicSubTab] = useState<string>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filtered menu tabs based on mode prop
  const menuItems = React.useMemo(() => {
    const allItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'dialer', label: 'Live Dialer', icon: PhoneCall },
      { id: 'campaigns', label: 'Campaigns', icon: Layers, badge: 2 },
      { id: 'crm', label: 'Leads & CRM', icon: Users },
      { id: 'agents', label: 'Agents', icon: User },
      { id: 'monitor', label: 'Live Monitor', icon: Activity },
      { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, badge: 5 },
      { id: 'recordings', label: 'Recordings', icon: Volume2 },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'copilot', label: 'AI Copilot', icon: Bot },
      { id: 'import', label: 'Import Leads', icon: Upload }
    ];
    if (mode === 'agent') {
      return allItems.filter(item => ['dashboard', 'dialer', 'crm', 'whatsapp', 'copilot', 'import'].includes(item.id));
    }
    if (mode === 'admin') {
      return allItems;
    }
    return allItems;
  }, [mode]);

  // Floating Softphone workspace states
  const [selectedContactForDial, setSelectedContactForDial] = useState<Contact | null>(null);
  const [isSoftphoneExpanded, setIsSoftphoneExpanded] = useState(false);

  // Agent user details & Dynamic Session states
  const [currentAgentName, setCurrentAgentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexdial_agent_name') || "Dattatray Sable";
    }
    return "Dattatray Sable";
  });
  const [currentAgentEmail, setCurrentAgentEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexdial_agent_email') || "sabledattatray@gmail.com";
    }
    return "sabledattatray@gmail.com";
  });
  const [currentAgentAvatar, setCurrentAgentAvatar] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexdial_agent_avatar') || "";
    }
    return "";
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (mode) return true;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexdial_authenticated') === 'true';
    }
    return false;
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const [utcTime, setUtcTime] = useState<string>(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC';
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setUtcTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle addition or updates of contact lines (CRM)
  const handleUpsertContact = (targetContact: Contact) => {
    setContacts(prev => {
      const exists = prev.some(c => c.id === targetContact.id);
      if (exists) {
        return prev.map(c => c.id === targetContact.id ? targetContact : c);
      }
      return [targetContact, ...prev];
    });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Trigger outbound call load into Softphone
  const handleSelectContactForDial = (contact: Contact) => {
    setSelectedContactForDial(contact);
    setIsSoftphoneExpanded(true);
    
    // Add brief system notification log
    const systemEv = {
      id: `sys-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'info' as any,
      service: 'WebRTC-SIP' as any,
      message: `Telephony lock assigned for CRM contact: ${contact.name}. Lines initialized on trunk us-east-virginia.`
    };
    setSystemLogs(prev => [systemEv, ...prev]);
  };

  // Receive callback when call session terminates with disposition codes
  const handleCallEnded = (contactId: string, finalDisposition: any, newLog: CallLog) => {
    
    // 1. Append new call log transcript
    setCallLogs(prev => [newLog, ...prev]);

    // 2. Reflect final status and disposition metrics onto CRM database contact
    setContacts(prev => prev.map(c => {
      if (c.id === contactId) {
        return {
          ...c,
          status: finalDisposition,
          sentiment: newLog.sentiment,
          notes: [
            { 
              id: `note-wrap-${Date.now()}`, 
              text: `Call wrapped with disposition: ${finalDisposition}. Summary Notes: ${newLog.summary}`, 
              timestamp: new Date().toISOString(), 
              author: currentAgentName 
            },
            ...c.notes
          ]
        };
      }
      return c;
    }));

    // 3. Increment counters in running outreach campaigns if applicable
    setCampaigns(prev => prev.map(camp => {
      // Pick active campaign to add values
      if (camp.status === 'Active') {
        const activeCalls = camp.calledCount + 1;
        return {
          ...camp,
          calledCount: Math.min(camp.contactsCount, activeCalls),
          successRate: Math.min(100, Math.round(((activeCalls * 0.4) / camp.contactsCount) * 100))
        };
      }
      return camp;
    }));

    // 4. Record central operations log
    const operationEv = {
      id: `sys-wrap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'info' as any,
      service: 'CRM-Sync' as any,
      message: `Processed wrap disposition for ${newLog.contactName} (${finalDisposition}). Timeline notes synced & registered. API webhooks broadcast success.`
    };
    setSystemLogs(prev => [operationEv, ...prev]);
  };

  // Helper inside Campaigns
  const handleAddCampaign = (camp: Campaign) => {
    setCampaigns(prev => [camp, ...prev]);
  };

  const handleAddScript = (sc: ScriptTemplate) => {
    setScripts(prev => {
      const exists = prev.some(s => s.id === sc.id);
      if (exists) {
        return prev.map(s => s.id === sc.id ? sc : s);
      }
      return [...prev, sc];
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  // Authentication triggers and event handlers
  const handleOpenLoginModel = () => {
    setAuthModalMode('signin');
    setAuthModalOpen(true);
  };

  const handleOpenSignupModel = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (name: string, email: string, picture?: string) => {
    setCurrentAgentName(name);
    setCurrentAgentEmail(email);
    const avatar = picture || '';
    if (avatar) {
      setCurrentAgentAvatar(avatar);
    } else {
      setCurrentAgentAvatar('');
    }
    setIsAuthenticated(true);
    setCurrentSection('applet');

    localStorage.setItem('nexdial_authenticated', 'true');
    localStorage.setItem('nexdial_agent_name', name);
    localStorage.setItem('nexdial_agent_email', email);
    localStorage.setItem('nexdial_agent_avatar', avatar);

    // Add a custom systems log event indicating authentication succeeded
    const sessionAuthEv = {
      id: `sys-auth-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'info' as any,
      service: 'Security' as any,
      message: `System session authorized successfully via Google OAuth/SSO. Assigned Agent Name: ${name}. Registered email reference: ${email}. IP/SIP registry binding complete.`
    };
    setSystemLogs(prev => [sessionAuthEv, ...prev]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAgentAvatar('');
    setCurrentSection('public');
    setPublicSubTab('home');

    localStorage.removeItem('nexdial_authenticated');
    localStorage.removeItem('nexdial_agent_name');
    localStorage.removeItem('nexdial_agent_email');
    localStorage.removeItem('nexdial_agent_avatar');

    // Add logging details
    const sessionLogoutEv = {
      id: `sys-logout-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      level: 'warn' as any,
      service: 'Security' as any,
      message: `Agent ${currentAgentName} requested session termination. Disposing connected SIP trunk and audio pipes. Offline mode safety locks engaged.`
    };
    setSystemLogs(prev => [sessionLogoutEv, ...prev]);
  };

  return (
    <div id="nexdial-framework-app" className={`min-h-screen bg-[#0A0A0B] text-slate-300 flex flex-col font-sans selection:bg-indigo-600/30 ${theme === 'light' ? 'light-theme' : ''} ${mode ? 'pt-20' : ''}`}>
      
      {/* GLOBAL APP SHELL HEADER (Alert Bar & Main Header only rendered in Cockpit Terminal section when not embedded) */}
      {currentSection === 'applet' && !mode && (
        <>
          {/* GLOBAL SYSTEM STATUS ALERT BAR */}
          <div className="bg-[#0E0E10] border-b border-slate-800 text-center py-1.5 px-6 flex items-center justify-between gap-4 text-[10px] font-mono select-none">
            <div className="flex items-center gap-1 text-slate-400">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tenant Network: <span className="text-indigo-400 font-bold">Active</span> • G.711 codec trunk</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-slate-400">
              <span>Carrier trunking: Twilio Interconnect Gateway</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                LIVE telemetry
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2.5 text-[10px]">
                  <span className="text-slate-400 font-mono hidden xs:inline">Rep Account: </span>
                  <div className="flex items-center gap-1.5 bg-slate-900/60 pl-1.5 pr-2.5 py-0.5 rounded-full border border-slate-800">
                    {currentAgentAvatar ? (
                      <img 
                        src={currentAgentAvatar} 
                        alt={currentAgentName} 
                        referrerPolicy="no-referrer"
                        className="w-3.5 h-3.5 rounded-full border border-indigo-500/30" 
                      />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/20 text-[#818CF8] text-[8px] font-extrabold flex items-center justify-center border border-indigo-500/30 font-sans">
                        {currentAgentName.charAt(0)}
                      </div>
                    )}
                    <span className="text-slate-200 font-bold">{currentAgentName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-400 p-0.5 rounded hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1 font-mono"
                    title="Disconnect SIP Trunk session"
                  >
                    <LogOut className="w-2.5 h-2.5" />
                    <span className="text-[9px]">LOGOUT</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOpenLoginModel}
                  className="text-[9px] font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-2 py-0.5 rounded hover:bg-indigo-400/20 transition-all cursor-pointer flex items-center gap-1"
                >
                  <Key className="w-2.5 h-2.5" />
                  AUTHENTICATE SESSION
                </button>
              )}
            </div>
          </div>

          {/* GLOBAL TOP NAVIGATION HEADER */}
          <header className="h-14 border-b border-slate-800 flex items-center justify-between px-3 xs:px-6 bg-[#0E0E10] z-20 sticky top-0">
            <div className="flex items-center gap-2 xs:gap-4 md:gap-8">
              {isAuthenticated && currentSection === 'applet' && (
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="md:hidden p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1"
                  title="Open Navigation Menu"
                >
                  <Menu className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10.5px] font-bold">Menu</span>
                </button>
              )}

              <div className="flex items-center gap-2 select-none">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs">Ω</div>
                <span className="font-semibold tracking-tight text-slate-100 text-sm hidden xs:inline">PRD_CORE_v2.4</span>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => {
                    setCurrentSection('applet');
                    setAppletTab('dashboard');
                  }}
                  className={`text-xs font-semibold pb-4 mt-4 cursor-pointer transition-all border-b-2 ${
                    currentSection === 'applet' && appletTab === 'dashboard'
                      ? 'text-indigo-400 border-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300 border-transparent hover:border-slate-800'
                  }`}
                >
                  Cockpit Hub
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('applet');
                    setAppletTab('dialer');
                  }}
                  className={`text-xs font-semibold pb-4 mt-4 cursor-pointer transition-all border-b-2 ${
                    currentSection === 'applet' && appletTab === 'dialer'
                      ? 'text-indigo-400 border-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300 border-transparent hover:border-slate-800'
                  }`}
                >
                  Direct Dialer
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('applet');
                    setAppletTab('crm');
                  }}
                  className={`text-xs font-semibold pb-4 mt-4 cursor-pointer transition-all border-b-2 ${
                    currentSection === 'applet' && appletTab === 'crm'
                      ? 'text-indigo-400 border-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300 border-transparent hover:border-slate-800'
                  }`}
                >
                  Leads & CRM
                </button>
                <button 
                  onClick={() => {
                    setCurrentSection('applet');
                    setAppletTab('monitor');
                  }}
                  className={`text-xs font-semibold pb-4 mt-4 cursor-pointer transition-all border-b-2 ${
                    currentSection === 'applet' && appletTab === 'monitor'
                      ? 'text-indigo-400 border-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300 border-transparent hover:border-slate-800'
                  }`}
                >
                  Live Telemetry
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 xs:w-9 xs:h-9 flex items-center justify-center rounded border border-slate-800 hover:bg-slate-900/30 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="hidden sm:flex bg-[#0A0A0B] border border-slate-800 px-3 py-1.5 rounded items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Search</span>
                <span className="text-[10px] text-slate-600 font-mono bg-[#0E0E10] px-1 rounded border border-slate-800">⌘K</span>
              </div>

              <div className="flex bg-[#0A0A0B] p-0.5 xs:p-1 rounded border border-slate-800 gap-0.5 xs:gap-1 text-[10px] xs:text-[11px] font-mono">
                <button 
                  onClick={() => setCurrentSection('public')}
                  className={`px-1.5 xs:px-3 py-1 rounded transition-all cursor-pointer ${(currentSection as string) === 'public' ? 'bg-indigo-950/20 text-indigo-400 font-medium' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Showcase
                </button>
                <button 
                  onClick={() => setCurrentSection('applet')}
                  className={`px-1.5 xs:px-3 py-1 rounded transition-all cursor-pointer ${(currentSection as string) === 'applet' ? 'bg-indigo-600 text-white shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Terminal
                </button>
              </div>
            </div>
          </header>
        </>
      )}

      {/* MOBILE TRIGGER HEADER (rendered only when embedded in DBS Mintek to toggle sidebar) */}
      {currentSection === 'applet' && mode && (
        <header className="md:hidden h-11 border-b border-slate-800 flex items-center px-4 bg-[#0E0E10] z-20">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            title="Open Navigation Menu"
          >
            <Menu className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-bold">Dialer Menu</span>
          </button>
        </header>
      )}

      {/* MAIN VIEWPORT PORTAL ROUTER */}
      <main id="nexdial-main-portal" className="flex-1 flex flex-col">
        {currentSection === 'public' ? (
          <div className="fade-in w-full max-w-full overflow-x-hidden">
            {/* Embedded Corporate Public Website */}
            <PublicPages 
              currentTab={publicSubTab}
              setTab={setPublicSubTab}
              onLoginClick={handleOpenLoginModel}
              onSignupClick={handleOpenSignupModel}
              contacts={contacts}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              theme={theme}
              setTheme={(t) => setTheme(t as 'dark' | 'light')}
              isAuthenticated={isAuthenticated}
              currentAgentEmail={currentAgentEmail}
            />
          </div>
        ) : !isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0A0A0B] relative overflow-hidden">
            {/* Background dynamic light grids */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-md w-full border border-slate-800 bg-[#0E0E10] rounded-3xl p-8 space-y-6 shadow-2xl relative z-10">
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-[#818CF8] rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(129,140,248,0.15)]">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Active Dialer Session Inactive</h2>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Your local terminal credential token is unsigned. Establish a secure VoIP channel registration via our secure portal interface to utilize lead dialings.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <button 
                  onClick={handleOpenLoginModel}
                  className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/15"
                >
                  <Key className="w-3.5 h-3.5" />
                  Sign In
                </button>
                <button 
                  onClick={handleOpenSignupModel}
                  className="py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-xs border border-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Register Seat
                </button>
              </div>

              <p className="text-[10px] text-slate-600 font-mono">
                Error Code: PRD_TERMINAL_UNAUTHORIZED_TOKEN
              </p>
            </div>
          </div>
        ) : (
          <div id="dashboard-cockpit" className="flex-1 flex flex-col md:flex-row">
            
            {/* MOBILE DRAWER SIDEBAR NAVIGATION */}
            {isMobileSidebarOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden">
                {/* Backdrop overlay */}
                <div 
                  className="fixed inset-0 bg-[#000000]/75 backdrop-blur-sm transition-opacity"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
                
                {/* Drawer content panel */}
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-[#0E0E10] border-r border-[#1E293B] p-5 pt-16 h-full max-h-screen">
                  {/* Close button inside drawer */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
                    {/* Main modules inside mobile sidebar */}
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-3 pl-2">Main Modules</p>
                      <nav className="space-y-1">
                        {menuItems.map((item) => {
                          const IconComponent = item.icon;
                          const isActive = appletTab === item.id;
                          return (
                            <button 
                              key={item.id}
                              onClick={() => {
                                setAppletTab(item.id as any);
                                setIsMobileSidebarOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer rounded-md text-left ${
                                isActive 
                                  ? 'bg-indigo-950/25 text-indigo-400 border border-indigo-500/10 font-bold' 
                                  : 'text-slate-500 hover:bg-slate-900/40 hover:text-slate-350'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00C2FF]' : 'text-slate-500'}`} />
                                <span className="truncate">{item.label}</span>
                              </div>
                              {item.badge !== undefined && (
                                <span className={`px-1.5 py-0.1 text-[9px] font-mono font-black rounded-full ${
                                  item.id === 'whatsapp' ? 'bg-[#00E5B0] text-[#0A0A0B]' : 'bg-indigo-505 text-white'
                                } shadow-sm`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Status and telemetry */}
                    <div className="space-y-3 pt-6 border-t border-slate-800 mt-6 pb-4">
                      <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2 pl-1">System Status</p>
                      <div className="space-y-2.5 px-1 font-mono text-[10px]">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">CPU Load</span>
                          <span className="text-emerald-500 font-bold">24.8%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                          <div className="w-[24.8%] h-full bg-emerald-500"></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">API Latency</span>
                          <span className="text-indigo-400 font-bold">12ms</span>
                        </div>
                        <div className="w-full h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                          <div className="w-[15%] h-full bg-indigo-500"></div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                          <span className="text-slate-500 text-[9px] uppercase">Active Leads:</span>
                          <span className="text-slate-300 font-bold">{contacts.length}</span>
                        </div>

                        <div className="pt-2 border-t border-slate-900/40">
                          <button 
                            onClick={() => {
                              handleLogout();
                              setIsMobileSidebarOpen(false);
                            }}
                            className="w-full mt-1.5 flex items-center justify-between px-2.5 py-1.5 text-[10px] uppercase font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-red-500/10 hover:border-red-500/20 rounded cursor-pointer transition-colors font-mono"
                          >
                            <span>Terminate Seat</span>
                            <LogOut className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* APPLET TERMINAL SIDEBAR NAVIGATION BAR */}
            <aside className="hidden md:flex w-52 bg-[#0E0E10] border-r border-[#1E293B] p-4 flex-col justify-between flex-shrink-0">
              
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-650 font-bold mb-3 pl-2">Main Modules</p>
                
                <nav className="space-y-1 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = appletTab === item.id;
                    return (
                      <button 
                        key={item.id}
                        onClick={() => setAppletTab(item.id as any)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer rounded-md text-left ${
                          isActive 
                            ? 'bg-indigo-950/25 text-indigo-400 border border-indigo-500/10 font-bold' 
                            : 'text-slate-500 hover:bg-slate-900/40 hover:text-slate-350'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00C2FF]' : 'text-slate-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-1.5 py-0.1 text-[9px] font-mono font-black rounded-full ${
                            item.id === 'whatsapp' ? 'bg-[#00E5B0] text-[#0A0A0B]' : 'bg-indigo-505 text-white'
                          } shadow-sm`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* System Active Latency & Cpu status section */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2 pl-1">System Status</p>
                <div className="space-y-2.5 px-1 font-mono text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">CPU Load</span>
                    <span className="text-emerald-500 font-bold">24.8%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                    <div className="w-[24.8%] h-full bg-emerald-500"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">API Latency</span>
                    <span className="text-indigo-400 font-bold">12ms</span>
                  </div>
                  <div className="w-full h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-indigo-500"></div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                    <span className="text-slate-500 text-[9px] uppercase">Active Leads:</span>
                    <span className="text-slate-300 font-bold">{contacts.length}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-900/40">
                    <button 
                      onClick={handleLogout}
                      className="w-full mt-1.5 flex items-center justify-between px-2.5 py-1.5 text-[10px] uppercase font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-red-500/10 hover:border-red-500/20 rounded cursor-pointer transition-colors font-mono"
                    >
                      <span>Terminate Seat</span>
                      <LogOut className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </aside>

            {/* APPLET SUB-VIEW PORTAL ROUTER */}
            <section className="flex-1 p-3 xs:p-5 md:p-8 space-y-6 overflow-y-auto max-h-[85vh] custom-scrollbar">
              
              {appletTab === 'dashboard' && (
                <DashboardView 
                  mode={mode}
                  agents={agents}
                  setAgents={setAgents}
                  contacts={contacts}
                  callLogs={callLogs}
                  campaigns={campaigns}
                  onSetTab={setAppletTab}
                  onOpenDialerForContact={(contact) => {
                    setSelectedContactForDial(contact);
                    setAppletTab('dialer');
                  }}
                />
              )}

              {appletTab === 'dialer' && (
                <LiveDialerView 
                  contacts={contacts}
                  onDialContactNow={(contact) => {
                    setSelectedContactForDial(contact);
                  }}
                  selectedContactForDial={selectedContactForDial}
                  onClearDialContact={() => setSelectedContactForDial(null)}
                  addSimulationLog={(newLog) => setCallLogs(prev => [newLog, ...prev])}
                  currentAgentName={currentAgentName}
                />
              )}

              {appletTab === 'campaigns' && (
                <div className="space-y-4">
                  <div className="border-b border-[#334155] pb-4 mb-4">
                    <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl">Predictive Campaigns & Pitch scripts</h2>
                    <p className="text-xs text-slate-450 leading-relaxed font-light mt-1">Manage active outbound campaigns blocks, configure success target limits, and write pitching scripts templates.</p>
                  </div>
                  <Campaigns 
                    campaigns={campaigns}
                    scripts={scripts}
                    onAddCampaign={handleAddCampaign}
                    onAddScript={handleAddScript}
                    onDeleteCampaign={DeleteCampaign => handleDeleteCampaign(DeleteCampaign)}
                  />
                </div>
              )}

              {appletTab === 'crm' && (
                <div className="space-y-4">
                  <div className="border-b border-[#334155] pb-4 mb-4">
                    <h2 className="font-display font-extrabold text-[#00C2FF] text-2xl">Enterprise CRM Lead center</h2>
                    <p className="text-xs text-slate-450 leading-relaxed font-light mt-1">Log chronologies, filter healthcare / SaaS target groups, drag documents, and initiate call sweeps instantly.</p>
                  </div>
                  <CRM 
                    contacts={contacts}
                    onAddContact={handleUpsertContact}
                    onAppendContactsBatch={(newBatch) => setContacts(prev => [...newBatch, ...prev])}
                    onSelectContactForDial={(contact) => {
                      setSelectedContactForDial(contact);
                      setAppletTab('dialer');
                      setIsSoftphoneExpanded(true);
                    }}
                    onDeleteContact={handleDeleteContact}
                    currentAgentName={currentAgentName}
                  />
                </div>
              )}

              {appletTab === 'agents' && (
                <AgentsView 
                  agents={agents}
                  setAgents={setAgents}
                />
              )}

              {appletTab === 'monitor' && (
                <LiveMonitorView 
                  logs={systemLogs}
                />
              )}

              {appletTab === 'whatsapp' && (
                <WhatsAppView />
              )}

              {appletTab === 'recordings' && (
                <RecordingsView 
                  callLogs={callLogs}
                />
              )}

              {appletTab === 'reports' && (
                <Analytics 
                  logs={callLogs}
                  agents={agents}
                />
              )}

              {appletTab === 'copilot' && (
                <AICopilotView />
              )}

              {appletTab === 'import' && (
                <ImportLeadsView 
                  onAppendContactsBatch={(newBatch) => setContacts(prev => [...newBatch, ...prev])}
                />
              )}

            </section>

          </div>
        )}
      </main>

      {/* PERSISTENT FLOATING STICKY SOFTPHONE BAR */}
      {currentSection === 'applet' && isSoftphoneExpanded && (
        <div 
          id="floating-softphone-drawer"
          className="fixed bottom-6 right-6 z-50 transition-all duration-300 w-full max-w-xs md:max-w-md"
        >
          <div className="bg-[#1E293B] border-2 border-brand-primary rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Collapse button header banner */}
            <div className="bg-[#11192E] px-4 py-2 border-b border-[#334155] flex justify-between items-center text-xs font-mono">
              <span className="text-brand-secondary font-bold">● Active Telephony Box</span>
              <button 
                onClick={() => setIsSoftphoneExpanded(false)}
                className="px-2 py-0.5 hover:bg-slate-800 rounded font-semibold text-slate-400 hover:text-white transition select-none cursor-pointer"
              >
                Minimize ✕
              </button>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              <Softphone 
                activeContact={selectedContactForDial}
                onCallEnded={handleCallEnded}
                onClose={() => {
                  setIsSoftphoneExpanded(false);
                  setSelectedContactForDial(null);
                }}
                currentAgentName={currentAgentName}
              />
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL AUTHORIZATION MODAL PORTAL COCKPIT */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* GOOGLE IDENTITY SERVICES SECURE ONE_TAP INTERCEPT PORTAL */}
      <GoogleSignIn 
        onSuccess={handleAuthSuccess}
        isAuthenticated={isAuthenticated}
      />

      {/* FOOTER METRICS INFO */}
      <footer className="bg-[#0E0E10] border-t border-slate-800 py-2.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] font-mono text-slate-450 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse"></div>
            <span className="font-semibold text-emerald-400">CLUSTER-01 // OPERATIONAL</span>
          </div>
          <span className="text-slate-800">|</span>
          <span className="text-slate-300">API_VERSION: 1.14.2-LST</span>
        </div>
        <div className="text-center text-[9px] text-slate-450">
          © 2026 NexDial.io platform. Handcrafted by <a href="https://dattasable.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold hover:underline">Datta Sable</a>. Encrypted connection stabilized securely under TLS 1.3 protocol.
        </div>
        <div className="flex items-center gap-4 text-slate-450">
          <span>HOST: AWS-US-EAST</span>
          <span>ENV: PRODUCTION</span>
          <span className="text-[#00C2FF] font-bold font-mono tracking-widest">{utcTime}</span>
        </div>
      </footer>

    </div>
  );
}
