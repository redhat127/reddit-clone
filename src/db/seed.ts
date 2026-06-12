import { auth } from '#/lib/auth'
import { serverEnv } from '#/lib/env.server'
import { keyPrefix, redis } from '#/lib/redis.server'
import { eq } from 'drizzle-orm'
import { db } from '.'
import { user, verification } from './schema'

async function clearRedisKeys() {
  const pattern = `${keyPrefix}:*`
  const allKeys = await redis.keys(pattern)
  console.log(`app keys to delete (${allKeys.length}):`, allKeys)

  if (allKeys.length > 0) {
    const stripped = allKeys.map((k) => k.slice(`${keyPrefix}:`.length))
    const deleted = await redis.del(...stripped)
    console.log(`deleted ${deleted} redis key(s).`)
  } else {
    console.log('deleted 0 redis key(s).')
  }
}

const seed = async () => {
  await clearRedisKeys()

  await db.delete(verification)
  await db.delete(user)
  console.log('wiped verification and user tables.')

  await Promise.all([
    auth.api.signUpEmail({
      body: {
        name: 'علی',
        email: 'ali@example.com',
        password: 'password123456',
      },
    }),
    auth.api.signUpEmail({
      body: {
        name: 'dave',
        email: 'dave@example.com',
        password: 'password123456',
      },
    }),
  ])

  await db
    .update(user)
    .set({ emailVerified: true })
    .where(eq(user.email, 'ali@example.com'))

  const newUsers = await db.query.user.findMany()
  console.log('seeded users:', newUsers)
}

if (serverEnv.NODE_ENV === 'production') {
  console.log('you can not run seed script in production env.')
  process.exit(0)
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
