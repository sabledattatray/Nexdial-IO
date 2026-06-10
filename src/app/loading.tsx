export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#081120] flex flex-col items-center justify-center">
      {/* Animated brand spinner */}
      <div className="relative w-16 h-16 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#0057D9]/20" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00C2FF] border-r-[#00E5A0] animate-spin" />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
        </div>
      </div>

      {/* Skeleton content blocks */}
      <div className="w-full max-w-2xl px-6 space-y-4">
        <div className="h-8 bg-white/[0.04] rounded-xl w-3/4 mx-auto animate-pulse" />
        <div className="h-4 bg-white/[0.03] rounded-lg w-1/2 mx-auto animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="flex gap-3 justify-center mt-6">
          <div className="h-10 w-32 bg-white/[0.04] rounded-xl animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="h-10 w-32 bg-white/[0.03] rounded-xl animate-pulse" style={{ animationDelay: "450ms" }} />
        </div>
      </div>
    </div>
  );
}
