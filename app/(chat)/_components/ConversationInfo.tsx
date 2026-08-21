"use client";

import React, { useState } from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import {
  X,
  Phone,
  Video,
  Search,
  MoreHorizontal,
  ChevronRight,
  Trash2,
  BellOff,
  Clock,
  LogOut,
  Users,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsInfoPanelOpen } from "@/store/chat.store";
import toast from "react-hot-toast";

export interface ConversationInfoProps {
  conversation: Conversation;
}

export const ConversationInfo: React.FC<ConversationInfoProps> = ({ conversation }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.user);
  const [isMuted, setIsMuted] = useState(false);

  const otherParticipant =
    conversation.type === "direct"
      ? conversation.participants.find((p) => p.id !== currentUser?.id) || conversation.participants[0]
      : null;

  const displayName =
    conversation.type === "group"
      ? conversation.name || "Group Chat"
      : otherParticipant?.name || "User";

  const displayAvatar =
    conversation.type === "group" ? conversation.avatarUrl : otherParticipant?.avatarUrl;

  const isOnline = otherParticipant?.isOnline ?? true;

  // Mock demo thumbnails for media preview
  const mediaThumbnails = [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=150&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=150&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&auto=format&fit=crop&q=60",
  ];

  return (
    <aside className="w-[320px] bg-white border-l border-[#F1F5F9] flex flex-col h-full overflow-y-auto custom-scrollbar select-none z-30 shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-[#0F172A]">Conversation Info</h3>
        <button
          onClick={() => dispatch(setIsInfoPanelOpen(false))}
          className="p-1.5 rounded-full text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 flex flex-col items-center text-center border-b border-[#F1F5F9]">
        <Avatar
          src={displayAvatar}
          name={displayName}
          size="lg"
          isOnline={isOnline}
          showStatus={conversation.type === "direct"}
          isGroup={conversation.type === "group"}
          className="ring-4 ring-[#F8FAFC] shadow-sm mb-3"
        />
        <h4 className="text-[16px] font-bold text-[#0F172A] mb-0.5">{displayName}</h4>
        <p className="text-[12px] font-medium text-[#10B981] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
          <span>{conversation.type === "group" ? `${conversation.participants.length} members` : isOnline ? "Online" : "Offline"}</span>
        </p>

        {/* Quick Actions (Audio, Video, Search, More) */}
        <div className="grid grid-cols-4 gap-3 w-full mt-6">
          {[
            { label: "Audio", icon: <Phone className="w-4 h-4 text-[#6C63FF]" /> },
            { label: "Video", icon: <Video className="w-4 h-4 text-[#6C63FF]" /> },
            { label: "Search", icon: <Search className="w-4 h-4 text-[#6C63FF]" /> },
            { label: "More", icon: <MoreHorizontal className="w-4 h-4 text-[#6C63FF]" /> },
          ].map((act, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                {act.icon}
              </div>
              <span className="text-[11px] font-medium text-[#475569]">{act.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* About Section */}
        <div>
          <h5 className="text-[12.5px] font-bold text-[#0F172A] mb-1.5">About</h5>
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            {conversation.type === "group"
              ? conversation.description || "Group conversation created with Chatter."
              : otherParticipant?.statusMessage || "Hey there! I am using Chatter."}
          </p>
        </div>

        {/* Media, Links and Docs */}
        <div>
          <div className="flex items-center justify-between mb-3 cursor-pointer group">
            <h5 className="text-[12.5px] font-bold text-[#0F172A]">Media, Links and Docs</h5>
            <span className="text-[12px] font-semibold text-[#94A3B8] group-hover:text-[#6C63FF] flex items-center gap-0.5 transition-colors">
              24 <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {mediaThumbnails.map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0]"
              >
                <img src={img} alt="media" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="aspect-square rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[12px] font-bold text-[#64748B]">
              +21
            </div>
          </div>
        </div>

        {/* Group Participants List (for groups) */}
        {conversation.type === "group" && (
          <div>
            <h5 className="text-[12.5px] font-bold text-[#0F172A] mb-2.5 flex items-center justify-between">
              <span>Members</span>
              <span className="text-[11.5px] font-medium text-[#94A3B8]">
                {conversation.participants.length}
              </span>
            </h5>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
              {conversation.participants.map((member) => (
                <div key={member.id} className="flex items-center gap-2.5 py-1">
                  <Avatar src={member.avatarUrl} name={member.name} size="xs" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-[#0F172A] truncate">{member.name}</p>
                    <p className="text-[10.5px] text-[#94A3B8] truncate">{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Toggles */}
        <div className="space-y-4 pt-2 border-t border-[#F1F5F9]">
          {/* Mute Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#0F172A]">Mute Notifications</span>
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                toast.success(isMuted ? "Notifications unmuted" : "Notifications muted");
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                isMuted ? "bg-[#6C63FF]" : "bg-[#E2E8F0]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isMuted ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Disappearing Messages */}
          <div className="flex items-center justify-between cursor-pointer group">
            <span className="text-[13px] font-medium text-[#0F172A]">Disappearing Messages</span>
            <span className="text-[12px] font-medium text-[#94A3B8] group-hover:text-[#6C63FF] flex items-center gap-0.5 transition-colors">
              Off <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Danger Zone: Block or Leave */}
        <div className="pt-2 border-t border-[#F1F5F9]">
          <button
            onClick={() => {
              toast.error(conversation.type === "group" ? "Left group" : "User blocked");
            }}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#EF4444] hover:text-[#DC2626] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{conversation.type === "group" ? "Leave Group" : "Block User"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
