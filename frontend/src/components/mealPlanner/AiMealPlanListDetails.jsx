import Card from '../ui/Card'
import { Coffee, Sun, Moon, Utensils } from 'lucide-react'
import { useState } from 'react'

export default function AiMealPlanListDetails({ plan, onBack }) {
  // Hooks must run before any early return, otherwise React renders a
  // different number of hooks when `plan` flips between null and set.
  const [selectedMeal, setSelectedMeal] = useState(null)

  if (!plan) return null

  const mealIcons = {
    breakfast: <Coffee size={24} className="text-primary" />,
    lunch: <Sun size={24} className="text-primary" />,
    dinner: <Moon size={24} className="text-primary" />,
    snack: <Utensils size={24} className="text-primary" />,
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="px-8 py-2.5 bg-primary hover:bg-primaryDark text-white rounded-lg font-semibold transition-all disabled:opacity-50"
      >
        ← Back to AI meal plans
      </button>

      {/* Title */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center capitalize text-gray-800 dark:text-white">
          {plan.planName}
        </h2>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primaryDark text-white font-semibold text-xs uppercase tracking-wide shadow-md">
          AI Generated
        </span>
      </div>

      {/* Plan Info */}
      <Card
        noHover
        className="p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Diet Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-muted dark:text-gray-400 font-medium mb-2 uppercase tracking-wide">
              Diet Type
            </div>
            <div className="text-lg sm:text-xl font-bold text-primary dark:text-accentYellow capitalize">
              {plan.foodType}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-muted dark:text-gray-400 font-medium mb-2 uppercase tracking-wide">
              Duration
            </div>
            <div className="text-lg sm:text-xl font-bold text-primary dark:text-accentYellow">
              {plan.planDuration} days
            </div>
          </div>

          {/* Meals/Day */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-muted dark:text-gray-400 font-medium mb-2 uppercase tracking-wide">
              Meals/Day
            </div>
            <div className="text-lg sm:text-xl font-bold text-primary dark:text-accentYellow">
              {plan.mealPerDay}
            </div>
          </div>

          {/* Calories/Day */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow">
            <div className="text-xs sm:text-sm text-muted dark:text-gray-400 font-medium mb-2 uppercase tracking-wide">
              Calories/Day
            </div>
            <div className="text-lg sm:text-xl font-bold text-primary dark:text-accentYellow">
              {plan.dailyCalories} kcal
            </div>
          </div>

          {/* Restrictions - Full Width */}
          {plan.allergens &&
            plan.allergens.length > 0 &&
            !plan.allergens.includes('none') && (
              <div className="sm:col-span-2 lg:col-span-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                  <span className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    Dietary Restrictions:
                  </span>
                  <span className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200 capitalize">
                    {plan.allergens.filter((a) => a !== 'none').join(', ')}
                  </span>
                </div>
              </div>
            )}
        </div>
      </Card>

      {/* Daily Macros */}
      {plan.dailyMacros && (
        <Card
          noHover
          className="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
        >
          <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">
            Daily Macro Targets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Protein - Blue */}
            <div className="bg-gradient-to-br from-[#3b82f6]/10 to-[#3b82f6]/5 dark:from-[#3b82f6]/20 dark:to-[#3b82f6]/10 rounded-lg p-4 text-center border border-[#3b82f6]/30 dark:border-[#3b82f6]/40 hover:shadow-md transition-all">
              <div className="text-xs text-[#3b82f6] dark:text-[#60a5fa] font-semibold mb-2 uppercase tracking-wider">
                Protein
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#2563eb] dark:text-[#60a5fa]">
                {plan.dailyMacros.protein}
                <span className="text-base sm:text-lg ml-1">g</span>
              </div>
            </div>

            {/* Carbs - Purple */}
            <div className="bg-gradient-to-br from-[#a855f7]/10 to-[#a855f7]/5 dark:from-[#a855f7]/20 dark:to-[#a855f7]/10 rounded-lg p-4 text-center border border-[#a855f7]/30 dark:border-[#a855f7]/40 hover:shadow-md transition-all">
              <div className="text-xs text-[#a855f7] dark:text-[#c084fc] font-semibold mb-2 uppercase tracking-wider">
                Carbs
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#9333ea] dark:text-[#c084fc]">
                {plan.dailyMacros.carbs}
                <span className="text-base sm:text-lg ml-1">g</span>
              </div>
            </div>

            {/* Fats - Amber */}
            <div className="bg-gradient-to-br from-[#f59e0b]/10 to-[#f59e0b]/5 dark:from-[#f59e0b]/20 dark:to-[#f59e0b]/10 rounded-lg p-4 text-center border border-[#f59e0b]/30 dark:border-[#f59e0b]/40 hover:shadow-md transition-all">
              <div className="text-xs text-[#f59e0b] dark:text-[#fbbf24] font-semibold mb-2 uppercase tracking-wider">
                Fats
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#d97706] dark:text-[#fbbf24]">
                {plan.dailyMacros.fat}
                <span className="text-base sm:text-lg ml-1">g</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Days */}
      {plan.days &&
        plan.days.map((day) => (
          <Card
            noHover
            key={day.dayNumber}
            className="p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
          >
            {/* Day Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b-2 border-primary/20 dark:border-accentYellow/20">
              <div className="flex items-center gap-3">
                <div className="bg-primary dark:bg-accentYellow text-white dark:text-gray-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl">
                  {day.dayNumber}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Day {day.dayNumber}
                </h3>
              </div>

              {day.totalNutrition && (
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full font-semibold text-gray-700 dark:text-gray-200">
                    {day.totalNutrition.calories} cal
                  </span>
                  <span className="px-3 py-1.5 bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 rounded-full font-semibold text-[#3b82f6] dark:text-[#60a5fa]">
                    P: {day.totalNutrition.protein}g
                  </span>
                  <span className="px-3 py-1.5 bg-[#a855f7]/10 dark:bg-[#a855f7]/20 rounded-full font-semibold text-[#a855f7] dark:text-[#c084fc]">
                    C: {day.totalNutrition.carbs}g
                  </span>
                  <span className="px-3 py-1.5 bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20 rounded-full font-semibold text-[#f59e0b] dark:text-[#fbbf24]">
                    F: {day.totalNutrition.fat}g
                  </span>
                </div>
              )}
            </div>

            {/* Meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {day.meals.map((meal, index) => (
                <Card
                  key={index}
                  className="p-4 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col"
                  onClick={() => setSelectedMeal(meal)}
                >
                  {/* Meal Header */}
                  <div className="flex justify-between items-start mb-3 min-h-[64px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {mealIcons[meal.type?.toLowerCase()] || (
                          <Utensils size={20} className="text-gray-400" />
                        )}
                        <span className="text-xs font-bold uppercase text-primary dark:text-accentYellow tracking-wide">
                          {meal.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-base sm:text-lg text-gray-800 dark:text-white leading-tight line-clamp-1">
                        {meal.dishName}
                      </h4>
                    </div>
                    {meal.nutrition && (
                      <span className="text-sm sm:text-base font-bold text-primary dark:text-accentYellow bg-primary/10 dark:bg-accentYellow/10 px-2 py-1 rounded-lg h-fit">
                        {meal.nutrition.calories}
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-56 mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {meal.image ? (
                      <img
                        src={meal.image}
                        alt={meal.dishName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                        <Utensils className="w-16 h-16 mx-auto mb-2 text-primary/50 dark:text-accentYellow/50" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Healthy Meal
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted dark:text-gray-300 mb-3 line-clamp-2 flex-1">
                    {meal.description}
                  </p>

                  {/* Key Ingredients */}
                  {meal.keyIngredients && meal.keyIngredients.length > 0 && (
                    <p className="text-xs text-muted dark:text-gray-400 mb-3 line-clamp-1">
                      <Utensils className="w-3 h-3 inline mr-1 text-primary dark:text-accentYellow" />
                      {meal.keyIngredients.slice(0, 3).join(', ')}
                    </p>
                  )}

                  {/* Macros - Color Coded */}
                  {meal.nutrition && (
                    <div className="grid grid-cols-3 gap-2 mt-auto">
                      <div className="bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 rounded-lg p-2 text-center border border-[#3b82f6]/20">
                        <p className="text-xs font-bold text-[#3b82f6] dark:text-[#60a5fa]">
                          {meal.nutrition.protein}g
                        </p>
                        <p className="text-[10px] text-[#3b82f6]/70 dark:text-[#60a5fa]/70">
                          Protein
                        </p>
                      </div>
                      <div className="bg-[#a855f7]/10 dark:bg-[#a855f7]/20 rounded-lg p-2 text-center border border-[#a855f7]/20">
                        <p className="text-xs font-bold text-[#a855f7] dark:text-[#c084fc]">
                          {meal.nutrition.carbs}g
                        </p>
                        <p className="text-[10px] text-[#a855f7]/70 dark:text-[#c084fc]/70">
                          Carbs
                        </p>
                      </div>
                      <div className="bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20 rounded-lg p-2 text-center border border-[#f59e0b]/20">
                        <p className="text-xs font-bold text-[#f59e0b] dark:text-[#fbbf24]">
                          {meal.nutrition.fat}g
                        </p>
                        <p className="text-[10px] text-[#f59e0b]/70 dark:text-[#fbbf24]/70">
                          Fats
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        ))}

      {/* selectedMeal */}

      {selectedMeal && (
        <div
          className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMeal(null)}
        >
          <Card
            noHover
            className="rounded-lg p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-gray-200 dark:ring-accentYellow/20 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMeal(null)}
              className="float-right text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none"
            >
              ×
            </button>

            {/* Meal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {mealIcons[selectedMeal.type?.toLowerCase()] || (
                  <Utensils size={24} className="text-gray-400" />
                )}
                <span className="text-sm sm:text-base font-semibold uppercase text-gray-500 dark:text-accentYellow">
                  {selectedMeal.type}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                {selectedMeal.dishName}
              </h2>
            </div>
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {selectedMeal.image ? (
                <img
                  src={selectedMeal.image}
                  alt={selectedMeal.dishName}
                  className="w-full h-full object-cover sm:object-contain"
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
                style={{ display: selectedMeal.image ? 'none' : 'flex' }}
              >
                <div className="text-center">
                  <Utensils className="w-20 h-20 mx-auto mb-2 text-primary/50 dark:text-accentYellow/50" />
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Healthy Meal
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {selectedMeal.description}
              </p>
            </div>

            {/* Nutrition Stats */}
            {selectedMeal.nutrition && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center mb-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {selectedMeal.nutrition.calories}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                    Calories
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedMeal.nutrition.protein}g
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                    Protein
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {selectedMeal.nutrition.carbs}g
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                    Carbs
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                    {selectedMeal.nutrition.fat}g
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                    Fat
                  </p>
                </div>
              </div>
            )}

            {/* Key Ingredients */}
            {selectedMeal.keyIngredients &&
              selectedMeal.keyIngredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary dark:text-accentYellow" />
                    <span>Key Ingredients</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMeal.keyIngredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                      >
                        <span className="text-green-600 dark:text-green-400">
                          •
                        </span>
                        <span className="capitalize">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Cooking Method */}
            {selectedMeal.cookingMethod && (
              <div className="mb-6">
                <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary dark:text-accentYellow" />
                  <span>Cooking Method</span>
                </h3>
                <div className="bg-gray-50 dark:bg-slate-800 border-l-4 border-gray-200 dark:border-slate-700 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-accentYellow leading-relaxed whitespace-pre-line">
                    {selectedMeal.cookingMethod}
                  </p>
                </div>
              </div>
            )}

            {/* Meal Status*/}
            {selectedMeal.eaten !== undefined && (
              <div className="flex items-center gap-2 pt-4 border-t">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedMeal.eaten
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 py-4 px-4'
                  }`}
                >
                  {selectedMeal.eaten ? '✓ Completed' : 'Not yet eaten'}
                </span>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
