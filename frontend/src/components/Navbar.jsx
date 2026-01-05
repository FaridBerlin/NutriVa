import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import ThemeToggle from './ui/ThemeToggle'
import NutrivaLogo from './NutrivaLogo'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
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

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/30 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-1">
        <Link to="/" className="flex items-center space-x-3">
          <NutrivaLogo />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
          <ThemeToggle className="mr-2" />
          {user ? (
            <>
              {/* User Avatar Button & profile image */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-200 hover:ring-4 hover:ring-gray-200 transition-all duration-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-sm ring-2 ring-gray-300">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl animate-fade-in dark:bg-slate-900 dark:border-slate-700">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <span className="block text-sm font-semibold text-textDark dark:text-accentYellow">
                        {user.name}
                      </span>
                      <span className="block text-sm text-textLight truncate dark:text-accentYellow/80">
                        {user.email}
                      </span>
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
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200 font-medium dark:text-accentYellow dark:hover:bg-slate-800 dark:hover:text-accentYellow/95"
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-textLight rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Navigation Links - Only show Sign In/Sign Up for non-logged in users */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 md:flex-row md:space-x-6 md:mt-0">
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-textDark rounded hover:text-primary transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 px-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-all duration-300 md:inline-block"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
