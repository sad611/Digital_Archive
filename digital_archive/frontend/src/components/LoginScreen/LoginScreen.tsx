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
import { useSnackbar } from "notistack";
import SnackBarAction from "../snackbar/SnackBarAction";
import { loginUser, registerUser } from "../../services/authService";

const LoginScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(process.env.REACT_APP_API_URL);

    enqueueSnackbar(
      <SnackBarAction
        type="info"
        title="Registering..."
        content="Please wait"
      />
    );

    try {
    //   await registerUser(login, password);
    //   enqueueSnackbar(
    //     <SnackBarAction
    //       type="success"
    //       title="Success"
    //       content="User registered successfully!"
    //     />
    //   );
    // } catch (error: any) {
    //   setLoginError(true);
    //   enqueueSnackbar(
    //     <SnackBarAction type="error" title="Error" content={error.message} />
    //   );
    // }
      console.log(await loginUser(login, password));
      enqueueSnackbar(
        <SnackBarAction
          type="success"
          title="Success"
          content="User logged in successfully!"
        />
      );
    } catch (error: any) {
      setLoginError(true);
      enqueueSnackbar(
        <SnackBarAction type="error" title="Error" content={error.message} />
      );
    }
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
                  loginError
                    ? "Login already exists or is invalid"
                    : "Choose unique username."
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
