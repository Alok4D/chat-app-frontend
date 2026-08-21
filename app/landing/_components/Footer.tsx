import React from "react";
import { MessageSquareMore, Twitter, Github, Send } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const FOOTER_LINKS = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Resources: ["API Docs", "Guides", "Help Center", "Blog"],
  Company: ["About Us", "Careers", "Contact", "Privacy Policy"],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A2E] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href={ROUTES.LANDING} className="flex items-center gap-2.5 mb-4 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-[#6C63FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/30 group-hover:scale-105 transition-transform">
                <MessageSquareMore className="w-5 h-5 text-white" />
              </div>
              <span className="text-[17px] font-bold tracking-tight">Chatter</span>
            </a>
            <p className="text-[13.5px] text-[#9CA3AF] leading-relaxed max-w-xs mb-6">
              Real-time chat application built for modern teams and communities.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[Twitter, Github, MessageSquareMore].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-[#252540] flex items-center justify-center text-[#9CA3AF] hover:bg-[#6C63FF] hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              {/* Discord placeholder */}
              <a href="#" className="w-9 h-9 rounded-xl bg-[#252540] flex items-center justify-center text-[#9CA3AF] hover:bg-[#6C63FF] hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12.5px] font-bold text-white uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13.5px] text-[#9CA3AF] hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-1 md:col-span-2 lg:col-start-5">
            <h4 className="text-[12.5px] font-bold text-white uppercase tracking-wider mb-4">
              Subscribe to our newsletter
            </h4>
            <p className="text-[13px] text-[#9CA3AF] mb-4">
              Get updates about new features and releases.
            </p>
            <div className="flex items-center gap-2 bg-[#252540] rounded-xl px-3 py-2.5 border border-[#35356A]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-[13px] text-white placeholder-[#9CA3AF] outline-none"
              />
              <button className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center hover:bg-[#5a52e8] transition-colors shrink-0">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-[#2D2D4E] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-[#9CA3AF]">
            © {new Date().getFullYear()} Chatter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
