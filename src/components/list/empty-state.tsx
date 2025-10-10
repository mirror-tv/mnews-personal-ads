import { type OrderStatus } from '@/status/orderStatus'
import { OrderStatusUtils } from '@/status/utils'

type EmptyStateProps = {
  searchKeyword: string
  orderStatus: string
}

export function EmptyState({ searchKeyword, orderStatus }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <svg
        className="mx-auto h-12 w-12 text-text-tertiary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h4 className="mt-4 text-sm font-medium text-text-primary">
        暫無訂單資料
      </h4>
      <p className="mt-2 text-sm text-text-secondary">
        搜尋條件：{searchKeyword ? `"${searchKeyword}"` : '無關鍵字'}
        {orderStatus !== 'all' &&
          ` • ${OrderStatusUtils.getLabel(orderStatus as OrderStatus)}`}
      </p>
    </div>
  )
}
