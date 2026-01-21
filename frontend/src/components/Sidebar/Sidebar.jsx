import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-sm font-display text-base lg:text-lg leading-6">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center px-3 py-3 border-b border-gray-100">
          <Link to="/">
            <NutrivaLogo size="md" />
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-gray-700 hover:bg-primary/5 hover:text-primary hover:translate-x-1 hover:shadow-sm'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`}
                  />
                  <span className="font-semibold flex-1">{item.label}</span>

                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.badgeColor === 'green'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            )
          })}

          {/* Separator */}
          <li className="pt-2 border-t border-gray-200"></li>

          {/* AI Diet Planner with Ollama */}
          <li>
            <button
              onClick={() => handleMenuItemClick('ai-diet-planner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 mt-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group ${
                activeSection === 'ai-diet-planner'
                  ? 'ring-2 ring-purple-400 shadow-md'
                  : ''
              }`}
            >
              <Wand2
                size={18}
                className="text-purple-600 transition-transform duration-200 group-hover:rotate-12"
              />
              <span className="font-semibold text-purple-900 flex-1">
                AI Diet Planner
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-600 text-white font-semibold">
                AI
              </span>
            </button>
          </li>

          {/* AI Meal Plans List */}
          <li>
            <button
              onClick={() => handleMenuItemClick('ai-meal-plans')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 hover:translate-x-1 group ${
                activeSection === 'ai-meal-plans'
                  ? 'bg-purple-100 text-green-900 shadow-sm'
                  : 'text-green-900 hover:bg-purple-50'
              }`}
            >
              <List
                size={18}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-semibold text-green-700 flex-1">
                AI Meal Plans
              </span>
            </button>
          </li>

          {/* Separator */}
          <li className="pt-2 border-t border-gray-200"></li>

          {/* Diet Tracker */}
          <li>
            <Link
              to="/diet-tracker"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:translate-x-1 group bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-lg"
            >
              <Target
                size={18}
                className="text-green-600 transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-semibold text-green-900 flex-1">
                Diet Tracker
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-600 text-white font-semibold">
                Track
              </span>
            </Link>
          </li>
        </ul>

        {/* Logout & Navigation */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-2">
          {/* Back to Home */}
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
          >
            <Home
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-semibold"> Home Page</span>
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:translate-x-1 transition-all duration-200 group"
          >
            <Settings
              size={18}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            <span className="font-semibold">Settings</span>
          </Link>

          {/* Theme toggle (above logout) */}
          <div className="px-4 py-2">
            <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:translate-x-1 transition-all duration-200 group">
              <ThemeToggle className="transition-transform duration-200 group-hover:scale-110" />
              <span className="text-sm font-semibold">Theme</span>
            </div>
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link to="/">
                <NutrivaLogo />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
            </div>

            {/* replicate menu content inside drawer */}
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        handleMenuItemClick(item.id)
                        setMobileOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                        isActive
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-gray-700 hover:bg-primary/5 hover:text-primary hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <Icon size={18} className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`} />
                      <span className="font-semibold flex-1">{item.label}</span>
                    </button>
                  </li>
                )
              })}

              <li className="pt-2 border-t border-gray-200"></li>

              <li>
                <button
                  onClick={() => {
                    handleMenuItemClick('ai-diet-planner')
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 mt-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group ${
                    activeSection === 'ai-diet-planner' ? 'ring-2 ring-purple-400 shadow-md' : ''
                  }`}
                >
                  <Wand2 size={18} className="text-purple-600 transition-transform duration-200 group-hover:rotate-12" />
                  <span className="font-semibold text-purple-900 flex-1">AI Diet Planner</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-600 text-white font-semibold">AI</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleMenuItemClick('ai-meal-plans')
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 hover:translate-x-1 group ${
                    activeSection === 'ai-meal-plans' ? 'bg-purple-100 text-green-900 shadow-sm' : 'text-green-900 hover:bg-purple-50'
                  }`}
                >
                  <List size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold text-green-700 flex-1">AI Meal Plans</span>
                </button>
              </li>

              <li className="pt-2 border-t border-gray-200"></li>

              <li>
                <Link to="/diet-tracker" onClick={() => setMobileOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:translate-x-1 group bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:shadow-lg">
                  <Target size={18} className="text-green-600 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold text-green-900 flex-1">Diet Tracker</span>
                </Link>
              </li>

              <li className="pt-2 border-t border-gray-200 mt-4"></li>

              <li>
                <Link to="/" onClick={() => setMobileOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group">
                  <Home size={18} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-semibold"> Home Page</span>
                </Link>
              </li>

              <li>
                <Link to="/settings" onClick={() => setMobileOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:translate-x-1 transition-all duration-200 group">
                  <Settings size={18} className="transition-transform duration-200 group-hover:rotate-90" />
                  <span className="font-semibold">Settings</span>
                </Link>
              </li>

              <li className="mt-4">
                <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg">
                  <ThemeToggle />
                  <span className="text-sm font-semibold">Theme</span>
                </div>
              </li>

              <li className="mt-2">
                <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 hover:translate-x-1 transition-all duration-200 group">
                  <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
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
