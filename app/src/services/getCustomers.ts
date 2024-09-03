export const getEntities = async (isCustomer: boolean = true) => {
  try {
    let url;
    if (isCustomer) {
      url = `${import.meta.env.VITE_API_URL}/entities/customers`;
    } else {
      url = `${import.meta.env.VITE_API_URL}/entities/suppliers`;
    }
    const response = await fetch(url, {
      credentials: 'include',
    });
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
