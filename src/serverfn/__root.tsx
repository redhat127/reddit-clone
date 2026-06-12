import { serverEnv } from '#/lib/env.server'
import { createServerFn } from '@tanstack/react-start'

export const getRootData = createServerFn({ method: 'GET' }).handler(() => {
  const { APP_NAME } = serverEnv
  const safeEnv = { APP_NAME }

  return { safeEnv }
})
