import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import Link from "@mui/material/Link";
import { useState } from "react";
import { stringAvatar } from "@/lib/utils";
import { User } from "@/hooks/use-user";
import { Link as RouterLink } from "react-router";

type LinkProps = { url: string; name: string };

const pages: LinkProps[] = [
  {
    url: "/",
    name: "Landing",
  },
  {
    url: "/counter",
    name: "Counter",
  },
];

const settings: LinkProps[] = [
  {
    url: "/logout",
    name: "Sign Out",
  },
];

interface NavigationProps {
  current?: string;
  user?: User;
}

export default function Navigation({ current, user }: NavigationProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PlusOneIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            <Link component={RouterLink} to="/" sx={{ color: "white" }}>
              COUNTER
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link component={RouterLink} underline="none" to={page.url}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PlusOneIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link component={RouterLink} sx={{ color: "white" }} to="/">
              COUNTER
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.url}
                href={page.url}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: current === page.url ? "Highlight" : "white",
                  display: "block",
                }}
                LinkComponent={({ href, ...props }) => (
                  <Link {...props} component={RouterLink} to={href}>
                    {page.name}
                  </Link>
                )}
              />
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <Button
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    startIcon={<Avatar {...stringAvatar(user.username)} />}
                  >
                    <Typography noWrap sx={{ my: 2, color: "white", display: "block" }}>
                      {user.username}
                    </Typography>
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link component={RouterLink} underline="none" to={setting.url}>
                          {setting.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Typography>
                <Link
                  component={RouterLink}
                  sx={{ color: current === "/login" ? "Highlight" : "white" }}
                  underline="none"
                  to="/login"
                >
                  Sign In
                </Link>
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
