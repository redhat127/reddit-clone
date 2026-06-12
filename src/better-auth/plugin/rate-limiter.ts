import { createRateLimiter } from '#/lib/rate-limiter.server'
import type { BetterAuthPlugin } from 'better-auth'
import { APIError, createAuthMiddleware } from 'better-auth/api'
import { RateLimiterRes } from 'rate-limiter-flexible'

const getIp = (headers: Headers | undefined) =>
  headers?.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  headers?.get('x-real-ip') ??
  'unknown'

const createRateLimitMiddleware = (options: {
  points: number
  duration: number
}) => {
  const limiter = createRateLimiter(options)

  return createAuthMiddleware(async (ctx) => {
    try {
      await limiter.consume(`${ctx.path}:${getIp(ctx.headers)}`)
      return ctx
    } catch (e) {
      if (e instanceof RateLimiterRes) {
        const secondsBeforeNext = Math.ceil(e.msBeforeNext / 1000)

        throw new APIError('TOO_MANY_REQUESTS', {
          message: `تعداد دفعات تلاش بیش از حد مجاز است. لطفا پس از ${secondsBeforeNext} ثانیه مجددا تلاش کنید.`,
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
        }),
      },
      {
        path: '/sign-up/email',
        middleware: createRateLimitMiddleware({
          points: 3,
          duration: 300,
        }),
      },
    ],
  }) satisfies BetterAuthPlugin
