import { makeRequest, ApiResult } from "./make-request";

type RegisterCredentials = {
  username: string;
  password: string;
};

export const register = (credentials: RegisterCredentials): Promise<ApiResult<void>> => {
  return makeRequest({
    url: "/api/registration",
    method: "POST",
    body: credentials,
  });
};
