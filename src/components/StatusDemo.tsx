import { OrderStatusUtils, type OrderStatus } from '@/lib/constants'

type StatusBadgeProps = {
  status: OrderStatus
  showDescription?: boolean
  showProgress?: boolean
}

export function StatusBadge({
  status,
  showDescription = false,
  showProgress = false,
}: StatusBadgeProps) {
  const colors = OrderStatusUtils.getColors(status)
  const label = OrderStatusUtils.getLabel(status)
  const description = OrderStatusUtils.getDescription(status)
  const progress = OrderStatusUtils.getProgress(status)

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <div className={`mr-2 h-2 w-2 rounded-full ${colors.dot}`}></div>
      {label}
      {showDescription && (
        <span className="ml-2 text-xs opacity-75">({description})</span>
      )}
      {showProgress && <span className="ml-2 font-bold">{progress}%</span>}
    </div>
  )
}

export function StatusFlow() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">狀態流程</h3>

      {/* 進度條 */}
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-blue-400 via-indigo-400 via-orange-400 via-purple-400 to-green-400"
          style={{ width: '100%' }}
        ></div>
      </div>

      {/* 狀態步驟 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OrderStatusUtils.getAllOptions().map(({ value }) => (
          <div key={value} className="rounded-lg border border-gray-200 p-3">
            <StatusBadge status={value} />
            <p className="mt-2 text-xs text-gray-600">
              {OrderStatusUtils.getDescription(value)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              進度: {OrderStatusUtils.getProgress(value)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function OrderStatusSelector() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">訂單狀態篩選器</h3>

      <div className="space-y-2">
        {OrderStatusUtils.getAllOptions().map(({ value }) => {
          return (
            <label
              key={value}
              className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="radio"
                name="status"
                value={value}
                className="text-blue-600 focus:ring-blue-500"
              />
              <StatusBadge status={value} />
              <span className="text-sm text-gray-600">
                {OrderStatusUtils.getDescription(value)}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
