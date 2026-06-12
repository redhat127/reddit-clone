import { auth } from '#/lib/auth'
import { serverEnv } from '#/lib/env.server'
import { eq } from 'drizzle-orm'
import { db } from '.'
import { user, verification } from './schema'

const seed = async () => {
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
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
