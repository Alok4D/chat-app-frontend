"use client";

import React from "react";
import Image from "next/image";
import {
  Zap,
  MessageSquare,
  Users,
  ShieldCheck,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Layers,
} from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const FEATURE_CARDS = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#5B4FE1]" />,
    title: "Real-time Messaging",
    description: "Instant message delivery with real-time updates",
  },
  {
    icon: <Users className="w-5 h-5 text-[#5B4FE1]" />,
    title: "Group Conversations",
    description: "Create groups and chat with multiple members",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#5B4FE1]" />,
    title: "Secure & Private",
    description: "Your conversations are encrypted and secure",
  },
  {
    icon: <Layers className="w-5 h-5 text-[#5B4FE1]" />,
    title: "Developer Friendly",
    description: "Well-documented APIs for seamless integration",
  },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Hero Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[520px]">
          
          {/* Left Column: Text + Badges + CTAs (5 Cols) */}
          <div className="lg:col-span-5 text-left z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE]/90 border border-[#DDD6FE] text-[#5B4FE1] text-xs font-semibold mb-6 shadow-2xs">
              <Zap className="w-3.5 h-3.5 fill-[#5B4FE1] text-[#5B4FE1]" />
              <span>Real-time • Secure • Simple</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F172A] tracking-tight leading-[1.08] mb-5 font-sans">
              Real-time Chat <br />
              Made <span className="text-[#5B4FE1]">Simple</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed mb-8 max-w-md">
              Connect with friends, colleagues, and communities instantly with our real-time chat application.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={ROUTES.CHAT}
                className="inline-flex items-center justify-center text-[14.5px] font-semibold text-white px-7 py-3 rounded-xl bg-[#5B4FE1] hover:bg-[#4E39E0] shadow-md shadow-[#5B4FE1]/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Start Chatting
              </a>
              <a
                href="https://frontend-task-chatapp.onrender.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-[14.5px] font-semibold text-[#0F172A] px-7 py-3 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-all shadow-2xs cursor-pointer"
              >
                View API Docs
              </a>
            </div>
          </div>

          {/* Right Column: Chat Mockup with background-banner.png (7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end min-h-[520px]">
            
            {/* Background Purple Cloud Banner (Full large size guaranteed) */}
            <div className="absolute right-0 top-0 w-[780px] sm:w-[880px] lg:w-[940px] h-[520px] lg:h-[560px] pointer-events-none z-0">
              <Image
                src="/images/background-banner.png"
                alt="Banner background waves"
                fill
                priority
                className="object-contain object-right"
              />
            </div>

            {/* Chat Box Card (White Card floating on top of banner) */}
            <div className="relative z-10 w-full max-w-[450px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl shadow-[#5B4FE1]/10 p-5 select-none my-4">
              
              {/* Chat Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                      alt="Team Hub"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">Team Hub</h3>
                    <p className="text-[11.5px] text-[#64748B] font-medium mt-0.5">8 members</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Overlapping Avatar Stack */}
                  <div className="flex items-center -space-x-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"
                        alt="Member 1"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                        alt="Member 2"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
                        alt="Member 3"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="w-6 h-6 rounded-full bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      +2
                    </span>
                  </div>

                  <button className="text-[#94A3B8] hover:text-[#0F172A] p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-4 space-y-4">
                
                {/* 1. Received Message (Alice Johnson) */}
                <div className="flex items-start gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
                      alt="Alice Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-[#0F172A]">Alice Johnson</span>
                      <span className="text-[11px] text-[#94A3B8]">2:30 PM</span>
                    </div>
                    <p className="text-[13px] text-[#334155] mt-0.5">
                      Hey everyone! How&apos;s the project going?
                    </p>
                  </div>
                </div>

                {/* 2. Sent Message (You) */}
                <div className="flex items-start gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                      alt="You"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-bold text-[#0F172A]">You</span>
                      <span className="text-[10.5px] text-[#94A3B8]">2:31 PM</span>
                    </div>
                    <p className="text-[13px] text-[#0F172A] leading-relaxed">
                      Going great! Just finished the UI design. 🎉
                    </p>
                  </div>
                </div>

                {/* 3. Received Message (Bob Smith) */}
                <div className="flex items-start gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                      alt="Bob Smith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-[#0F172A]">Bob Smith</span>
                      <span className="text-[11px] text-[#94A3B8]">2:32 PM</span>
                    </div>
                    <p className="text-[13px] text-[#334155] mt-0.5">
                      Looks amazing! Can&apos;t wait to see the final result.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Mockup Input Bar */}
              <div className="pt-2">
                <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2">
                  <button type="button" className="text-[#94A3B8]">
                    <Paperclip className="w-4 h-4 rotate-45" />
                  </button>
                  <span className="flex-1 text-[12.5px] text-[#94A3B8]">Type a message...</span>
                  <button type="button" className="text-[#94A3B8]">
                    <Smile className="w-4 h-4" />
                  </button>
                  <div className="w-7 h-7 rounded-full bg-[#5B4FE1] flex items-center justify-center text-white shrink-0">
                    <Send className="w-3.5 h-3.5 -rotate-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom 4 Feature Cards (Attached flush under background shape) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 sm:mt-6 relative z-10">
          {FEATURE_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#5B4FE1]/30 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                {card.icon}
              </div>
              <h4 className="text-[15px] font-bold text-[#0F172A] mb-1.5">
                {card.title}
              </h4>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
