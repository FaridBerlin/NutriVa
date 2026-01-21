import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none disabled:opacity-50'

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const variants = {
    primary:
      'text-white bg-gradient-to-br from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 focus:ring-4 focus:ring-green-200 shadow-md',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
    link: 'bg-transparent text-primary underline-offset-2 hover:underline',
    secondary: 'text-emerald-900 bg-emerald-200 hover:bg-emerald-300 focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-md shadow-sm',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 shadow-sm',
  }

  const btnClass = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={btnClass} onClick={onClick} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={btnClass} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
