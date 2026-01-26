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
        if (mealType === 'Snack') {
          availableMeals = snacks[dietType] || snacks.veg || []
          targetCalories = calorieDistribution[mealType] || dailyCalories * 0.1
          console.log(
            `   🍎 Snack from snack database (target: ${Math.round(targetCalories)} cal)`,
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
    return generateUltimateMealPlan(
      userProfile,
      planDuration,
      mealPerDay,
      foodType,
      allergens,
    )
  }

  const { weight, height, age, gender, activityLevel, goal } = userProfile
  const bmr = calculateBMR({ weight, height, age, gender })
  const tdee = calculateTDEE({
    bmr,
    activityLevel: activityLevel || 'moderate',
  })
  const dailyCalories = adjustCaloriesForGoal(tdee, goal || 'maintain_weight')

  const validatedDays = []

  for (let i = 0; i < planDuration; i++) {
    const day = aiResult.days[i]

    if (!day || !day.meals || day.meals.length !== mealPerDay) {
      console.warn(`Day ${i + 1} invalid, generating ultimate template day`)
      const ultimatePlan = generateUltimateMealPlan(
        userProfile,
        1,
        mealPerDay,
        foodType,
        allergens,
      )
      validatedDays.push({
        ...ultimatePlan.days[0],
        dayNumber: i + 1,
      })
    } else {
      const dayNutrition = calculateDayNutrition(day.meals)
      const variance = Math.abs(dayNutrition.calories - dailyCalories)
      const variancePercent = (variance / dailyCalories) * 100

      if (variancePercent > 10) {
        console.warn(
          `Day ${i + 1} AI meals have ${Math.round(variancePercent)}% variance, using ultimate selection`,
        )
        const ultimatePlan = generateUltimateMealPlan(
          userProfile,
          1,
          mealPerDay,
          foodType,
          allergens,
        )
        validatedDays.push({
          ...ultimatePlan.days[0],
          dayNumber: i + 1,
        })
      } else {
        validatedDays.push({
          dayNumber: i + 1,
          meals: day.meals,
          totalNutrition: dayNutrition,
        })
      }
    }
  }

  return { days: validatedDays }
}

/**
 * Generate nutrition summary for entire meal plan
 */
export function generatePlanNutritionSummary(planData, targets) {
  const plan = planData.days

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

  const averages = {
    calories: Math.round(totals.calories / totals.days),
    protein: Math.round(totals.protein / totals.days),
    carbs: Math.round(totals.carbs / totals.days),
    fat: Math.round(totals.fat / totals.days),
  }

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
