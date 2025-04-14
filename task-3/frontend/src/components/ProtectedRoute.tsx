import { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

type ProtectedRouteProps = PropsWithChildren & {
  isAllowed: boolean;
  redirectPath?: string;
};

export default function ProtectedRoute({
  isAllowed,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}
