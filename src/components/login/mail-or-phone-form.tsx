import arrow from '@/assets/icons/arrow.svg'
import mailIcon from '@/assets/icons/mail.svg'
import phoneIcon from '@/assets/icons/phone.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type MailOrPhoneFormProps = {
  status: 'email' | 'phone' | 'OPT'
  email: string
  phone: string
  setEmail: (email: string) => void
  setPhone: (phone: string) => void
  setStatus: React.Dispatch<React.SetStateAction<'email' | 'phone' | 'OPT'>>
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  error: string
}

export default function MailOrPhoneForm({
  status,
  email,
  phone,
  setEmail,
  setPhone,
  setStatus,
  handleSubmit,
  isLoading,
  error,
}: MailOrPhoneFormProps) {
  return (
    <>
      <h3 className="text-center font-sans text-xl leading-normal font-medium text-gray-900">
        鏡新聞個人廣告系統
      </h3>
      <p className="text-center font-sans text-sm leading-normal font-normal text-gray-500">
        請輸入您註冊應援科技使用的電子信箱／手機號碼
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-col gap-4">
        {status === 'email' && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email："
              className="font-sans text-sm leading-normal font-medium text-gray-900"
            >
              電子信箱
            </label>
            <div className="relative flex items-center">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sample@gmail.com"
                className="flex h-[45px] items-center gap-3 self-stretch rounded-lg bg-gray-100 p-3 pl-10 text-sm leading-normal font-normal placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus:outline-none focus-visible:ring-0"
              />
              <img
                src={mailIcon}
                alt="mail"
                width="16"
                height="16"
                className="absolute top-1/2 left-3 -translate-y-1/2"
              />
            </div>
          </div>
        )}

        {status === 'phone' && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="font-sans text-sm leading-normal font-medium text-gray-900"
            >
              手機號碼
            </label>
            <div className="relative flex items-center">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="範例：0922119187"
                className="flex h-[45px] items-center gap-3 self-stretch rounded-lg bg-gray-100 p-3 pl-10 text-sm leading-normal font-normal placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus:outline-none focus-visible:ring-0"
              />
              <img
                src={phoneIcon}
                alt="phone"
                width="16"
                height="16"
                className="absolute top-1/2 left-3 -translate-y-1/2"
              />
            </div>
          </div>
        )}

        <p
          onClick={() =>
            setStatus((prev) => (prev === 'email' ? 'phone' : 'email'))
          }
          className="flex cursor-pointer items-center text-sm leading-normal font-medium"
          style={{ color: '#004DBC' }}
        >
          使用{status === 'email' ? '手機號碼' : '電子信箱'}登入
          <img
            src={arrow}
            alt="arrow"
            width="16"
            height="17"
            className="inline"
          />
        </p>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          style={{ backgroundColor: '#004DBC' }}
          className="h-10 w-full rounded-lg px-2 py-2 text-base leading-normal font-medium text-white focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '發送中...' : '發送驗證碼'}
        </Button>
      </form>
    </>
  )
}
