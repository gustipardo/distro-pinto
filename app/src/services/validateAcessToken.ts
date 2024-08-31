export const validateAccessToken = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/users/me`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Asegúrate de incluir las cookies
        });
        return response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}
