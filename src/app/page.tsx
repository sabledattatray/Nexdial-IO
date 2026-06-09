import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { LiveStatistics } from "@/components/home/LiveStatistics";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { AICapabilities } from "@/components/home/AICapabilities";
import { PlatformOverview } from "@/components/home/PlatformOverview";
import { CaseStudies } from "@/components/home/CaseStudies";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="relative bg-[#081120] overflow-hidden">
      {/* Background noise and gradients */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      {/* Section segments */}
      <HeroSection />
      <TrustIndicators />
      <LiveStatistics />
      <ServicesShowcase />
      <AICapabilities />
      <PlatformOverview />
      <CaseStudies />
      <GlobalPresence />
      <ContactSection />
    </div>
  );
}
