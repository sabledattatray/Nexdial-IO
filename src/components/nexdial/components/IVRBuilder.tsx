import React, { useState, useEffect } from 'react';
import { 
  Plus, Play, PhoneCall, Trash2, Save, Sparkles, HelpCircle, ArrowRight, Settings, Info, Check, MessageCircle, Mic
} from 'lucide-react';
import { IVRNode, IVRConnection } from '../types';

interface IVRBuilderProps {
  initialNodes: IVRNode[];
  initialConnections: IVRConnection[];
  onSave: (nodes: IVRNode[], connections: IVRConnection[]) => void;
}

export default function IVRBuilder({ 
  initialNodes, 
  initialConnections, 
  onSave 
}: IVRBuilderProps) {
  
  const [nodes, setNodes] = useState<IVRNode[]>(initialNodes);
  const [connections, setConnections] = useState<IVRConnection[]>(initialConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('n-start');
  const [isSaved, setIsSaved] = useState(false);

  // New Node Form states
  const [newNodeType, setNewNodeType] = useState<'PlayAudio' | 'GatherInput' | 'RouteCall' | 'Voicemail' | 'AI_Agent'>('PlayAudio');
  
  // New Connection Form states
  const [newConnFrom, setNewConnFrom] = useState('');
  const [newConnTo, setNewConnTo] = useState('');
  const [newConnTrigger, setNewConnTrigger] = useState('1');

  // Trigger auto notice hide on save
  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  // Node parameter modifiers
  const handleConfigChange = (nodeId: string, key: string, value: any) => {
    setNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          config: {
            ...node.config,
            [key]: value
          }
        };
      }
      return node;
    }));
  };

  // Drag simulation helpers (click buttons to shift nodes around canvas grid map)
  const handleShiftNode = (nodeId: string, dir: 'up' | 'down' | 'left' | 'right') => {
    setNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        let { x, y } = node;
        const delta = 40;
        if (dir === 'up') y -= delta;
        if (dir === 'down') y += delta;
        if (dir === 'left') x -= delta;
        if (dir === 'right') x += delta;
        return { ...node, x: Math.max(10, x), y: Math.max(10, y) };
      }
      return node;
    }));
  };

  const handleAddNode = () => {
    const id = `node-${Date.now()}`;
    const titlesMap = {
      PlayAudio: 'Play Notification Msg',
      GatherInput: 'Read Keypad Input Menu',
      RouteCall: 'Department Call Router',
      Voicemail: 'Record Voicemail inbox',
      AI_Agent: 'Launch Gemini Screening Bot'
    };

    const configsMap = {
      PlayAudio: { audioFile: 'prompt_file.wav', fallbackText: 'Please hold while we route' },
      GatherInput: { allowedKeys: '1,2,3', timeout: 8 },
      RouteCall: { group: 'VIP Support Agents', ringTime: '20s' },
      Voicemail: { inbox: 'corp@business_domain.com', prefix: 'Leave a brief message' },
      AI_Agent: { model: 'gemini-3.5-flash', persona: 'Helpful Receptionist Desk' }
    };

    const newNode: IVRNode = {
      id,
      title: titlesMap[newNodeType],
      type: newNodeType,
      x: 350,
      y: 180,
      config: configsMap[newNodeType]
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(id);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === 'n-start') {
      alert("Start Call Node cannot be deleted as it is the landing anchor.");
      return;
    }
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(conn => conn.fromId !== nodeId && conn.toId !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId('n-start');
    }
  };

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnFrom || !newConnTo) return;
    if (newConnFrom === newConnTo) {
      alert("Loops are blocked. Connecting a node to itself is not supported.");
      return;
    }

    const id = `conn-${Date.now()}`;
    const newConn: IVRConnection = {
      id,
      fromId: newConnFrom,
      toId: newConnTo,
      triggerKey: newConnTrigger
    };

    setConnections(prev => [...prev, newConn]);
    setNewConnFrom('');
    setNewConnTo('');
  };

  const handleDeleteConnection = (connId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connId));
  };

  const handleSaveWorkspace = () => {
    onSave(nodes, connections);
    setIsSaved(true);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* 1. Left Action Deck & Connecting Panel */}
      <div className="space-y-6 lg:col-span-1">
        
        {/* Save Work trigger */}
        <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] text-center space-y-3">
          <h3 className="text-xs font-mono uppercase text-slate-450 tracking-wider">IVR Workflow Engine</h3>
          <p className="text-[11px] text-slate-400 font-light">Draw routing flows. Map dialed keypad options directly to specific agents groups.</p>
          <button 
            onClick={handleSaveWorkspace}
            className="w-full py-3 bg-[#00E5B0] hover:bg-[#00c294] text-[#0F172A] text-xs font-display font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00E5B0]/15"
          >
            <Save className="w-4 h-4 inline-block mr-1" /> Save Active IVR Rules
          </button>
          {isSaved && (
            <div className="flex items-center gap-1.5 justify-center text-xs text-accent-teal mt-2">
              <Check className="w-4 h-4" /> Live rules deployment OK!
            </div>
          )}
        </div>

        {/* Node Spawner */}
        <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-tight">Spawn voice components</h4>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Component Module Category</label>
            <select 
              value={newNodeType}
              onChange={(e: any) => setNewNodeType(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] p-2 rounded-lg text-xs font-medium"
            >
              <option value="PlayAudio">Play Audio / Prompt</option>
              <option value="GatherInput">Gather Keypad Inputs</option>
              <option value="RouteCall">Rings Telephony Queue</option>
              <option value="Voicemail">Trigger Voicemail Inbox</option>
              <option value="AI_Agent">AI Receptionist Bot (Gemini)</option>
            </select>
          </div>
          <button 
            onClick={handleAddNode}
            className="w-full py-2.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Drop onto Canvas Map
          </button>
        </div>

        {/* Connections form */}
        <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155]">
          <h4 className="text-xs font-bold text-white uppercase tracking-tight mb-3">Draw Link Paths</h4>
          <form onSubmit={handleAddConnection} className="space-y-4 text-xs font-light">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">From Node</label>
              <select 
                value={newConnFrom}
                onChange={(e) => setNewConnFrom(e.target.value)}
                required
                className="w-full bg-[#0F172A] border border-[#334155] p-2 rounded-lg text-xs"
              >
                <option value="">Select source...</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Trigger condition (KeyPress / SLA Status)</label>
              <input 
                type="text" 
                placeholder="e.g. 1, 2, success, fail" 
                value={newConnTrigger}
                onChange={(e) => setNewConnTrigger(e.target.value)}
                required
                className="w-full bg-[#0F172A] border border-[#334155] p-2 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">To Node</label>
              <select 
                value={newConnTo}
                onChange={(e) => setNewConnTo(e.target.value)}
                required
                className="w-full bg-[#0F172A] border border-[#334155] p-2 rounded-lg text-xs"
              >
                <option value="">Select target...</option>
                {nodes.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#334155] hover:bg-[#475569] text-white text-xs font-bold rounded-xl">
              Connect Nodes
            </button>
          </form>
        </div>

      </div>

      {/* 2. Central Canvas Grid Area */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#0F172A] rounded-3xl border border-[#334155] p-6 min-h-[500px] relative overflow-auto custom-scrollbar bg-grid-pattern">
          
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#0F172A] py-1 border-b border-[#334155] pb-3 z-10">
            <div>
              <h3 className="font-display font-extrabold text-[#00C2FF]">Interactive Voice Designer Area</h3>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Draw custom flows. Map caller actions to specific queues.</p>
            </div>
            <span className="text-[10px] bg-brand-primary/10 text-brand-secondary px-2 py-0.5 rounded font-mono uppercase font-bold text-right">
              {nodes.length} nodes active
            </span>
          </div>

          {/* Connected Lines SVG Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: "900px", minHeight: "800px" }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#5B5EFF" />
              </marker>
            </defs>
            {connections.map((conn) => {
              const fromN = nodes.find(n => n.id === conn.fromId);
              const toN = nodes.find(n => n.id === conn.toId);
              if (!fromN || !toN) return null;

              // Compute center coords of nodes
              const startX = fromN.x + 90;
              const startY = fromN.y + 40;
              const endX = toN.x + 90;
              const endY = toN.y + 40;

              return (
                <g key={conn.id}>
                  <line 
                    x1={startX} 
                    y1={startY} 
                    x2={endX} 
                    y2={endY} 
                    stroke="#5B5EFF" 
                    strokeWidth="2" 
                    strokeDasharray="4,4"
                    markerEnd="url(#arrow)" 
                  />
                  <foreignObject 
                    x={(startX + endX) / 2 - 25} 
                    y={(startY + endY) / 2 - 12} 
                    width="60" 
                    height="24"
                  >
                    <div className="bg-[#1E293B] border border-[#334155] text-white text-[9px] font-mono rounded text-center py-0.5 select-none uppercase font-bold shadow">
                      Key: {conn.triggerKey}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Render node components cards */}
          <div className="relative w-full h-full" style={{ minWidth: "900px", minHeight: "650px" }}>
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <div 
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute w-[180px] p-4 rounded-2xl cursor-pointer select-none transition-all border shadow-lg ${isSelected ? 'bg-brand-primary/10 border-brand-primary ring-2 ring-brand-primary/20 scale-103' : 'bg-[#1E293B] border-[#334155] hover:border-[#475569]'}`}
                >
                  <div className="flex items-center gap-1.5 justify-between border-b border-[#334155]/60 pb-2 mb-2">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">{node.type}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }}
                        className="text-slate-400 hover:text-accent-coral p-0.5 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-xs text-white truncate">{node.title}</h4>
                  
                  {/* Quick parameter brief preview */}
                  <div className="mt-2 text-[10px] text-slate-400 truncate leading-relaxed">
                    {node.type === 'Start' && `Greeting menu is set`}
                    {node.type === 'PlayAudio' && `Play: ${node.config.audioFile}`}
                    {node.type === 'GatherInput' && `Timer: ${node.config.timeout}s`}
                    {node.type === 'RouteCall' && `Queue: ${node.config.group}`}
                    {node.type === 'Voicemail' && `Target: ${node.config.inbox}`}
                    {node.type === 'AI_Agent' && `Assistant config active`}
                  </div>

                  {/* Manual coordinates shifter pads */}
                  {isSelected && (
                    <div className="mt-4 grid grid-cols-4 gap-1 text-[9px] border-t border-[#334155] pt-3">
                      <button onClick={(e) => { e.stopPropagation(); handleShiftNode(node.id, 'left'); }} className="bg-[#0F172A] py-1 border border-[#334155] hover:bg-slate-800 text-center rounded">◀</button>
                      <button onClick={(e) => { e.stopPropagation(); handleShiftNode(node.id, 'up'); }} className="bg-[#0F172A] py-1 border border-[#334155] hover:bg-slate-800 text-center rounded">▲</button>
                      <button onClick={(e) => { e.stopPropagation(); handleShiftNode(node.id, 'down'); }} className="bg-[#0F172A] py-1 border border-[#334155] hover:bg-slate-800 text-center rounded">▼</button>
                      <button onClick={(e) => { e.stopPropagation(); handleShiftNode(node.id, 'right'); }} className="bg-[#0F172A] py-1 border border-[#334155] hover:bg-slate-800 text-center rounded">▶</button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. Right Node Parameter Edit Form Sheet */}
      <div className="space-y-6 lg:col-span-1">
        
        {selectedNode ? (
          <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] space-y-6">
            <div className="flex items-center gap-2 border-b border-[#334155] pb-3 justify-between">
              <div className="flex items-center gap-1.5">
                <Settings className="w-5 h-5 text-brand-primary" />
                <h4 className="font-display font-extrabold text-sm text-white">Modify parameters</h4>
              </div>
              <span className="text-[9px] bg-[#334155] px-2 py-0.5 rounded font-mono uppercase font-bold text-slate-400">ID: {selectedNode.id}</span>
            </div>

            <div className="space-y-4 text-xs font-light">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Friendly Component Title</label>
                <input 
                  type="text" 
                  value={selectedNode.title}
                  onChange={(e) => setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, title: e.target.value } : n))}
                  className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                />
              </div>

              {/* Start node details editing */}
              {selectedNode.type === 'Start' && (
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Text-to-Speech Welcome Pitch greeting</label>
                  <textarea 
                    rows={4}
                    value={selectedNode.config.greeting}
                    onChange={(e) => handleConfigChange(selectedNode.id, 'greeting', e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs custom-scrollbar"
                  />
                  <span className="text-[9px] text-[#00E5B0] leading-relaxed block mt-1">● Handled by standard automated wave synthesizers</span>
                </div>
              )}

              {/* Play Audio Editing */}
              {selectedNode.type === 'PlayAudio' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Specify Voice Wave (.wav file name)</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.audioFile}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'audioFile', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Text-to-Speech fallback backup prompt</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.fallbackText}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'fallbackText', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Gather inputs keypad timing editing */}
              {selectedNode.type === 'GatherInput' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Keys allowed to trigger transitions</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.allowedKeys}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'allowedKeys', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Gather Input wait timeout (seconds)</label>
                    <input 
                      type="number" 
                      value={selectedNode.config.timeout}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'timeout', parseInt(e.target.value))}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Route line trigger queue */}
              {selectedNode.type === 'RouteCall' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Target BPO Queue / Group</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.group}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'group', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Ring time ceiling before Timeout fails</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.ringTime}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'ringTime', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* AI Agent (Gemini Receptionist) */}
              {selectedNode.type === 'AI_Agent' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Gemini AI Engine Model Version</label>
                    <select 
                      value={selectedNode.config.model}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'model', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs font-mono"
                    >
                      <option value="gemini-3.5-flash">gemini-3.5-flash</option>
                      <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview</option>
                      <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">AI Receptionist instructions & script sheets</label>
                    <textarea 
                      rows={5}
                      value={selectedNode.config.persona}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'persona', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs custom-scrollbar"
                    />
                  </div>
                </div>
              )}

              {/* Voicemail Inbox settings */}
              {selectedNode.type === 'Voicemail' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Target backup delivery email</label>
                    <input 
                      type="email" 
                      value={selectedNode.config.inbox}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'inbox', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Intro voice instruction alert</label>
                    <input 
                      type="text" 
                      value={selectedNode.config.prefix}
                      onChange={(e) => handleConfigChange(selectedNode.id, 'prefix', e.target.value)}
                      className="w-full bg-[#0F172A] border border-[#334155] p-2.5 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="bg-[#1E293B] p-6 rounded-3xl border border-[#334155] text-center py-12">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-xs font-light font-mono leading-relaxed">Click any component card in central board to inspect and modify settings.</p>
          </div>
        )}

        {/* Existing Connection bindings tracker lists */}
        <div className="bg-[#1E293B] p-5 rounded-3xl border border-[#334155] space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-tight">Active link bindings</h4>
          <div className="max-h-[160px] overflow-y-auto custom-scrollbar space-y-2 text-xs">
            {connections.length === 0 ? (
              <p className="text-slate-500 italic text-[11px] text-center">No connection wires mapped.</p>
            ) : (
              connections.map((c) => {
                const src = nodes.find(n => n.id === c.fromId)?.title || c.fromId;
                const dst = nodes.find(n => n.id === c.toId)?.title || c.toId;
                return (
                  <div key={c.id} className="bg-[#0F172A] p-2.5 rounded-xl border border-[#334155] flex justify-between items-center text-[10px]">
                    <div className="truncate flex-1 pr-2">
                      <span className="text-[#00C2FF] font-mono">{src}</span>
                      <span className="text-slate-400"> → ({c.triggerKey}) → </span>
                      <span className="text-[#00E5B0] font-mono">{dst}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteConnection(c.id)}
                      className="text-slate-400 hover:text-accent-coral p-0.5 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
