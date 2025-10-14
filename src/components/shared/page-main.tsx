import type { ReactNode } from 'react'

import { layout } from '@/constants'
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
        'mx-auto my-0 pt-12 md:pt-16', //offset for fixed header
        layout.maxWidthResponsive,
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}
