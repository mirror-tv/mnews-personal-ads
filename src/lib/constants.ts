type OrderStatus = keyof typeof OrderStatusMap

const OrderStatusMap = {
  // 原始狀態 - 淺灰色背景，深灰色文字
  pending_upload: {
    label: '待上傳素材',
    description: '等待客戶上傳廣告素材',
    colors: {
      bg: 'bg-gray-2',
      text: 'text-gray-8',
      border: 'border-gray-3',
      dot: 'bg-gray-5',
    },
  },

  // 我方動作中 - 淺黃色背景，深橙色文字
  material_uploaded: {
    label: '素材已上傳',
    description: '素材已收到，準備進入製作流程',
    colors: {
      bg: 'bg-yellow-1',
      text: 'text-yellow-9',
      border: 'border-yellow-2',
      dot: 'bg-yellow-7',
    },
  },
  modification_request: {
    label: '提出修改要求',
    description: '已提出修改要求，等待客戶回應',
    colors: {
      bg: 'bg-yellow-1',
      text: 'text-yellow-9',
      border: 'border-yellow-2',
      dot: 'bg-yellow-7',
    },
  },
  video_production: {
    label: '影片製作中',
    description: '影片正在製作中，請稍候',
    colors: {
      bg: 'bg-yellow-1',
      text: 'text-yellow-9',
      border: 'border-yellow-2',
      dot: 'bg-yellow-7',
    },
  },

  // 須使用者動作 - 淺紅色背景，深紅色文字
  pending_confirmation: {
    label: '待確認',
    description: '等待客戶確認最終版本',
    colors: {
      bg: 'bg-red-1',
      text: 'text-red-9',
      border: 'border-red-2',
      dot: 'bg-red-7',
    },
  },
  pending_quote_confirmation: {
    label: '待確認修改報價',
    description: '等待客戶確認修改後的報價',
    colors: {
      bg: 'bg-red-1',
      text: 'text-red-9',
      border: 'border-red-2',
      dot: 'bg-red-7',
    },
  },
  pending_broadcast_date: {
    label: '待設定排播日期',
    description: '等待客戶設定排播日期',
    colors: {
      bg: 'bg-red-1',
      text: 'text-red-9',
      border: 'border-red-2',
      dot: 'bg-red-7',
    },
  },

  // 已作廢或轉移 - 中灰色背景，白色文字
  transferred: {
    label: '已轉移',
    description: '訂單已轉移給其他團隊處理',
    colors: {
      bg: 'bg-gray-6',
      text: 'text-white',
      border: 'border-gray-6',
      dot: 'bg-gray-4',
    },
  },
  cancelled: {
    label: '已作廢',
    description: '訂單已取消作廢',
    colors: {
      bg: 'bg-gray-6',
      text: 'text-white',
      border: 'border-gray-6',
      dot: 'bg-gray-4',
    },
  },

  // 編輯已完成
  pending_schedule: {
    label: '待排播',
    description: '確認完成，等待排播時間',
    colors: {
      bg: 'bg-blue-7',
      text: 'text-white',
      border: 'border-blue-7',
      dot: 'bg-blue-4',
    },
  },
  broadcasted: {
    label: '已播出',
    description: '廣告已播出完成',
    colors: {
      bg: 'bg-green-1',
      text: 'text-green-9',
      border: 'border-green-2',
      dot: 'bg-green-7',
    },
  },
} as const

export { OrderStatusMap }
export type { OrderStatus }
