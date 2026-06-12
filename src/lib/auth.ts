import { rateLimiterPlugin } from '#/better-auth/plugin/rate-limiter'
import { uniqueEmailPlugin } from '#/better-auth/plugin/unique-email'
import { db } from '@/db'
import { redisStorage } from '@better-auth/redis-storage'
import { localization } from 'better-auth-localization'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth/minimal'
import { username } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { nanoid } from 'nanoid'
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator'
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
    rateLimiterPlugin(),
    uniqueEmailPlugin(),
    username(),
    tanstackStartCookies(),
  ],
  advanced: {
    database: {
      generateId: false,
    },
  },
  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: 'better-auth:',
  }),
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          const name = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            separator: '_',
            length: 2,
          })
          const suffix = nanoid(4)
          const trimmed = name.slice(0, 15)
          const generatedUsername = `${trimmed}_${suffix}`
          return {
            data: {
              ...user,
              username: user.username ?? generatedUsername,
            },
          }
        },
      },
    },
  },
})
