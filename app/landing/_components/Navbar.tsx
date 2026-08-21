"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareMore, Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#EEEEFC]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href={ROUTES.LANDING} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#6C63FF] flex items-center justify-center shadow-md shadow-[#6C63FF]/25 group-hover:scale-105 transition-transform">
            <MessageSquareMore className="w-5 h-5 text-white" />
          </div>
          <span className="text-[17px] font-bold text-[#1A1A2E] tracking-tight">Chatter</span>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-[#444466]">
          <a href="#features" className="hover:text-[#6C63FF] transition-colors">Features</a>
          <a href="#howit" className="hover:text-[#6C63FF] transition-colors">How it works</a>
          <a href="#preview" className="hover:text-[#6C63FF] transition-colors">Live Preview</a>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={ROUTES.LOGIN}
            className="text-[13.5px] font-semibold text-[#1A1A2E] px-4 py-2 rounded-lg hover:bg-[#F4F3FF] transition-colors"
          >
            Login
          </a>
          <a
            href={ROUTES.CHAT}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white px-4 py-2 rounded-lg bg-[#6C63FF] hover:bg-[#5a52e8] shadow-md shadow-[#6C63FF]/30 transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-[#444466] hover:bg-[#F4F3FF] transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#EEEEFC] px-4 py-4 space-y-2 animate-slideDown shadow-lg">
          {["Features", "How it works", "Live Preview"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              className="block px-3 py-2 text-sm font-medium text-[#444466] hover:text-[#6C63FF] hover:bg-[#F4F3FF] rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-2 flex gap-2">
            <a href={ROUTES.LOGIN} className="flex-1 text-center text-sm font-semibold text-[#1A1A2E] border border-[#E0DFFE] py-2.5 rounded-lg hover:bg-[#F4F3FF] transition-colors">
              Login
            </a>
            <a href={ROUTES.CHAT} className="flex-1 text-center text-sm font-semibold text-white py-2.5 rounded-lg bg-[#6C63FF] hover:bg-[#5a52e8] transition-colors">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
