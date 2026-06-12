import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { registerZodSchema } from '#/zod-schema/register-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerZodSchema),
    defaultValues: { name: '', email: '', password: '' },
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
          const { error } = await authClient.signUp.email({
            ...data,
            callbackURL: '/login',
          })
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
            'ثبت نام انجام شد. ایمیل تایید حساب کاربری ارسال گردید.',
          )
        } catch {
          toast.error(genericErrorMessage)
        }
      })}
    >
      <FieldGroup>
        <TextInput
          control={control}
          name="name"
          label="نام"
          inputProps={{ autoComplete: 'on' }}
        />
        <TextInput
          control={control}
          name="email"
          label="ایمیل کاربری"
          inputProps={{ type: 'email', autoComplete: 'on' }}
        />
        <TextInput
          control={control}
          name="password"
          label="رمز عبور"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <SubmitBtn disabled={isSubmitting} className="w-full">
          ثبت نام
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
