import { useState, useCallback } from 'react'

import {
  ORDER_STATUSES,
  OrderStatusUtils,
  type OrderStatus,
} from '@/lib/constants'

export function useOrderStatus(initialStatus?: OrderStatus) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    initialStatus || ORDER_STATUSES.PENDING_UPLOAD
  )

  const [statusHistory, setStatusHistory] = useState<OrderStatus[]>([
    initialStatus || ORDER_STATUSES.PENDING_UPLOAD,
  ])

  // 更新狀態
  const updateStatus = useCallback((newStatus: OrderStatus) => {
    setCurrentStatus(newStatus)
    setStatusHistory((prev) => [...prev, newStatus])
  }, [])

  // 推進到下一狀態
  const moveToNext = useCallback(() => {
    const nextStatus = OrderStatusUtils.getNext(currentStatus)
    if (nextStatus) {
      updateStatus(nextStatus)
      return true
    }
    return false
  }, [currentStatus, updateStatus])

  // 回退到上一狀態
  const moveToPrevious = useCallback(() => {
    const previousStatus = OrderStatusUtils.getPrevious(currentStatus)
    if (previousStatus) {
      updateStatus(previousStatus)
      return true
    }
    return false
  }, [currentStatus, updateStatus])

  // 檢查是否可以推進
  const canMoveNext = OrderStatusUtils.getNext(currentStatus) !== null

  // 檢查是否可以回退
  const canMovePrevious = OrderStatusUtils.getPrevious(currentStatus) !== null

  // 重置到初始狀態
  const reset = useCallback(() => {
    setCurrentStatus(ORDER_STATUSES.PENDING_UPLOAD)
    setStatusHistory([ORDER_STATUSES.PENDING_UPLOAD])
  }, [])

  return {
    currentStatus,
    statusHistory,
    updateStatus,
    moveToNext,
    moveToPrevious,
    canMoveNext,
    canMovePrevious,
    reset,
    // 工具函數
    getLabel: () => OrderStatusUtils.getLabel(currentStatus),
    getDescription: () => OrderStatusUtils.getDescription(currentStatus),
    getColors: () => OrderStatusUtils.getColors(currentStatus),
    getProgress: () => OrderStatusUtils.getProgress(currentStatus),
    isFinalStatus: () => OrderStatusUtils.isFinalStatus(currentStatus),
  }
}
