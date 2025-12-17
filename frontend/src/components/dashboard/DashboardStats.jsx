//info from ProfileContext

import { Flame, Target, TrendingUp } from 'lucide-react'

export default function DashboardStats({ stats }) {
  const calories = stats?.dailyCalories || 2000
  const bmi = stats?.bmi || 24.5
  const daysLeft = stats?.daysLeft || 30

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calories */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Flame className="text-orange-500" size={28} />
            <span className="text-3xl font-bold text-textDark">{calories}</span>
          </div>
          <h3 className="text-sm text-textLight">Daily Calories</h3>
        </div>
        {/* Weight card removed - weight shown in header instead */}
        {/* BMI */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{bmi}</span>
          </div>
          <h3 className="text-sm text-textLight">BMI</h3>
        </div>
        {/* Days Left */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{daysLeft}</span>
          </div>
          <h3 className="text-sm text-textLight">Days Left</h3>
        </div>
      </div>
    </div>
  )
}
