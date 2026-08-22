"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Send, Sparkles, Check, CheckCheck } from "lucide-react";
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
        
        {/* ── Main Container (Rounded-xs & Project Color System) ── */}
        <div className="rounded-md bg-[#1A1A2E] border border-[#2D2D4E] overflow-hidden shadow-2xl shadow-black/25 flex flex-col lg:flex-row min-h-[440px]">
          
          {/* Left: Chat Application Mockup Window */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            
            {/* App Inner Window Card */}
            <div className="bg-[#131326] rounded-xs border border-[#2B2B4D] overflow-hidden flex-1 flex flex-col min-h-[350px]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-[#2B2B4D] bg-[#171730]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                      AJ
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#171730]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white leading-tight">Alice Johnson</p>
                    <p className="text-[10.5px] text-[#10B981] font-medium">Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[11px]">Real-time Connected</span>
                </div>
              </div>

              {/* Messages Feed with Floating-Up Animation */}
              <div className="flex-1 p-4 sm:p-5 space-y-3.5 overflow-hidden flex flex-col justify-end">
                {CHAT_MSGS.slice(0, visibleCount).map((msg, i) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2.5 items-end transition-all duration-500 animate-in fade-in slide-in-from-bottom-4`}
                  >
                    {msg.from === "them" && (
                      <div className="w-7 h-7 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[9px] font-bold shrink-0 mb-0.5">
                        {msg.initials}
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[78%] sm:max-w-[70%] px-3.5 py-2.5 rounded-xs text-[12.5px] leading-relaxed shadow-sm ${
                        msg.from === "me"
                          ? "bg-[#5B4FE1] text-white border border-[#6B5FED]"
                          : "bg-[#222240] text-[#E2E8F0] border border-[#32325A]"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-[9.5px] ${msg.from === "me" ? "text-white/70" : "text-[#94A3B8]"}`}>
                          {msg.time}
                        </span>
                        {msg.from === "me" && (
                          <CheckCheck className="w-3 h-3 text-white/80" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Floating Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-6 h-6 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white text-[8px] font-bold">
                      AJ
                    </div>
                    <div className="bg-[#222240] border border-[#32325A] px-3 py-2 rounded-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 bg-[#171730] border-t border-[#2B2B4D]">
                <div className="flex items-center gap-2.5 bg-[#101024] border border-[#303058] rounded-xs px-3.5 py-2">
                  <span className="flex-1 text-[12px] text-[#71719A]">Type a message...</span>
                  <div className="w-7 h-7 rounded-xs bg-[#5B4FE1] flex items-center justify-center text-white shrink-0 hover:bg-[#4E39E0] transition-colors cursor-pointer">
                    <Send className="w-3.5 h-3.5 -rotate-12" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: CTA Pitch & Description Column */}
          <div className="flex flex-col justify-center px-8 sm:px-12 py-10 lg:max-w-[380px] border-t lg:border-t-0 lg:border-l border-[#2D2D4E] bg-[#16162B]">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#5B4FE1]/15 border border-[#5B4FE1]/30 text-[#A78BFA] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>LIVE PREVIEW</span>
            </div>

            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-white leading-tight mb-3 font-sans">
              Experience Chatter <br />
              <span className="text-[#8B5CF6]">in Real-time</span>
            </h2>

            <p className="text-[14px] text-[#9CA3AF] leading-relaxed mb-8">
              See how instant and responsive conversation delivery feels. Connect without lag, sync across devices, and communicate seamlessly.
            </p>

            <Link
              href={ROUTES.CHAT}
              className="inline-flex items-center justify-center gap-2.5 text-[14px] font-bold text-white px-6 py-3.5 rounded-xs bg-[#5B4FE1] hover:bg-[#4E39E0] shadow-lg shadow-[#5B4FE1]/30 transition-all w-fit hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Try Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ChatPreview;
