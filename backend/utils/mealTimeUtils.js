export const MEAL_TIMES = {
  breakfast: { start: 6, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
  snack: { start: 10, end: 20 },
}

// Categories arrive from the AiMealPlan enum ('Breakfast', 'Lunch', 'Dinner',
// 'Snack') but have also been stored in other shapes, so normalise both case
// and the singular/plural of "snack".
const normalizeCategory = (category) => {
  if (typeof category !== 'string') return ''
  const key = category.trim().toLowerCase()
  return key === 'snacks' ? 'snack' : key
}

export const getMealTimeStatus = (category, isEaten) => {
  if (isEaten) return 'completed'

  const hour = new Date().getHours()
  const window = MEAL_TIMES[normalizeCategory(category)]

  if (!window) return 'anytime'

  if (hour < window.start) return 'upcoming'
  if (hour > window.end) return 'missed'
  return 'active'
}

/**
 * Add timing status to meals of a day
 */
export const enrichMealsWithTimingStatus = (meals) => {
  if (!meals || !Array.isArray(meals)) return []

  return meals.map((meal) => {
    // Handle both Mongoose documents and plain objects
    const mealObj = meal.toObject ? meal.toObject() : { ...meal }

    return {
      ...mealObj,
      timingStatus: getMealTimeStatus(mealObj.category, mealObj.isEaten),
    }
  })
}
