import { InvoiceQueryParams } from "@/commons/Interfaces";

export const getInvoices = async ({ range, isPending, isPaid, isClient, entityId }: InvoiceQueryParams) => {
  try {
    const { from, to } = range;
    // Construye la URL en base a los parámetros
    const url = new URL(`${import.meta.env.VITE_API_URL}/invoices`);
    if (from) url.searchParams.append('from', from);
    if (to) url.searchParams.append('to', to);
    if (isPending !== undefined) url.searchParams.append('isPending', isPending.toString());
    if (isPaid !== undefined) url.searchParams.append('isPaid', isPaid.toString());
    if (isClient !== undefined) url.searchParams.append('isClient', isClient.toString());
    if (entityId) url.searchParams.append('entityId', entityId);
    console.log(" url ", url.toString());
    const response = await fetch(url.toString());
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
