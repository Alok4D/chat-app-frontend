"use client";

import React, { useEffect } from "react";
import { ROUTES } from "@/lib/constants/routes";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F0EFFF] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Something went wrong</h2>
      <p className="text-xs text-[#6B6B80] mb-6">{error.message || "An unexpected error occurred."}</p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-xl bg-[#6C63FF] text-white text-xs font-semibold hover:bg-[#5a52e8] transition-all"
        >
          Try again
        </button>
        <a
          href={ROUTES.LANDING}
          className="px-4 py-2 rounded-xl bg-white border border-[#E0DFFE] text-[#1A1A2E] text-xs font-semibold hover:bg-[#F4F3FF] transition-all"
        >
          Home
        </a>
      </div>
    </div>
  );
}
