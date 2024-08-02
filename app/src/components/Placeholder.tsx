import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSupplierInvoiceSchemaResolver } from "@/commons/Schemas";
import { SelectEntities } from "./reusable/SelectEntities";
import { CalendarPicker } from "./reusable/CalendarPicker";

export const Placeholder = () => {
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

  const onSubmit = (values: { date: string; total: string; entity_id: string }) => {
    console.log("Formulario enviado con valores:", values);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormDescription>Agregar facturas de proveedores</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  );
};
