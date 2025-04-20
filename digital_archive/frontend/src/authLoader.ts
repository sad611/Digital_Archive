// src/authLoader.ts
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export async function authLoader() {
  const token = Cookies.get("jwt_token");
  if (!token) return redirect("/login");

  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    Cookies.remove("jwt_token");
    return redirect("/login");
  }
  return null; 
}
