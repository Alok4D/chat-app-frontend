"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUsers } from "@/redux/slices/chatSlice";
import { usersApi } from "@/redux/features/users/usersApi";
import { User, UserFilterParams } from "@/types/user";

export function useUsers(initialFetch = true) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.chat.users);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(
    async (params?: UserFilterParams) => {
      setIsLoading(true);
      try {
        const query = params?.search || "";
        const data = await dispatch(
          usersApi.endpoints.searchUsers.initiate(query, { forceRefetch: true })
        ).unwrap();
        const filtered = data.filter((u) => u.id !== currentUser?.id);
        dispatch(setUsers(filtered));
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, currentUser]
  );

  useEffect(() => {
    if (initialFetch) {
      fetchUsers();
    }
  }, [fetchUsers, initialFetch]);

  return {
    users,
    isLoading,
    fetchUsers,
  };
}
