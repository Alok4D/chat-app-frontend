import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseChat — Real-Time Chat & Collaboration",
  description:
    "Enterprise-grade real-time messaging application built with Next.js, TypeScript, Tailwind CSS, and Redux.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1A1A2E] min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
