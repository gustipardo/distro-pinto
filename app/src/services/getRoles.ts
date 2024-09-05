export const getRoles = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/users/roles`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting roles");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw error to handle it in the calling function
    }
}
