export const MEAL_TIMES = {
  breakfast: { start: 6, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
  snacks: { start: 10, end: 20 },
}

export const getMealTimeStatus = (category, isEaten) => {
  if (isEaten) return 'completed'

  const hour = new Date().getHours()
  const window = MEAL_TIMES[category?.toLowerCase()] // Add optional chaining

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
  
  return meals.map(meal => {
    // Handle both Mongoose documents and plain objects
    const mealObj = meal.toObject ? meal.toObject() : { ...meal }
    
    return {
      ...mealObj,
      timingStatus: getMealTimeStatus(mealObj.category, mealObj.isEaten),
    }
  })
}
