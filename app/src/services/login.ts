interface LoginParams {
    username: string;
    password: string;
  }
  
  export const login = async ({username, password}: LoginParams) => {
  
    console.log(`Fetching: username`, username, `password`, password);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username, password})
      });
      console.log(response);
      return response.json();
    } catch (error) {
      console.error(error);
      return error;
    }  
}