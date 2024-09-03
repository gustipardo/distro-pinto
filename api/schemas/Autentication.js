import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
  roleId: z.number().int()
})

export function validateRegister (input) {
  const result = registerSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}

const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20)
})

export function validateLogin (input) {
  const result = loginSchema.safeParse(input)
  if (!result.success) {
    return { success: false, errors: result.error.errors }
  }
  return { success: true }
}
