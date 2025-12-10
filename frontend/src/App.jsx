import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

// Components

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Context Providers
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext'

// Layout wrapper to handle conditional Navbar/Footer
function AppLayout({ children }) {
  const location = useLocation()

  // Pages that should NOT show Navbar and Footer (dashboard-style pages)
  const dashboardRoutes = ['/dashboard', '/settings']
  const isDashboardPage = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route),
  )

  return (
    <div
      className={`min-h-screen ${isDashboardPage ? 'bg-gray-50' : 'bg-gradient-to-br from-green-100 via-white to-green-50'}`}
    >
      {!isDashboardPage && <Navbar />}
      <main className={!isDashboardPage ? 'pt-20' : ''}>{children}</main>
      {!isDashboardPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Profile - View user data */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Settings - Account settings and profile edit */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
