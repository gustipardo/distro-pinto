import { PaymentMethod } from "@/commons/Interfaces";

interface AddPaymentParams {
  invoice_id: number;
  date: string;
  amount: number;
  payment_method: PaymentMethod;
  type: string;

}

export const addPayment = async ({ invoice_id, date, amount, payment_method, type }: AddPaymentParams) => {

  console.log(`Fetching: date`, date, `invoices_id`, invoice_id, `total`, amount, `payment_method`, payment_method, `type`, type);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ invoice_id, date, amount, payment_method, type })
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

}

