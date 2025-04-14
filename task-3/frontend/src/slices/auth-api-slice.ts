import { API_ENDPOINTS } from "@/api/endpoints";
import { baseQuery } from "@/api/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
