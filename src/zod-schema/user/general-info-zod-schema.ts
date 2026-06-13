import z from 'zod'
import { registerZodSchema } from '../register-zod-schema'

const { name } = registerZodSchema.shape

export const userGeneralInfoZodSchema = z.object({
  name,
  username: z
    .string()
    .trim()
    .min(6, 'نام کاربری حداقل باید 6 کاراکتر باشد.')
    .max(20, 'نام کاربری بیش از 20 کاراکتر است.')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'نام کاربری فقط می تواند شامل حروف انگلیسی ، اعداد ، خط تیره و آندرلاین باشد.',
    ),
})
