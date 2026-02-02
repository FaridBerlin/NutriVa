import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { useState } from 'react'

import { TrendingUp } from 'lucide-react'
import Card from '../ui/Card'

export default function BMIGoals({ bmi, goals, activePlan }) {
  const [selectedMetric, setSelectedMetric] = useState('calories')

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

  // Explicit Tailwind classes for metrics to avoid dynamic class generation
  const metricStyles = {
    calories: 'bg-emerald-500',
    protein: 'bg-blue-500',
    carbs: 'bg-purple-500',
    fats: 'bg-yellow-400',
  }

  return (
    <div>
      {/* Weekly Nutrition Chart */}
      <Card noHover className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-textDark">
              {' '}
              Weekly Nutrition Trend
            </h2>
          </div>
          <div className="flex gap-2">
            {buttonConfig.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1 rounded-lg text-s transition-all ${
                  selectedMetric === metric.id
                    ? `${metricStyles[metric.id]} text-white`
                    : 'bg-gray-100 dark:bg-gray-800 text-muted dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                color: '#1f2937',
              }}
              labelStyle={{
                color: '#1f2937',
                fontWeight: '600',
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
              stroke="#80adf5"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
