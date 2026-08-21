"use client";

import { useState, useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addConversation, setActiveConversationId, setIsCreateGroupModalOpen } from "@/redux/slices/chatSlice";
import { groupsApi } from "@/redux/features/groups/groupsApi";
import { CreateGroupPayload } from "@/types/group";
import toast from "react-hot-toast";

export function useGroups() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createGroup = useCallback(
    async (payload: CreateGroupPayload) => {
      setIsSubmitting(true);
      try {
        const newGroup = await dispatch(
          groupsApi.endpoints.createGroup.initiate(payload)
        ).unwrap();
        dispatch(addConversation(newGroup));
        dispatch(setActiveConversationId(newGroup.id));
        dispatch(setIsCreateGroupModalOpen(false));
        toast.success(`Group "${payload.name}" created! 🎉`);
        return newGroup;
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Failed to create group");
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
