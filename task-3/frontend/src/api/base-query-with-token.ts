import { AppRootState } from "@/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppRootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
