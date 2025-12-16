import { useState, useEffect } from 'react'

export default function WaterTracker({ weight = 70 }) {
  // default weight 70 kg if not provided
  const dailyGoal = Math.round(weight * 35) // daily goal based on weight (35 ml per kg)
  const [waterIntake, setWaterIntake] = useState(0) // amount of water consumed
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    console.log('WaterTracker mounted')
    console.log('Weight:', weight, 'Daily Goal:', dailyGoal)
  }, [])

  useEffect(() => {
    console.log('Water intake changed:', waterIntake)
    const reached = waterIntake >= dailyGoal
    console.log('Goal reached?', reached)
    if (reached) {
      console.log('Goal reached effect fired')
      setShowBanner(true)
      // alert removed: only show green banner as requested
    } else {
      setShowBanner(false)
    }
  }, [waterIntake, dailyGoal])

  const handleAddWater = (amount) => {
    console.log('Attempting to add water:', amount)
    const newIntake = waterIntake + amount
    // do not clamp to dailyGoal so we can see overflow if wanted; clamp only for UI display
    setWaterIntake(newIntake)
    console.log('Water intake updated to (raw):', newIntake)
  }

  const handleSubtractWater = (amount) => {
    const newIntake = Math.max(0, waterIntake - amount)
    setWaterIntake(newIntake)
    console.log('Subtracted Water:', amount, 'New Intake:', newIntake)
  }

  // Reset helper for debugging
  const resetIntake = () => {
    setWaterIntake(0)
    console.log('Reset intake to 0')
  }

  const isGoalReached = waterIntake >= dailyGoal // if goal is reached

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md relative">
      {showBanner && (
        <div className="absolute left-2 right-2 -top-6 bg-green-600 text-white p-2 rounded text-center font-bold z-10">
          ✅ Goal reached!
        </div>
      )}

      <h2 className="text-xl font-bold text-blue-900">💧 Water Tracker</h2>
      <p className="text-lg text-blue-600">
        Today's Water Intake: {Math.min(waterIntake, dailyGoal)} ml /{' '}
        {dailyGoal} ml
      </p>
      <p className="text-sm text-gray-500">
        You should drink about {(dailyGoal / 1000).toFixed(2)} L of water per
        day
      </p>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleAddWater(250)}
        >
          +250ml
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleSubtractWater(250)}
        >
          -250ml
        </button>
        {/* Force Complete button removed per user request */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={resetIntake}
        >
          Reset
        </button>
      </div>

      <div className="mt-4 text-gray-700">
        <p className="font-semibold">Debug Info:</p>
        <p>Weight: {weight} kg</p>
        <p>Daily Goal: {dailyGoal} ml</p>
        <p>Current Water Intake (raw): {waterIntake} ml</p>
        <p>Goal Reached: {isGoalReached ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}
