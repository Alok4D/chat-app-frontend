"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setConversations,
  addConversation,
  setActiveConversationId,
  setIsLoadingConversations,
  setSearchQuery,
  setFilterType,
} from "@/redux/slices/chatSlice";
import { conversationsApi } from "@/redux/features/conversations/conversationsApi";
import { ConversationFilterParams } from "@/types/conversation";
import toast from "react-hot-toast";

export function useConversations() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const {
    conversations,
    activeConversationId,
    searchQuery,
    filterType,
    isLoadingConversations,
  } = useAppSelector((state) => state.chat);

  const fetchConversations = useCallback(
    async (params?: ConversationFilterParams) => {
      if (!currentUser?.id) return;
      dispatch(setIsLoadingConversations(true));
      try {
        const data = await dispatch(
          conversationsApi.endpoints.getConversations.initiate(
            { search: searchQuery, ...params },
            { forceRefetch: true }
          )
        ).unwrap();
        dispatch(setConversations(data));
      } catch (error: any) {
        toast.error(error?.message || "Failed to load conversations");
      } finally {
        dispatch(setIsLoadingConversations(false));
      }
    },
    [dispatch, searchQuery, currentUser?.id]
  );

  useEffect(() => {
    if (currentUser?.id) {
      fetchConversations();
    }
  }, [currentUser?.id, fetchConversations]);

  const selectConversation = useCallback(
    (id: string) => {
      dispatch(setActiveConversationId(id));
      dispatch(conversationsApi.endpoints.markAsRead.initiate(id));
    },
    [dispatch]
  );

  const filteredConversations = conversations.filter((c) => {
    if (filterType === "direct") return c.type === "direct";
    if (filterType === "group") return c.type === "group";
    return true;
  });

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const startDirectConversation = useCallback(
    async (userId: string) => {
      // 1. Check if conversation already exists in state
      const existing = conversations.find(
        (c) =>
          c.type === "direct" &&
          c.participants.some((p) => p.id === userId)
      );
      if (existing) {
        dispatch(setActiveConversationId(existing.id));
        return existing;
      }

      try {
        const conv = await dispatch(
          conversationsApi.endpoints.createDirectConversation.initiate(userId)
        ).unwrap();
        dispatch(addConversation(conv));
        dispatch(setActiveConversationId(conv.id));
        return conv;
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Failed to start conversation");
        throw error;
      }
    },
    [conversations, dispatch]
  );

  const searchConversations = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  return {
    conversations: filteredConversations,
    allConversations: conversations,
    activeConversation,
    activeConversationId,
    filterType,
    setFilterType: (type: "all" | "direct" | "group") => dispatch(setFilterType(type)),
    isLoading: isLoadingConversations,
    searchQuery,
    selectConversation,
    startDirectConversation,
    refreshConversations: fetchConversations,
    setSearch: searchConversations,
  };
}
