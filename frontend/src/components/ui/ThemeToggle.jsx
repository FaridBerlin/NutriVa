import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${className}`}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}
