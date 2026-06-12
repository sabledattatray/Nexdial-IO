"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Users, Building2, CalendarCheck, Clock, BarChart3, ThumbsUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "K+",
    prefix: "",
    label: "Leads Tracked",
    description: "Organized in unified inbox",
    color: "#0057D9",
    gradient: "from-[#0057D9] to-[#00C2FF]",
  },
  {
    icon: Building2,
    value: 1000,
    suffix: "+",
    prefix: "",
    label: "Businesses",
    description: "Trusting NexDial daily",
    color: "#00C2FF",
    gradient: "from-[#00C2FF] to-[#00E5A0]",
  },
  {
    icon: CalendarCheck,
    value: 2,
    suffix: "M+",
    prefix: "",
    label: "Follow-ups",
    description: "Automated & manual actions",
    color: "#00E5A0",
    gradient: "from-[#00E5A0] to-[#00C896]",
  },
  {
    icon: Clock,
    value: 2,
    suffix: " min",
    prefix: "< ",
    label: "Avg. Response",
    description: "From submission to contact",
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#A78BFA]",
  },
  {
    icon: BarChart3,
    value: 35,
    suffix: "%",
    prefix: "",
    label: "Conversion Lift",
    description: "Increase in closed deals",
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FBBF24]",
  },
  {
    icon: ThumbsUp,
    value: 94,
    suffix: "%",
    prefix: "",
    label: "Retention Rate",
    description: "Average customer retention",
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
  },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  prefix = "", 
  isDecimal 
}: { 
  value: number; 
  suffix: string; 
  prefix?: string; 
  isDecimal?: boolean; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = value * eased;

      if (ref.current) {
        if (isDecimal) {
          ref.current.textContent = prefix + current.toFixed(2) + suffix;
        } else {
          ref.current.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value, suffix, prefix, isDecimal]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function LiveStatistics() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00C2FF] uppercase tracking-widest mb-4">
            Platform Metrics
          </p>
          <h2 className="section-title text-white mb-4">
            Powering <span className="gradient-text-blue">Small Business</span> Success
          </h2>
          <p className="section-subtitle mx-auto">
            Real-time metrics demonstrating how NexDial drives growth, retention, and response speed for businesses
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <div className="glass-card group hover:border-white/[0.12] transition-all duration-500 p-6 text-center relative overflow-hidden h-full">
                {/* Glow */}
                <div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 flex items-center justify-center mx-auto mb-4`}
                    style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>

                  <div
                    className={`text-3xl lg:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      isDecimal={stat.value % 1 !== 0}
                    />
                  </div>

                  <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                  <p className="text-xs text-[#64748B]">{stat.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
