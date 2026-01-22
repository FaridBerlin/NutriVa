import { useState, useEffect, useContext } from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Card from '../../ui/Card'
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

  const resetIntake = () => setWaterIntake(0)

  const isGoalReached = waterIntake >= dailyGoal

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

  return (
    <div className="bg-blue-100 p-4 pb-16 rounded-lg shadow-md relative flex flex-col">
      {showBanner && (
        <div className="absolute left-2 right-2 -top-6 bg-green-600 text-white p-2 rounded text-center font-bold z-10">
          ✅ Goal reached!
        </div>
      )}

      <div className="relative">
        {/* fixed icon at top-left */}
        <div className="absolute top-3 left-3 flex flex-col items-center">
          <div className="p-3 rounded-full bg-blue-50">
            <Droplet className="text-blue-500" size={36} />
          </div>
          <div className="text-sm text-textLight mt-2">Water</div>
        </div>

        {/* main content (circle centered) */}
        <div className="flex flex-col items-center justify-center min-h-[320px]">
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
              value={Math.round((waterIntake / dailyGoal) * 100) || 0}
              text={`${Math.min(Math.floor(waterIntake / 150), Math.max(1, Math.ceil(dailyGoal / 150)))} / ${Math.max(1, Math.ceil(dailyGoal / 150))}`}
              styles={buildStyles({
                pathColor: '#3b82f6',
                textColor: '#075985',
                trailColor: '#e5e7eb',
                textSize: '20px',
              })}
            />
          </div>
          <p className="text-lg text-blue-600 mt-3">
            Today's Water Intake: {Math.min(waterIntake, dailyGoal)} ml /{' '}
            {dailyGoal} ml
          </p>
          <p className="text-base text-gray-500">
            You should drink about {(dailyGoal / 1000).toFixed(2)} L of water
            per day
          </p>

          <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleAddWater(150)}
            >
              +150ml
            </button>

            <div className="text-lg text-blue-600 font-semibold text-center">
              <span>🔥</span>
              <div>Streak: {streak}</div>
            </div>

            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-auto"
              onClick={resetIntake}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-gray-700">
        <p className="font-semibold">Debug Info:</p>
        <p>Weight: {weight} kg</p>
        <p>Daily Goal: {dailyGoal} ml</p>
        <p>Current Water Intake (raw): {waterIntake} ml</p>
        <p>Goal Reached: {isGoalReached ? 'Yes' : 'No'}</p>
        <p>Streak: {streak}</p>
      </div>
    </div>
  )
}
