import { betterAuthErrorMessageMapping } from '#/lib/error-message'
import type { NavigateOptions } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useAuthErrorToast = (
  navigateOptions: NavigateOptions,
  error?: string,
) => {
  const toastRefShown = useRef(false)

  const navigate = useNavigate()
  const navigateOptionsRef = useRef(navigateOptions)
  navigateOptionsRef.current = navigateOptions

  useEffect(() => {
    if (!toastRefShown.current && error) {
      toastRefShown.current = true
      toast.error(betterAuthErrorMessageMapping[error] || error)
      navigate({ ...navigateOptionsRef.current, replace: true })
    }
  }, [error, navigate])
}
