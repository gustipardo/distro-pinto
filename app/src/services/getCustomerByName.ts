export const getCustomerByName = async (name: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/entities/search/customer/${name}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error("Error getting customer by name");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};