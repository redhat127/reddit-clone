import { ResetPasswordForm } from '#/components/form/reset-password-form'
import { GuestAuthLayout } from '#/components/layout/guest-auth-layout'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import z from 'zod'

const title = 'بازنشانی رمز عبور'
const description = 'رمز عبور جدید خود را وارد نمایید.'

export const Route = createFileRoute('/_guest/reset-password')({
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
  validateSearch: z.object({ token: z.string().min(1) }),
  onError() {
    throw redirect({ to: '/login', replace: true })
  },
})

function RouteComponent() {
  const { token } = Route.useSearch()

  return (
    <GuestAuthLayout title={title} description={description}>
      <ResetPasswordForm token={token} />
      <div className="mt-3">
        <Button type="button" asChild className="w-full" variant="outline">
          <Link to="/login">
            <ChevronLeftIcon />
            بازگشت به صفحه ی ورود
          </Link>
        </Button>
      </div>
    </GuestAuthLayout>
  )
}
