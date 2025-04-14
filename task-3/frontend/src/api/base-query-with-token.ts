import { AppRootState } from "@/store";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { baseQuery, BaseQueryError, BaseQueryOptions } from "./base-query";

export const baseQueryWithToken: BaseQueryFn<BaseQueryOptions, unknown, BaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const token = (api.getState() as AppRootState).auth.token;

  const queryArgs = typeof args === "string" ? { url: args } : args;

  return baseQuery(
    {
      ...queryArgs,
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    },
    api,
    extraOptions,
  );
};
