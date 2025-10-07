import { ORDER_STATUSES, type OrderStatus } from './constants'

export type OrderRecord = {
  id: string
  orderNumber: string
  productName: string
  broadcastDate: string
  status: OrderStatus
  lastUpdated: string
}

export const mockOrderData: OrderRecord[] = [
  {
    id: '1',
    orderNumber: '#A3F2K9',
    productName: '夏季促銷商品',
    broadcastDate: '2024/4/16-2024/12/20',
    status: ORDER_STATUSES.PENDING_UPLOAD,
    lastUpdated: '2025/12/25',
  },
  {
    id: '2',
    orderNumber: '#B4E8D4',
    productName: '冬季特賣會',
    broadcastDate: '2024/4/15-2024/4/19',
    status: ORDER_STATUSES.TRANSFERRED,
    lastUpdated: '2025/12/23',
  },
  {
    id: '3',
    orderNumber: '#C5F9H1',
    productName: '春季新品發布',
    broadcastDate: '2024/3/2-2024/12/28',
    status: ORDER_STATUSES.VIDEO_PRODUCTION,
    lastUpdated: '2025/12/20',
  },
  {
    id: '4',
    orderNumber: '#D6I2J3',
    productName: '秋季清倉優惠',
    broadcastDate: '2024/5/27-2024/1/9',
    status: ORDER_STATUSES.PENDING_CONFIRMATION,
    lastUpdated: '2025/12/22',
  },
  {
    id: '5',
    orderNumber: '#E7K4L5',
    productName: '聖誕節限量版',
    broadcastDate: '2024/3/24-2024/4/11',
    status: ORDER_STATUSES.PENDING_SCHEDULE,
    lastUpdated: '2025/12/24',
  },
  {
    id: '6',
    orderNumber: '#F8M6N7',
    productName: '新年賀歲專案',
    broadcastDate: '2024/6/7-2025/9/14',
    status: ORDER_STATUSES.BROADCASTED,
    lastUpdated: '2025/12/19',
  },
  {
    id: '7',
    orderNumber: '#G9O8P9',
    productName: '情人節甜蜜禮盒',
    broadcastDate: '2024/1/8-2024/12/10',
    status: ORDER_STATUSES.PENDING_UPLOAD,
    lastUpdated: '2025/12/18',
  },
  {
    id: '8',
    orderNumber: '#H0Q1R2',
    productName: '母親節溫馨獻禮',
    broadcastDate: '2024/8/14-2024/12/26',
    status: ORDER_STATUSES.MATERIAL_UPLOADED,
    lastUpdated: '2025/12/15',
  },
  {
    id: '9',
    orderNumber: '#I1S3T4',
    productName: '父親節感恩特惠',
    broadcastDate: '2023/12/29-2024/12/20',
    status: ORDER_STATUSES.VIDEO_PRODUCTION,
    lastUpdated: '2025/12/14',
  },
  {
    id: '10',
    orderNumber: '#J2U5V6',
    productName: '兒童節歡樂禮品',
    broadcastDate: '2024/12/28-2025/1/11',
    status: ORDER_STATUSES.PENDING_CONFIRMATION,
    lastUpdated: '2025/12/13',
  },
  {
    id: '11',
    orderNumber: '#K3W7X8',
    productName: '中秋節團圓套餐',
    broadcastDate: '2024/12/29-2025/4/9',
    status: ORDER_STATUSES.PENDING_SCHEDULE,
    lastUpdated: '2025/12/12',
  },
  {
    id: '12',
    orderNumber: '#L4Y9Z0',
    productName: '國慶日愛國專案',
    broadcastDate: '2024/8/6-2025/2/9',
    status: ORDER_STATUSES.CANCELLED,
    lastUpdated: '2025/12/11',
  },
]

// 根據搜索關鍵字和狀態篩選訂單
export function filterOrders(
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

// 獲取狀態統計
export function getStatusStats(orders: OrderRecord[]) {
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
