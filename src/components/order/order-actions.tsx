import DoneWithCircleIcon from '@/assets/icons/done-with-circle.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import UploadIcon from '@/assets/icons/upload.svg?react'
import { Button } from '@/components/ui/button'
import { type OrderRecord } from '@/lib/mockData'

type OrderActionsProps = {
  order: OrderRecord
  className?: string
}

export function OrderActions({ order, className = '' }: OrderActionsProps) {
  // 樣式常數
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

  // 根據訂單狀態決定顯示內容
  const getActionContent = () => {
    switch (order.status) {
      case 'pending_upload':
        return {
          buttonText: '上傳素材',
          buttonIcon: <UploadIcon />,
          buttonClassName: 'bg-blue-6 text-white hover:bg-blue-7',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: null,
        }
      case 'material_uploaded':
      case 'video_production':
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '請等待業務確認素材，如沒問題便會繼續製作影片。',
        }
      case 'pending_schedule':
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '排播時間已設定，正在等待廣告播出。',
        }
      case 'broadcasted':
        return {
          buttonText: null,
          buttonIcon: null,
          buttonClassName: '',
          helpText: '需要協助？',
          helpLinkText: '申請退款',
          statusMessage: '廣告已成功播出。',
        }
      case 'pending_confirmation':
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
          >
            {actionContent.buttonIcon}
            {actionContent.buttonText}
          </Button>
        )}
        {actionContent.secondaryButton && (
          <Button
            size="sm"
            variant="outline"
            className={`${actionContent.secondaryButton.className} ml-2`}
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
