import type { ComponentProps } from 'react'
import { Button } from './ui/button'
import { LoadingSwap } from './ui/loading-swap'

export const SubmitBtn = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => {
  return (
    <Button {...props} type="submit">
      <LoadingSwap isLoading={Boolean(props.disabled)}>{children}</LoadingSwap>
    </Button>
  )
}
