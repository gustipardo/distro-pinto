interface RegisterParams {
    username: string;
    password: string;
  }
  
  export const register = async ({username, password}: RegisterParams) => {
  
    console.log(`Fetching: username`, username, `password`, password);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      console.log(response);
      return response.json();
    } catch (error) {
      console.error(error);
      return error;
    }  
}
