import { useContext } from 'react'
import { useProfile } from '../../context/ProfileContext'
import { useMealPlan } from '../../context/aiMealPlanContext'
import { useDietTracker } from '../../context/DietTrackerContext'
import { ThemeContext } from '../../context/ThemeContext'
import { TrendingDown, User, Target, TrendingUp } from 'lucide-react'

export default function DashboardHeader({ userName }) {
  const { profile, loading } = useProfile()
  const { activePlan } = useMealPlan()
  const { activeTracker } = useDietTracker()
  const { theme } = useContext(ThemeContext)

  const capitalizedName = (name) => {
    if (!name) return 'User'
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  // Get current day from activeTracker, or calculate from profile creation date
  const getCurrentDay = () => {
    if (activeTracker?.currentDay) {
      return activeTracker.currentDay
    }

    // Fallback: calculate from profile creation date
    if (activePlan?.createdAt) {
      const created = new Date(activePlan.createdAt)
      const now = new Date()
      const diffMs = now - created
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      return Math.max(1, diffDays + 1)
    }

    return 1
  }
  const weightDifference = () => {
    const current = Number(profile?.weight ?? 0)
    const target = Number(profile?.targetWeight ?? 0)

    return target - current
  }

  const currentDay = getCurrentDay()
  const weight = weightDifference()
  const planDuration = activePlan?.planDuration || ''
  const currentDate = new Date().toLocaleDateString()

  const isDark = theme === 'dark'

  return (
    <div
      className={`p-6 mx-4 md:mx-6 rounded-2xl mb-6 mt-4 ${
        isDark
          ? 'bg-gradient-to-br from-[#03121a] to-[#071423] shadow-sm border border-accentYellow/10'
          : 'bg-white shadow-lg ring-1 ring-gray-200 border border-gray-100'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Section - User Info */}
        <div className="flex items-start gap-4 w-full lg:w-auto">
          <div
            className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-600/20' : 'bg-emerald-400/10'
            }`}
          >
            <User
              className={isDark ? 'text-amber-400' : 'text-emerald-600'}
              size={24}
            />
          </div>
          <div className="flex-1">
            <h1
              className={`text-xl md:text-2xl font-bold mb-3 ${
                isDark ? 'text-accentYellow' : 'text-gray-900'
              }`}
            >
              Welcome back,{' '}
              {capitalizedName(userName || profile?.name || 'User')}!
            </h1>
            {activePlan ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-lg md:text-xl font-semibold ${
                      isDark
                        ? 'bg-amber-900/20 text-amber-300'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    Day {currentDay}
                  </span>
                </div>
                <div
                  className={`flex flex-wrap items-center gap-2 text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span>{profile?.age || 0} years</span>
                  <span>•</span>
                  <span>{profile?.height || 0} cm</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Target size={14} />
                    {profile?.dietaryGoal?.replace('_', ' ') || 'Not set'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <p
                  className={`mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Ready to start? Create your first plan!
                </p>
                <div
                  className={`flex flex-wrap items-center gap-2 text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span>{profile?.age || 0} years</span>
                  <span>•</span>
                  <span>{profile?.height || 0} cm</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Divider - Mobile Only */}
        <div
          className={`lg:hidden w-full h-px ${
            isDark ? 'bg-accentYellow/20' : 'bg-gray-200'
          }`}
        />

        {/* Right Section - Weight Progress */}
        <div className="flex items-start gap-4 w-full lg:w-auto">
          <div
            className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center ${
              isDark ? 'bg-amber-600/20' : 'bg-emerald-400/10'
            }`}
          >
            {weight < 0 ? (
              <TrendingDown
                className={isDark ? 'text-amber-400' : 'text-emerald-600'}
                size={24}
              />
            ) : (
              <TrendingUp
                className={isDark ? 'text-amber-400' : 'text-emerald-600'}
                size={24}
              />
            )}
          </div>
          <div className="flex-1">
            <h2
              className={`text-xl md:text-2xl font-bold mb-3 ${
                isDark ? 'text-accentYellow' : 'text-gray-900'
              }`}
            >
              Weight Progress
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-lg md:text-xl font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                {loading
                  ? '...'
                  : profile?.weight
                    ? `${Number(profile.weight).toFixed(1)} kg`
                    : '—'}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-lg md:text-xl font-semibold flex items-center gap-2 ${
                  isDark
                    ? 'bg-amber-900/20 text-amber-300'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {weight < 0 ? (
                  <TrendingDown size={18} />
                ) : (
                  <TrendingUp size={18} />
                )}
                {Math.abs(Number(weight)).toFixed(1)} kg
              </span>
              <span
                className={`text-lg md:text-xl ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                →{' '}
                {profile?.targetWeight
                  ? Number(profile.targetWeight).toFixed(1)
                  : 55}{' '}
                kg
              </span>
            </div>
            <div
              className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {currentDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
