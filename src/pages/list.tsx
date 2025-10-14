import { useState, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { EmptyState } from '@/components/list/empty-state'
import { OrderTable } from '@/components/list/order-table'
import { SearchAndFilter } from '@/components/list/search-and-filter'
import { PageHeader } from '@/components/shared/page-header'
import PageMain from '@/components/shared/page-main'
import { layout } from '@/constants/layout'
import { mockOrderData } from '@/mocks/mockData'
import { cn, filterOrders } from '@/utils'

export default function List() {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [orderStatus, setOrderStatus] = useState<string>('all')

  const filteredOrders = useMemo(() => {
    return filterOrders(mockOrderData, searchKeyword, orderStatus)
  }, [searchKeyword, orderStatus])

  const handleViewOrder = (orderId: string) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <>
      <PageHeader title="訂單紀錄" />
      <PageMain>
        <section
          className={cn('mx-auto my-5 md:my-10', layout.maxWidthResponsive)}
        >
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
              <OrderTable
                orders={filteredOrders}
                onViewOrder={handleViewOrder}
              />
            )}
          </div>
        </section>
      </PageMain>
    </>
  )
}
