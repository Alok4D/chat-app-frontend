"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#6C63FF] selection:text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ── LEFT HERO IMAGE (Fitted to Screen) ── */}
        <section className="hidden lg:flex lg:col-span-7 items-center justify-center relative w-full h-[580px] xl:h-[640px]">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl shadow-[#6C63FF]/10 border border-[#EDE9FE] bg-white flex items-center justify-center">
            <Image
              src="/images/login-hero.png"
              alt="Chatter Real-Time Chat Illustration"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </section>

        {/* ── RIGHT SIGN-IN FORM ── */}
        <section className="lg:col-span-5 flex items-center justify-center w-full">
          <LoginForm />
        </section>

      </div>
    </main>
  );
}
