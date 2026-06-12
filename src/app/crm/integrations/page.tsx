"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard,
  Store,
  Route,
  Webhook,
  FormInput,
  Activity,
  Terminal,
  ChevronRight,
  Search,
  SlidersHorizontal
} from "lucide-react";

// Components for Tabs
import DashboardTab from "../../../components/crm/integrations/DashboardTab";
import MarketplaceTab from "../../../components/crm/integrations/MarketplaceTab";
import RoutingTab from "../../../components/crm/integrations/RoutingTab";
import WebhooksTab from "../../../components/crm/integrations/WebhooksTab";
import FormBuilderTab from "../../../components/crm/integrations/FormBuilderTab";
import SyncLogsTab from "../../../components/crm/integrations/SyncLogsTab";
import ApiCenterTab from "../../../components/crm/integrations/ApiCenterTab";

export default function IntegrationsPlatformPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Connected apps & health" },
    { id: "marketplace", label: "App Marketplace", icon: Store, desc: "Browse 40+ integrations" },
    { id: "routing", label: "Lead Routing", icon: Route, desc: "IF/THEN automation rules" },
    { id: "webhooks", label: "Webhooks", icon: Webhook, desc: "Custom endpoints & secrets" },
    { id: "forms", label: "Form Builder", icon: FormInput, desc: "Drag & drop website forms" },
    { id: "logs", label: "Sync Logs", icon: Activity, desc: "Live feed of incoming data" },
    { id: "api", label: "API Center", icon: Terminal, desc: "Developer keys & docs" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Integrations Platform</h1>
          <p className="text-slate-400 max-w-2xl">Connect your external platforms to instantly pipe leads into NexDial, and set up advanced routing rules to automatically assign them to your team.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#050A15] border border-white/10 hover:bg-white/5 rounded-lg text-sm text-white font-medium transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Global Settings
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Sidebar Navigation */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto w-full lg:w-[280px] pb-2 lg:pb-0 custom-scrollbar shrink-0 relative z-30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all whitespace-nowrap min-w-fit lg:min-w-0 ${
                  isActive 
                    ? "bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-white" 
                    : "bg-[#050A15] border border-white/5 text-slate-400 hover:bg-white/[0.02]"
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-[#00C2FF]/20" : "bg-white/5"}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#00C2FF]" : "text-slate-400"}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{tab.label}</h3>
                  <p className="text-[11px] opacity-70 mt-0.5 hidden lg:block">{tab.desc}</p>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-[#00C2FF] hidden lg:block" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full bg-[#050A15] border border-white/10 rounded-2xl min-h-[700px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "marketplace" && <MarketplaceTab />}
              {activeTab === "routing" && <RoutingTab />}
              {activeTab === "webhooks" && <WebhooksTab />}
              {activeTab === "forms" && <FormBuilderTab />}
              {activeTab === "logs" && <SyncLogsTab />}
              {activeTab === "api" && <ApiCenterTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
