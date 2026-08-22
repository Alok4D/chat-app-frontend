"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ParticipantSelector } from "./ParticipantSelector";
import { useAppDispatch } from "@/redux/hooks";
import { groupsApi } from "@/redux/features/groups/groupsApi";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

export interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  existingParticipantIds: string[];
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  groupId,
  existingParticipantIds,
}) => {
  const dispatch = useAppDispatch();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (userId: string) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAdd = async () => {
    if (selectedIds.length === 0) return;
    setIsLoading(true);
    try {
      await dispatch(
        groupsApi.endpoints.addParticipants.initiate({
          groupId,
          userIds: selectedIds,
        })
      ).unwrap();
      toast.success("Members added successfully! 🎉");
      setSelectedIds([]);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to add members");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Members to Group"
      description="Search and select new members to join this group"
    >
      <div className="space-y-4">
        <ParticipantSelector
          selectedUserIds={selectedIds}
          onToggleParticipant={handleToggle}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F1F5F9]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={isLoading || selectedIds.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[#6C63FF] text-white hover:bg-[#5a52e8] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#6C63FF]/25 transition-all"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Add Members ({selectedIds.length})
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
