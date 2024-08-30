import { authStore } from "@/store/authStore";


export const fetchWithTokenRefresh = async (url: string, options: RequestInit = {}) => {
  const accessToken = authStore((state) => state.accessToken);
  const refreshAcessToken = authStore((state) => state.refreshAcessToken);
  const logout = authStore((state) => state.logout);

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) { // Token expirado o inválido
    // Intentar refrescar el token
    const refreshResponse = await refreshAcessToken();

    if (refreshResponse.ok) {
      // Reintentar la petición original con el nuevo token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`, // Nuevo access-token
        },
      });
    } else {
      // Redirigir al login si el refresh token es inválido o ha expirado
      await logout();
      window.location.href = '/login'; // O usando un router navigate('/login');
    }
  }

  return response;
};
