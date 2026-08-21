"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatLayout } from "../_components/ChatLayout";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants/routes";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

export default function ChatPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Synchronizing session..." />
      </div>
    );
  }

  return <ChatLayout />;
}
