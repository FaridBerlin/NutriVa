import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import NutrivaLogo from '../NutrivaLogo'
// Icon imports from lucide-react
import {
  LayoutDashboard,
  Utensils,
  Wand2,
  LogOut,
  Settings,
  Home,
  PlusCircle,
} from 'lucide-react'

export default function Sidebar({ activeSection, onSectionChange }) {
  // Add My Meal Planner to the sidebar
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'my-meal-plans',
      label: 'My Meal Plans',
      icon: Utensils,
    },
    {
      id: 'create-plan',
      label: 'Create Your Meal Plans',
      icon: PlusCircle,
    },
  ]
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  // (duplicate removed above)

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
                  onClick={() => onSectionChange(item.id)}
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
              onClick={() => onSectionChange('ai-diet-planner')}
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
