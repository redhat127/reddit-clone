import { ResendEmailVerificationForm } from '#/components/form/resend-email-verification-form'
import { GuestAuthLayout } from '#/components/layout/guest-auth-layout'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'ارسال مجدد ایمیل فعالسازی'
const description = 'برای ارسال ، ایمیل کاربری خود را وارد نمایید.'

export const Route = createFileRoute('/_guest/resend-email-verification')({
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
      <ResendEmailVerificationForm />
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
