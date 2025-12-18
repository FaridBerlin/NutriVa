import  { useState, useEffect } from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import { useProfile } from '../../context/ProfileContext'

function calculateDailyWaterIntakeLiters(weight) {
  if (!weight) return null
  return (weight * 35) / 1000
}

const WaterTracker = () => {
  const { profile } = useProfile()
  const weight = profile?.weight
  const dailyLiters = calculateDailyWaterIntakeLiters(weight)
  const [consumed, setConsumed] = useState(0)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    console.log('Dashboard WaterTracker mounted', { weight, dailyLiters })
  }, [])

  useEffect(() => {
    console.log('Consumed changed:', consumed)
    if (!dailyLiters) return
    const reached = consumed >= dailyLiters
    console.log('Checking goal reached:', { consumed, dailyLiters, reached })
    setShowBanner(reached)
  }, [consumed, dailyLiters])

  const handleAdd = () => {
    if (!dailyLiters) return
    setConsumed((prev) => {
      const next = Math.min(parseFloat((prev + 0.25).toFixed(2)), dailyLiters)
      console.log('handleAdd ->', { prev, next })
      return next
    })
  }

  const handleSubtract = () =>
    setConsumed((prev) => {
      const next = Math.max(parseFloat((prev - 0.25).toFixed(2)), 0)
      console.log('handleSubtract ->', { prev, next })
      return next
    })

  const reset = () => {
    setConsumed(0)
    console.log('reset -> consumed set to 0')
  }

  const percent = dailyLiters
    ? Math.min((consumed / dailyLiters) * 100, 100)
    : 0

  return (
    <div
      className={`relative mx-auto mt-10 max-w-lg w-full transform transition-all duration-300 rounded-2xl p-8 bg-gradient-to-br from-white to-blue-50 shadow-2xl flex flex-col items-center ${showBanner ? 'ring-4 ring-green-300' : 'ring-0'}`}
    >
      {showBanner && (
        <p className="mt-2 text-green-600 font-bold">✅ Goal reached!</p>
      )}

      <div className="flex flex-col items-center gap-1 mb-4 w-full">
        <div className="flex items-center gap-3">
          <Droplet className="w-12 h-12 text-blue-600 drop-shadow-md" />
          <h2 className="text-3xl font-extrabold text-blue-800">
            Water Tracker
          </h2>
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
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={handleSubtract}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-3 shadow-sm flex items-center justify-center"
              aria-label="Decrease"
            >
              <Minus className="w-6 h-6" />
            </button>
            <span className="text-4xl font-extrabold text-blue-800 tracking-tight">
              {consumed.toFixed(2)} L
            </span>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md flex items-center justify-center"
              aria-label="Increase"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full bg-gradient-to-r from-blue-100 to-white rounded-full h-5 mb-4 overflow-hidden">
            <div
              className={`h-5 rounded-full transition-all duration-500 ${percent >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex gap-3 mb-4 items-center w-full justify-between">
            <button
              onClick={reset}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition"
            >
              Reset
            </button>
            <div className="ml-2 text-sm text-gray-600 flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-medium">
                Goal: {dailyLiters.toFixed(2)} L
              </span>
            </div>
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
