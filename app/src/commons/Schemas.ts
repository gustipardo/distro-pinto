import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchemaExample = z.object({
    username: z.string().min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres.",
    }),
  });

export const formSchemaExampleResolver = zodResolver(formSchemaExample);


const addSupplierInvoiceSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha debe ser válida",
  }),
  entity_id: z.number({message: "Se debe seleccionar un proveedor"}).int().positive({ message: "El ID de la entidad debe ser un entero positivo" }),
  total: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "El total debe ser un número mayor a 0",
    }),
});

export const addSupplierInvoiceSchemaResolver = zodResolver(addSupplierInvoiceSchema);