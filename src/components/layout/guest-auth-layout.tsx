import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { CardLayout } from '../card-layout'
import { Button } from '../ui/button'

export const GuestAuthLayout = ({
  children,
  title,
  description,
}: {
  children: ReactNode
  title: string
  description: string
}) => {
  return (
    <CardLayout
      cardClasses="max-w-sm mx-auto"
      title={title}
      description={description}
    >
      {children}
      <div className="mt-6">
        <Button type="button" asChild className="w-full" variant="outline">
          <Link to="/">
            <ChevronLeftIcon />
            برگرد به خانه
          </Link>
        </Button>
      </div>
    </CardLayout>
  )
}
