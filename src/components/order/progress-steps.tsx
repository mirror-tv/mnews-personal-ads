import DoneIcon from '@/assets/icons/done.svg?react'
import {
  OrderStatusMap,
  ORDER_STATUS_DISPLAY_ORDER,
  PROGRESS_COLOR_RULES,
  type OrderStatus,
} from '@/lib/constants'

type ProgressStepsProps = {
  currentStatusIndex: number
  className?: string
}

export function ProgressSteps({
  currentStatusIndex,
  className = '',
}: ProgressStepsProps) {
  const currentStatus = ORDER_STATUS_DISPLAY_ORDER[currentStatusIndex]
  const isCancelled = currentStatus === 'cancelled'
  const isTransferred = currentStatus === 'transferred'
  const isModificationFlow = [
    'modification_request',
    'pending_quote_confirmation',
    'transferred',
  ].includes(currentStatus)
  const isTimeoutFlow = currentStatus === 'pending_broadcast_date'

  // 定義不同流程的步驟
  const getProgressSteps = () => {
    if (isCancelled) {
      return ['cancelled']
    }

    if (isModificationFlow) {
      // 修改流程：前4個步驟 + 修改流程步驟
      return [
        'pending_upload',
        'material_uploaded',
        'video_production',
        'pending_confirmation',
        'modification_request',
        'pending_quote_confirmation',
        'transferred',
      ]
    }

    if (isTimeoutFlow) {
      // 超時流程：包含待設定排播日期
      return [
        'pending_upload',
        'material_uploaded',
        'video_production',
        'pending_broadcast_date',
        'pending_confirmation',
        'pending_schedule',
        'broadcasted',
      ]
    }

    // 正統流程
    return [
      'pending_upload',
      'material_uploaded',
      'video_production',
      'pending_confirmation',
      'pending_schedule',
      'broadcasted',
    ]
  }

  const progressSteps = getProgressSteps()

  // 獲取步驟狀態
  const getStepStatus = (step: OrderStatus, index: number) => {
    const isActive = currentStatus === step
    const completedStyle = PROGRESS_COLOR_RULES.getCompletedStyle()

    if (isCancelled) {
      return {
        isCompleted: true,
        isActive: false,
        style: completedStyle,
      }
    }

    if (isTransferred) {
      return {
        isCompleted: true,
        isActive: false,
        style: completedStyle,
      }
    }

    if (isModificationFlow) {
      // 修改流程：前4個步驟 completed，當前步驟 active，後續步驟 pending
      const currentIndex = progressSteps.indexOf(currentStatus)
      return {
        isCompleted: index < currentIndex,
        isActive: isActive,
        style: completedStyle,
      }
    }

    if (isTimeoutFlow) {
      // 超時流程：根據當前狀態決定 completed 步驟
      const currentIndex = progressSteps.indexOf(currentStatus)
      return {
        isCompleted: index < currentIndex,
        isActive: isActive,
        style: completedStyle,
      }
    }

    // 正統流程：根據當前狀態決定 completed 步驟
    const currentIndex = progressSteps.indexOf(currentStatus)
    return {
      isCompleted: index < currentIndex,
      isActive: isActive,
      style: completedStyle,
    }
  }

  return (
    <div className={className}>
      <h6 className="mb-3 text-sm font-medium text-text-secondary">處理進度</h6>
      <div className="space-y-2">
        {progressSteps.map((status, index) => {
          const statusConfig = OrderStatusMap[status]
          const stepStatus = getStepStatus(status, index)

          return (
            <div key={status} className="flex items-center gap-3">
              <div
                className={`flex size-3 items-center justify-center rounded-full ${
                  stepStatus.isCompleted
                    ? stepStatus.style.bgColor
                    : stepStatus.isActive
                      ? PROGRESS_COLOR_RULES.getActiveColor(index, 'bg')
                      : 'bg-gray-4'
                }`}
              >
                {stepStatus.isCompleted && <DoneIcon />}
              </div>
              <span
                className={`text-sm font-medium ${
                  stepStatus.isCompleted
                    ? stepStatus.style.textColor
                    : stepStatus.isActive
                      ? PROGRESS_COLOR_RULES.getActiveColor(index, 'text')
                      : 'text-text-tertiary'
                }`}
              >
                {statusConfig.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
