export const refreshToken = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/users/refresh-token`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Asegúrate de incluir las cookies
        });
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}
