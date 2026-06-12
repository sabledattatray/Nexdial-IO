"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Code,
  AlertTriangle
} from "lucide-react";

// Load Razorpay SDK Script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function TestPaymentPage() {
  const [amountInput, setAmountInput] = useState("10"); // Amount in INR
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "creating_order" | "modal_open" | "verifying" | "success" | "failed" | "dismissed">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Data tracking for developer visibility
  const [orderResponse, setOrderResponse] = useState<any>(null);
  const [razorpayResponse, setRazorpayResponse] = useState<any>(null);
  const [verifyResponse, setVerifyResponse] = useState<any>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setOrderResponse(null);
    setRazorpayResponse(null);
    setVerifyResponse(null);
    
    const amountInRs = parseFloat(amountInput);
    if (isNaN(amountInRs) || amountInRs < 1) {
      setErrorMsg("Amount must be at least ₹1 (100 paise)");
      setStatus("failed");
      return;
    }

    const amountInPaise = Math.round(amountInRs * 100);

    try {
      // Step 1: Create order on the backend
      setStatus("creating_order");
      setLoading(true);

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `receipt_test_${Date.now()}`
        })
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to create order (Status ${orderRes.status})`);
      }

      const orderData = await orderRes.json();
      setOrderResponse(orderData);

      // Step 2: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK. Please check your network connection.");
      }

      // Step 3: Open Razorpay modal
      setStatus("modal_open");
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error("NEXT_PUBLIC_RAZORPAY_KEY_ID env variable is not set.");
      }

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NexDial Integration Sandbox",
        description: `Standard Checkout Test - ₹${amountInput}`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          // Response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
          setRazorpayResponse(response);
          
          // Step 4: Verify signature on backend
          setStatus("verifying");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            setVerifyResponse(verifyData);

            if (verifyRes.ok && verifyData.success) {
              setStatus("success");
            } else {
              setErrorMsg(verifyData.error || "Payment signature verification failed.");
              setStatus("failed");
            }
          } catch (verErr: any) {
            console.error("Verification error:", verErr);
            setErrorMsg(verErr.message || "Failed to contact verification endpoint.");
            setStatus("failed");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("dismissed");
            setLoading(false);
          }
        },
        prefill: {
          name: "NexDial Tester",
          email: "tester@nexdial.io",
          contact: "9999999999"
        },
        notes: {
          purpose: "SaaS Razorpay Integration Testing"
        },
        theme: {
          color: "#0057D9"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      
      // Handle payment.failed event
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed event:", response.error);
        setErrorMsg(response.error.description || "Payment failed via Razorpay Gateway.");
        setStatus("failed");
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error("Payment initiation sequence error:", err);
      setErrorMsg(err.message || "An unexpected error occurred during payment.");
      setStatus("failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081120] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 relative">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0057D9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#00E5A0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20 mb-10">
        
        {/* Left column: Checkout controls */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="glass-card-strong p-8 relative overflow-hidden shadow-2xl border border-white/10">
            {/* Corner Accent Blob */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#00C2FF]/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#0057D9]/10 border border-[#0057D9]/20 text-[#00C2FF] rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Razorpay Sandbox</h1>
                <p className="text-[11px] text-slate-450">Standard Web Checkout Verification</p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold pl-1">
                  Payment Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-450">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    disabled={loading}
                    className="w-full pl-8 pr-4 py-3 bg-[#060D1A] border border-white/10 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#00C2FF] transition-all"
                    placeholder="Enter amount (e.g. 10)"
                    required
                  />
                </div>
                <p className="text-[9.5px] text-slate-500 pl-1">
                  Will be converted automatically to {isNaN(parseFloat(amountInput)) ? "0" : Math.round(parseFloat(amountInput) * 100)} paise.
                </p>
              </div>

              {/* Status Alert Panels */}
              {status === "creating_order" && (
                <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-xl flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Creating order details on backend (/api/create-order)...</span>
                </div>
              )}

              {status === "modal_open" && (
                <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-xl flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Loading checkout.js & opening gateway modal...</span>
                </div>
              )}

              {status === "verifying" && (
                <div className="p-3.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-xl flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Securing token & verifying signature on server...</span>
                </div>
              )}

              {status === "success" && (
                <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Payment Verified Successfully</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">The signature matched our generated HMAC key.</p>
                  </div>
                </div>
              )}

              {status === "failed" && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Payment Error</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{errorMsg || "An error occurred."}</p>
                  </div>
                </div>
              )}

              {status === "dismissed" && (
                <div className="p-3.5 bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs rounded-xl flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>User cancelled the Razorpay payment window.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#0057D9]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Trigger Checkout (Standard SDK)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-[10.5px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#00E5A0]" />
                <span>HMAC-SHA256 Server Verification</span>
              </div>
              <div className="flex items-center gap-2 text-[10.5px] text-slate-400">
                <Database className="w-4 h-4 text-[#00C2FF]" />
                <span>Test Mode Key ID Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Debug JSON Explorer */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Diagnostic status block */}
          <div className="glass-card p-6 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-4.5 h-4.5 text-[#00C2FF]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Integration Logs</h2>
              </div>
              <span className={`px-2 py-0.5 text-[8.5px] font-extrabold uppercase rounded-full ${
                status === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                status === "failed" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                status === "idle" ? "bg-slate-500/10 text-slate-400 border border-slate-500/20" :
                "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
              }`}>
                {status.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Order creation payload */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10.5px] text-slate-450 font-semibold pl-1">
                  <span>1. Created Order Response (from /api/create-order)</span>
                  {orderResponse && <span className="text-green-400 text-[9px]">✔ Captured</span>}
                </div>
                <div className="bg-[#040914] border border-white/5 rounded-xl p-3.5 overflow-x-auto max-h-[140px] font-mono text-[10.5px]">
                  {orderResponse ? (
                    <pre className="text-slate-300">{JSON.stringify(orderResponse, null, 2)}</pre>
                  ) : (
                    <span className="text-slate-650 italic">Awaiting API call...</span>
                  )}
                </div>
              </div>

              {/* Checkout callback payload */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10.5px] text-slate-450 font-semibold pl-1">
                  <span>2. Gateway Success Callback (checkout.js response)</span>
                  {razorpayResponse && <span className="text-green-400 text-[9px]">✔ Captured</span>}
                </div>
                <div className="bg-[#040914] border border-white/5 rounded-xl p-3.5 overflow-x-auto max-h-[140px] font-mono text-[10.5px]">
                  {razorpayResponse ? (
                    <pre className="text-[#00C2FF]">{JSON.stringify(razorpayResponse, null, 2)}</pre>
                  ) : (
                    <span className="text-slate-650 italic">Awaiting modal completion...</span>
                  )}
                </div>
              </div>

              {/* Signature Verification payload */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10.5px] text-slate-450 font-semibold pl-1">
                  <span>3. Server Signature Verification (from /api/verify-payment)</span>
                  {verifyResponse && (
                    <span className={verifyResponse.success ? "text-green-400 text-[9px]" : "text-red-400 text-[9px]"}>
                      {verifyResponse.success ? "✔ Verified" : "✘ Failed"}
                    </span>
                  )}
                </div>
                <div className="bg-[#040914] border border-white/5 rounded-xl p-3.5 overflow-x-auto max-h-[140px] font-mono text-[10.5px]">
                  {verifyResponse ? (
                    <pre className={verifyResponse.success ? "text-[#00E5A0]" : "text-red-400"}>
                      {JSON.stringify(verifyResponse, null, 2)}
                    </pre>
                  ) : (
                    <span className="text-slate-650 italic">Awaiting verification call...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
