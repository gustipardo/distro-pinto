export const getCustomers = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/entities/customers`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error getting customers");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error to handle it in the calling function
    }
  };
  