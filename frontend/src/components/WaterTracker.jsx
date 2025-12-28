import { useState, useEffect } from 'react'
import { Droplet } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Card from './ui/Card'

export default function WaterTracker({ weight = 70, compact = false }) {
  const dailyGoal = Math.round(weight * 35)
  const [waterIntake, setWaterIntake] = useState(0)
  const [showBanner, setShowBanner] = useState(false)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // mount
  }, [])

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
      <Card className="relative pb-16 flex flex-col">
        <div className="absolute top-3 left-3 flex flex-col items-center">
          <div className="p-2 rounded-full bg-blue-50">
            <Droplet className="text-blue-500" size={24} />
          </div>
          <div className="text-sm text-textLight mt-1">Water</div>
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
                pathColor: '#3b82f6',
                textColor: '#075985',
                trailColor: '#e5e7eb',
                textSize: '16px',
              })}
            />
          </div>
          <span className="text-base font-semibold text-textDark mt-2">
            {Math.min(waterIntake, dailyGoal)} ml
          </span>
          <p className="text-sm text-textLight mt-1">Goal: {dailyGoal} ml</p>

          <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
            <button
              className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleAddWater(150)}
              title="Add 150ml"
            >
              +150
            </button>

            <div className="text-sm text-blue-600 font-semibold text-center">
              <span className="block">🔥</span>
              <span>Streak: {streak}</span>
            </div>

            <button
              className="bg-gray-500 text-white text-xs px-4 py-2 rounded hover:bg-gray-600"
              onClick={resetIntake}
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
