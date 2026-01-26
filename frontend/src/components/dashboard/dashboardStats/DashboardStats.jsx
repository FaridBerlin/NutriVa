import { Target } from 'lucide-react'
import WaterTracker from './WaterTracker'
import SleepTracker from './SleepTracker'
import StreakTracker from './StreakTracker'
import StatsCard from './StatsCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  bmiPercent as calcBmiPercent,
  bmiCategory as calcBmiCategory,
  getBMIColor,
} from '../../../utils/bmiUtils'
import { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

export default function DashboardStats({ stats }) {
  const bmi = stats?.bmi || 24.5
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  // Prefer backend-provided BMI percent/category if available, otherwise compute locally
  const bmiPercent = stats?.bmiPercent ?? calcBmiPercent(bmi)

  const bmiCategory = stats?.bmiCategory ?? calcBmiCategory(bmi)

  return (
    <div className="space-y-6">
      {/* Section Header with Gradient Underline */}
      <div className="relative pb-4">
        <h2
          className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Dashboard Overview
        </h2>
        <div className="absolute bottom-0 left-0 h-1 w-32 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 dark:from-emerald-500 dark:to-teal-500" />
      </div>
      {/* Main Stats Grid with Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Water Tracker - Enhanced */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-lg hover:shadow-lg dark:hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden group">
          <WaterTracker compact />
        </div>

        {/* Sleep Tracker - Enhanced */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-lg hover:shadow-lg dark:hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden group">
          <SleepTracker compact stats={stats} />
        </div>

        {/* BMI Card - Redesigned with Gradient Progress */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-lg hover:shadow-lg dark:hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden relative group">
          <StatsCard
            icon={Target}
            value={bmi.toFixed(1)}
            title="Body Mass Index"
            colorScheme="emerald"
          >
            {/* Circular Progress with Enhanced Styling */}
            <div className="flex justify-center mb-4">
              <div
                className="relative"
                style={{
                  width: '140px',
                  height: '140px',
                  minWidth: '140px',
                  minHeight: '140px',
                }}
              >
                {/* Glow effect behind circle */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-30"
                  style={{
                    background: `radial-gradient(circle, ${getBMIColor(bmi)} 0%, transparent 70%)`,
                  }}
                />
                <CircularProgressbar
                  value={bmiPercent}
                  text={`${bmi.toFixed(1)}`}
                  styles={buildStyles({
                    pathColor: getBMIColor(bmi),
                    textColor: isDark ? '#ffffff' : '#1e293b',
                    trailColor: isDark ? '#334155' : '#e5e7eb',
                    textSize: '18px',
                    pathTransitionDuration: 1.5,
                  })}
                />
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex items-center justify-between pt-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                {bmiCategory}
              </span>
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-400">
                {Math.round(bmiPercent)}% of range
              </span>
            </div>
          </StatsCard>
        </div>

        {/* Streak Tracker - Enhanced */}
        <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-lg hover:shadow-lg dark:hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden group">
          <StreakTracker compact />
        </div>
      </div>
    </div>
  )
}
