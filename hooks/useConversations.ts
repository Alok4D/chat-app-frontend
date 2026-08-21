"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setConversations,
  addConversation,
  setActiveConversationId,
  setIsLoadingConversations,
  setSearchQuery,
  setFilterType,
} from "@/store/chat.store";
import { conversationsApi } from "@/lib/api/conversations.api";
import { ConversationFilterParams } from "@/types/conversation";
import toast from "react-hot-toast";

export function useConversations() {
  const dispatch = useAppDispatch();
  const {
    conversations,
    activeConversationId,
    searchQuery,
    filterType,
    isLoadingConversations,
  } = useAppSelector((state) => state.chat);

  const fetchConversations = useCallback(
    async (params?: ConversationFilterParams) => {
      dispatch(setIsLoadingConversations(true));
      try {
        const data = await conversationsApi.getConversations({
          search: searchQuery,
          ...params,
        });
        dispatch(setConversations(data));
      } catch (error: any) {
        toast.error(error?.message || "Failed to load conversations");
      } finally {
        dispatch(setIsLoadingConversations(false));
      }
    },
    [dispatch, searchQuery]
  );

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const selectConversation = useCallback(
    (id: string) => {
      dispatch(setActiveConversationId(id));
      conversationsApi.markAsRead(id).catch(console.error);
    },
    [dispatch]
  );

  // Filter conversations by filterType
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
      try {
        const conv = await conversationsApi.createDirectConversation(userId);
        dispatch(addConversation(conv));
        dispatch(setActiveConversationId(conv.id));
        return conv;
      } catch (error: any) {
        toast.error(error?.message || "Failed to start conversation");
        throw error;
      }
    },
    [dispatch]
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
