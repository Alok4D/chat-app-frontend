"use client";

import React, { useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
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
    <div className="w-full flex items-center gap-3">
      {/* Input container */}
      <div className="flex-1 flex items-center gap-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3.5 py-2 focus-within:border-[#5B4FE1] focus-within:bg-white transition-colors">
        <button
          type="button"
          title="Attach file"
          className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors shrink-0 cursor-pointer"
        >
          <Paperclip className="w-4 h-4 rotate-45" />
        </button>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 max-h-28 min-h-[22px] bg-transparent text-[13px] text-[#111827] placeholder-[#9CA3AF] outline-none resize-none custom-scrollbar leading-relaxed py-0.5"
        />
      </div>

      {/* Circular purple send button */}
      <button
        onClick={handleSubmit}
        disabled={!content.trim() || isSending || disabled}
        aria-label="Send message"
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0",
          content.trim() && !disabled && !isSending
            ? "bg-[#5B4FE1] text-white hover:bg-[#4E39E0] cursor-pointer"
            : "bg-[#5B4FE1]/40 text-white/70 cursor-not-allowed"
        )}
      >
        {isSending ? (
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};
