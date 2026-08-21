"use client";

import React, { useState } from "react";
import { Message } from "@/types/message";
import { Avatar } from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils/formatTime";
import { Check, CheckCheck, Smile, Reply, CornerUpLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  onReact?: (messageId: string, emoji: string) => void;
  onReply?: (message: Message) => void;
}

const COMMON_EMOJIS = ["👍", "❤️", "🔥", "🚀", "😂", "🎉"];

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  onReact,
  onReply,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex gap-2.5 max-w-[85%] sm:max-w-[70%]",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar for received messages */}
      {!isCurrentUser && (
        <Avatar
          src={message.sender?.avatarUrl}
          name={message.sender?.name || "User"}
          size="sm"
          className="mt-1"
        />
      )}

      <div className="flex flex-col space-y-1">
        {/* Sender Name in group chats */}
        {!isCurrentUser && message.sender?.name && (
          <span className="text-[11px] font-semibold text-slate-400 pl-1">
            {message.sender.name}
          </span>
        )}

        {/* Replying banner */}
        {message.replyTo && (
          <div
            className={cn(
              "text-[11px] px-3 py-1.5 rounded-lg border-l-2 bg-slate-900/60 text-slate-300 truncate",
              isCurrentUser
                ? "border-blue-400 bg-blue-950/40"
                : "border-slate-500 bg-slate-800/40"
            )}
          >
            <span className="font-semibold text-slate-200">
              {message.replyTo.senderName}:{" "}
            </span>
            <span>{message.replyTo.content}</span>
          </div>
        )}

        {/* Main Message Bubble */}
        <div
          className={cn(
            "relative px-4 py-2.5 rounded-2xl text-sm break-words transition-all shadow-md leading-relaxed",
            isCurrentUser
              ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-blue-500/10"
              : "bg-slate-900 border border-slate-800/90 text-slate-100 rounded-bl-xs"
          )}
        >
          {message.content}

          {/* Time & Read Receipts */}
          <div
            className={cn(
              "flex items-center justify-end gap-1 mt-1 text-[10px] select-none",
              isCurrentUser ? "text-blue-200/80" : "text-slate-400"
            )}
          >
            <span>{formatTime(message.createdAt)}</span>
            {isCurrentUser && (
              <span>
                {message.status === "read" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-sky-300 stroke-[2.5]" />
                ) : message.status === "delivered" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-200 stroke-[2]" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-blue-200" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Emoji Reactions List */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-1 mt-1",
              isCurrentUser ? "justify-end" : "justify-start"
            )}
          >
            {message.reactions.map((reaction, i) => (
              <button
                key={i}
                onClick={() => onReact?.(message.id, reaction.emoji)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span>{reaction.emoji}</span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {reaction.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Menu (Emoji Reaction & Reply) */}
      <div
        className={cn(
          "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl px-1.5 py-1 backdrop-blur-md shadow-lg z-20",
          isCurrentUser ? "-left-20" : "-right-20"
        )}
      >
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="React"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Smile className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onReply?.(message)}
          aria-label="Reply"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Reply className="w-3.5 h-3.5" />
        </button>

        {/* Quick Emoji Bar */}
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-1 left-0 flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-30 animate-scaleUp">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReact?.(message.id, emoji);
                  setShowEmojiPicker(false);
                }}
                className="hover:scale-125 transition-transform p-1 text-sm"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
