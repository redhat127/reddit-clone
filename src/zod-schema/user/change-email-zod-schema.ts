import z from 'zod'
import { loginZodSchema } from '../login-zod-schema'

const { email } = loginZodSchema.shape

export const changeEmailZodSchema = z.object({
  newEmail: email,
})
