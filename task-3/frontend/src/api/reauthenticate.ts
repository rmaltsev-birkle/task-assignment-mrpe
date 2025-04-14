import { API_ENDPOINTS } from "./endpoints";
import { makeRequest, ApiResult } from "./make-request";

type RefreshTokenResponse = {
  refresh_token: string;
  token: string;
};

export const reauthenticate = (refreshToken: string): Promise<ApiResult<RefreshTokenResponse>> => {
  return makeRequest<RefreshTokenResponse>({
    url: API_ENDPOINTS.REFRESH_TOKEN,
    method: "POST",
    body: { refresh_token: refreshToken },
    transform: (response: unknown) => {
      const authResponse = response as RefreshTokenResponse;
      return {
        token: authResponse.token,
        refresh_token: authResponse.refresh_token,
      };
    },
  });
};
