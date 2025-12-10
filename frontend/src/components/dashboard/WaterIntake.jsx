import React from 'react'
import { useProfile } from '../../context/ProfileContext'
import { Droplet } from 'lucide-react'

function calculateDailyWaterIntakeLiters(weight) {
  if (!weight) return null
  return (weight * 35) / 1000
}

const WaterIntake = () => {
  const { profile } = useProfile()
  const weight = profile?.weight
  const dailyLiters = calculateDailyWaterIntakeLiters(weight)

  return (
    <div className="bg-blue-50 rounded-lg p-4 shadow-md flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2">
        <Droplet className="w-7 h-7 text-blue-600" />
        <h2 className="text-xl font-bold text-blue-700">Daily Water Intake</h2>
      </div>
      {weight ? (
        <>
          <p className="text-lg mb-2">
            Your current weight:{' '}
            <span className="font-semibold">{weight} kg</span>
          </p>
          <p className="text-lg">
            Recommended today:{' '}
            <span className="font-semibold">{dailyLiters.toFixed(2)} L</span>
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

export default WaterIntake
