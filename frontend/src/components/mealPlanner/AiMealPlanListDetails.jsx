export default function AiMealPlanListDetails({ plan, onBack }) {
  if (!plan) return null

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-purple-600 hover:underline"
      >
        ← Back to AI meal plans
      </button>

      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{plan.planName}</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-600 text-white font-semibold">
          AI
        </span>
      </div>

      {/* Plan Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
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
        <div className="bg-white border rounded-lg p-4">
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
          <div key={day.dayNumber} className="space-y-4">
            <h3 className="font-bold text-xl text-gray-800 mb-4">
              Day {day.dayNumber}
            </h3>

            {/* Meals */}
            <div className="grid grid-cols-1 gap-4">
              {day.meals.map((meal, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  {/* Header with meal type and calories */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-semibold text-teal-600 uppercase">
                        {meal.type}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mt-1">
                        {meal.dishName}
                      </h3>
                    </div>
                    {meal.nutrition && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">
                          {meal.nutrition.calories}
                        </div>
                        <div className="text-xs text-gray-500">calories</div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {meal.description}
                  </p>

                  {/* Key Ingredients */}
                  {meal.keyIngredients && meal.keyIngredients.length > 0 && (
                    <p className="text-xs text-gray-500 mb-4">
                      🥘 {meal.keyIngredients.join(', ')}
                    </p>
                  )}

                  {/* Macros Grid */}
                  {meal.nutrition && (
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-700">
                          {meal.nutrition.protein}g
                        </div>
                        <div className="text-xs text-gray-500">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-700">
                          {meal.nutrition.carbs}g
                        </div>
                        <div className="text-xs text-gray-500">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-700">
                          {meal.nutrition.fat}g
                        </div>
                        <div className="text-xs text-gray-500">Fat</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Day Total Nutrition */}
            {day.totalNutrition && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm font-semibold text-gray-700">
                  Day Total: {day.totalNutrition.calories} cal | P:{' '}
                  {day.totalNutrition.protein}g | C: {day.totalNutrition.carbs}g
                  | F: {day.totalNutrition.fat}g
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
