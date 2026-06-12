"use client";

import { useState, useEffect } from "react";
import { Plus, ArrowRight, Play, Trash2, X, Save, Route } from "lucide-react";

type RuleCondition = {
  field: string;
  operator: string;
  value: string;
};

type RuleAction = {
  type: string;
  value: string;
};

type RoutingRule = {
  id: string;
  name: string;
  priority: number;
  isActive: boolean;
  conditions: RuleCondition[];
  actions: RuleAction[];
};

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export default function RoutingTab() {
  const [rules, setRules] = useState<RoutingRule[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New Rule State
  const [newName, setNewName] = useState("");
  const [newConditions, setNewConditions] = useState<RuleCondition[]>([{ field: "source", operator: "equals", value: "" }]);
  const [newActions, setNewActions] = useState<RuleAction[]>([{ type: "assignTo", value: "" }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [rulesRes, usersRes] = await Promise.all([
        fetch("/api/routing"),
        fetch("/api/users")
      ]);
      if (rulesRes.ok) setRules(await rulesRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const saveRule = async () => {
    if (!newName) return alert("Please enter a rule name");
    
    try {
      const res = await fetch("/api/routing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          priority: rules.length + 1,
          isActive: true,
          conditions: newConditions,
          actions: newActions
        })
      });
      if (res.ok) {
        setIsCreating(false);
        setNewName("");
        setNewConditions([{ field: "source", operator: "equals", value: "" }]);
        setNewActions([{ type: "assignTo", value: "" }]);
        fetchData();
      }
    } catch (e) {
      console.error("Error saving rule", e);
    }
  };

  const deleteRule = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/routing?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const toggleRule = async (rule: RoutingRule) => {
    await fetch("/api/routing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rule, isActive: !rule.isActive })
    });
    fetchData();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Lead Routing Rules</h2>
          <p className="text-sm text-slate-400">Build IF/THEN logic to automatically assign leads and add tags.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-black font-semibold rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Create Rule
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-[#020610] border border-[#00C2FF]/30 rounded-xl p-6 mb-8 shadow-[0_0_20px_rgba(0,194,255,0.1)]">
          <div className="flex items-center justify-between mb-6">
            <input 
              type="text" 
              placeholder="Rule Name (e.g. Facebook High Priority)"
              className="bg-transparent border-none text-lg font-bold text-white placeholder-slate-500 focus:outline-none focus:ring-0 w-full"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
            <button onClick={() => setIsCreating(false)} className="text-slate-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* IF Box */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex-1">
              <span className="text-slate-400 font-bold text-xs tracking-wider mb-3 block">IF THIS HAPPENS...</span>
              
              {newConditions.map((cond, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-2">
                  <select 
                    className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 flex-1"
                    value={cond.field}
                    onChange={(e) => {
                      const c = [...newConditions];
                      c[idx].field = e.target.value;
                      setNewConditions(c);
                    }}
                  >
                    <option value="source">Lead Source</option>
                    <option value="name">Lead Name</option>
                    <option value="email">Email Address</option>
                  </select>

                  <select 
                    className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 w-28"
                    value={cond.operator}
                    onChange={(e) => {
                      const c = [...newConditions];
                      c[idx].operator = e.target.value;
                      setNewConditions(c);
                    }}
                  >
                    <option value="equals">equals</option>
                    <option value="not_equals">is not</option>
                    <option value="contains">contains</option>
                  </select>

                  <input 
                    type="text" 
                    placeholder="Value (e.g. facebook)"
                    className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 flex-1"
                    value={cond.value}
                    onChange={(e) => {
                      const c = [...newConditions];
                      c[idx].value = e.target.value;
                      setNewConditions(c);
                    }}
                  />
                </div>
              ))}
              
              <button 
                onClick={() => setNewConditions([...newConditions, { field: "source", operator: "equals", value: "" }])}
                className="text-xs text-[#00C2FF] font-medium hover:underline mt-2 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Condition
              </button>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-slate-500 rotate-90 md:rotate-0" />
            </div>

            {/* THEN Box */}
            <div className="bg-white/5 border border-[#00C2FF]/20 rounded-lg p-4 flex-1">
              <span className="text-[#00C2FF] font-bold text-xs tracking-wider mb-3 block">THEN DO THIS...</span>
              
              {newActions.map((action, idx) => (
                <div key={idx} className="flex gap-2 items-center mb-2">
                  <select 
                    className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 flex-1"
                    value={action.type}
                    onChange={(e) => {
                      const a = [...newActions];
                      a[idx].type = e.target.value;
                      setNewActions(a);
                    }}
                  >
                    <option value="assignTo">Assign to User</option>
                    <option value="addTag">Add Tag</option>
                  </select>

                  {action.type === "assignTo" ? (
                    <select 
                      className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 flex-1"
                      value={action.value}
                      onChange={(e) => {
                        const a = [...newActions];
                        a[idx].value = e.target.value;
                        setNewActions(a);
                      }}
                    >
                      <option value="">Select User...</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name || u.email}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      placeholder="Tag name"
                      className="bg-[#0f172a] border border-white/10 text-white text-sm rounded-md px-3 py-2 flex-1"
                      value={action.value}
                      onChange={(e) => {
                        const a = [...newActions];
                        a[idx].value = e.target.value;
                        setNewActions(a);
                      }}
                    />
                  )}
                </div>
              ))}

              <button 
                onClick={() => setNewActions([...newActions, { type: "addTag", value: "" }])}
                className="text-xs text-[#00C2FF] font-medium hover:underline mt-2 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Action
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={saveRule}
              className="flex items-center gap-2 px-6 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/90 text-black font-semibold rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Rule
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading rules...</div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
          <Route className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-white font-medium mb-1">No routing rules found</h3>
          <p className="text-sm text-slate-400 mb-4">Create your first rule to automatically assign leads.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className={`bg-[#020610] border border-white/10 rounded-xl p-6 transition-opacity ${!rule.isActive ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">{rule.name}</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => deleteRule(rule.id)} className="text-slate-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div 
                    onClick={() => toggleRule(rule)}
                    className={`w-10 h-5 rounded-full flex items-center p-0.5 cursor-pointer border ${rule.isActive ? 'bg-[#00C2FF]/20 border-[#00C2FF]/30' : 'bg-white/10 border-white/5'}`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-transform ${rule.isActive ? 'bg-[#00C2FF] translate-x-5' : 'bg-slate-500 translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1 space-y-1">
                  <span className="text-slate-400 font-semibold mr-2">IF</span>
                  {rule.conditions.map((c, i) => (
                    <span key={i}>
                      {i > 0 && <span className="text-slate-400 font-semibold mx-2">AND</span>}
                      <span className="text-white">{c.field}</span> <span className="text-slate-400 mx-1">{c.operator}</span> <span className="text-[#00C2FF] font-mono">{c.value}</span>
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-slate-500 rotate-90 md:rotate-0" />
                </div>

                <div className="bg-white/5 border border-[#00C2FF]/20 rounded-lg p-3 flex-1 space-y-1">
                  <span className="text-[#00C2FF] font-semibold mr-2">THEN</span>
                  {rule.actions.map((a, i) => {
                    if (a.type === "assignTo") {
                      const u = users.find(u => u.id === a.value);
                      return (
                        <span key={i}>
                          {i > 0 && <span className="text-slate-400 font-semibold mx-2">AND</span>}
                          <span className="text-white">Assign to</span> <span className="text-[#00C2FF] font-mono">{u?.name || u?.email || "Unknown"}</span>
                        </span>
                      );
                    }
                    return (
                      <span key={i}>
                        {i > 0 && <span className="text-slate-400 font-semibold mx-2">AND</span>}
                        <span className="text-white">Add Tag</span> <span className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded ml-1 text-xs">{a.value}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
