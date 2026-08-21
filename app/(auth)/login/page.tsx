"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex flex-col lg:flex-row items-center justify-between font-sans selection:bg-[#5B4FE1] selection:text-white overflow-hidden">
      
      {/* ── LEFT HERO SECTION (60% Width, Full-Height Background + Overlaid Text) ── */}
      <section className="hidden lg:flex lg:w-[60%] xl:w-[62%] relative h-screen overflow-hidden shrink-0">
        {/* Full-Height 3D Background Image */}
        <Image
          src="/images/login-hero.png"
          alt="Chatter 3D Showcase"
          fill
          priority
          className="object-cover object-right"
          sizes="(max-width: 1024px) 100vw, 62vw"
        />

        {/* Content Overlaid on Left Side of the Image */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14 max-w-lg select-none">
          {/* Top Logo */}
          <div>
            <a href={ROUTES.LANDING} className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#5B4FE1] flex items-center justify-center shadow-lg shadow-[#5B4FE1]/30 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold text-[#0F172A] tracking-tight">Chatter</span>
            </a>
          </div>

          {/* Middle Title & 3 Features */}
          <div className="space-y-6 my-auto">
            <div>
              <h1 className="text-4xl xl:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Welcome <span className="text-[#5B4FE1]">back!</span>
              </h1>
              <p className="text-[14.5px] text-[#64748B] mt-2 font-medium">
                Sign in to continue to your conversations
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Zap className="w-5 h-5 text-[#5B4FE1]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A]">Real-time messaging</h3>
                  <p className="text-[12.5px] text-[#64748B]">Instant delivery of messages</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Shield className="w-5 h-5 text-[#5B4FE1]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A]">Secure & Private</h3>
                  <p className="text-[12.5px] text-[#64748B]">Your conversations are end-to-end encrypted</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Users className="w-5 h-5 text-[#5B4FE1]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A]">Group Conversations</h3>
                  <p className="text-[12.5px] text-[#64748B]">Chat with friends, family or teammates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Privacy Card */}
          <div className="relative pt-6">
            {/* Subtle Dot Grid */}
            <div className="absolute -top-4 -left-2 w-28 h-20 opacity-40 pointer-events-none bg-[radial-gradient(#5B4FE1_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

            <div className="inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E9E4FF] shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#5B4FE1] shrink-0">
                <Shield className="w-4 h-4 text-[#5B4FE1]" />
              </div>
              <div>
                <h4 className="text-[12.5px] font-bold text-[#0F172A]">Your privacy is our priority.</h4>
                <p className="text-[11.5px] text-[#64748B]">We never share your personal data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RIGHT SIGN-IN CONTAINER (40% Width) ── */}
      <section className="flex-1 w-full flex items-center justify-center p-6 sm:p-10 lg:p-12 min-h-screen z-10">
        <div className="w-full max-w-[480px] bg-[#FAFAFC] rounded-[36px] p-4 sm:p-6 border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.03)] flex items-center justify-center">
          <LoginForm />
        </div>
      </section>

    </main>
  );
}
