import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '', full = false }) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const Icon = theme === 'dark' ? Sun : Moon

  if (full) {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`${className}`}
      >
        <span className="flex-none w-5">
          <Icon size={18} className="transition-transform duration-200 group-hover:scale-110 text-black dark:text-accentYellow" />
        </span>
        <span className="font-semibold flex-1">Theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${className}`}
    >
      <Icon size={18} className={theme === 'dark' ? 'text-yellow-400' : 'text-gray-700'} />
    </button>
  )
}
