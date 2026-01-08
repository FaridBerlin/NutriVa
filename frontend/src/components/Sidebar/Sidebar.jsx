import { useContext } from 'react'
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
} from 'lucide-react'

export default function Sidebar({ activeSection, onSectionChange }) {
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
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
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
                  <span className="font-medium flex-1">{item.label}</span>

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
              <span className="font-medium text-green-700 flex-1">
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
            <span className="font-medium"> Home Page</span>
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
            <span className="font-medium">Settings</span>
          </Link>

          {/* Theme toggle (above logout) */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <span className="text-sm text-gray-600">Theme</span>
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
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
