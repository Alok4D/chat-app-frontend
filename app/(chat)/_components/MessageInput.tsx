"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Image as ImageIcon, X } from "lucide-react";
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

    // Typing notification trigger
    if (onTyping) {
      onTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
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
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  return (
    <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 backdrop-blur-xl">
      {/* Reply Banner */}
      {replyTo && (
        <div className="flex items-center justify-between px-3.5 py-2 mb-2 bg-slate-900/90 border border-slate-800 rounded-xl animate-slideDown text-xs text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <span className="text-blue-400 font-semibold">Replying to:</span>
            <span className="truncate max-w-xs">{replyTo.content}</span>
          </div>
          <button
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input controls container */}
      <div className="flex items-end gap-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-2 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all shadow-lg">
        <div className="flex items-center gap-1 text-slate-400 pb-1 pl-1">
          <button
            type="button"
            title="Attach file"
            className="p-2 rounded-xl hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Add photo"
            className="p-2 rounded-xl hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type your message... (Enter to send, Shift+Enter for newline)"
          rows={1}
          className="flex-1 max-h-32 min-h-[40px] bg-transparent text-slate-100 placeholder-slate-500 text-sm py-2 px-1 focus:outline-none resize-none custom-scrollbar"
        />

        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isSending || disabled}
          aria-label="Send message"
          className={cn(
            "p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md",
            content.trim()
              ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-500/20 hover:scale-105 active:scale-95"
              : "bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
