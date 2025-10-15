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

export default function Dashboard() {
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
            <StatusCard
              count={2}
              text="待上傳素材"
              color="text-gray-6"
              bgColor="bg-gray-2"
            />
            <StatusCard
              count={1}
              text="素材已上傳"
              color="text-yellow-7"
              bgColor="bg-yellow-1"
            />
            <StatusCard
              count={1}
              text="影片製作中"
              color="text-yellow-7"
              bgColor="bg-yellow-1"
            />
            <StatusCard
              count={1}
              text="待確認"
              color="text-red-7"
              bgColor="bg-red-1"
            />
            <StatusCard
              count={1}
              text="等待排播"
              color="text-blue-7"
              bgColor="bg-blue-1"
            />
            <StatusCard
              count={1}
              text="已播出"
              color="text-green-7"
              bgColor="bg-green-1"
            />
          </CardContent>
        </Card>
      </PageMain>
    </>
  )
}
