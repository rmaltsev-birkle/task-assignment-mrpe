import { makeRequest, ApiResult } from "./make-request";
import { extractUserFromToken } from "./extract-user-from-token";

type AuthResponse = {
  refresh_token: string;
  token: string;
};

export type AuthData = {
  id: number;
  username: string;
  token: string;
  refreshToken: string;
};

type AuthCredentials = {
  username: string;
  password: string;
};

export const authenticate = (credentials: AuthCredentials): Promise<ApiResult<AuthData>> => {
  return makeRequest<AuthData>({
    url: "/api/login_check",
    method: "POST",
    body: credentials,
    transform: (response: unknown) => {
      const authResponse = response as AuthResponse;
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
