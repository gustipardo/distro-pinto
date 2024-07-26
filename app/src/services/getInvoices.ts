export const getInvoices = async (date?: string) => {
    try {
      const url = date
        ? `${import.meta.env.VITE_API_URL}/invoices?date=${date}`
        : `${import.meta.env.VITE_API_URL}/invoices`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error getting invoices");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error to handle it in the calling function
    }
  };
  