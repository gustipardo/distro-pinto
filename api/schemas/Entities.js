import { z } from 'zod'

const addEntitiesSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(['customer', 'supplier'])
})

export function validateEntities (input) {
  const result = addEntitiesSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }






  
}
