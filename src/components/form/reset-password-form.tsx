import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { resetPasswordZodSchema } from '#/zod-schema/reset-password-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordZodSchema),
    defaultValues: { newPassword: '' },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const navigate = useNavigate()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const { error } = await authClient.resetPassword({
            ...data,
            token,
          })
          if (error) {
            toast.error(
              (error.code && betterAuthErrorMessageMapping[error.code]) ||
                error.message ||
                genericErrorMessage,
            )
            return
          }

          await navigate({ to: '/login', replace: true })
          toast.success('رمز عبور شما تغییر یافت. لطفا وارد شوید.')
        } catch {
          toast.error(genericErrorMessage)
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="newPassword"
          label="رمز عبور جدید"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting} className="w-full">
          تغییر رمز عبور
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
