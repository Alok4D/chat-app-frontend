"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex items-center justify-center p-4 lg:p-8 xl:p-12 font-sans selection:bg-[#6C63FF] selection:text-white">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ── LEFT HERO & 3D ARTWORK COLUMN (7 cols on lg) ── */}
        <section className="lg:col-span-7 flex flex-col justify-between h-full py-4 lg:py-6 relative">
          
          {/* Top Logo */}
          <div className="mb-8 lg:mb-12">
            <a href={ROUTES.LANDING} className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/30 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold text-[#0F172A] tracking-tight">Chatter</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Content (Text & Feature Items) */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  Welcome <span className="text-[#6C63FF]">back!</span>
                </h1>
                <p className="text-[15px] text-[#64748B] mt-2 font-medium">
                  Sign in to continue to your conversations
                </p>
              </div>

              {/* 3 Feature Highlights */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                    <Zap className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0F172A]">Real-time messaging</h3>
                    <p className="text-[12.5px] text-[#64748B]">Instant delivery of messages</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                    <Shield className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0F172A]">Secure & Private</h3>
                    <p className="text-[12.5px] text-[#64748B]">Your conversations are end-to-end encrypted</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                    <Users className="w-5 h-5 text-[#6C63FF]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0F172A]">Group Conversations</h3>
                    <p className="text-[12.5px] text-[#64748B]">Chat with friends, family or teammates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle 3D Phone Mockup Artwork */}
            <div className="hidden md:flex md:col-span-5 items-center justify-center relative">
              <div className="relative w-full max-w-[320px] aspect-[4/5] drop-shadow-2xl">
                <Image
                  src="/images/loginrightimage.png"
                  alt="Chatter 3D Showcase"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bottom Privacy Card */}
          <div className="mt-8 lg:mt-12">
            <div className="inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E9E4FF] shadow-xs max-w-sm">
              <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#6C63FF] shrink-0">
                <Shield className="w-4 h-4 text-[#6C63FF]" />
              </div>
              <div>
                <h4 className="text-[12.5px] font-bold text-[#0F172A]">Your privacy is our priority.</h4>
                <p className="text-[11.5px] text-[#64748B]">We never share your personal data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RIGHT SIGN-IN FORM COLUMN (5 cols on lg) ── */}
        <section className="lg:col-span-5 flex items-center justify-center">
          <LoginForm />
        </section>

      </div>
    </main>
  );
}
