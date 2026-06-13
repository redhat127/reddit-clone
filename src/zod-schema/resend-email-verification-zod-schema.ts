import z from 'zod'
import { loginZodSchema } from './login-zod-schema'

const { email } = loginZodSchema.shape

export const resendEmailVerificationZodSchema = z.object({
  email,
})
