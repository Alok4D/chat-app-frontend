import React from "react";
import { Zap, Users, ShieldCheck, Smartphone, Code2 } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Messaging",
    description: "Instant delivery with real-time updates and typing indicators.",
    color: "#6C63FF",
    bg: "#F4F3FF",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Group Conversations",
    description: "Create groups with multiple members and chat together seamlessly.",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Your conversations are end-to-end encrypted and completely private.",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Cross Platform",
    description: "Use Chatter on any device. Web, mobile, tablet — stay connected everywhere.",
    color: "#0EA5E9",
    bg: "#F0F9FF",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Developer Friendly",
    description: "Clean API, well-documented and easy to integrate into your applications.",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] tracking-tight mb-3">
            Everything you need to chat
          </h2>
          <p className="text-[15px] text-[#6B6B80]">
            Powerful features to keep you connected and your conversations flowing smoothly.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-[#F0EDFF] bg-white hover:shadow-lg hover:shadow-[#6C63FF]/08 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: feature.bg, color: feature.color }}
              >
                {feature.icon}
              </div>

              <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{feature.title}</h3>
              <p className="text-[13.5px] text-[#6B6B80] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
