import Cookies from "js-cookie";
import { createBrowserRouter, redirect } from "react-router-dom";

import { authLoader } from "./authLoader";
import { HomeScreen, LoginScreen, RegisterScreen } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
    loader: () => {
      const token = Cookies.get("jwt_token");
      return token ? redirect("/home") : null;
    },
  },
  {
    path: "/register",
    element: <RegisterScreen />,
    loader: () => {
      const token = Cookies.get("jwt_token");
      return token ? redirect("/home") : null;
    },
  },
  {
    path: "/home",
    element: <HomeScreen />,
    loader: authLoader,
  },
  { path: "*", loader: () => redirect("/login") },
]);
