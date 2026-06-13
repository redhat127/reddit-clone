import type { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export const CardLayout = ({
  title,
  children,
  description,
  titleAsH1 = true,
}: {
  title: string
  children: ReactNode
  description?: string
  titleAsH1?: boolean
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleAsH1 ? <h1>{title}</h1> : <h2>{title}</h2>}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
