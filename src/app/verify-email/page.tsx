"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-[#0F172A]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0057D9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 bg-[#0057D9]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0057D9]/30">
            <Mail className="w-6 h-6 text-[#00C2FF]" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Verify your email
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            We've sent a 6-digit verification code to <strong className="text-white">{emailParam}</strong>. Please enter it below.
            <br />
            <span className="text-[10px] text-yellow-500 font-mono mt-2 block bg-yellow-500/10 py-1 rounded">
              Check the backend console terminal for the OTP if testing locally!
            </span>
          </p>
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="px-4 py-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center flex flex-col items-center gap-3">
            <CheckCircle2 className="w-8 h-8" />
            <div>
              <p className="text-sm font-bold text-emerald-300">Email Verified!</p>
              <p className="text-xs mt-1">Redirecting to login...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6 text-xs">
            <div className="space-y-1.5 text-center">
              <input
                type="text"
                required
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
                className="w-3/4 mx-auto text-center tracking-[0.5em] text-2xl font-mono py-3 bg-[#081120] border border-white/10 text-white rounded-xl placeholder-slate-650 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 bg-[#0057D9] hover:bg-[#0057D9]/80 active:scale-98 text-xs font-bold text-white rounded-xl transition-all shadow-md shadow-[#0057D9]/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Confirm Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Wrong email?{" "}
            <Link href="/signup" className="text-[#00C2FF] hover:underline font-bold transition-all">
              Sign up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#081120] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0057D9]/10 to-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
      <Suspense fallback={
        <div className="w-10 h-10 border-2 border-[#00C2FF]/20 border-t-[#00C2FF] rounded-full animate-spin" />
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
