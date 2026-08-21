import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const CTA: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-indigo-950/60 to-purple-950/40 backdrop-blur-2xl shadow-2xl text-center">
          {/* Subtle Glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started In Seconds</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Team&apos;s Real-Time Communication?
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              Experience zero-lag messaging, instant group channel creation, and a seamless developer-friendly API.
            </p>

            <div className="pt-2">
              <a
                href={ROUTES.LOGIN}
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Launch Chat App Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
