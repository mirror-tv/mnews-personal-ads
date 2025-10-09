import { OrderStatusMap, type OrderStatus } from '../constants'
import { type OrderRecord } from '../mocks/mockData'

const OrderStatusUtils = {
  getLabel: (status: OrderStatus) => OrderStatusMap[status].label,
  getDescription: (status: OrderStatus) => OrderStatusMap[status].description,
  getColors: (status: OrderStatus) => OrderStatusMap[status].colors,
  getAllOptions: () =>
    Object.entries(OrderStatusMap).map(([value, info]) => ({
      value,
      label: info.label,
    })),
}

function filterOrders(
  orders: OrderRecord[],
  searchKeyword: string,
  status: string
): OrderRecord[] {
  return orders.filter((order) => {
    const matchesKeyword =
      searchKeyword === '' ||
      order.productName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchKeyword.toLowerCase())

    const matchesStatus = status === 'all' ? true : order.status === status

    return matchesKeyword && matchesStatus
  })
}

function getStatusStats(orders: OrderRecord[]) {
  const total = orders.length
  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    },
    {} as Record<OrderStatus, number>
  )

  return { total, statusCounts }
}

// Local exports — domain-related helpers
export { OrderStatusUtils, filterOrders, getStatusStats }

// Re-exports — generic shared utilities
export * from './cn'
export * from './devLog'
