import { PageHeader } from '@/components/shared/page-header'

export default function Dashboard() {
  return (
    <>
      <PageHeader variant="spread" title="鏡新聞個人廣告系統" />
      <div className="flex h-[70vh] flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-indigo-600">Dashboard</h1>
        <p className="mt-4 text-gray-700">
          Welcome to your dashboard overview.
        </p>
      </div>
    </>
  )
}
