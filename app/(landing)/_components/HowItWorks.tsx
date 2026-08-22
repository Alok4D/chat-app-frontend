"use client";

import React from "react";
import {
  UserCircle2,
  Search,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    icon: <UserCircle2 className="w-5 h-5" />,
    step: "01",
    title: "Sign up / Login",
    description: "Enter your phone number and name to access your dashboard in seconds.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    step: "02",
    title: "Find & Discover",
    description: "Search colleagues by name or phone number and start direct or group chats.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    step: "03",
    title: "Chat in Real-time",
    description: "Send messages, share thoughts, and receive instant real-time live updates.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    step: "04",
    title: "Stay Secure & Synced",
    description: "Your conversations are protected and automatically synced across all devices.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="howit" className="py-16 md:py-20 bg-[#FAFAFA] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#0F172A] tracking-tight mb-3 font-sans">
            How it <span className="text-[#5B4FE1]">works</span>
          </h2>
          
          <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed">
            No complicated configuration. Create your account and begin seamless messaging in less than a minute.
          </p>
        </div>

        {/* 4 Interactive Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-xs p-6 md:p-7 shadow-xs hover:shadow-xl hover:shadow-[#5B4FE1]/10 hover:border-[#5B4FE1]/40 transition-all duration-300 flex flex-col justify-between group relative hover:-translate-y-1"
            >
              {/* Card Top Row: Step Badge & Directional Arrow */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[12px] font-extrabold text-[#5B4FE1] bg-[#EDE9FE] px-3 py-1 rounded-xs tracking-wider font-mono">
                  STEP {step.step}
                </span>
                
                {idx < STEPS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#CBD5E1] group-hover:text-[#5B4FE1] group-hover:translate-x-0.5 transition-all hidden lg:block" />
                )}
              </div>

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xs bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#5B4FE1] group-hover:bg-[#5B4FE1] group-hover:text-white group-hover:border-[#5B4FE1] transition-all duration-300 shadow-2xs mb-5">
                {step.icon}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 group-hover:text-[#5B4FE1] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[13.5px] text-[#64748B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      

      </div>
    </section>
  );
};

export default HowItWorks;
