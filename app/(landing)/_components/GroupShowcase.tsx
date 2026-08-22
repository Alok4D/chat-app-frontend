"use client";

import React from "react";
import { MessageSquare, Sparkles, CheckCircle2, UserPlus, Shield, Users } from "lucide-react";

export const GroupShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Chat Sidebar Mockup Card (Wider & Rounded-none) ── */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start">
            <div className="w-full max-w-[500px] bg-white border border-[#E5E7EB] rounded-none shadow-xl shadow-slate-200/50 flex flex-col h-[440px]">
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2.5 bg-white">
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] flex items-center justify-center text-[#5B4FE1]">
                  <MessageSquare className="w-4 h-4 text-[#5B4FE1]" />
                </div>
                <h3 className="text-[15.5px] font-bold text-[#111827] tracking-tight">Chat</h3>
              </div>

              {/* Conversation List Items */}
              <div className="p-3 space-y-1">
                
                {/* 1. Active Group Item: Design crew */}
                <div className="flex items-center gap-3.5 px-4 py-3 bg-[#EEF0F4] rounded-lg transition-all cursor-pointer">
                  {/* Group Avatar: Sky Blue Circle with DC */}
                  <div className="w-10 h-10 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[12px] font-bold shrink-0 shadow-2xs">
                    DC
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13.5px] font-bold text-[#111827] truncate">
                        Design crew
                      </span>
                      <span className="text-[9px] font-bold text-[#5B4FE1] bg-[#EDE9FE] px-1.5 py-0.5 rounded tracking-wide uppercase">
                        GROUP
                      </span>
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">
                      Ship the landing tonight
                    </p>
                  </div>
                </div>

                {/* 2. Direct Chat: Nazmul */}
                <div className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#F9FAFB] rounded-lg transition-all cursor-pointer">
                  {/* Avatar: Sky Blue Circle with N */}
                  <div className="w-10 h-10 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center text-[13px] font-bold shrink-0 shadow-2xs">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13.5px] font-bold text-[#111827] truncate">
                      Alok
                    </h4>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">
                      How are you?
                    </p>
                  </div>
                </div>

                {/* 3. Direct Chat: Ayesha */}
                <div className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#F9FAFB] rounded-lg transition-all cursor-pointer">
                  {/* Avatar: Blue Circle with A */}
                  <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[13px] font-bold shrink-0 shadow-2xs">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13.5px] font-bold text-[#111827] truncate">
                      Ayesha
                    </h4>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">
                      See you at 5
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ── Right Column: Text & Content (6 Cols) ── */}
          <div className="lg:col-span-6 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] text-[#5B4FE1] text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#5B4FE1] text-[#5B4FE1]" />
              <span>GROUP COLLABORATION</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] mb-5 font-sans">
              Connect your team. <br />
              <span className="text-[#5B4FE1]">Keep everyone aligned.</span>
            </h2>

            {/* Description */}
            <p className="text-[15.5px] sm:text-[16.5px] text-[#64748B] leading-relaxed max-w-lg mb-8">
              Create dedicated spaces for your projects, friends, or communities. Share ideas, manage participants seamlessly, and communicate in real-time with zero friction.
            </p>

            {/* Features Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-md">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#5B4FE1] shrink-0" />
                <span className="text-[13px] font-semibold text-[#0F172A]">Instant Live Sync</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                <UserPlus className="w-4 h-4 text-[#5B4FE1] shrink-0" />
                <span className="text-[13px] font-semibold text-[#0F172A]">Flexible Member Roles</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                <Shield className="w-4 h-4 text-[#5B4FE1] shrink-0" />
                <span className="text-[13px] font-semibold text-[#0F172A]">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                <Users className="w-4 h-4 text-[#5B4FE1]" />
                <span className="text-[13px] font-semibold text-[#0F172A]">Unlimited Members</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GroupShowcase;
