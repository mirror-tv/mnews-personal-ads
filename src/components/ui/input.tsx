import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type InputProps = ComponentProps<'input'> & {
  error?: string
  errorMessage?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, icon, ...props }, ref) => {
    const inputElement = (
      <div className="relative">
        <input
          type={type}
          ref={ref}
          data-slot="input"
          className={cn(
            // Base styles
            'h-9 w-full min-w-0 rounded-md py-1 text-base transition-[color,box-shadow] outline-none',
            'text-gray-900 placeholder:text-gray-500',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'md:text-sm dark:bg-input/30',
            // Padding based on icon presence
            icon ? 'pr-3 pl-10' : 'px-3',
            // Background - common to all states
            'bg-gray-100',
            // Border states
            !error && [
              'border-0',
              'hover:border hover:border-gray-800',
              'focus:border focus:border-gray-500',
            ],
            error && ['border border-red-600', 'focus:border-red-600'],
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>
        )}
      </div>
    )

    if (error && errorMessage) {
      return (
        <div className="flex flex-col gap-1">
          {inputElement}
          <div className="text-sm text-red-500">{errorMessage}</div>
        </div>
      )
    }

    return inputElement
  }
)

Input.displayName = 'Input'

export { Input }
