import { Redis } from 'ioredis'
import { serverEnv } from './env.server'

export const keyPrefix = serverEnv.APP_NAME.trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w\u0600-\u06FF-]/g, '')

const globalForRedis = globalThis as unknown as { _redis?: Redis }

if (serverEnv.NODE_ENV === 'development' && globalForRedis._redis) {
  globalForRedis._redis.disconnect()
}

export const redis = (globalForRedis._redis ??= new Redis(serverEnv.REDIS_URL, {
  keyPrefix: `${keyPrefix}:`,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000)
    return delay
  },
}))

redis.on('connect', () => console.log('[Redis] connected.'))
redis.on('ready', () => console.log('[Redis] ready.'))
redis.on('error', (error) => console.log('[Redis] error:', error))
