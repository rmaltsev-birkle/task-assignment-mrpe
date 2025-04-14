import { makeRequest, ApiResult } from "./make-request";
import { extractUserFromToken } from "./extract-user-from-token";
import type { AuthData } from "./authenticate";

type RefreshTokenResponse = {
  refresh_token: string;
  token: string;
};

export const reauthenticate = (refreshToken: string): Promise<ApiResult<AuthData>> => {
  return makeRequest<AuthData>({
    url: "/api/token/refresh",
    method: "POST",
    body: { refresh_token: refreshToken },
    transform: (response: unknown) => {
      const authResponse = response as RefreshTokenResponse;
      const user = extractUserFromToken(authResponse.token);
      return {
        id: user.id,
        username: user.username,
        token: authResponse.token,
        refreshToken: authResponse.refresh_token,
      };
    },
  });
};
