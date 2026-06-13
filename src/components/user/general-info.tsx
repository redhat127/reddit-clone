import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { userGeneralInfoZodSchema } from '#/zod-schema/user/general-info-zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CardLayout } from '../card-layout'
import { SubmitBtn } from '../submit-btn'
import { TextInput } from '../text-input'
import { FieldGroup } from '../ui/field'

export const UserGeneralInfo = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const {
    currentUser: { name, username },
  } = useRouteContext({ from: '/_auth' })

  if (!username) return

  const form = useForm({
    resolver: zodResolver(userGeneralInfoZodSchema),
    defaultValues: {
      name,
      username,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const router = useRouter()

  return (
    <CardLayout title={title} description={description}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const { error } = await authClient.updateUser(data)
            if (error) {
              toast.error(
                (error.code && betterAuthErrorMessageMapping[error.code]) ||
                  error.message ||
                  genericErrorMessage,
              )
              return
            }

            toast.success('ذخیره انجام شد.')
            router.invalidate()
          } catch {
            toast.error(genericErrorMessage)
          }
        })}
      >
        <FieldGroup>
          <div className="w-1/2 space-y-6">
            <TextInput
              control={control}
              name="name"
              label="نام"
              inputProps={{ autoComplete: 'on' }}
            />
            <TextInput
              control={control}
              name="username"
              label="نام کاربری"
              inputProps={{ autoComplete: 'on' }}
            />
          </div>
          <div className="w-auto mr-auto">
            <SubmitBtn disabled={isSubmitting}>ذخیره</SubmitBtn>
          </div>
        </FieldGroup>
      </form>
    </CardLayout>
  )
}
