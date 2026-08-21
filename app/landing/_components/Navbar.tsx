"use client";

import React from "react";
import { MessageSquare, ArrowRight, Github, Sparkles } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={ROUTES.LANDING} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">PulseChat</span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#preview" className="hover:text-white transition-colors">
            Live Preview
          </a>
          <a href={ROUTES.API_DOCS} className="hover:text-white transition-colors">
            API Docs
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={ROUTES.LOGIN}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors"
          >
            Sign In
          </a>
          <a
            href={ROUTES.CHAT}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Open App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
