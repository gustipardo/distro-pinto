export const deleteUsers = async ({ id }: { id: string }) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/users/${id}`;
        const response = await fetch(url, {
            credentials: 'include',
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Error deleting user");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


