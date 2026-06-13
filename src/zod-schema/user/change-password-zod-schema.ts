import z from 'zod'
import { loginZodSchema } from '../login-zod-schema'

const { password } = loginZodSchema.shape

export const changePasswordZodSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'رمز عبور جدید نمی‌ تواند با رمز عبور فعلی یکسان باشد.',
    path: ['newPassword'],
  })
