import { Badge, badgeVariants } from './badge'

import { OrderStatusUtils, type OrderStatus } from '@/lib/constants'

type StatusBadgeProps = {
  status: OrderStatus
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const label = OrderStatusUtils.getLabel(status)
  const variant = OrderStatusUtils.getBadgeVariant(
    status
  ) as keyof typeof badgeVariants

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
