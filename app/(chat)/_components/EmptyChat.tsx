import React from "react";
import { MessageSquare, Sparkles, Shield, Zap } from "lucide-react";

export const EmptyChat: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950/60 relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
          <MessageSquare className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Your Messages & Channels
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Select a conversation from the sidebar or start a new group to collaborate with teammates in real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Sync</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sub-millisecond real-time communication powered by WebSockets.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>End-to-End</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Modern client-side encryption and strict token verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
