import { RegisterForm } from '#/components/form/register-form'
import { GuestAuthLayout } from '#/components/layout/guest-auth-layout'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'ثبت نام'
const description = 'برای ثبت نام ، تمامی موارد زیر الزامی است.'

export const Route = createFileRoute('/_guest/register')({
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
      <RegisterForm />
      <div className="mt-3">
        <Button type="button" asChild className="w-full" variant="outline">
          <Link to="/login">
            <ChevronLeftIcon />
            برای ورود اینجا کلیک کن
          </Link>
        </Button>
      </div>
    </GuestAuthLayout>
  )
}
