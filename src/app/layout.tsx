import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexdial-xi.vercel.app"),
  title: {
    default: "NexDial — Unified Business Communication Inbox & CRM",
    template: "%s | NexDial",
  },
  description:
    "The simplest and fastest way for small businesses to never lose a customer conversation again. A lightweight CRM and unified customer inbox replacing scattered WhatsApp and Excel workflows.",
  keywords: [
    "CRM for small business",
    "lead management software",
    "WhatsApp CRM alternative",
    "unified customer inbox",
    "small business CRM",
    "lead tracking system",
    "follow-up management",
  ],
  authors: [{ name: "NexDial" }],
  creator: "NexDial",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexdial.io",
    siteName: "NexDial",
    title: "NexDial — Unified Business Communication Inbox & CRM",
    description:
      "A lightweight CRM and unified customer inbox replacing scattered WhatsApp and Excel workflows for small businesses.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexDial — Unified Business Communication Inbox & CRM",
    description:
      "A lightweight CRM and unified customer inbox replacing scattered WhatsApp and Excel workflows.",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#081120" },
    { media: "(prefers-color-scheme: light)", color: "#4F46E5" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
