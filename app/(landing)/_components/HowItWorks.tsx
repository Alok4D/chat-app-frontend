import React from "react";
import { UserCircle2, Search, MessageSquareMore, Lock } from "lucide-react";

const STEPS = [
  {
    icon: <UserCircle2 className="w-6 h-6" />,
    step: "01",
    title: "Sign up / Login",
    description: "Enter your phone number and name to get started.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    step: "02",
    title: "Find & Discover",
    description: "Search by name or number and start a conversation.",
  },
  {
    icon: <MessageSquareMore className="w-6 h-6" />,
    step: "03",
    title: "Chat in Real-time",
    description: "Send messages, share updates, and receive instantly.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    step: "04",
    title: "Stay Secure",
    description: "Your data is safe with our secure and private platform.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="howit" className="py-20 md:py-28 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight">
            How it works?
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-dashed border-t-2 border-dashed border-[#DDD8FF] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Icon Circle */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-[#F4F3FF] border-2 border-[#DDD8FF] flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white group-hover:border-[#6C63FF] transition-all duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6C63FF] text-white text-[11px] font-bold flex items-center justify-center shadow-md shadow-[#6C63FF]/30">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#1A1A2E] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#6B6B80] leading-relaxed max-w-[180px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
