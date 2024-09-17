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

const addRoadmapSchema = z.object({
  date: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: 'Invalid date format'
  })
})

export function validateRoadmap (input) {
  const result = addRoadmapSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}

const addInvoiceToRoadmapSchema = z.object({
  invoiceId: z.number().int().positive(),
  roadmapId: z.number().int().positive()
})

export function validateAddInvoiceToRoadmap (input) {
  const result = addInvoiceToRoadmapSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}
