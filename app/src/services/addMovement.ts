import { PaymentMethod } from "@/commons/Interfaces";

interface AddMovementParams {
    date: string;
    description: string;
    amount: number;
    payment_method: PaymentMethod;
    type: string;

}

export const addMovement = async ({ date, description, amount, payment_method, type }: AddMovementParams) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/movement`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, description, amount, paymentMethod: payment_method, type })
        });
        return response.json();
    } catch (error) {
        console.error(error);
        return error;
    }

}

