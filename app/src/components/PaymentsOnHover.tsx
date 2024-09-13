import { PaymentMethod, paymentMethodDictionary } from "@/commons/Interfaces"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatNumber } from "@/services/formatNumber"
import { getPayments } from "@/services/getPayments"
import { useEffect, useState } from "react"

interface paymentsOnHoverProps {
    amount: number,
    invoiceId: number,
    updateCount: number
}

export const PaymentsOnHover = ({ amount, invoiceId, updateCount }: paymentsOnHoverProps) => {
    const [Payments, setPayments] = useState<any[]>([])
    useEffect(() => {
        /* console.log("invoice_id " + invoice_id) */
        const fetchPayments = async () => {
            const response = await getPayments(invoiceId);
            setPayments(response)
        }
        fetchPayments()

    }, [updateCount])

    useEffect(() => {
        /* console.log("Payments" + Payments[0]?.amount) */
    }, [Payments])

    return (
        <HoverCard>
            <HoverCardTrigger>${formatNumber(amount)}</HoverCardTrigger>
            <HoverCardContent>
                <div className="space-y-2">
                    {Payments.length === 0 ? (
                        <p className="text-xs text-muted-foreground">Ningún pago registrado</p>
                    ) : (
                        Payments.map((payment) => (
                            <div key={payment.id} className="flex justify-start">
                                <p className="text-xs text-muted-foreground">
                                    $ {formatNumber(payment.amount)} de {paymentMethodDictionary[payment.payment_method as PaymentMethod]} el {payment.date}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
