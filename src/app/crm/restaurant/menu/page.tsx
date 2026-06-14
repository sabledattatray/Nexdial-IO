"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, Plus, Loader2, Trash2, Edit2, AlertCircle } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newCatName, setNewCatName] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);

  const [addingItemTo, setAddingItemTo] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/restaurant/menu");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCatName) return;
    try {
      const res = await fetch("/api/restaurant/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createCategory", name: newCatName }),
      });
      if (res.ok) {
        setNewCatName("");
        setIsAddingCat(false);
        fetchMenu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (categoryId: string) => {
    if (!newItemName || !newItemPrice) return;
    try {
      const res = await fetch("/api/restaurant/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "createItem", 
          categoryId, 
          name: newItemName, 
          price: newItemPrice, 
          description: newItemDesc 
        }),
      });
      if (res.ok) {
        setAddingItemTo(null);
        setNewItemName("");
        setNewItemPrice("");
        setNewItemDesc("");
        fetchMenu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category and all its items?")) return;
    try {
      await fetch(`/api/restaurant/menu?action=deleteCategory&id=${id}`, { method: "DELETE" });
      fetchMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    try {
      await fetch(`/api/restaurant/menu?action=deleteItem&id=${id}`, { method: "DELETE" });
      fetchMenu();
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
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ListOrdered className="w-6 h-6 text-[#00E5A0]" />
            Restaurant Menu
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage categories and menu items</p>
        </div>
        <button 
          onClick={() => setIsAddingCat(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-[#081120] font-bold rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {isAddingCat && (
        <div className="bg-[#0A1628] border border-white/10 p-4 rounded-xl flex gap-4 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Category Name</label>
            <input 
              type="text" 
              value={newCatName} 
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Starters, Main Course, Beverages"
              className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
            />
          </div>
          <button onClick={addCategory} className="px-4 py-2 bg-[#00C2FF] text-[#081120] font-bold rounded-lg text-xs">Save</button>
          <button onClick={() => setIsAddingCat(false)} className="px-4 py-2 bg-white/5 text-slate-300 font-bold rounded-lg text-xs hover:bg-white/10">Cancel</button>
        </div>
      )}

      {categories.length === 0 && !isAddingCat && (
        <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <AlertCircle className="w-8 h-8 text-slate-500 mb-3" />
          <h3 className="text-lg font-bold text-white">Menu is Empty</h3>
          <p className="text-slate-400 text-sm mt-1">Add your first category to start building your menu.</p>
        </div>
      )}

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">{cat.name}</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAddingItemTo(cat.id)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all"
                >
                  + Add Item
                </button>
                <button 
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {addingItemTo === cat.id && (
              <div className="p-4 bg-[#0A1628] border-b border-white/10 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Item Name</label>
                  <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white" />
                </div>
                <div className="w-32 space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Price (₹)</label>
                  <input type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white" />
                </div>
                <div className="flex-1 min-w-[200px] space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                  <input type="text" value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white" />
                </div>
                <button onClick={() => addItem(cat.id)} className="px-4 py-2 bg-[#00E5A0] text-[#081120] font-bold rounded-lg text-xs">Save</button>
                <button onClick={() => setAddingItemTo(null)} className="px-4 py-2 bg-white/5 text-slate-300 font-bold rounded-lg text-xs hover:bg-white/10">Cancel</button>
              </div>
            )}

            <div className="divide-y divide-white/5">
              {cat.items.length === 0 && addingItemTo !== cat.id && (
                <div className="p-6 text-center text-slate-500 text-sm font-medium">No items in this category yet.</div>
              )}
              {cat.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    {item.description && <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>}
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-[#00E5A0]">₹{item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-slate-600 hover:text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
