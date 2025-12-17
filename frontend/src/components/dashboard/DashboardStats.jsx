//info from ProfileContext

import { Flame, Target, TrendingUp } from 'lucide-react'
import WaterTracker from '../WaterTracker'
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

export default function DashboardStats({ stats }) {
  const calories = stats?.dailyCalories || 2000
  const bmi = stats?.bmi || 24.5
  const daysLeft = stats?.daysLeft || 30

  // BMI visualization: map BMI to a 12-40 scale for a small inline chart
  const bmiMin = 12
  const bmiMax = 40
  const bmiPercent = bmi
    ? Math.min(100, Math.max(0, ((bmi - bmiMin) / (bmiMax - bmiMin)) * 100))
    : 0

  const getBMIColor = (value) => {
    if (!value) return '#83D385'
    if (value < 18.5) return '#3b82f6' // blue
    if (value < 25) return '#83D385' // green
    if (value < 30) return '#f97316' // orange
    return '#ef4444' // red
  }

  const bmiCategory = !bmi
    ? 'N/A'
    : bmi < 18.5
      ? 'Underweight'
      : bmi < 25
        ? 'Healthy'
        : bmi < 30
          ? 'Overweight'
          : 'Obese'

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Water (compact) */}
        <WaterTracker compact />
        {/* Calories */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Flame className="text-orange-400" size={28} />
            <span className="text-3xl font-bold text-textDark">{calories}</span>
          </div>
          <h3 className="text-sm text-textLight">Daily Calories</h3>
        </div>
        {/* Weight card removed - weight shown in header instead */}
        {/* BMI */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{bmi}</span>
          </div>
          <h3 className="text-sm text-textLight">BMI</h3>

          {/* BMI full circular chart using recharts RadialBarChart */}
          <div className="mt-4">
            <div style={{ width: '100%', height: 120 }} className="relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  barSize={10}
                  startAngle={40}
                  endAngle={-250}
                  data={[{ name: 'BMI', value: bmiPercent }]}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={999}
                    fill={getBMIColor(bmi)}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              {/* Center label overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-textLight">BMI</span>
                <span className="text-lg font-semibold text-textDark">
                  {bmi.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-textLight">{bmiCategory}</span>
              <span className="text-xs text-textLight">
                {Math.round(bmiPercent)}%
              </span>
            </div>
          </div>
        </div>
        {/* Days Left */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
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
