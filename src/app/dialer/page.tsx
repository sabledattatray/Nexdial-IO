"use client";

import dynamic from "next/dynamic";

const NexdialApp = dynamic(() => import("@/components/nexdial/App"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center text-slate-400">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xs font-mono">Initializing NexPhone Core v2.6 terminal...</p>
    </div>
  ),
});

export default function DialerPage() {
  return <NexdialApp mode="agent" />;
}
