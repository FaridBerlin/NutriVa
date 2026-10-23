import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { Link } from 'react-router'

export type ButtonVariant =
  'primary' | 'ghost' | 'link' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface CommonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Renders a router <Link> when `to` is given … */
type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    to: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
  }

/** … otherwise a native <button>. */
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: undefined
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-linear-to-br from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 focus:ring-4 focus:ring-green-200 shadow-md',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
  link: 'bg-transparent text-primary underline-offset-2 hover:underline',
  secondary:
    'text-emerald-900 bg-emerald-200 hover:bg-emerald-300 focus:ring-4 focus:ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-md shadow-xs',
  danger:
    'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 shadow-xs',
}

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-hidden disabled:opacity-50'

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className = '' } = props
  const btnClass = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (props.to !== undefined) {
    const {
      children: _c,
      variant: _v,
      size: _s,
      className: _cn,
      to,
      ...rest
    } = props
    return (
      <Link to={to} className={btnClass} {...rest}>
        {children}
      </Link>
    )
  }

  const {
    children: _c,
    variant: _v,
    size: _s,
    className: _cn,
    to: _to,
    type = 'button',
    ...rest
  } = props
  return (
    <button type={type} className={btnClass} {...rest}>
      {children}
    </button>
  )
}
