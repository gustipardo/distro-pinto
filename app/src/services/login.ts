interface LoginParams {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParams) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}