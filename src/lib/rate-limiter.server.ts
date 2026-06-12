import {
  RateLimiterRedis
  
} from 'rate-limiter-flexible'
import type {IRateLimiterRedisOptions} from 'rate-limiter-flexible';
import { redis } from './redis.server'

export const createRateLimiter = (
  args: Pick<IRateLimiterRedisOptions, 'points' | 'duration'>,
) => {
  return new RateLimiterRedis({
    ...args,
    keyPrefix: 'rl',
    storeClient: redis,
  })
}
