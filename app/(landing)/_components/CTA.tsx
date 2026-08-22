"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const CTA: React.FC = () => {
  return (
    <section className="pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Gradient Card Container ── */}
        <div className="relative rounded-md sm:rounded-md overflow-hidden bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#D946EF] px-8 sm:px-12 md:px-16 py-12 sm:py-16 shadow-xl shadow-[#7C3AED]/20">
          
          {/* Subtle Background Glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 right-1/3 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* ── Right Paper Plane & Flight Loop Trail Image ── */}
          <div className="absolute right-0 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-80 h-36 sm:h-44 md:h-52 pointer-events-none select-none z-0">
            <Image
              src="/images/cta-paper-plane.png"
              alt="Paper airplane"
              fill
              priority
              className="object-contain object-right p-5"
            />
          </div>

          {/* ── Content Row ── */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Headline & Subtitle */}
            <div className="max-w-md text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white leading-tight tracking-tight mb-2.5">
                Ready to start chatting?
              </h2>
              <p className="text-[14px] sm:text-[14.5px] text-white/85 leading-relaxed">
                Join thousands of users who trust Chatter for their daily conversations.
              </p>
            </div>

            {/* Right Buttons (Positioned to the left of the paper airplane) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 z-10 mr-0 lg:mr-64">
              <Link
                href={ROUTES.CHAT}
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#5B4FE1] bg-white px-6 py-3 rounded-xs shadow-lg shadow-black/10 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 text-[#5B4FE1]" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center text-[14px] font-semibold text-white border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-xs px-6 py-3 rounded-xs transition-all whitespace-nowrap cursor-pointer"
              >
                Learn More
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;
