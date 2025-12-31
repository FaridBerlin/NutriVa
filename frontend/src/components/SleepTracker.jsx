import { useState, useEffect } from 'react'
import { useProfile } from '../context/ProfileContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Moon } from 'lucide-react'
import Card from './ui/Card'

export default function SleepTracker({ compact = false, stats = {} }) {
  const { profile } = useProfile()

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
  const reset = () => setSleepHours(0)

  if (compact) {
    const cupSize = 1 // represent 1 hour as unit
    const goalCups = Math.max(1, Math.ceil(suggestedMid / cupSize))
    const consumedCups = Math.min(goalCups, Math.floor(sleepHours / cupSize))

    return (
      <Card className="relative pb-16 flex flex-col">
        <div className="absolute top-3 left-3 flex flex-col items-center">
          <div className="p-2 rounded-full bg-indigo-50">
            <Moon className="text-indigo-600" size={24} />
          </div>
          <div className="text-sm text-textLight mt-1">Sleep</div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[220px]">
          <div
            style={{
              width: '96px',
              height: '96px',
              minWidth: '96px',
              minHeight: '96px',
            }}
          >
            <CircularProgressbar
              value={percent}
              text={`${consumedCups}/${goalCups}`}
              styles={buildStyles({
                pathColor: '#6366f1',
                textColor: '#1e293b',
                trailColor: '#e5e7eb',
                textSize: '16px',
              })}
            />
          </div>
          <span className="text-base font-semibold text-textDark mt-2">
            {sleepHours} hrs
          </span>
          <p className="text-sm text-textLight mt-1">
            Suggested: {suggested.min}-{suggested.max} hrs
          </p>

          <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
            <button
              className="bg-indigo-600 text-white text-xs px-4 py-2 rounded hover:bg-indigo-700"
              onClick={addHalfHour}
              title="Add 0.5 hr"
            >
              +0.5
            </button>

            <div className="text-sm text-indigo-600 font-semibold text-center">
              Now: {sleepHours}h
            </div>

            <button
              className="bg-gray-500 text-white text-xs px-4 py-2 rounded hover:bg-gray-600"
              onClick={reset}
              title="Reset"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="relative pb-16 flex flex-col">
      <div className="absolute top-3 left-3 flex flex-col items-center">
        <div className="p-3 rounded-full bg-indigo-50">
          <Moon className="text-indigo-600" size={36} />
        </div>
        <div className="text-sm text-textLight mt-2">Sleep</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[320px]">
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={percent}
            text={`${sleepHours}h`}
            styles={buildStyles({
              pathColor: '#6366f1',
              textColor: '#1e293b',
              trailColor: '#e5e7eb',
              textSize: '20px',
            })}
          />
        </div>
        <p className="text-base text-textLight mt-3">
          Suggested: {suggested.min}-{suggested.max} hrs (age: {age ?? '—'})
        </p>

        <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={addHalfHour}
          >
            +0.5 hr
          </button>

          <div className="text-lg text-indigo-600 font-semibold text-center">
            Now: {sleepHours}h
          </div>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-auto"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </Card>
  )
}
