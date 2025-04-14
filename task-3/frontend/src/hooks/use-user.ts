import { extractUserFromToken } from "@/api/extract-user-from-token";
import { selectToken } from "@/slices/auth-slice";
import { useSelector } from "react-redux";

export type User = {
  id: number;
  username: string;
};

export const useUser = (): User | undefined => {
  const token = useSelector(selectToken);
  if (!token) {
    return;
  }
  return extractUserFromToken(token);
};
