import { z } from 'zod'

const addPaymentSchema = z.object({
  invoiceId: z.number().int().positive(),
  date: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: 'Invalid date format'
  }),
  amount: z.number().positive(), // Assuming amount should be a positive number,
  paymentMethod: z.enum(['cash', 'mp_vani', 'mp_gus']),
  type: z.enum(['expense', 'income'])
})

export function validatePayment (input) {
  const result = addPaymentSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}

const addMovementSchema = z.object({
  date: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: 'Invalid date format'
  }),
  description: z.string(),
  amount: z.number().positive(), // Assuming amount should be a positive number,
  type: z.enum(['expense', 'income']),
  paymentMethod: z.enum(['cash', 'mp_vani', 'mp_gus'])
})

export function validateMovement (input) {
  const result = addMovementSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}
