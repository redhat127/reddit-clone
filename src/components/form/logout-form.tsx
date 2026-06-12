import { authClient } from '#/lib/auth-client'
import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { useNavigate } from '@tanstack/react-router'
import { LoaderCircle, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const LogoutForm = () => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        try {
          setIsPending(true)
          const { error } = await authClient.signOut()
          if (error) {
            toast.error(
              (error.code && betterAuthErrorMessageMapping[error.code]) ||
                error.message ||
                genericErrorMessage,
            )
            return
          }
          await navigate({ to: '/login', replace: true })
          toast.success('شما خارج شدید.')
        } catch {
          toast.error(genericErrorMessage)
        } finally {
          setIsPending(false)
        }
      }}
      className="w-full"
    >
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center gap-2 py-1.5 px-2"
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : <LogOutIcon />}
        {isPending ? 'در حال خروج...' : 'خروج'}
      </button>
    </form>
  )
}
