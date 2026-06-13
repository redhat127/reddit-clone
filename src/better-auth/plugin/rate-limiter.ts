import { rateLimitErrorMessage } from '#/lib/error-message'
import { createRateLimiter } from '#/lib/rate-limiter.server'
import type { BetterAuthPlugin } from 'better-auth'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { RateLimiterRes } from 'rate-limiter-flexible'

const getIp = (headers: Headers | undefined) =>
  headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  headers?.get('x-real-ip') ??
  'unknown'

const sharedEmailLimiter = createRateLimiter({ points: 3, duration: 300 })

const createRateLimitMiddleware = (options: {
  points: number
  duration: number
  checkEmail?: boolean
  redirectOnLimit?: string
  keyPath?: string
}) => {
  const ipLimiter = createRateLimiter(options)

  return createAuthMiddleware(async (ctx) => {
    const ip = getIp(ctx.headers)

    // falls back to IP-only if email is not in body (e.g. /reset-password)
    const email = ctx.body?.email?.toLowerCase().trim()

    const pathKey = options.keyPath ?? ctx.path

    try {
      await ipLimiter.consume(`${pathKey}:${ip}`)
      if (options.checkEmail && email) {
        await sharedEmailLimiter.consume(email)
      }
      return ctx
    } catch (e) {
      if (e instanceof RateLimiterRes) {
        const secondsBeforeNext = Math.ceil(e.msBeforeNext / 1000)

        if (options.redirectOnLimit) {
          return new Response(null, {
            status: 302,
            headers: {
              Location: `${options.redirectOnLimit}?rateLimiter=true&retryAfter=${secondsBeforeNext}`,
            },
          })
        }

        throw new APIError('TOO_MANY_REQUESTS', {
          message: rateLimitErrorMessage(secondsBeforeNext),
        })
      }

      throw e
    }
  })
}

export const rateLimiterPlugin = () =>
  ({
    id: 'rate-limiter',
    middlewares: [
      {
        path: '/sign-in/email',
        middleware: createRateLimitMiddleware({
          points: 5,
          duration: 60,
          checkEmail: true,
        }),
      },
      {
        path: '/sign-up/email',
        middleware: createRateLimitMiddleware({
          points: 3,
          duration: 300,
          checkEmail: true,
        }),
      },
      {
        path: '/send-verification-email',
        middleware: createRateLimitMiddleware({
          points: 3,
          duration: 300,
          checkEmail: true,
        }),
      },
      {
        path: '/request-password-reset',
        middleware: createRateLimitMiddleware({
          points: 3,
          duration: 300,
          checkEmail: true,
        }),
      },
      {
        path: '/reset-password',
        middleware: createRateLimitMiddleware({ points: 3, duration: 300 }),
      },
      {
        path: '/verify-email',
        middleware: createRateLimitMiddleware({
          points: 10,
          duration: 300,
          redirectOnLimit: '/login',
        }),
      },
      {
        path: '/reset-password/:token',
        middleware: createRateLimitMiddleware({
          points: 5,
          duration: 300,
          redirectOnLimit: '/login',
          keyPath: '/reset-password/:token',
        }),
      },
      {
        path: '/update-user',
        middleware: createRateLimitMiddleware({
          points: 5,
          duration: 300,
        }),
      },
      {
        path: '/change-password',
        middleware: createRateLimitMiddleware({
          points: 3,
          duration: 300,
        }),
      },
    ],
  }) satisfies BetterAuthPlugin
