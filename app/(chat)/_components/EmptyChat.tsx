import React from "react";
import { MessageSquareMore } from "lucide-react";

export const EmptyChat: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0D1117] relative overflow-hidden">
      {/* Decorative soft blobs */}
      <div className="absolute w-80 h-80 bg-[#6C63FF]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm space-y-5">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#6C63FF]/15 border border-[#6C63FF]/25 flex items-center justify-center">
          <MessageSquareMore className="w-10 h-10 text-[#6C63FF]" />
        </div>

        <div>
          <h3 className="text-[17px] font-bold text-[#E6EDF3] mb-2">
            Select a conversation
          </h3>
          <p className="text-[13px] text-[#8B949E] leading-relaxed">
            Choose a conversation from the sidebar, or start a new one to begin chatting in real-time.
          </p>
        </div>

        {/* Feature mini-chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {["Real-time Messaging", "Group Chats", "Secure & Private"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[#6C63FF]/12 border border-[#6C63FF]/20 text-[11.5px] text-[#A89CFF] font-medium"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
