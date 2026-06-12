import { 
  Share2, Users, Camera, Briefcase, Video, 
  MessageSquare, Phone, Mail, 
  Code, FormInput, MessageCircle, 
  Database, ShoppingCart, CreditCard, Calendar
} from "lucide-react";

export default function MarketplaceTab() {
  const categories = [
    {
      title: "Social Media",
      description: "Capture leads from social ads and campaigns.",
      items: [
        { name: "Facebook Lead Ads", desc: "Sync FB page leads", icon: Users, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10", border: "hover:border-[#1877F2]/50", status: "OFFICIAL" },
        { name: "Instagram Business", desc: "Sync IG forms", icon: Camera, color: "text-[#E1306C]", bg: "bg-[#E1306C]/10", border: "hover:border-[#E1306C]/50", status: "OFFICIAL" },
        { name: "LinkedIn Gen Forms", desc: "B2B pipeline growth", icon: Briefcase, color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/10", border: "hover:border-[#0A66C2]/50", status: "COMING SOON" },
        { name: "TikTok Lead Gen", desc: "Sync viral campaigns", icon: Video, color: "text-white", bg: "bg-white/10", border: "hover:border-white/50", status: "COMING SOON" }
      ]
    },
    {
      title: "Communication Channels",
      description: "Funnel chats and calls into the CRM.",
      items: [
        { name: "WhatsApp Business", desc: "Official Meta API sync", icon: MessageSquare, color: "text-[#25D366]", bg: "bg-[#25D366]/10", border: "hover:border-[#25D366]/50", status: "OFFICIAL" },
        { name: "Telegram Bot", desc: "Sync channel leads", icon: MessageCircle, color: "text-[#0088cc]", bg: "bg-[#0088cc]/10", border: "hover:border-[#0088cc]/50", status: "COMING SOON" },
        { name: "Call Tracking", desc: "Log incoming calls", icon: Phone, color: "text-purple-400", bg: "bg-purple-400/10", border: "hover:border-purple-400/50", status: "COMING SOON" },
        { name: "Email Inbox", desc: "Parse lead emails", icon: Mail, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "hover:border-yellow-400/50", status: "COMING SOON" }
      ]
    },
    {
      title: "Website Lead Sources",
      description: "Turn your traffic into sales pipeline.",
      items: [
        { name: "Embedded Form", desc: "Drop-in HTML form", icon: Code, color: "text-[#00C2FF]", bg: "bg-[#00C2FF]/10", border: "hover:border-[#00C2FF]/50", status: "OFFICIAL" },
        { name: "Landing Pages", desc: "Host custom pages", icon: FormInput, color: "text-pink-400", bg: "bg-pink-400/10", border: "hover:border-pink-400/50", status: "COMING SOON" }
      ]
    },
    {
      title: "CRM & Sales",
      description: "Two-way sync with other CRMs.",
      items: [
        { name: "HubSpot", desc: "Sync contacts & deals", icon: Database, color: "text-[#FF7A59]", bg: "bg-[#FF7A59]/10", border: "hover:border-[#FF7A59]/50", status: "COMING SOON" },
        { name: "Salesforce", desc: "Enterprise sync", icon: Database, color: "text-[#00A1E0]", bg: "bg-[#00A1E0]/10", border: "hover:border-[#00A1E0]/50", status: "COMING SOON" }
      ]
    },
    {
      title: "Payments & Ecommerce",
      description: "Create leads from transactions.",
      items: [
        { name: "Stripe", desc: "Sync new customers", icon: CreditCard, color: "text-[#635BFF]", bg: "bg-[#635BFF]/10", border: "hover:border-[#635BFF]/50", status: "COMING SOON" },
        { name: "Shopify", desc: "Sync store orders", icon: ShoppingCart, color: "text-[#96BF48]", bg: "bg-[#96BF48]/10", border: "hover:border-[#96BF48]/50", status: "COMING SOON" }
      ]
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">App Marketplace</h2>
        <p className="text-sm text-slate-400">Browse and connect 40+ third-party tools to automatically sync leads.</p>
      </div>

      <div className="space-y-12 pb-12">
        {categories.map((category, idx) => (
          <div key={idx}>
            <div className="mb-4 border-b border-white/5 pb-2">
              <h3 className="text-lg font-bold text-white">{category.title}</h3>
              <p className="text-sm text-slate-400">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isAvailable = item.status === "OFFICIAL";
                return (
                  <div key={itemIdx} className={`bg-[#020610]/80 border border-white/5 ${item.border} rounded-xl p-5 transition-colors group flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded ${isAvailable ? 'text-green-400 bg-green-400/10' : 'text-slate-400 bg-white/5'}`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-2 flex-1">{item.desc}</p>
                    <button 
                      disabled={!isAvailable}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isAvailable 
                          ? 'bg-white/5 hover:bg-white/10 text-white' 
                          : 'bg-transparent border border-white/5 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      {isAvailable ? "Connect" : "Waitlist"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
