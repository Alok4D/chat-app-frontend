"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Send,
  Sparkles,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const CHAT_MSGS = [
  {
    id: 1,
    from: "them",
    text: "Hey! How are you doing?",
    time: "2:30 PM",
    sender: "Alice Johnson",
    initials: "AJ",
  },
  {
    id: 2,
    from: "me",
    text: "I'm doing great! How about you?",
    time: "2:31 PM",
  },
  {
    id: 3,
    from: "them",
    text: "I'm good too! Just working on a new project.",
    time: "2:31 PM",
    sender: "Alice Johnson",
    initials: "AJ",
  },
  {
    id: 4,
    from: "me",
    text: "That's awesome! What kind of project?",
    time: "2:32 PM",
  },
];

export const ChatPreview: React.FC = () => {
  // Plays once sequentially on load/refresh, then stays permanently visible
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    // 1. Reveal Message 2
    const t1 = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(2);
      }, 600);
    }, 800);

    // 2. Reveal Message 3
    const t2 = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(3);
      }, 700);
    }, 2200);

    // 3. Reveal Message 4 (Floats up from bottom and stays)
    const t3 = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(4);
      }, 800);
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section id="preview" className="py-20 md:py-28 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Main Container (Light, Modern, Seamless with project color palette) ── */}
        <div className="rounded-xs bg-gradient-to-br from-white via-[#F8FAFC] to-[#F5F3FF] border border-[#E2E8F0] overflow-hidden shadow-xl shadow-[#5B4FE1]/5 flex flex-col lg:flex-row min-h-[460px]">
          
          {/* Left: Chat Application Mockup Window */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            
            {/* App Inner Window Card (Matches real app chat interface) */}
            <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-md shadow-slate-200/50 overflow-hidden flex-1 flex flex-col min-h-[380px]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[11.5px] font-bold shadow-xs">
                      AJ
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-[#0F172A] leading-tight">Alice Johnson</p>
                    <p className="text-[11px] text-[#10B981] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      Active now
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#94A3B8]">
                  <button type="button" className="p-1.5 hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-md transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-md transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-1.5 hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Feed with Floating-Up Animation */}
              <div className="flex-1 p-5 space-y-3.5 overflow-hidden flex flex-col justify-end bg-[#F8FAFC]">
                {CHAT_MSGS.slice(0, visibleCount).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2.5 items-end transition-all duration-500 animate-in fade-in slide-in-from-bottom-4`}
                  >
                    {msg.from === "them" && (
                      <div className="w-7 h-7 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[9.5px] font-bold shrink-0 mb-0.5 shadow-2xs">
                        {msg.initials}
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[78%] sm:max-w-[70%] px-4 py-2.5 rounded-xs text-[13px] leading-relaxed shadow-xs ${
                        msg.from === "me"
                          ? "bg-[#5B4FE1] text-white shadow-md shadow-[#5B4FE1]/15"
                          : "bg-white text-[#0F172A] border border-[#E2E8F0]"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1.5 mt-1">
                        <span className={`text-[10px] ${msg.from === "me" ? "text-white/80" : "text-[#94A3B8]"}`}>
                          {msg.time}
                        </span>
                        {msg.from === "me" && (
                          <CheckCheck className="w-3.5 h-3.5 text-white/90" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Floating Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[8.5px] font-bold shadow-2xs">
                      AJ
                    </div>
                    <div className="bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-xs flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE1] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE1] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE1] animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3.5 sm:p-4 bg-white border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xs px-3.5 py-2">
                  <button type="button" className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
                    <Paperclip className="w-4 h-4 rotate-45" />
                  </button>
                  <span className="flex-1 text-[12.5px] text-[#94A3B8]">Type a message...</span>
                  <button type="button" className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                  <div className="w-7 h-7 rounded-xs bg-[#5B4FE1] flex items-center justify-center text-white shrink-0 hover:bg-[#4E39E0] transition-colors cursor-pointer shadow-xs">
                    <Send className="w-3.5 h-3.5 -rotate-12" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Pitch & Feature Highlights Column */}
          <div className="flex flex-col justify-center px-8 sm:px-12 py-10 lg:max-w-[420px] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] bg-white/70 backdrop-blur-xs">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#EDE9FE] border border-[#DDD6FE] text-[#5B4FE1] text-xs font-bold uppercase tracking-wider mb-5 w-fit shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#5B4FE1] text-[#5B4FE1]" />
              <span>LIVE INTERACTIVE DEMO</span>
            </div>

            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0F172A] leading-tight mb-4 font-sans tracking-tight">
              Real-time messaging, <br />
              <span className="text-[#5B4FE1]">zero latency.</span>
            </h2>

            <p className="text-[14.5px] text-[#64748B] leading-relaxed mb-7">
              Watch conversations update instantly. Powered by modern WebSockets for ultra-fast, smooth, and reliable messaging across all devices.
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] flex items-center justify-center text-[#5B4FE1] shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">Instant &lt; 50ms message delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] flex items-center justify-center text-[#5B4FE1] shrink-0">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">Seamless sync across desktop & mobile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] flex items-center justify-center text-[#5B4FE1] shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">Secure & private conversations</span>
              </div>
            </div>

            <Link
              href={ROUTES.CHAT}
              className="inline-flex items-center justify-center gap-2.5 text-[14px] font-bold text-white px-7 py-3.5 rounded-xs bg-[#5B4FE1] hover:bg-[#4E39E0] shadow-md shadow-[#5B4FE1]/25 transition-all w-fit hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Start Chatting Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ChatPreview;
