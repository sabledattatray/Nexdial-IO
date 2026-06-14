"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Loader2, UserPlus, AlertCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setStaff(data.data.filter((u: User) => u.role === "WAITER" || u.role === "ADMIN"));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addStaff = async () => {
    if (!newName || !newEmail) return;
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail, role: "WAITER" }),
      });
      if (res.ok) {
        setIsAdding(false);
        setNewName("");
        setNewEmail("");
        fetchStaff();
      } else {
        const err = await res.json();
        alert("Failed to add staff: " + err.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00C2FF]" />
      </div>
    );
  }

  const waiters = staff.filter(s => s.role === "WAITER");
  const managers = staff.filter(s => s.role === "ADMIN");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-400" />
            Restaurant Staff
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage waitstaff and restaurant managers</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          <UserPlus className="w-4 h-4" />
          Add Waiter
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#0A1628] border border-orange-500/30 p-5 rounded-xl flex gap-4 items-end shadow-2xl">
          <div className="flex-1 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-sm text-white focus:border-orange-500 outline-none"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
            <input 
              type="email" 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="john@restaurant.com"
              className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-sm text-white focus:border-orange-500 outline-none"
            />
          </div>
          <button onClick={addStaff} className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg text-sm hover:bg-orange-600 transition-colors">Add</button>
          <button onClick={() => setIsAdding(false)} className="px-6 py-2 bg-white/5 text-slate-300 font-bold rounded-lg text-sm hover:bg-white/10 transition-colors">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Waitstaff */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-400" />
            Active Waitstaff ({waiters.length})
          </h2>
          
          {waiters.length === 0 && (
            <div className="p-8 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
              <AlertCircle className="w-8 h-8 text-slate-500 mb-2" />
              <p className="text-slate-400 text-sm">No waitstaff added yet.</p>
            </div>
          )}

          <div className="space-y-3">
            {waiters.map(waiter => (
              <div key={waiter.id} className="bg-[#020610] border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:border-orange-500/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-lg">
                  {waiter.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{waiter.name}</h3>
                  <p className="text-xs text-slate-400">{waiter.email}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Waiter</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Managers */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00C2FF]" />
            Restaurant Managers ({managers.length})
          </h2>
          
          <div className="space-y-3">
            {managers.map(manager => (
              <div key={manager.id} className="bg-[#020610] border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:border-[#00C2FF]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#00C2FF]/10 text-[#00C2FF] flex items-center justify-center font-bold text-lg">
                  {manager.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{manager.name}</h3>
                  <p className="text-xs text-slate-400">{manager.email}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-0.5 rounded bg-[#00C2FF]/10 text-[10px] uppercase font-bold text-[#00C2FF] tracking-wider">Manager</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
