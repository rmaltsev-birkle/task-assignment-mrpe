import { baseQuery } from "@/api/base-query";
import { API_ENDPOINTS } from "@/api/endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
  username: string;
  password: string;
}

export const registerApiSlice = createApi({
  reducerPath: "registerApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.REGISTER,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApiSlice;
