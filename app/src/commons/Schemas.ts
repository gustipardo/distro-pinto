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
  entity_id: z.number({ message: "Se debe seleccionar un proveedor" }).int().positive({ message: "El ID de la entidad debe ser un entero positivo" }),
  total: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "El total debe ser un número mayor a 0",
    }),
});

export const addSupplierInvoiceSchemaResolver = zodResolver(addSupplierInvoiceSchema);

const addSupplierPaymentSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha debe ser válida",
  }),
  amount: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "El total debe ser un número mayor a 0",
    }),
  payment_method: z.enum(["cash", "mp_vani", "mp_gus"], {
    message: "Se debe seleccionar un tipo de pago válido",
  }),
});

export const addSupplierPaymentSchemaResolver = zodResolver(addSupplierPaymentSchema);

const addEntitySchema = z.object({
  name: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  })
});

export const addEntitySchemaResolver = zodResolver(addEntitySchema);

const regiterUserSchema = z.object({
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." }).max(20, { message: "El nombre de usuario no puede tener mas de 20 caracteres." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }).max(20, { message: "La contraseña no puede tener mas de 20 caracteres." }),
  roleId: z.number().int()
})

export const regiterUserSchemaResolver = zodResolver(regiterUserSchema);

const logUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20)
})

export const logUserSchemaRedsolver = zodResolver(logUserSchema);
