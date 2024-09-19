export const getInvoiceById = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices/${id}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Error getting invoice by id");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};