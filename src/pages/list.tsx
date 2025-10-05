import { useState, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import ArrowBackIcon from '@/assets/icons/arrow-back.svg?react'
import DetailIcon from '@/assets/icons/detail.svg?react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/status-badge'
import { OrderStatusUtils, type OrderStatus } from '@/lib/constants'
import { mockOrderData, filterOrders } from '@/lib/mockData'

export default function List() {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [orderStatus, setOrderStatus] = useState<string>('all')

  const orderStatusOptions = [
    { value: 'all', label: '全部狀態' },
    ...OrderStatusUtils.getAllOptions(),
  ]

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white px-5 py-4 shadow-sm md:px-15">
        <div className="m-auto flex max-w-3xl items-center gap-5">
          <button
            onClick={handleBack}
            className="mr-3 flex h-8 w-8 items-center justify-center bg-transparent transition-colors duration-200 hover:text-gray-500 focus:text-gray-400 focus:outline-none"
          >
            <ArrowBackIcon className="h-5 w-5" />
          </button>
          <p className="text-base font-medium text-gray-900 md:text-xl">
            訂單紀錄
          </p>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="mx-auto mb-6 flex max-w-3xl flex-col items-start gap-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-medium text-gray-900">搜尋與篩選</h2>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                搜尋關鍵字
              </label>
              <Input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜尋商品名稱"
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
                className="w-full rounded-lg border-gray-200 bg-gray-50 py-3 text-sm placeholder-gray-500 focus:border-transparent focus:ring-0 focus:outline-none focus-visible:ring-0"
              />
            </div>
            <div className="w-full flex-1">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                訂單狀態
              </label>
              <Select value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger className="w-full rounded-lg border-gray-200 bg-gray-50 py-3 text-sm focus:border-transparent focus:ring-0 focus:outline-none focus-visible:ring-0">
                  <SelectValue placeholder="選擇狀態" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-6 flex max-w-3xl flex-col items-start gap-6 rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="text-lg font-medium text-gray-900">
            訂單列表 ({filteredOrders.length}筆記錄)
          </h4>

          {!filteredOrders.length ? (
            <div className="py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h4 className="mt-4 text-sm font-medium text-gray-900">
                暫無訂單資料
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                搜尋條件：{searchKeyword ? `"${searchKeyword}"` : '無關鍵字'}
                {orderStatus !== 'all' &&
                  ` • ${OrderStatusUtils.getLabel(orderStatus as OrderStatus)}`}
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto overflow-x-scroll">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      訂單編號
                    </th>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      商品名稱
                    </th>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      排播日期
                    </th>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      狀態
                    </th>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      最後更新
                    </th>
                    <th className="px-2 py-2 text-left text-sm tracking-wide text-gray-800 uppercase">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-2 py-3 text-sm whitespace-nowrap text-gray-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-2 py-3 text-sm whitespace-nowrap text-gray-900">
                        {order.productName}
                      </td>
                      <td className="px-2 py-3 text-sm whitespace-nowrap text-gray-900">
                        {order.broadcastDate}
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-2 py-3 text-sm whitespace-nowrap text-gray-900">
                        {order.lastUpdated}
                      </td>
                      <td className="px-2 py-3 text-sm whitespace-nowrap text-gray-900">
                        <Button
                          onClick={() => handleViewOrder(order.id)}
                          className="flex h-8 w-12 w-auto items-center justify-center gap-1 rounded-[6px] border border-blue-600 bg-white px-3 text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none"
                        >
                          <DetailIcon className="h-4 w-4" />
                          查看
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
