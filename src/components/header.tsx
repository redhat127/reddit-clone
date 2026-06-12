import { Link, useRouteContext } from '@tanstack/react-router'
import { UserKeyIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const Header = () => {
  const { user } = useRouteContext({ from: '__root__' })
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center border-b dark:bg-transparent bg-white p-8 h-(--header-height)">
      {user ? null : (
        <div className="mr-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                asChild
                variant="outline"
                className="size-8"
              >
                <Link to="/login">
                  <UserKeyIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">ورود</TooltipContent>
          </Tooltip>
        </div>
      )}
    </header>
  )
}
