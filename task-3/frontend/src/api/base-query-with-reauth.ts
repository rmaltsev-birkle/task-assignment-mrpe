import { userSignedOut, userSingedIn } from "@/slices/auth-slice";
import { AppRootState } from "@/store";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./base-query-with-token";
import { reauthenticate } from "./reauthenticate";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let result = await baseQueryWithToken(args, store, extraOptions);

  if (result.error && result.error.status === 401) {
    const authState = (store.getState() as AppRootState).auth;
    if (!authState.refreshToken) {
      return result;
    }

    const reauthResult = await reauthenticate(authState.refreshToken);
    if (reauthResult.success) {
      store.dispatch(
        userSingedIn({
          token: reauthResult.data.token,
          refreshToken: reauthResult.data.refreshToken,
        }),
      );

      // Retry the original request
      result = await baseQueryWithToken(args, store, extraOptions);
    } else {
      store.dispatch(userSignedOut());
    }
  }
  return result;
};
