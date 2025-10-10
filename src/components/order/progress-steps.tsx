import DoneIcon from '@/assets/icons/done.svg?react'
import {
  OrderStatusMap,
  PROGRESS_COLOR_RULES,
  getStatusesByRoute,
  getCurrentRoute,
  type OrderStatus,
} from '@/lib/status/orderStatus'

type ProgressStepsProps = {
  currentStatus: OrderStatus
  className?: string
}

export function ProgressSteps({
  currentStatus,
  className = '',
}: ProgressStepsProps) {
  const currentRoute = getCurrentRoute(currentStatus)

  const progressSteps = getStatusesByRoute(currentRoute)

  const getStepStatus = (step: OrderStatus, index: number) => {
    const isActive = currentStatus === step
    const completedStyle = PROGRESS_COLOR_RULES.getCompletedStyle()
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
                      ? PROGRESS_COLOR_RULES.getActiveColor(status, 'bg')
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
                      ? PROGRESS_COLOR_RULES.getActiveColor(status, 'text')
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
