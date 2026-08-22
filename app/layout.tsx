import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatter — Real-Time Chat & Collaboration",
  description:
    "A modern, secure real-time messaging application built with Next.js, TypeScript, Tailwind CSS, and Redux.",
  icons: {
    icon: "/icons/favlogo.png",
  },
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
