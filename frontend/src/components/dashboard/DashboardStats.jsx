//info from ProfileContext

import { Flame, Target, TrendingUp } from 'lucide-react'
import WaterTracker from '../WaterTracker'
import SleepTracker from '../SleepTracker'
import Card from '../ui/Card'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  bmiPercent as calcBmiPercent,
  bmiCategory as calcBmiCategory,
  getBMIColor,
} from '../../utils/bmiUtils'
import { useProfile } from '../../context/ProfileContext'

export default function DashboardStats({ stats }) {
  const calories = stats?.dailyCalories || 2000
  const bmi = stats?.bmi || 24.5
  const { profile, updateProfile } = useProfile()
  const planDuration = profile?.planDuration || stats?.daysLeft || 30

  // Determine profile creation date (support multiple possible fields)
  const createdAtRaw =
    profile?.createdAt || profile?.created_at || profile?.created || null
  let elapsedDays = 0
  if (createdAtRaw) {
    try {
      const created = new Date(createdAtRaw)
      const now = new Date()
      const diffMs = now - created
      elapsedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      if (elapsedDays < 0) elapsedDays = 0
    } catch (e) {
      elapsedDays = 0
    }
  }

  const cappedElapsed = Math.min(elapsedDays, planDuration)
  const daysLeft = Math.max(0, planDuration - cappedElapsed)
  const percentElapsed = Math.round((cappedElapsed / planDuration) * 100)

  // Prepare line chart data: value is percent complete at each day
  const chartData = Array.from({ length: planDuration }, (_, i) => {
    const day = i + 1
    const val = Math.round((Math.min(day, cappedElapsed) / planDuration) * 100)
    return { day: `${day}`, value: val }
  })

  // Prefer backend-provided BMI percent/category if available, otherwise compute locally
  const bmiPercent = stats?.bmiPercent ?? calcBmiPercent(bmi)

  const bmiCategory = stats?.bmiCategory ?? calcBmiCategory(bmi)

  return (
    <div>
      <h2 className="text-2xl font-bold text-textDark mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Water (compact) */}
        <WaterTracker compact />
        {/* Sleep (component) */}
        <SleepTracker compact stats={stats} />
        {/* Weight card removed - weight shown in header instead */}
        {/* BMI */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <Target className="text-primary" size={28} />
            <span className="text-3xl font-bold text-textDark">{bmi}</span>
          </div>
          <h3 className="text-sm text-textLight">BMI</h3>

          {/* BMI circular progress (matches Water/Sleep look) */}
          <div className="mt-4">
            <div className="flex justify-center">
              <div style={{ width: 140, height: 140 }}>
                <CircularProgressbar
                  value={bmiPercent}
                  text={`${bmi.toFixed(1)}`}
                  styles={buildStyles({
                    pathColor: getBMIColor(bmi),
                    textColor: '#1e293b',
                    trailColor: '#e5e7eb',
                    textSize: '16px',
                  })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-textLight">{bmiCategory}</span>
              <span className="text-xs text-textLight">
                {Math.round(bmiPercent)}%
              </span>
            </div>
          </div>
        </Card>
        {/* Days Left (progress line chart) */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary" size={28} />
              <div className="text-sm text-textLight">
                Plan ({planDuration} days)
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <div className="text-3xl font-bold text-textDark">
                  {daysLeft}
                </div>
                <div className="text-xs text-textLight">Days Left</div>
              </div>
              <button
                className="text-xs text-primary underline hover:text-primaryDark"
                onClick={async () => {
                  const input = window.prompt(
                    'Set plan duration (days)',
                    String(planDuration),
                  )
                  if (!input) return
                  const parsed = parseInt(input, 10)
                  if (isNaN(parsed) || parsed <= 0) {
                    window.alert('Please enter a valid positive number of days')
                    return
                  }
                  try {
                    await updateProfile({ planDuration: parsed })
                  } catch (e) {
                    console.error('Failed to update plan duration', e)
                    window.alert('Failed to save plan duration')
                  }
                }}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div style={{ width: '100%', height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-textLight">
                Elapsed: {cappedElapsed} / {planDuration} days
              </div>
              <div className="text-sm text-textLight">
                Remaining: {daysLeft} days
              </div>
            </div>

            {createdAtRaw && (
              <div className="text-xs text-textLight mt-2">
                Started: {new Date(createdAtRaw).toLocaleDateString()}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
