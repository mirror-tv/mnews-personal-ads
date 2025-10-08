import { useState, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { EmptyState } from '@/components/list/empty-state'
import { OrderTable } from '@/components/list/order-table'
import { SearchAndFilter } from '@/components/list/search-and-filter'
import { PageHeader } from '@/components/shared/page-header'
import { mockOrderData } from '@/lib/mockData'
import { filterOrders } from '@/lib/utils'

export default function List() {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [orderStatus, setOrderStatus] = useState<string>('all')

  const filteredOrders = useMemo(() => {
    return filterOrders(mockOrderData, searchKeyword, orderStatus)
  }, [searchKeyword, orderStatus])

  const handleBack = () => {
    navigate(-1)
  }

  const handleViewOrder = (orderId: string) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="訂單紀錄" showBackButton onBack={handleBack} />

      <main className="mx-auto max-w-[1080px] px-4 py-6 md:px-15">
        <SearchAndFilter
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
          orderStatus={orderStatus}
          onStatusChange={setOrderStatus}
        />

        <div className="mb-6 flex flex-col gap-6 rounded-xl border border-border-default bg-surface-primary p-6">
          <h4 className="text-lg font-medium text-text-primary">
            訂單列表 ({filteredOrders.length}筆記錄)
          </h4>

          {!filteredOrders.length ? (
            <EmptyState
              searchKeyword={searchKeyword}
              orderStatus={orderStatus}
            />
          ) : (
            <OrderTable orders={filteredOrders} onViewOrder={handleViewOrder} />
          )}
        </div>
      </main>
    </div>
  )
}
