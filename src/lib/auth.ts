import { db } from '@/db'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { betterAuth } from 'better-auth/minimal'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { serverEnv } from './env.server'

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
  plugins: [tanstackStartCookies()],
  advanced: {
    database: {
      generateId: false,
    },
  },
})
