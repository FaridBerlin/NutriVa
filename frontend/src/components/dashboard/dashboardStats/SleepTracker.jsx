import { useState, useEffect, useContext } from 'react'
import { useProfile } from '../../../context/ProfileContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Moon, Plus, Minus } from 'lucide-react'
import { ThemeContext } from '../../../context/ThemeContext'
import StatsCard from './StatsCard'

export default function SleepTracker({ compact = false, stats = {} }) {
  const { profile } = useProfile()
  const { theme } = useContext(ThemeContext)

  // Suggested ranges based on age
  const getSuggestedRange = (age) => {
    if (!age && age !== 0) return { min: 7, max: 9 } // default adult
    if (age <= 2) return { min: 11, max: 14 }
    if (age <= 5) return { min: 10, max: 13 }
    if (age <= 12) return { min: 9, max: 12 }
    if (age <= 17) return { min: 8, max: 10 }
    if (age <= 64) return { min: 7, max: 9 }
    return { min: 7, max: 8 }
  }

  const age = profile?.age || stats?.age
  const suggested = getSuggestedRange(age)
  // Use stats.sleepHours as initial tracked value if available
  const initial = stats?.sleepHours ?? profile?.sleepHours ?? suggested.min
  const [sleepHours, setSleepHours] = useState(initial)

  useEffect(() => {
    // keep local state in sync if stats/profile changes
    if (stats?.sleepHours) setSleepHours(stats.sleepHours)
  }, [stats, profile])

  const suggestedMid = (suggested.min + suggested.max) / 2
  const percent = Math.round(Math.min(100, (sleepHours / suggestedMid) * 100))

  const addHalfHour = () =>
    setSleepHours((s) => Math.round((s + 0.5) * 10) / 10)

  if (compact) {
    const cupSize = 1 // represent 1 hour as unit
    const goalCups = Math.max(1, Math.ceil(suggestedMid / cupSize))
    const consumedCups = Math.min(goalCups, Math.floor(sleepHours / cupSize))

    return (
      <StatsCard
        icon={Moon}
        value={sleepHours.toFixed(1)}
        title="Sleep Hours"
        colorScheme="indigo"
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
                          : '#6366f1'
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
                          : '#6366f1',
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
                onClick={() =>
                  setSleepHours((s) =>
                    Math.max(0, Math.round((s - 0.5) * 10) / 10),
                  )
                }
                className={`${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-amber-400'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                } rounded-full p-2 shadow-sm transition-all duration-300`}
                aria-label="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={addHalfHour}
                className={`${
                  isDark
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } rounded-full p-2 shadow-md transition-all duration-300`}
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
                      : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {percent >= 100 ? '✓ Well Rested' : 'Tracking'}
              </span>
              <span className={`text-xs font-semibold ${textMuted}`}>
                {suggested.min}-{suggested.max}h Goal
              </span>
            </div>
          </>
        )}
      </StatsCard>
    )
  }
}
