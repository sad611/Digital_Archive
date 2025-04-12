export const registerUser = async (
  login: string,
  password: string
): Promise<any> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/register`,
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

  return response.json();
};

export const loginUser = async (
  login: string,
  password: string
): Promise<any> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/login`,
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

  return response.json();
};
