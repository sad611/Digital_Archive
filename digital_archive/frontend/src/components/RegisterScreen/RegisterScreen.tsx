import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { registerUser } from "../../services/authService"; // Adjust the path if necessary
import SnackBarAction from "../snackbar/SnackBarAction"; // Your SnackBarAction component
import styles from "./RegisterScreen.module.css"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegisterError(false);

    if (password !== confirmPassword) {
      enqueueSnackbar(
        <SnackBarAction
          type="error"
          title="Password Mismatch"
          content="Your passwords do not match."
        />
      );
      setIsSubmitting(false);
      return;
    }

    enqueueSnackbar(
      <SnackBarAction
        type="info"
        title="Registering..."
        content="Creating your account"
      />
    );

    try {
      await registerUser(login, password);

      enqueueSnackbar(
        <SnackBarAction
          type="success"
          title="Registration Successful!"
          content="You are now registered."
        />
      );

      navigate("/home");
    } catch (error: any) {
      if (error.message === "Login already exists.") {
        setRegisterError(true);

        enqueueSnackbar(
          <SnackBarAction
            type="error"
            title="Registration Failed"
            content={error.message || "Please try again."}
          />
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <Card className={styles.registerCard} elevation={8}>
        <div className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Create your account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome! Please fill in the details to create an account.
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
                error={registerError}
                helperText={registerError ? "Username already exists." : ""}
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
                error={registerError && !password}
                helperText={
                  registerError && !password ? "Password is required." : ""
                }
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
                        tabIndex={-1}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.formField}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={registerError && confirmPassword !== password}
                helperText={
                  registerError && confirmPassword !== password
                    ? "Passwords must match."
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        tabIndex={-1}
                        aria-label="toggle password visibility"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                className={styles.registerButton}
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                {isSubmitting ? "Registering..." : "Sign up"}
              </Button>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                className={styles.loginButton}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterScreen;
