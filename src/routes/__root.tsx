import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import { Header } from '#/components/header'
import { DirectionProvider } from '#/components/ui/direction'
import { Toaster } from '#/components/ui/sonner'
import { TooltipProvider } from '#/components/ui/tooltip'
import { getRootData } from '#/serverfn/__root'
import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: ({
    match: {
      context: {
        safeEnv: { APP_NAME },
      },
    },
  }) => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${APP_NAME} - ساخته شده با تن استک استارت`,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  async beforeLoad() {
    const { user, safeEnv } = await getRootData()

    return { user, safeEnv }
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased overflow-x-hidden w-full bg-gray-100 dark:bg-zinc-900 dark:text-white">
        <TooltipProvider>
          <DirectionProvider dir="rtl">
            <Header />
            <main className="p-8 mt-(--header-height)">{children}</main>
          </DirectionProvider>
        </TooltipProvider>
        <Toaster
          expand
          closeButton
          position="bottom-right"
          duration={5000}
          className="font-sans!"
        />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
