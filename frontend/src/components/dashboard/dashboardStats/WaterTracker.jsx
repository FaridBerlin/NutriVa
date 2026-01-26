import { useState, useEffect, useContext } from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { ThemeContext } from '../../../context/ThemeContext'
import StatsCard from './StatsCard'

export default function WaterTracker({ weight = 70, compact = false }) {
  const { theme } = useContext(ThemeContext)
  const dailyGoal = Math.round(weight * 35)

  // Load from localStorage on mount
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('waterIntake')
    return saved ? parseInt(saved, 10) : 0
  })
  const [showBanner, setShowBanner] = useState(false)
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('waterStreak')
    return saved ? parseInt(saved, 10) : 0
  })

  // Save to localStorage whenever waterIntake changes
  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString())
  }, [waterIntake])

  // Save streak to localStorage
  useEffect(() => {
    localStorage.setItem('waterStreak', streak.toString())
  }, [streak])

  useEffect(() => {
    const reached = waterIntake >= dailyGoal
    setShowBanner(reached)
  }, [waterIntake, dailyGoal])

  const handleAddWater = (amount) => {
    setWaterIntake((v) => v + amount)
    setStreak((s) => s + 1)
  }

  if (compact) {
    const cupSize = 150
    const goalCups = Math.max(1, Math.ceil(dailyGoal / cupSize))
    const consumedCups = Math.min(goalCups, Math.floor(waterIntake / cupSize))
    const percent = Math.round((waterIntake / dailyGoal) * 100) || 0

    return (
      <StatsCard
        icon={Droplet}
        value={(waterIntake / 1000).toFixed(1)}
        title="Water Intake (L)"
        colorScheme="blue"
      >
        {({ textMuted, isDark }) => (
          <>
            {/* Circular Progress with Glow */}
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
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-30"
                  style={{
                    background: `radial-gradient(circle, ${
                      percent >= 100
                        ? '#10b981'
                        : isDark
                          ? '#fbbf24'
                          : '#3b82f6'
                    } 0%, transparent 70%)`,
                  }}
                />
                <CircularProgressbar
                  value={percent}
                  text={`${Math.round(percent)}%`}
                  styles={buildStyles({
                    pathColor:
                      percent >= 100
                        ? '#10b981'
                        : isDark
                          ? '#fbbf24'
                          : '#3b82f6',
                    textColor: isDark ? '#fbbf24' : '#1e293b',
                    trailColor: isDark ? '#334155' : '#e5e7eb',
                    textSize: '18px',
                    pathTransitionDuration: 1.5,
                  })}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                className={`${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-amber-400'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                } rounded-full p-2 shadow-sm transition-all duration-300`}
                onClick={() => setWaterIntake((v) => Math.max(0, v - 150))}
                aria-label="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                className={`${
                  isDark
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } rounded-full p-2 shadow-md transition-all duration-300`}
                onClick={() => handleAddWater(150)}
                aria-label="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Goal Info */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  percent >= 100
                    ? isDark
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-green-100 text-green-700'
                    : isDark
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                {percent >= 100 ? '✓ Goal Reached' : 'In Progress'}
              </span>
              <span className={`text-xs font-semibold ${textMuted}`}>
                {(dailyGoal / 1000).toFixed(1)}L Goal
              </span>
            </div>
          </>
        )}
      </StatsCard>
    )
  }
}
