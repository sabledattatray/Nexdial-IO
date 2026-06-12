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
  ArrowLeft,
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Smartphone,
  Check,
  Plus,
  Trash2,
  UploadCloud,
  Mail,
  Phone,
  Globe,
  Settings,
  Bot,
  Bell,
  Palette,
  ChevronRight,
  User as UserIcon,
  Activity,
  Award,
  MessageSquare
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

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

function OnboardingContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/onboarding");
    }
  }, [status, router]);

  const [step, setStep] = useState(1); // Steps 1 to 7
  const [error, setError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("Agency");
  const [industry, setIndustry] = useState("real_estate");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState("2–10 Employees");
  const [location, setLocation] = useState("India");
  const [timeZone, setTimeZone] = useState("GMT+5:30 (IST)");
  const [businessPhone, setBusinessPhone] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerMobile, setOwnerMobile] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Step 2: Goals & Sources
  const [goals, setGoals] = useState<string[]>(["Lead Management", "Sales Pipeline"]);
  const [leadSources, setLeadSources] = useState<string[]>(["Website", "WhatsApp"]);
  const [monthlyLeads, setMonthlyLeads] = useState("0–100");
  const [currentCrm, setCurrentCrm] = useState("None");
  const [hearAboutUs, setHearAboutUs] = useState("Google");

  // Step 3: Channels & Branding
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
  const [brandName, setBrandName] = useState("");
  const [brandTagline, setBrandTagline] = useState("");
  const [brandColor, setBrandColor] = useState("#0057D9");
  const [logoUploaded, setLogoUploaded] = useState(false);

  // Step 4: Pipeline & Team Setup
  const [pipelineName, setPipelineName] = useState("Sales Pipeline");
  const [pipelineStages, setPipelineStages] = useState<string[]>([
    "New Lead", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"
  ]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Sales Executive");

  // Step 5: AI & Notifications
  const [aiFeatures, setAiFeatures] = useState<string[]>(["AI Lead Scoring", "AI Follow-up Suggestions"]);
  const [alertChannels, setAlertChannels] = useState<string[]>(["Email"]);
  const [dailySummary, setDailySummary] = useState("Yes");
  const [weeklyReport, setWeeklyReport] = useState("Yes");

  // Step 7: Loader State
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("Initializing setup...");
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  // Sync initial user details from session
  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !ownerName) {
        setOwnerName(session.user.name);
      }
      if (session.user.email && !ownerEmail) {
        setOwnerEmail(session.user.email);
      }
    }
  }, [session, ownerName, ownerEmail]);

  // Seeding simulation logs for Step 7
  useEffect(() => {
    if (step !== 7) return;

    const actions = [
      "Create your CRM workspace",
      "Generate your sales pipeline",
      "Configure AI lead scoring",
      "Set up team permissions",
      "Enable reporting dashboard",
      "Prepare communication inbox"
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next <= 15) {
          setProgressStatus("Configuring company workspace attributes...");
        } else if (next === 20) {
          setCompletedActions((c) => [...c, actions[0]]);
        } else if (next <= 40) {
          setProgressStatus(`Building custom pipeline: "${pipelineName}" with ${pipelineStages.length} stages...`);
        } else if (next === 45) {
          setCompletedActions((c) => [...c, actions[1]]);
        } else if (next <= 60) {
          setProgressStatus("Activating AI Lead Scoring models...");
        } else if (next === 65) {
          setCompletedActions((c) => [...c, actions[2]]);
        } else if (next <= 75) {
          setProgressStatus(`Provisioning ${teamMembers.length + 1} user security contexts...`);
        } else if (next === 80) {
          setCompletedActions((c) => [...c, actions[3]]);
          setCompletedActions((c) => [...c, actions[4]]);
        } else if (next <= 95) {
          setProgressStatus("Setting up communication gateways (Email & WhatsApp)...");
        } else if (next === 99) {
          setCompletedActions((c) => [...c, actions[5]]);
        } else if (next >= 100) {
          clearInterval(interval);
          setProgressStatus("Setup completed! Redirecting to CRM dashboard...");
          setTimeout(async () => {
            await update(); // Force session token update
            router.push("/crm");
          }, 800);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [step, pipelineName, pipelineStages, teamMembers, router, update]);

  // Toggle checklist utilities
  const toggleGoal = (goal: string) => {
    setGoals((prev) => 
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const toggleLeadSource = (src: string) => {
    setLeadSources((prev) => 
      prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src]
    );
  };

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

  // Add team member inline
  const addTeamMember = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      setError("Please fill in both name and email for the team member.");
      return;
    }
    if (!newMemberEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setTeamMembers((prev) => [
      ...prev,
      { name: newMemberName, email: newMemberEmail, role: newMemberRole }
    ]);
    setNewMemberName("");
    setNewMemberEmail("");
  };

  const deleteTeamMember = (idx: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  // Trigger Razorpay Standard Checkout Setup
  const handleRazorpaySetup = async () => {
    setError("");
    setLoadingPayment(true);

    try {
      // Create the order on the backend
      const res = await fetch("/api/onboarding/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to create onboarding subscription order.");
      }

      const orderData = await res.json();

      // Load SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay payment script failed to load. Please verify connection.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NexDial CCOS",
        description: "15-day Trial Authorization (₹1 Auth)",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Signature Verification
          try {
            setLoadingPayment(true);
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyRes.ok) {
              const errData = await verifyRes.json().catch(() => ({}));
              throw new Error(errData.error || "Mandate authentication failed.");
            }

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
              throw new Error("Payment signature verification failed.");
            }

            // Payment verified, trigger onboarding save
            await submitOnboardingConfig();
          } catch (err: any) {
            setError(err.message || "Verification failed.");
            setLoadingPayment(false);
          }
        },
        prefill: {
          name: ownerName || session?.user?.name || "NexDial Admin",
          email: ownerEmail || session?.user?.email || "admin@nexdial.io",
          contact: ownerMobile || ""
        },
        theme: {
          color: "#0057D9"
        }
      };

      setLoadingPayment(false);
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during subscription setup.");
      setLoadingPayment(false);
    }
  };

  // Submit complete onboarding configs
  const submitOnboardingConfig = async () => {
    setLoadingPayment(true);
    try {
      const payload = {
        name: ownerName,
        industry,
        seedDemoData: true,
        companyName,
        businessType,
        companyWebsite,
        companySize,
        location,
        timeZone,
        businessPhone,
        ownerEmail,
        ownerMobile,
        jobTitle,
        goals,
        leadSources,
        monthlyLeads,
        currentCrm,
        hearAboutUs,
        channels,
        brandName,
        brandTagline,
        brandColor,
        team: teamMembers,
        aiFeatures,
        alertChannels,
        dailySummary,
        weeklyReport
      };

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save workspace configurations.");
      }

      // Save complete payload to localStorage for Settings integration
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
      localStorage.setItem("nexdial_channels", JSON.stringify(channels));
      localStorage.setItem("nexdial_ai_features", JSON.stringify(aiFeatures));
      localStorage.setItem("nexdial_alert_channels", JSON.stringify(alertChannels));
      localStorage.setItem("nexdial_daily_summary", dailySummary);
      localStorage.setItem("nexdial_weekly_report", weeklyReport);
      
      localStorage.setItem("nexdial_owner_mobile", ownerMobile);
      localStorage.setItem("nexdial_job_title", jobTitle);
      localStorage.setItem("nexdial_goals", JSON.stringify(goals));
      localStorage.setItem("nexdial_lead_sources", JSON.stringify(leadSources));
      localStorage.setItem("nexdial_monthly_leads", monthlyLeads);
      localStorage.setItem("nexdial_current_crm", currentCrm);
      localStorage.setItem("nexdial_hear_about_us", hearAboutUs);

      localStorage.setItem("nexdial_pipeline_name", pipelineName);
      localStorage.setItem("nexdial_pipeline_stages", JSON.stringify(pipelineStages));

      setStep(7); // Proceed to loaders progress bar
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding.");
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl bg-[#0F172A]/75 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden transition-all duration-500">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#0057D9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header (Steps 1-6) */}
      {step < 7 && (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-mono text-[#00C2FF] font-bold">
                Setup Wizard
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white mt-1">
                Configure Your Workspace
              </h1>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              Step {step} of 6
            </span>
          </div>

          {/* Progress bar indicator */}
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00C2FF] to-[#00E5A0] rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 rotate-180 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Company & Owner Profile */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Building2 className="w-4 h-4 text-[#00C2FF]" /> Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Company Name *</label>
              <input 
                type="text" 
                required 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Realty"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Business Type *</label>
              <select 
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="Agency">Agency</option>
                <option value="SaaS">SaaS/Product</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Healthcare">Healthcare Provider</option>
                <option value="Consulting">Consulting/Education</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Industry *</label>
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="real_estate">Real Estate Agencies</option>
                <option value="marketing">Marketing Agencies</option>
                <option value="education">Education Consultants</option>
                <option value="healthcare">Healthcare Clinics</option>
                <option value="insurance">Insurance Brokers</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Company Website</label>
              <input 
                type="url" 
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                placeholder="https://apexrealty.com"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Company Size</label>
              <select 
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="Solo">Solo Practitioner</option>
                <option value="2–10 Employees">2–10 Employees</option>
                <option value="11–50 Employees">11–50 Employees</option>
                <option value="51–200 Employees">51–200 Employees</option>
                <option value="200+">200+ Employees</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Time Zone *</label>
              <input 
                type="text" 
                required
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                placeholder="GMT+5:30 (IST)"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>
          </div>

          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2 pt-2">
            <UserIcon className="w-4 h-4 text-[#00E5A0]" /> Account Owner Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Full Name *</label>
              <input 
                type="text" 
                required 
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Work Email *</label>
              <input 
                type="email" 
                required 
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Mobile Number *</label>
              <input 
                type="tel" 
                required 
                value={ownerMobile}
                onChange={(e) => setOwnerMobile(e.target.value)}
                placeholder="+91 99999 99999"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Job Title</label>
              <input 
                type="text" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Sales Director"
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (!companyName.trim() || !ownerName.trim() || !ownerEmail.trim() || !ownerMobile.trim()) {
                setError("Please fill in all required fields marked with *.");
                return;
              }
              setError("");
              setStep(2);
            }}
            className="w-full py-3 mt-3 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-xs font-bold text-[#081120] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00E5A0]/25 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Goals & Sources */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Activity className="w-4 h-4 text-[#00C2FF]" /> Business Goals
            </h2>
            <p className="text-[10px] text-slate-400 mt-1">What would you like NexDial to help with?</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[
                "Lead Management", "Sales Pipeline", "Customer Support",
                "WhatsApp Communication", "Team Collaboration", "Appointment Booking",
                "CRM & Contact Management", "Revenue Tracking"
              ].map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGoal(g)}
                  className={`px-3 py-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    goals.includes(g) 
                      ? "bg-[#0057D9]/20 border-[#00C2FF] text-white" 
                      : "bg-[#060D1A] border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${goals.includes(g) ? "bg-[#00C2FF] border-[#00C2FF]" : "border-slate-500"}`}>
                      {goals.includes(g) && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                    </div>
                    <span>{g}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2 pt-2">
              <Globe className="w-4 h-4 text-[#00E5A0]" /> Lead Sources
            </h2>
            <p className="text-[10px] text-slate-400 mt-1">Where do your leads come from?</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                "Website", "WhatsApp", "Facebook", "Instagram",
                "Google Ads", "LinkedIn", "Referrals", "Cold Calling", "Other"
              ].map((src) => (
                <button
                  key={src}
                  onClick={() => toggleLeadSource(src)}
                  className={`px-3 py-2 rounded-lg border text-center text-xs transition-all ${
                    leadSources.includes(src) 
                      ? "bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]" 
                      : "bg-[#060D1A] border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Monthly Leads</label>
              <select 
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="0–100">0–100</option>
                <option value="101–500">101–500</option>
                <option value="501–1000">501–1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Current CRM</label>
              <select 
                value={currentCrm}
                onChange={(e) => setCurrentCrm(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="None">None / Spreadsheets</option>
                <option value="HubSpot">HubSpot</option>
                <option value="Zoho">Zoho CRM</option>
                <option value="Salesforce">Salesforce</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Referral Source</label>
              <select 
                value={hearAboutUs}
                onChange={(e) => setHearAboutUs(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00C2FF]"
              >
                <option value="Google">Google Search</option>
                <option value="YouTube">YouTube</option>
                <option value="Referral">Referral / Word of Mouth</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => {
                if (goals.length === 0) {
                  setError("Please select at least one business goal.");
                  return;
                }
                setError("");
                setStep(3);
              }}
              className="flex-[2] py-3 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-xs font-bold text-[#081120] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00E5A0]/25 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Channels & Branding */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Smartphone className="w-4 h-4 text-[#00C2FF]" /> Communication Channels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <label className="text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-green-400" /> WhatsApp Integration</label>
              <input 
                type="tel"
                value={channels.whatsappNumber}
                onChange={(e) => setChannels({...channels, whatsappNumber: e.target.value})}
                placeholder="WhatsApp Number"
                className="w-full px-3 py-1.5 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
              />
              <div className="flex items-center justify-between text-[10px] pt-1">
                <span className="text-slate-400">Has WhatsApp Business account?</span>
                <select 
                  value={channels.whatsappHasAccount}
                  onChange={(e) => setChannels({...channels, whatsappHasAccount: e.target.value})}
                  className="bg-[#060D1A] text-white border border-white/10 rounded px-1.5 py-0.5"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <label className="text-[10px] uppercase font-bold text-slate-300 flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#00C2FF]" /> Email Setup</label>
              <input 
                type="email"
                value={channels.salesEmail}
                onChange={(e) => setChannels({...channels, salesEmail: e.target.value})}
                placeholder="Sales Email (e.g. sales@company.com)"
                className="w-full px-3 py-1.5 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
              />
              <input 
                type="email"
                value={channels.supportEmail}
                onChange={(e) => setChannels({...channels, supportEmail: e.target.value})}
                placeholder="Support Email (e.g. support@company.com)"
                className="w-full px-3 py-1.5 bg-[#060D1A] border border-white/10 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2 pt-2">
            <Palette className="w-4 h-4 text-[#00E5A0]" /> Workspace Branding
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Brand Name</label>
                <input 
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Brand / Display Name"
                  className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Tagline / Motto</label>
                <input 
                  type="text"
                  value={brandTagline}
                  onChange={(e) => setBrandTagline(e.target.value)}
                  placeholder="Your brand tagline"
                  className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Logo upload simulator & Brand color picker */}
            <div className="flex flex-col justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Primary Brand Color</span>
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

              <label 
                className={`border border-dashed rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors ${logoUploaded ? 'border-green-500/30 bg-green-500/5 text-green-400' : 'border-white/10 hover:border-white/20 text-slate-400'}`}
              >
                <input 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.svg"
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setLogoUploaded(true);
                    }
                  }}
                />
                <UploadCloud className="w-5 h-5 mb-1" />
                <span className="text-[10.5px] font-bold">
                  {logoUploaded ? "Company Logo Uploaded" : "Upload Company Logo"}
                </span>
                <span className="text-[8px] text-slate-500 mt-0.5">Supports PNG, JPG, SVG up to 2MB</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-[2] py-3 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-xs font-bold text-[#081120] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00E5A0]/25 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Pipeline & Team Setup */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Settings className="w-4 h-4 text-[#00C2FF]" /> Sales Pipeline Settings
          </h2>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Pipeline Name</label>
              <input 
                type="text" 
                value={pipelineName}
                onChange={(e) => setPipelineName(e.target.value)}
                className="w-full px-3 py-2 bg-[#060D1A] border border-white/10 rounded-xl text-xs"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Default Stages</label>
              <div className="flex flex-wrap gap-1.5">
                {pipelineStages.map((stage) => (
                  <span 
                    key={stage} 
                    className="px-2.5 py-1 bg-[#060D1A] border border-white/5 rounded-lg text-[10.5px] text-slate-300 flex items-center gap-1"
                  >
                    <span>{stage}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2 pt-2">
            <UserIcon className="w-4 h-4 text-[#00E5A0]" /> Team Setup (Add members)
          </h2>

          {/* Add team member card */}
          <div className="bg-[#060D1A] border border-white/5 p-4 rounded-2xl space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input 
                type="text"
                placeholder="Full Name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs"
              />
              <input 
                type="email"
                placeholder="Email Address"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs"
              />
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="px-3 py-2 bg-[#0A1628] border border-white/10 rounded-lg text-xs"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Support Agent">Support Agent</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <button 
              onClick={addTeamMember}
              className="px-4 py-2 bg-[#0057D9] hover:bg-[#0057D9]/90 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Team Member
            </button>
          </div>

          {/* Added team members list */}
          {teamMembers.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-slate-400">Designated Team ({teamMembers.length})</p>
              <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-400">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-[#00C2FF]/10 text-[#00C2FF] rounded text-[9px] uppercase font-mono font-bold">
                        {member.role}
                      </span>
                      <button 
                        onClick={() => deleteTeamMember(idx)}
                        className="text-red-400 hover:text-red-350 p-1 rounded hover:bg-red-500/10 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-3">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-[2] py-3 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-xs font-bold text-[#081120] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00E5A0]/25 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AI Config & Alerts */}
      {step === 5 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Bot className="w-4 h-4 text-[#00C2FF]" /> AI Configuration
            </h2>
            <p className="text-[10px] text-slate-400 mt-1">Select AI Features to Enable</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
              {[
                "AI Lead Scoring", "AI Follow-up Suggestions", "AI Revenue Forecasting",
                "AI Contact Summaries", "AI Priority Alerts"
              ].map((feat) => (
                <button
                  key={feat}
                  onClick={() => toggleAiFeature(feat)}
                  className={`px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${
                    aiFeatures.includes(feat) 
                      ? "bg-[#00C2FF]/10 border-[#00C2FF] text-white" 
                      : "bg-[#060D1A] border-white/10 text-slate-450"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${aiFeatures.includes(feat) ? "text-[#00C2FF]" : "text-slate-500"}`} />
                      <span>{feat}</span>
                    </div>
                    {aiFeatures.includes(feat) && <Check className="w-3.5 h-3.5 text-[#00E5A0]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-white/5 pb-2 pt-2">
              <Bell className="w-4 h-4 text-[#00E5A0]" /> Alerts & Reporting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 pl-1">Receive Alerts Via</label>
                <div className="flex flex-col gap-2">
                  {["Email", "WhatsApp", "Browser Notifications"].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => toggleAlertChannel(ch)}
                      className={`px-3 py-1.5 rounded-lg border text-left text-[11px] transition-all ${
                        alertChannels.includes(ch) 
                          ? "bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]" 
                          : "bg-[#060D1A] border-white/10 text-slate-450"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-white/[0.01] border border-white/5 p-3 rounded-xl flex flex-col justify-center">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Daily Summary Report</span>
                  <select 
                    value={dailySummary}
                    onChange={(e) => setDailySummary(e.target.value)}
                    className="bg-[#060D1A] text-white border border-white/10 rounded px-1.5 py-0.5"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Weekly Performance Report</span>
                  <select 
                    value={weeklyReport}
                    onChange={(e) => setWeeklyReport(e.target.value)}
                    className="bg-[#060D1A] text-white border border-white/10 rounded px-1.5 py-0.5"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <div className="flex gap-4 pt-3">
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-3 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="flex-[2] py-3 bg-[#00E5A0] hover:bg-[#00E5A0]/80 text-xs font-bold text-[#081120] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00E5A0]/25 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Secure Mandate Verification */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0057D9]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#00C2FF] font-bold px-2 py-0.5 rounded bg-[#00C2FF]/10 border border-[#00C2FF]/20">
                  SaaS Trial Plan
                </span>
                <h3 className="text-base font-bold text-white mt-2">15-Day Free Trial Period</h3>
                <p className="text-[10.5px] text-slate-400 mt-1 leading-relaxed">
                  Start testing NexDial with full access. After the trial, auto-renewal begins at your selected plan rate.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-500 uppercase tracking-wide mb-1">Auth Charge</p>
                <p className="text-2xl font-black text-white">₹1</p>
                <p className="text-[9px] text-[#00E5A0] font-bold">Verification Only</p>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-[#050A15] border border-[#00C2FF]/20 rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-wider text-[#00C2FF] font-bold">Small Business</p>
                <p className="text-xl font-black text-white mt-1">₹499<span className="text-xs font-normal text-slate-400">/mo</span></p>
                <p className="text-[9px] text-slate-400 mt-0.5">Solo — 10 Users</p>
              </div>
              <div className="bg-[#050A15] border border-purple-500/20 rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-wider text-purple-400 font-bold">Medium Business</p>
                <p className="text-xl font-black text-white mt-1">₹599<span className="text-xs font-normal text-slate-400">/mo</span></p>
                <p className="text-[9px] text-slate-400 mt-0.5">11 — 50 Users</p>
              </div>
            </div>

            <div className="border-t border-white/5 mt-4 pt-4 flex justify-between text-[10px] text-slate-450">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00E5A0]" /> Secure Mandate</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" /> Cancel Anytime</span>
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-purple-400" /> Auto-Pay Enabled</span>
            </div>
          </div>

          {/* T&C Acceptance Gate */}
          <div className="bg-[#050A15] border border-white/10 rounded-xl p-4 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group" htmlFor="terms-checkbox">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  termsAccepted
                    ? "bg-[#00E5A0] border-[#00E5A0]"
                    : "border-white/20 group-hover:border-white/40"
                }`}>
                  {termsAccepted && <Check className="w-2.5 h-2.5 text-[#050A15]" strokeWidth={3} />}
                </div>
              </div>
              <p className="text-[10.5px] text-slate-400 leading-relaxed">
                I have read and agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-semibold">Terms &amp; Conditions</a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] hover:underline font-semibold">Privacy Policy</a>.
                I understand that <strong className="text-white">₹1 will be charged today</strong> as a Razorpay mandate authorization, and my plan will <strong className="text-white">auto-renew after the 15-day free trial</strong> at my selected plan rate. I can cancel anytime.
              </p>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(5)}
              className="flex-1 py-3 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleRazorpaySetup}
              disabled={loadingPayment || !termsAccepted}
              title={!termsAccepted ? "Please accept the Terms & Conditions to continue" : ""}
              className={`flex-[2] py-3 text-xs font-bold text-white rounded-xl transition-all flex items-center justify-center gap-2 ${
                termsAccepted
                  ? "bg-[#0057D9] hover:bg-[#0057D9]/90 shadow-lg shadow-[#0057D9]/25 cursor-pointer"
                  : "bg-white/5 border border-white/10 cursor-not-allowed opacity-60"
              }`}
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

      {/* STEP 7: Loader & Final Submit Provisioner */}
      {step === 7 && (
        <div className="space-y-8 py-6 text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-[#00E5A0]/20 rounded-full blur-lg animate-pulse" />
            <div className="absolute inset-0 border-2 border-[#00E5A0]/20 rounded-full" />
            <div className="absolute inset-0 border-2 border-t-[#00E5A0] rounded-full animate-spin" />
            <div className="absolute inset-2 bg-[#081120] rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-[#00E5A0]">{progress}%</span>
            </div>
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-white">Welcome to NexDial 🚀</h3>
            <p className="text-xs text-slate-400 font-medium">Your workspace is being prepared.</p>
            <p className="text-[10.5px] text-[#00C2FF] leading-normal animate-pulse min-h-[30px] mt-2 font-mono">
              {progressStatus}
            </p>
          </div>

          {/* Action checkboxes */}
          <div className="max-w-sm mx-auto bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-left space-y-2 text-xs">
            <p className="text-[9.5px] uppercase font-bold text-slate-500 mb-2.5">NexDial Ingestion Pipeline</p>
            {[
              "Create your CRM workspace",
              "Generate your sales pipeline",
              "Configure AI lead scoring",
              "Set up team permissions",
              "Enable reporting dashboard",
              "Prepare communication inbox"
            ].map((action) => {
              const isDone = completedActions.includes(action);
              return (
                <div key={action} className="flex items-center gap-2.5 py-0.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${isDone ? 'bg-[#00E5A0] border-[#00E5A0] text-slate-900' : 'border-white/10 bg-white/5'}`}>
                    {isDone ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <div className="w-1 h-1 bg-white/20 rounded-full" />}
                  </div>
                  <span className={`text-[11px] ${isDone ? 'text-white font-medium' : 'text-slate-500'}`}>
                    {action}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00C2FF] to-[#00E5A0] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
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
