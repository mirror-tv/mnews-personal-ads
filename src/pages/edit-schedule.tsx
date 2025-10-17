import { useState } from 'react'

import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale/zh-TW'

import type { DateRange } from 'react-day-picker'

import CalendarIcon from '@/assets/icons/calendar.svg?react'
import TriangleExclamationIcon from '@/assets/icons/triangle-exclamation.svg?react'
import { EditPageLayout } from '@/components/edit/edit-page-layout'
import { Instructions } from '@/components/shared/instructions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils'

export default function EditSchedule() {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const dateFormat = 'yyyy/M/d'

  const CalendarText =
    range?.from && range?.to ? (
      <>
        <span>{format(range.from, dateFormat, { locale: zhTW })}</span>
        <span>-</span>
        <span>{format(range.to, dateFormat, { locale: zhTW })}</span>
      </>
    ) : (
      <>
        <span>年 / 月 / 日</span>
        <span>-</span>
        <span>年 / 月 / 日</span>
      </>
    )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!range?.from || !range?.to) {
      alert('請選擇完整的排播起訖日期')
      return
    }

    const formattedRange = {
      from: format(range.from, 'yyyy-MM-dd'),
      to: format(range.to, 'yyyy-MM-dd'),
    }

    console.log('Submitted schedule:', formattedRange)
  }

  return (
    <EditPageLayout
      title="提出修改"
      onSubmit={handleSubmit}
      submitButtonName="送出"
      cardTitle="重新設定排播日期"
    >
      <div className="space-y-m">
        <h6 className="flex items-center gap-1">
          <CalendarIcon className="text-text-tertiary" />
          排播日期
        </h6>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2 bg-gray-2 tracking-widest md:w-[360px] md:gap-3'
              )}
            >
              {CalendarText}
              <CalendarIcon className="ml-auto text-text-tertiary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="range" selected={range} onSelect={setRange} />
          </PopoverContent>
        </Popover>
      </div>
      <Instructions
        title="重要提醒"
        icon={<TriangleExclamationIcon />}
        wordings={[
          '設定新的排播日期後，業務會重新寄送規格書給您，請記得至後台確認。',
        ]}
      />
    </EditPageLayout>
  )
}
