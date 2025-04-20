// components/Auth/RedirectIfAuthenticated.tsx
import Cookies from "js-cookie";
import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = Cookies.get("jwt_token");
      if (!token) {
        setLoading(false);
        return;
      }
      fetch(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => (res.ok ? navigate("/home") : Promise.reject()))
        .catch(() => setLoading(false))
        .finally(() => setLoading(false));
    }, []); // run once on mount
  
    if (loading) return null;
    return children;
  };

export default RedirectIfAuthenticated;
