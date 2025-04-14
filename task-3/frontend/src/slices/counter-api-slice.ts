import { baseQueryWithReauth } from "@/api/base-query-with-reauth";
import { Optional } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

type Counter = {
  id: number;
  value: number;
};

export const countersApiSlice = createApi({
  reducerPath: "counters",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Counter"],
  endpoints: (builder) => {
    return {
      getCounters: builder.query<Counter[], { userId?: number }>({
        query: ({ userId }) => `/counters?user=${userId}`,
        providesTags: [{ type: "Counter" }],
      }),
      getCounter: builder.query<Counter, { id: number }>({
        query: ({ id }) => `/counters/${id}`,
        providesTags: [{ type: "Counter" }],
      }),
      createCounter: builder.mutation<Counter, Omit<Counter, "id">>({
        query: (counter) => ({
          url: "/counters",
          method: "POST",
          body: counter,
        }),
        invalidatesTags: [{ type: "Counter" }],
      }),
      updateCounter: builder.mutation<Counter, Counter>({
        query: (counter) => ({
          url: `/counters/${counter.id}`,
          method: "PUT",
          body: counter,
        }),
        invalidatesTags: [{ type: "Counter" }],
      }),
      upsertCounter: builder.mutation<Counter, Optional<Counter, "id">>({
        query: (counter) => ({
          url: `/counters${counter.id ? `/${counter.id}` : ""}`,
          method: counter.id ? "PUT" : "POST",
          body: counter,
        }),
        invalidatesTags: [{ type: "Counter" }],
      }),
    };
  },
});

export const {
  useGetCounterQuery,
  useGetCountersQuery,
  useCreateCounterMutation,
  useUpdateCounterMutation,
  useUpsertCounterMutation,
} = countersApiSlice;
