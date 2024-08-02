export const getPendingInvoicesFromSuppliers = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/invoices/pending-suppliers`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error getting pending invoices from suppliers");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


  