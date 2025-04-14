import { register } from "@/api/register";
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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

const credentialsSchema = z
  .object({
    username: z.string().min(3).describe("username"),
    password: z.string().min(6).describe("password"),
    passwordConfirmation: z.string().min(6).describe("password confirmation"),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirmation;
    },
    {
      message: "Passwords don't match",
      path: ["passwordConfirmation"],
    },
  );

type Credentials = z.infer<typeof credentialsSchema>;

interface RegisterFormFields extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLTextAreaElement;
  passwordConfirmation: HTMLTextAreaElement;
}

interface RegisterFormElements extends HTMLFormElement {
  readonly elements: RegisterFormFields;
}

type FieldErrors = z.ZodError<Credentials>["formErrors"]["fieldErrors"];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [errors, setErrors] = useState<string[] | undefined>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username ?? "");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<RegisterFormElements>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const passwordConfirmation = form.elements.passwordConfirmation.value;

    const validationResult = credentialsSchema.safeParse({
      username,
      password,
      passwordConfirmation,
    });

    setFieldErrors(validationResult.error?.formErrors.fieldErrors);

    if (!validationResult.success) {
      return;
    }

    const registrationResult = await register({ username, password });

    if (!registrationResult.success) {
      setErrors(registrationResult.errors);
      return;
    }

    form.reset();

    enqueueSnackbar("Successfully registred new account", {
      variant: "success",
    });

    navigate("/login", { state: { username } });
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
        <CardHeader title="Register" />
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
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
                label="Username"
                variant="outlined"
                name="username"
                type="text"
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

              <TextField
                fullWidth
                error={!!fieldErrors?.passwordConfirmation}
                helperText={fieldErrors?.passwordConfirmation?.join("/n")}
                label="Repeat Password"
                variant="outlined"
                name="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
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
                          aria-label={
                            showPasswordConfirmation ? "hide the password" : "display the password"
                          }
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
