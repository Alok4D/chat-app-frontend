"use client";

import React, { useState, useRef } from "react";
import { Send, Paperclip, Smile, X } from "lucide-react";
import { Message } from "@/types/message";
import { cn } from "@/lib/utils/cn";

export interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  replyTo?: Message | null;
  onCancelReply?: () => void;
  onTyping?: (isTyping: boolean) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  replyTo,
  onCancelReply,
  onTyping,
  disabled = false,
}) => {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (onTyping) {
      onTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => onTyping(false), 2000);
    }
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
    if (onTyping) onTyping(false);
    try {
      await onSendMessage(text);
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="px-4 py-3 bg-[#111827] border-t border-[#21262D] shrink-0">
      {/* Reply Banner */}
      {replyTo && (
        <div className="flex items-center justify-between px-3 py-2 mb-2 bg-[#21262D] border-l-2 border-[#6C63FF] rounded-lg animate-slideDown">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[11.5px] text-[#6C63FF] font-semibold shrink-0">Replying to:</span>
            <span className="text-[11.5px] text-[#8B949E] truncate">{replyTo.content}</span>
          </div>
          <button
            onClick={onCancelReply}
            className="p-0.5 rounded text-[#8B949E] hover:text-[#E6EDF3] transition-colors shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-end gap-2">
        {/* Attachment */}
        <button
          type="button"
          title="Attach file"
          className="p-2 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all shrink-0"
        >
          <Paperclip className="w-4.5 h-4.5" />
        </button>

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
          <button
            type="button"
            title="Emoji"
            className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors shrink-0 pb-0.5"
          >
            <Smile className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSending || disabled}
          aria-label="Send message"
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
            content.trim()
              ? "bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/30 hover:bg-[#5a52e8] hover:scale-105 active:scale-95"
              : "bg-[#21262D] text-[#8B949E] cursor-not-allowed"
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
