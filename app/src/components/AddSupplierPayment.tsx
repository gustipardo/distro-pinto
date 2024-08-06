import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSupplierPaymentSchemaResolver } from "@/commons/Schemas";
import { CalendarPicker } from "./reusable/CalendarPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusIcon } from "@radix-ui/react-icons";
import { SelectTypeOfPayment } from "./reusable/SelectTypeOfPayment";
import { addPayment } from "@/services/addPayment";
import { PaymentMethod } from "@/commons/Interfaces";

interface AddSupplierPayment {
    onPaymentAdded: () => void;
    invoice_id: number;
}

export const AddSupplierPayment = ({ onPaymentAdded, invoice_id }: AddSupplierPayment) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: addSupplierPaymentSchemaResolver,
    defaultValues: {
      invoice_id: "",
      date: "",
      amount: 0,
      payment_method: "cash" as PaymentMethod,
      expense: "expense"
    },
  });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    form.setValue("date", formattedDate);
  }, [form]);

  const onSubmit = async (values: { date: string; amount: number; payment_method: PaymentMethod }) => {
    console.log("Formulario enviado con valores:", values, invoice_id, "expense" );
    const result = await addPayment({invoice_id, date: values.date, amount: values.amount, payment_method: values.payment_method, type: "expense"});
    console.log("Respuesta de la API:", result);
    setOpen(false);
    console.log()
    if (result.success) {
      console.log("Se agregó la factura con éxito");
      onPaymentAdded(); 
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : ""; // Formatear a YYYY-MM-DD
    form.setValue("date", formattedDate);
  };

  const handlePaymentChange = (payment: string) => {
    form.setValue("payment_method", payment as PaymentMethod);
    console.log("payment", payment);
  };

  return (

    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button><PlusIcon className="mr-2 h-4 w-4"/>Ingresar Pago</Button>
      </PopoverTrigger>
    <PopoverContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="date"
          render={() => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <CalendarPicker onDateChange={handleDateChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_method"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Tipo de Pago</FormLabel>
              <FormControl>
                <SelectTypeOfPayment onPaymentChange={handlePaymentChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Agregar</Button>
      </form>
    </Form>
    </PopoverContent>
    </Popover>


  );
};
