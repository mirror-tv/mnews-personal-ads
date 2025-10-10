import { useState } from 'react'

import DoneWithCircleIcon from '@/assets/icons/done-with-circle.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import UploadIcon from '@/assets/icons/upload.svg?react'
import { Button } from '@/components/ui/button'
import { type OrderRecord } from '@/lib/mockData'
import { ORDER_STATUS } from '@/lib/status/orderStatus'

type OrderActionsProps = {
  order: OrderRecord
  className?: string
}

export function OrderActions({ order, className = '' }: OrderActionsProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const handleUploadClick = async () => {
    if (isUploading) return

    setIsUploading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      alert('上傳完成，進入下一個階段')
      // 可以 trigger parent component 的 cb 來更新訂單狀態
      // onStatusChange?.('material_uploaded')
    } catch (error) {
      console.error('上傳失敗:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleConfirmClick = async () => {
    if (isConfirming) return

    setIsConfirming(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      alert('確認完成，進入下一個階段')
      // 可以 trigger parent component 的 cb 來更新訂單狀態
      // onStatusChange?.('pending_schedule')
    } catch (error) {
      console.error('確認失敗:', error)
    } finally {
      setIsConfirming(false)
    }
  }

  const handleSettingScheduleClick = () => {
    alert('進入排定日程頁面')
    // 跳轉到排播頁面
  }

  const handleModifyClick = () => {
    alert('進入修改頁面，俊昕交給你了')
    // 跳轉到修改頁面
  }

  const styles = {
    container: 'rounded-lg border border-gray-3 bg-white p-6',
    title: 'text-h4 mb-4 font-semibold text-text-primary',
    buttonContainer: 'space-y-3',
    primaryButton: 'bg-blue-6 text-white hover:bg-blue-7',
    secondaryButton: 'border-gray-3 text-text-secondary hover:bg-gray-1',
    statusMessage:
      'font-sans text-sm leading-normal font-normal text-text-secondary',
    helpContainer:
      'flex w-full items-start self-stretch rounded-[10px] border border-[var(--color-border-default)] border-gray-3 bg-[var(--color-surface-tertiary)] p-[13px] font-sans text-sm font-medium text-text-secondary',
    helpText: 'min-w-fit',
    helpLink:
      'text-caption1 font-medium text-text-secondary underline hover:text-text-primary',
  }

  const getActionContent = () => {
    switch (order.status) {
      case ORDER_STATUS.PENDING_UPLOAD:
        return {
          buttonText: '上傳素材',
          buttonIcon: <UploadIcon />,
          buttonClassName: 'bg-blue-6 text-white hover:bg-blue-7',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: null,
        }
      case ORDER_STATUS.MATERIAL_UPLOADED:
      case ORDER_STATUS.VIDEO_PRODUCTION:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '請等待業務確認素材，如沒問題便會繼續製作影片。',
        }
      case ORDER_STATUS.PENDING_SCHEDULE:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '排播時間已設定，正在等待廣告播出。',
        }
      case ORDER_STATUS.BROADCASTED:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '廣告已成功播出。',
        }
      case ORDER_STATUS.PENDING_BROADCAST_DATE:
        return {
          buttonText: '設定排播日期',
          buttonIcon: <EditIcon />,
          buttonClassName: styles.primaryButton,
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: null,
        }
      case ORDER_STATUS.PENDING_CONFIRMATION:
        return {
          buttonText: '確認',
          buttonIcon: <DoneWithCircleIcon />,
          buttonClassName: styles.primaryButton,
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: null,
          secondaryButton: {
            text: '提出修改',
            icon: <EditIcon />,
            className: styles.secondaryButton,
          },
        }
      case ORDER_STATUS.CANCELLED:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '本訂單已作廢。',
        }
      case ORDER_STATUS.TRANSFERRED:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '此訂單已轉移至新訂單，請到新訂單進行操作。',
        }
      case ORDER_STATUS.PENDING_QUOTE_CONFIRMATION:
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '請至信箱確認修改報價並完成付款，以繼續製作廣告。',
        }
      default:
        return {
          buttonText: '上傳素材',
          buttonIcon: <UploadIcon />,
          buttonClassName: styles.primaryButton,
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: null,
        }
    }
  }

  const actionContent = getActionContent()

  return (
    <section className={`${styles.container} ${className}`}>
      <h5 className={styles.title}>訂單操作</h5>
      <div className={styles.buttonContainer}>
        {actionContent.buttonText && (
          <Button
            size="sm"
            className={actionContent.buttonClassName}
            variant="blue"
            onClick={
              actionContent.buttonText === '上傳素材'
                ? handleUploadClick
                : actionContent.buttonText === '確認'
                  ? handleConfirmClick
                  : actionContent.buttonText === '設定排播日期'
                    ? handleSettingScheduleClick
                    : undefined
            }
            disabled={isUploading || isConfirming}
          >
            {actionContent.buttonIcon}
            {isUploading && actionContent.buttonText === '上傳素材'
              ? '上傳中...'
              : isConfirming && actionContent.buttonText === '確認'
                ? '確認中...'
                : actionContent.buttonText}
          </Button>
        )}
        {actionContent.secondaryButton && (
          <Button
            size="sm"
            variant="outline"
            className={`${actionContent.secondaryButton.className} ml-2`}
            onClick={
              actionContent.secondaryButton.text === '提出修改'
                ? handleModifyClick
                : undefined
            }
            disabled={false}
          >
            {actionContent.secondaryButton.icon}
            {actionContent.secondaryButton.text}
          </Button>
        )}
        {actionContent.statusMessage && (
          <p className={styles.statusMessage}>{actionContent.statusMessage}</p>
        )}
        <div className={styles.helpContainer}>
          <h6 className={styles.helpText}>{actionContent.helpText}</h6>
          {actionContent.helpLinkText && (
            <a
              className={styles.helpLink}
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              {actionContent.helpLinkText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
