"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  updateProfile,
} from "@/redux/slices/authSlice";
import { resetChatState } from "@/redux/slices/chatSlice";
import { authApi } from "@/redux/features/auth/authApi";
import { conversationsApi } from "@/redux/features/conversations/conversationsApi";
import { messagesApi } from "@/redux/features/messages/messagesApi";
import { usersApi } from "@/redux/features/users/usersApi";
import { groupsApi } from "@/redux/features/groups/groupsApi";
import { LoginCredentials, AuthUser } from "@/types/auth";
import { ROUTES } from "@/lib/constants/routes";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const resetAllAppData = useCallback(() => {
    dispatch(resetChatState());
    dispatch(authApi.util.resetApiState());
    dispatch(conversationsApi.util.resetApiState());
    dispatch(messagesApi.util.resetApiState());
    dispatch(usersApi.util.resetApiState());
    dispatch(groupsApi.util.resetApiState());
  }, [dispatch]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      // Clear any previous user state before starting fresh login
      resetAllAppData();
      dispatch(loginStart());

      try {
        const response = await dispatch(
          authApi.endpoints.login.initiate(credentials)
        ).unwrap();

        dispatch(loginSuccess(response));
        toast.success(`Welcome back, ${response.user.name}!`);
        router.push(ROUTES.CHAT);
        return response;
      } catch (error: any) {
        const msg = error?.data?.message || error?.message || "Failed to login";
        dispatch(loginFailure(msg));
        toast.error(msg);
        throw error;
      }
    },
    [dispatch, router, resetAllAppData]
  );

  const logout = useCallback(async () => {
    try {
      await dispatch(authApi.endpoints.logout.initiate()).unwrap();
    } catch {
      // ignore logout errors
    } finally {
      dispatch(logoutAction());
      resetAllAppData();

      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        sessionStorage.clear();
      }

      toast.success("Logged out successfully");
      router.push(ROUTES.LOGIN);
    }
  }, [dispatch, router, resetAllAppData]);

  const updateCurrentUserProfile = useCallback(
    (data: Partial<AuthUser>) => {
      dispatch(updateProfile(data));
      toast.success("Profile updated");
    },
    [dispatch]
  );

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    logout,
    updateProfile: updateCurrentUserProfile,
  };
}
