import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";

/* ── Below-the-fold sections: lazy-loaded to reduce initial JS bundle & hydration blocking ── */
const TrustIndicators = dynamic(
  () => import("@/components/home/TrustIndicators").then((m) => m.TrustIndicators),
  { ssr: true }
);

const ServicesShowcase = dynamic(
  () => import("@/components/home/ServicesShowcase").then((m) => m.ServicesShowcase),
  { ssr: true }
);

const PlatformOverview = dynamic(
  () => import("@/components/home/PlatformOverview").then((m) => m.PlatformOverview),
  { ssr: true }
);

const CaseStudies = dynamic(
  () => import("@/components/home/CaseStudies").then((m) => m.CaseStudies),
  { ssr: true }
);

const GlobalOperationsMap = dynamic(
  () => import("@/components/home/GlobalOperationsMap").then((m) => m.GlobalOperationsMap),
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
      
      <Suspense>
        <TrustIndicators />
      </Suspense>

      {/* Below-the-fold — deferred rendering via content-visibility */}
      <Suspense>
        <section className="content-auto">
          <ServicesShowcase />
        </section>
      </Suspense>
      <Suspense>
        <section className="content-auto">
          <PlatformOverview />
        </section>
      </Suspense>
      <Suspense>
        <section className="content-auto">
          <CaseStudies />
        </section>
      </Suspense>
      
      <Suspense>
        <section className="content-auto">
          <GlobalOperationsMap />
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
export const revalidate = 86400;
