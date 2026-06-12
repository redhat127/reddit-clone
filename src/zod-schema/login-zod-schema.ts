import z from 'zod'

export const loginZodSchema = z.object({
  email: z
    .string()
    .trim()
    .email('ایمیل معتبر الزامی است.')
    .max(50, 'ایمیل کاربری بیش از 50 کاراکتر است.'),
  password: z
    .string()
    .min(10, 'رمز عبور حداقل باید 10 کاراکتر باشد.')
    .max(50, 'رمز عبور بیش از 50 کاراکتر است.'),
  rememberMe: z.boolean('مقدار اشتباه.'),
})
