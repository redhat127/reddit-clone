import {
  betterAuthErrorMessageMapping,
  genericErrorMessage,
} from '#/lib/error-message'
import { useNavigate  } from '@tanstack/react-router'
import type {NavigateOptions} from '@tanstack/react-router';
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
      toast.error(betterAuthErrorMessageMapping[error] || genericErrorMessage)
      navigate({ ...navigateOptionsRef.current, replace: true })
    }
  }, [error, navigate])
}
