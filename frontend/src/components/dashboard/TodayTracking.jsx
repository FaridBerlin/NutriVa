import React from 'react'
import { Flame, Activity, Utensils, Droplets } from 'lucide-react'
import { useProfile } from '../../context/ProfileContext'
import { useDietTracker } from '../../context/DietTrackerContext'
import { useAiMealPlan } from '../../context/aiMealPlanContext'
import CircularProgress from '../ui/CircularProgress'

export default function TodayTracking() {
  const { nutritionTargets } = useProfile()
  const { activeTracker } = useDietTracker()
  const { activePlan } = useAiMealPlan()

  // Get today's meal plan based on current day
  const currentDay = activeTracker?.currentDay || 1
  const todayPlan = activePlan?.days?.find(
    (day) => day.dayNumber === currentDay,
  )

  // Calculate consumed nutrition from eaten meals
  let caloriesConsumed = 0
  let proteinConsumed = 0
  let carbsConsumed = 0
  let fatsConsumed = 0

  if (todayPlan?.meals) {
    todayPlan.meals.forEach((meal) => {
      caloriesConsumed += meal.nutrition?.calories || 0
      proteinConsumed += meal.nutrition?.protein || 0
      carbsConsumed += meal.nutrition?.carbs || 0
      fatsConsumed += meal.nutrition?.fat || 0
    })
  }

  // Get targets from meal plan if available, otherwise from profile
  const dailyCalories =
    activePlan?.dailyCalories || nutritionTargets?.dailyCalories || 2000
  const proteinTarget =
    activePlan?.dailyMacros?.protein || nutritionTargets?.macros?.protein || 150
  const carbsTarget =
    activePlan?.dailyMacros?.carbs || nutritionTargets?.macros?.carbs || 200
  const fatsTarget =
    activePlan?.dailyMacros?.fat || nutritionTargets?.macros?.fat || 65

  // Calculate percentages
  const caloriesPercentage = Math.min(
    (caloriesConsumed / dailyCalories) * 100,
    100,
  )
  const proteinPercentage = Math.min(
    (proteinConsumed / proteinTarget) * 100,
    100,
  )
  const carbsPercentage = Math.min((carbsConsumed / carbsTarget) * 100, 100)
  const fatsPercentage = Math.min((fatsConsumed / fatsTarget) * 100, 100)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Today's Tracking
      </h2>

      {/* Today's Tracking - Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Calories Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
                <Flame className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Calories</h3>
                <p className="text-gray-900" style={{ fontSize: '20px' }}>
                  {Math.round(caloriesConsumed)}
                </p>
              </div>
            </div>
            <CircularProgress
              percentage={caloriesPercentage}
              color="#10b981"
              size={60}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Target: {dailyCalories}</span>
            <span className="text-emerald-600 font-medium">
              {Math.round(caloriesPercentage)}%
            </span>
          </div>
        </div>

        {/* Protein Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Protein</h3>
                <p className="text-gray-900" style={{ fontSize: '20px' }}>
                  {Math.round(proteinConsumed)}g
                </p>
              </div>
            </div>
            <CircularProgress
              percentage={proteinPercentage}
              color="#3b82f6"
              size={60}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Target: {proteinTarget}g</span>
            <span className="text-blue-600 font-medium">
              {Math.round(proteinPercentage)}%
            </span>
          </div>
        </div>

        {/* Carbs Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
                <Utensils className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Carbs</h3>
                <p className="text-gray-900" style={{ fontSize: '20px' }}>
                  {Math.round(carbsConsumed)}g
                </p>
              </div>
            </div>
            <CircularProgress
              percentage={carbsPercentage}
              color="#a855f7"
              size={60}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Target: {carbsTarget}g</span>
            <span className="text-purple-600 font-medium">
              {Math.round(carbsPercentage)}%
            </span>
          </div>
        </div>

        {/* Fats Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Droplets className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Fats</h3>
                <p className="text-gray-900" style={{ fontSize: '20px' }}>
                  {Math.round(fatsConsumed)}g
                </p>
              </div>
            </div>
            <CircularProgress
              percentage={fatsPercentage}
              color="#f59e0b"
              size={60}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Target: {fatsTarget}g</span>
            <span className="text-amber-600 font-medium">
              {Math.round(fatsPercentage)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
