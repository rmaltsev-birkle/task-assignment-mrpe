import { Container, Stack } from "@mui/material";
import { useUser } from "./hooks/use-user";
import { Outlet, useLocation } from "react-router";
import Navigation from "./components/Navigation";

export default function Layout() {
  const user = useUser();
  const location = useLocation();
  return (
    <Container>
      <Stack spacing={4}>
        <Navigation current={location.pathname} user={user} />
        <Outlet />
      </Stack>
    </Container>
  );
}
