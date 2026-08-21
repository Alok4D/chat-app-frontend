import React from "react";
import { ArrowRight, Zap, ShieldCheck, Users, Code2, MessageSquareMore, CheckCheck, Send } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const DEMO_CONVERSATIONS = [
  { name: "Alice Johnson", msg: "Hey! How are you doing?", time: "2:30 PM", badge: 2, color: "#6C63FF", initials: "AJ" },
  { name: "Team Project 🚀", msg: "Bob: Can you share the update?", time: "2:25 PM", badge: 5, color: "#8B5CF6", initials: "TP" },
  { name: "Design Team", msg: "You: Thanks everyone! 🎉", time: "1:45 PM", badge: 0, color: "#06B6D4", initials: "DT" },
  { name: "John Doe", msg: "Sounds good!", time: "1:30 PM", badge: 0, color: "#10B981", initials: "JD" },
  { name: "Random Group 😄😄😄", msg: "Someone: 😂😂😂", time: "12:20 PM", badge: 12, color: "#F59E0B", initials: "RG" },
  { name: "Sarah Wilson", msg: "See you tomorrow!", time: "11:15 AM", badge: 0, color: "#EC4899", initials: "SW" },
  { name: "Dev Squad", msg: "Let's deploy it!", time: "Yesterday", badge: 0, color: "#6C63FF", initials: "DS" },
];

const DEMO_MESSAGES = [
  { text: "Hey! How are you doing?", from: "them", time: "2:30 PM", name: "Alice Johnson" },
  { text: "I'm doing great! How about you?", from: "me", time: "2:31 PM" },
  { text: "I'm good too! Just working on a new project.", from: "them", time: "2:31 PM", name: "Alice Johnson" },
  { text: "That's awesome! What kind of project?", from: "me", time: "2:32 PM" },
  { text: "It's a real-time chat application similar to WhatsApp.", from: "them", time: "2:33 PM", name: "Alice Johnson" },
  { text: "Want to see the UI design?", from: "them", time: "2:33 PM", name: "Alice Johnson" },
  { text: "Sure! Show me... 🎨", from: "me", time: "2:33 PM" },
];

const TRUST_ITEMS = [
  { icon: <Zap className="w-4 h-4" />, label: "Real-time Messaging" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "Secure & Private" },
  { icon: <Users className="w-4 h-4" />, label: "Group Conversations" },
  { icon: <Code2 className="w-4 h-4" />, label: "Developer Friendly" },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-white overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EEF0FF] rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0EDFF] rounded-full blur-[80px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 text-left max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3FF] border border-[#DDD8FF] text-[#6C63FF] text-xs font-semibold mb-7 animate-fadeIn">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
              Real-time · Secure · Simple
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#1A1A2E] leading-[1.12] tracking-tight mb-5">
              Real-time Chat{" "}
              <br />
              Made{" "}
              <span className="text-[#6C63FF]">Simple</span>
            </h1>

            <p className="text-[15.5px] text-[#6B6B80] leading-relaxed mb-8 max-w-lg">
              Connect with friends, colleagues, and communities instantly with our real-time chat application.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href={ROUTES.CHAT}
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-white px-6 py-3 rounded-xl bg-[#6C63FF] hover:bg-[#5a52e8] shadow-lg shadow-[#6C63FF]/30 transition-all hover:scale-105 active:scale-95"
              >
                Start Chatting
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#preview"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#1A1A2E] px-6 py-3 rounded-xl border border-[#E0DFFE] bg-white hover:bg-[#F4F3FF] transition-all"
              >
                View Demo
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-5">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12.5px] text-[#6B6B80] font-medium">
                  <span className="text-[#6C63FF]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat App Preview */}
          <div className="flex-1 w-full max-w-[520px] animate-float">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#6C63FF]/15 border border-[#EEEEFC] bg-[#0D1117]">
              {/* Window bar */}
              <div className="h-9 px-4 bg-[#161B22] border-b border-[#21262D] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C840]" />
                <span className="ml-4 text-[11px] font-mono text-[#8B949E]">Chatter</span>
              </div>

              {/* Chat grid */}
              <div className="flex h-[360px] sm:h-[400px]">
                {/* Sidebar */}
                <div className="hidden sm:flex flex-col w-[200px] border-r border-[#21262D] bg-[#0D1117] overflow-y-auto custom-scrollbar">
                  <div className="p-3 border-b border-[#21262D]">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[#161B22] rounded-lg">
                      <span className="text-[10px] text-[#8B949E] flex-1">Search conversations...</span>
                    </div>
                    {/* Tabs */}
                    <div className="flex gap-1 mt-2">
                      {["All", "Direct", "Groups"].map((tab, i) => (
                        <span
                          key={tab}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            i === 0
                              ? "bg-[#6C63FF] text-white"
                              : "text-[#8B949E] hover:text-white"
                          }`}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-0.5 p-1.5">
                    {DEMO_CONVERSATIONS.map((conv, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded-lg ${i === 0 ? "bg-[#21262D]" : "hover:bg-[#161B22]"} transition-colors`}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                          style={{ background: conv.color }}
                        >
                          {conv.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#E6EDF3] truncate max-w-[90px]">{conv.name}</span>
                            <span className="text-[9px] text-[#8B949E] shrink-0">{conv.time}</span>
                          </div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[9px] text-[#8B949E] truncate max-w-[90px]">{conv.msg}</span>
                            {conv.badge > 0 && (
                              <span className="bg-[#6C63FF] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                                {conv.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Chat */}
                <div className="flex-1 flex flex-col bg-[#0D1117]">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#21262D]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#6C63FF] flex items-center justify-center text-white text-[10px] font-bold">AJ</div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#E6EDF3]">Alice Johnson</p>
                        <p className="text-[9px] text-[#3FB950]">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {DEMO_MESSAGES.map((msg, i) => (
                      <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[75%] px-3 py-2 rounded-2xl text-[10.5px] leading-relaxed ${
                            msg.from === "me"
                              ? "bg-[#6C63FF] text-white rounded-br-sm"
                              : "bg-[#21262D] text-[#E6EDF3] rounded-bl-sm"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-0.5 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                            <span className={`text-[8.5px] ${msg.from === "me" ? "text-[#C8C3FF]" : "text-[#8B949E]"}`}>{msg.time}</span>
                            {msg.from === "me" && <CheckCheck className="w-2.5 h-2.5 text-[#C8C3FF]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="px-3 pb-3">
                    <div className="flex items-center gap-2 bg-[#161B22] border border-[#30363D] rounded-xl px-3 py-2">
                      <input
                        readOnly
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-[10px] text-[#8B949E] outline-none"
                      />
                      <button className="w-6 h-6 rounded-lg bg-[#6C63FF] flex items-center justify-center">
                        <Send className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
