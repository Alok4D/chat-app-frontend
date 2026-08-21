import React from "react";
import { MessageSquare } from "lucide-react";

export const EmptyChat: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden select-none">
      {/* Decorative soft purple circle */}
      <div className="absolute w-96 h-96 bg-[#F4F3FF] rounded-full blur-3xl pointer-events-none opacity-70" />

      <div className="relative z-10 max-w-sm space-y-5">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#F4F3FF] border border-[#DDD8FF] flex items-center justify-center shadow-xs">
          <MessageSquare className="w-10 h-10 text-[#6C63FF]" />
        </div>

        <div>
          <h3 className="text-[20px] font-bold text-[#0F172A] mb-2">
            Select a conversation
          </h3>
          <p className="text-[13.5px] text-[#64748B] leading-relaxed">
            Choose a conversation from the sidebar or click the new chat icon to start messaging in real-time.
          </p>
        </div>

        {/* Feature mini-chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {["Real-time Messaging", "Group Chats", "End-to-End Encrypted"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[12px] text-[#475569] font-medium shadow-2xs"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
