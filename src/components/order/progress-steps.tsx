import DoneIcon from '@/assets/icons/done.svg?react'
import {
  OrderStatusMap,
  ORDER_STATUS_DISPLAY_ORDER,
  PROGRESS_COLOR_RULES,
} from '@/lib/constants'

type ProgressStepsProps = {
  currentStatusIndex: number
  className?: string
}

export function ProgressSteps({
  currentStatusIndex,
  className = '',
}: ProgressStepsProps) {
  return (
    <div className={className}>
      <h6 className="mb-3 text-sm font-medium text-text-secondary">處理進度</h6>
      <div className="space-y-2">
        {ORDER_STATUS_DISPLAY_ORDER.slice(0, 6).map((status, index) => {
          const statusConfig = OrderStatusMap[status]
          const isActive = index === currentStatusIndex
          const isCompleted = index < currentStatusIndex
          const completedStyle = PROGRESS_COLOR_RULES.getCompletedStyle()

          return (
            <div key={status} className="flex items-center gap-3">
              {isCompleted ? (
                <div
                  className={`size-3 rounded-full ${completedStyle.bgColor} flex items-center justify-center`}
                >
                  <DoneIcon />
                </div>
              ) : (
                <div
                  className={`size-3 rounded-full ${
                    isActive
                      ? PROGRESS_COLOR_RULES.getActiveColor(index, 'bg')
                      : 'bg-gray-4'
                  }`}
                />
              )}
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? PROGRESS_COLOR_RULES.getActiveColor(index, 'text')
                    : isCompleted
                      ? completedStyle.textColor
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
