import { type ComponentType, type ReactNode } from 'react'

import ArrowBackIcon from '@/assets/icons/arrow-back.svg?react'

type PageHeaderProps = {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
  variant?: 'default' | 'centered'
  logo?: {
    src: string | ReactNode | ComponentType<{ width?: number; height?: number }>
    alt: string
    width?: number
    height?: number
  }
}

export function PageHeader({
  title,
  showBackButton = false,
  onBack,
  variant = 'default',
  logo,
}: PageHeaderProps) {
  const isCentered = variant === 'centered'

  return (
    <header
      className={`flex items-center bg-surface-primary px-5 py-4 shadow-sm md:px-15 ${
        isCentered && 'h-[64px] items-center justify-center'
      }`}
    >
      <div
        className={`m-auto flex w-full max-w-[980px] ${
          isCentered && 'items-center justify-center gap-5'
        }`}
      >
        {showBackButton && !isCentered && (
          <button
            onClick={onBack}
            className="mr-3 flex h-8 w-8 items-center justify-center bg-transparent transition-colors hover:text-text-secondary focus:text-text-tertiary focus:outline-none"
          >
            <ArrowBackIcon className="h-5 w-5" />
          </button>
        )}

        {logo && isCentered ? (
          <a href="/">
            {typeof logo.src === 'string' ? (
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 144}
                height={logo.height || 36}
              />
            ) : typeof logo.src === 'function' ? (
              <logo.src width={logo.width || 144} height={logo.height || 36} />
            ) : (
              logo.src
            )}
          </a>
        ) : (
          <p className="text-base font-medium text-text-primary md:text-xl">
            {title || ''}
          </p>
        )}
      </div>
    </header>
  )
}
