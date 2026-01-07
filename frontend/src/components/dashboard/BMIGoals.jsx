import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts'
import { useState } from 'react'

import { TrendingUp, Flame, Target, Utensils } from 'lucide-react'

export default function BMIGoals({ bmi, goals, activePlan }) {
  const [selectedMetric, setSelectedMetric] = useState('calories')

  // Today's Summary

  const progressData = [
    {
      name: 'Calories',
      current: goals?.caloriesCurrent || 0,
      target: goals?.caloriesTarget || 2000,
      unit: 'kcal',
      fill: '#8b5cf6', // purple
      Icon: Flame,
    },
    {
      name: 'Protein',
      current: goals?.proteinCurrent || 0,
      target: goals?.proteinTarget || 150,
      unit: 'g',
      fill: '#83D385', // green (primary)
      Icon: TrendingUp,
    },
    {
      name: 'Carbs',
      current: goals?.carbsCurrent || 0,
      target: goals?.carbsTarget || 250,
      unit: 'g',
      fill: '#3b82f6', // blue
      Icon: Utensils,
    },
    {
      name: 'Fats',
      current: goals?.fatsCurrent || 0,
      target: goals?.fatsTarget || 65,
      unit: 'g',
      fill: '#f97316', // orange
      Icon: Target,
    },
  ]

  // Macros Split
  const macrosData = [
    {
      name: 'Protein',
      value: goals?.proteinCurrent || 0,
      fill: '#83D385',
      Icon: TrendingUp,
    },
    {
      name: 'Carbs',
      value: goals?.carbsCurrent || 0,
      fill: '#3b82f6',
      Icon: Utensils,
    },
    {
      name: 'Fats',
      value: goals?.fatsCurrent || 0,
      fill: '#f97316',
      Icon: Target,
    },
  ]

  // Get macro data for the selected metric using real weekly data from meal plan
  const getMacroData = () => {
    const targetValue =
      goals?.[`${selectedMetric}Target`] ||
      (selectedMetric === 'calories'
        ? 2000
        : selectedMetric === 'protein'
          ? 150
          : selectedMetric === 'carbs'
            ? 250
            : 65)

    // Get first 7 days from active meal plan
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const first7Days = activePlan?.days?.slice(0, 7) || []

    return weekDays.map((dayName, index) => {
      const dayData = first7Days[index]
      const nutrition = dayData?.totalNutrition || {}

      // Map metric name to nutrition key
      const nutritionKey =
        selectedMetric === 'carbs'
          ? 'carbs'
          : selectedMetric === 'fats'
            ? 'fat'
            : selectedMetric

      return {
        day: dayName,
        value: Math.round(nutrition[nutritionKey] || 0),
        target: targetValue,
      }
    })
  }

  // Metric configuration for buttons
  const buttonConfig = [
    { id: 'calories', label: 'Calories', color: 'emerald' },
    { id: 'protein', label: 'Protein', color: 'blue' },
    { id: 'carbs', label: 'Carbs', color: 'purple' },
    { id: 'fats', label: 'Fats', color: 'yellow' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6 flex items-center gap-2">
        <TrendingUp className="text-primary" size={28} />
        Nutrition & Goals
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Macros Distribution Donut Chart */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-200/50 hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-4 text-textDark">
            Macros Split
          </h3>
          <div style={{ width: '100%', height: '160px' }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={macrosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {macrosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-3 mt-2 flex-wrap">
            {macrosData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <item.Icon size={16} className="text-muted" />
                <span className="text-xs text-textLight font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-md p-6 border border-orange-200/50 hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-4 text-textDark flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            Today's Summary
          </h3>
          <div className="space-y-3">
            {progressData.slice(0, 3).map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-textLight flex items-center gap-2">
                  <item.Icon size={16} className="text-primary" />
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-textDark">
                  {item.current}/{item.target}
                  {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Nutrition Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900">Weekly Nutrition Plan</h2>
            <p className="text-xs text-gray-500 mt-1">
              7-day meal plan nutrition vs. daily targets
            </p>
          </div>
          <div className="flex gap-2">
            {buttonConfig.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  selectedMetric === metric.id
                    ? `bg-${metric.color}-500 text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={getMacroData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorValue)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
