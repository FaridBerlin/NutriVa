import { useState, useEffect, useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Flame, Check, RotateCcw } from 'lucide-react'
import { ThemeContext } from '../../../context/ThemeContext'
import StatsCard from './StatsCard'

export default function StreakTracker({ compact = false }) {
  const { theme } = useContext(ThemeContext)

  const [currentStreak, setCurrentStreak] = useState(7)
  const [bestStreak, setBestStreak] = useState(14)
  const [todayCompleted, setTodayCompleted] = useState(false)

  const handleMarkComplete = () => {
    if (!todayCompleted) {
      setCurrentStreak((s) => {
        const newStreak = s + 1
        if (newStreak > bestStreak) {
          setBestStreak(newStreak)
        }
        return newStreak
      })
      setTodayCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentStreak(0)
    setTodayCompleted(false)
  }

  // Calculate percentage (current vs best)
  const percent =
    bestStreak > 0 ? Math.round((currentStreak / bestStreak) * 100) : 0

  if (compact) {
    return (
      <StatsCard
        icon={Flame}
        value={currentStreak}
        title="Meal Streak (Days)"
        colorScheme="orange"
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
                      currentStreak >= 7
                        ? '#f97316'
                        : isDark
                          ? '#fbbf24'
                          : '#fb923c'
                    } 0%, transparent 70%)`,
                  }}
                />
                <CircularProgressbar
                  value={percent}
                  text={currentStreak >= 7 ? '🔥' : `${Math.round(percent)}%`}
                  styles={buildStyles({
                    pathColor:
                      currentStreak >= 7
                        ? '#f97316'
                        : isDark
                          ? '#fbbf24'
                          : '#fb923c',
                    textColor: isDark ? '#fbbf24' : '#1e293b',
                    trailColor: isDark ? '#334155' : '#e5e7eb',
                    textSize: currentStreak >= 7 ? '32px' : '18px',
                    pathTransitionDuration: 1.5,
                  })}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={handleReset}
                className={`${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-amber-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } rounded-full p-2 shadow-sm transition-all duration-300`}
                aria-label="Reset"
                title="Reset Streak"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleMarkComplete}
                disabled={todayCompleted}
                className={`${
                  todayCompleted
                    ? isDark
                      ? 'bg-green-500/30 text-green-300 cursor-not-allowed'
                      : 'bg-green-100 text-green-700 cursor-not-allowed'
                    : isDark
                      ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                } rounded-full p-2 shadow-md transition-all duration-300`}
                aria-label="Mark Complete"
                title={
                  todayCompleted ? 'Already Completed' : 'Mark Today Complete'
                }
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            {/* Goal Info */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  currentStreak >= 7
                    ? isDark
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-orange-100 text-orange-700'
                    : currentStreak >= 3
                      ? isDark
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-yellow-100 text-yellow-700'
                      : isDark
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-gray-100 text-gray-700'
                }`}
              >
                {currentStreak >= 7
                  ? '🔥 On Fire!'
                  : currentStreak >= 3
                    ? '💪 Keep Going!'
                    : 'Start Streak'}
              </span>
              <span className={`text-xs font-semibold ${textMuted}`}>
                Best: {bestStreak} days
              </span>
            </div>
          </>
        )}
      </StatsCard>
    )
  }
}
