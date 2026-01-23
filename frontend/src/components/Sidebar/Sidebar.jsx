import { useContext, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import NutrivaLogo from '../NutrivaLogo'
import ThemeToggle from '../ui/ThemeToggle'
// Icon imports from lucide-react
import {
  LayoutDashboard,
  Wand2,
  LogOut,
  Settings,
  Home,
  List,
  Target,
  Menu,
  X,
} from 'lucide-react'

export default function Sidebar({ activeSection, onSectionChange }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  // Add My Meal Planner to the sidebar
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ]
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Handle menu item clicks - navigate to dashboard if onSectionChange not provided
  const handleMenuItemClick = (itemId) => {
    if (onSectionChange) {
      onSectionChange(itemId)
    } else {
      // Standalone page - navigate to dashboard with section state
      navigate('/dashboard', { state: { section: itemId } })
    }
  }

  // Derive active section from path when not provided
  const deriveSectionFromPath = (path) => {
    if (!path) return null
    if (path === '/' || path === '/home') return 'dashboard'
    if (path.startsWith('/dashboard')) return 'dashboard'
    if (path.startsWith('/settings')) return 'settings'
    if (path.startsWith('/diet-tracker')) return 'diet-tracker'
    if (path.startsWith('/ai-meal-plans')) return 'ai-meal-plans'
    if (path.startsWith('/ai-diet-planner') || path.startsWith('/ai-diet'))
      return 'ai-diet-planner'
    if (path.startsWith('/profile')) return 'profile'
    // fallback: return null
    return null
  }

  const resolvedActive =
    activeSection || deriveSectionFromPath(location.pathname)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      </button>

      {/* Desktop sidebar (convex / raised appearance) */}
      <aside className="nv-sidebar hidden lg:block fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900/95 border-r border-gray-100 dark:border-slate-800 shadow-2xl rounded-r-2xl ring-1 ring-gray-100 dark:ring-slate-700/10 backdrop-blur-sm font-display text-base lg:text-lg leading-6">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center px-3 py-3 border-b border-gray-100">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <NutrivaLogo size="md" />
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = resolvedActive === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-gray-200 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-slate-700/30'
                        : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`}
                    />
                    <span className="font-semibold text-black dark:text-accentYellow flex-1">
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          item.badgeColor === 'green'
                            ? 'bg-green-100 text-black dark:bg-slate-700 dark:text-white'
                            : 'bg-orange-100 text-orange-700 dark:bg-slate-700 dark:text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}

            {/* AI Diet Planner with Ollama (light-mode unified background + hover) */}
            <li>
              <button
                onClick={() => handleMenuItemClick('ai-diet-planner')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  resolvedActive === 'ai-diet-planner'
                    ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-gray-200 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-slate-700/30'
                    : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                }`}
              >
                <Wand2
                  size={18}
                  className="text-black dark:text-accentYellow transition-transform duration-200 group-hover:rotate-12"
                />
                <span className="font-semibold text-black dark:text-accentYellow flex-1">
                  AI Diet Planner
                </span>
              </button>
            </li>

            {/* AI Meal Plans List */}
            <li>
              <button
                onClick={() => handleMenuItemClick('ai-meal-plans')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                  resolvedActive === 'ai-meal-plans'
                    ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-gray-200 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-slate-700/30'
                    : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                }`}
              >
                <List
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110 dark:text-accentYellow"
                />
                <span className="font-semibold text-black dark:text-accentYellow flex-1">
                  AI Meal Plans
                </span>
              </button>
            </li>

            {/* Separator removed for cleaner look */}

            {/* Diet Tracker (light-mode unified background + hover) */}
            <li>
              <Link
                to="/diet-tracker"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  /* active handled via pathname/activeSection externally */
                  resolvedActive === 'diet-tracker'
                    ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-primary/30 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-accentYellow/30'
                    : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                }`}
              >
                <Target
                  size={18}
                  className="text-black dark:text-accentYellow transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-semibold text-black dark:text-accentYellow flex-1">
                  Diet Tracker
                </span>
              </Link>
            </li>
          </ul>

          {/* Logout & Navigation */}
          <div className="px-4 py-4 space-y-2">
            {/* Back to Home */}
            <Link
              to="/"
              className={`w-full flex items-center gap-3 px-4 py-3 text-black dark:text-accentYellow rounded-lg transition-all duration-200 group ${
                resolvedActive === 'dashboard'
                  ? 'bg-primary/10 text-black shadow-sm dark:bg-slate-800/60 dark:backdrop-blur-md dark:text-accentYellow'
                  : 'hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:hover:text-accentYellow'
              }`}
            >
              <Home
                size={18}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-semibold text-black dark:text-accentYellow">
                {' '}
                Home Page
              </span>
            </Link>

            {/* Settings */}
            <Link
              to="/settings"
              className={`w-full flex items-center gap-3 px-4 py-3 text-black dark:text-accentYellow rounded-lg transition-all duration-200 group ${
                resolvedActive === 'settings'
                  ? 'bg-primary/10 text-black shadow-sm dark:bg-slate-800/60 dark:backdrop-blur-md dark:text-accentYellow'
                  : 'hover:bg-gray-100 hover:text-gray-800 dark:hover:text-accentYellow hover:translate-x-1 hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              <Settings
                size={18}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
              <span className="font-semibold text-black dark:text-accentYellow">
                Settings
              </span>
            </Link>

            {/* Theme toggle (above logout) - full button */}
            <div className="py-2">
              <ThemeToggle
                full
                className="w-full flex items-center gap-1 px-4 py-3 text-black dark:text-accentYellow rounded-lg hover:bg-gray-100 hover:text-gray-800 dark:hover:text-accentYellow hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
              />
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 hover:translate-x-1 transition-all duration-200 group"
            >
              <LogOut
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="nv-sidebar absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900/95 border-r border-gray-100 dark:border-slate-800 shadow-2xl rounded-r-2xl ring-1 ring-gray-100 dark:ring-slate-700/10 p-4 overflow-y-auto font-display backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Link to="/">
                <NutrivaLogo />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5 text-black dark:text-gray-200" />
              </button>
            </div>

            {/* replicate menu content inside drawer */}
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = resolvedActive === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        handleMenuItemClick(item.id)
                        setMobileOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                        isActive
                          ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-gray-200 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-slate-700/30'
                          : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02]'
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`}
                      />
                      <span className="font-semibold text-black dark:text-accentYellow flex-1">
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              })}

              {/* Separator removed for cleaner look */}

              <li>
                <button
                  onClick={() => {
                    handleMenuItemClick('ai-diet-planner')
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    resolvedActive === 'ai-diet-planner'
                      ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-gray-200 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-slate-700/30'
                      : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                  }`}
                >
                  <Wand2
                    size={18}
                    className="text-black dark:text-accentYellow transition-transform duration-200 group-hover:rotate-12"
                  />
                  <span className="font-semibold text-black dark:text-accentYellow flex-1">
                    AI Diet Planner
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleMenuItemClick('ai-meal-plans')
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                    resolvedActive === 'ai-meal-plans'
                      ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-primary/30 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-accentYellow/30'
                      : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <List
                    size={18}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="font-semibold text-black dark:text-accentYellow flex-1">
                    AI Meal Plans
                  </span>
                </button>
              </li>

              {/* Separator removed for cleaner look */}

              <li>
                <Link
                  to="/diet-tracker"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    resolvedActive === 'diet-tracker'
                      ? 'bg-primary/20 text-black shadow-lg scale-[1.02] ring-1 ring-primary/30 dark:bg-slate-900/70 dark:backdrop-blur-md dark:text-accentYellow dark:ring-accentYellow/30'
                      : 'text-black hover:bg-primary/5 hover:text-black hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:text-accentYellow dark:hover:bg-slate-800/30'
                  }`}
                >
                  <Target
                    size={18}
                    className="text-black dark:text-accentYellow transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="font-semibold text-black dark:text-accentYellow flex-1">
                    Diet Tracker
                  </span>
                </Link>
              </li>

              {/* Separator removed for cleaner look */}

              <li>
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-black dark:text-accentYellow rounded-lg transition-all duration-200 group ${
                    resolvedActive === 'dashboard'
                      ? 'bg-primary/10 text-black shadow-sm dark:bg-slate-800/60 dark:backdrop-blur-md dark:text-accentYellow'
                      : 'hover:translate-x-1 hover:shadow-lg hover:scale-[1.02] dark:hover:text-accentYellow'
                  }`}
                >
                  <Home
                    size={18}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="font-semibold text-black dark:text-accentYellow">
                    {' '}
                    Home Page
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-black dark:text-accentYellow rounded-lg transition-all duration-200 group ${
                    resolvedActive === 'settings'
                      ? 'bg-primary/10 text-black shadow-sm dark:bg-slate-800/60 dark:backdrop-blur-md dark:text-accentYellow'
                      : 'hover:bg-gray-100 hover:text-gray-800 dark:hover:text-accentYellow hover:translate-x-1 hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  <Settings
                    size={18}
                    className="transition-transform duration-200 group-hover:rotate-90"
                  />
                  <span className="font-semibold text-black dark:text-accentYellow">
                    Settings
                  </span>
                </Link>
              </li>

              <li className="mt-4">
                <div className="w-full flex items-center gap-3 px-4 py-3 text-black dark:text-accentYellow rounded-lg">
                  <ThemeToggle className="p-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-sm font-semibold text-black dark:text-accentYellow">
                    Theme
                  </span>
                </div>
              </li>

              <li className="mt-2">
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 hover:translate-x-1 transition-all duration-200 group"
                >
                  <LogOut
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                  <span className="font-semibold">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
