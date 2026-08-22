import React from "react";
import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { ChatPreview } from "./_components/ChatPreview";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";
import GroupShowcase from "./_components/GroupShowcase";

export const metadata = {
  title: "Chatter — Real-time Chat Made Simple",
  description:
    "Connect with friends, colleagues, and communities instantly with our real-time chat application. Secure, fast, and developer friendly.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A2E] flex flex-col selection:bg-[#6C63FF] selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        {/* <Features /> */}
        <HowItWorks />
        <ChatPreview />
        <GroupShowcase />
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
