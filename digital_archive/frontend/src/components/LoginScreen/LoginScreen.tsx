import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./LoginScreen.module.css";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import SnackBarAction from "../snackbar/SnackBarAction";

const LoginScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const registerUser = async (login: string, password: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      setLoginError(true);
      enqueueSnackbar(
        <SnackBarAction type="error" title="Error" content={error.message} />
      );
      return;
    }

    enqueueSnackbar(
      <SnackBarAction
        type="success"
        title="Success"
        content="User registered successfully!"
      />
    );
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("API URL:", process.env.REACT_APP_API_URL as string);

    enqueueSnackbar(
      <SnackBarAction
        type="info"
        title="Registering..."
        content="Please wait"
      />
    );
    await registerUser(login, password);
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard} elevation={6}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create your account</h1>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <TextField
                fullWidth
                label="Login"
                variant="outlined"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setLoginError(false); 
                }}
                error={loginError}
                helperText={
                  loginError ? "Login already exists or is invalid" : "Choose unique username."
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formField}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={styles.inputField}
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              className={styles.loginButton}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
