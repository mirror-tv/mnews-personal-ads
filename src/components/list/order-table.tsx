import { OrderGroup } from '@/components/list/order-group'
import { type OrderRecord } from '@/lib/mockData'

type OrderTableProps = {
  orders: OrderRecord[]
  onViewOrder: (orderId: string) => void
}

export function OrderTable({ orders, onViewOrder }: OrderTableProps) {
  return (
    <div className="w-full overflow-x-scroll">
      <table className="min-w-full divide-y divide-border-default">
        <thead>
          <tr>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              訂單編號
            </th>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              商品名稱
            </th>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              排播日期
            </th>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              狀態
            </th>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              最後更新
            </th>
            <th className="p-2 text-left text-sm tracking-wide text-text-primary uppercase">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default bg-surface-primary">
          {orders.map((order) => (
            <OrderGroup
              key={order.id}
              order={order}
              onViewOrder={onViewOrder}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
