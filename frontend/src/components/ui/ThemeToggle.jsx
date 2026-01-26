import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({
  className = '',
  iconClassName = '',
  full = false,
}) {
  const { theme, toggleTheme } = useContext(ThemeContext)

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
      className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${className}`}
    >
      <Icon size={18} className={appliedIconClass} />
    </button>
  )
}
