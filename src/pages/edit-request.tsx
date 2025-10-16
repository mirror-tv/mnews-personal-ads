import TextFormatIcon from '@/assets/icons/text-format.svg?react'
import TextIcon from '@/assets/icons/text.svg?react'
import TriangleExclamationIcon from '@/assets/icons/triangle-exclamation.svg?react'
import { Instructions } from '@/components/shared/instructions'
import PageHeader from '@/components/shared/page-header'
import PageMain from '@/components/shared/page-main'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

const Mock_Order_Number = 'B7H8M3'
const Mock_Order_Name = '新年特惠商品'
const Mock_Order_Date = '2024/12/25-2025/12/31'

const textareaStyle =
  'w-full resize-none rounded-md bg-gray-2 p-3 placeholder:text-text-tertiary'

const INSTRUCTIONS_INFO = [
  '提出修改要求後，原始排播日期將會作廢',
  '業務人員會根據修改複雜度，重新評估報價',
  '修改確認後，需重新安排排播時間',
]

export default function EditRequest() {
  const orderInfo = [
    { title: '訂單編號', value: '#' + Mock_Order_Number },
    { title: '廣告名稱', value: Mock_Order_Name },
    { title: '排播日期', value: Mock_Order_Date },
  ]
  function handleSubmit() {
    return () => console.log('submit')
  }

  return (
    <>
      <PageHeader title="提出修改 " />
      <PageMain className="space-y-xl py-5 md:space-y-3xl md:py-10 xl:space-y-4xl">
        {/* order info */}
        <Card>
          <CardTitle>訂單資料</CardTitle>
          <CardContent className="flex flex-col justify-between gap-3 md:flex-row">
            {orderInfo.map((info) => (
              <div className="flex flex-col">
                <h6 className="text-text-secondary">{info.title}</h6>
                <span className="typography-body2">{info.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Edit Request Form */}
        <Card>
          <CardTitle>修改資料</CardTitle>
          <CardContent className="space-y-3xl">
            <form className="space-y-3xl" onSubmit={handleSubmit}>
              <div className="space-y-m">
                <h6 className="flex items-center gap-1">
                  <TextIcon className="text-text-tertiary" />
                  修改原因
                </h6>
                <textarea
                  className={textareaStyle}
                  name=""
                  id=""
                  placeholder="例如：文字需要調整"
                />
              </div>
              <div className="space-y-m">
                <h6 className="flex items-center gap-1">
                  <TextFormatIcon className="text-text-tertiary" />
                  修改詳情
                </h6>
                <textarea
                  className={textareaStyle}
                  name=""
                  id=""
                  placeholder="請詳細描述您希望調整的地方及期望結果"
                />
              </div>
            </form>
            <Instructions
              title="重要提醒"
              icon={<TriangleExclamationIcon />}
              wordings={INSTRUCTIONS_INFO}
              isDot
            />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline" intent="secondary">
              取消
            </Button>
            <Button>送出修改請求</Button>
          </CardFooter>
        </Card>
      </PageMain>
    </>
  )
}
