/**
 * Meal Plan Utilities
 * backend/utils/mealPlanUtils.js
 *
 * Utility functions for meal plan generation and nutrition calculations.
 * Extracted from mealPlanService.js to avoid circular imports.
 */

import { mealTemplatesTier1 } from '../data/mealTier1-500-600.js'
import { mealTemplatesTier2 } from '../data/mealTier2-600-900.js'
import { mealTemplatesTier3 } from '../data/mealTier3-900-1200.js'
import { calculateBMR, calculateTDEE } from './nutritionCalculations.js'

/**
 * Determine which meal tier to use based on calories per meal
 *
 * @param {number} dailyCalories - Total daily calorie target
 * @param {number} mealsPerDay - Number of meals per day
 * @returns {object} Tier info with templates and calorie range
 */
export function selectMealTier(dailyCalories, mealsPerDay) {
  const caloriesPerMeal = dailyCalories / mealsPerDay

  // Tier 1: 500-600 cal/meal (4-5+ meals/day)
  if (caloriesPerMeal <= 600) {
    return {
      tier: 1,
      templates: mealTemplatesTier1,
      minCalories: 500,
      maxCalories: 600,
      name: 'Tier 1 (500-600 cal/meal)',
    }
  }
  // Tier 2: 600-900 cal/meal (3 meals/day)
  else if (caloriesPerMeal <= 900) {
    return {
      tier: 2,
      templates: mealTemplatesTier2,
      minCalories: 600,
      maxCalories: 900,
      name: 'Tier 2 (600-900 cal/meal)',
    }
  }
  // Tier 3: 900-1200 cal/meal (2 meals/day)
  else {
    return {
      tier: 3,
      templates: mealTemplatesTier3,
      minCalories: 900,
      maxCalories: 1200,
      name: 'Tier 3 (900-1200 cal/meal)',
    }
  }
}

/**
 * Adjust calories based on user goal
 *
 * Goals:
 * - maintain_weight: no change
 * - lose_weight: -500 calories/day (0.5 kg/week loss)
 * - gain_weight: +500 calories/day (0.5 kg/week gain)
 * - build_muscle: +500 calories/day (muscle building surplus)
 *
 * @param {number} tdee - Total daily energy expenditure
 * @param {string} goal - User's goal
 * @returns {number} Adjusted daily calorie target
 */
export function adjustCaloriesForGoal(tdee, goal) {
  const adjustments = {
    maintain_weight: 0,
    lose_weight: -500,
    gain_weight: 500,
    build_muscle: 500,
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
export function calculateMacroTargets(dailyCalories, goal) {
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

/**
 * Select a single meal for a specific category
 * NOTE: This function is deprecated - use tier-based template selection instead
 * Kept for backward compatibility with mealGenerationStrategy.js
 *
 * @deprecated Use generateTemplateMealPlan with tier templates instead
 */
export function selectMealForCategory(params) {
  throw new Error(
    'selectMealForCategory is deprecated. Use generateTemplateMealPlan with tier templates instead.',
  )
}

/**
 * Calculate total nutrition for a day of meals
 *
 * @param {array} meals - Array of meal objects
 * @returns {object} Total nutrition {calories, protein, carbs, fat}
 */
export function calculateDayNutrition(meals) {
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
export function calculateMacroPercentages(nutrition) {
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
export function validateNutrition(actual, target, tolerance = 0.1) {
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
export function generatePlanNutritionSummary(planData, targets) {
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

/**
 * Generate a meal plan using templates (fallback/fast generation)
 * NOW WITH TIER SYSTEM: Automatically selects correct calorie tier
 * AND ALLERGEN FILTERING: Filters meals based on user allergens
 * AND GOAL-BASED CALORIE SCALING: Ensures daily totals match target
 *
 * @param {number} planDuration - Number of days (3-30)
 * @param {number} mealPerDay - Meals per day (2-6)
 * @param {string} foodType - 'veg', 'nonveg', or 'both'
 * @param {number} dailyCalories - Daily calorie target (for tier selection)
 * @param {array} allergens - Array of allergens to avoid (e.g., ['dairy', 'gluten'])
 * @param {string} goal - User's goal for calorie tolerance (maintenance, weight-loss, etc.)
 * @returns {Object} - Meal plan structure with days array
 */
export function generateTemplateMealPlan(
  planDuration,
  mealPerDay,
  foodType,
  dailyCalories = 2000,
  allergens = [],
  goal = 'maintenance',
) {
  try {
    // 🎯 SELECT THE RIGHT TIER based on calories per meal
    const tierInfo = selectMealTier(dailyCalories, mealPerDay)
    const mealTemplatesFromTier = tierInfo.templates

    console.log(
      `🎯 Using ${tierInfo.name} for ${dailyCalories} cal/day with ${mealPerDay} meals`,
    )
    console.log(
      `📊 Target per meal: ${Math.round(dailyCalories / mealPerDay)} cal (${tierInfo.minCalories}-${tierInfo.maxCalories} cal range)`,
    )

    // Normalize allergens: remove 'none' and filter empty strings
    const normalizedAllergens = allergens
      ? allergens.filter((a) => a && a !== 'none' && a.trim() !== '')
      : []

    if (normalizedAllergens.length > 0) {
      console.log(
        `🚫 Filtering meals to avoid: ${normalizedAllergens.join(', ')}`,
      )
    }

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'].slice(
      0,
      mealPerDay,
    )
    const days = []

    // Track used meals to maximize variety (avoid repeats within 3 days)
    const recentMeals = new Set()
    const varietyWindow = Math.min(3, planDuration)

    for (let dayNum = 1; dayNum <= planDuration; dayNum++) {
      const dayMeals = []

      for (const mealType of mealTypes) {
        // Determine diet type for this meal
        const dietType =
          foodType === 'both'
            ? Math.random() > 0.5
              ? 'veg'
              : 'non-veg'
            : foodType === 'nonveg'
              ? 'non-veg'
              : foodType

        // Get meals from the correct tier and diet type
        const availableMeals =
          mealTemplatesFromTier[dietType]?.[mealType] ||
          mealTemplatesFromTier.veg?.[mealType] ||
          []

        if (availableMeals.length === 0) {
          console.warn(
            `⚠️  No meals found for ${dietType}/${mealType} in ${tierInfo.name}`,
          )
          continue
        }

        // 🚫 FILTER OUT MEALS WITH ALLERGENS
        let filteredMeals = availableMeals
        if (normalizedAllergens.length > 0) {
          filteredMeals = availableMeals.filter((meal) => {
            // Check if meal has allergens property
            if (!meal.allergens) return true // If no allergens specified, include meal

            // Handle both array and string formats
            const mealAllergensList = Array.isArray(meal.allergens)
              ? meal.allergens
              : [meal.allergens]

            // Check if meal contains 'none' allergen - safe for all
            if (
              mealAllergensList.includes('none') ||
              mealAllergensList.includes('[]')
            ) {
              return true
            }

            // Check if any of the user's allergens are in the meal
            const hasAllergen = normalizedAllergens.some((userAllergen) =>
              mealAllergensList.some((mealAllergen) =>
                mealAllergen.toLowerCase().includes(userAllergen.toLowerCase()),
              ),
            )

            return !hasAllergen // Include meal only if it doesn't have user's allergens
          })

          // If filtering removed all meals, fall back to unfiltered list with warning
          if (filteredMeals.length === 0) {
            console.warn(
              `⚠️  All meals filtered out for ${dietType}/${mealType}. Using unfiltered list.`,
            )
            filteredMeals = availableMeals
          }
        }

        // Filter out recently used meals for variety
        const freshMeals = filteredMeals.filter(
          (meal) => !recentMeals.has(meal.dishName),
        )
        const mealsToChooseFrom =
          freshMeals.length > 0 ? freshMeals : filteredMeals

        // Select random meal
        const randomMeal =
          mealsToChooseFrom[
            Math.floor(Math.random() * mealsToChooseFrom.length)
          ]

        if (!randomMeal) {
          console.error(`❌ Failed to select meal for ${dietType}/${mealType}`)
          continue
        }

        dayMeals.push({
          type: mealType,
          dishName: randomMeal.dishName || 'Unknown Dish',
          description: randomMeal.description || '',
          nutrition: randomMeal.nutrition || {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
          keyIngredients: randomMeal.keyIngredients || [],
          cookingMethod: randomMeal.cookingMethod || 'Prepared',
        })

        // Track for variety
        recentMeals.add(randomMeal.dishName)
        if (recentMeals.size > varietyWindow * mealPerDay) {
          // Remove oldest meal from tracking
          const firstMeal = Array.from(recentMeals)[0]
          recentMeals.delete(firstMeal)
        }
      }

      // 🎯 Scale day to match target daily calories based on goal
      const { scaledMeals, totalNutrition } = scaleDayToTargetCalories(
        dayMeals,
        dailyCalories,
        goal,
      )

      days.push({
        dayNumber: dayNum,
        meals: scaledMeals,
        totalNutrition,
      })
    }

    return {
      days,
      meta: {
        tierUsed: tierInfo.tier,
        tierName: tierInfo.name,
        calorieRangePerMeal: `${tierInfo.minCalories}-${tierInfo.maxCalories}`,
      },
    }
  } catch (error) {
    console.error('❌ Error in generateTemplateMealPlan:', error)
    console.error('Stack:', error.stack)
    throw new Error(`Template meal plan generation failed: ${error.message}`)
  }
}

/**
 * Scale meal nutrition to target calorie range
 * @param {Object} meal - Meal object with nutrition
 * @param {number} targetCalories - Target calories for this meal
 * @returns {Object} - Meal with adjusted nutrition
 */
export function scaleMealToTarget(meal, targetCalories) {
  const currentCalories = meal.nutrition?.calories || 500

  // If meal is already close (within 15%), don't scale
  const variance = Math.abs(currentCalories - targetCalories) / targetCalories
  if (variance <= 0.15) {
    return meal
  }

  // Calculate scaling factor
  const scaleFactor = targetCalories / currentCalories

  return {
    ...meal,
    nutrition: {
      calories: Math.round(meal.nutrition.calories * scaleFactor),
      protein: Math.round(meal.nutrition.protein * scaleFactor),
      carbs: Math.round(meal.nutrition.carbs * scaleFactor),
      fat: Math.round(meal.nutrition.fat * scaleFactor),
    },
  }
}

/**
 * Get calorie tolerance based on user's goal
 *
 * @param {string} goal - User's goal (maintenance, weight-loss, weight-gain, build_muscle)
 * @returns {Object} - Tolerance settings { minPercent, maxPercent, description }
 */
export function getCalorieToleranceForGoal(goal) {
  const normalizedGoal = goal?.toLowerCase().replace(/_/g, '-') || 'maintenance'

  switch (normalizedGoal) {
    case 'weight-loss':
    case 'lose-weight':
      // Weight loss: Allow slightly under target, not over
      return {
        minPercent: -0.05, // Can be 5% under (helps weight loss)
        maxPercent: 0.02, // Max 2% over target
        description: 'Weight loss tolerance (strict upper limit)',
      }
    case 'weight-gain':
    case 'gain-weight':
    case 'build-muscle':
      // Muscle/weight gain: Allow slightly over target, not under
      return {
        minPercent: -0.02, // Max 2% under target
        maxPercent: 0.08, // Can be 8% over (helps muscle building)
        description: 'Muscle gain tolerance (strict lower limit)',
      }
    case 'maintenance':
    case 'maintain-weight':
    default:
      // Maintenance: Tight tolerance both ways (±3.5% ≈ ±100 cal for 2800 cal diet)
      return {
        minPercent: -0.035, // ~100 cal under for 2800 cal diet
        maxPercent: 0.035, // ~100 cal over for 2800 cal diet
        description: 'Maintenance tolerance (±100 calories)',
      }
  }
}

/**
 * Scale all meals in a day to match target daily calories
 *
 * @param {Array} meals - Array of meal objects
 * @param {number} targetDailyCalories - Target calories for the day
 * @param {string} goal - User's goal for tolerance calculation
 * @returns {Object} - { scaledMeals, totalNutrition, wasScaled }
 */
export function scaleDayToTargetCalories(meals, targetDailyCalories, goal) {
  // Calculate current total
  const currentTotal = meals.reduce(
    (sum, meal) => sum + (meal.nutrition?.calories || 0),
    0,
  )

  if (currentTotal === 0) {
    return {
      scaledMeals: meals,
      totalNutrition: calculateDayNutrition(meals),
      wasScaled: false,
    }
  }

  // Get tolerance for this goal
  const tolerance = getCalorieToleranceForGoal(goal)
  const minAllowed = targetDailyCalories * (1 + tolerance.minPercent)
  const maxAllowed = targetDailyCalories * (1 + tolerance.maxPercent)

  // Check if scaling is needed
  const isWithinTolerance =
    currentTotal >= minAllowed && currentTotal <= maxAllowed

  if (isWithinTolerance) {
    return {
      scaledMeals: meals,
      totalNutrition: calculateDayNutrition(meals),
      wasScaled: false,
    }
  }

  // Calculate scaling factor to hit target exactly
  const scaleFactor = targetDailyCalories / currentTotal

  console.log(
    `   🔧 Scaling day from ${currentTotal} to ${targetDailyCalories} cal (factor: ${scaleFactor.toFixed(3)})`,
  )

  // Scale all meals proportionally
  const scaledMeals = meals.map((meal) => ({
    ...meal,
    nutrition: {
      calories: Math.round((meal.nutrition?.calories || 0) * scaleFactor),
      protein: Math.round((meal.nutrition?.protein || 0) * scaleFactor),
      carbs: Math.round((meal.nutrition?.carbs || 0) * scaleFactor),
      fat: Math.round((meal.nutrition?.fat || 0) * scaleFactor),
    },
  }))

  return {
    scaledMeals,
    totalNutrition: calculateDayNutrition(scaledMeals),
    wasScaled: true,
  }
}

/**
 * Validate and fix AI-generated meal plan
 * NOW WITH GOAL-BASED CALORIE SCALING to match daily targets!
 *
 * @param {Object} aiResult - Raw AI output
 * @param {number} planDuration - Expected number of days
 * @param {number} mealPerDay - Expected meals per day
 * @param {string} foodType - Diet preference
 * @param {number} dailyCalories - Daily calorie target for tier selection
 * @param {array} allergens - Array of allergens to avoid (for fallback)
 * @param {string} goal - User's goal for tolerance calculation (maintenance, weight-loss, etc.)
 * @returns {Object} - Validated meal plan
 */
export function validateAndFixMealPlan(
  aiResult,
  planDuration,
  mealPerDay,
  foodType,
  dailyCalories = 2000,
  allergens = [],
  goal = 'maintenance',
) {
  if (!aiResult?.days || !Array.isArray(aiResult.days)) {
    console.warn('Invalid AI result structure, using template fallback')
    return generateTemplateMealPlan(
      planDuration,
      mealPerDay,
      foodType,
      dailyCalories,
      allergens,
      goal, // Pass goal to fallback
    )
  }

  // 🎯 Get tier info and tolerance for this goal
  const tierInfo = selectMealTier(dailyCalories, mealPerDay)
  const tolerance = getCalorieToleranceForGoal(goal)
  const targetCaloriesPerMeal = Math.round(dailyCalories / mealPerDay)

  console.log(`🎯 Validating AI meals for goal: "${goal}"`)
  console.log(`   Daily target: ${dailyCalories} cal`)
  console.log(
    `   Per-meal target: ${targetCaloriesPerMeal} cal (${tierInfo.name})`,
  )
  console.log(
    `   Tolerance: ${(tolerance.minPercent * 100).toFixed(1)}% to +${(tolerance.maxPercent * 100).toFixed(1)}%`,
  )

  const validatedDays = []
  let totalScaledDays = 0

  for (let i = 0; i < planDuration; i++) {
    const day = aiResult.days[i]

    if (!day || !day.meals || day.meals.length !== mealPerDay) {
      console.warn(`Day ${i + 1} invalid, generating template day`)
      const templateDay = generateTemplateMealPlan(
        1,
        mealPerDay,
        foodType,
        dailyCalories,
        allergens,
        goal, // Pass goal to fallback
      ).days[0]
      validatedDays.push({
        ...templateDay,
        dayNumber: i + 1,
      })
    } else {
      // 🎯 Scale entire day to match target daily calories based on goal
      const { scaledMeals, totalNutrition, wasScaled } =
        scaleDayToTargetCalories(day.meals, dailyCalories, goal)

      if (wasScaled) {
        totalScaledDays++
      }

      validatedDays.push({
        dayNumber: i + 1,
        meals: scaledMeals,
        totalNutrition,
      })
    }
  }

  if (totalScaledDays > 0) {
    console.log(
      `✅ Scaled ${totalScaledDays}/${planDuration} days to match calorie target`,
    )
  }

  return { days: validatedDays }
}
