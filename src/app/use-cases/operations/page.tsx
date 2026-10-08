
"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { 
  Database, Zap, RefreshCw, Clock, Layers, Target, 
  PieChart, Briefcase, MousePointer, Shield, CheckCircle, AlertTriangle,
  Code, Wand2, Link, Wifi, Lock, Smartphone, FileText, TrendingDown,
  LineChart, Package, Settings, Truck, Filter, DollarSign, Megaphone,
  CreditCard, Users, Award, CheckSquare, Calendar, PhoneCall, BarChart,
  TrendingUp, Box, ArrowRight
} from "lucide-react";

const icons = {
  Database, Zap, RefreshCw, Clock, Layers, Target, 
  PieChart, Briefcase, MousePointer, Shield, CheckCircle, AlertTriangle,
  Code, Wand2, Link, Wifi, Lock, Smartphone, FileText, TrendingDown,
  LineChart, Package, Settings, Truck, Filter, DollarSign, Megaphone,
  CreditCard, Users, Award, CheckSquare, Calendar, PhoneCall, BarChart,
  TrendingUp, Box
};

const features = [
  {
    "title": "Inventory Tracking",
    "desc": "Real-time stock level monitoring with automated reorder alerts.",
    "icon": "Package"
  },
  {
    "title": "Production Planning",
    "desc": "Optimize machine and labor scheduling based on demand forecasts.",
    "icon": "Settings"
  },
  {
    "title": "Logistics Optimization",
    "desc": "Track delivery times, route efficiency, and vendor performance.",
    "icon": "Truck"
  }
];

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#081120] pt-28 pb-20 overflow-hidden font-sans text-slate-300">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#0057D9]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#00C2FF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <span className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20">
            Efficiency at Every Step
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mt-8 leading-tight tracking-tight">
            Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00E5A0]">Operations</span>
          </h1>
          <p className="text-[#94A3B8] text-lg sm:text-xl mt-8 leading-relaxed max-w-3xl mx-auto font-light">
            Supply chains, inventory management, and logistics require real-time visibility. We build robust trackers and capacity planning tools that keep your operations running smoothly without the overhead of expensive ERP systems.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="/contact" className="btn-primary text-base !py-3.5 !px-8 flex items-center justify-center gap-2">
              Get a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <AnimatedSection className="mb-32">
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {features.map((feature, idx) => {
              const Icon = icons[feature.icon as keyof typeof icons] || Zap;
              return (
                <StaggerItem key={idx}>
                  <div className="glass-card-strong p-10 h-full relative overflow-hidden group hover:border-white/[0.1] transition-all duration-500 rounded-[2rem]">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00C2FF] blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border bg-[#00C2FF]/5 border-[#00C2FF]/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-[#00C2FF]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{feature.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </AnimatedSection>
        
        {/* CTA Section */}
        <AnimatedSection className="glass-card-strong p-10 lg:p-16 text-center rounded-[2.5rem] relative overflow-hidden border-t border-[#00C2FF]/20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">Streamline Your Supply Chain</h3>
          <p className="text-[#94A3B8] text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain real-time visibility into your entire operation. Build robust trackers that optimize your inventory and logistics today.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 btn-primary !py-3.5 !px-8">
            <Zap className="w-5 h-5" />
            Talk to an Expert
          </a>
        </AnimatedSection>

      </div>
    </div>
  );
}
