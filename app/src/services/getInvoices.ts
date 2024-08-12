export const getInvoices = async (from?: string, to?: string) => {
    try {
      const url = from
        ? `${import.meta.env.VITE_API_URL}/invoices?from=${from}&to=${to}`
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
  