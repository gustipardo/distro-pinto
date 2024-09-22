export const getPaymentsByIdAndDate = async ({ date, invoiceId }: { date: string, invoiceId: number }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/payments?date=${date}&invoiceId=${invoiceId}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting payments by invoiceId and date");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};