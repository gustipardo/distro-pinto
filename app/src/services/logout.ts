
export const logout = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      console.log(response);
      return response.json();
    } catch (error) {
      console.error(error);
      return error;
    }
}