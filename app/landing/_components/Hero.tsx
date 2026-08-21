import React from "react";
import { ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-center">
      {/* Background radial spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Pill announcement badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-fadeIn">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span>PulseChat 2.0 • Real-Time Engine & High Performance</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Next-Generation{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            Real-Time Messaging
          </span>{" "}
          for High-Velocity Teams
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Engineered with sub-millisecond WebSocket channels, state-of-the-art Redux state synchronization, and an ultra-modern glassmorphic design system.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href={ROUTES.CHAT}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Launch Live Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={ROUTES.API_DOCS}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all"
          >
            <span>Explore API Specs</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-8 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>&lt;20ms Socket Latency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>E2E Token Security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>99.99% Global Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
