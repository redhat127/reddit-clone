import { serverEnv } from '#/lib/env.server'
import { createServerFn } from '@tanstack/react-start'
import { getUser } from './user'

export const getRootData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await getUser()

    const { APP_NAME } = serverEnv
    const safeEnv = { APP_NAME }

    return { user, safeEnv }
  },
)
