/**
 * Meal Plan Utilities V3 - ULTIMATE Meal Selection
 * backend/utils/mealPlanUtils3.js
 *
 * IMPROVEMENTS OVER V2:
 * - Realistic calorie distribution (25% breakfast, 35% lunch, 30% dinner, 10% snacks)
 * - Per-meal-type calorie targets (not equal distribution)
 * - Smart meal selection based on user metrics
 * - Better variety tracking across days and meal types
 * - Validation and warnings system
 * - No scaling unless absolutely necessary
 */

import { mealTemplatesTier1 } from '../data/mealTier1-500-600.js'
import { mealTemplatesTier2 } from '../data/mealTier2-600-900.js'
import { mealTemplatesTier3 } from '../data/mealTier3-900-1200.js'
import { snacks } from '../data/snacks.js'
import { calculateBMR, calculateTDEE } from './nutritionCalculations.js'

/**
 * Determine which meal tier to use based on MAIN MEALS only
 * (Snacks are excluded from tier calculation as they're typically 10% of daily calories)
 *
 * @param {number} dailyCalories - Total daily calorie target
 * @param {number} mealsPerDay - Number of meals per day
 * @returns {object} Tier info with templates and calorie range
 */
export function selectMealTier(dailyCalories, mealsPerDay) {
  // Calculate main meal calories (excluding snacks which are ~10%)
  // Main meals get 90% of calories, snacks get 10%
  let mainMealCalories
  let numMainMeals

  if (mealsPerDay <= 3) {
    // No snacks, all meals are main meals
    mainMealCalories = dailyCalories / mealsPerDay
    numMainMeals = mealsPerDay
  } else {
    // Has snacks: main meals = breakfast + lunch + dinner (90% of calories)
    mainMealCalories = (dailyCalories * 0.9) / 3 // 3 main meals
    numMainMeals = 3
  }

  console.log(
    `🎯 Tier selection: ${Math.round(mainMealCalories)} cal/main meal (${numMainMeals} main meals, ${mealsPerDay - numMainMeals} snacks)`,
  )

  if (mainMealCalories <= 600) {
    return {
      tier: 1,
      templates: mealTemplatesTier1,
      minCalories: 500,
      maxCalories: 600,
      name: 'Tier 1 (500-600 cal/meal)',
    }
  } else if (mainMealCalories <= 900) {
    return {
      tier: 2,
      templates: mealTemplatesTier2,
      minCalories: 600,
      maxCalories: 900,
      name: 'Tier 2 (600-900 cal/meal)',
    }
  } else {
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
 */
export function adjustCaloriesForGoal(tdee, goal) {
  const adjustments = {
    maintain_weight: 0,
    maintenance: 0,
    lose_weight: -500,
    'weight-loss': -500,
    gain_weight: 500,
    'weight-gain': 500,
    build_muscle: 500,
  }

  const normalizedGoal = goal.toLowerCase().replace(/_/g, '-')
  const adjustment =
    adjustments[normalizedGoal] || adjustments[goal.toLowerCase()]

  if (adjustment === undefined) {
    throw new Error(
      `Goal must be one of: maintain_weight, lose_weight, gain_weight, build_muscle (received: ${goal})`,
    )
  }

  return Math.max(tdee + adjustment, 1200)
}

/**
 * Calculate macro targets based on goal
 */
export function calculateMacroTargets(dailyCalories, goal) {
  let macroSplit

  const normalizedGoal = goal.toLowerCase().replace(/_/g, '-')

  switch (normalizedGoal) {
    case 'lose-weight':
    case 'weight-loss':
      macroSplit = { protein: 0.4, carbs: 0.4, fat: 0.2 }
      break
    case 'gain-weight':
    case 'weight-gain':
      macroSplit = { protein: 0.3, carbs: 0.5, fat: 0.2 }
      break
    case 'build-muscle':
      macroSplit = { protein: 0.35, carbs: 0.45, fat: 0.2 }
      break
    case 'maintain-weight':
    case 'maintenance':
    default:
      macroSplit = { protein: 0.3, carbs: 0.45, fat: 0.25 }
  }

  return {
    protein: Math.round((dailyCalories * macroSplit.protein) / 4),
    carbs: Math.round((dailyCalories * macroSplit.carbs) / 4),
    fat: Math.round((dailyCalories * macroSplit.fat) / 9),
  }
}

/**
 * Calculate total nutrition for a day of meals
 */
// --- AI output sanitising -------------------------------------------------
// Language models do not reliably honour "return a number": they emit values
// like "34", "34g", "1,200" or even "thirty-four". Left alone these break the
// nutrition arithmetic (string concatenation) and then fail Mongoose's Number
// cast, which rejects the whole plan. Coerce what we safely can, and report
// anything we cannot so the day falls back to templates.

const NUMBER_WORDS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000,
}

export function coerceNutritionNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(value)
  }
  if (typeof value !== 'string') return null

  // Normalise unicode hyphens/dashes the model likes to use.
  const text = value
    .trim()
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
  if (!text) return null

  // "34", "34g", "1,200 kcal", "1 200"
  const numeric = text.replace(/[,\s]/g, '').match(/^(\d+(?:\.\d+)?)/)
  if (numeric) return Math.round(parseFloat(numeric[1]))

  // "thirty-four", "one hundred twenty"
  const parts = text.split(/[-\s]+/).filter(Boolean)
  if (!parts.length || !parts.every((w) => w in NUMBER_WORDS)) return null

  let total = 0
  let current = 0
  for (const word of parts) {
    const n = NUMBER_WORDS[word]
    if (n === 100) current = (current || 1) * 100
    else if (n === 1000) {
      total += (current || 1) * 1000
      current = 0
    } else current += n
  }
  return total + current
}

// Returns a meal with numeric nutrition, or null when a value is unusable.
export function normalizeMealNutrition(meal) {
  if (!meal || typeof meal !== 'object') return null
  const n = meal.nutrition
  if (!n || typeof n !== 'object') return null

  const nutrition = {}
  for (const key of ['calories', 'protein', 'carbs', 'fat']) {
    const coerced = coerceNutritionNumber(n[key])
    if (coerced === null || coerced < 0) return null
    nutrition[key] = coerced
  }
  return { ...meal, nutrition }
}

export function calculateDayNutrition(meals) {
  if (!meals || meals.length === 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0 }
  }

  // coerce defensively: a single string value here would turn the running
  // total into concatenated text rather than a sum.
  return meals.reduce(
    (total, meal) => ({
      calories:
        total.calories +
        (coerceNutritionNumber(meal?.nutrition?.calories) || 0),
      protein:
        total.protein + (coerceNutritionNumber(meal?.nutrition?.protein) || 0),
      carbs: total.carbs + (coerceNutritionNumber(meal?.nutrition?.carbs) || 0),
      fat: total.fat + (coerceNutritionNumber(meal?.nutrition?.fat) || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

/**
 * Calculate macro percentages from nutrition data
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
 * 🎯 V3: REALISTIC calorie distribution by meal type
 *
 * Based on nutritional science and eating patterns:
 * - Breakfast: 25% (lighter morning meal)
 * - Lunch: 35% (main midday meal)
 * - Dinner: 30% (substantial but not heavy)
 * - Snack: 10% (split among multiple snacks if needed)
 *
 * @param {number} dailyCalories - Total daily calories
 * @param {number} mealPerDay - Number of meals
 * @returns {Object} - Calorie targets per meal type
 */
export function calculateRealisticMealDistribution(dailyCalories, mealPerDay) {
  const distribution = {}

  if (mealPerDay === 2) {
    // 2 meals: Lunch (55%), Dinner (45%)
    distribution.Lunch = dailyCalories * 0.55
    distribution.Dinner = dailyCalories * 0.45
  } else if (mealPerDay === 3) {
    // 3 meals: Breakfast (25%), Lunch (35%), Dinner (40%)
    distribution.Breakfast = dailyCalories * 0.25
    distribution.Lunch = dailyCalories * 0.35
    distribution.Dinner = dailyCalories * 0.4
  } else if (mealPerDay === 4) {
    // 4 meals: Breakfast (25%), Lunch (35%), Dinner (30%), Snack (10%)
    distribution.Breakfast = dailyCalories * 0.25
    distribution.Lunch = dailyCalories * 0.35
    distribution.Dinner = dailyCalories * 0.3
    distribution.Snack = dailyCalories * 0.1
  } else if (mealPerDay === 5) {
    // 5 meals: Breakfast (20%), Morning Snack (10%), Lunch (30%), Afternoon Snack (10%), Dinner (30%)
    distribution.Breakfast = dailyCalories * 0.2
    distribution['Morning Snack'] = dailyCalories * 0.1
    distribution.Lunch = dailyCalories * 0.3
    distribution['Afternoon Snack'] = dailyCalories * 0.1
    distribution.Dinner = dailyCalories * 0.3
  } else {
    // Default fallback: distribute equally
    const equalDistribution = dailyCalories / mealPerDay
    for (let i = 1; i <= mealPerDay; i++) {
      distribution[`Meal ${i}`] = equalDistribution
    }
  }
  return distribution
}

/**
 * 🎯 V3: Filter meals by allergens
 */
export function filterMealsByAllergens(meals, allergens = []) {
  const normalizedAllergens = allergens
    ? allergens.filter((a) => a && a !== 'none' && a.trim() !== '')
    : []

  if (normalizedAllergens.length === 0) {
    return meals
  }

  const filtered = meals.filter((meal) => {
    if (!meal.allergens) return true

    const mealAllergensList = Array.isArray(meal.allergens)
      ? meal.allergens
      : [meal.allergens]

    if (
      mealAllergensList.includes('none') ||
      mealAllergensList.includes('[]')
    ) {
      return true
    }

    const hasAllergen = normalizedAllergens.some((userAllergen) =>
      mealAllergensList.some((mealAllergen) =>
        mealAllergen.toLowerCase().includes(userAllergen.toLowerCase()),
      ),
    )

    return !hasAllergen
  })

  return filtered.length > 0 ? filtered : meals
}

/**
 * 🎯 V3: ADVANCED meal selection based on calorie proximity and variety
 *
 * @param {Array} availableMeals - Meals to choose from
 * @param {number} targetCalories - Target calories for this specific meal
 * @param {Set} recentMeals - Recently used meal names (for variety)
 * @param {number} varietyBonus - How much to favor variety (0-1, default 0.3)
 * @returns {Object} - Selected meal
 */
export function selectMealByCalorieProximity(
  availableMeals,
  targetCalories,
  recentMeals = new Set(),
  varietyBonus = 0.3,
) {
  if (!availableMeals || availableMeals.length === 0) {
    throw new Error('No meals available to select from')
  }

  const scoredMeals = availableMeals.map((meal) => {
    const mealCalories = meal.nutrition?.calories || 0

    // Calorie proximity score (0-1, where 1 = perfect match)
    const calorieVariance = Math.abs(mealCalories - targetCalories)
    const maxVariance = targetCalories * 0.3 // More lenient: 30% variance is OK
    const proximityScore = Math.max(0, 1 - calorieVariance / maxVariance)

    // Variety score (1 if fresh, 0 if recently used)
    const varietyScore = recentMeals.has(meal.dishName) ? 0 : 1

    // Combined score: 50% proximity, 50% variety
    const totalScore = proximityScore * 0.5 + varietyScore * 0.5

    return {
      meal,
      score: totalScore,
      calorieVariance,
    }
  })

  // Sort by score (highest first)
  scoredMeals.sort((a, b) => b.score - a.score)

  // Pick top 3 candidates and select randomly for variety
  const topCandidates = scoredMeals.slice(0, Math.min(3, scoredMeals.length))
  const selected =
    topCandidates[Math.floor(Math.random() * topCandidates.length)]

  console.log(
    `   Selected "${selected.meal.dishName}" (${selected.meal.nutrition.calories} cal, target: ${Math.round(targetCalories)})`,
  )

  return selected.meal
}

/**
 * Validate nutrition against targets
 */
export function validateNutrition(actual, target, tolerance = 0.1) {
  const warnings = []
  const toleranceAmount = (value) => value * tolerance

  // Check calories
  if (actual.calories < target.calories - toleranceAmount(target.calories)) {
    warnings.push(
      `Calories under target: ${Math.round(actual.calories)} / ${Math.round(target.calories)}`,
    )
  } else if (
    actual.calories >
    target.calories + toleranceAmount(target.calories)
  ) {
    warnings.push(
      `Calories over target: ${Math.round(actual.calories)} / ${Math.round(target.calories)}`,
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
 * 🎯 V3: ULTIMATE meal plan generation with realistic distribution
 *
 * @param {Object} userProfile - User's profile data
 * @param {number} planDuration - Number of days
 * @param {number} mealPerDay - Meals per day
 * @param {string} foodType - 'veg', 'nonveg', or 'both'
 * @param {Array} allergens - Array of allergens to avoid
 * @returns {Object} - Meal plan with accurate nutrition
 */
export function generateUltimateMealPlan(
  userProfile,
  planDuration,
  mealPerDay,
  foodType,
  allergens = [],
) {
  try {
    console.log('\n🔥🔥🔥 USING MEALPLANUTILS3.JS - ULTIMATE V3 🔥🔥🔥')
    console.log('📋 Input params:', {
      planDuration,
      mealPerDay,
      foodType,
      allergens,
    })
    console.log('👤 User profile:', userProfile)

    // 🎯 STEP 1: Calculate user's calorie needs
    const { weight, height, age, gender, activityLevel, goal } = userProfile

    if (!weight || !height || !age || !gender) {
      throw new Error(
        'User profile must include weight, height, age, and gender',
      )
    }

    const bmr = calculateBMR({ weight, height, age, gender })
    console.log('🔥 V3: BMR calculated =', Math.round(bmr), 'cal')

    const tdee = calculateTDEE({
      bmr,
      activityLevel: activityLevel || 'moderate',
    })
    console.log('🔥 V3: TDEE calculated =', Math.round(tdee), 'cal')

    const dailyCalories = adjustCaloriesForGoal(tdee, goal || 'maintain_weight')
    console.log(
      '🔥 V3: Daily calories (after goal adjustment) =',
      Math.round(dailyCalories),
      'cal for goal:',
      goal,
    )

    const macroTargets = calculateMacroTargets(
      dailyCalories,
      goal || 'maintain_weight',
    )

    console.log('\n🔥 V3 ULTIMATE MEAL PLAN GENERATION')
    console.log(`   User: ${age}yo ${gender}, ${weight}kg, ${height}cm`)
    console.log(`   BMR: ${Math.round(bmr)} cal, TDEE: ${Math.round(tdee)} cal`)
    console.log(
      `   Daily Target: ${Math.round(dailyCalories)} cal (goal: ${goal})`,
    )
    console.log(
      `   Macros: ${macroTargets.protein}g protein, ${macroTargets.carbs}g carbs, ${macroTargets.fat}g fat`,
    )

    // 🎯 STEP 2: Select tier and get REALISTIC meal distribution
    const tierInfo = selectMealTier(dailyCalories, mealPerDay)
    const mealTemplatesFromTier = tierInfo.templates
    const calorieDistribution = calculateRealisticMealDistribution(
      dailyCalories,
      mealPerDay,
    )

    console.log(`   Using ${tierInfo.name}`)
    console.log(`   🎯 REALISTIC Meal distribution:`, calorieDistribution)

    // 🎯 STEP 3: Determine meal types for the day
    const mealTypes = []
    if (mealPerDay === 2) {
      mealTypes.push('Lunch', 'Dinner')
    } else if (mealPerDay === 3) {
      mealTypes.push('Breakfast', 'Lunch', 'Dinner')
    } else if (mealPerDay === 4) {
      mealTypes.push('Breakfast', 'Lunch', 'Dinner', 'Snack')
    } else if (mealPerDay === 5) {
      mealTypes.push(
        'Breakfast',
        'Morning Snack',
        'Lunch',
        'Afternoon Snack',
        'Dinner',
      )
    } else {
      // Default: create generic meal names
      for (let i = 1; i <= mealPerDay; i++) {
        mealTypes.push(`Meal ${i}`)
      }
    }
    const days = []
    const recentMeals = new Set()
    const varietyWindow = Math.min(3, planDuration)

    // 🎯 STEP 4: Generate each day with REALISTIC calorie targets
    for (let dayNum = 1; dayNum <= planDuration; dayNum++) {
      console.log(`\n📅 Day ${dayNum}:`)
      const dayMeals = []

      for (const mealType of mealTypes) {
        // Determine diet type
        let dietType = foodType
        if (foodType === 'both') {
          dietType = Math.random() > 0.5 ? 'veg' : 'non-veg'
        } else if (foodType === 'nonveg') {
          dietType = 'non-veg'
        } else if (foodType === 'veg') {
          dietType = 'veg'
        }

        let availableMeals
        let targetCalories

        // 🍎 SNACKS: Use separate snack database (100-300 cal)
        if (
          mealType === 'Snack' ||
          mealType === 'Morning Snack' ||
          mealType === 'Afternoon Snack'
        ) {
          availableMeals = snacks[dietType] || snacks.veg || []
          targetCalories = calorieDistribution[mealType] || dailyCalories * 0.1
          console.log(
            `   🍎 ${mealType} from snack database (target: ${Math.round(targetCalories)} cal)`,
          )
        } else {
          // 🍽️ MAIN MEALS: Use tier-based meal database
          availableMeals =
            mealTemplatesFromTier[dietType]?.[mealType] ||
            mealTemplatesFromTier.veg?.[mealType] ||
            []
          targetCalories =
            calorieDistribution[mealType] || dailyCalories / mealPerDay
        }

        if (availableMeals.length === 0) {
          console.warn(`⚠️  No meals found for ${dietType}/${mealType}`)
          continue
        }

        // Filter by allergens
        const filteredMeals = filterMealsByAllergens(availableMeals, allergens)

        // 🎯 SMART SELECTION with REALISTIC per-meal target
        const selectedMeal = selectMealByCalorieProximity(
          filteredMeals,
          targetCalories,
          recentMeals,
          0.3,
        )

        dayMeals.push({
          type: mealType,
          dishName: selectedMeal.dishName || 'Unknown Dish',
          description: selectedMeal.description || '',
          image: selectedMeal.imageUrl || null,
          nutrition: selectedMeal.nutrition || {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
        })

        // Track for variety
        recentMeals.add(selectedMeal.dishName)
        if (recentMeals.size > varietyWindow * mealPerDay) {
          const firstMeal = Array.from(recentMeals)[0]
          recentMeals.delete(firstMeal)
        }
      }

      // Calculate day totals (NO SCALING - use real meal data as-is)
      const totalNutrition = calculateDayNutrition(dayMeals)
      const variance = totalNutrition.calories - dailyCalories
      const variancePercent = (variance / dailyCalories) * 100

      console.log(
        `   Day total: ${totalNutrition.calories} cal (${variancePercent > 0 ? '+' : ''}${Math.round(variancePercent)}% from target)`,
      )

      const macroPercentages = calculateMacroPercentages(totalNutrition)

      days.push({
        dayNumber: dayNum,
        meals: dayMeals,
        totalNutrition: totalNutrition,
        macroPercentages,
      })
    }

    const result = {
      days,
      meta: {
        tierUsed: tierInfo.tier,
        tierName: tierInfo.name,
        userMetrics: {
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          dailyCalories: Math.round(dailyCalories),
          weight,
          height,
          age,
          gender,
          activityLevel,
          goal,
        },
        nutritionTargets: {
          dailyCalories: Math.round(dailyCalories),
          protein: macroTargets.protein,
          carbs: macroTargets.carbs,
          fat: macroTargets.fat,
        },
      },
    }

    console.log('\n✅ V3: Returning meal plan with', days.length, 'days')
    console.log('✅ V3: Target calories per day:', Math.round(dailyCalories))
    console.log('🔥🔥🔥 END OF MEALPLANUTILS3.JS V3 🔥🔥🔥\n')

    return result
  } catch (error) {
    console.error('❌ Error in generateUltimateMealPlan:', error)
    console.error('Stack:', error.stack)
    throw new Error(`Ultimate meal plan generation failed: ${error.message}`)
  }
}

/**
 * 🎯 V3: Validate and fix AI-generated meal plan
 */
// How far a day's calories may drift from target before its AI meals are
// replaced with template meals. Kept tight because this is a nutrition app,
// but every substitution is now reported rather than happening silently.
export const AI_DAY_VARIANCE_TOLERANCE = 10

export function validateAndFixMealPlanV3(
  aiResult,
  userProfile,
  planDuration,
  mealPerDay,
  foodType,
  allergens = [],
) {
  console.log('\n🔥 V3: validateAndFixMealPlanV3 called')

  if (!aiResult?.days || !Array.isArray(aiResult.days)) {
    console.warn('🔥 V3: Invalid AI result structure, using ultimate fallback')
    return {
      ...generateUltimateMealPlan(
        userProfile,
        planDuration,
        mealPerDay,
        foodType,
        allergens,
      ),
      source: 'templates',
      aiDays: 0,
      templateDays: planDuration,
      substitutions: [
        { dayNumber: null, reason: 'AI returned an unusable structure' },
      ],
    }
  }

  const { weight, height, age, gender, activityLevel, goal } = userProfile
  const bmr = calculateBMR({ weight, height, age, gender })
  const tdee = calculateTDEE({
    bmr,
    activityLevel: activityLevel || 'moderate',
  })
  const dailyCalories = adjustCaloriesForGoal(tdee, goal || 'maintain_weight')

  const validatedDays = []
  const substitutions = []

  const templateDay = (dayNumber, reason) => {
    substitutions.push({ dayNumber, reason })
    const ultimatePlan = generateUltimateMealPlan(
      userProfile,
      1,
      mealPerDay,
      foodType,
      allergens,
    )
    return { ...ultimatePlan.days[0], dayNumber }
  }

  for (let i = 0; i < planDuration; i++) {
    let day = aiResult.days[i]
    const dayNumber = i + 1

    if (!day || !day.meals || day.meals.length !== mealPerDay) {
      console.warn(`Day ${dayNumber} invalid, generating ultimate template day`)
      validatedDays.push(
        templateDay(
          dayNumber,
          `AI returned ${day?.meals?.length ?? 0} meals, expected ${mealPerDay}`,
        ),
      )
      continue
    }

    // Coerce the model's nutrition values before they reach the arithmetic or
    // the database; a day with an unusable value falls back to templates.
    const normalizedMeals = day.meals.map(normalizeMealNutrition)
    if (normalizedMeals.some((m) => m === null)) {
      console.warn(
        `Day ${dayNumber} had non-numeric nutrition, using templates`,
      )
      validatedDays.push(
        templateDay(
          dayNumber,
          'AI returned nutrition values that were not numbers',
        ),
      )
      continue
    }
    day = { ...day, meals: normalizedMeals }

    const dayNutrition = calculateDayNutrition(day.meals)
    const variance = Math.abs(dayNutrition.calories - dailyCalories)
    const variancePercent = (variance / dailyCalories) * 100

    if (variancePercent > AI_DAY_VARIANCE_TOLERANCE) {
      console.warn(
        `Day ${dayNumber} AI meals have ${Math.round(variancePercent)}% variance, using ultimate selection`,
      )
      validatedDays.push(
        templateDay(
          dayNumber,
          `AI day was ${Math.round(variancePercent)}% off the ${dailyCalories} kcal target ` +
            `(tolerance ${AI_DAY_VARIANCE_TOLERANCE}%)`,
        ),
      )
      continue
    }

    validatedDays.push({
      dayNumber,
      meals: day.meals,
      totalNutrition: dayNutrition,
    })
  }

  const templateDays = substitutions.length
  const aiDays = planDuration - templateDays

  return {
    days: validatedDays,
    source: templateDays === 0 ? 'ai' : aiDays === 0 ? 'templates' : 'mixed',
    aiDays,
    templateDays,
    substitutions,
  }
}
