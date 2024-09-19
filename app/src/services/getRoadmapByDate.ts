export const getRoadmapByDate = async (date: string) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/invoices/roadmap/date/${date}`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting roadmap");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw error to handle it in the calling function
    }
};
