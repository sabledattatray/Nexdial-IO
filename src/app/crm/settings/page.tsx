"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import IndustrySelector from "@/components/crm/IndustrySelector";
import BusinessTypeSelector from "@/components/crm/BusinessTypeSelector";
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
  Info,
  Building2,
  Smartphone,
  Palette,
  Trash2,
  Plus,
  Globe,
  Bot,
  Trash,
  Target,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "company" | "goals_sources" | "pipeline" | "channels" | "team" | "ai_alerts" | "subscription">("profile");

  // Status Alerts
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Tab 1: Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [ownerMobile, setOwnerMobile] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Tab 2: Company & Branding State
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("Agency");
  const [industry, setIndustry] = useState("real_estate");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState("2–10 Employees");
  const [location, setLocation] = useState("India");
  const [timeZone, setTimeZone] = useState("GMT+5:30 (IST)");
  const [businessPhone, setBusinessPhone] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandTagline, setBrandTagline] = useState("");
  const [brandColor, setBrandColor] = useState("#0057D9");
  const [logoUploaded, setLogoUploaded] = useState(false);

  // Tab: Goals & Sources State
  const [goals, setGoals] = useState<string[]>(["Lead Management", "Sales Pipeline"]);
  const [leadSources, setLeadSources] = useState<string[]>(["Website", "WhatsApp"]);
  const [monthlyLeads, setMonthlyLeads] = useState("0–100");
  const [currentCrm, setCurrentCrm] = useState("None");
  const [hearAboutUs, setHearAboutUs] = useState("Google");

  // Tab: Pipeline State
  const [pipelineName, setPipelineName] = useState("Sales Pipeline");
  const [pipelineStages, setPipelineStages] = useState<string[]>([
    "New Lead", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"
  ]);
  const [newStageName, setNewStageName] = useState("");

  // Tab 3: Channels State
  const [channels, setChannels] = useState({
    whatsappNumber: "",
    whatsappHasAccount: "No",
    supportEmail: "",
    salesEmail: "",
    callingNumber: "",
    callingSystem: "None",
    websiteUrl: "",
    websiteHasForm: "No",
  });

  // Tab 4: Team State
  const [dbTeamMembers, setDbTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Sales Executive");

  // Tab 5: AI & Notifications State
  const [aiFeatures, setAiFeatures] = useState<string[]>([]);
  const [alertChannels, setAlertChannels] = useState<string[]>([]);
  const [dailySummary, setDailySummary] = useState("Yes");
  const [weeklyReport, setWeeklyReport] = useState("Yes");
  const [webhookUrl, setWebhookUrl] = useState("https://api.nexdial.io/v1/webhooks/incoming");
  const [leadRouting, setLeadRouting] = useState("round-robin");

  // Load settings on mount
  useEffect(() => {
    setMounted(true);
    
    // Load profile from session
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
    
    const savedAvatar = localStorage.getItem("nexdial_user_avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    
    setOwnerMobile(localStorage.getItem("nexdial_owner_mobile") || "");
    setJobTitle(localStorage.getItem("nexdial_job_title") || "");

    // Load Company & Branding settings
    setCompanyName(localStorage.getItem("nexdial_company_name") || "NexDial Corp");
    setBusinessType(localStorage.getItem("nexdial_business_type") || "Agency");
    setIndustry(localStorage.getItem("nexdial_industry") || "real_estate");
    setCompanyWebsite(localStorage.getItem("nexdial_company_website") || "");
    setCompanySize(localStorage.getItem("nexdial_company_size") || "2–10 Employees");
    setLocation(localStorage.getItem("nexdial_location") || "India");
    setTimeZone(localStorage.getItem("nexdial_timezone") || "GMT+5:30 (IST)");
    setBusinessPhone(localStorage.getItem("nexdial_business_phone") || "");
    setBrandName(localStorage.getItem("nexdial_brand_name") || "");
    setBrandTagline(localStorage.getItem("nexdial_brand_tagline") || "");
    setBrandColor(localStorage.getItem("nexdial_brand_color") || "#0057D9");
    setLogoUploaded(localStorage.getItem("nexdial_logo_uploaded") === "true");

    // Load Goals & Sources
    try {
      const savedGoals = localStorage.getItem("nexdial_goals");
      if (savedGoals) setGoals(JSON.parse(savedGoals));
      
      const savedSources = localStorage.getItem("nexdial_lead_sources");
      if (savedSources) setLeadSources(JSON.parse(savedSources));
    } catch (e) {
      console.error("Failed to parse goals/sources from localStorage", e);
    }
    setMonthlyLeads(localStorage.getItem("nexdial_monthly_leads") || "0–100");
    setCurrentCrm(localStorage.getItem("nexdial_current_crm") || "None");
    setHearAboutUs(localStorage.getItem("nexdial_hear_about_us") || "Google");

    // Load Pipeline settings
    setPipelineName(localStorage.getItem("nexdial_pipeline_name") || "Sales Pipeline");
    try {
      const savedStages = localStorage.getItem("nexdial_pipeline_stages");
      if (savedStages) setPipelineStages(JSON.parse(savedStages));
    } catch (e) {
      console.error("Failed to parse pipeline stages from localStorage", e);
    }

    // Load Channels Settings
    try {
      const savedChannels = localStorage.getItem("nexdial_channels");
      if (savedChannels) {
        setChannels(JSON.parse(savedChannels));
      }
    } catch (e) {
      console.error("Failed to parse channels settings from localStorage", e);
    }

    // Load AI & Alerts Settings
    try {
      const savedAi = localStorage.getItem("nexdial_ai_features");
      if (savedAi) setAiFeatures(JSON.parse(savedAi));
      const savedAlerts = localStorage.getItem("nexdial_alert_channels");
      if (savedAlerts) setAlertChannels(JSON.parse(savedAlerts));
    } catch (e) {
      console.error("Failed to parse AI/Alerts settings from localStorage", e);
    }
    
    setDailySummary(localStorage.getItem("nexdial_daily_summary") || "Yes");
    setWeeklyReport(localStorage.getItem("nexdial_weekly_report") || "Yes");
    setWebhookUrl(localStorage.getItem("nexdial_webhook_url") || "https://api.nexdial.io/v1/webhooks/incoming");
    setLeadRouting(localStorage.getItem("nexdial_lead_routing") || "round-robin");
    
    // Fetch live team database members
    fetchTeamMembers();

    // Sync with database to fetch persistent onboarding data
    const fetchPersistentSettings = async () => {
      try {
        const res = await fetch("/api/crm/sync-settings");
        if (res.ok) {
          const data = await res.json();
          if (data.onboardingData) {
            const ob = data.onboardingData;
            
            // Helper to set both React state and localStorage
            const setAndSave = (key: string, val: any, setter?: Function) => {
              if (val === undefined || val === null) return;
              if (setter) setter(val);
              if (typeof val === 'object') {
                localStorage.setItem(`nexdial_${key}`, JSON.stringify(val));
              } else {
                localStorage.setItem(`nexdial_${key}`, String(val));
              }
            };

            setAndSave('company_name', ob.companyName, setCompanyName);
            setAndSave('business_type', ob.businessType, setBusinessType);
            setAndSave('industry', ob.industry, setIndustry);
            setAndSave('company_website', ob.companyWebsite, setCompanyWebsite);
            setAndSave('company_size', ob.companySize, setCompanySize);
            setAndSave('location', ob.location, setLocation);
            setAndSave('timezone', ob.timeZone, setTimeZone);
            setAndSave('business_phone', ob.businessPhone, setBusinessPhone);
            setAndSave('brand_name', ob.brandName, setBrandName);
            setAndSave('brand_tagline', ob.brandTagline, setBrandTagline);
            setAndSave('brand_color', ob.brandColor, setBrandColor);

            setAndSave('goals', ob.goals, setGoals);
            setAndSave('lead_sources', ob.leadSources, setLeadSources);
            setAndSave('monthly_leads', ob.monthlyLeads, setMonthlyLeads);
            setAndSave('current_crm', ob.currentCrm, setCurrentCrm);
            setAndSave('hear_about_us', ob.hearAboutUs, setHearAboutUs);

            setAndSave('pipeline_name', ob.pipelineName, setPipelineName);
            setAndSave('pipeline_stages', ob.pipelineStages, setPipelineStages);

            setAndSave('channels', ob.channels, setChannels);

            setAndSave('ai_features', ob.aiFeatures, setAiFeatures);
            setAndSave('alert_channels', ob.alertChannels, setAlertChannels);
            setAndSave('daily_summary', ob.dailySummary, setDailySummary);
            setAndSave('weekly_report', ob.weeklyReport, setWeeklyReport);
            setAndSave('webhook_url', ob.webhookUrl, setWebhookUrl);
            setAndSave('lead_routing', ob.leadRouting, setLeadRouting);
          }
        }
      } catch (err) {
        console.error("Failed to fetch persistent settings", err);
      }
    };
    fetchPersistentSettings();

  }, [session]);

  const fetchTeamMembers = async () => {
    setLoadingTeam(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const body = await res.json();
        setDbTeamMembers(body.data || []);
        
        // Find current user and set their phone and job title
        if (session?.user && body.data) {
          const userSession = session.user as any;
          const me = body.data.find((u: any) => u.id === userSession.id);
          if (me) {
            if (me.phone) {
              setOwnerMobile(me.phone);
              localStorage.setItem("nexdial_owner_mobile", me.phone);
            }
            if (me.jobTitle) {
              setJobTitle(me.jobTitle);
              localStorage.setItem("nexdial_job_title", me.jobTitle);
            }
          }
        }
      }
    } catch (err) {
      console.error("Error fetching team users:", err);
    } finally {
      setLoadingTeam(false);
    }
  };

  const triggerToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Profile avatar helpers
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
      triggerToast("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setAvatar(null);
    localStorage.removeItem("nexdial_user_avatar");
    window.dispatchEvent(new Event("nexdial-avatar-change"));
    triggerToast("Profile picture removed!");
  };

  // Tab Save Handlers
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    
    const userSession = session.user as any;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/users/${userSession.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          currentPassword,
          newPassword,
          phone: ownerMobile,
          jobTitle
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile details.");
      }

      // Save additional profile details to localStorage
      localStorage.setItem("nexdial_owner_mobile", ownerMobile);
      localStorage.setItem("nexdial_job_title", jobTitle);

      setCurrentPassword("");
      setNewPassword("");
      triggerToast("Profile updated successfully!");
    } catch (err: any) {
      triggerToast(err.message || "Failed to save profile.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompanySave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem("nexdial_company_name", companyName);
    localStorage.setItem("nexdial_business_type", businessType);
    localStorage.setItem("nexdial_industry", industry);
    localStorage.setItem("nexdial_company_website", companyWebsite);
    localStorage.setItem("nexdial_company_size", companySize);
    localStorage.setItem("nexdial_location", location);
    localStorage.setItem("nexdial_timezone", timeZone);
    localStorage.setItem("nexdial_business_phone", businessPhone);
    localStorage.setItem("nexdial_brand_name", brandName);
    localStorage.setItem("nexdial_brand_tagline", brandTagline);
    localStorage.setItem("nexdial_brand_color", brandColor);
    localStorage.setItem("nexdial_logo_uploaded", logoUploaded ? "true" : "false");

    try {
      await fetch("/api/crm/sync-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          companyName, 
          businessType, 
          industry, 
          companyWebsite, 
          companySize, 
          location, 
          timeZone, 
          businessPhone, 
          brandName, 
          brandTagline, 
          brandColor 
        })
      });
      // Force NextAuth to fetch the updated industry from the database
      // so the UI updates immediately without needing a full logout.
      await update();
    } catch (e) {
      console.error("Failed to sync company name to db", e);
    }

    setIsSaving(false);
    triggerToast("Company and branding configs saved!");
  };

  const handleGoalsSourcesSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem("nexdial_goals", JSON.stringify(goals));
    localStorage.setItem("nexdial_lead_sources", JSON.stringify(leadSources));
    localStorage.setItem("nexdial_monthly_leads", monthlyLeads);
    localStorage.setItem("nexdial_current_crm", currentCrm);
    localStorage.setItem("nexdial_hear_about_us", hearAboutUs);

    try {
      await fetch("/api/crm/sync-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          goals, 
          leadSources, 
          monthlyLeads, 
          currentCrm, 
          hearAboutUs 
        })
      });
    } catch (e) {
      console.error("Failed to sync goals to db", e);
    }

    setIsSaving(false);
    triggerToast("Goals and lead sources saved!");
  };

  const handlePipelineSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem("nexdial_pipeline_name", pipelineName);
    localStorage.setItem("nexdial_pipeline_stages", JSON.stringify(pipelineStages));

    try {
      await fetch("/api/crm/sync-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pipelineName, pipelineStages })
      });
    } catch (e) {
      console.error("Failed to sync pipeline to db", e);
    }

    setIsSaving(false);
    triggerToast("Pipeline configurations saved!");
  };

  const handleAddStage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newStageName.trim()) return;
    if (pipelineStages.includes(newStageName.trim())) {
      triggerToast("Stage already exists.", "error");
      return;
    }
    setPipelineStages((prev) => [...prev, newStageName.trim()]);
    setNewStageName("");
  };

  const handleDeleteStage = (stageName: string) => {
    if (pipelineStages.length <= 1) {
      triggerToast("At least one stage is required.", "error");
      return;
    }
    setPipelineStages((prev) => prev.filter((s) => s !== stageName));
  };

  const handleChannelsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem("nexdial_channels", JSON.stringify(channels));

    try {
      await fetch("/api/crm/sync-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channels })
      });
    } catch (e) {
      console.error("Failed to sync channels to db", e);
    }

    setIsSaving(false);
    triggerToast("Communication channels saved!");
  };

  const handleAiAlertsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem("nexdial_ai_features", JSON.stringify(aiFeatures));
    localStorage.setItem("nexdial_alert_channels", JSON.stringify(alertChannels));
    localStorage.setItem("nexdial_daily_summary", dailySummary);
    localStorage.setItem("nexdial_weekly_report", weeklyReport);
    localStorage.setItem("nexdial_webhook_url", webhookUrl);
    localStorage.setItem("nexdial_lead_routing", leadRouting);

    try {
      await fetch("/api/crm/sync-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aiFeatures, alertChannels, dailySummary, weeklyReport, webhookUrl, leadRouting })
      });
    } catch (e) {
      console.error("Failed to sync AI settings to db", e);
    }

    setIsSaving(false);
    triggerToast("AI and Alerts configurations saved!");
  };

  // Add DB team member
  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      triggerToast("Please enter team member name and email.", "error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMemberName,
          email: newMemberEmail,
          role: newMemberRole
        })
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Failed to add team member.");
      }

      setNewMemberName("");
      setNewMemberEmail("");
      triggerToast("Team member added successfully!");
      fetchTeamMembers();
    } catch (err: any) {
      triggerToast(err.message || "Failed to add member.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete DB team member
  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete team member.");
      }

      triggerToast("Team member removed.");
      fetchTeamMembers();
    } catch (err: any) {
      triggerToast(err.message || "Failed to delete member.", "error");
    }
  };

  // Delete Profile Account (DANGER ZONE)
  const handleDeleteOwnProfile = async () => {
    if (!session?.user) return;
    const userSession = session.user as any;

    const code = prompt("Warning: Deleting your account will remove your user settings, logs, and database context permanently.\nTo confirm, type your account email below:");
    if (!code || code.toLowerCase().trim() !== userSession.email.toLowerCase()) {
      alert("Verification email does not match. Account deletion cancelled.");
      return;
    }

    try {
      const res = await fetch(`/api/users/${userSession.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete account.");
      }

      alert("Your NexDial account has been deleted successfully.");
      // Sign out and redirect
      signOut({ callbackUrl: "/" });
    } catch (err: any) {
      triggerToast(err.message || "Failed to delete profile.", "error");
    }
  };

  // Checklist Toggles
  const toggleAiFeature = (feat: string) => {
    setAiFeatures((prev) => 
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const toggleAlertChannel = (ch: string) => {
    setAlertChannels((prev) => 
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  if (!mounted) return null;

  if (status === "loading") {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00C2FF] animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-semibold">Syncing settings engine...</p>
      </div>
    );
  }

  const currentUser = session?.user as any;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 font-bold px-4 py-3 rounded-lg shadow-lg ${
              toastType === "success" 
                ? "bg-[#00E5A0] text-[#081120] shadow-[#00E5A0]/25" 
                : "bg-red-500 text-white shadow-red-500/25"
            }`}
          >
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#00C2FF]" />
          Workspace Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Edit and adjust the configurations, channels, and team settings set up during onboarding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Navigation (Tabs Menu & Profile summary) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[#0A1628] rounded-xl border border-white/5 p-5 flex flex-col items-center text-center">
            <div className="relative group mb-3">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Profile Avatar" 
                  className="w-16 h-16 rounded-full object-cover border border-[#00C2FF]/30 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0057D9] to-[#00C2FF] flex items-center justify-center text-xl font-bold text-white border border-[#00C2FF]/30 shadow-lg">
                  {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <label 
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-bold cursor-pointer transition-opacity"
              >
                Upload
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>
            
            <h2 className="text-sm font-bold text-white leading-tight">{currentUser?.name || "User"}</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-full">{currentUser?.email || "No email"}</p>
            
            {avatar && (
              <button
                onClick={handleAvatarRemove}
                className="text-[9px] text-red-400 hover:text-red-300 font-semibold underline mt-1.5 cursor-pointer bg-transparent border-none"
              >
                Remove Photo
              </button>
            )}
            
            <span className="mt-3.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono font-bold uppercase text-[#00C2FF]">
              <Shield className="w-3 h-3 text-[#00C2FF]" />
              {currentUser?.role || "SALES"}
            </span>
          </div>

          {/* Configuration Tabs navigation */}
          <div className="bg-[#0A1628] rounded-xl border border-white/5 p-2 flex flex-col space-y-1">
            {[
              { id: "profile", name: "Owner Profile", icon: User },
              { id: "company", name: "Company & Branding", icon: Building2 },
              { id: "goals_sources", name: "Goals & Lead Sources", icon: Target },
              { id: "pipeline", name: "Sales Pipeline", icon: Sliders },
              { id: "channels", name: "Communication Channels", icon: Smartphone },
              { id: "team", name: "Team Members", icon: User },
              { id: "ai_alerts", name: "AI & Alerts", icon: Bot },
              { id: "subscription", name: "Subscription & Billing", icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? "bg-[#0057D9]/10 text-white border border-[#0057D9]/30" 
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Settings Forms panels */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: PROFILE SETTINGS */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6 space-y-6"
              >
                <form onSubmit={handleProfileSave} className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Profile Configurations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Mobile Number</label>
                      <input 
                        type="tel" 
                        value={ownerMobile}
                        onChange={(e) => setOwnerMobile(e.target.value)}
                        placeholder="e.g. +91 99999 99999"
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Job Title</label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Sales Director"
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 pl-1 pt-2">
                    Security Credentials
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 pl-1">Current Password</label>
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white placeholder-slate-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-500 pl-1">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Leave blank to keep current"
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white placeholder-slate-700"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Profile</span>
                    </button>
                  </div>
                </form>

                {/* DANGER ZONE */}
                <div className="border-t border-red-500/10 pt-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-red-400 pl-1">Danger Zone</h4>
                  <div className="p-4 bg-red-500/5 border border-red-500/15 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-white">Delete Profile Context</p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 leading-relaxed">
                        Permanently purge your account settings and database profile. This action is irreversible.
                      </p>
                    </div>
                    <button
                      onClick={handleDeleteOwnProfile}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>Delete My Profile</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: COMPANY & BRANDING SETTINGS */}
            {activeTab === "company" && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6"
              >
                <form onSubmit={handleCompanySave} className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Company Profile
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Company Name</label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1 z-50">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Business Type</label>
                      <BusinessTypeSelector 
                        value={businessType}
                        onChange={(val) => setBusinessType(val)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Industry</label>
                      <IndustrySelector 
                        value={industry}
                        onChange={(slug) => setIndustry(slug)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Company Website</label>
                      <input 
                        type="url" 
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Company Size</label>
                      <select 
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="Solo">Solo Practitioner</option>
                        <option value="2–10 Employees">2–10 Employees</option>
                        <option value="11–50 Employees">11–50 Employees</option>
                        <option value="51–200 Employees">51–200 Employees</option>
                        <option value="200+">200+ Employees</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Time Zone</label>
                      <input 
                        type="text" 
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Business Location</label>
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Business Phone Number</label>
                      <input 
                        type="tel" 
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="e.g. +91 99999 99999"
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 pt-2">
                    Branding Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Brand Name</label>
                        <input 
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Tagline</label>
                        <input 
                          type="text"
                          value={brandTagline}
                          onChange={(e) => setBrandTagline(e.target.value)}
                          className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Brand Color</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={brandColor} 
                            onChange={(e) => setBrandColor(e.target.value)}
                            className="w-6 h-6 border-none cursor-pointer rounded-full overflow-hidden" 
                          />
                          <span className="font-mono text-[10px] text-slate-300">{brandColor.toUpperCase()}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setLogoUploaded(!logoUploaded);
                        }}
                        className={`py-2 text-[10.5px] font-bold border rounded-lg transition-colors ${
                          logoUploaded 
                            ? "bg-green-500/10 border-green-500/35 text-green-400" 
                            : "bg-[#050A15] border-white/10 text-slate-400"
                        }`}
                      >
                        {logoUploaded ? "Logo Uploaded (Active)" : "Simulate Logo Upload"}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Company Configurations</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB: GOALS & LEAD SOURCES */}
            {activeTab === "goals_sources" && (
              <motion.div
                key="goals_sources"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6 space-y-6"
              >
                <form onSubmit={handleGoalsSourcesSave} className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                      Business Goals
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1">What would you like NexDial to help with?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                      {[
                        "Lead Management", "Sales Pipeline", "Customer Support",
                        "WhatsApp Communication", "Team Collaboration", "Appointment Booking",
                        "CRM & Contact Management", "Revenue Tracking"
                      ].map((g) => {
                        const isSelected = goals.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setGoals((prev) => 
                                prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
                              );
                            }}
                            className={`px-3 py-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-[#0057D9]/20 border-[#00C2FF] text-white" 
                                : "bg-[#050A15] border-white/5 text-slate-400 hover:border-white/10"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? "bg-[#00C2FF] border-[#00C2FF]" : "border-slate-500"}`}>
                                {isSelected && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                              </div>
                              <span>{g}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 pt-2">
                      Lead Sources
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1">Where do your leads come from?</p>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {[
                        "Website", "WhatsApp", "Facebook", "Instagram",
                        "Google Ads", "LinkedIn", "Referrals", "Cold Calling", "Other"
                      ].map((src) => {
                        const isSelected = leadSources.includes(src);
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => {
                              setLeadSources((prev) => 
                                prev.includes(src) ? prev.filter((item) => item !== src) : [...prev, src]
                              );
                            }}
                            className={`px-3 py-2 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]" 
                                : "bg-[#050A15] border-white/5 text-slate-400 hover:border-white/10"
                            }`}
                          >
                            {src}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Monthly Leads</label>
                      <select 
                        value={monthlyLeads}
                        onChange={(e) => setMonthlyLeads(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="0–100">0–100</option>
                        <option value="101–500">101–500</option>
                        <option value="501–1000">501–1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Current CRM</label>
                      <select 
                        value={currentCrm}
                        onChange={(e) => setCurrentCrm(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="None">None / Spreadsheets</option>
                        <option value="HubSpot">HubSpot</option>
                        <option value="Zoho">Zoho CRM</option>
                        <option value="Salesforce">Salesforce</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Referral Source</label>
                      <select 
                        value={hearAboutUs}
                        onChange={(e) => setHearAboutUs(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="Google">Google Search</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Referral">Referral / Word of Mouth</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Goals & Sources</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB: SALES PIPELINE */}
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6 space-y-6"
              >
                <form onSubmit={handlePipelineSave} className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Sales Pipeline Configurations
                  </h3>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Pipeline Name</label>
                    <input 
                      type="text" 
                      value={pipelineName}
                      onChange={(e) => setPipelineName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold text-slate-400 pl-1 block">Pipeline Stages</label>
                    
                    {/* Add new stage */}
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Add new stage name (e.g. Follow Up Scheduled)"
                        value={newStageName}
                        onChange={(e) => setNewStageName(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white"
                      />
                      <button
                        onClick={handleAddStage}
                        className="px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/90 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stage</span>
                      </button>
                    </div>

                    {/* Active stages list */}
                    <div className="space-y-2 mt-2">
                      <span className="text-[9px] uppercase font-bold text-slate-500 pl-1">
                        Current Pipeline Stages ({pipelineStages.length})
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pipelineStages.map((stage, idx) => (
                          <div 
                            key={stage} 
                            className="px-3.5 py-2.5 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center font-mono text-[9px] text-slate-400">
                                {idx + 1}
                              </span>
                              <span className="font-medium">{stage}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteStage(stage)}
                              className="text-red-400 hover:text-red-350 p-1 rounded hover:bg-red-500/10 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                              title="Delete stage"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Pipeline Stages</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB 3: COMMUNICATION CHANNELS SETTINGS */}
            {activeTab === "channels" && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6"
              >
                <form onSubmit={handleChannelsSave} className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Channels Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* WhatsApp */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <label className="text-[10px] uppercase font-bold text-[#00E5A0] flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" /> WhatsApp Gateway
                      </label>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500">Business WhatsApp Number</span>
                        <input 
                          type="tel"
                          value={channels.whatsappNumber}
                          onChange={(e) => setChannels({...channels, whatsappNumber: e.target.value})}
                          placeholder="e.g. +91 99999 99999"
                          className="w-full px-3 py-1.5 bg-[#050A15] border border-white/5 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Has verified Business account?</span>
                        <select 
                          value={channels.whatsappHasAccount}
                          onChange={(e) => setChannels({...channels, whatsappHasAccount: e.target.value})}
                          className="bg-[#050A15] text-white border border-white/10 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <label className="text-[10px] uppercase font-bold text-[#00C2FF] flex items-center gap-1.5">
                        <Mail className="w-4 h-4" /> Email Routing
                      </label>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500">Support Mailbox</span>
                        <input 
                          type="email"
                          value={channels.supportEmail}
                          onChange={(e) => setChannels({...channels, supportEmail: e.target.value})}
                          placeholder="e.g. support@company.com"
                          className="w-full px-3 py-1.5 bg-[#050A15] border border-white/5 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500">Sales Mailbox</span>
                        <input 
                          type="email"
                          value={channels.salesEmail}
                          onChange={(e) => setChannels({...channels, salesEmail: e.target.value})}
                          placeholder="e.g. sales@company.com"
                          className="w-full px-3 py-1.5 bg-[#050A15] border border-white/5 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Calling */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <label className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" /> Calling Systems
                      </label>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500">Business Calling Line</span>
                        <input 
                          type="tel"
                          value={channels.callingNumber}
                          onChange={(e) => setChannels({...channels, callingNumber: e.target.value})}
                          placeholder="e.g. +91 80 1234 5678"
                          className="w-full px-3 py-1.5 bg-[#050A15] border border-white/5 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Dialer Integration</span>
                        <select 
                          value={channels.callingSystem}
                          onChange={(e) => setChannels({...channels, callingSystem: e.target.value})}
                          className="bg-[#050A15] text-white border border-white/10 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                        >
                          <option value="None">None</option>
                          <option value="NexDial Dialer">NexDial AutoDialer</option>
                          <option value="Twilio">Twilio SDK</option>
                        </select>
                      </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <label className="text-[10px] uppercase font-bold text-purple-400 flex items-center gap-1.5">
                        <Globe className="w-4 h-4" /> Website Leads Webhook
                      </label>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500">Website URL</span>
                        <input 
                          type="text"
                          value={channels.websiteUrl}
                          onChange={(e) => setChannels({...channels, websiteUrl: e.target.value})}
                          placeholder="e.g. https://mycompany.com"
                          className="w-full px-3 py-1.5 bg-[#050A15] border border-white/5 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Capture leads via Contact form?</span>
                        <select 
                          value={channels.websiteHasForm}
                          onChange={(e) => setChannels({...channels, websiteHasForm: e.target.value})}
                          className="bg-[#050A15] text-white border border-white/10 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Channels</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB 4: TEAM MEMBERS */}
            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6 space-y-6"
              >
                {/* Add Member Form */}
                <form onSubmit={handleAddTeamMember} className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Workspace Team Setup
                  </h3>

                  <div className="bg-[#050A15] border border-white/5 p-4 rounded-xl space-y-3.5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500 pl-1">Full Name</span>
                        <input 
                          type="text"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="Team member name"
                          className="w-full px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500 pl-1">Email Address</span>
                        <input 
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="member@company.com"
                          className="w-full px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-500 pl-1">Workspace Role</span>
                        <select
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Sales Executive">Sales Executive</option>
                          <option value="Support Agent">Support Agent</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/90 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> 
                      <span>Invite Member</span>
                    </button>
                  </div>
                </form>

                {/* Team Members List */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-500 pl-1">
                    Active Team Users ({dbTeamMembers.length})
                  </span>

                  {loadingTeam ? (
                    <div className="py-6 flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 text-[#00C2FF] animate-spin" />
                      <span className="text-xs text-slate-500">Querying database users...</span>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]">
                      {dbTeamMembers.map((member) => (
                        <div key={member.id} className="px-4 py-3 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-white flex items-center gap-1.5">
                              <span>{member.name || "Invite Pending"}</span>
                              {currentUser.id === member.id && (
                                <span className="px-1.5 py-0.2 bg-[#00E5A0]/10 text-[#00E5A0] text-[8px] rounded uppercase font-bold font-mono">You</span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{member.email}</p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="px-2 py-0.5 bg-[#00C2FF]/10 text-[#00C2FF] rounded text-[9px] uppercase font-mono font-bold">
                              {member.role}
                            </span>
                            {currentUser.id !== member.id && (
                              <button 
                                onClick={() => handleDeleteTeamMember(member.id)}
                                className="text-red-400 hover:text-red-350 p-1.5 rounded hover:bg-red-500/10 transition-all cursor-pointer"
                                title="Remove team member"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 5: AI & ALERTS */}
            {activeTab === "ai_alerts" && (
              <motion.div
                key="ai_alerts"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6"
              >
                <form onSubmit={handleAiAlertsSave} className="space-y-6">
                  
                  {/* AI Features */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
                      AI Integration Suite
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {[
                        "AI Lead Scoring", "AI Follow-up Suggestions", "AI Revenue Forecasting",
                        "AI Contact Summaries", "AI Priority Alerts"
                      ].map((feat) => (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleAiFeature(feat)}
                          className={`px-3 py-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            aiFeatures.includes(feat) 
                              ? "bg-[#00C2FF]/10 border-[#00C2FF] text-white" 
                              : "bg-[#050A15] border-white/5 text-slate-450"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bot className={`w-4 h-4 ${aiFeatures.includes(feat) ? "text-[#00C2FF]" : "text-slate-500"}`} />
                              <span>{feat}</span>
                            </div>
                            {aiFeatures.includes(feat) && <Check className="w-3.5 h-3.5 text-[#00E5A0]" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notification Channels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 pl-1">Receive Notifications Via</h4>
                      <div className="flex flex-col gap-2">
                        {["Email", "WhatsApp", "Browser Notifications"].map((ch) => (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => toggleAlertChannel(ch)}
                            className={`px-3 py-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                              alertChannels.includes(ch) 
                                ? "bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]" 
                                : "bg-[#050A15] border-white/5 text-slate-450"
                            }`}
                          >
                            {ch}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3.5 bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-center">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-450">Daily Summary Report</span>
                        <select 
                          value={dailySummary}
                          onChange={(e) => setDailySummary(e.target.value)}
                          className="bg-[#050A15] text-white border border-white/10 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-450">Weekly Performance Report</span>
                        <select 
                          value={weeklyReport}
                          onChange={(e) => setWeeklyReport(e.target.value)}
                          className="bg-[#050A15] text-white border border-white/10 rounded px-1.5 py-0.5 text-xs focus:outline-none"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Webhook & Lead routing */}
                  <div className="space-y-4 pt-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-white/5 pb-2">
                      Webhook Integrations
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-500 pl-1">Incoming Lead Webhook URL</label>
                      <input 
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-[#050A15] border border-white/5 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-500 pl-1">Lead Assignment Policy</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setLeadRouting("round-robin")}
                          className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            leadRouting === "round-robin"
                              ? "border-[#00C2FF] bg-[#00C2FF]/5 text-white"
                              : "border-white/5 bg-[#050A15] text-slate-400 hover:text-white"
                          }`}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Round Robin</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLeadRouting("manual")}
                          className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            leadRouting === "manual"
                              ? "border-[#00C2FF] bg-[#00C2FF]/5 text-white"
                              : "border-white/5 bg-[#050A15] text-slate-400 hover:text-white"
                          }`}
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Manual Assign</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0057D9]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save AI & Notification Configs</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* TAB: SUBSCRIPTION & BILLING */}
            {activeTab === "subscription" && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-[#0A1628] rounded-xl border border-white/5 p-5 md:p-6 space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                    Subscription & Billing
                  </h3>

                  <div className="bg-[#050A15] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#0057D9]/15 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#00C2FF] font-bold px-2 py-0.5 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                          SaaS Trial Plan
                        </span>
                        <h4 className="text-base font-bold text-white mt-2">15-Day Free Trial Period</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Your trial workspace is fully active with unlimited access to calling, lead scoring, and team setups.
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-1">Auth Charge (Paid)</p>
                        <p className="text-2xl font-black text-white">₹1</p>
                        <p className="text-[9px] text-[#00E5A0] font-bold">Mandate Auth Charge (Paid)</p>
                      </div>
                    </div>

                    {/* Pricing Tiers */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="bg-[#0A1628] border border-[#00C2FF]/20 rounded-xl p-3">
                        <p className="text-[9px] uppercase tracking-wider text-[#00C2FF] font-bold">Small Business</p>
                        <p className="text-xl font-black text-white mt-1">₹499<span className="text-xs font-normal text-slate-400">/month</span></p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Solo — 10 Users</p>
                      </div>
                      <div className="bg-[#0A1628] border border-purple-500/20 rounded-xl p-3">
                        <p className="text-[9px] uppercase tracking-wider text-purple-400 font-bold">Medium Business</p>
                        <p className="text-xl font-black text-white mt-1">₹599<span className="text-xs font-normal text-slate-400">/month</span></p>
                        <p className="text-[9px] text-slate-400 mt-0.5">11 — 50 Users</p>
                      </div>
                    </div>

                    <div className="border-t border-white/5 mt-5 pt-4 flex flex-col sm:flex-row justify-between text-[11px] text-slate-400 gap-2">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-[#00E5A0]" />
                        <span>Razorpay e-Mandate: <strong>Active</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span>Security Signature: <strong>Verified</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-[#00C2FF]" />
                        <span>Trial Status: <strong>15 Days Left</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#050A15]/50 border border-white/5 rounded-xl text-xs space-y-2 text-slate-400">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#00C2FF]" />
                      Billing Information
                    </p>
                    <p className="leading-relaxed text-[11px]">
                      After your 15-day trial ends, your plan auto-renews at <strong>₹499/month</strong> (Small Business: Solo – 10 users) or <strong>₹599/month</strong> (Medium Business: 11 – 50 users) based on your team size. You can cancel at any time from your Razorpay dashboard or by contacting support. No unauthorized debits will occur.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
