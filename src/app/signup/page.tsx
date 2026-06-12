"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Eye, EyeOff, Shield, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { GoogleIcon } from "@/components/nexdial/components/GoogleSignIn";

function SignupContent() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Auto login user after 2 seconds
      setTimeout(async () => {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/crm",
        });
      }, 2000);
    } catch (err) {
      setError("An unexpected registration error occurred.");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/crm" });
    } catch (err) {
      setError("Google sign-up could not be initialized.");
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative w-full max-w-md bg-[#0F172A]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" />
        <CheckCircle2 className="w-16 h-16 text-[#00E5A0] mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Account Provisioned!</h2>
        <p className="text-xs text-slate-450 mt-2 leading-relaxed">
          Welcome to NexDial. Your workspace and administrator credentials have been securely configured. Autologging in now...
        </p>
        <Loader2 className="w-6 h-6 animate-spin text-[#00C2FF] mx-auto mt-6" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md bg-[#0F172A]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0057D9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to homepage</span>
      </Link>

      <div className="space-y-6">
        {/* Brand identity */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="px-2 py-0.5 rounded bg-indigo-950/20 text-[#818CF8] border border-indigo-500/10 text-[9px] font-mono font-bold flex items-center gap-1 uppercase">
              <Shield className="w-3 h-3" />
              Start Free Trial
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Begin your 14-day free trial. Setup your organization, track leads, and automate client conversations.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google SSO Sign-up */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading || googleLoading}
            className="w-full py-3 bg-[#081120] hover:bg-[#0A1628] active:scale-98 border border-white/10 hover:border-[#00C2FF]/30 text-xs font-bold text-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-3.5 group hover:shadow-lg hover:shadow-[#0057D9]/10"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#00C2FF]" />
            ) : (
              <GoogleIcon />
            )}
            <span>Sign Up with Google</span>
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-x-0 h-px bg-white/5" />
            <span className="relative px-3.5 bg-[#0F172A] text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              OR REGISTER EMAIL
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Datta Sable"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading || googleLoading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#081120] border border-white/10 text-slate-100 rounded-xl placeholder-slate-650 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="datta@nexdial.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || googleLoading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#081120] border border-white/10 text-slate-100 rounded-xl placeholder-slate-650 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Password (6+ characters)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || googleLoading}
                className="w-full pl-10 pr-12 py-2.5 bg-[#081120] border border-white/10 text-slate-100 rounded-xl placeholder-slate-650 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading || googleLoading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 mt-2 bg-[#00E5A0] hover:bg-[#00E5A0]/80 active:scale-98 text-xs font-bold text-[#081120] rounded-xl transition-all shadow-md shadow-[#00E5A0]/20 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#081120]" />
                <span>Creating your account...</span>
              </>
            ) : (
              <span>Register & Start Trial</span>
            )}
          </button>
        </form>

        {/* Login redirect */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00C2FF] hover:underline font-bold transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#081120] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0057D9]/10 to-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
      <Suspense fallback={
        <div className="w-10 h-10 border-2 border-[#00C2FF]/20 border-t-[#00C2FF] rounded-full animate-spin" />
      }>
        <SignupContent />
      </Suspense>
    </div>
  );
}
