"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, Shield, Key, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { GoogleIcon } from "@/components/nexdial/components/GoogleSignIn";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(errorParam ? "Authentication failed. Please verify credentials." : "");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "unverified") {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } else {
          setError("Invalid email or password. Please try again.");
          setLoading(false);
        }
      } else if (res?.ok) {
        // Success
        router.push("/crm");
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/crm" });
    } catch (err) {
      setError("Google authentication could not be initialized.");
      setGoogleLoading(false);
    }
  };

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
              Nexdial Secure Gateway
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Portal Authorization
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sign in to access your unified CRM directories, client workspaces, and campaign dialer interfaces.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google SSO Login */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full py-3 bg-[#081120] hover:bg-[#0A1628] active:scale-98 border border-white/10 hover:border-[#00C2FF]/30 text-xs font-bold text-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-3.5 group hover:shadow-lg hover:shadow-[#0057D9]/10"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#00C2FF]" />
            ) : (
              <GoogleIcon />
            )}
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-x-0 h-px bg-white/5" />
            <span className="relative px-3.5 bg-[#0F172A] text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              OR USE CREDENTIALS
            </span>
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 pl-1 font-semibold">
              Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="agent@nexdial.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || googleLoading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#081120] border border-white/10 text-slate-100 rounded-xl placeholder-slate-650 focus:outline-none focus:border-[#00C2FF] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Access Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
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
            className="w-full py-3 mt-2 bg-[#0057D9] hover:bg-[#0057D9]/80 active:scale-98 text-xs font-bold text-white rounded-xl transition-all shadow-md shadow-[#0057D9]/20 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <Key className="w-4 h-4 text-slate-200" />
                <span>Sign In to CRM Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Signup redirect */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#00C2FF] hover:underline font-bold transition-all">
              Start Free Trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#081120] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0057D9]/10 to-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
      <Suspense fallback={
        <div className="w-10 h-10 border-2 border-[#00C2FF]/20 border-t-[#00C2FF] rounded-full animate-spin" />
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
