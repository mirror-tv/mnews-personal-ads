// 標籤顏色主題（用於狀態標籤顯示）
const LABEL_THEMES = {
  gray: {
    bg: 'bg-gray-2',
    text: 'text-gray-8',
    border: 'border-gray-3',
    dot: 'bg-gray-5',
  },
  yellow: {
    bg: 'bg-yellow-1',
    text: 'text-yellow-9',
    border: 'border-yellow-2',
    dot: 'bg-yellow-7',
  },
  red: {
    bg: 'bg-red-1',
    text: 'text-red-9',
    border: 'border-red-2',
    dot: 'bg-red-7',
  },
  dark: {
    bg: 'bg-gray-6',
    text: 'text-white',
    border: 'border-gray-6',
    dot: 'bg-gray-4',
  },
  blue: {
    bg: 'bg-blue-7',
    text: 'text-white',
    border: 'border-blue-7',
    dot: 'bg-blue-4',
  },
  green: {
    bg: 'bg-green-1',
    text: 'text-green-9',
    border: 'border-green-2',
    dot: 'bg-green-7',
  },
} as const

// 進度條狀態顏色主題（用於進度條 active 狀態）
const PROGRESS_STATUS_THEMES = {
  orange: {
    bg: 'bg-[#D97706]',
    text: 'text-[#D97706]',
    border: 'border-[#D97706]',
    dot: 'bg-[#D97706]',
  },
  red: {
    bg: 'bg-[#DC2626]',
    text: 'text-[#DC2626]',
    border: 'border-[#DC2626]',
    dot: 'bg-[#DC2626]',
  },
} as const

// 進度條顏色規則
const PROGRESS_COLOR_RULES = {
  // 根據步驟索引獲取 active 狀態的顏色
  getActiveColor: (index: number, type: 'text' | 'bg' = 'text'): string => {
    const colorMap = {
      0: 'red', // 1. 待上傳素材
      1: 'yellow-7', // 2. 素材已上傳
      2: 'yellow-7', // 3. 影片製作中
      3: 'red', // 4. 待確認
      4: 'orange', // 5. 提出修改要求
      5: 'red', // 6. 待確認修改報價
      6: 'green-7', // 7. 已轉移/已播出
    } as const

    const color = colorMap[index as keyof typeof colorMap]
    if (!color) {
      return type === 'text' ? 'text-text-secondary' : 'bg-gray-4'
    }

    if (type === 'text') {
      // 處理進度條狀態顏色主題
      if (color === 'orange') {
        return PROGRESS_STATUS_THEMES.orange.text
      }
      if (color === 'red') {
        return PROGRESS_STATUS_THEMES.red.text
      }
      // 使用 globals.css 中定義的文字顏色類別
      return `text-${color}`
    }

    // 處理進度條狀態顏色主題
    if (color === 'orange') {
      return PROGRESS_STATUS_THEMES.orange.bg
    }
    if (color === 'red') {
      return PROGRESS_STATUS_THEMES.red.bg
    }

    return `${type}-${color}`
  },

  getCompletedStyle: () => ({
    textColor: 'text-text-primary',
    bgColor: 'bg-gray-9',
  }),
}

export const OrderStatusMap = {
  pending_upload: {
    label: '待上傳素材',
    description: '等待客戶上傳廣告素材',
    colors: LABEL_THEMES.gray,
  },
  material_uploaded: {
    label: '素材已上傳',
    description: '素材已收到，準備進入製作流程',
    colors: LABEL_THEMES.yellow,
  },
  modification_request: {
    label: '提出修改要求',
    description: '已提出修改要求，等待客戶回應',
    colors: LABEL_THEMES.yellow,
  },
  video_production: {
    label: '影片製作中',
    description: '影片正在製作中，請稍候',
    colors: LABEL_THEMES.yellow,
  },
  pending_confirmation: {
    label: '待確認',
    description: '等待客戶確認最終版本',
    colors: LABEL_THEMES.red,
  },
  pending_quote_confirmation: {
    label: '待確認修改報價',
    description: '等待客戶確認修改後的報價',
    colors: LABEL_THEMES.red,
  },
  pending_broadcast_date: {
    label: '待設定排播日期',
    description: '等待客戶設定排播日期',
    colors: LABEL_THEMES.red,
  },
  transferred: {
    label: '已轉移',
    description: '訂單已轉移給其他團隊處理',
    colors: LABEL_THEMES.dark,
  },
  cancelled: {
    label: '已作廢',
    description: '訂單已取消作廢',
    colors: LABEL_THEMES.dark,
  },
  pending_schedule: {
    label: '待排播',
    description: '確認完成，等待排播時間',
    colors: LABEL_THEMES.blue,
  },
  broadcasted: {
    label: '已播出',
    description: '廣告已播出完成',
    colors: LABEL_THEMES.green,
  },
} as const

export type OrderStatus = keyof typeof OrderStatusMap

export const ORDER_STATUS_DISPLAY_ORDER: OrderStatus[] = [
  'pending_upload',
  'material_uploaded',
  'video_production',
  'pending_confirmation',
  'pending_schedule',
  'broadcasted',
  'modification_request',
  'pending_quote_confirmation',
  'transferred',
  'pending_broadcast_date',
  'cancelled',
]

export { PROGRESS_COLOR_RULES }
export * from './layout'
