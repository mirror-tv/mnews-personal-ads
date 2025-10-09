import UploadIcon from '@/assets/icons/upload.svg?react'
import { Button } from '@/components/ui/button'

type OrderActionsProps = {
  className?: string
}

export function OrderActions({ className = '' }: OrderActionsProps) {
  return (
    <section
      className={`rounded-lg border border-gray-3 bg-white p-6 ${className}`}
    >
      <h5 className="text-h4 mb-4 font-semibold text-text-primary">訂單操作</h5>
      <div className="space-y-3">
        <Button className="bg-blue-6 text-white hover:bg-blue-7">
          <UploadIcon />
          上傳素材
        </Button>
        <div className="flex w-full items-start self-stretch rounded-[10px] border border-[var(--color-border-default)] border-gray-3 bg-[var(--color-surface-tertiary)] p-[13px] font-sans text-sm font-medium text-text-secondary">
          <h6 className="min-w-fit">需要協助？</h6>
          <a
            className="text-caption1 font-medium text-text-secondary underline hover:text-text-primary"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            申請退款
          </a>
        </div>
      </div>
    </section>
  )
}
