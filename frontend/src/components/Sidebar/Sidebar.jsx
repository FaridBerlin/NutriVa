import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NutrivaLogo from '../NutrivaLogo';
// Icon imports from lucide-react
import { 
  LayoutDashboard,
  User,
  Activity,
  Heart,
  Apple,
  Calendar,
  Utensils,
  MessageSquare,
  PlusCircle,
  Wand2,
  LogOut,
  Settings,
  Home
} from 'lucide-react';

export default function Sidebar({ activeSection, onSectionChange }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bmi', label: 'BMI & Goals', icon: Activity },
    { id: 'metrics', label: 'Health Metrics', icon: Heart },
    { id: 'plan', label: 'Your Plan', icon: Apple },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'meals', label: 'Meal Planner', icon: Utensils, badge: 'Soon', badgeColor: 'orange' },
    { id: 'ai', label: 'AI Assistant', icon: MessageSquare, badge: 'New', badgeColor: 'green' },
    { id: 'create-meal', label: 'Create Meal', icon: PlusCircle },
  ];

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
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
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
                  <Icon size={18} className={`transition-transform duration-200 ${!isActive ? 'group-hover:scale-110' : ''}`} />
                  <span className="font-medium flex-1">{item.label}</span>
                  
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor === 'green'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
          
          {/* Separator */}
          <li className="pt-2 border-t border-gray-200"></li>
          
          {/* Create Your Plan - AI */}
          <li>
            <button
              onClick={() => onSectionChange('create-plan')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:from-purple-100 hover:to-pink-100 hover:shadow-md hover:scale-[1.02] hover:border-purple-300 group ${
                activeSection === 'create-plan' ? 'ring-2 ring-purple-300 shadow-md' : ''
              }`}
            >
              <Wand2 size={18} className="text-purple-600 transition-transform duration-200 group-hover:rotate-12" />
              <span className="font-semibold text-purple-900 flex-1">Create Your Plan</span>
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
            <Home size={18} className="transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          {/* Settings */}
          <Link 
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 hover:translate-x-1 transition-all duration-200 group"
          >
            <Settings size={18} className="transition-transform duration-200 group-hover:rotate-90" />
            <span className="font-medium">Settings</span>
          </Link>
          
          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 hover:translate-x-1 transition-all duration-200 group"
          >
            <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}