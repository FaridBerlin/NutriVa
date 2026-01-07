import { Target } from 'lucide-react'

export default function ProfileOverview({ profile }) {
  // Compute simple progress toward target weight
  let progressPercent = null
  let remainingKg = null
  if (profile?.weight && profile?.targetWeight) {
    const current = Number(profile.weight)
    const target = Number(profile.targetWeight)
    const diff = Math.abs(current - target)
    // Simple closeness metric: percent = 100 when equal, else reduce proportionally
    progressPercent =
      current > 0
        ? Math.round(Math.max(0, Math.min(100, (1 - diff / current) * 100)))
        : 0
    remainingKg = Math.round(diff * 10) / 10
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Profile Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goals Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl shadow-md p-6 border border-primary/20 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/20 p-3 rounded-lg">
              <Target className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold text-textDark text-lg">
              Fitness Goals
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-textLight">Goal:</span>
              <span className="font-semibold text-textDark">
                {profile?.dietaryGoal?.replace('_', ' ') || 'Weight loss'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-textLight">Daily Calories:</span>
              <span className="font-semibold text-textDark">
                {profile?.dailyCalories
                  ? `${profile.dailyCalories} kcal`
                  : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-textLight">Target BMI:</span>
              <span className="font-semibold text-textDark">
                {profile?.targetBMI || '22.5'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-textLight">Target Weight:</span>
              <span className="font-semibold text-textDark">
                {profile?.targetWeight
                  ? `${profile.targetWeight} kg`
                  : 'Not set'}
              </span>
            </div>

            {/* Progress bar for target weight */}
            {profile?.weight && profile?.targetWeight && (
              <div className="mt-4 pt-4 border-t border-primary/20">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-textLight font-medium">
                    Progress to Target
                  </span>
                  <span className="font-bold text-primary">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-primary to-primaryDark transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-xs text-textLight mt-2">
                  {remainingKg === 0
                    ? '🎉 Target achieved!'
                    : `${remainingKg} kg to go`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
