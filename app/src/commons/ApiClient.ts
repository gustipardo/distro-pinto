import { authStore } from "@/store/authStore";

const baseURL = process.env.VITE_API_URL;

async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const setAccessToken = authStore((state) => state.setAccessToken)
  const accessToken = authStore((state) => state.accessToken);
  const logout = authStore((state) => state.logout);


  const headers = new Headers(init?.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${baseURL}${input}`, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    // El access_token ha expirado, intentar renovar con el refresh_token
    const refreshToken = authStore.getRefreshToken();
    if (refreshToken) {
      const refreshResponse = await fetch(`${baseURL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setAccessToken(data.accessToken);

        // Reintentar la petición original con el nuevo access_token
        headers.set('Authorization', `Bearer ${data.accessToken}`);
        return fetch(`${baseURL}${input}`, {
          ...init,
          headers,
        });
      } else {
        // El refresh_token también es inválido, cerrar sesión
        logout();
        throw new Error('Session expired. Please log in again.');
      }
    }
  }

  return response;
}

export { fetchWithAuth };
