import Cookies from "js-cookie";

export const registerUser = async (
  login: string,
  password: string
): Promise<any> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  console.log(data)

  Cookies.set("jwt_token", data.access_token, {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });

  return data;
};

export const loginUser = async (
  login: string,
  password: string
): Promise<any> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  Cookies.set("jwt_token", data.access_token, {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });

  return data;
};
