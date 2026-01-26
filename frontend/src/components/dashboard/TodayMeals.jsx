import { Brain, Utensils, CheckCircle, Clock } from 'lucide-react'
import { useAiMealPlan } from '../../context/aiMealPlanContext'
import { useProfile } from '../../context/ProfileContext'
import Card from '../ui/Card'

export default function TodayMeals() {
  const { activePlan } = useAiMealPlan()
  const { profile } = useProfile()

  console.log(`the active plan:`, activePlan?.planName, activePlan)
  // Calculate current day from profile creation date
  const getCurrentDay = () => {
    if (activePlan?.createdAt) {
      const created = new Date(activePlan.createdAt)
      const now = new Date()
      const diffMs = now - created
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      return Math.max(1, Math.min(diffDays + 1, activePlan?.duration || 30))
    }
    return 1
  }

  // Fixed meal times based on type
  const getMealTime = (mealType) => {
    const mealTimes = {
      breakfast: '8:00 AM',
      lunch: '12:30 PM',
      snack: '3:30 PM',
      dinner: '6:30 PM',
    }
    return mealTimes[mealType?.toLowerCase()] || 'Not set'
  }

  // Check if meal time has passed
  const hasMealTimePassed = (mealType) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTime = currentHour * 60 + currentMinutes // Convert to minutes

    const mealTimesInMinutes = {
      breakfast: 8 * 60, // 8:00 AM = 480 minutes
      lunch: 12 * 60 + 30, // 12:30 PM = 750 minutes
      snack: 15 * 60 + 30, // 3:30 PM = 930 minutes
      dinner: 18 * 60 + 30, // 6:30 PM = 1110 minutes
    }

    const mealTimeMinutes = mealTimesInMinutes[mealType?.toLowerCase()]
    return mealTimeMinutes ? currentTime > mealTimeMinutes : false
  }

  const currentDay = getCurrentDay()
  const todayMealPlan = activePlan?.days?.find(
    (d) => d.dayNumber === currentDay,
  )

  // Prepare today's meals
  const todayMeals = (todayMealPlan?.meals || []).map((meal) => ({
    id: meal._id,
    type: meal.type || 'Meal',
    name: meal.dishName || 'Unnamed meal',
    time: getMealTime(meal.type),
    calories: Math.round(meal.nutrition?.calories || 0),
    protein: Math.round(meal.nutrition?.protein || 0),
    carbs: Math.round(meal.nutrition?.carbs || 0),
    fats: Math.round(meal.nutrition?.fat || 0),
    isPast: hasMealTimePassed(meal.type),
  }))

  // If no active plan
  if (!activePlan) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-textDark mb-2">
          No Active Meal Plan
        </h3>
        <p className="text-textLight">
          Create your first AI-powered meal plan to get started!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-textDark dark:text-white mb-6">
        Today's Meals
      </h2>

      {/* Today's AI Meal Plan */}
      <Card noHover className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 capitalize">
              <span className="inline-flex items-center px-0.5 py-0.5 text-base font-bold  text-primary dark:text-white uppercase">
                {activePlan?.planName || 'health plan'}
              </span>{' '}
              Plan
            </h2>
            <p className="text-muted text-base dark:text-gray-300">
              Day {currentDay} - {todayMeals.length} meals scheduled
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-1 dark:bg-emerald-500/20 dark:text-emerald-300">
              <Brain size={14} />
              AI Generated
            </div>
          </div>
        </div>

        {todayMeals.length > 0 ? (
          <div className="space-y-3">
            {todayMeals.map((meal) => (
              <Card
                key={meal.id}
                noHover
                className={`p-4 border-2 transition-all ${
                  meal.isPast
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        meal.isPast ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      {meal.isPast ? (
                        <CheckCircle className="text-white" size={20} />
                      ) : (
                        <Clock className="text-white" size={20} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm uppercase tracking-wide font-medium text-muted dark:text-gray-300">
                          {meal.type}
                        </span>
                        <span className="text-muted">•</span>
                        <span className="text-sm text-muted dark:text-gray-300">
                          {meal.time}
                        </span>
                      </div>
                      <h4 className="text-gray-900 font-medium text-lg dark:text-white">
                        {meal.name}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-gray-900 font-semibold text-base dark:text-white">
                      {meal.calories} cal
                    </div>
                    <div className="text-muted text-sm dark:text-gray-300">
                      P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fats}g
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-textLight">No meals scheduled for today</p>
          </div>
        )}
      </Card>
    </div>
  )
}
