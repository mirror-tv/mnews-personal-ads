import { Badge } from './badge'

import { type OrderStatus } from '@/lib/constants'
import { OrderStatusUtils } from '@/lib/utils'

type StatusBadgeProps = {
  status: OrderStatus
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const label = OrderStatusUtils.getLabel(status)
  const colors = OrderStatusUtils.getColors(status)

  return (
    <Badge
      variant="outline"
      className={`${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      {label}
    </Badge>
  )
}
