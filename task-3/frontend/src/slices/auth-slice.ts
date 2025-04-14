import { AppRootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  refreshToken: localStorage.getItem("refresh_token") ?? undefined,
  token: localStorage.getItem("token") ?? undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSingedIn(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("refresh_token", action.payload.refreshToken!);
      localStorage.setItem("token", action.payload.token!);
    },
    userSignedOut(state) {
      state.token = undefined;
      state.refreshToken = undefined;
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token");
    },
  },
});

export const { userSingedIn, userSignedOut } = authSlice.actions;

export const selectToken = (state: AppRootState) => state.auth.token;
export const selectRefreshToken = (state: AppRootState) => state.auth.refreshToken;

export default authSlice.reducer;
