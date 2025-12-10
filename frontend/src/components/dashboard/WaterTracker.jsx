import React, { useState } from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import { useProfile } from '../../context/ProfileContext'// Import the useProfile hook

function calculateDailyWaterIntakeLiters(weight) {
  if (!weight) return null
  return (weight * 35) / 1000
}

const WaterTracker = () => {
  const { profile } = useProfile()
  const weight = profile?.weight
  const dailyLiters = calculateDailyWaterIntakeLiters(weight)
  const [consumed, setConsumed] = useState(0)

  const handleAdd = () =>
    setConsumed((prev) => Math.min(prev + 0.25, dailyLiters || 10))
  const handleSubtract = () => setConsumed((prev) => Math.max(prev - 0.25, 0))

  return (
    <div className="bg-blue-50 rounded-lg p-6 shadow-md flex flex-col items-center max-w-md mx-auto mt-8">
      <div className="flex flex-col items-center gap-1 mb-4 w-full">
        <div className="flex items-center gap-2">
          <Droplet className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-700">Water Tracker</h2>
        </div>
        {weight && (
          <div className="mt-2 text-center w-full">
            <span className="text-base text-blue-800 font-medium">
              You should drink about
              <span className="font-bold"> {dailyLiters.toFixed(2)} L </span>
              of water per day
            </span>
          </div>
        )}
      </div>
      {weight ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleSubtract}
              className="bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-full p-2"
              aria-label="Decrease"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold text-blue-800">
              {consumed.toFixed(2)} L
            </span>
            <button
              onClick={handleAdd}
              className="bg-blue-200 hover:bg-blue-300 text-blue-700 rounded-full p-2"
              aria-label="Increase"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{
                width: `${Math.min((consumed / dailyLiters) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            Click + or - to track your water intake.
          </p>
        </>
      ) : (
        <p className="text-red-500">
          Please enter your weight in your profile to calculate your water
          intake.
        </p>
      )}
    </div>
  )
}

export default WaterTracker
