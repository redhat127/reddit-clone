import z from 'zod'
import { loginZodSchema } from './login-zod-schema'

const { password } = loginZodSchema.shape

export const resetPasswordZodSchema = z.object({
  newPassword: password,
})
