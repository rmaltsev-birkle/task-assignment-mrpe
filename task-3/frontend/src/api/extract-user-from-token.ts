import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  username: string;
}

export function extractUserFromToken(token: string): TokenPayload {
  const decodedPayload = jwtDecode<TokenPayload>(token);
  return decodedPayload;
}
