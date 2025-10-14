import { OrderCard } from './order-card'

import { OrderStatusMap } from '@/constants/status/orderStatus'
import { type OrderRecord } from '@/mocks/mockData'

type OrderGroupProps = {
  status: keyof typeof OrderStatusMap
  orders: OrderRecord[]
  className?: string
}

export function OrderGroup({
  status,
  orders,
  className = '',
}: OrderGroupProps) {
  const statusConfig = OrderStatusMap[status]

  if (orders.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Status header */}
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${statusConfig.colors.dot}`} />
        <h2 className="text-h4 font-semibold text-gray-9">
          {statusConfig.label}
        </h2>
        <span className="text-caption1 text-gray-6">({orders.length})</span>
      </div>

      {/* Orders grid - responsive */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
