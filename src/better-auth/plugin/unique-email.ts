import type { BetterAuthPlugin } from 'better-auth'
import { APIError, createAuthMiddleware } from 'better-auth/api'

export const uniqueEmailPlugin = () => {
  const checkUniqueEmail = createAuthMiddleware(async (ctx) => {
    const body = ctx.body as { email?: string; newEmail?: string }

    const email = body.email ?? body.newEmail

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
  })

  return {
    id: 'unique-email',
    middlewares: [
      {
        path: '/sign-up/email',
        middleware: checkUniqueEmail,
      },
      {
        path: '/change-email',
        middleware: checkUniqueEmail,
      },
    ],
  } satisfies BetterAuthPlugin
}
