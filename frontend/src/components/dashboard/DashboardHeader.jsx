import { useProfile } from '../../context/ProfileContext'
import { useMealPlan } from '../../context/aiMealPlanContext'
import { useDietTracker } from '../../context/DietTrackerContext'
import { TrendingDown, User, Target, TrendingUp } from 'lucide-react'

export default function DashboardHeader({ userName }) {
  const { profile } = useProfile()
  const { activePlan } = useMealPlan()
  const { activeTracker } = useDietTracker()

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
    if (profile?.createdAt) {
      const created = new Date(profile.createdAt)
      const now = new Date()
      const diffMs = now - created
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      return Math.max(1, diffDays + 1)
    }

    return 1
  }
  const weightDifference = () => {
    const weight = profile?.targetWeight - profile?.weight || 0

    return weight
  }

  const currentDay = getCurrentDay()
  const weight = weightDifference()
  const planDuration = activePlan?.planDuration || ''

  return (
    <div className="mb-8 mt-5 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 font-bold text-3xl mb-2 ">
            Welcome back, {capitalizedName(userName || profile?.name || 'User')}
            ! 👋
          </h1>
          {activePlan ? (
            <p className="text-gray-600">
              Day {currentDay} of your {activePlan?.planName || ' health plan '}{' '}
              -{planDuration} days journey
            </p>
          ) : (
            ' Ready to start? Create your first plan! '
          )}
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
                <span>{profile?.age || 0} years</span>
                <span>•</span>
                <span>{profile?.height || 0} cm</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Target size={14} />
                  {profile?.dietaryGoal?.replace('_', ' ') || 'Not set'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-gray-900" style={{ fontSize: '20px' }}>
                  {profile?.weight || 0}kg
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                  {weight < 0 ? (
                    <TrendingDown size={14} />
                  ) : (
                    <TrendingUp size={14} />
                  )}
                  {weight} kg
                </div>
                <span className="text-gray-500 text-sm">
                  → {profile?.targetWeight || 0}kg
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
/* 
  return (
    <div className="p-6 rounded-b-2xl bg-gradient-to-r from-gray-100 to-gray-200 shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Weight</span>
          <span className="text-lg font-semibold text-gray-900">
            {loading ? '...' : profile?.weight ? `${profile.weight} kg` : '—'}
          </span>
        </div>

        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
      </div>
    </div>
  ) */
