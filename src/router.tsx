import {
  createRouter as createTanStackRouter,
  Link,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { getContext } from './integrations/tanstack-query/root-provider'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,

    defaultNotFoundComponent() {
      return (
        <div className="max-w-sm mx-auto text-center mt-16">
          <h1 className="text-red-600 dark:text-red-400 font-bold text-3xl mb-2">
            404 - یافت نشد
          </h1>
          <p className="mb-4">صفحه ی مورد نظر یافت نشد.</p>
          <Button type="button" asChild className="px-8">
            <Link to="/">
              <ChevronLeftIcon />
              برگرد به خانه
            </Link>
          </Button>
        </div>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
