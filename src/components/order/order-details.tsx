import { type OrderRecord } from '@/lib/mockData'

type OrderDetailsProps = {
  order: OrderRecord
  className?: string
}

export function OrderDetails({ order, className = '' }: OrderDetailsProps) {
  return (
    <section
      className={`rounded-lg border border-gray-3 bg-white p-6 ${className}`}
    >
      <h5 className="text-h4 mb-4 font-semibold text-text-primary">訂單資料</h5>
      <div className="space-y-3">
        <div>
          <label className="text-caption1 text-text-secondary">廣告名稱</label>
          <p className="text-body2 text-text-primary">{order.productName}</p>
        </div>
        <div>
          <label className="text-caption1 text-text-secondary">排播日期</label>
          <p className="text-body2 text-text-primary">{order.broadcastDate}</p>
        </div>
        <div>
          <label className="text-caption1 text-text-secondary">
            文字素材一
          </label>
          <p className="text-body2 text-text-primary">新年快樂</p>
        </div>
        <div>
          <label className="text-caption1 text-text-secondary">
            文字素材二
          </label>
          <p className="text-body2 text-text-primary">歡慶新年特惠價</p>
        </div>
      </div>
    </section>
  )
}
