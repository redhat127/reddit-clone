import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { resendEmailVerificationZodSchema } from '#/zod-schema/resend-email-verification-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const ResendEmailVerificationForm = () => {
  const form = useForm({
    resolver: zodResolver(resendEmailVerificationZodSchema),
    defaultValues: { email: '' },
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
          const { error } = await authClient.sendVerificationEmail(data)
          if (error) {
            toast.error(
              (error.code && betterAuthErrorMessageMapping[error.code]) ||
                error.message ||
                genericErrorMessage,
            )
            return
          }

          await navigate({ to: '/login' })
          toast.success(
            'در صورت وجود حساب کاربری با این ایمیل ، ایمیل فعالسازی برای شما ارسال می گردد.',
          )
        } catch {
          toast.error(genericErrorMessage)
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="email"
          label="ایمیل کاربری"
          inputProps={{ type: 'email', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting} className="w-full">
          ارسال ایمیل
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
