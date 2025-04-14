import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { makeRequest } from "./make-request";

export type BaseQueryOptions =
  | {
      url: string;
      method?: "GET" | "POST" | "PUT" | "DELETE";
      headers?: Record<string, string>;
      body?: unknown;
    }
  | string;

export type BaseQueryError = {
  message: string;
  meta?: Record<string, unknown>;
};

export const baseQuery: BaseQueryFn<BaseQueryOptions, unknown, BaseQueryError> = async (
  args,
  { signal },
) => {
  const queryArgs = typeof args === "string" ? { url: args } : args;

  const result = await makeRequest({
    url: queryArgs.url,
    method: queryArgs.method,
    body: queryArgs.body,
    headers: queryArgs.headers,
    signal,
  });

  if (!result.success) {
    return {
      error: { message: result.errors[0] || "Unknown error occurred", meta: result.meta },
    };
  }

  return { data: result.data };
};
