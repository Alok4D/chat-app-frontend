import React from "react";
import { MessageSquare, Sparkles, Heart } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">PulseChat</span>
            <span className="text-xs text-slate-500 ml-2">© {new Date().getFullYear()} PulseChat Inc.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href={ROUTES.CHAT} className="hover:text-white transition-colors">
              Chat App
            </a>
            <a href={ROUTES.LOGIN} className="hover:text-white transition-colors">
              Sign In
            </a>
            <a href={ROUTES.API_DOCS} className="hover:text-white transition-colors">
              API Documentation
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
