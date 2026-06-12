import type { UserTableSelect } from '#/db/schema'
import { LogoutForm } from '../form/logout-form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { UserAvatar } from './avatar'

export const UserDropdown = ({
  user: { name, username, image },
}: {
  user: Pick<UserTableSelect, 'name' | 'username' | 'image'>
}) => {
  const userAvatar = <UserAvatar user={{ name, image }} />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userAvatar}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-54!">
        <DropdownMenuLabel className="flex items-center gap-2">
          {userAvatar}
          <div className="min-w-0">
            <div className="truncate text-sm text-foreground font-semibold capitalize">
              {name}
            </div>
            <div className="truncate text-muted-foreground">u/{username}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-0"
          onSelect={(e) => e.preventDefault()}
          variant="destructive"
        >
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
