import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  iconClassName?: string
  /** Show a text label next to the icon */
  full?: boolean
}

export default function ThemeToggle({
  className = '',
  iconClassName = '',
  full = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  const Icon = theme === 'dark' ? Sun : Moon

  if (full) {
    const appliedIconClass =
      iconClassName || (theme === 'dark' ? 'text-yellow-400' : 'text-gray-700')

    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <span className="flex-none w-5">
          <Icon
            size={18}
            className={`${appliedIconClass} transition-transform duration-200 group-hover:scale-110`}
          />
        </span>
        <span className="font-semibold">
          {theme === 'dark' ? 'Dark mode' : 'Light mode'}
        </span>
      </button>
    )
  }

  const appliedIconClass =
    iconClassName || (theme === 'dark' ? 'text-yellow-400' : 'text-gray-700')

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-hidden ${className}`}
    >
      <Icon size={18} className={appliedIconClass} />
    </button>
  )
}
