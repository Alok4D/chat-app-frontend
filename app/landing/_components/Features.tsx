import React from "react";
import { FeatureCard } from "./FeatureCard";
import { Zap, Users, Shield, Smartphone, Smile, RefreshCw, Cpu, Layers } from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time WebSocket Sync",
      description:
        "Sub-millisecond socket events deliver message streams, typing indications, and online presence instantly without polling.",
      tag: "Live",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dynamic Multi-User Groups",
      description:
        "Create dedicated group channels with multi-participant selectors, administrative controls, and customizable avatars.",
      tag: "Collaboration",
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "Reactions & Reply Threads",
      description:
        "Express sentiment with rich emoji reactions and maintain context with nested message reply references.",
      tag: "Interactive",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Strict Phone & OTP Auth",
      description:
        "Robust input validation powered by Zod and React Hook Form with token caching and authenticated API requests.",
      tag: "Security",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Redux Toolkit Architecture",
      description:
        "Predictable global state management keeping conversations, contacts, messages, and UI modals synchronized across tabs.",
      tag: "State",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Offline Mock Engine & REST",
      description:
        "Integrated dual-mode client supporting both live production microservice REST endpoints and instant browser simulation.",
      tag: "Dual-Engine",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-mono text-blue-400 mb-3">
            Designed for Modern Teams
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything you need for lightning-fast team conversations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
