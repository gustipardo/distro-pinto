interface AddInvoiceParams {
  date: string;
  entity_id: number;
  total: number;
}

export const addInvoice = async ({ date, entity_id, total }: AddInvoiceParams) => {

  console.log(`Fetching: date`, date, `client`, entity_id, `total`, total, typeof entity_id);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date, entityId: entity_id, total })
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

}

