import React, { useState, useRef, useEffect, useCallback } from 'react'

type RadixInspiredOTPProps = {
  length?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onAutoSubmit?: (value: string) => void
  autoSubmit?: boolean
  disabled?: boolean
  readOnly?: boolean
  type?: 'text' | 'password'
  validationType?: 'numeric' | 'alpha' | 'alphanumeric' | 'none'
  className?: string
  name?: string
}

type OTPInputProps = {
  index: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  type?: 'text' | 'password'
  validationType?: 'numeric' | 'alpha' | 'alphanumeric' | 'none'
  maxLength?: number
}

function OTPInput({
  index,
  value,
  onChange,
  disabled,
  readOnly,
  type,
  validationType,
  maxLength = 1,
}: OTPInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    if (validationType === 'numeric') {
      inputValue = inputValue.replace(/[^0-9]/g, '')
    } else if (validationType === 'alpha') {
      inputValue = inputValue.replace(/[^a-zA-Z]/g, '')
    } else if (validationType === 'alphanumeric') {
      inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '')
    }

    onChange(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return

    if (e.key === 'Backspace' && value === '' && index > 0) {
      const previousInput = inputRef.current?.parentElement?.children[
        index - 1
      ] as HTMLInputElement
      previousInput?.focus()
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    onChange(pastedData)
  }

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onPaste={handlePaste}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      inputMode={validationType === 'numeric' ? 'numeric' : 'text'}
      className={`disabled:cursor-not-allowedDisabled flex h-10 w-10 items-center justify-center gap-3 rounded-lg bg-gray-100 p-2 text-center font-sans text-lg font-medium text-gray-900 transition-all read-only:border-gray-200 read-only:bg-gray-50 focus:border-blue-500 focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-100 disabled:opacity-50`}
      aria-label={`驗證碼第 ${index + 1} 位`}
    />
  )
}

function HiddenInput({ name, value }: { name?: string; value: string }) {
  return (
    <input
      type="hidden"
      name={name}
      value={value}
      autoComplete="one-time-code"
    />
  )
}

export function RadixInspiredOTP({
  length = 6,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  disabled = false,
  readOnly = false,
  type = 'text',
  validationType = 'numeric',
  className = '',
  name,
}: RadixInspiredOTPProps) {
  const [value, setValue] = useState<string[]>(
    () =>
      controlledValue?.split('') ||
      defaultValue.split('') ||
      new Array(length).fill('')
  )

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue.split(''))
    }
  }, [controlledValue])

  const handleValueChange = useCallback(
    (newValue: string[]) => {
      if (!disabled && !readOnly) {
        setValue(newValue)
        onValueChange?.(newValue.join(''))
      }
    },
    [disabled, readOnly, onValueChange]
  )

  const updateChar = (index: number, char: string) => {
    const newValue = [...value]
    newValue[index] = char.slice(0, 1)

    if (char.length > 1) {
      const chars = char.slice(0, length)
      for (let i = 0; i < chars.length && i < length; i++) {
        newValue[i] = chars[i] || ''
      }
    }

    handleValueChange(newValue)

    if (char.length === 1 && index < length - 1) {
      setTimeout(() => {
        const nextInput = containerRef.current?.children[
          index + 1
        ] as HTMLInputElement
        nextInput?.focus()
      }, 0)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const cleanData = pastedData.replace(/\s/g, '').slice(0, length)

    const newValue = new Array(length).fill('')
    for (let i = 0; i < cleanData.length; i++) {
      newValue[i] = cleanData[i]
    }

    handleValueChange(newValue)

    setTimeout(() => {
      const lastInput = containerRef.current?.children[
        cleanData.length - 1
      ] as HTMLInputElement
      lastInput?.focus()
    }, 0)
  }

  // Auto-submit functionality disabled per user request
  // useEffect(() => {
  //   const currentValue = value.join('')
  //   if (
  //     autoSubmit &&
  //     currentValue.length === length &&
  //     currentValue.length > 0
  //   ) {
  //     onAutoSubmit?.(currentValue)
  //   }
  // }, [value, length, autoSubmit, onAutoSubmit])

  return (
    <div
      ref={containerRef}
      role="group"
      className={`flex items-start justify-center gap-1 self-stretch ${className}`}
      style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      onPaste={handlePaste}
    >
      {Array.from({ length }, (_, index) => (
        <OTPInput
          key={index}
          index={index}
          value={value[index] || ''}
          onChange={(char) => updateChar(index, char)}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          validationType={validationType}
        />
      ))}
      <HiddenInput name={name} value={value.join('')} />
    </div>
  )
}

export default RadixInspiredOTP
