// 簡化的狀態管理系統 - 包含設計稿上的所有狀態
export const ORDER_STATUSES = {
  // 核心訂單狀態
  PENDING_UPLOAD: 'pending_upload', // 待上傳素材
  MATERIAL_UPLOADED: 'material_uploaded', // 素材已上傳
  TRANSFERRED: 'transferred', // 已轉移
  VIDEO_PRODUCTION: 'video_production', // 影片製作中
  PENDING_CONFIRMATION: 'pending_confirmation', // 待確認
  PENDING_SCHEDULE: 'pending_schedule', // 待排播
  BROADCASTED: 'broadcasted', // 已播出
  CANCELLED: 'cancelled', // 已作廢
} as const

export const STATUS_LABELS = {
  [ORDER_STATUSES.PENDING_UPLOAD]: '待上傳素材',
  [ORDER_STATUSES.MATERIAL_UPLOADED]: '素材已上傳',
  [ORDER_STATUSES.TRANSFERRED]: '已轉移',
  [ORDER_STATUSES.VIDEO_PRODUCTION]: '影片製作中',
  [ORDER_STATUSES.PENDING_CONFIRMATION]: '待確認',
  [ORDER_STATUSES.PENDING_SCHEDULE]: '待排播',
  [ORDER_STATUSES.BROADCASTED]: '已播出',
  [ORDER_STATUSES.CANCELLED]: '已作廢',
} as const

export const STATUS_COLORS = {
  [ORDER_STATUSES.PENDING_UPLOAD]: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  },
  [ORDER_STATUSES.MATERIAL_UPLOADED]: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    dot: 'bg-yellow-400',
  },
  [ORDER_STATUSES.TRANSFERRED]: {
    bg: 'bg-gray-500',
    text: 'text-white',
    border: 'border-gray-500',
    dot: 'bg-gray-300',
  },
  [ORDER_STATUSES.VIDEO_PRODUCTION]: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-400',
  },
  [ORDER_STATUSES.PENDING_CONFIRMATION]: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    dot: 'bg-orange-400',
  },
  [ORDER_STATUSES.PENDING_SCHEDULE]: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-400',
  },
  [ORDER_STATUSES.BROADCASTED]: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    dot: 'bg-green-400',
  },
  [ORDER_STATUSES.CANCELLED]: {
    bg: 'bg-gray-500',
    text: 'text-white',
    border: 'border-gray-500',
    dot: 'bg-gray-300',
  },
} as const

export const STATUS_FLOW = [
  ORDER_STATUSES.PENDING_UPLOAD,
  ORDER_STATUSES.MATERIAL_UPLOADED,
  ORDER_STATUSES.TRANSFERRED,
  ORDER_STATUSES.VIDEO_PRODUCTION,
  ORDER_STATUSES.PENDING_CONFIRMATION,
  ORDER_STATUSES.PENDING_SCHEDULE,
  ORDER_STATUSES.BROADCASTED,
] as const

export const STATUS_DESCRIPTIONS = {
  [ORDER_STATUSES.PENDING_UPLOAD]: '等待客戶上傳廣告素材',
  [ORDER_STATUSES.MATERIAL_UPLOADED]: '素材已收到，準備進入製作流程',
  [ORDER_STATUSES.TRANSFERRED]: '素材已轉移給製作團隊',
  [ORDER_STATUSES.VIDEO_PRODUCTION]: '影片正在製作中，請稍候',
  [ORDER_STATUSES.PENDING_CONFIRMATION]: '等待客戶確認最終版本',
  [ORDER_STATUSES.PENDING_SCHEDULE]: '確認完成，等待排播時間',
  [ORDER_STATUSES.BROADCASTED]: '廣告已播出完成',
  [ORDER_STATUSES.CANCELLED]: '訂單已取消作廢',
} as const

// TypeScript 類型定義
export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES]

// 實用函數
export const OrderStatusUtils = {
  // 獲取狀態標籤
  getLabel: (status: OrderStatus): string => STATUS_LABELS[status],

  // 獲取狀態顏色
  getColors: (status: OrderStatus) => STATUS_COLORS[status],

  // 獲取狀態說明
  getDescription: (status: OrderStatus): string => STATUS_DESCRIPTIONS[status],

  // 檢查是否為最終狀態
  isFinalStatus: (status: OrderStatus): boolean =>
    status === ORDER_STATUSES.BROADCASTED,

  // 獲取下一個狀態
  getNext: (currentStatus: OrderStatus): OrderStatus | null => {
    // 已作廢狀態沒有下一個狀態
    if (currentStatus === ORDER_STATUSES.CANCELLED) {
      return null
    }
    const currentIndex = STATUS_FLOW.indexOf(
      currentStatus as (typeof STATUS_FLOW)[number]
    )
    if (currentIndex === -1 || currentIndex === STATUS_FLOW.length - 1) {
      return null
    }
    return STATUS_FLOW[currentIndex + 1]
  },

  // 獲取上一個狀態
  getPrevious: (currentStatus: OrderStatus): OrderStatus | null => {
    // 已作廢狀態沒有上一個狀態
    if (currentStatus === ORDER_STATUSES.CANCELLED) {
      return null
    }
    const currentIndex = STATUS_FLOW.indexOf(
      currentStatus as (typeof STATUS_FLOW)[number]
    )
    if (currentIndex <= 0) {
      return null
    }
    return STATUS_FLOW[currentIndex - 1]
  },

  // 獲取狀態進度百分比
  getProgress: (status: OrderStatus): number => {
    // 已作廢狀態進度為 0
    if (status === ORDER_STATUSES.CANCELLED) {
      return 0
    }
    const index = STATUS_FLOW.indexOf(status as (typeof STATUS_FLOW)[number])
    return Math.round(((index + 1) / STATUS_FLOW.length) * 100)
  },

  getAllOptions: () =>
    Object.entries(STATUS_LABELS).map(([value, label]) => ({
      value: value as OrderStatus,
      label,
    })),

  getBadgeVariant: (status: OrderStatus) => {
    const variantMap: Record<OrderStatus, string> = {
      [ORDER_STATUSES.PENDING_UPLOAD]: 'pending-upload',
      [ORDER_STATUSES.MATERIAL_UPLOADED]: 'material-uploaded',
      [ORDER_STATUSES.TRANSFERRED]: 'transferred',
      [ORDER_STATUSES.VIDEO_PRODUCTION]: 'video-production',
      [ORDER_STATUSES.PENDING_CONFIRMATION]: 'pending-confirmation',
      [ORDER_STATUSES.PENDING_SCHEDULE]: 'pending-schedule',
      [ORDER_STATUSES.BROADCASTED]: 'broadcasted',
      [ORDER_STATUSES.CANCELLED]: 'cancelled',
    }
    return variantMap[status] || 'secondary'
  },
}
