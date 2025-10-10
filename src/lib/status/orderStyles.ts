import { ORDER_STATUS } from './orderStatus'

// Order 頁面相關的樣式常數
export const ORDER_STYLES = {
  // 頁面容器
  pageContainer: 'min-h-screen w-full bg-gray-1',
  contentContainer: 'm-auto max-w-[980px]',
  innerContainer: 'container mx-auto px-4 py-8',
  layoutGrid: 'flex flex-col gap-4 xl:flex-row xl:gap-8',

  // 卡片樣式
  card: 'rounded-lg border border-gray-3 bg-white p-6',
  cardTitle: 'text-h4 mb-4 font-semibold text-text-primary',

  // 按鈕樣式
  primaryButton: 'bg-blue-6 text-white hover:bg-blue-7',
  secondaryButton: 'border-gray-3 text-text-secondary hover:bg-gray-1',

  // 文字樣式
  statusMessage:
    'font-sans text-sm leading-normal font-normal text-text-secondary',
  labelText: 'text-sm font-medium text-text-secondary',
  valueText: 'text-base font-normal text-text-primary',

  // 間距
  sectionSpacing: 'space-y-6',
  buttonSpacing: 'space-y-3',
}

// 狀態相關的常數
export const ORDER_STATUS_CONFIG = {
  PREVIEW_REQUIRED_STATUSES: [
    ORDER_STATUS.PENDING_CONFIRMATION,
    ORDER_STATUS.PENDING_SCHEDULE,
    ORDER_STATUS.BROADCASTED,
    ORDER_STATUS.MODIFICATION_REQUEST,
    ORDER_STATUS.PENDING_BROADCAST_DATE,
  ] as const,

  INSTRUCTION_REQUIRED_STATUSES: [
    ORDER_STATUS.PENDING_CONFIRMATION,
    ORDER_STATUS.PENDING_BROADCAST_DATE,
  ] as const,
}
