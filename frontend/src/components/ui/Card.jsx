export default function Card({ children, className = '', noHover = false }) {
  const baseArray = [
    'bg-white',
    'nv-card',
    'dark:bg-accentYellow/10',
    'dark:border-accentYellow/30',
    'rounded-xl',
    'p-4',
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

  return (
    <div className={`${base} ${className}`.trim()} role="group" tabIndex={0}>
      {children}
    </div>
  )
}
