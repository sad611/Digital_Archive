import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./LoginScreen.module.css";
import { useSnackbar } from "notistack";
import SnackBarAction from "../snackbar/SnackBarAction";
import { loginUser } from "../../services/authService";

import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(false);

    enqueueSnackbar(
      <SnackBarAction
        type="info"
        title="Authenticating..."
        content="Verifying your credentials"
      />
    );

    try {
      await loginUser(login, password);

      enqueueSnackbar(
        <SnackBarAction
          type="success"
          title="Welcome back!"
          content="Logged in successfully."
        />
      );

      navigate("/home");
    } catch (error: any) {
      setLoginError(true);
      enqueueSnackbar(
        <SnackBarAction
          type="error"
          title="Authentication Failed"
          content={error.message || "Please check your login credentials."}
        />
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard} elevation={8}>
        <div className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Login to your account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome back. Please enter your details.
          </Typography>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formField}>
              <TextField
                fullWidth
                label="Username or Email"
                variant="outlined"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                error={loginError}
                helperText={loginError ? "Invalid credentials." : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
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
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.buttonGroupRegister} role="group">
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Button
                fullWidth
                variant="contained"
                size="large"
                className={styles.registerButton}
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
