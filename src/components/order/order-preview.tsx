import { Instructions } from './instructions'
import { ProductionPreview } from './production-preview'
import { RelatedDocuments } from './related-documents'

import { type OrderRecord } from '@/lib/mockData'

type OrderPreviewProps = {
  order: OrderRecord
  className?: string
}

export function OrderPreview({ order, className = '' }: OrderPreviewProps) {
  return (
    <section
      className={`space-y-6 rounded-lg border border-gray-3 bg-white p-6 ${className}`}
    >
      <ProductionPreview />
      <hr className="my-6 border-gray-3" />
      <RelatedDocuments />
      {order.status === 'pending_confirmation' && <Instructions />}
    </section>
  )
}
