"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Webhook, 
  LogOut, 
  Check, 
  Loader2, 
  Lock, 
  Settings, 
  Sliders,
  Save,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  
  // Local state for interactive settings
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    desktopAlerts: true,
    whatsappLogs: false,
    newLeadAssign: true,
  });
  const [webhookUrl, setWebhookUrl] = useState("https://api.nexdial.io/v1/webhooks/incoming");
  const [leadRouting, setLeadRouting] = useState("round-robin");
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
    const savedAvatar = localStorage.getItem("nexdial_user_avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [session]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatar(base64String);
      localStorage.setItem("nexdial_user_avatar", base64String);
      window.dispatchEvent(new Event("nexdial-avatar-change"));
      setToastMessage("Profile picture updated!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setAvatar(null);
    localStorage.removeItem("nexdial_user_avatar");
    window.dispatchEvent(new Event("nexdial-avatar-change"));
    setToastMessage("Profile picture removed!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!mounted) return null;

  if (status === "loading") {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00C2FF] animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Loading settings...</p>
      </div>
    );
  }

  const user = session?.user as any;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Settings saved successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#00E5A0] text-[#081120] font-bold px-4 py-3 rounded-lg shadow-lg shadow-[#00E5A0]/20"
          >
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#00C2FF]" />
          CRM Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your user profile, preferences, notifications, and integration settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column - User profile summary */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 flex flex-col items-center text-center">
            
            <div className="relative group mb-4">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Profile Avatar" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#00C2FF]/30 shadow-lg shadow-[#0057D9]/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-2xl font-bold text-white border-2 border-[#00C2FF]/30 shadow-lg shadow-[#0057D9]/20">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              
              <label 
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity border border-white/10"
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <h2 className="text-lg font-bold text-white">{user?.name || "User"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email || "No email"}</p>
            
            {avatar && (
              <button
                type="button"
                onClick={handleAvatarRemove}
                className="text-[10px] text-red-400 hover:text-red-300 font-semibold underline mt-2 cursor-pointer bg-transparent border-none"
              >
                Remove Photo
              </button>
            )}

            <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
              <Shield className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span className="text-slate-300 font-medium tracking-wide uppercase">{user?.role || "MEMBER"}</span>
            </div>

            <div className="w-full border-t border-white/5 my-6" />

            <button
              onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold py-2.5 rounded-lg border border-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Account
            </button>
          </div>

          <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400" />
              System Status
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Database Connection</span>
                <span className="text-emerald-400 font-semibold">Healthy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NextAuth Engine</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prisma Client</span>
                <span className="text-slate-300">v7.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Workspace Tenant</span>
                <span className="text-[#00C2FF] font-semibold">NexDial Main</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Settings forms */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Account Details */}
            <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <User className="w-5 h-5 text-[#0057D9]" />
                Profile Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#050A15] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00C2FF] transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050A15] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00C2FF] transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Lock className="w-5 h-5 text-amber-500" />
                Security Credentials
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050A15] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00C2FF] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#050A15] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00C2FF] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Bell className="w-5 h-5 text-[#00E5A0]" />
                Communication Alerts
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Email Notifications</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Receive summary updates and urgent follow-up details via email.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("emailAlerts")}
                    className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer ${
                      notifications.emailAlerts ? "bg-[#00C2FF]" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#081120] transition-transform duration-200 ease-in-out ${
                        notifications.emailAlerts ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Desktop Push Alerts</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Show real-time visual alerts for new incoming leads in web browser.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("desktopAlerts")}
                    className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer ${
                      notifications.desktopAlerts ? "bg-[#00C2FF]" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#081120] transition-transform duration-200 ease-in-out ${
                        notifications.desktopAlerts ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">WhatsApp Log Sync</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Automatically broadcast leads state alerts to team WhatsApp group.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("whatsappLogs")}
                    className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer ${
                      notifications.whatsappLogs ? "bg-[#00C2FF]" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#081120] transition-transform duration-200 ease-in-out ${
                        notifications.whatsappLogs ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Automation & Integrations */}
            <div className="bg-[#0A1628] rounded-xl border border-white/5 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Webhook className="w-5 h-5 text-purple-400" />
                Webhook & Lead Routing
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Incoming Lead Webhook URL</label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-[#050A15] border border-white/5 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00C2FF] transition-colors font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-500">Send a POST request with lead info to this endpoint to auto-insert leads.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lead Assignment Policy</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLeadRouting("round-robin")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                        leadRouting === "round-robin"
                          ? "border-[#00C2FF] bg-[#00C2FF]/5 text-white"
                          : "border-white/5 bg-[#050A15] text-slate-400 hover:text-white"
                      }`}
                    >
                      <Sliders className="w-4 h-4" />
                      Round Robin
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeadRouting("manual")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                        leadRouting === "manual"
                          ? "border-[#00C2FF] bg-[#00C2FF]/5 text-white"
                          : "border-white/5 bg-[#050A15] text-slate-400 hover:text-white"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Manual Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#0057D9] hover:bg-[#0057D9]/80 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}
