import mealsDB from '../data/mealDatabase.js'
import MealRotationService from '../services/mealRotationService.js'

/// just a sample _temporery now_ would be deleted after implementing the AI
/// this an AI generated logivc to choose the fitting meals for the user

const rotation = new MealRotationService(mealsDB)

export function selectMealsForDay(params) {
  try {
    const {
      dailyCalories,
      mealsPerDay = 4,
      dietType,
      allergens = [],
      excludeMealIds = [],
      cuisinePreference,
    } = params

    // 1. VALIDATION
    const minCaloriesNeeded = 150 * mealsPerDay

    if (!dailyCalories || dailyCalories < minCaloriesNeeded) {
      console.warn(
        `Invalid dailyCalories: ${dailyCalories}. Must be at least ${minCaloriesNeeded} for ${mealsPerDay} meals.`,
      )
      return safeReturn()
    }

    if (![1, 2, 3, 4].includes(mealsPerDay)) {
      console.warn(`invalid mealsPerDay: ${mealsPerDay}`)
      return safeReturn()
    }

    // 2. WHICH MEALS TO PICK
    const mealPlanMap = {
      1: ['lunch'],
      2: ['lunch', 'dinner'],
      3: ['breakfast', 'lunch', 'dinner'],
      4: ['breakfast', 'lunch', 'dinner', 'snack'],
    }

    const mealOrder = mealPlanMap[mealsPerDay]

    // 3. DYNAMIC CALORIE SPLIT
    const defaultSplit = {
      breakfast: 0.25,
      lunch: 0.35,
      dinner: 0.35,
      snack: 0.05,
    }

    const selectedMealsSplit = mealOrder.reduce((acc, m) => {
      acc[m] = defaultSplit[m]
      return acc
    }, {})

    // normalize splits for selected meals
    const totalWeight = Object.values(selectedMealsSplit).reduce(
      (a, b) => a + b,
      0,
    )

    const calorieDistribution = {}
    for (const m of mealOrder) {
      calorieDistribution[m] =
        dailyCalories * (selectedMealsSplit[m] / totalWeight)
    }

    // 4. MEAL PICKER FUNCTION
    function pickMeal(type, targetCalories) {
      try {
        if (!mealsDB[type] || !Array.isArray(mealsDB[type])) {
          console.error(`Invalid meal type: ${type}`)
          return null
        }

        const tolerance = 50
        const min = targetCalories - tolerance
        const max = targetCalories + tolerance

        // Unused meals (rotation)
        const unused = rotation.getAvailableMeals(type) || []

        // Apply filters
        let filtered = unused
          .filter((m) => m && m.id != null)
          .filter((m) => !excludeMealIds.includes(m.id))
          // .filter((m) =>
          //   dietType === 'veg'
          //     ? m.isVeg
          //     : dietType === 'vegan'
          //       ? m.isVegan
          //       : true,
          // )
          .filter((m) => dietType === 'veg' ? m.dietType === 'veg' : dietType === 'vegan' ? m.dietType === 'vegan' : true)
          .filter(
            (m) =>
              allergens.length === 0 ||
              !m.allergens?.some((a) => allergens.includes(a)),
          )
          .filter((m) =>
            cuisinePreference ? m.cuisine === cuisinePreference : true,
          )

        if (filtered.length === 0) {
          console.warn(`No meals match filters for ${type}`)
          return null
        }

        // Try calorie match
        let matches = filtered.filter(
          (m) => m.calories >= min && m.calories <= max,
        )

        if (matches.length === 0) {
          console.warn(`No calorie match for ${type}. Using fallback.`)
          matches = filtered
        }

        const chosen = matches[Math.floor(Math.random() * matches.length)]

        rotation.markUsed(type, chosen.id)

        return chosen
      } catch (err) {
        console.error(`Error selecting meal for ${type}:`, err)
        return null
      }
    }

    // 5. PICK MEALS BASED ON ORDER
    const result = {}

    for (const mealType of mealOrder) {
      result[mealType] = pickMeal(mealType, calorieDistribution[mealType])
    }

    // Compute total calories
    const totalCalories = mealOrder.reduce(
      (sum, m) => sum + (result[m]?.calories || 0),
      0,
    )

    return {
      ...result,
      totalCalories,
      mealsPerDay,
    }
  } catch (err) {
    console.error('Critical error in selectMealsForDay:', err)
    return safeReturn()
  }
}

// Safe fallback return for error scenarios
function safeReturn() {
  return {
    breakfast: null,
    lunch: null,
    dinner: null,
    snack: null,
    totalCalories: 0,
  }
}
