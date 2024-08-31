import { refreshToken as refreshTokenService } from '@/services/refreshAccessToken';
import { authStore } from '@/store/authStore';

export const fetchWithTokenRefresh = async (url: string, options?: RequestInit): Promise<Response> => {
  const accessToken = authStore((state) => state.accessToken)


  // Configura el header Authorization
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  // Realiza la primera petición
  let response = await fetch(url, { ...options, headers });

  // Si la respuesta es 401, intentamos refrescar el token
  if (response.status === 401) {
    try {
      const newTokenData = await refreshTokenService();
      authStore.setState({ accessToken: newTokenData.accessToken });

      // Reintentamos la petición con el nuevo token
      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${newTokenData.accessToken}`,
      };

      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Si el refresh token falla, redirige al usuario al login
      authStore.getState().logout();
      window.location.href = '/login';
      return response; // O retorna un error personalizado
    }
  }

  return response;
};
