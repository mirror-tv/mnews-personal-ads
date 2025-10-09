import { useParams } from 'react-router-dom'

import { OrderActions } from '@/components/order/order-actions'
import { OrderDetails } from '@/components/order/order-details'
import { OrderNotFound } from '@/components/order/order-not-found'
import { OrderStatus as OrderStatusComponent } from '@/components/order/order-status'
import { TestModal } from '@/components/order/test-modal'
import { PageHeader } from '@/components/shared/page-header'
import { mockOrderData } from '@/lib/mockData'

export default function Order() {
  const { id } = useParams()

  if (!id) {
    return <OrderNotFound orderId={undefined} />
  }

  const order = mockOrderData.find((o) => o.id === id)

  if (!order) {
    return <OrderNotFound orderId={id} />
  }

  return (
    <div className="min-h-screen w-full bg-gray-1">
      <PageHeader title="訂單詳情" showBackButton />
      <div className="m-auto max-w-[980px]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 md:flex-col md:gap-4 xl:flex-row xl:gap-8">
            <div className="flex-1 space-y-6">
              <OrderDetails order={order} />
              <OrderActions />
            </div>
            <OrderStatusComponent order={order} />
          </div>
        </div>

        <TestModal
          orders={mockOrderData}
          onOrderSelect={(orderId) => {
            window.location.href = `/order/${orderId}`
          }}
          currentOrderId={id}
        />
      </div>
    </div>
  )
}
