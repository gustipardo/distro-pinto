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
import { addSupplierInvoiceSchemaResolver } from "@/commons/Schemas";
import { SelectEntities } from "./reusable/SelectEntities";
import { CalendarPicker } from "./reusable/CalendarPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addInvoice } from "@/services/addInvoice";

interface AddSupplierInvoiceProps {
  onInvoiceAdded: () => void;
}

export const AddSupplierInvoice = ({ onInvoiceAdded }: AddSupplierInvoiceProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: addSupplierInvoiceSchemaResolver,
    defaultValues: {
      date: "", // Inicialmente vacío
      total: "",
      entity_id: "",
    },
  });

  useEffect(() => {
    // Inicializar con la fecha actual
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    form.setValue("date", formattedDate);
  }, [form]);

  const onSubmit = async (values: { date: string; total: string; entity_id: string }) => {
    console.log("Formulario enviado con valores:", values);
    const response = await addInvoice({date: values.date, entity_id: values.entity_id, total: values.total});
    console.log("Respuesta de la API:", response);
    setOpen(false);
    console.log("response", response)
    if (response) {
      console.log("Se agregó la factura con éxito");
      onInvoiceAdded(); 
    }
  };

  const handleEntitySelect = (selectedEntity: { id: string; name: string }) => {
    form.setValue("entity_id", selectedEntity.id);
    console.log("Entidad seleccionada:", selectedEntity);
  };

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? date.toISOString().split('T')[0] : ""; // Formatear a YYYY-MM-DD
    form.setValue("date", formattedDate);
  };

  return (

    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button >Agregar facturas de proveedores</Button>
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
          name="entity_id"
          render={() => (
            <FormItem>
              <FormLabel>Proveedor</FormLabel>
              <FormControl>
                <SelectEntities isCustomer={false} onSelectEntity={handleEntitySelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Total" {...field} />
              </FormControl>
              <FormMessage />
{/*               <FormDescription>Agregar facturas de proveedores</FormDescription>
 */}            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Agregar</Button>
      </form>
    </Form>
    </PopoverContent>
    </Popover>


  );
};
