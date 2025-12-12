/**
 * Meal Plan Service - Core Business Logic
 * backend/services/mealPlanService.js
 *
 * Now uses Strategy Pattern for meal generation.
 * Supports multiple generation strategies: mock data, AI models, external APIs.
 *
 * Architecture:
 * - mealGenerationStrategy.js: Abstract strategy and implementations
 * - mealGeneratorConfig.js: Configuration and factory
 * - This file: Orchestrates the generation process
 */

import mealDatabase from '../data/mealDatabase.js'
import mealGeneratorConfig from '../config/mealGeneratorConfig.js'
import { calculateBMR, calculateTDEE } from '../utils/nutritionCalculations.js'

// ============================================================================
// BMR & TDEE CALCULATIONS (Imported from utils)
// ============================================================================

// Note: calculateBMR and calculateTDEE are now imported from ../utils/nutritionCalculations.js

/**
 * Adjust calories based on user goal
 *
 * Goals:
 * - maintain_weight: no change
 * - lose_weight: -500 calories/day (0.5 kg/week loss)
 * - gain_weight: +500 calories/day (0.5 kg/week gain)
 * - build_muscle: +300 calories/day (muscle building surplus)
 *
 * @param {number} tdee - Total daily energy expenditure
 * @param {string} goal - User's goal
 * @returns {number} Adjusted daily calorie target
 */
function adjustCaloriesForGoal(tdee, goal) {
  const adjustments = {
    maintain_weight: 0,
    lose_weight: -500,
    gain_weight: 500,
    build_muscle: 300,
  }

  const adjustment = adjustments[goal.toLowerCase()]
  if (adjustment === undefined) {
    throw new Error(
      `Goal must be one of: ${Object.keys(adjustments).join(', ')}`,
    )
  }

  // Ensure minimum 1200 calories (safety floor)
  return Math.max(tdee + adjustment, 1200)
}

/**
 * Calculate macro targets based on goal
 *
 * Macro splits by goal:
 * - lose_weight: 40% protein, 40% carbs, 20% fat
 * - gain_weight: 30% protein, 50% carbs, 20% fat
 * - build_muscle: 35% protein, 45% carbs, 20% fat
 * - maintain_weight: 30% protein, 45% carbs, 25% fat
 *
 * @param {number} dailyCalories - Daily calorie target
 * @param {string} goal - User's goal
 * @returns {object} Macro targets {protein, carbs, fat}
 */
function calculateMacroTargets(dailyCalories, goal) {
  let macroSplit

  switch (goal.toLowerCase()) {
    case 'lose_weight':
      // High protein for satiety and muscle preservation
      macroSplit = { protein: 0.4, carbs: 0.4, fat: 0.2 }
      break
    case 'gain_weight':
      // Higher carbs for energy and muscle building
      macroSplit = { protein: 0.3, carbs: 0.5, fat: 0.2 }
      break
    case 'build_muscle':
      // Very high protein for muscle growth
      macroSplit = { protein: 0.35, carbs: 0.45, fat: 0.2 }
      break
    case 'maintain_weight':
    default:
      // Balanced split
      macroSplit = { protein: 0.3, carbs: 0.45, fat: 0.25 }
  }

  return {
    protein: Math.round((dailyCalories * macroSplit.protein) / 4), // 4 cal/g
    carbs: Math.round((dailyCalories * macroSplit.carbs) / 4), // 4 cal/g
    fat: Math.round((dailyCalories * macroSplit.fat) / 9), // 9 cal/g
  }
}

// ============================================================================
// MEAL SELECTION LOGIC
// ============================================================================

/**
 * Select a single meal for a specific category
 * Applies all filters and ensures variety
 *
 * @param {object} params - Selection parameters
 * @returns {object} Selected meal or throws error
 */
function selectMealForCategory(params) {
  const {
    category, // breakfast, lunch, dinner, snack
    dietType, // veg, non-veg
    allergens = [], // array of allergen strings
    usedMealIds = [], // array of meal IDs to exclude
    calorieTarget, // optional: target calories
    cuisine, // optional: preferred cuisine
  } = params

  try {
    // Step 1: Get all meals in category
    let meals = mealDatabase.getMealsByCategory(category)

    if (!meals || meals.length === 0) {
      throw new Error(`No meals found for category: ${category}`)
    }

    // Step 2: Filter by diet type
    if (dietType) {
      meals = mealDatabase.filterByDietType(meals, dietType)
      if (meals.length === 0) {
        throw new Error(`No ${dietType} meals available for ${category}`)
      }
    }

    // Step 3: CRITICAL - Filter by allergens
    if (allergens && allergens.length > 0) {
      meals = mealDatabase.filterByAllergens(meals, allergens)
      if (meals.length === 0) {
        throw new Error(
          `No safe meals available for ${category} with allergies: ${allergens.join(', ')}`,
        )
      }
    }

    // Step 4: Optional - Filter by cuisine preference
    if (cuisine) {
      const cuisineFiltered = mealDatabase.filterByCuisine(meals, cuisine)
      // Only use cuisine filter if it leaves options
      if (cuisineFiltered.length > 0) {
        meals = cuisineFiltered
      }
      // Otherwise continue with all meals
    }

    // Step 5: Optional - Filter by calorie target
    if (calorieTarget && calorieTarget > 0) {
      const tolerance = 50 // ±50 calories
      const mealsByCalorie = mealDatabase.getByCalorieRange(
        meals,
        calorieTarget - tolerance,
        calorieTarget + tolerance,
      )

      // Only apply if we have options, otherwise use all
      if (mealsByCalorie.length > 0) {
        meals = mealsByCalorie
      }
    }

    // Step 6: Get random meal without repeats
    const selected = mealDatabase.getRandomMeals(meals, 1, usedMealIds)

    if (!selected || selected.length === 0) {
      throw new Error(
        `Could not select meal for ${category} - all options exhausted`,
      )
    }

    return selected[0]
  } catch (error) {
    throw new Error(`Meal selection failed for ${category}: ${error.message}`)
  }
}

// ============================================================================
// NUTRITION CALCULATIONS
// ============================================================================

/**
 * Calculate total nutrition for a day of meals
 *
 * @param {array} meals - Array of meal objects
 * @returns {object} Total nutrition {calories, protein, carbs, fat}
 */
function calculateDayNutrition(meals) {
  if (!meals || meals.length === 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0 }
  }

  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.nutrition.calories,
      protein: total.protein + meal.nutrition.protein,
      carbs: total.carbs + meal.nutrition.carbs,
      fat: total.fat + meal.nutrition.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

/**
 * Calculate macro percentages from nutrition data
 *
 * @param {object} nutrition - Nutrition object {calories, protein, carbs, fat}
 * @returns {object} Percentages {proteinPercent, carbsPercent, fatPercent}
 */
function calculateMacroPercentages(nutrition) {
  const { calories, protein, carbs, fat } = nutrition

  if (calories === 0) {
    return { proteinPercent: 0, carbsPercent: 0, fatPercent: 0 }
  }

  const proteinCals = protein * 4
  const carbsCals = carbs * 4
  const fatCals = fat * 9

  return {
    proteinPercent: Math.round((proteinCals / calories) * 100),
    carbsPercent: Math.round((carbsCals / calories) * 100),
    fatPercent: Math.round((fatCals / calories) * 100),
  }
}

/**
 * Validate if nutrition meets targets within tolerance
 *
 * @param {object} actual - Actual nutrition {calories, protein, carbs, fat}
 * @param {object} target - Target nutrition {calories, protein, carbs, fat}
 * @param {number} tolerance - Tolerance percentage (default 10%)
 * @returns {object} Validation result with warnings
 */
function validateNutrition(actual, target, tolerance = 0.1) {
  const warnings = []
  const tolerance_amount = (value) => value * tolerance

  // Check calories
  if (actual.calories < target.calories - tolerance_amount(target.calories)) {
    warnings.push(
      `Calories under target: ${Math.round(actual.calories)} / ${Math.round(target.calories)}`,
    )
  } else if (
    actual.calories >
    target.calories + tolerance_amount(target.calories)
  ) {
    warnings.push(
      `Calories over target: ${Math.round(actual.calories)} / ${Math.round(target.calories)}`,
    )
  }

  // Check protein
  if (actual.protein < target.protein - tolerance_amount(target.protein)) {
    warnings.push(
      `Protein under target: ${Math.round(actual.protein)}g / ${Math.round(target.protein)}g`,
    )
  } else if (
    actual.protein >
    target.protein + tolerance_amount(target.protein)
  ) {
    warnings.push(
      `Protein over target: ${Math.round(actual.protein)}g / ${Math.round(target.protein)}g`,
    )
  }

  // Check carbs
  if (actual.carbs < target.carbs - tolerance_amount(target.carbs)) {
    warnings.push(
      `Carbs under target: ${Math.round(actual.carbs)}g / ${Math.round(target.carbs)}g`,
    )
  } else if (actual.carbs > target.carbs + tolerance_amount(target.carbs)) {
    warnings.push(
      `Carbs over target: ${Math.round(actual.carbs)}g / ${Math.round(target.carbs)}g`,
    )
  }

  // Check fat
  if (actual.fat < target.fat - tolerance_amount(target.fat)) {
    warnings.push(
      `Fat under target: ${Math.round(actual.fat)}g / ${Math.round(target.fat)}g`,
    )
  } else if (actual.fat > target.fat + tolerance_amount(target.fat)) {
    warnings.push(
      `Fat over target: ${Math.round(actual.fat)}g / ${Math.round(target.fat)}g`,
    )
  }

  return {
    isValid: warnings.length === 0,
    warnings: warnings,
    variances: {
      calories: actual.calories - target.calories,
      protein: actual.protein - target.protein,
      carbs: actual.carbs - target.carbs,
      fat: actual.fat - target.fat,
    },
  }
}

/**
 * Generate nutrition summary for entire meal plan
 *
 * @param {object} planData - Plan with days array
 * @param {object} targets - Daily targets
 * @returns {object} Plan summary with totals and averages
 */
function generatePlanNutritionSummary(planData, targets) {
  const plan = planData.days

  // Calculate totals across all days
  const totals = plan.reduce(
    (sum, day) => ({
      calories: sum.calories + day.totalNutrition.calories,
      protein: sum.protein + day.totalNutrition.protein,
      carbs: sum.carbs + day.totalNutrition.carbs,
      fat: sum.fat + day.totalNutrition.fat,
      days: sum.days + 1,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, days: 0 },
  )

  // Calculate averages
  const averages = {
    calories: Math.round(totals.calories / totals.days),
    protein: Math.round(totals.protein / totals.days),
    carbs: Math.round(totals.carbs / totals.days),
    fat: Math.round(totals.fat / totals.days),
  }

  // Calculate macro percentages for the plan
  const planMacroPercentages = calculateMacroPercentages({
    calories: averages.calories,
    protein: averages.protein,
    carbs: averages.carbs,
    fat: averages.fat,
  })

  return {
    totalDays: totals.days,
    planTotals: {
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein),
      carbs: Math.round(totals.carbs),
      fat: Math.round(totals.fat),
    },
    dailyAverages: averages,
    macroPercentages: planMacroPercentages,
    validationSummary: {
      averageCalorieVariance: Math.round(
        averages.calories - targets.dailyCalories,
      ),
      averageProteinVariance: Math.round(averages.protein - targets.protein),
      averageCarbsVariance: Math.round(averages.carbs - targets.carbs),
      averageFatVariance: Math.round(averages.fat - targets.fat),
    },
  }
}

// ============================================================================
// MAIN MEAL PLAN GENERATION
// ============================================================================

/**
 * Generate personalized meal plan
 * Main entry point for meal plan generation
 *
 * @param {object} params - Generation parameters
 * @returns {object} Complete meal plan with nutrition data
 */
/**
 * Generate a personalized meal plan using the configured strategy
 * @param {object} params - Generation parameters
 * @returns {Promise<object>} Generated meal plan
 */
async function generateMealPlan(params) {
  try {
    // Get the configured meal generator
    const generator = mealGeneratorConfig.getMealGenerator()

    // Log which generator is being used (helpful for debugging)
    const config = mealGeneratorConfig.getGeneratorConfig()
    console.log(`🔄 Generating meal plan using ${config.type} strategy`)

    // Delegate to the strategy
    const mealPlan = await generator.generate(params)

    console.log(`✅ Meal plan generated successfully with ${mealPlan.days.length} days`)
    return mealPlan

  } catch (error) {
    console.error('❌ Meal plan generation failed:', error.message)
    throw new Error(`Meal plan generation failed: ${error.message}`)
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Main generation function (now uses strategy pattern)
  generateMealPlan,

  // Utility functions (used by MockMealGenerator)
  calculateBMR, // Imported from utils
  calculateTDEE, // Imported from utils
  adjustCaloriesForGoal,
  calculateMacroTargets,
  selectMealForCategory,
  calculateDayNutrition,
  calculateMacroPercentages,
  validateNutrition,
  generatePlanNutritionSummary,

  // Configuration access
  getGeneratorConfig: mealGeneratorConfig.getGeneratorConfig,
}
