"use client";

import React from "react";
import { LoginForm } from "../_components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F3FF] flex flex-col lg:flex-row items-center justify-between font-sans selection:bg-[#6C63FF] selection:text-white overflow-hidden">
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

      {/* ── RIGHT SIGN-IN FORM CARD ── */}
      <section className="w-full lg:w-[480px] xl:w-[520px] flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen shrink-0 z-10">
        <LoginForm />
      </section>
    </main>
  );
}
