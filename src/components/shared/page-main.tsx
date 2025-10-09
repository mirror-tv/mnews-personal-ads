import type { ReactNode } from 'react'

import { cn } from '@/utils'

type PageMainProps = {
  children: ReactNode
  className?: string
}

export default function PageMain({
  children,
  className,
  ...props
}: PageMainProps) {
  return (
    <main
      className={cn(
        'pt-12 md:pt-16', //offset for fixed header
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}
