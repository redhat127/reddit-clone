import { LoginForm } from '#/components/form/login-form'
import { GuestAuthLayout } from '#/components/layout/guest-auth-layout'
import { Button } from '#/components/ui/button'
import { useAuthErrorToast } from '#/hooks/use-auth-error-toast'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import z from 'zod'

const title = 'ورود'
const description = 'برای ورود ، ایمیل کاربری و رمز عبور خود را وارد نمایید.'

export const Route = createFileRoute('/_guest/login')({
  component: RouteComponent,
  head({
    match: {
      context: {
        safeEnv: { APP_NAME },
      },
    },
  }) {
    return { meta: [{ title: `${APP_NAME} - ${title}` }] }
  },
  validateSearch: z.object({
    error: z.string().optional(),
  }),
})

function RouteComponent() {
  const { error } = Route.useSearch()
  useAuthErrorToast({ to: '/login', search: {} }, error)

  return (
    <GuestAuthLayout title={title} description={description}>
      <LoginForm />
      <div className="mt-3">
        <Button type="button" asChild className="w-full" variant="outline">
          <Link to="/register">
            <ChevronLeftIcon />
            برای ثبت نام اینجا کلیک کن
          </Link>
        </Button>
      </div>
    </GuestAuthLayout>
  )
}
