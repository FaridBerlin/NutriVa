import { useState, useEffect } from 'react'
import { useDietTracker } from '../context/DietTrackerContext'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import Sidebar from '../components/Sidebar/Sidebar'

export default function DietTrackerPage() {
  const {
    activeTracker,
    loading: trackerLoading,
    error: trackerError,
    createTracker,
    markMealAsEaten,
    undoMeal,
    fetchActiveTracker,
  } = useDietTracker()

  const {
    activePlan,
    allPlans,
    loading: planLoading,
    fetchLatestPlan,
    fetchAllPlans,
  } = useAiMealPlan()

  const [selectedDay, setSelectedDay] = useState(1)
  const [actionLoading, setActionLoading] = useState(false)
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null)

  useEffect(() => {
    fetchLatestPlan()
    fetchAllPlans()
    fetchActiveTracker()
  }, [])

  useEffect(() => {
    if (activeTracker) {
      setSelectedDay(activeTracker.currentDay)
    }
  }, [activeTracker])

  const handleCreateTracker = async (mealPlanId) => {
    if (!mealPlanId) {
      alert('Please select a meal plan first!')
      return
    }

    setActionLoading(true)
    const result = await createTracker(mealPlanId)
    setActionLoading(false)

    if (!result.success) {
      alert(result.error)
    } else {
      setSelectedMealPlanId(null) // Reset selection
    }
  }

  const handleToggleMeal = async (mealId, isEaten) => {
    setActionLoading(true)

    const result = isEaten
      ? await undoMeal(selectedDay, mealId)
      : await markMealAsEaten(selectedDay, mealId)

    setActionLoading(false)

    if (!result.success) {
      alert(result.error)
    }
  }

  const handleClearOrphanedTracker = () => {
    // Clear the orphaned tracker from state to show the meal plan selector
    setShowOrphanedError(false)
    fetchActiveTracker() // This will set activeTracker to null if tracker is orphaned
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  // No active tracker - show meal plan selector
  if (!activeTracker) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full">
            <div className="text-6xl mb-4 text-center">📊</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              No Active Diet Tracker
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Select a meal plan to start tracking your diet and monitor your
              progress!
            </p>

            {allPlans.length === 0 ? (
              <p className="text-sm text-red-600 mb-4 text-center">
                ⚠️ Please create a meal plan first before starting tracking
              </p>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Select a Meal Plan to Track:
                </h3>
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {allPlans.map((plan) => (
                    <div
                      key={plan._id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMealPlanId === plan._id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedMealPlanId(plan._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-800">
                              {plan.name}
                            </h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {plan.planType}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {plan.dietPreference}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              {plan.days?.length || 0} days •{' '}
                              {plan.mealsPerDay || 0} meals/day
                            </p>
                            {plan.dietaryRestrictions?.length > 0 && (
                              <p className="flex items-center gap-1">
                                🛡️ {plan.dietaryRestrictions.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                        {selectedMealPlanId === plan._id && (
                          <div className="ml-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">✓</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  onClick={() => handleCreateTracker(selectedMealPlanId)}
                  disabled={actionLoading || !selectedMealPlanId}
                >
                  {actionLoading
                    ? 'Creating...'
                    : 'Create Tracker for Selected Plan'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Get AI meal plan data
  const aiMealPlan = activeTracker.aiMealPlanId

  // Safety check - if meal plan is missing (shouldn't happen now with backend fix)
  if (!aiMealPlan || !aiMealPlan.days || !Array.isArray(aiMealPlan.days)) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Invalid Meal Plan Data
            </h2>
            <p className="text-gray-600 mb-6">
              The meal plan data is corrupted or incomplete. Please create a new
              meal plan.
            </p>
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentDay = aiMealPlan.days.find((d) => d.dayNumber === selectedDay)
  const currentDayTracker = activeTracker.dailyTrackers.find(
    (d) => d.dayNumber === selectedDay,
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Diet Tracker</h1>
            <p className="text-gray-600">{aiMealPlan.planName}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600">Current Day</div>
              <div className="text-2xl font-bold text-blue-600">
                {activeTracker.currentDay} / {activeTracker.totalDays}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600">Streak</div>
              <div className="text-2xl font-bold text-orange-600">
                {activeTracker.streak} days 🔥
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600">Adherence Score</div>
              <div className="text-2xl font-bold text-green-600">
                {activeTracker.adherenceScore}%
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600">Overall Progress</div>
              <div className="text-2xl font-bold text-purple-600">
                {activeTracker.overallCompletionPercentage}%
              </div>
            </div>
          </div>

          {/* Day Selector */}
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {aiMealPlan.days.map((day) => {
                const dayTracker = activeTracker.dailyTrackers.find(
                  (t) => t.dayNumber === day.dayNumber,
                )
                const completionPercentage =
                  dayTracker?.completionPercentage || 0

                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDay(day.dayNumber)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedDay === day.dayNumber
                        ? 'bg-blue-600 text-white'
                        : completionPercentage === 100
                          ? 'bg-green-100 text-green-800'
                          : completionPercentage > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Day {day.dayNumber}
                    {completionPercentage > 0 && (
                      <span className="ml-1 text-xs">
                        ({completionPercentage}%)
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Day Progress */}
          {currentDayTracker && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">
                Day {selectedDay} Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Meals</div>
                  <div className="text-lg font-bold">
                    {currentDayTracker.mealsCompleted} /{' '}
                    {currentDayTracker.totalMeals}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="text-lg font-bold">
                    {Math.round(currentDayTracker.consumed.calories)} /{' '}
                    {Math.round(currentDayTracker.target.calories)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Protein</div>
                  <div className="text-lg font-bold">
                    {Math.round(currentDayTracker.consumed.protein)}g /{' '}
                    {Math.round(currentDayTracker.target.protein)}g
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Carbs</div>
                  <div className="text-lg font-bold">
                    {Math.round(currentDayTracker.consumed.carbs)}g /{' '}
                    {Math.round(currentDayTracker.target.carbs)}g
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Completion</div>
                  <div className="text-lg font-bold text-green-600">
                    {currentDayTracker.completionPercentage}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Meals List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">
              Meals for Day {selectedDay}
            </h3>

            {!currentDay && (
              <p className="text-gray-600">
                Day {selectedDay} data not available yet
              </p>
            )}

            {currentDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentDay.meals.map((meal) => {
                  const mealInTracker = currentDayTracker?.meals.find(
                    (m) => m.mealId === meal._id.toString(),
                  )
                  const isEaten = mealInTracker?.isEaten || false

                  return (
                    <div
                      key={meal._id}
                      onClick={() =>
                        !actionLoading && handleToggleMeal(meal._id, isEaten)
                      }
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        isEaten
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      } ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs text-gray-500 uppercase font-medium">
                            {meal.type}
                          </div>
                          <h4 className="font-bold text-lg text-gray-800">
                            {meal.dishName}
                          </h4>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isEaten ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          {isEaten && (
                            <span className="text-white text-lg">✓</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {meal.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {Math.round(meal.nutrition.calories)} cal
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                          P: {Math.round(meal.nutrition.protein)}g
                        </span>
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          C: {Math.round(meal.nutrition.carbs)}g
                        </span>
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                          F: {Math.round(meal.nutrition.fat)}g
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
