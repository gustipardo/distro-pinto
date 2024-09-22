export const getSuppliersPaymentsByDate = async (date: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/supplier/${date}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting suppliers payments by date");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};