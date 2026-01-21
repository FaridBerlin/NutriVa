import React, { useState, useEffect } from 'react'
import { useAiMealPlan } from '../context/aiMealPlanContext'
import AiDietPlannerForm from '../components/AiDietPlannerForm'
import Card from '../components/ui/Card'
import { Calendar, Utensils, Plus, Loader2 } from 'lucide-react'

const AiDietPlannerPage = () => {
  const { activePlan, loading, setActivePlan } = useAiMealPlan()
  const [selectedDay, setSelectedDay] = useState(1)
  const [showForm, setShowForm] = useState(false)

  const handlePlanGenerated = (newPlan) => {
    setActivePlan(newPlan)
    setSelectedDay(1)
    setShowForm(false)
  }

  // Get current day data directly from activePlan
  const currentDayData = activePlan?.days?.find(
    (day) => day.dayNumber === selectedDay
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-accentYellow">
              Create Your Meal Plan
            </h1>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 dark:text-accentYellow/80 hover:text-gray-800 px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
          </div>
          <AiDietPlannerForm
            onPlanGenerated={handlePlanGenerated}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>
    )
  }

  if (!activePlan) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-screen-md mx-auto text-center">
          <Card className="p-8 sm:p-12" noHover>
            <Utensils className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-accentYellow mb-2">
              No Meal Plan Yet
            </h2>
            <p className="text-muted dark:text-accentYellow/80 mb-6">
              Create your first personalized meal plan to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Meal Plan
            </button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-accentYellow capitalize">
              {activePlan.planName}
            </h1>
            <p className="text-muted dark:text-accentYellow/80">
              {activePlan.planDuration} days • {activePlan.dailyCalories} cal/day
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Plan
          </button>
        </div>

        {/* Day Selector */}
        <Card className="mb-6" noHover>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
            {Array.from({ length: activePlan.planDuration }, (_, i) => i + 1).map(
              (day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap ${
                    selectedDay === day
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-accentYellow dark:hover:bg-gray-600'
                  }`}
                >
                  Day {day}
                </button>
              ),
            )}
          </div>
        </Card>

        {/* Meals */}
        {currentDayData && (
          <div 
            key={selectedDay}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr animate-fadeIn"
          >
            {currentDayData.meals.map((meal, index) => (
              <Card
                key={index}
                className="h-full flex flex-col justify-between p-6 animate-slideUp"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase">
                      {meal.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-accentYellow mt-1">
                      {meal.dishName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {meal.nutrition?.calories || 0}
                    </div>
                    <div className="text-xs text-muted">calories</div>
                  </div>
                </div>
                <p className="text-muted dark:text-accentYellow/80 text-sm mb-4 flex-1 overflow-hidden">
                  {meal.description}
                </p>

                {meal.nutrition && (
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700 dark:text-accentYellow/80">
                        {meal.nutrition.protein}g
                      </div>
                      <div className="text-xs text-muted">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700 dark:text-accentYellow/80">
                        {meal.nutrition.carbs}g
                      </div>
                      <div className="text-xs text-muted">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700 dark:text-accentYellow/80">
                        {meal.nutrition.fat}g
                      </div>
                      <div className="text-xs text-muted">Fat</div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AiDietPlannerPage
