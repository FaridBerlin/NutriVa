// This file requires mealDatabase.js
// Make sure it's in: backend/data/mealDatabase.js

/**
 * Meal Plan Service - Core Business Logic
 * backend/services/mealPlanService.js
 *
 * Generates personalized meal plans based on user profile and preferences
 * Handles:
 * - BMR/TDEE calculations
 * - Smart meal selection with variety
 * - Nutrition validation
 * - Multi-day plan generation
 */

import mealDatabase from '../data/mealDatabase.js'

// ============================================================================
// BMR & TDEE CALCULATIONS
// ============================================================================

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Formula
 * More accurate than Harris-Benedict for modern populations
 *
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories
 */
function calculateBMR(weight, height, age, gender) {
  let bmr

  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else if (gender.toLowerCase() === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  } else {
    throw new Error('Gender must be "male" or "female"')
  }

  return bmr
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * Multiplies BMR by activity factor
 *
 * Activity levels:
 * - sedentary: 1.2 (little/no exercise)
 * - light: 1.375 (1-3 days/week)
 * - moderate: 1.55 (3-5 days/week)
 * - active: 1.725 (6-7 days/week)
 * - veryActive: 1.9 (2x per day)
 *
 * @param {number} bmr - Basal metabolic rate
 * @param {string} activityLevel - Activity level
 * @returns {number} TDEE in calories
 */
function calculateTDEE(bmr, activityLevel) {
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9,
  }

  const factor = activityFactors[activityLevel.toLowerCase()]
  if (!factor) {
    throw new Error(
      `Activity level must be one of: ${Object.keys(activityFactors).join(', ')}`,
    )
  }

  return bmr * factor
}

/**
 * Adjust calories based on user goal
 *
 * Goals:
 * - maintenance: no change
 * - weightLoss: -500 calories/day (0.5 kg/week loss)
 * - weightGain: +500 calories/day (0.5 kg/week gain)
 * - aggressive_loss: -750 calories/day (1 kg/week loss)
 * - aggressive_gain: +750 calories/day (1 kg/week gain)
 *
 * @param {number} tdee - Total daily energy expenditure
 * @param {string} goal - User's goal
 * @returns {number} Adjusted daily calorie target
 */
function adjustCaloriesForGoal(tdee, goal) {
  const adjustments = {
    maintenance: 0,
    weightloss: -500,
    weightgain: 500,
    aggressive_loss: -750,
    aggressive_gain: 750,
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
 * - weightLoss: 40% protein, 40% carbs, 20% fat
 * - weightGain: 30% protein, 50% carbs, 20% fat
 * - maintenance: 30% protein, 45% carbs, 25% fat
 *
 * @param {number} dailyCalories - Daily calorie target
 * @param {string} goal - User's goal
 * @returns {object} Macro targets {protein, carbs, fat}
 */
function calculateMacroTargets(dailyCalories, goal) {
  let macroSplit

  switch (goal.toLowerCase()) {
    case 'weightLoss':
    case 'aggressive_loss':
      // High protein for satiety and muscle preservation
      macroSplit = { protein: 0.4, carbs: 0.4, fat: 0.2 }
      break
    case 'weightGain':
    case 'aggressive_gain':
      // Higher carbs for energy and muscle building
      macroSplit = { protein: 0.3, carbs: 0.5, fat: 0.2 }
      break
    case 'maintenance':
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
async function generateMealPlan(params) {
  const {
    userId, // Required: User ID
    planName = 'My Meal Plan', // Optional: Plan name
    duration = 7, // Days (1-30)
    mealsPerDay = 3, // Meals per day (2-6)

    // User profile (required for calorie calculations)
    weight, // kg
    height, // cm
    age, // years
    gender, // 'male' or 'female'
    activityLevel = 'moderate', // sedentary, light, moderate, active, veryActive
    goal = 'maintenance', // maintenance, weightLoss, weightGain, etc

    // Meal preferences
    dietType = 'all', // veg, non-veg, all
    allergens = [], // array of allergens to avoid
    cuisinePreference, // optional: preferred cuisine
    foodRestrictions = [], // optional: foods to avoid
  } = params

  // Validate required parameters
  if (!userId) throw new Error('userId is required')
  if (!weight || !height || !age || !gender) {
    throw new Error('User profile (weight, height, age, gender) is required')
  }

  // Validate plan parameters
  if (duration < 1 || duration > 30) {
    throw new Error('Duration must be between 1 and 30 days')
  }

  if (mealsPerDay < 2 || mealsPerDay > 6) {
    throw new Error('Meals per day must be between 2 and 6')
  }

  // Step 1: Calculate calorie and macro targets
  const bmr = calculateBMR(weight, height, age, gender)
  const tdee = calculateTDEE(bmr, activityLevel)
  const dailyCalories = adjustCaloriesForGoal(tdee, goal)
  const macroTargets = calculateMacroTargets(dailyCalories, goal)

  // Calculate calorie per meal (distributed by meal type)
  const calorieDistribution = {
    breakfast: dailyCalories * 0.25,
    lunch: dailyCalories * 0.35,
    dinner: dailyCalories * 0.3,
    snack: dailyCalories * 0.1, // Only if mealsPerDay > 3
  }

  // Step 2: Generate meals for each day
  const mealPlan = {
    userId,
    planName,
    duration,
    mealsPerDay,
    createdAt: new Date(),

    // Nutrition targets
    nutritionTargets: {
      dailyCalories: Math.round(dailyCalories),
      dailyMacros: {
        protein: macroTargets.protein,
        carbs: macroTargets.carbs,
        fat: macroTargets.fat,
      },
      userMetrics: {
        weight,
        height,
        age,
        gender,
        activityLevel,
        goal,
        bmr,
        tdee,
      },
    },

    // Generated plan
    days: [],
  }

  // Track used meals for variety (across all days and categories)
  const usedMealIds = []

  // Generate meals for each day
  for (let day = 1; day <= duration; day++) {
    const dayMeals = []

    try {
      // Select Breakfast
      const breakfast = selectMealForCategory({
        category: 'breakfast',
        dietType: dietType === 'all' ? undefined : dietType,
        allergens,
        usedMealIds,
        calorieTarget: calorieDistribution.breakfast,
        cuisine: cuisinePreference,
      })
      dayMeals.push(breakfast)
      usedMealIds.push(breakfast.id)

      // Select Lunch
      const lunch = selectMealForCategory({
        category: 'lunch',
        dietType: dietType === 'all' ? undefined : dietType,
        allergens,
        usedMealIds,
        calorieTarget: calorieDistribution.lunch,
        cuisine: cuisinePreference,
      })
      dayMeals.push(lunch)
      usedMealIds.push(lunch.id)

      // Select Dinner
      const dinner = selectMealForCategory({
        category: 'dinner',
        dietType: dietType === 'all' ? undefined : dietType,
        allergens,
        usedMealIds,
        calorieTarget: calorieDistribution.dinner,
        cuisine: cuisinePreference,
      })
      dayMeals.push(dinner)
      usedMealIds.push(dinner.id)

      // Select Snacks if needed (mealsPerDay > 3)
      if (mealsPerDay > 3) {
        for (let snackCount = mealsPerDay - 3; snackCount > 0; snackCount--) {
          const snack = selectMealForCategory({
            category: 'snack',
            dietType: dietType === 'all' ? undefined : dietType,
            allergens,
            usedMealIds,
            calorieTarget: calorieDistribution.snack / (mealsPerDay - 3),
            cuisine: cuisinePreference,
          })
          dayMeals.push(snack)
          usedMealIds.push(snack.id)
        }
      }

      // Calculate day nutrition
      const dayNutrition = calculateDayNutrition(dayMeals)
      const macroPercentages = calculateMacroPercentages(dayNutrition)

      // Validate day nutrition against daily targets
      const validation = validateNutrition(dayNutrition, {
        calories: dailyCalories,
        protein: macroTargets.protein,
        carbs: macroTargets.carbs,
        fat: macroTargets.fat,
      })

      // Add day to plan
      mealPlan.days.push({
        dayNumber: day,
        date: new Date(new Date().setDate(new Date().getDate() + day - 1)),
        meals: dayMeals,
        totalNutrition: dayNutrition,
        macroPercentages,
        nutritionValidation: validation,
      })
    } catch (error) {
      throw new Error(
        `Failed to generate meals for day ${day}: ${error.message}`,
      )
    }
  }

  // Step 3: Generate plan-level summary
  mealPlan.nutritionSummary = generatePlanNutritionSummary(mealPlan, {
    dailyCalories,
    protein: macroTargets.protein,
    carbs: macroTargets.carbs,
    fat: macroTargets.fat,
  })

  // Step 4: Generate warnings if needed
  mealPlan.warnings = []
  if (mealPlan.nutritionSummary.averageCalorieVariance < -200) {
    mealPlan.warnings.push(
      'Plan is significantly lower in calories than target',
    )
  }
  if (mealPlan.nutritionSummary.averageCalorieVariance > 200) {
    mealPlan.warnings.push(
      'Plan is significantly higher in calories than target',
    )
  }
  if (mealPlan.nutritionSummary.macroPercentages.proteinPercent < 20) {
    mealPlan.warnings.push('Protein percentage is lower than recommended')
  }

  return mealPlan
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // BMR/TDEE calculations
  calculateBMR,
  calculateTDEE,
  adjustCaloriesForGoal,
  calculateMacroTargets,

  // Meal selection
  selectMealForCategory,

  // Nutrition calculations
  calculateDayNutrition,
  calculateMacroPercentages,
  validateNutrition,
  generatePlanNutritionSummary,

  // Main function
  generateMealPlan,
}
