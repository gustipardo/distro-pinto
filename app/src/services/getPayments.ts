export const getPayments = async (invoice_id?: number) => {
  try {
    const url = invoice_id
      ? `${import.meta.env.VITE_API_URL}/payments?invoice_id=${invoice_id}`
      : `${import.meta.env.VITE_API_URL}/payments`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error("Error getting payments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
