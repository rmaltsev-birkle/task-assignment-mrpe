import { userSignedOut, userSingedIn } from "@/slices/auth-slice";
import { AppRootState } from "@/store";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { baseQueryWithToken } from "./base-query-with-token";
import { reauthenticate } from "./reauthenticate";
import { BaseQueryError, BaseQueryOptions } from "./base-query";

export const baseQueryWithReauth: BaseQueryFn<BaseQueryOptions, unknown, BaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQueryWithToken(args, api, extraOptions);

  if (result.error?.meta?.status === 401) {
    const authState = (api.getState() as AppRootState).auth;
    if (!authState.refreshToken) {
      return result;
    }

    const reauthResult = await reauthenticate(authState.refreshToken);
    if (reauthResult.success) {
      api.dispatch(
        userSingedIn({
          token: reauthResult.data.token,
          refreshToken: reauthResult.data.refresh_token,
        }),
      );

      return await baseQueryWithToken(args, api, extraOptions);
    }

    api.dispatch(userSignedOut());
  }

  return result;
};
