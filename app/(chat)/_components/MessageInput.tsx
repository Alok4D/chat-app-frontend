"use client";

import React, { useState, useRef } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
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
    <div className="px-6 py-4 bg-white border-t border-[#F1F5F9] shrink-0">
      <div className="flex items-center gap-3">
        {/* Main Pill Input Box */}
        <div className="flex-1 flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 py-2.5 focus-within:border-[#6C63FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6C63FF]/10 transition-all shadow-2xs">
          {/* Attachment Icon */}
          <button
            type="button"
            title="Attach file"
            className="text-[#94A3B8] hover:text-[#64748B] transition-colors shrink-0"
          >
            <Paperclip className="w-5 h-5 rotate-45" />
          </button>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 max-h-32 min-h-[24px] bg-transparent text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none resize-none custom-scrollbar leading-relaxed py-0.5"
          />

          {/* Emoji Icon */}
          <button
            type="button"
            title="Emoji"
            className="text-[#94A3B8] hover:text-[#64748B] transition-colors shrink-0"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Circular Purple Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSending || disabled}
          aria-label="Send message"
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
            content.trim() && !disabled && !isSending
              ? "bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/30 hover:bg-[#5a52e8] hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-[#6C63FF]/60 text-white/80 cursor-not-allowed"
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
