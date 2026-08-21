import React from "react";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const CHAT_MSGS = [
  { from: "them", text: "Hey! How are you doing?", time: "2:30 PM", initials: "AJ", color: "#6C63FF" },
  { from: "me", text: "I'm doing great! How about you?", time: "2:31 PM" },
  { from: "them", text: "I'm good too! Just working on a new project.", time: "2:31 PM", initials: "AJ", color: "#6C63FF" },
  { from: "me", text: "That's awesome! What kind of project?", time: "2:32 PM" },
];

export const ChatPreview: React.FC = () => {
  return (
    <section id="preview" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0D1117] overflow-hidden shadow-2xl shadow-black/30 flex flex-col md:flex-row min-h-[340px]">
          {/* Left: Dark app mockup */}
          <div className="flex-1 p-6 md:p-10 flex flex-col gap-4">
            {/* App inner card */}
            <div className="bg-[#161B22] rounded-2xl border border-[#30363D] overflow-hidden flex-1 flex flex-col">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#30363D]">
                <div className="w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-[11px] font-bold">AJ</div>
                <div>
                  <p className="text-[12px] font-semibold text-[#E6EDF3]">Alice Johnson</p>
                  <p className="text-[10px] text-[#3FB950]">Online</p>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-hidden">
                {CHAT_MSGS.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2`}>
                    {msg.from === "them" && (
                      <div className="w-6 h-6 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-[8px] font-bold shrink-0 mt-0.5">
                        {msg.initials}
                      </div>
                    )}
                    <div
                      className={`max-w-[72%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                        msg.from === "me"
                          ? "bg-[#6C63FF] text-white rounded-br-sm"
                          : "bg-[#21262D] text-[#E6EDF3] rounded-bl-sm"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-[9px] mt-0.5 text-right ${msg.from === "me" ? "text-[#C8C3FF]" : "text-[#8B949E]"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 bg-[#0D1117] border border-[#30363D] rounded-xl px-3 py-2.5">
                  <span className="flex-1 text-[11px] text-[#8B949E]">Type a message...</span>
                  <div className="w-7 h-7 rounded-lg bg-[#6C63FF] flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CTA text overlay */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-10 md:max-w-[340px] border-t md:border-t-0 md:border-l border-[#21262D]">
            <span className="text-[11px] text-[#6C63FF] font-semibold uppercase tracking-widest mb-3">LIVE PREVIEW</span>
            <h2 className="text-[26px] font-extrabold text-[#E6EDF3] leading-snug mb-3">
              Experience Chatter in Action
            </h2>
            <p className="text-[13.5px] text-[#8B949E] leading-relaxed mb-7">
              See how smooth and real-time conversations feel. Try our demo and explore the features.
            </p>
            <a
              href={ROUTES.CHAT}
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white px-5 py-3 rounded-xl bg-[#6C63FF] hover:bg-[#5a52e8] shadow-lg shadow-[#6C63FF]/30 transition-all w-fit hover:scale-105 active:scale-95"
            >
              Try Live Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
