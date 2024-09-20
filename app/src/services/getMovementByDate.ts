export const getMovementByDate = async (date: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/movement/${date}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting movement by date");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};