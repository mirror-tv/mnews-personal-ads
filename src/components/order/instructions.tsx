type InstructionsProps = {
  className?: string
}

export function Instructions({ className = '' }: InstructionsProps) {
  // 重複的樣式常數
  const textStyles = 'font-sans text-sm leading-normal'
  const dotStyles = 'mt-2 size-1 rounded-full bg-[#D97706]'

  return (
    <div
      className={`flex flex-col items-start gap-1 self-stretch rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-4 ${className}`}
    >
      <h6 className={`${textStyles} font-medium text-[#A16207]`}>說明</h6>
      <ul className={`space-y-2 ${textStyles} font-normal text-[#D97706]`}>
        <li className="flex items-start gap-2">
          <span className={dotStyles}></span>
          <span>
            確認無誤，請於9/21 23:59前，於下方訂單操作區點選「確認」按鈕
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className={dotStyles}></span>
          <span>如需修改，請點選「提出修改」按鈕</span>
        </li>
        <li className="flex items-start gap-2">
          <span className={dotStyles}></span>
          <span>
            若操作未在9/21 23:59前完成，原始排播日期將會作廢，需重新設定
          </span>
        </li>
      </ul>
    </div>
  )
}
