import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { LiveStatistics } from "@/components/home/LiveStatistics";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { PlatformOverview } from "@/components/home/PlatformOverview";

/* ── Below-the-fold sections: lazy-loaded to reduce initial JS bundle ── */
const CaseStudies = dynamic(
  () => import("@/components/home/CaseStudies").then((m) => m.CaseStudies),
  { ssr: true }
);
const GlobalPresence = dynamic(
  () => import("@/components/home/GlobalPresence").then((m) => m.GlobalPresence),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/home/ContactSection").then((m) => m.ContactSection),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="relative bg-[#081120] overflow-hidden">
      {/* Background noise and gradients */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      {/* Above-the-fold — eagerly loaded for fast FCP/LCP */}
      <HeroSection />
      <TrustIndicators />
      <LiveStatistics />

      {/* Below-the-fold — deferred rendering via content-visibility */}
      <section className="content-auto">
        <ServicesShowcase />
      </section>
      <section className="content-auto">
        <PlatformOverview />
      </section>
      <Suspense>
        <section className="content-auto">
          <CaseStudies />
        </section>
      </Suspense>
      <Suspense>
        <section className="content-auto">
          <GlobalPresence />
        </section>
      </Suspense>
      <Suspense>
        <section className="content-auto">
          <ContactSection />
        </section>
      </Suspense>
    </div>
  );
}
