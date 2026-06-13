import { useNavigate  } from '@tanstack/react-router'
import type {NavigateOptions} from '@tanstack/react-router';
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useAuthSuccessToast = (
  navigateOptions: NavigateOptions,
  param?: boolean,
  message?: string,
  error?: string,
) => {
  const toastShown = useRef(false)

  const navigate = useNavigate()
  const navigateOptionsRef = useRef(navigateOptions)
  navigateOptionsRef.current = navigateOptions

  useEffect(() => {
    if (!toastShown.current && param && message && !error) {
      toastShown.current = true
      toast.success(message)
      navigate({ ...navigateOptionsRef.current, replace: true })
    }
  }, [param, message, error, navigate])
}
