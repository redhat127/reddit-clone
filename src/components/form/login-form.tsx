import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { loginZodSchema } from '#/zod-schema/login-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CheckboxInput } from '../checkbox-input'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
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
          const { error } = await authClient.signIn.email(data)
          if (error) {
            toast.error(
              (error.code && betterAuthErrorMessageMapping[error.code]) ||
                error.message ||
                genericErrorMessage,
            )
            return
          }

          await navigate({ to: '/', replace: true })
          toast.success('شما وارد شدید.')
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
        <TextInput
          control={control}
          name="password"
          label="رمز عبور"
          inputProps={{ type: 'password', autoComplete: 'on' }}
        />
        <CheckboxInput
          control={control}
          name="rememberMe"
          label="مرا به یادآور؟"
        />
        <SubmitBtn disabled={isSubmitting} className="w-full">
          ورود
        </SubmitBtn>
      </FieldGroup>
    </form>
  )
}
