import { db } from '@/db'
import { redisStorage } from '@better-auth/redis-storage'
import { localization } from 'better-auth-localization'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { betterAuth } from 'better-auth/minimal'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { serverEnv } from './env.server'
import { redis } from './redis.server'

export const auth = betterAuth({
  appName: serverEnv.APP_NAME,
  baseURL: serverEnv.APP_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 50,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  plugins: [
    localization({
      defaultLocale: 'fa-IR',
      fallbackLocale: 'default',
    }),
    tanstackStartCookies(),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') {
        return
      }

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
  advanced: {
    database: {
      generateId: false,
    },
  },
  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: 'better-auth:',
  }),
})
