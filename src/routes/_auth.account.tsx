import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { UserChangeEmail } from '#/components/user/change-email'
import { UserChangePassword } from '#/components/user/change-password'
import { UserGeneralInfo } from '#/components/user/general-info'
import { useAuthErrorToast } from '#/hooks/use-auth-error-toast'
import { useAuthSuccessToast } from '#/hooks/use-auth-success-toast'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/_auth/account')({
  component: RouteComponent,
  head({
    match: {
      context: {
        safeEnv: { APP_NAME },
      },
    },
  }) {
    return { meta: [{ title: `${APP_NAME} - حساب کاربری` }] }
  },
  validateSearch: z.object({
    error: z.string().optional(),
    emailChanged: z.boolean().optional(),
  }),
})

const userGeneralInfoTitle = 'اطلاعات عمومی'
const userGeneralInfoDescription =
  'برای تغییر اطلاعات عمومی خود ، از فرم زیر استفاده نمایید.'

const userChangePasswordTitle = 'تغییر رمز عبور'
const userChangePasswordDescription =
  'برای تغییر ، رمز عبور فعلی و جدید خود را وارد نمایید.'

const userChangeEmailTitle = 'تغییر ایمیل کاربری'
const userChangeEmailDescription = 'برای تغییر ، از فرم زیر استفاده نمایید.'

function RouteComponent() {
  const { error, emailChanged } = Route.useSearch()
  useAuthErrorToast({ to: '/account', search: {} }, error)
  useAuthSuccessToast(
    { to: '/account', search: {} },
    emailChanged,
    'ایمیل شما با موفقیت تغییر یافت.',
    error,
  )

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="user-general-info">
        <TabsList className="bg-white dark:bg-muted">
          <TabsTrigger
            value="user-general-info"
            className="data-active:bg-gray-100 dark:data-active:bg-input/30"
          >
            {userGeneralInfoTitle}
          </TabsTrigger>
          <TabsTrigger
            value="user-change-password"
            className="data-active:bg-gray-100 dark:data-active:bg-input/30"
          >
            {userChangePasswordTitle}
          </TabsTrigger>
          <TabsTrigger
            value="user-change-email"
            className="data-active:bg-gray-100 dark:data-active:bg-input/30"
          >
            {userChangeEmailTitle}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user-general-info">
          <UserGeneralInfo
            title={userGeneralInfoTitle}
            description={userGeneralInfoDescription}
          />
        </TabsContent>
        <TabsContent value="user-change-password">
          <UserChangePassword
            title={userChangePasswordTitle}
            description={userChangePasswordDescription}
          />
        </TabsContent>
        <TabsContent value="user-change-email">
          <UserChangeEmail
            title={userChangeEmailTitle}
            description={userChangeEmailDescription}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
