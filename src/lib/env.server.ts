import z from 'zod'

export const serverEnv = z
  .object({
    APP_NAME: z.string().min(1),
    APP_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    NODE_ENV: z
      .literal(['development', 'production', 'test'])
      .optional()
      .default('development'),
  })
  .parse(process.env)
