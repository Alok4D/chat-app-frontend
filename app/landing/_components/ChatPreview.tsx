import React from "react";
import { MessageSquare, Send, CheckCheck, Smile, Pin, Users, MoreVertical } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export const ChatPreview: React.FC = () => {
  return (
    <section id="preview" className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest font-mono text-indigo-400 mb-3">
            Live Interface Preview
          </h2>
          <p className="text-3xl font-bold text-white tracking-tight">
            Sleek Glassmorphic Design Built for Focus
          </p>
        </div>

        {/* Mock Window Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden shadow-blue-500/5">
          {/* Top Window Bar */}
          <div className="h-10 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">pulsechat.app/chat</span>
            <div className="w-12" />
          </div>

          {/* Chat Window Grid Mock */}
          <div className="grid grid-cols-1 md:grid-cols-3 h-[460px] text-left">
            {/* Sidebar Mock */}
            <div className="hidden md:flex flex-col border-r border-slate-800 bg-slate-950/60 p-3 space-y-2">
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Channels</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono">
                  3 active
                </span>
              </div>

              <div className="p-2.5 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center gap-3">
                <Avatar name="Design & Core" isGroup size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate">Design & Core</span>
                    <span className="text-[10px] text-blue-400">Just now</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">Marcus: Pushing the schema</p>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-900/40 border border-transparent hover:border-slate-800 flex items-center gap-3">
                <Avatar name="Sarah Chen" isOnline showStatus size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate">Sarah Chen</span>
                    <span className="text-[10px] text-slate-500">5m</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">The new UI looks pristine! 🌟</p>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-900/40 border border-transparent hover:border-slate-800 flex items-center gap-3">
                <Avatar name="Marcus Vance" isOnline showStatus size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate">Marcus Vance</span>
                    <span className="text-[10px] text-slate-500">2h</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">WebSocket handlers ready.</p>
                </div>
              </div>
            </div>

            {/* Main Chat Mock */}
            <div className="col-span-2 flex flex-col justify-between bg-slate-950/40 p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <Avatar name="Design & Core" isGroup size="sm" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Design & Frontend Core</h4>
                    <p className="text-[10px] text-slate-400">4 members • 3 online</p>
                  </div>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </div>

              {/* Messages Body */}
              <div className="space-y-4 py-4">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar name="Sarah Chen" size="xs" className="mt-1" />
                  <div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                      Hey team, let&apos;s review the latest message bubble animations and optimistic state updates.
                    </div>
                    <span className="text-[10px] text-slate-500 ml-1">11:42 AM</span>
                  </div>
                </div>

                <div className="flex gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <div>
                    <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs text-white shadow-md shadow-blue-500/20">
                      Just integrated everything into Redux Toolkit. Real-time updates feel instant! 🚀
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-blue-200 mt-1">
                      <span>11:43 AM</span>
                      <CheckCheck className="w-3 h-3 text-sky-300" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 pl-8 italic">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Marcus Vance is typing...
                </div>
              </div>

              {/* Input Bar Mock */}
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800">
                <input
                  type="text"
                  readOnly
                  placeholder="Type a message to the team..."
                  className="flex-1 bg-transparent text-xs text-slate-300 px-2 focus:outline-none"
                />
                <button className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
