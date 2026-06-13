import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { changePasswordZodSchema } from '#/zod-schema/user/change-password-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CardLayout } from '../card-layout'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const UserChangePassword = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const form = useForm({
    resolver: zodResolver(changePasswordZodSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <CardLayout title={title} description={description}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const { error } = await authClient.changePassword({
              ...data,
              revokeOtherSessions: true,
            })
            if (error) {
              toast.error(
                (error.code && betterAuthErrorMessageMapping[error.code]) ||
                  error.message ||
                  genericErrorMessage,
              )
              return
            }

            form.reset()

            toast.success('رمز عبور شما با موفقیت تغییر یافت.')
          } catch {
            toast.error(genericErrorMessage)
          }
        })}
      >
        <FieldGroup>
          <div className="w-1/2 space-y-6">
            <TextInput
              control={control}
              name="currentPassword"
              label="رمز عبور فعلی"
              inputProps={{ type: 'password', autoComplete: 'on' }}
            />
            <TextInput
              control={control}
              name="newPassword"
              label="رمز عبور جدید"
              inputProps={{ type: 'password', autoComplete: 'on' }}
            />
          </div>
          <div className="w-auto mr-auto">
            <SubmitBtn disabled={isSubmitting}>تغییر رمز عبور</SubmitBtn>
          </div>
        </FieldGroup>
      </form>
    </CardLayout>
  )
}
