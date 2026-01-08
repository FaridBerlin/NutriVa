export default function Card({
  children,
  className = '',
  noHover = false,
  ...props
}) {
  const baseArray = [
    'nv-card',
    'dark:border-accentYellow/60',
    'dark:text-textDark',
    'rounded-xl',
    'border',
    'border-gray-100',
    'shadow-sm',
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
  }

  if (noHover) {
    baseArray.push('nv-no-hover')
  }

  baseArray.push(
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary/30',
  )

  const base = baseArray.join(' ')
  const mergedStyle = {
    backgroundColor: 'var(--nv-card-bg)',
    color: undefined, // keep text color controlled by classes unless overridden
    ...(props.style || {}),
  }

  const { style: _s, ...restProps } = props

  return (
    <div
      {...restProps}
      style={mergedStyle}
      className={`${base} ${className}`.trim()}
      role={props.role ?? 'group'}
      tabIndex={props.tabIndex ?? 0}
    >
      {children}
    </div>
  )
}
