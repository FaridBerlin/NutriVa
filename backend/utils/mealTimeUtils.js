export const MEAL_TIMES = {
  breakfast: { start: 6, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
  snacks: { start: 10, end: 20 },
}

export const getMealTimeStatus = (category, isEaten) => {
  if (isEaten) return 'completed'

  const hour = new Date().getHours()
  const window = MEAL_TIMES[category]

  if (!window) return 'anytime'

  if (hour < window.start) return 'upcoming'
  if (hour > window.end) return 'missed'
  return 'active'
}

/**
 * Add timing status to meals of a day
 */
export const enrichMealsWithTimingStatus = (meals) => {
  return meals.map(meal => ({
    ...meal.toObject(),
    timingStatus: getMealTimeStatus(meal.category, meal.isEaten),
  }))
}