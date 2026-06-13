import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { UserChangePassword } from '#/components/user/change-password'
import { UserGeneralInfo } from '#/components/user/general-info'
import { createFileRoute } from '@tanstack/react-router'

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
})

const userGeneralInfoTitle = 'اطلاعات عمومی'
const userGeneralInfoDescription =
  'برای تغییر اطلاعات عمومی خود ، از فرم زیر استفاده نمایید.'

const userChangePasswordTitle = 'تغییر رمز عبور'
const userChangePasswordDescription =
  'برای تغییر ، رمز عبور فعلی و جدید خود را وارد نمایید.'

function RouteComponent() {
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
      </Tabs>
    </div>
  )
}
