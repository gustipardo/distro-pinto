
export const addInvoice = async ({date, client, amount}: any) => {

  console.log(`date`, date, `client`, client, `amount`, amount);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date, client, amount})
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

}

