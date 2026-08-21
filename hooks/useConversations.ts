"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setConversations,
  addConversation,
  setActiveConversationId,
  setIsLoadingConversations,
  setFilterType,
  setSearchQuery,
} from "@/store/chat.store";
import { conversationsApi } from "@/lib/api/conversations.api";
import { Conversation, ConversationFilterParams } from "@/types/conversation";

export function useConversations() {
  const dispatch = useAppDispatch();
  const {
    conversations,
    activeConversationId,
    filterType,
    searchQuery,
    isLoadingConversations,
  } = useAppSelector((state) => state.chat);

  const fetchConversations = useCallback(
    async (params?: ConversationFilterParams) => {
      dispatch(setIsLoadingConversations(true));
      try {
        const data = await conversationsApi.getConversations({
          type: filterType,
          search: searchQuery,
          ...params,
        });
        dispatch(setConversations(data));
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        dispatch(setIsLoadingConversations(false));
      }
    },
    [dispatch, filterType, searchQuery]
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

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const startDirectConversation = useCallback(
    async (userId: string) => {
      const conv = await conversationsApi.createDirectConversation(userId);
      dispatch(addConversation(conv));
      dispatch(setActiveConversationId(conv.id));
      return conv;
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (filter: "all" | "direct" | "group") => {
      dispatch(setFilterType(filter));
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
    conversations,
    activeConversation,
    activeConversationId,
    isLoading: isLoadingConversations,
    filterType,
    searchQuery,
    selectConversation,
    startDirectConversation,
    refreshConversations: fetchConversations,
    setFilter: changeFilter,
    setSearch: searchConversations,
  };
}
