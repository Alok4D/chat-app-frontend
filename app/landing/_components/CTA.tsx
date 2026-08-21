import React from "react";
import { ArrowRight, Send } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] px-8 sm:px-14 py-12 sm:py-14">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute right-12 bottom-8 opacity-10">
            <Send className="w-24 h-24 text-white rotate-45" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-2">
                Ready to start chatting?
              </h2>
              <p className="text-[14.5px] text-white/80 max-w-md">
                Join thousands of users who trust Chatter for their daily conversations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={ROUTES.CHAT}
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6C63FF] bg-white px-5 py-3 rounded-xl hover:bg-[#F4F3FF] shadow-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={ROUTES.API_DOCS}
                className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white border-2 border-white/40 px-5 py-3 rounded-xl hover:bg-white/10 transition-all whitespace-nowrap"
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
