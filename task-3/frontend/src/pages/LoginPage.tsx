import { authenticate } from "@/api/authenticate";
import { userSingedIn } from "@/slices/auth-slice";
import { AppDispatch } from "@/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

const credentialsSchema = z.object({
  username: z.string().min(3).describe("username"),
  password: z.string().min(6).describe("password"),
});

type Credentials = z.infer<typeof credentialsSchema>;

interface LoginFormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLTextAreaElement;
}

interface LoginFormElements extends HTMLFormElement {
  readonly elements: LoginFormFields;
}

type FieldErrors = z.ZodError<Credentials>["formErrors"]["fieldErrors"];

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [errors, setErrors] = useState<string[] | undefined>();
  const [existingUser, setExistingUser] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username ?? "");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<LoginFormElements>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    const validationResult = credentialsSchema.safeParse({
      username,
      password,
    });

    setFieldErrors(validationResult.error?.formErrors.fieldErrors);

    if (!validationResult.success) {
      return;
    }

    const authResult = await authenticate({ username, password });

    if (!authResult.success) {
      setErrors(authResult.errors);
      setExistingUser(Boolean(authResult.meta?.existing_user));
      return;
    }

    form.reset();

    dispatch(
      userSingedIn({
        token: authResult.data.token,
        refreshToken: authResult.data.refreshToken,
      }),
    );

    enqueueSnackbar("Successfully signed in", { variant: "success" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Card variant="elevation" sx={{ maxWidth: { sm: 384, xs: "100%" }, width: "100%" }}>
        <CardHeader title="Sign In" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {errors?.map((error) => (
                <Alert key={error} severity="error">
                  {error}
                </Alert>
              ))}

              <TextField
                fullWidth
                error={!!fieldErrors?.username}
                label="Username"
                variant="outlined"
                name="username"
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
                helperText={fieldErrors?.username?.join("/n")}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                error={!!fieldErrors?.password}
                helperText={fieldErrors?.password?.join("/n")}
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "hide the password" : "display the password"}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button type="submit" variant="contained" fullWidth>
                Enter
              </Button>

              {existingUser ? null : (
                <Stack spacing={2}>
                  <Alert severity="info">
                    This account does not exist, would you like to register it?
                  </Alert>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/register", { state: { username } })}
                  >
                    Register
                  </Button>
                </Stack>
              )}
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
