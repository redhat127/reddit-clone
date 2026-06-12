import z from 'zod'
import { loginZodSchema } from './login-zod-schema'

const { email, password } = loginZodSchema.shape

export const registerZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'نام حداقل باید 3 کاراکتر باشد.')
    .max(50, 'نام بیش از 50 کاراکتر است.')
    .regex(
      /^[a-zA-Z\u0600-\u06FF\s\-']+$/,
      'نام فقط می تواند شامل حروف فارسی ، انگلیسی ، فاصله ، خط تیره و آپستروف باشد.',
    ),
  email,
  password,
})
