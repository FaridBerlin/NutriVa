import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import DietTrackerPage from './pages/DietTrackerPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import ContactPage from './pages/ContactPage'

// Components

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

// Context Providers
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext'
import { AiMealPlanProvider } from './context/aiMealPlanContext'
import { DietTrackerProvider } from './context/DietTrackerContext'

// Layout wrapper to handle conditional Navbar/Footer
function AppLayout({ children }) {
  const location = useLocation()

  // Pages that should NOT show Navbar and Footer (dashboard-style pages)
  const dashboardRoutes = ['/dashboard', '/settings', '/diet-tracker']
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
        <AiMealPlanProvider>
          <DietTrackerProvider>
            <Router>
              <ScrollToTop />
              <Toaster />
              <AppLayout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPasswordPage />}
                  />

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

                  {/* Diet Tracker - Track meal completion */}
                  <Route
                    path="/diet-tracker"
                    element={
                      <ProtectedRoute>
                        <DietTrackerPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AppLayout>
            </Router>
          </DietTrackerProvider>
        </AiMealPlanProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
