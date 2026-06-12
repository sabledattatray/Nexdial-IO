"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  CreditCard, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Smartphone,
  Check
} from "lucide-react";

// Load Razorpay SDK Script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function OnboardingContent() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Profile/Industry, 2: Payment, 3: Seeding Progress
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("real_estate");
  const [seedDemoData, setSeedDemoData] = useState(true);

  // Payment states
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showMockRazorpay, setShowMockRazorpay] = useState(false);
  const [mockPaymentMethod, setMockPaymentMethod] = useState<"upi" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [mockOrderData, setMockOrderData] = useState<any>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");

  // Seeding progress states
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("Initializing setup...");

  // Sync initial user name from session
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  // Handle Seeding Progress Bar Simulation
  useEffect(() => {
    if (step !== 3) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next <= 25) {
          setProgressStatus("Authenticating auto-pay mandate with bank...");
        } else if (next <= 50) {
          setProgressStatus("Provisioning isolated CRM database namespaces...");
        } else if (next <= 80) {
          const formattedIndustryName = industry.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
          setProgressStatus(`Ingesting and allocating ${formattedIndustryName} sample leads...`);
        } else if (next < 100) {
          setProgressStatus("Configuring voice AI representative scripts...");
        } else {
          clearInterval(interval);
          setProgressStatus("Setup completed! Opening dashboard...");
          // Trigger redirect
          setTimeout(async () => {
            // Force session JWT update so next-auth gets the new onboarded status
            await update();
            router.push("/crm");
          }, 800);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [step, industry, router, update]);

  // Initialize Payment Setup
  const handlePaymentInitiate = async () => {
    setError("");
    setLoadingPayment(true);

    try {
      const res = await fetch("/api/onboarding/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to create billing order.");
      }

      const orderData = await res.json();
      setMockOrderData(orderData);

      if (orderData.simulated) {
        // Show simulated Razorpay Modal
        setLoadingPayment(false);
        setShowMockRazorpay(true);
      } else {
        // Load real Razorpay SDK
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Razorpay SDK failed to load. Check network connection.");
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "NexDial CCOS",
          description: "15-day Trial Mandate Setup (₹1 Auth)",
          order_id: orderData.orderId,
          handler: async function (response: any) {
            // Razorpay checkout success handler
            await completeOnboarding();
          },
          prefill: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
          },
          theme: {
            color: "#528FF0",
          },
        };

        setLoadingPayment(false);
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred initiating checkout.");
      setLoadingPayment(false);
    }
  };

  // Submit Mock payment
  const handleMockPaymentSubmit = () => {
    if (mockPaymentMethod === "upi" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID (e.g. user@okhdfcbank)");
      return;
    }
    if (mockPaymentMethod === "card") {
      if (cardNumber.replace(/\s+/g, "").length < 16) {
        setError("Invalid card number. Must be 16 digits.");
        return;
      }
      if (cardExpiry.length < 5) {
        setError("Invalid expiry date (MM/YY).");
        return;
      }
      if (cardCvv.length < 3) {
        setError("Invalid CVV.");
        return;
      }
    }

    setError("");
    setLoadingPayment(true);

    if (mockPaymentMethod === "card" && !otpSent) {
      // Send mock OTP code
      setTimeout(() => {
        setOtpSent(true);
        setLoadingPayment(false);
      }, 1500);
    } else {
      // Complete simulated payment
      setTimeout(async () => {
        setShowMockRazorpay(false);
        await completeOnboarding();
      }, 2000);
    }
  };

  // Call onboarding completion API
  const completeOnboarding = async () => {
    setLoadingPayment(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, industry, seedDemoData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to finalize onboarding setup.");
      }

      setStep(3); // Go to Seeding Progress screen
    } catch (err: any) {
      setError(err.message || "Onboarding completion failed.");
      setStep(2); // Retain on payment page
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl bg-[#0F172A]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#0057D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Configure Your Workspace</h1>
        <p className="text-xs text-slate-400 mt-1">Get started with NexDial CCOS in just 3 quick steps.</p>
        
        {/* Step indicator bubbles */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                step >= s ? "bg-[#00E5A0] text-[#081120]" : "bg-white/5 text-slate-500 border border-white/10"
              }`}>
                {step > s ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-8 h-px ml-3 ${step > s ? "bg-[#00E5A0]" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 rotate-180 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Customize Profile & Industry */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Administrator Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#081120] border border-white/10 text-slate-100 text-xs rounded-xl focus:outline-none focus:border-[#00C2FF] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Select Your Industry
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-[#081120] border border-white/10 text-slate-100 text-xs rounded-xl focus:outline-none focus:border-[#00C2FF] transition-colors appearance-none cursor-pointer"
              >
                <option value="real_estate">Real Estate Agencies</option>
                <option value="marketing">Marketing Agencies</option>
                <option value="education">Education Consultants</option>
                <option value="healthcare">Healthcare Clinics</option>
                <option value="insurance">Insurance Brokers</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-3 pl-1 bg-[#00E5A0]/5 border border-[#00E5A0]/10 rounded-xl p-3">
            <input
              type="checkbox"
              id="seedData"
              checked={seedDemoData}
              onChange={(e) => setSeedDemoData(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-[#081120] text-[#00C2FF] focus:ring-[#00C2FF] focus:ring-opacity-25 transition-all cursor-pointer mt-0.5"
            />
            <div>
              <label htmlFor="seedData" className="text-[11px] font-bold text-white select-none cursor-pointer">
                Pre-populate with sample workspace leads
              </label>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                Check this option to inject 7 tailored leads, call outcomes, follow-ups, and AI recommendations into your dashboard so you can test all features immediately.
              </p>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!name.trim()}
            className="w-full py-3 mt-4 bg-[#00E5A0] hover:bg-[#00E5A0]/80 disabled:opacity-50 text-xs font-bold text-[#081120] rounded-xl transition-all shadow-md shadow-[#00E5A0]/25 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Proceed to Billing Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Payment & Mandate Setup */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Plan Info Card */}
          <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0057D9]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#00C2FF] font-bold px-2 py-0.5 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                  SaaS Trial Plan
                </span>
                <h3 className="text-base font-bold text-white mt-2">15-Day Free Trial Period</h3>
                <p className="text-[10.5px] text-slate-400 mt-1 leading-relaxed">
                  Start testing NexDial with full access. After the 15-day trial, auto-renewal begins at the standard package rate.
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 line-through">₹4,999</p>
                <p className="text-2xl font-black text-white">₹1</p>
                <p className="text-[9px] text-[#00E5A0] font-bold">Verification Auth</p>
              </div>
            </div>

            <div className="border-t border-white/5 mt-4 pt-4 flex justify-between text-[10px] text-slate-450">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00E5A0]" /> Secure Mandate</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" /> Cancel Anytime</span>
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-purple-400" /> Auto-Pay Enabled</span>
            </div>
          </div>

          <div className="text-center py-2 space-y-2">
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-md mx-auto">
              We process a fully-refundable **₹1 authorization charge** to establish the secure auto-pay e-mandate via Razorpay. No further charges will occur until your trial ends.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-white/15 hover:border-white/30 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handlePaymentInitiate}
              disabled={loadingPayment}
              className="flex-[2] py-3 bg-[#528FF0] hover:bg-[#528FF0]/90 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-[#528FF0]/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {loadingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Setup Mandate (₹1)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Seeding / Setting up Workspace Progress */}
      {step === 3 && (
        <div className="space-y-8 py-6 text-center">
          <div className="relative w-20 h-20 mx-auto">
            {/* Circular glowing aura */}
            <div className="absolute inset-0 bg-[#00E5A0]/20 rounded-full blur-lg animate-pulse" />
            <div className="absolute inset-0 border-2 border-[#00E5A0]/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-t-[#00E5A0] rounded-full animate-spin" />
            <div className="absolute inset-2 bg-[#081120] rounded-full flex items-center justify-center">
              <span className="text-base font-bold text-[#00E5A0]">{progress}%</span>
            </div>
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">Customizing Your Workspace</h3>
            <p className="text-xs text-slate-400 leading-normal animate-pulse min-h-[36px]">
              {progressStatus}
            </p>
          </div>

          {/* Linear progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00C2FF] to-[#00E5A0] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Simulated Razorpay Checkout Modal Overlay */}
      {showMockRazorpay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#1A263B] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden text-xs text-slate-350">
            {/* Razorpay signature header */}
            <div className="bg-[#2B3B54] p-4 text-white flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#528FF0] flex items-center justify-center text-white font-black text-sm select-none shadow">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-xs">Razorpay Secure Checkout</h3>
                  <p className="text-[9px] text-[#A5B8D0] mt-0.5">NexDial CCOS Onboarding</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-[#A5B8D0] uppercase tracking-wider">Amount</p>
                <p className="font-bold text-sm text-[#00E5A0]">₹1.00</p>
              </div>
            </div>

            {/* Simulated Payment Area */}
            <div className="p-5 space-y-4">
              <div className="bg-[#131D30] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Recurring Mandate Auth</span>
                <span className="px-2 py-0.5 bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] text-[8px] font-bold rounded-full uppercase">15-Day Trial</span>
              </div>

              {/* Payment Methods tabs */}
              <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-3">
                <button
                  onClick={() => setMockPaymentMethod("upi")}
                  className={`py-2 text-center rounded-lg font-bold border transition-colors ${
                    mockPaymentMethod === "upi"
                      ? "bg-[#528FF0]/10 border-[#528FF0] text-white"
                      : "bg-[#131D30] border-transparent hover:border-white/10 text-slate-450"
                  }`}
                >
                  UPI Autopay
                </button>
                <button
                  onClick={() => setMockPaymentMethod("card")}
                  className={`py-2 text-center rounded-lg font-bold border transition-colors ${
                    mockPaymentMethod === "card"
                      ? "bg-[#528FF0]/10 border-[#528FF0] text-white"
                      : "bg-[#131D30] border-transparent hover:border-white/10 text-slate-450"
                  }`}
                >
                  Card Mandate
                </button>
              </div>

              {mockPaymentMethod === "upi" ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-semibold">Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="e.g. name@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#131D30] border border-white/10 text-white rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#528FF0]"
                    />
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                    <p className="text-[9.5px] leading-relaxed text-slate-400">
                      We will initiate a ₹1 e-mandate authentication request in your UPI application. Approve it to start your trial.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {!otpSent ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-semibold">Card Number</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            // Simple auto space formatter
                            const val = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                            const matches = val.match(/\d{4,16}/g);
                            const match = (matches && matches[0]) || "";
                            const parts = [];
                            for (let i = 0, len = match.length; i < len; i += 4) {
                              parts.push(match.substring(i, i + 4));
                            }
                            setCardNumber(parts.length > 0 ? parts.join(" ") : val);
                          }}
                          className="w-full px-3 py-2 bg-[#131D30] border border-white/10 text-white rounded-lg placeholder-slate-650 focus:outline-none focus:border-[#528FF0]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            placeholder="12/28"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");
                              if (val.length >= 2 && !e.target.value.includes("/")) {
                                setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
                              } else {
                                setCardExpiry(e.target.value);
                              }
                            }}
                            className="w-full px-3 py-2 bg-[#131D30] border border-white/10 text-white rounded-lg placeholder-slate-650 focus:outline-none focus:border-[#528FF0] text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold">CVV</label>
                          <input
                            type="password"
                            placeholder="***"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                            className="w-full px-3 py-2 bg-[#131D30] border border-white/10 text-white rounded-lg placeholder-slate-650 focus:outline-none focus:border-[#528FF0] text-center"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3 text-center py-2">
                      <p className="text-[10px] text-[#00E5A0] font-bold">3D-Secure Authentication Required</p>
                      <p className="text-[10.5px] text-slate-400">
                        Enter the simulated 6-digit OTP code sent to your phone number for validation.
                      </p>
                      <input
                        type="text"
                        placeholder="123456"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-24 px-3 py-2 bg-[#131D30] border border-white/10 text-white text-center rounded-lg tracking-widest text-sm focus:outline-none focus:border-[#528FF0] mx-auto block"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Razorpay Footer controls */}
            <div className="p-4 bg-[#131D30] border-t border-white/5 flex gap-3">
              <button
                onClick={() => {
                  setShowMockRazorpay(false);
                  setOtpSent(false);
                  setOtpCode("");
                }}
                disabled={loadingPayment}
                className="flex-1 py-2.5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white rounded-lg font-semibold transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                onClick={handleMockPaymentSubmit}
                disabled={loadingPayment || (otpSent && otpCode.length < 6)}
                className="flex-[2] py-2.5 bg-[#528FF0] hover:bg-[#528FF0]/90 disabled:opacity-50 text-white rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#528FF0]/10"
              >
                {loadingPayment ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E5A0]" />
                    <span>{otpSent ? "Verify OTP" : "Authorise ₹1"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#081120] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0057D9]/10 to-[#00E5A0]/5 rounded-full blur-3xl pointer-events-none" />
      <Suspense fallback={
        <div className="w-10 h-10 border-2 border-[#00C2FF]/20 border-t-[#00C2FF] rounded-full animate-spin" />
      }>
        <OnboardingContent />
      </Suspense>
    </div>
  );
}
