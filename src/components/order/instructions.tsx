import { ORDER_STATUS } from '@/lib/status/orderStatus'

type InstructionsProps = {
  className?: string
  status?: string
}

export function Instructions({ className = '', status }: InstructionsProps) {
  // 樣式常數
  const styles = {
    container:
      'flex flex-col items-start gap-1 self-stretch rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-4',
    title: 'font-sans text-sm leading-normal font-medium text-[#A16207]',
    list: 'space-y-2 font-sans text-sm leading-normal font-normal text-[#D97706]',
    listItem: 'flex items-start gap-2',
    dot: 'mt-2 size-1 rounded-full bg-[#D97706]',
  }

  const getInstructionsContent = () => {
    if (status === ORDER_STATUS.PENDING_BROADCAST_DATE) {
      return (
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span>
              由於您未在 9/21 23:59 前完成確認，原始排播日期已作廢，請重新設定
            </span>
          </li>
        </ul>
      )
    }

    return (
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.dot}></span>
          <span>
            確認無誤，請於9/21 23:59前，於下方訂單操作區點選「確認」按鈕
          </span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}></span>
          <span>如需修改，請點選「提出修改」按鈕</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}></span>
          <span>
            若操作未在9/21 23:59前完成，原始排播日期將會作廢，需重新設定
          </span>
        </li>
      </ul>
    )
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <h6 className={styles.title}>說明</h6>
      {getInstructionsContent()}
    </div>
  )
}
