"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex flex-col lg:flex-row items-center justify-between font-sans selection:bg-[#5B4FE1] selection:text-white overflow-hidden">

      {/* ── LEFT HERO SECTION (55% Width) ── */}
      <section className="hidden lg:flex lg:w-[55%] xl:w-[56%] relative h-screen overflow-hidden shrink-0">
        {/* Full-Height 3D Background Image */}
      <Link href={ROUTES.HOME}>
        <Image
          src="/images/ChatGPT Image Aug 21, 2026, 10_53_28 PM copy.png"
          alt="Chatter 3D Showcase"
          fill
          priority
          className="object-cover object-right"
          sizes="(max-width: 1024px) 100vw, 56vw"
        />
      </Link>

        {/* Content Overlaid on Left Side of the Image */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8 xl:p-12 max-w-[460px] select-none">
          {/* Top Logo */}
          <div>
           <Link href={ROUTES.HOME}>
           <Image src={"/icons/ChatGPT Image Aug 21, 2026, 10_44_08 PM.png"} alt="Chatter Logo" width={200} height={200} />
           </Link>
          </div>

          {/* Middle Title & 3 Features */}
          <div className="space-y-5 my-auto">
            <div className="font-sans">
              <h1 className="text-3xl xl:text-5xl font-semibold text-[#0F172A] tracking-tight leading-tight font-sans">
                Welcome <span className="text-[#5B4FE1]">back!</span>
              </h1>
              <p className="text-[14px] text-[#64748B] mt-1.5 font-medium font-sans">
                Sign in to continue to your conversations
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3.5 pt-1 font-sans">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Zap className="w-4 h-4 text-[#5B4FE1]" />
                </div>
                <div className="font-sans">
                  <h3 className="text-[13.5px] font-bold text-[#0F172A] font-sans">Real-time messaging</h3>
                  <p className="text-[12px] text-[#64748B] font-sans">Instant delivery of messages</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Shield className="w-4 h-4 text-[#5B4FE1]" />
                </div>
                <div className="font-sans">
                  <h3 className="text-[13.5px] font-bold text-[#0F172A] font-sans">Secure & Private</h3>
                  <p className="text-[12px] text-[#64748B] font-sans">Your conversations are end-to-end encrypted</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-white/95 backdrop-blur-sm border border-[#E9E4FF] flex items-center justify-center shadow-2xs shrink-0">
                  <Users className="w-4 h-4 text-[#5B4FE1]" />
                </div>
                <div className="font-sans">
                  <h3 className="text-[13.5px] font-bold text-[#0F172A] font-sans">Group Conversations</h3>
                  <p className="text-[12px] text-[#64748B] font-sans">Chat with friends, family or teammates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Privacy Card */}
          <div className="relative pt-4 font-sans">
            {/* Subtle Dot Grid */}
            <div className="absolute -top-3 -left-2 w-28 h-20 opacity-40 pointer-events-none bg-[radial-gradient(#5B4FE1_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

            <div className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-xs bg-white/90 backdrop-blur-md border border-[#E9E4FF] shadow-xs font-sans">
              <div className="w-7 h-7 rounded-xs bg-[#F5F3FF] flex items-center justify-center text-[#5B4FE1] shrink-0">
                <Shield className="w-3.5 h-3.5 text-[#5B4FE1]" />
              </div>
              <div className="font-sans">
                <h4 className="text-[12px] font-bold text-[#0F172A] font-sans">Your privacy is our priority.</h4>
                <p className="text-[11px] text-[#64748B] font-sans">We never share your personal data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RIGHT SIGN-IN SECTION ── */}
      <section className="flex-1 w-full flex items-center justify-center p-6 sm:p-10 lg:p-12 min-h-screen z-10">
        <LoginForm />
      </section>

    </main>
  );
}
