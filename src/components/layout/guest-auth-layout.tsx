import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

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
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>
          <h1>{title}</h1>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <div className="mt-6">
          <Button type="button" asChild className="w-full" variant="outline">
            <Link to="/">
              <ChevronLeftIcon />
              برگرد به خانه
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
