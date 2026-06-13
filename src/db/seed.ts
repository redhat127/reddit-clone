import { serverEnv } from '#/lib/env.server'
import { keyPrefix, redis } from '#/lib/redis.server'
import { hashPassword } from 'better-auth/crypto'
import { db } from '.'
import { account, user, verification } from './schema'

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

  const password = await hashPassword('password123456')

  const [ali, dave] = await db
    .insert(user)
    .values([
      {
        name: 'علی',
        email: 'ali@example.com',
        emailVerified: true,
        username: 'desert_falcon92',
      },
      {
        name: 'dave',
        email: 'dave@example.com',
        emailVerified: false,
        username: 'neon_dave',
      },
    ])
    .returning({ id: user.id })

  await db.insert(account).values([
    {
      accountId: ali.id,
      providerId: 'credential',
      userId: ali.id,
      password,
    },
    {
      accountId: dave.id,
      providerId: 'credential',
      userId: dave.id,
      password,
    },
  ])

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
