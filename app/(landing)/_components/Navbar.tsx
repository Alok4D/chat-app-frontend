"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E5E7EB]"
          : "bg-white border-b border-[#E5E7EB]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={ROUTES.LANDING} className="flex items-center group">
          <Image
            src="/logo/nav-logo.png"
            alt="Chatter logo"
            width={150}
            height={44}
            className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-102"
            priority
          />
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-[#4B5563]">
          <a href="#features" className="hover:text-[#5B4FE1] transition-colors">Features</a>
          <a href="#howit" className="hover:text-[#5B4FE1] transition-colors">How it works</a>
          <a href="#preview" className="hover:text-[#5B4FE1] transition-colors">Live Preview</a>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={ROUTES.LOGIN}
            className="text-[13px] font-semibold text-[#111827] px-3.5 py-2 rounded-xs hover:bg-[#F9FAFB] transition-colors"
          >
            Login
          </a>
          <a
            href={ROUTES.CHAT}
            className="inline-flex items-center text-[13px] font-semibold text-white px-4 py-2 rounded-xs bg-[#5B4FE1] hover:bg-[#4E39E0] transition-colors shadow-2xs"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xs text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 space-y-2 animate-slideDown shadow-lg">
          {["Features", "How it works", "Live Preview"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              className="block px-3 py-2 text-[13px] font-medium text-[#4B5563] hover:text-[#5B4FE1] hover:bg-[#F9FAFB] rounded-xs transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-2 flex gap-2">
            <a
              href={ROUTES.LOGIN}
              className="flex-1 text-center text-[13px] font-semibold text-[#111827] border border-[#E5E7EB] py-2 rounded-xs hover:bg-[#F9FAFB] transition-colors"
            >
              Login
            </a>
            <a
              href={ROUTES.CHAT}
              className="flex-1 text-center text-[13px] font-semibold text-white py-2 rounded-xs bg-[#5B4FE1] hover:bg-[#4E39E0] transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
