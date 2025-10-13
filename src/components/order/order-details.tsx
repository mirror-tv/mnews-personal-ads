import { orderLabels } from '@/constants/labels'
import { type OrderRecord } from '@/mocks/mockData'

type OrderDetailsProps = {
  order: OrderRecord
  className?: string
}

const labelStyles = 'text-caption1 text-text-secondary'
const valueStyles = 'text-body2 text-text-primary'

export function OrderDetails({ order, className = '' }: OrderDetailsProps) {
  return (
    <section
      className={`rounded-lg border border-gray-3 bg-white p-6 ${className}`}
    >
      <h5 className="text-h4 mb-4 font-semibold text-text-primary">
        {orderLabels.orderData}
      </h5>
      <div className="space-y-3">
        <div>
          <label className={labelStyles}>{orderLabels.adName}</label>
          <p className={valueStyles}>{order.productName}</p>
        </div>
        <div>
          <label className={labelStyles}>{orderLabels.broadcastDate}</label>
          <p className={valueStyles}>{order.broadcastDate}</p>
        </div>
        <div>
          <label className={labelStyles}>{orderLabels.textMaterial1}</label>
          <p className={valueStyles}>新年快樂</p>
        </div>
        <div>
          <label className={labelStyles}>{orderLabels.textMaterial2}</label>
          <p className={valueStyles}>歡慶新年特惠價</p>
        </div>
      </div>
    </section>
  )
}
