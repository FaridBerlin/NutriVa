export default function Card({ children, className = '' }) {
  const base = [
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
    'hover:shadow-2xl',
    'hover:-translate-y-1',
    'hover:scale-105',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary/30',
  ].join(' ')

  return (
    <div className={`${base} ${className}`.trim()} role="group" tabIndex={0}>
      {children}
    </div>
  )
}
