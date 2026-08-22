import React from "react";
import { MessageSquare } from "lucide-react";

export const EmptyChat: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F7F8FA] relative overflow-hidden select-none">
      {/* Decorative soft purple circle */}
      <div className="absolute w-96 h-96 bg-[#EDE9FE] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-sm space-y-5">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs">
          <MessageSquare className="w-8 h-8 text-[#5B4FE1]" />
        </div>

        <div>
          <h3 className="text-[19px] font-bold text-[#0F172A] mb-1.5">
            Select a conversation
          </h3>
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            Choose a conversation from the sidebar or click New Group to start messaging in real-time.
          </p>
        </div>

        {/* Feature mini-chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {["Real-time Messaging", "Group Chats", "End-to-End Encrypted"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[11.5px] text-[#475569] font-medium shadow-2xs"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
