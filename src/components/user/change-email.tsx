import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { changeEmailZodSchema } from '#/zod-schema/user/change-email-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouteContext } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CardLayout } from '../card-layout'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const UserChangeEmail = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const {
    currentUser: { email },
  } = useRouteContext({ from: '/_auth' })

  const form = useForm({
    resolver: zodResolver(changeEmailZodSchema),
    defaultValues: {
      newEmail: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  return (
    <CardLayout title={title} description={description}>
      <p className="text-muted-foreground mb-4">ایمیل فعلی : {email}</p>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (data.newEmail === email) {
            toast.error('ایمیل جدید باید متفاوت باشد.')
            return
          }
          try {
            const { error } = await authClient.changeEmail({
              ...data,
              callbackURL: '/account?emailChanged=true',
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
            toast.success(
              'پیام تایید به ایمیل جدید شما ارسال شد. تا زمانی که تایید انجام نشده باشد ، ایمیل شما تغییر نخواهد کرد.',
            )
          } catch {
            toast.error(genericErrorMessage)
          }
        })}
      >
        <FieldGroup>
          <div className="w-1/2 space-y-6">
            <TextInput
              control={control}
              name="newEmail"
              label="ایمیل کاربری جدید"
              inputProps={{ type: 'email', autoComplete: 'on' }}
            />
          </div>
          <div className="w-auto mr-auto">
            <SubmitBtn disabled={isSubmitting}>تغییر ایمیل کاربری</SubmitBtn>
          </div>
        </FieldGroup>
      </form>
    </CardLayout>
  )
}
