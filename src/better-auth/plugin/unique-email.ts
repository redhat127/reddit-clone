import type { BetterAuthPlugin } from 'better-auth'
import { APIError, createAuthMiddleware } from 'better-auth/api'

export const uniqueEmailPlugin = () => {
  return {
    id: 'unique-email',
    middlewares: [
      {
        path: '/sign-up/email',
        middleware: createAuthMiddleware(async (ctx) => {
          const { email } = ctx.body as { email?: string }

          if (!email) {
            return
          }

          const existing = await ctx.context.adapter.findOne({
            model: 'user',
            where: [
              {
                field: 'email',
                value: email,
                mode: 'insensitive',
              },
            ],
          })

          if (existing) {
            throw new APIError('BAD_REQUEST', {
              message: 'این ایمیل قبلاً ثبت شده است.',
            })
          }
        }),
      },
    ],
  } satisfies BetterAuthPlugin
}
