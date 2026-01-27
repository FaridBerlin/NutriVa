import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
import ThemeToggle from './ui/ThemeToggle'
import Button from './ui/Button'
import NutrivaLogo from './NutrivaLogo'
import { Sun, Moon, MoonStar } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsDropdownOpen(false)
  }

  const isActive = (path) => location.pathname === path

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U'
    const names = user.name.split(' ')
    if (names.length >= 2) {
      return names[0][0] + names[1][0]
    }
    return names[0][0]
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm dark:backdrop-blur-md border-b border-white/20 dark:border-slate-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-3 h-14 md:h-16">
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <NutrivaLogo size="md" />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
          {user ? (
            <>
              {/* User Avatar Button & profile image */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-sm bg-white rounded-full focus:ring-2 focus:ring-gray-200 hover:ring-2 hover:ring-gray-200 transition-all duration-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-sm ring-1 ring-gray-300 capitalize">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl animate-fade-in dark:bg-slate-900 dark:border-slate-700">
                    {/* User Info + Theme toggle inside dropdown */}
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-textDark dark:text-accentYellow truncate">
                          {user.name}
                        </span>
                        <span className="block text-sm text-textLight truncate dark:text-accentYellow/80">
                          {user.email}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <ThemeToggle className="p-1" />
                      </div>
                    </div>

                    {/* Menu Items */}
                    <ul className="p-2 text-sm">
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-textDark hover:text-primary rounded-lg transition-all duration-200 font-medium dark:text-accentYellow dark:hover:bg-slate-800 dark:hover:text-accentYellow/95"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-textDark hover:text-primary rounded-lg transition-all duration-200 font-medium dark:text-accentYellow dark:hover:bg-slate-800 dark:hover:text-accentYellow/95"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-textDark hover:text-primary rounded-lg transition-all duration-200 font-medium dark:text-accentYellow dark:hover:bg-slate-800 dark:hover:text-accentYellow/95"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Settings
                        </Link>
                      </li>

                      {/* Divider */}
                      <li className="my-2">
                        <hr className="border-gray-200 dark:border-slate-700" />
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 font-medium dark:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : null}

          {/* Sign In / Sign Up for desktop (placed on the right) */}
          {!user && (
            <div className="hidden md:flex items-center gap-3 ml-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <MoonStar
                    size={20}
                    className="text-slate-700 dark:text-slate-300"
                  />
                )}
              </button>
              <Button to="/login" variant="ghost" size="md">
                Sign In
              </Button>
              <Button to="/signup" variant="primary" size="md">
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-1 w-9 h-9 justify-center text-sm text-gray-700 dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-700 transition-colors"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-6 py-1 space-y-1">
            {!user && (
              <>
                {/* Theme Toggle */}
                <div className="flex items-center justify-between px-3 py-1 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    {theme === 'dark' ? (
                      <Sun size={18} className="text-yellow-500" />
                    ) : (
                      <MoonStar size={18} className="text-gray-700" />
                    )}
                  </button>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 dark:border-slate-700" />

                {/* Sign In Button */}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-1 px-4 text-gray-700 dark:text-gray-300 font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-1 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primaryDark transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
