import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router'
import { lazy, Suspense, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

// Pages are code-split: each route downloads its own chunk on first visit
// instead of every page (charts, markdown, animations) shipping up front.
const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const DietTrackerPage = lazy(() => import('./pages/DietTrackerPage'))
const AiDoctorPage = lazy(() => import('./pages/AiDoctorPage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  )
}

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
function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  // Pages that should NOT show Navbar and Footer (dashboard-style pages)
  const dashboardRoutes = [
    '/dashboard',
    '/settings',
    '/diet-tracker',
    '/ai-doctor',
  ]
  const isDashboardPage = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route),
  )

  return (
    <div
      className={`min-h-screen ${isDashboardPage ? 'bg-transparent landing-page' : 'bg-linear-to-br from-green-100 via-white to-green-50'}`}
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
                <Suspense fallback={<PageFallback />}>
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

                    {/* AI Doctor - Nutrition chatbot */}
                    <Route
                      path="/ai-doctor"
                      element={
                        <ProtectedRoute>
                          <AiDoctorPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Catch-all: unknown URLs rendered an empty layout */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AppLayout>
            </Router>
          </DietTrackerProvider>
        </AiMealPlanProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
