import React from "react";
import Link from "next/navigation";
import { LoginForm } from "../_components/LoginForm";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href={ROUTES.LANDING}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </a>
      </div>

      {/* Brand Watermark */}
      <div className="mb-4 flex items-center gap-2 select-none">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <MessageSquare className="w-4 h-4" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">PulseChat</span>
      </div>

      {/* Login Card */}
      <LoginForm />
    </div>
  );
}
