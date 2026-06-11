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
  metadataBase: new URL("https://nexdial-xi.vercel.app"),
  title: {
    default: "Nexdial — AI-Powered Enterprise Contact Center Platform",
    template: "%s | Nexdial",
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
  authors: [{ name: "Nexdial" }],
  creator: "Nexdial",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexdial.com",
    siteName: "Nexdial",
    title: "Nexdial — AI-Powered Enterprise Contact Center Platform",
    description:
      "Transform customer conversations into business growth with AI-powered omnichannel customer experience solutions.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexdial — AI-Powered Enterprise Contact Center Platform",
    description:
      "Transform customer conversations into business growth with AI-powered omnichannel CX solutions.",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/icon", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: "/icon",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#081120" },
    { media: "(prefers-color-scheme: light)", color: "#4F46E5" },
  ],
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
