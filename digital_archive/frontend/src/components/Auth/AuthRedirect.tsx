import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (!token) return;

    const validateToken = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid or expired token");
        }

        const data = await response.json();
        if (data.message === "Token is valid") {
          navigate("/home");
        } else {
          throw new Error("Token invalid");
        }
      } catch (err) {
        Cookies.remove("jwt_token");
        enqueueSnackbar("Session expired. Please log in again.", { variant: "error" });
        navigate("/");
      }
    };

    validateToken();
  }, [navigate, enqueueSnackbar]);

  return children;
};

export default AuthRedirect;
