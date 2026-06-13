import { Link, useRouteContext } from '@tanstack/react-router'
import { UserKeyIcon } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { UserDropdown } from './user/dropdown'

export const Header = () => {
  const { user } = useRouteContext({ from: '__root__' })
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center border-b dark:bg-transparent bg-white p-8 h-(--header-height)">
      <div className="mr-auto flex items-center gap-2">
        <ModeToggle />
        {user ? (
          <UserDropdown
            user={{
              name: user.name,
              username: user.username || null,
              image: user.image || null,
            }}
          />
        ) : (
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
        )}
      </div>
    </header>
  )
}
