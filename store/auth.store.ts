import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthUser } from "@/types/auth";

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false, isLoading: false, error: null };
  }
  const token = localStorage.getItem("auth_token");
  const storedUser = localStorage.getItem("auth_user");
  let user = null;
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch {
      // ignore
    }
  }
  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },
    updateProfile(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_user", JSON.stringify(state.user));
        }
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;
