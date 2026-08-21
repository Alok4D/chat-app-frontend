import React from "react";
import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { ChatPreview } from "./_components/ChatPreview";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";

export const metadata = {
  title: "PulseChat — High-Performance Real-Time Team Messaging",
  description:
    "Experience next-generation sub-millisecond real-time communication with rich channels, instant group chats, and state-of-the-art UI/UX.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ChatPreview />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
