import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  noHover?: boolean
}

export default function Card({
  children,
  className = '',
  noHover = false,
  style,
  role,
  tabIndex,
  ...restProps
}: CardProps) {
  const baseArray = [
    'nv-card',
    'dark:border-accentYellow/60',
    'dark:text-textDark',
    'rounded-xl',
    'border',
    'border-gray-100',
    'shadow-xs',
    'transition-transform',
    'transition-shadow',
    'duration-200',
    'ease-out',
  ]

  if (!noHover) {
    baseArray.push(
      'hover:shadow-2xl',
      'hover:-translate-y-1',
      'hover:scale-105',
    )
  } else {
    baseArray.push('nv-no-hover')
  }

  baseArray.push(
    'focus:outline-hidden',
    'focus-visible:ring-2',
    'focus-visible:ring-primary/30',
  )

  const mergedStyle = {
    backgroundColor: 'var(--nv-card-bg)',
    ...style,
  }

  return (
    <div
      {...restProps}
      style={mergedStyle}
      className={`${baseArray.join(' ')} ${className}`.trim()}
      role={role ?? 'group'}
      tabIndex={tabIndex ?? 0}
    >
      {children}
    </div>
  )
}
