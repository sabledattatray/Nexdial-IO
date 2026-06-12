"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InboxRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/crm");
  }, [router]);

  return null;
}
