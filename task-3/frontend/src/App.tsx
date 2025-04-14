import { Route, Routes, useLocation } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./hooks/use-user";
import CounterPage from "./pages/CounterPage";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  const user = useUser();
  const location = useLocation();
  const origin = location.state?.from?.pathname ?? "/counter";

  return (
    <>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route element={<ProtectedRoute redirectPath="/login" isAllowed={!!user} />}>
            <Route path="counter" element={<CounterPage />} />
          </Route>
          <Route element={<ProtectedRoute redirectPath={origin} isAllowed={!user} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route
            path="logout"
            element={
              <ProtectedRoute redirectPath="/" isAllowed={!!user}>
                <LogoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
