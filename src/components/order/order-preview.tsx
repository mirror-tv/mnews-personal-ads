import { Instructions } from './instructions'
import { ProductionPreview } from './production-preview'
import { RelatedDocuments } from './related-documents'

import { type OrderRecord } from '@/lib/mockData'
import { ORDER_STATUS_CONFIG, ORDER_STYLES } from '@/lib/status/orderStyles'

type OrderPreviewProps = {
  order: OrderRecord
  className?: string
}

export function OrderPreview({ order, className = '' }: OrderPreviewProps) {
  const shouldShowInstructions =
    ORDER_STATUS_CONFIG.INSTRUCTION_REQUIRED_STATUSES.includes(
      order.status as (typeof ORDER_STATUS_CONFIG.INSTRUCTION_REQUIRED_STATUSES)[number]
    )

  return (
    <section
      className={`${ORDER_STYLES.sectionSpacing} ${ORDER_STYLES.card} ${className}`}
    >
      <ProductionPreview />
      <hr className="my-6 border-gray-3" />
      <RelatedDocuments />
      {shouldShowInstructions && <Instructions status={order.status} />}
    </section>
  )
}
