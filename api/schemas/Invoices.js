import { z } from 'zod'

const addInvoiceSchema = z.object({
  date: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: 'Invalid date format'
  }),
  entityId: z.number().int().positive(), // Assuming entity_id should be a positive integer
  total: z.number().positive() // Assuming total should be a positive number
})

export function validateInvoice (input) {
  const result = addInvoiceSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}
