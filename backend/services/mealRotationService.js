/// just a sample _temporery now_ would be deleted after implementing the AI
/// this an AI generated logivc to choose the fitting meals for the user

export class MealRotationService {
  constructor(mealsDB) {
    this.mealsDB = mealsDB

    this.used = {
      breakfast: new Set(),
      lunch: new Set(),
      dinner: new Set(),
      snack: new Set(),
    }
  }

  // Get meals not used yet in this rotation
  getAvailableMeals(type) {
    if (!this.mealsDB[type] || !Array.isArray(this.mealsDB[type])) {
      console.warn(`Invalid meal type: ${type}`)
      return []
    }

    return this.mealsDB[type].filter(
      (meal) => meal && meal.id !== undefined && !this.used[type].has(meal.id),
    )
  }

  // Mark a meal as used
  markUsed(type, mealId) {
    this.used[type].add(mealId)
  }

  // Reset rotation if all meals have been used
  resetIfExhausted(type) {
    const totalMeals = this.mealsDB[type].length
    const usedMeals = this.used[type].size

    if (usedMeals >= totalMeals) {
      this.used[type].clear()
    }
  }

  // Pick a random meal from available meals
  pickRandomMeal(type) {
    if (!this.mealsDB[type]) {
      console.error(`Invalid meal type: ${type}`)
      return null
    }

    this.resetIfExhausted(type)

    const available = this.getAvailableMeals(type)

    if (available.length === 0) {
      console.warn(`No available meals for type: ${type}`)
      return null
    }

    const randomIndex = Math.floor(Math.random() * available.length)
    const chosen = available[randomIndex]

    if (!chosen?.id) {
      console.error('Chosen meal has no valid ID', chosen)
      return null
    }

    this.markUsed(type, chosen.id)

    return chosen
  }
}
