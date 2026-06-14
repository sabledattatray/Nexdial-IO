"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Loader2, CreditCard, Clock, IndianRupee } from "lucide-react";
import { format } from "date-fns";

interface MenuItem {
  name: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  priceAtTime: number;
  menuItem: MenuItem;
}

interface Table {
  number: string;
}

interface Order {
  id: string;
  status: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  table?: Table;
  items: OrderItem[];
}

export default function BillingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [checkoutOrder, setCheckoutOrder] = useState<Order | null>(null);
  const [taxPercent, setTaxPercent] = useState("5");
  const [tipAmount, setTipAmount] = useState("0");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/restaurant/billing");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    if (!checkoutOrder) return;
    
    const taxValue = (checkoutOrder.subtotal * parseFloat(taxPercent)) / 100;
    
    try {
      const res = await fetch("/api/restaurant/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "closeOrder", 
          orderId: checkoutOrder.id,
          tax: taxValue,
          tip: parseFloat(tipAmount || "0")
        }),
      });
      if (res.ok) {
        setCheckoutOrder(null);
        setTaxPercent("5");
        setTipAmount("0");
        fetchOrders();
        alert("Payment processed successfully! Table is now available.");
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

  const openOrders = orders.filter(o => o.status === "OPEN" || o.status === "SERVED");
  const paidOrders = orders.filter(o => o.status === "PAID");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Receipt className="w-6 h-6 text-purple-400" />
          Billing & Payments
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage checkouts, invoices, and completed orders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Orders List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Active Bills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openOrders.length === 0 && (
              <div className="col-span-full p-8 text-center border border-dashed border-white/10 rounded-xl text-slate-500">
                No active orders ready for billing.
              </div>
            )}
            {openOrders.map(order => (
              <div key={order.id} className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => setCheckoutOrder(order)}>
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                      {order.table?.number || "?"}
                    </div>
                    <span className="text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 inline mr-1" />
                      {format(new Date(order.createdAt), "hh:mm a")}
                    </span>
                  </div>
                  <span className="text-sm font-black text-white">₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-[#060D1A]">
                  <p className="text-xs text-slate-400 mb-2">{order.items.length} items ordered:</p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {order.items.slice(0, 3).map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                      </li>
                    ))}
                    {order.items.length > 3 && (
                      <li className="text-slate-500 italic">...and {order.items.length - 3} more</li>
                    )}
                  </ul>
                  <button 
                    className="w-full mt-4 py-2 bg-white/5 hover:bg-purple-500/20 text-purple-400 font-bold text-xs rounded-lg transition-all"
                  >
                    Checkout Table
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 mt-8">Recent Completed Payments</h2>
          <div className="bg-[#020610] border border-white/10 rounded-xl overflow-hidden shadow-lg divide-y divide-white/5">
            {paidOrders.slice(0, 10).map(order => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-full">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Table {order.table?.number || "Walk-in"}</h4>
                    <p className="text-xs text-slate-500">{format(new Date(order.updatedAt), "MMM dd, yyyy - hh:mm a")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">₹{order.total.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Paid</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Panel */}
        <div className="lg:col-span-1">
          {checkoutOrder ? (
            <div className="bg-[#0A1628] border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden sticky top-6">
              <div className="p-5 border-b border-white/10 bg-purple-500/5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  Checkout Table {checkoutOrder.table?.number}
                </h2>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {checkoutOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-300"><span className="text-slate-500 mr-2">{item.quantity}x</span>{item.menuItem.name}</span>
                      <span className="text-white font-medium">₹{(item.priceAtTime * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white">₹{checkoutOrder.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      Tax (%)
                      <input 
                        type="number" 
                        value={taxPercent} 
                        onChange={(e) => setTaxPercent(e.target.value)}
                        className="w-16 px-2 py-1 bg-[#060D1A] border border-white/10 rounded text-xs text-white"
                      />
                    </span>
                    <span className="text-white">₹{((checkoutOrder.subtotal * parseFloat(taxPercent || "0")) / 100).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      Tip (₹)
                      <input 
                        type="number" 
                        value={tipAmount} 
                        onChange={(e) => setTipAmount(e.target.value)}
                        className="w-20 px-2 py-1 bg-[#060D1A] border border-white/10 rounded text-xs text-white"
                      />
                    </span>
                    <span className="text-white">₹{parseFloat(tipAmount || "0").toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-black text-[#00E5A0]">
                    ₹{(checkoutOrder.subtotal + ((checkoutOrder.subtotal * parseFloat(taxPercent || "0")) / 100) + parseFloat(tipAmount || "0")).toFixed(2)}
                  </span>
                </div>

                <button 
                  onClick={processPayment}
                  className="w-full py-3 mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all text-sm"
                >
                  Process Payment
                </button>
                <button 
                  onClick={() => setCheckoutOrder(null)}
                  className="w-full py-2 bg-transparent text-slate-400 hover:text-white font-medium rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#020610] border border-dashed border-white/10 rounded-xl h-64 flex flex-col items-center justify-center text-slate-500">
              <Receipt className="w-10 h-10 mb-3 opacity-50" />
              <p className="text-sm font-medium">Select an order to checkout</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
