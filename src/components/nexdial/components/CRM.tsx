import React, { useState } from 'react';
import { 
  Users, Search, Plus, Filter, ArrowUpRight, Phone, Mail, MoreVertical, Trash2, 
  MessageSquare, Sparkles, ChevronRight, X, Clock, HelpCircle, Save, Calendar, FileDown, UploadCloud
} from 'lucide-react';
import { Contact, NoteItem } from '../types';
import { parseCSVLeads, generateSimulatorContacts, downloadSampleCSV } from '../utils/csvParser';

interface CRMProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
  onAppendContactsBatch?: (contacts: Contact[]) => void;
  onSelectContactForDial: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  currentAgentName: string;
}

export default function CRM({ 
  contacts, 
  onAddContact, 
  onAppendContactsBatch,
  onSelectContactForDial,
  onDeleteContact,
  currentAgentName 
}: CRMProps) {
  
  // CRM Navigation & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState<'All' | 'Healthcare' | 'RealEstate' | 'Banking' | 'SaaS' | 'Logistics'>('All');
  
  // Create Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '', phone: '', email: '', company: '', 
    segment: 'SaaS' as any, status: 'Lead' as any, revenue: 5000
  });

  // Client Details Drawer state
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Drag-and-drop CSV upload simulation state
  const [dragActive, setDragActive] = useState(false);
  const [csvResultNotice, setCsvResultNotice] = useState<string | null>(null);

  // Filter contacts lists
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);

    const matchesSegment = activeSegment === 'All' ? true : contact.segment === activeSegment;
    return matchesSearch && matchesSegment;
  });

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  // Handles adding note inside details timeline
  const handleAddTimelineNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedContactId) return;

    const nItem: NoteItem = {
      id: `note-${Date.now()}`,
      text: newNoteText,
      timestamp: new Date().toISOString(),
      author: currentAgentName
    };

    // Locate and append note inside the contact notes
    const updatedContact = {
      ...selectedContact!,
      notes: [nItem, ...selectedContact!.notes]
    };

    // Reflect to CRM
    onAddContact(updatedContact); // Re-posting updated lead structure to parent context triggers react reload
    setNewNoteText('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ld: Contact = {
      id: `c-${Date.now()}`,
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      company: newLeadForm.company,
      segment: newLeadForm.segment,
      status: newLeadForm.status,
      tags: ['New Lead', 'Outbound'],
      notes: [
        { id: `n-init-${Date.now()}`, text: `Lead initialized and synced to Nexdial telemetry.`, timestamp: new Date().toISOString(), author: currentAgentName }
      ],
      sentiment: 'Neutral',
      revenueValue: Number(newLeadForm.revenue)
    };

    onAddContact(ld);
    setIsCreateOpen(false);
    setNewLeadForm({ name: '', phone: '', email: '', company: '', segment: 'SaaS', status: 'Lead', revenue: 5000 });
  };

  // Mock excel / CSV drop simulation
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileIngestion(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileIngestion(e.target.files[0]);
    }
  };

  const handleFileIngestion = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const parsedLeads = parseCSVLeads(text, currentAgentName);
        if (parsedLeads && parsedLeads.length > 0) {
          if (onAppendContactsBatch) {
            onAppendContactsBatch(parsedLeads);
          } else {
            parsedLeads.forEach(lead => onAddContact(lead));
          }
          setCsvResultNotice(`CSV integrated successfully: synchronized ${parsedLeads.length} active leads from "${file.name}"!`);
        } else {
          const fallbackBatch = generateSimulatorContacts(currentAgentName);
          if (onAppendContactsBatch) {
            onAppendContactsBatch(fallbackBatch);
          } else {
            fallbackBatch.forEach(lead => onAddContact(lead));
          }
          setCsvResultNotice(`Imported 5 demo CRM leads (unrecognized Excel/CSV structure in "${file.name}").`);
        }
      } catch (err) {
        const fallbackBatch = generateSimulatorContacts(currentAgentName);
        if (onAppendContactsBatch) {
          onAppendContactsBatch(fallbackBatch);
        } else {
          fallbackBatch.forEach(lead => onAddContact(lead));
        }
        setCsvResultNotice(`Imported 5 template CRM leads (error reading "${file.name}").`);
      }
      setTimeout(() => setCsvResultNotice(null), 8000);
    };

    reader.onerror = () => {
      setCsvResultNotice(`Error: Failed to upload file "${file.name}".`);
      setTimeout(() => setCsvResultNotice(null), 5000);
    };

    reader.readAsText(file);
  };


  return (
    <div className="w-full relative space-y-6">
      
      {/* Upper control bars (Search, Filter cards, New button, drag upload) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1E293B] p-5 rounded-3xl border border-[#334155]">
        
        {/* Search Input bar */}
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input 
            type="text" 
            placeholder="Search CRM by name, company, domain, or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] pl-9 pr-4 py-3 text-xs text-white rounded-xl placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {/* Drop Excel button */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-brand-primary/10 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Corporate Lead
          </button>
        </div>
      </div>

      {/* Drag simulation zone with manual click to browse fallback */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('crm-csv-uploader')?.click()}
        className={`p-6 border-2 border-dashed rounded-3xl text-center transition-all cursor-pointer ${
          dragActive 
            ? 'border-[#00E5B0] bg-[#00E5B0]/5Scale' 
            : 'border-[#334155] bg-slate-900/10 hover:border-slate-600 hover:bg-slate-900/20'
        }`}
      >
        <input 
          type="file"
          id="crm-csv-uploader"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileInput}
          className="hidden"
        />
        <UploadCloud className="w-8 h-8 text-[#00C2FF] mx-auto mb-2 animate-pulse" />
        <p className="text-xs text-slate-300">
          Drag & drop your lead sheets (.csv, .xlsx) here or <span className="text-[#00C2FF] font-semibold underline">click to browse files</span>
        </p>
        <p className="text-[10px] text-slate-450 mt-1">
          Automatic mapping of: Name, Business Phone, Email and Sector Value &middot;{' '}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              downloadSampleCSV();
            }}
            className="text-[#00C2FF] font-bold underline hover:text-[#00E5B0] hover:scale-102 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            Download Sample CSV
          </button>
        </p>
        {csvResultNotice && (
          <div className="text-xs font-mono font-bold text-[#00E5B0] mt-3">
            {csvResultNotice}
          </div>
        )}
      </div>

      {/* Filter Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar text-xs">
        {(['All', 'Healthcare', 'RealEstate', 'Banking', 'SaaS', 'Logistics'] as const).map((seg) => {
          const isButton1 = seg === 'All';
          return (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`px-4 py-2 font-semibold duration-150 rounded-xl cursor-pointer ${activeSegment === seg ? 'bg-brand-primary text-white border-none' : 'bg-[#1E293B] border border-[#334155] text-slate-400 hover:text-white'}`}
              style={isButton1 ? { backgroundColor: '#ffffff', color: '#11192e' } : undefined}
            >
              {seg === 'All' ? 'All Segments' : seg}
            </button>
          );
        })}
      </div>

      {/* CRM Main Grid Spreadsheet Layout */}
      <div className="bg-[#1E293B] rounded-3xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#11192E] border-b border-[#334155] text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <th className="py-4 px-6 font-bold">Representative Name</th>
                <th className="py-4 px-6 font-bold">Company Matrix</th>
                <th className="py-4 px-6 font-bold">Email</th>
                <th className="py-4 px-6 font-bold">Category Sector</th>
                <th className="py-4 px-6 font-bold">Lead Status</th>
                <th className="py-4 px-6 font-bold">Client Sentiment</th>
                <th className="py-4 px-6 font-bold text-right">Deal Value</th>
                <th className="py-4 px-6 font-bold text-center">Dial Setup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]/60 text-xs font-light">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 italic">No corresponding CRM entries found.</td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-[#1C2333]/40 cursor-pointer group transition-colors duration-150"
                    onClick={() => setSelectedContactId(contact.id)}
                  >
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                        {contact.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span>{contact.name}</span>
                        <p className="text-[10px] text-slate-450 font-mono mt-0.5">{contact.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300">{contact.company}</td>
                    <td className="py-4 px-6 text-slate-400 font-mono">{contact.email}</td>
                    <td className="py-4 px-6">
                      <span 
                        className="bg-[#334155] text-slate-800 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
                        style={{ backgroundColor: '#ffffff' }}
                      >
                        {contact.segment}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${contact.status === 'Closed_Won' ? 'bg-[#00E5B0]/10 text-[#00E5B0] border border-[#00E5B0]/20' : contact.status === 'Closed_Lost' ? 'bg-red-500/10 text-red-500' : contact.status === 'Negotiation' ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'bg-brand-primary/10 text-brand-secondary'}`}>
                        {contact.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${contact.sentiment === 'Positive' ? 'text-[#00E5B0]' : contact.sentiment === 'Negative' ? 'text-accent-coral' : 'text-slate-400'}`}>
                        ● {contact.sentiment}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-white">${contact.revenueValue.toLocaleString()}</td>
                    <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => onSelectContactForDial(contact)}
                        className="p-2 bg-[#00E5B0]/10 hover:bg-[#00E5B0]/20 text-accent-teal rounded-lg transition-transform hover:scale-110 cursor-pointer"
                        title="Load into global dialer"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Slider Drawer for Selected Customer Timeline */}
      {selectedContact && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#1E293B] border-l border-[#334155] shadow-2xl z-40 transform translate-x-0 transition-transform duration-300 flex flex-col justify-between max-h-screen">
          
          {/* Drawer upper */}
          <div className="p-4 sm:p-6 border-b border-[#334155] flex justify-between items-center bg-[#11192E]">
            <div className="flex items-center gap-2.5 xs:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/15 text-brand-secondary flex items-center justify-center font-display font-extrabold text-xs sm:text-sm">
                {selectedContact.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-display font-black text-sm sm:text-lg text-white leading-tight">{selectedContact.name}</h3>
                <p className="text-[10px] sm:text-xs text-slate-450">{selectedContact.company} • {selectedContact.segment}</p>
              </div>
            </div>
            
            <button onClick={() => setSelectedContactId(null)} className="p-1 px-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Body: Scrollable chronological feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar space-y-4 sm:space-y-6">
            
            {/* Action deck */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { onSelectContactForDial(selectedContact); setSelectedContactId(null); }}
                className="py-2 sm:py-2.5 bg-[#00E5B0] text-[#0F172A] hover:bg-[#00c294] text-[10px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Dial Client Phone
              </button>
              <button 
                onClick={() => { onDeleteContact(selectedContact.id); setSelectedContactId(null); }}
                className="py-2 sm:py-2.5 bg-accent-coral/10 hover:bg-[#FF6B6B]/20 text-accent-coral text-[10px] sm:text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Archive Record
              </button>
            </div>

            {/* General metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-[#0F172A] p-2 sm:p-3 rounded-xl border border-[#334155] text-center">
                <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-slate-450 block">Segment</span>
                <span className="text-[11px] sm:text-xs text-white font-bold mt-1 block truncate">{selectedContact.segment}</span>
              </div>
              <div className="bg-[#0F172A] p-2 sm:p-3 rounded-xl border border-[#334155] text-center">
                <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-slate-450 block">Sentiment</span>
                <span className="text-[11px] sm:text-xs text-[#00E5B0] font-bold mt-1 block truncate">{selectedContact.sentiment}</span>
              </div>
              <div className="bg-[#0F172A] p-2 sm:p-3 rounded-xl border border-[#334155] text-center">
                <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-slate-450 block">Value</span>
                <span className="text-[11px] sm:text-xs text-brand-primary font-bold mt-1 block truncate">${selectedContact.revenueValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Append timeline notes form */}
            <div className="bg-[#0F172A] p-3 sm:p-4 rounded-xl border border-brand-primary/20">
              <h4 className="text-[9px] sm:text-[10px] text-brand-primary font-mono uppercase tracking-widest mb-2 font-bold select-none">Enter timeline log note</h4>
              <form onSubmit={handleAddTimelineNote} className="space-y-2">
                <textarea 
                  rows={2}
                  required
                  placeholder="Leave details about latest calls, customer requests..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full bg-[#11192E] border border-[#334155] p-2 sm:p-2.5 text-xs text-white rounded-lg placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button type="submit" className="w-full py-2 bg-brand-primary text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" /> Synchronize Note
                </button>
              </form>
            </div>

            {/* Timeline Chronicle lists */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-[9px] sm:text-[10px] text-slate-450 font-mono uppercase tracking-widest">Chronological Activity notes</h4>
              {selectedContact.notes.map((n) => (
                <div key={n.id} className="p-3 sm:p-4 bg-[#0F172A] rounded-xl border border-[#1E293B] space-y-1.5">
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono tracking-wider">
                    <span className="text-[#00E5B0] font-bold">{n.author} (rep)</span>
                    <span className="text-slate-500">{new Date(n.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-300 text-xs font-light leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Footer stats */}
          <div className="p-4 sm:p-6 border-t border-[#334155] bg-[#11192E] text-[10px] sm:text-xs text-slate-500 text-center font-mono">
            Lead synced: sabledattatray@gmail.com • ID: {selectedContact.id}
          </div>

        </div>
      )}

      {/* 4. Create Lead Form Modal overlay */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full relative">
            <h3 className="font-display font-bold text-xl text-white mb-2">Create corporate Lead</h3>
            <p className="text-xs text-slate-400 mb-6 font-light">Add new entries to Nexdial dialer queues instantly.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-light">
              <div>
                <label className="text-slate-400 block mb-1">Company legal name</label>
                <input 
                  type="text" 
                  required 
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Client representative name</label>
                <input 
                  type="text" 
                  required 
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Business phone line</label>
                  <input 
                    type="text" 
                    placeholder="+1 (555) 000-0000"
                    required 
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Estimated deal value</label>
                  <input 
                    type="number" 
                    value={newLeadForm.revenue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, revenue: Number(e.target.value) })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Representative email</label>
                <input 
                  type="email" 
                  required 
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Segment sector</label>
                  <select 
                    value={newLeadForm.segment}
                    onChange={(e: any) => setNewLeadForm({ ...newLeadForm, segment: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="RealEstate">Real Estate</option>
                    <option value="Banking">Banking</option>
                    <option value="Logistics">Logistics</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Initial CRM step</label>
                  <select 
                    value={newLeadForm.status}
                    onChange={(e: any) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                    className="w-full bg-[#0F172A] border border-[#334155] p-3 rounded-lg text-white font-bold"
                  >
                    <option value="Lead">Lead Entry</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Negotiation">Negotiation</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsCreateOpen(false)}
                  className="flex-1 py-3 bg-[#334155] text-white font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-brand-primary text-white font-bold rounded-xl cursor-pointer"
                >
                  Confirm Lead
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
