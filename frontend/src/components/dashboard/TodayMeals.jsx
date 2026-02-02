import { Brain, Utensils, CheckCircle, Clock } from 'lucide-react'
import { useAiMealPlan } from '../../context/aiMealPlanContext'
import { useDietTracker } from '../../context/DietTrackerContext'
import { useProfile } from '../../context/ProfileContext'
import Card from '../ui/Card'

export default function TodayMeals() {
  const { activePlan } = useAiMealPlan()
  const { activeTracker } = useDietTracker()
  const { profile } = useProfile()

  console.log(`the active plan:`, activePlan?.planName, activePlan)

  // Get current day from activeTracker, or calculate from plan creation date
  const getCurrentDay = () => {
    if (activeTracker?.currentDay) {
      return activeTracker.currentDay
    }

    // Fallback: calculate from plan creation date
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
    image: meal.image,
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 capitalize">
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
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  meal.isPast
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-300 dark:from-emerald-950/30 dark:to-emerald-900/20 dark:border-emerald-700'
                    : 'bg-white border-2 border-gray-200 hover:border-primary/40 dark:bg-gray-900 dark:border-gray-700'
                }`}
              >
                {/* Status Badge - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                      meal.isPast
                        ? 'bg-emerald-500 ring-4 ring-emerald-200 dark:ring-emerald-800'
                        : 'bg-orange-400 ring-4 ring-orange-100 dark:ring-orange-900'
                    }`}
                  >
                    {meal.isPast ? (
                      <CheckCircle className="text-white" size={18} />
                    ) : (
                      <Clock className="text-white" size={18} />
                    )}
                  </div>
                </div>

                {/* Responsive Container: Stack on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative h-32 sm:h-40 md:h-auto md:w-48 lg:w-56 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    {meal.image ? (
                      <img
                        src={meal.image}
                        alt={meal.dishName}
                        className="w-full h-full object-cover lg:object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          if (!e.target.dataset.errorHandled) {
                            e.target.dataset.errorHandled = 'true'
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 dark:from-accentYellow/20 dark:to-accentYellow/10"
                      style={{ display: meal.image ? 'none' : 'flex' }}
                    >
                      <div className="text-center">
                        <Utensils className="w-12 h-12 mx-auto mb-2 text-primary/50 dark:text-accentYellow/50" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Healthy Meal
                        </p>
                      </div>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                    {/* Calories Badge - Bottom Left of Image */}
                    <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                      <span className="text-primary/80 font-bold text-sm sm:text-base dark:text-primary">
                        {meal.calories} cal
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      {/* Meal Type & Time */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded">
                          {meal.type}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {meal.time}
                        </span>
                      </div>

                      {/* Meal Name */}
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        {meal.name}
                      </h4>
                    </div>

                    {/* Macros Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Protein - Blue #3b82f6 */}
                      <div className="bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 rounded-lg p-2 text-center border border-[#3b82f6]/20 dark:border-[#3b82f6]/30">
                        <div className="text-xs text-[#3b82f6] dark:text-[#60a5fa] font-medium mb-0.5">
                          Protein
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {meal.protein}g
                        </div>
                      </div>

                      {/* Carbs - Purple #a855f7 */}
                      <div className="bg-[#a855f7]/10 dark:bg-[#a855f7]/20 rounded-lg p-2 text-center border border-[#a855f7]/20 dark:border-[#a855f7]/30">
                        <div className="text-xs text-[#a855f7] dark:text-[#c084fc] font-medium mb-0.5">
                          Carbs
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {meal.carbs}g
                        </div>
                      </div>

                      {/* Fats - Amber #f59e0b */}
                      <div className="bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20 rounded-lg p-2 text-center border border-[#f59e0b]/20 dark:border-[#f59e0b]/30">
                        <div className="text-xs text-[#f59e0b] dark:text-[#fbbf24] font-medium mb-0.5">
                          Fats
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {meal.fats}g
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`h-1 ${
                    meal.isPast
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-primary to-primary/50'
                  }`}
                />
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
