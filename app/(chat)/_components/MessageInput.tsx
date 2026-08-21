"use client";

import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() || isSending || disabled) return;
    const text = content.trim();
    setContent("");
    setIsSending(true);
    try {
      await onSendMessage(text);
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="px-4 py-3 bg-[#111827] border-t border-[#21262D] shrink-0">
      <div className="flex items-end gap-2">
        {/* Main Input Box */}
        <div className="flex-1 flex items-end gap-2 bg-[#161B22] border border-[#30363D] rounded-2xl px-4 py-2.5 focus-within:border-[#6C63FF]/60 focus-within:ring-1 focus-within:ring-[#6C63FF]/20 transition-all">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 max-h-32 min-h-[24px] bg-transparent text-[13.5px] text-[#E6EDF3] placeholder-[#8B949E] outline-none resize-none custom-scrollbar leading-relaxed py-0.5"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSending || disabled}
          aria-label="Send message"
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
            content.trim() && !disabled && !isSending
              ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/30 hover:bg-[#5a52e8] hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-[#21262D] text-[#8B949E] opacity-50 cursor-not-allowed"
          )}
        >
          {isSending ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
