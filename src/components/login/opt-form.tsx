import { Button } from '@/components/ui/button'
import RadixInspiredOTP from '@/components/ui/radix-inspired-otp'

type OptFormProps = {
  email: string
  phone: string
  error: string
  isLoading: boolean
  countdown: number
  canResend: boolean
  handleOtpSubmit: (value?: string) => void
  handleResendOtp: () => void
}

export default function OptForm({
  error,
  isLoading,
  countdown,
  canResend,
  handleOtpSubmit,
  handleResendOtp,
}: OptFormProps) {
  return (
    <>
      <h3 className="text-center font-sans text-xl leading-normal font-medium text-gray-900">
        輸入驗證碼
      </h3>
      <p className="text-center font-sans text-sm leading-normal font-normal text-gray-500">
        請輸入電子信箱／手機號碼收到的六位數驗證碼
      </p>

      <div className="mt-4 flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="otp"
            className="font-sans text-sm leading-normal font-medium text-gray-900"
          >
            驗證碼
          </label>
          <RadixInspiredOTP
            length={6}
            validationType="numeric"
            className="gap-1"
            name="otp"
            error={error}
            errorMessage={error}
          />
        </div>

        <Button
          type="button"
          onClick={() => handleOtpSubmit()}
          disabled={isLoading}
          style={{ backgroundColor: '#004DBC' }}
          className="h-10 w-full rounded-lg px-2 py-2 font-sans text-base leading-normal font-medium text-white focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '驗證中...' : '登入'}
        </Button>

        <div className="flex items-center justify-center text-sm">
          <span className="font-sans text-sm leading-normal font-medium text-gray-500">
            沒收到驗證碼？
          </span>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isLoading}
            className={`font-sans text-sm leading-normal font-medium underline transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
              canResend && !isLoading
                ? 'text-gray-500 hover:text-gray-900 focus:text-gray-400'
                : 'text-gray-500'
            } `}
          >
            重新發送{canResend ? '' : `(${countdown}s)`}
          </button>
        </div>
      </div>
    </>
  )
}
