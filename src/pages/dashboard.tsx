import { useState } from 'react'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import FileIcon from '@/assets/icons/file.svg?react'
import UploadIcon from '@/assets/icons/upload.svg?react'
import StatusCard from '@/components/dashboard/status-card'
import PageHeader from '@/components/shared/page-header'
import PageMain from '@/components/shared/page-main'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { OrderStatusMap } from '@/constants'
import { getOrdersStatusStatsQuery } from '@/graphql/query/orders'
import { queryData } from '@/utils/graphql'

type Order = {
  id: string
  state: string
  updatedAt?: string
  createdAt: string
}
type StatusStats = { status: string; count: number }

export default function Dashboard() {
  const [statusStats, setStatusStats] = useState<StatusStats[]>([])

  const getStatusStats = (orders: Order[]) => {
    const sortedOrders = [...orders].sort((a, b) => {
      const timeA = a.updatedAt || a.createdAt
      const timeB = b.updatedAt || b.createdAt
      return new Date(timeB).getTime() - new Date(timeA).getTime()
    })

    const statusOrder: { status: string; count: number }[] = []

    sortedOrders.forEach((order) => {
      const existing = statusOrder.find((item) => item.status === order.state)
      if (!existing) {
        statusOrder.push({ status: order.state, count: 1 })
      } else {
        existing.count++
      }
    })

    return statusOrder
  }

  const fetchOrdersStatusStats = async () => {
    try {
      const ordersStatusStats = await queryData<{
        orders: Order[]
      }>(getOrdersStatusStatsQuery, {})

      setStatusStats(getStatusStats(ordersStatusStats.orders))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrdersStatusStats()
  }, [])

  return (
    <>
      <PageHeader variant="spread" title="鏡新聞個人廣告系統" />
      <PageMain className="grid grid-rows-[auto_1fr] gap-4 py-5 md:gap-10 md:py-10">
        {/* --- Top two cards --- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Upload Card */}
          <Link to="/upload">
            <Card className="cursor-pointer items-center justify-center gap-3 hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.10)]">
              <UploadIcon className="text-blue-7" />
              <CardTitle className="flex flex-col items-center gap-1">
                <span>上傳廣告素材</span>
                <CardDescription>上傳後即可進入製作流程</CardDescription>
              </CardTitle>
            </Card>
          </Link>

          {/* history Card */}
          <Link to="/list">
            <Card className="cursor-pointer items-center justify-center gap-3 hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.10)]">
              <FileIcon className="text-blue-7" />
              <CardTitle className="flex flex-col items-center gap-1">
                <span>訂單紀錄</span>
                <CardDescription>查看與管理所有訂單</CardDescription>
              </CardTitle>
            </Card>
          </Link>
        </div>

        {/* --- Bottom: Order status overview --- */}
        <Card>
          <CardHeader>
            <CardTitle>訂單狀態總覽</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4 xl:grid-cols-6">
            {statusStats.map(({ status, count }) => {
              const config =
                OrderStatusMap[status as keyof typeof OrderStatusMap]
              if (!config) return null

              return (
                <Link key={status} to={`/list?status=${status}`}>
                  <StatusCard
                    name={status}
                    count={count}
                    text={config.label}
                    color={config.colors.text}
                    bgColor={config.colors.bg}
                  />
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </PageMain>
    </>
  )
}
