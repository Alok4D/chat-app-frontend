"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  updateProfile,
} from "@/store/auth.store";
import { authApi } from "@/lib/api/auth.api";
import { LoginCredentials, AuthUser } from "@/types/auth";
import { ROUTES } from "@/lib/constants/routes";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      dispatch(loginStart());
      try {
        const response = await authApi.login(credentials);
        dispatch(loginSuccess(response));
        toast.success(`Welcome back, ${response.user.name}!`);
        router.push(ROUTES.CHAT);
        return response;
      } catch (error: any) {
        const msg = error.message || "Failed to login";
        dispatch(loginFailure(msg));
        toast.error(msg);
        throw error;
      }
    },
    [dispatch, router]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.push(ROUTES.LOGIN);
    }
  }, [dispatch, router]);

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
