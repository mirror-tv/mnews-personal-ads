import TextFormatIcon from '@/assets/icons/text-format.svg?react'
import TextIcon from '@/assets/icons/text.svg?react'
import TriangleExclamationIcon from '@/assets/icons/triangle-exclamation.svg?react'
import { EditPageLayout } from '@/components/edit/edit-page-layout'
import { Instructions } from '@/components/shared/instructions'
import { cn } from '@/utils'

const textareaStyle =
  'w-full resize-none rounded-md bg-gray-2 p-3 placeholder:text-text-tertiary placeholder:text-h6'

const INSTRUCTIONS_INFO = [
  '提出修改要求後，原始排播日期將會作廢',
  '業務人員會根據修改複雜度，重新評估報價',
  '修改確認後，需重新安排排播時間',
]

export default function EditRequest() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const reason = formData.get('reason')
    const details = formData.get('details')
    console.log({ reason, details })
  }

  return (
    <EditPageLayout
      title="提出修改"
      onSubmit={handleSubmit}
      submitButtonName="送出修改請求"
    >
      <div className="space-y-m">
        <label
          htmlFor="reason"
          className="typography-h6 flex items-center gap-1"
        >
          <TextIcon className="text-text-tertiary" />
          修改原因
        </label>
        <textarea
          className={cn(textareaStyle, 'h-12')}
          id="reason"
          name="reason"
          placeholder="例如：文字需要調整"
        />
      </div>
      <div className="space-y-m">
        <label
          htmlFor="details"
          className="typography-h6 flex items-center gap-1"
        >
          <TextFormatIcon className="text-text-tertiary" />
          修改詳情
        </label>
        <textarea
          className={cn(textareaStyle, 'h-27')}
          id="details"
          name="details"
          placeholder="請詳細描述您希望調整的地方及期望結果"
        />
      </div>
      <Instructions
        title="重要提醒"
        icon={<TriangleExclamationIcon />}
        wordings={INSTRUCTIONS_INFO}
        isDot
      />
    </EditPageLayout>
  )
}
