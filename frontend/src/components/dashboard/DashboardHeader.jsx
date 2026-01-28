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
  const containerClass = isDark
    ? 'p-4 mx-4 md:mx-6 rounded-2xl bg-gradient-to-br from-[#03121a] to-[#071423] shadow-sm border border-accentYellow/10 text-accentYellow nv-header mb-6 mt-4'
    : 'p-4 mx-4 md:mx-6 rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 border border-gray-100 mb-6 mt-4'
  const titleClass = isDark
    ? 'text-xl font-bold text-accentYellow'
    : 'text-xl font-bold text-gray-900'
  const subtitleClass = isDark
    ? 'text-sm text-accentYellow/80'
    : 'text-sm text-gray-900'
  const weightLabelClass = isDark
    ? 'text-m text-accentYellow/80'
    : 'text-m text-gray-900'
  const weightValueClass = isDark
    ? 'text-base font-semibold text-accentYellow'
    : 'text-base font-semibold text-gray-900'
  const iconBg = isDark ? 'bg-amber-600/20' : 'bg-emerald-400/10'
  const iconColor = isDark ? 'text-amber-400' : 'text-emerald-600'

  return (
    <div className={containerClass}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4  md:w-auto">
          <div
            className={`w-14 h-14 ${iconBg} rounded-full flex items-center justify-center`}
          >
            <User className={iconColor} size={24} />
          </div>
          <div>
            <h1 className={`py-3 ${titleClass}`}>
              Welcome back,{' '}
              {capitalizedName(userName || profile?.name || 'User')}!
            </h1>
            {activePlan ? (
              <>
                <p className={subtitleClass}>Day {currentDay}</p>
                <div
                  className={`flex items-center gap-3 text-sm ${subtitleClass} mt-2`}
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
                <p className={subtitleClass}>
                  Ready to start? Create your first plan!
                </p>
                <div
                  className={`flex items-center gap-3 text-sm ${subtitleClass} mt-2`}
                >
                  <span>{profile?.age || 0} years</span>
                  <span>•</span>
                  <span>{profile?.height || 0} cm</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 md:block md:w-auto items-center text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-3">
            <div className={weightLabelClass}>Weight </div>
            <div className={weightValueClass}>
              {loading
                ? '...'
                : profile?.weight
                  ? `${Number(profile.weight).toFixed(1)} kg`
                  : '—'}
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
            <div
              className={`${isDark ? 'bg-amber-900/20 text-amber-300' : 'bg-emerald-100 text-emerald-700'} px-4 py-1 rounded-full text-xl md:text-2xl flex items-center gap-3 font-semibold`}
            >
              {weight < 0 ? (
                <TrendingDown size={20} />
              ) : (
                <TrendingUp size={20} />
              )}
              <span>{Math.abs(Number(weight)).toFixed(1)} kg</span>
            </div>
            <div className={`text-xl md:text-2xl ${subtitleClass}`}>
              →{' '}
              {profile?.targetWeight
                ? Number(profile.targetWeight).toFixed(1)
                : 55}{' '}
              kg
            </div>
          </div>
          <div className={`${subtitleClass} mt-2`}>{currentDate}</div>
        </div>
      </div>
    </div>
  )
}
