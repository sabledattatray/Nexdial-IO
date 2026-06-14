"use client";

import React, { useState, useEffect } from "react";
import { Utensils, Plus, Loader2, Users, AlertCircle, ShoppingCart } from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  priceAtTime: number;
}

interface Order {
  id: string;
  status: string;
  items: OrderItem[];
}

interface Table {
  id: string;
  number: string;
  capacity: number;
  status: string;
  orders: Order[];
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("2");
  
  const [managingOrderFor, setManagingOrderFor] = useState<Table | null>(null);

  useEffect(() => {
    fetchTables();
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/restaurant/menu");
      const data = await res.json();
      if (data.success) {
        setMenu(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await fetch("/api/restaurant/tables");
      const data = await res.json();
      if (data.success) {
        setTables(data.tables);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTable = async () => {
    if (!newTableNumber) return;
    try {
      const res = await fetch("/api/restaurant/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: newTableNumber, capacity: newTableCapacity }),
      });
      if (res.ok) {
        setIsCreating(false);
        setNewTableNumber("");
        fetchTables();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openOrder = async (tableId: string) => {
    try {
      const res = await fetch("/api/restaurant/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createOrder", tableId }),
      });
      if (res.ok) {
        fetchTables();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItemToOrder = async (orderId: string, menuItemId: string) => {
    try {
      const res = await fetch("/api/restaurant/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addItem", orderId, menuItemId, quantity: 1 }),
      });
      if (res.ok) {
        fetchTables();
        // Optimistically update the managingOrderFor if it's open
        if (managingOrderFor) {
          const updatedTables = await (await fetch("/api/restaurant/tables")).json();
          const t = updatedTables.tables.find((t: Table) => t.id === managingOrderFor.id);
          setManagingOrderFor(t);
        }
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#00C2FF]" />
            Tables & Orders
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage restaurant floor plan and active orders</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00C2FF] hover:bg-[#00C2FF]/80 text-[#081120] font-bold rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Table
        </button>
      </div>

      {isCreating && (
        <div className="bg-[#0A1628] border border-white/10 p-4 rounded-xl flex gap-4 items-end">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Table Number</label>
            <input 
              type="text" 
              value={newTableNumber} 
              onChange={(e) => setNewTableNumber(e.target.value)}
              placeholder="e.g. T1"
              className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Capacity</label>
            <input 
              type="number" 
              value={newTableCapacity} 
              onChange={(e) => setNewTableCapacity(e.target.value)}
              className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
            />
          </div>
          <button onClick={createTable} className="px-4 py-2 bg-[#00E5A0] text-[#081120] font-bold rounded-lg text-xs">Save</button>
          <button onClick={() => setIsCreating(false)} className="px-4 py-2 bg-white/5 text-slate-300 font-bold rounded-lg text-xs hover:bg-white/10">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map(table => {
          const isOccupied = table.status === "OCCUPIED";
          const activeOrder = table.orders?.[0];
          
          return (
            <div 
              key={table.id}
              className={`relative border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                isOccupied 
                  ? "bg-red-500/10 border-red-500/30 hover:border-red-500/50" 
                  : "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
              }`}
              onClick={() => {
                if (!isOccupied) {
                  openOrder(table.id);
                } else {
                  setManagingOrderFor(table);
                }
              }}
            >
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                isOccupied ? "border-red-500/30 bg-red-500/10" : "border-emerald-500/30 bg-emerald-500/10"
              }`}>
                <span className="text-xl font-black text-white">{table.number}</span>
              </div>
              
              <div className="text-center">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                  isOccupied ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {table.status}
                </span>
                
                <div className="flex items-center justify-center gap-1 mt-2 text-slate-400 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>{table.capacity} Seats</span>
                </div>
              </div>

              {isOccupied && activeOrder && (
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    {activeOrder.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tables.length === 0 && !isCreating && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
            <AlertCircle className="w-8 h-8 text-slate-500 mb-3" />
            <h3 className="text-lg font-bold text-white">No Tables Configured</h3>
            <p className="text-slate-400 text-sm mt-1">Click "Add Table" to start building your floor plan.</p>
          </div>
        )}
      </div>

      {/* Order Management Side Panel */}
      {managingOrderFor && managingOrderFor.orders?.[0] && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#0A1628] border-l border-white/10 shadow-2xl z-50 flex flex-col">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#060D1A]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#00C2FF]" />
              Table {managingOrderFor.number} Order
            </h2>
            <button onClick={() => setManagingOrderFor(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Current Order Items */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Items</h3>
              {managingOrderFor.orders[0].items.length === 0 && (
                <p className="text-xs text-slate-500 italic">No items added yet.</p>
              )}
              {managingOrderFor.orders[0].items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-sm">
                  <span className="text-slate-300">{item.quantity}x <span className="text-slate-500 text-xs">(Item #{item.menuItemId.substring(0,4)})</span></span>
                  <span className="text-white font-medium">₹{(item.priceAtTime * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Menu */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Add to Order</h3>
              {menu.length === 0 && (
                <p className="text-xs text-slate-500 italic">No menu items available. Go to Menu to add some.</p>
              )}
              {menu.map(cat => (
                <div key={cat.id} className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#00C2FF] uppercase">{cat.name}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cat.items.map(item => (
                      <button 
                        key={item.id}
                        onClick={() => addItemToOrder(managingOrderFor.orders[0].id, item.id)}
                        className="p-2 bg-[#020610] border border-white/10 hover:border-[#00C2FF]/50 rounded-lg text-left transition-colors flex flex-col"
                      >
                        <span className="text-xs font-bold text-white truncate w-full">{item.name}</span>
                        <span className="text-[10px] text-emerald-400 mt-1">₹{item.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
