"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex flex-col lg:flex-row items-center justify-between font-sans selection:bg-[#5B4FE1] selection:text-white overflow-hidden">
      {/* ── LEFT FULL-SCREEN HERO IMAGE (Top to Bottom Edge-to-Edge) ── */}
      <section className="hidden lg:block lg:flex-1 relative h-screen w-full">
        <Image
          src="/images/login-hero.png"
          alt="Chatter Real-Time Chat Illustration"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </section>

      {/* ── RIGHT SIGN-IN CONTAINER ── */}
      <section className="w-full lg:w-[560px] xl:w-[620px] flex items-center justify-center p-6 sm:p-10 lg:p-14 min-h-screen shrink-0 z-10">
        <div className="w-full bg-[#FAFAFC] rounded-[36px] p-4 sm:p-6 border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.03)] flex items-center justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
