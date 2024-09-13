export const getPayments = async (invoiceId?: number) => {
  try {

    const url = invoiceId
      ? `${import.meta.env.VITE_API_URL}/payments?invoiceId=${invoiceId}`
      : `${import.meta.env.VITE_API_URL}/payments`;
      console.log("payments on hover", url);
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
