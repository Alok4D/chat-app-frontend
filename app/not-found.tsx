import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0EFFF] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-4xl font-extrabold text-[#1A1A2E] mb-2">404</h2>
      <p className="text-sm text-[#6B6B80] mb-6">Page not found</p>
      <Link
        href={ROUTES.LANDING}
        className="px-5 py-2.5 rounded-xl bg-[#6C63FF] text-white text-sm font-semibold hover:bg-[#5a52e8] transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
