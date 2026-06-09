import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DBS Mintek — AI-Powered Enterprise Contact Center Platform",
    template: "%s | DBS Mintek",
  },
  description:
    "Transform customer conversations into business growth with AI-powered omnichannel customer experience solutions. Enterprise-grade CRM, dialer, analytics, and multi-tenant SaaS platform.",
  keywords: [
    "contact center",
    "AI platform",
    "CRM",
    "dialer",
    "customer experience",
    "omnichannel",
    "SaaS",
    "enterprise",
    "call center",
    "BPO",
  ],
  authors: [{ name: "DBS Mintek Pvt. Ltd." }],
  creator: "DBS Mintek Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dbsmintek.com",
    siteName: "DBS Mintek",
    title: "DBS Mintek — AI-Powered Enterprise Contact Center Platform",
    description:
      "Transform customer conversations into business growth with AI-powered omnichannel customer experience solutions.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DBS Mintek — AI-Powered Enterprise Contact Center Platform",
    description:
      "Transform customer conversations into business growth with AI-powered omnichannel CX solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
