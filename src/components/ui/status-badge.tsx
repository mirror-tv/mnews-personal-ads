import { Badge } from './badge'

import { type OrderStatus } from '@/status/orderStatus'
import { OrderStatusUtils } from '@/status/utils'

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
