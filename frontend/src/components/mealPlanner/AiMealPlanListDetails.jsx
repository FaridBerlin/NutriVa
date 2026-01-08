import { Coffee, Sun, Moon, Utensils } from 'lucide-react'
import { useState } from 'react'

export default function AiMealPlanListDetails({ plan, onBack }) {
  if (!plan) return null

  const [selectedMeal, setSelectedMeal] = useState(null)

  const mealIcons = {
    breakfast: <Coffee size={24} className="text-orange-500" />,
    lunch: <Sun size={24} className="text-yellow-500" />,
    dinner: <Moon size={24} className="text-indigo-500" />,
    snack: <Utensils size={24} className="text-green-500" />,
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        //className="text-sm text-purple-600 hover:underline"
        className="px-8 py-2.5 bg-gradient-to-r from-primary to-primaryDark 
                       text-white rounded-lg font-semibold hover:shadow-lg 
                       transition-all transform hover:scale-105 disabled:opacity-50"
      >
        ← Back to AI meal plans
      </button>

      {/* Title */}
      <div className="flex items-center gap-2 justify-center">
        <h2 className="text-2xl font-bold text-center capitalize">{plan.planName}</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-600 text-white font-semibold">
          AI
        </span>
      </div>


      {/* Plan Info */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-6 md:gap-8 text-lg px-4 md:px-6 text-center">
          <div>
            <span className="text-gray-600">Diet Type:</span>
            <span className="font-semibold ml-2 capitalize">
              {plan.foodType}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold ml-2">{plan.planDuration} days</span>
          </div>
          <div>
            <span className="text-gray-600">Meals/Day:</span>
            <span className="font-semibold ml-2">{plan.mealPerDay}</span>
          </div>
          <div>
            <span className="text-gray-600">Calories/Day:</span>
            <span className="font-semibold ml-2">
              {plan.dailyCalories} kcal
            </span>
          </div>

          {plan.allergens &&
            plan.allergens.length > 0 &&
            !plan.allergens.includes('none') && (
              <div className="col-span-2">
                <span className="text-gray-600">Restrictions:</span>
                <span className="font-semibold ml-2">
                  {plan.allergens.filter((a) => a !== 'none').join(', ')}
                </span>
              </div>
            )}
        </div>
      </div>

      {/* Daily Macros */}
      {plan.dailyMacros && (
        <div className="bg-green-100 border border-green-200  rounded-lg p-4">
          <h3 className="font-semibold mb-3">Daily Macros</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {plan.dailyMacros.protein}g
              </p>
              <p className="text-xs text-gray-600">Protein</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {plan.dailyMacros.carbs}g
              </p>
              <p className="text-xs text-gray-600">Carbs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {plan.dailyMacros.fat}g
              </p>
              <p className="text-xs text-gray-600">Fat</p>
            </div>
          </div>
        </div>
      )}

      {/* Days */}
      {plan.days &&
        plan.days.map((day) => (
          <div
            key={day.dayNumber}
            className="bg-gradient-to-r from-green-50 to-green-100 border-green-50 rounded-xl p-6 space-y-6 shadow-lg "
          >
            {/* Day Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Day {day.dayNumber}
              </h3>

              {day.totalNutrition && (
                <span className="text-sm font-semibold text-gray-600">
                  Total: {day.totalNutrition.calories} cal • P:{' '}
                  {day.totalNutrition.protein}g • C: {day.totalNutrition.carbs}g
                  • F: {day.totalNutrition.fat}g
                </span>
              )}
            </div>

            {/* Meals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {day.meals.map((meal, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMeal(meal)}
                >
                  {/* Meal Header */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {mealIcons[meal.type?.toLowerCase()] || (
                          <Utensils size={24} className="text-gray-400" />
                        )}
                        <span className="text-xs font-semibold uppercase text-gray-600">
                          {meal.type}
                        </span>
                      </div>

                      <h4 className="font-bold text-gray-800">
                        {meal.dishName}
                      </h4>
                    </div>

                    {meal.nutrition && (
                      <span className="text-sm font-semibold text-teal-600">
                        {meal.nutrition.calories} cal
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-2">
                    {meal.description}
                  </p>

                  {/* Ingredients */}
                  {meal.keyIngredients && meal.keyIngredients.length > 0 && (
                    <p className="text-xs text-gray-500 mb-3">
                      🥘 {meal.keyIngredients.join(', ')}
                    </p>
                  )}

                  {/* Macros */}
                  {meal.nutrition && (
                    <div className="grid grid-cols-3 text-center text-xs border-t pt-2">
                      <div>
                        <p className="font-semibold">
                          {meal.nutrition.protein}g
                        </p>
                        <p className="text-gray-500">Protein</p>
                      </div>
                      <div>
                        <p className="font-semibold">{meal.nutrition.carbs}g</p>
                        <p className="text-gray-500">Carbs</p>
                      </div>
                      <div>
                        <p className="font-semibold">{meal.nutrition.fat}g</p>
                        <p className="text-gray-500">Fat</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* selectedMeal */}

      {selectedMeal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="bg-white rounded-lg p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
            <div className="flex items-center gap-3 mb-6">
              {mealIcons[selectedMeal.type?.toLowerCase()] || (
                <Utensils size={32} className="text-gray-400" />
              )}
              <div>
                <span className="text-lg font-semibold uppercase text-gray-500 block">
                  {selectedMeal.type}
                </span>
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedMeal.dishName}
                </h2>
              </div>
            </div>


            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedMeal.description}
              </p>
            </div>

            {/* Nutrition Stats */}
            {selectedMeal.nutrition && (
              <div className="grid grid-cols-4 gap-4 text-center mb-6 bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                <div>
                  <p className="text-3xl font-bold text-teal-600">
                    {selectedMeal.nutrition.calories}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">Calories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    {selectedMeal.nutrition.protein}g
                  </p>
                  <p className="text-gray-600 text-sm font-medium">Protein</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">
                    {selectedMeal.nutrition.carbs}g
                  </p>
                  <p className="text-gray-600 text-sm font-medium">Carbs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    {selectedMeal.nutrition.fat}g
                  </p>
                  <p className="text-gray-600 text-sm font-medium">Fat</p>
                </div>
              </div>
            )}

            {/* Key Ingredients */}
            {selectedMeal.keyIngredients &&
              selectedMeal.keyIngredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                    🥘 Key Ingredients
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedMeal.keyIngredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-green-600">•</span>
                        <span className="capitalize">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Cooking Method */}
            {selectedMeal.cookingMethod && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                  👨‍🍳 Cooking Method
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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
          </div>
        </div>
      )}
    </div>
  )
}
