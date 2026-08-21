"use client";

import { useState, useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addConversation, setActiveConversationId, setIsCreateGroupModalOpen } from "@/store/chat.store";
import { groupsApi } from "@/lib/api/groups.api";
import { CreateGroupPayload } from "@/types/group";
import toast from "react-hot-toast";

export function useGroups() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createGroup = useCallback(
    async (payload: CreateGroupPayload) => {
      setIsSubmitting(true);
      try {
        const newGroup = await groupsApi.createGroup(payload);
        dispatch(addConversation(newGroup));
        dispatch(setActiveConversationId(newGroup.id));
        dispatch(setIsCreateGroupModalOpen(false));
        toast.success(`Group "${payload.name}" created! 🎉`);
        return newGroup;
      } catch (error: any) {
        toast.error(error.message || "Failed to create group");
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch]
  );

  return {
    createGroup,
    isSubmitting,
    openModal: () => dispatch(setIsCreateGroupModalOpen(true)),
    closeModal: () => dispatch(setIsCreateGroupModalOpen(false)),
  };
}
