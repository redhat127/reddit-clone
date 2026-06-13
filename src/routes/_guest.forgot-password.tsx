import { ForgotPasswordForm } from '#/components/form/forgot-password-form'
import { GuestAuthLayout } from '#/components/layout/guest-auth-layout'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'فراموشی رمز عبور'
const description = 'برای بازنشانی رمز عبور ، ایمیل کاربری خود را وارد نمایید.'

export const Route = createFileRoute('/_guest/forgot-password')({
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
})

function RouteComponent() {
  return (
    <GuestAuthLayout title={title} description={description}>
      <ForgotPasswordForm />
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
