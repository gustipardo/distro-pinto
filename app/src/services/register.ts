interface RegisterParams {
  username: string;
  password: string;
  roleId: string;
}

export const register = async ({ username, password, roleId }: RegisterParams) => {

  console.log(`Fetching: username`, username, `password`, password, "roleId: ", roleId);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, roleId: parseInt(roleId) })
    });
    console.log(response);
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
