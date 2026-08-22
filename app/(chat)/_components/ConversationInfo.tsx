"use client";

import React, { useState } from "react";
import { Conversation } from "@/types/conversation";
import { Avatar } from "@/components/ui/Avatar";
import { AddMemberModal } from "./group/AddMemberModal";
import {
  X,
  Trash2,
  LogOut,
  Edit2,
  Check,
  UserPlus,
  ShieldCheck,
  UserMinus,
  Phone,
  User as UserIcon,
  Crown,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsInfoPanelOpen, setActiveConversationId } from "@/redux/slices/chatSlice";
import { groupsApi } from "@/redux/features/groups/groupsApi";
import toast from "react-hot-toast";

export interface ConversationInfoProps {
  conversation: Conversation;
}

export const ConversationInfo: React.FC<ConversationInfoProps> = ({ conversation }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.user);
  const [isEditingName, setIsEditingName] = useState(false);
  const [groupName, setGroupName] = useState(conversation.name || "");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

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

  // Helper to check if a user is an admin of this group
  const isUserAdmin = (userId: string) => {
    if (conversation.type !== "group") return false;
    if (conversation.admins && conversation.admins.includes(userId)) return true;
    if (conversation.createdBy === userId) return true;
    return false;
  };

  const isCurrentUserAdmin = currentUser ? isUserAdmin(currentUser.id) : false;

  // Handle Rename Group
  const handleRenameGroup = async () => {
    if (!groupName.trim() || groupName.trim() === conversation.name) {
      setIsEditingName(false);
      return;
    }
    setIsSavingName(true);
    try {
      await dispatch(
        groupsApi.endpoints.updateGroup.initiate({
          id: conversation.id,
          name: groupName.trim(),
        })
      ).unwrap();
      toast.success("Group renamed successfully! ✏️");
      setIsEditingName(false);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to rename group");
    } finally {
      setIsSavingName(false);
    }
  };

  // Handle Remove Member
  const handleRemoveMember = async (userId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName} from this group?`)) return;
    try {
      await dispatch(
        groupsApi.endpoints.removeParticipant.initiate({
          groupId: conversation.id,
          userId,
        })
      ).unwrap();
      toast.success(`${memberName} removed from group`);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to remove member");
    }
  };

  // Handle Promote to Admin
  const handlePromoteAdmin = async (userId: string, memberName: string) => {
    try {
      await dispatch(
        groupsApi.endpoints.promoteToAdmin.initiate({
          groupId: conversation.id,
          userId,
        })
      ).unwrap();
      toast.success(`${memberName} is now an admin! 🛡️`);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to promote admin");
    }
  };

  // Handle Leave Group
  const handleLeaveGroup = async () => {
    if (!confirm("Are you sure you want to leave this group?")) return;
    try {
      if (currentUser?.id) {
        await dispatch(
          groupsApi.endpoints.removeParticipant.initiate({
            groupId: conversation.id,
            userId: currentUser.id,
          })
        ).unwrap();
      }
      toast.success("You left the group");
      dispatch(setActiveConversationId(null));
      dispatch(setIsInfoPanelOpen(false));
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to leave group");
    }
  };

  return (
    <>
      <aside className="w-[300px] sm:w-[320px] bg-white border-l border-[#F1F5F9] flex flex-col h-full overflow-y-auto custom-scrollbar select-none z-30 shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
          <h3 className="text-[14.5px] font-bold text-[#0F172A]">Conversation Details</h3>
          <button
            onClick={() => dispatch(setIsInfoPanelOpen(false))}
            className="p-1.5 rounded-full text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
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

          {/* Group Name / User Name (Editable for Group) */}
          {conversation.type === "group" && isEditingName ? (
            <div className="flex items-center gap-1.5 w-full mt-1 mb-1">
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="flex-1 px-2.5 py-1 text-[14px] font-bold text-[#0F172A] bg-[#F8FAFC] border border-[#6C63FF] rounded-lg outline-none"
                autoFocus
              />
              <button
                onClick={handleRenameGroup}
                disabled={isSavingName}
                className="p-1.5 rounded-lg bg-[#6C63FF] text-white hover:bg-[#5a52e8] transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setGroupName(conversation.name || "");
                  setIsEditingName(false);
                }}
                className="p-1.5 rounded-lg bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mb-0.5 group/name">
              <h4 className="text-[16px] font-bold text-[#0F172A]">{displayName}</h4>
              {conversation.type === "group" && isCurrentUserAdmin && (
                <button
                  onClick={() => setIsEditingName(true)}
                  title="Rename Group"
                  className="p-1 rounded-md text-[#94A3B8] opacity-0 group-hover/name:opacity-100 hover:text-[#6C63FF] hover:bg-[#F8FAFC] transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <p className="text-[12px] font-medium text-[#10B981] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
            <span>{conversation.type === "group" ? `${conversation.participants.length} members` : isOnline ? "Online" : "Offline"}</span>
          </p>
        </div>

        <div className="p-5 space-y-5 flex-1">
          {/* Direct User Info */}
          {conversation.type === "direct" && otherParticipant && (
            <div className="space-y-3">
              <h5 className="text-[12px] uppercase font-bold text-[#94A3B8] tracking-wider">User Details</h5>
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <Phone className="w-4 h-4 text-[#6C63FF] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#94A3B8]">Phone Number</p>
                    <p className="font-semibold text-[#0F172A]">{otherParticipant.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                  <UserIcon className="w-4 h-4 text-[#6C63FF] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#94A3B8]">Display Name</p>
                    <p className="font-semibold text-[#0F172A]">{otherParticipant.name}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group Participants List (for groups) */}
          {conversation.type === "group" && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h5 className="text-[12px] uppercase font-bold text-[#94A3B8] tracking-wider flex items-center gap-1.5">
                  <span>Group Members</span>
                  <span>({conversation.participants.length})</span>
                </h5>
                {isCurrentUserAdmin && (
                  <button
                    onClick={() => setIsAddMemberOpen(true)}
                    className="text-[11.5px] font-bold text-[#6C63FF] hover:underline flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {conversation.participants.map((member) => {
                  const memberIsAdmin = isUserAdmin(member.id);
                  const isYou = member.id === currentUser?.id;

                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#F1F5F9] group transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Avatar src={member.avatarUrl} name={member.name} size="xs" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[12px] font-semibold text-[#0F172A] truncate">
                              {member.name} {isYou && "(You)"}
                            </p>
                            {/* Admin Badge */}
                            {memberIsAdmin && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-bold tracking-wide shrink-0">
                                <Crown className="w-2.5 h-2.5" />
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-[#94A3B8] truncate">{member.phone}</p>
                        </div>
                      </div>

                      {/* Member actions for Admin (only on other members) */}
                      {isCurrentUserAdmin && !isYou && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!memberIsAdmin && (
                            <button
                              onClick={() => handlePromoteAdmin(member.id, member.name)}
                              title="Promote to Admin"
                              className="p-1 rounded-md text-[#64748B] hover:text-[#6C63FF] hover:bg-white transition-colors"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            title="Remove Member"
                            className="p-1 rounded-md text-[#64748B] hover:text-red-500 hover:bg-white transition-colors"
                          >
                            <UserMinus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Leave Group Action (Only for Groups) */}
          {conversation.type === "group" && (
            <div className="pt-3 border-t border-[#F1F5F9]">
              <button
                onClick={handleLeaveGroup}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100 text-[12.5px] font-semibold text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Leave Group</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Add Members Modal */}
      {conversation.type === "group" && (
        <AddMemberModal
          isOpen={isAddMemberOpen}
          onClose={() => setIsAddMemberOpen(false)}
          groupId={conversation.id}
          existingParticipantIds={conversation.participants.map((p) => p.id)}
        />
      )}
    </>
  );
};
