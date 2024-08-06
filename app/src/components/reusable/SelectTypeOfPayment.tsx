import {useState} from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { paymentMethodDictionary, PaymentMethod } from "@/commons/Interfaces";

interface SelectTypeOfPaymentProps {
    onPaymentChange: (payment: PaymentMethod) => void;
}

export function SelectTypeOfPayment({ onPaymentChange }: SelectTypeOfPaymentProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cash");

  const handleDataSelect = (payment: string) => {
    setSelectedPayment(payment as PaymentMethod);
    onPaymentChange(payment as PaymentMethod);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{paymentMethodDictionary[selectedPayment]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Seleccionar Tipo de Pago</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedPayment} onValueChange={handleDataSelect}>
          <DropdownMenuRadioItem value="cash">Efectivo</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="mp_vani">Mp Vani</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="mp_gus">Mp Gus</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
