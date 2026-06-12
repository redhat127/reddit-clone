import type { UserTableSelect } from '#/db/schema'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const UserAvatar = ({
  user: { name, image },
}: {
  user: Pick<UserTableSelect, 'name' | 'image'>
}) => {
  return (
    <Avatar>
      <AvatarImage src={image || undefined} alt={`${name} avatar`} />
      <AvatarFallback className="capitalize bg-sky-600 dark:bg-sky-700 text-white">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
