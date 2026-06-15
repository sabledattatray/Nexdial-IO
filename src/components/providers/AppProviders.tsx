"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the providers to split their bundle chunks out of the landing page
const AuthProvider = dynamic(
  () => import("./AuthProvider").then((m) => m.AuthProvider),
  { ssr: true }
);

const QueryProvider = dynamic(
  () => import("./QueryProvider").then((m) => m.QueryProvider),
  { ssr: true }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current route belongs to console/interactive portal or auth flows
  const isConsolePage =
    pathname?.startsWith("/crm") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/supervisor") ||
    pathname?.startsWith("/client-portal") ||
    pathname?.startsWith("/dialer") ||
    pathname?.startsWith("/agent") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/onboarding" ||
    pathname === "/verify-email" ||
    pathname === "/test-payment";

  if (!isConsolePage) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </AuthProvider>
  );
}
