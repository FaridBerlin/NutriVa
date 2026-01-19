/**
 * Meal Plan Utilities V2 - Improved Meal Selection
 * backend/utils/mealPlanUtils2.js
 *
 * IMPROVEMENTS OVER V1:
 * - Intelligent calorie-based meal selection (no random scaling)
 * - Calculates user calories from profile data
 * - Weighted selection favoring meals close to calorie target
 * - Minimal scaling (only when absolutely necessary)
 * - Better macro distribution across meals
 */

import { mealTemplatesTier1 } from '../data/mealTier1-500-600.js'
import { mealTemplatesTier2 } from '../data/mealTier2-600-900.js'
import { mealTemplatesTier3 } from '../data/mealTier3-900-1200.js'
import { calculateBMR, calculateTDEE } from './nutritionCalculations.js'

/**
 * Determine which meal tier to use based on calories per meal
 */
export function selectMealTier(dailyCalories, mealsPerDay) {
  const caloriesPerMeal = dailyCalories / mealsPerDay

  if (caloriesPerMeal <= 600) {
    return {
      tier: 1,
      templates: mealTemplatesTier1,
      minCalories: 500,
      maxCalories: 600,
      name: 'Tier 1 (500-600 cal/meal)',
    }
  } else if (caloriesPerMeal <= 900) {
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
 * Supports both hyphenated (weight-loss) and underscore (lose_weight) formats
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
  const adjustment = adjustments[normalizedGoal] || adjustments[goal.toLowerCase()]
  
  if (adjustment === undefined) {
    throw new Error(
      `Goal must be one of: maintain_weight, lose_weight, gain_weight, build_muscle (received: ${goal})`,
    )
  }

  return Math.max(tdee + adjustment, 1200)
}

/**
 * Calculate macro targets based on goal
 * Supports both hyphenated and underscore formats
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
 * 🎯 IMPROVED: Smart meal selection based on calorie proximity
 *
 * Instead of random selection + scaling, this selects meals that are
 * naturally close to the target calorie per meal.
 *
 * @param {Array} availableMeals - Meals to choose from
 * @param {number} targetCalories - Target calories for this meal
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

  // Calculate score for each meal based on:
  // 1. Calorie proximity (closer = higher score)
  // 2. Variety (not recently used = bonus)
  const scoredMeals = availableMeals.map((meal) => {
    const mealCalories = meal.nutrition?.calories || 0

    // Calorie proximity score (0-1, where 1 = perfect match)
    const calorieVariance = Math.abs(mealCalories - targetCalories)
    const maxVariance = targetCalories * 0.5 // 50% variance is worst case
    const proximityScore = Math.max(0, 1 - calorieVariance / maxVariance)

    // Variety score (1 if fresh, 0 if recently used)
    const varietyScore = recentMeals.has(meal.dishName) ? 0 : 1

    // Combined score (weighted: 70% proximity, 30% variety by default)
    const totalScore =
      proximityScore * (1 - varietyBonus) + varietyScore * varietyBonus

    return {
      meal,
      score: totalScore,
      calorieVariance,
      proximityScore,
      varietyScore,
    }
  })

  // Sort by score (highest first)
  scoredMeals.sort((a, b) => b.score - a.score)

  // Use weighted random selection from top candidates
  // This adds some randomness while heavily favoring better matches
  const topCandidates = scoredMeals.slice(0, Math.min(5, scoredMeals.length))

  // Create weight distribution (exponential: 40%, 30%, 20%, 7%, 3%)
  const weights = topCandidates.map((_, idx) => Math.pow(0.5, idx))
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)

  // Random selection based on weights
  let random = Math.random() * totalWeight
  for (let i = 0; i < topCandidates.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      const selected = topCandidates[i]
      console.log(
        `   Selected "${selected.meal.dishName}" (${selected.meal.nutrition.calories} cal, target: ${targetCalories}, variance: ${Math.round(selected.calorieVariance)} cal)`,
      )
      return selected.meal
    }
  }

  // Fallback to best match
  return scoredMeals[0].meal
}

/**
 * 🎯 IMPROVED: Filter meals by allergens
 *
 * @param {Array} meals - Available meals
 * @param {Array} allergens - User's allergens
 * @returns {Array} - Filtered meals
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

  return filtered.length > 0 ? filtered : meals // Fallback if all filtered out
}

/**
 * 🎯 IMPROVED: Calculate calorie distribution across meal types
 *
 * Different meal types should have different calorie distributions:
 * - Breakfast: 25-30%
 * - Lunch: 30-35%
 * - Dinner: 30-35%
 * - Snack: 10% (split if multiple snacks)
 *
 * @param {number} dailyCalories - Total daily calories
 * @param {number} mealPerDay - Number of meals
 * @returns {Object} - Calorie targets per meal type
 */
export function calculateMealCalorieDistribution(dailyCalories, mealPerDay) {
  const distribution = {}

  if (mealPerDay === 2) {
    // 2 meals: Lunch and Dinner (50/50)
    distribution.Lunch = dailyCalories * 0.5
    distribution.Dinner = dailyCalories * 0.5
  } else if (mealPerDay === 3) {
    // 3 meals: Breakfast, Lunch, Dinner
    distribution.Breakfast = dailyCalories * 0.25
    distribution.Lunch = dailyCalories * 0.35
    distribution.Dinner = dailyCalories * 0.4
  } else if (mealPerDay === 4) {
    // 4 meals: Breakfast, Lunch, Dinner, Snack
    distribution.Breakfast = dailyCalories * 0.25
    distribution.Lunch = dailyCalories * 0.3
    distribution.Dinner = dailyCalories * 0.3
    distribution.Snack = dailyCalories * 0.15
  } else if (mealPerDay === 5) {
    // 5 meals: Breakfast, Snack, Lunch, Snack, Dinner
    distribution.Breakfast = dailyCalories * 0.25
    distribution.Lunch = dailyCalories * 0.3
    distribution.Dinner = dailyCalories * 0.3
    distribution.Snack = dailyCalories * 0.075 // Split between 2 snacks
  } else {
    // 6 meals: Breakfast, Snack, Lunch, Snack, Dinner, Snack
    distribution.Breakfast = dailyCalories * 0.2
    distribution.Lunch = dailyCalories * 0.3
    distribution.Dinner = dailyCalories * 0.3
    distribution.Snack = dailyCalories * 0.067 // Split between 3 snacks
  }

  return distribution
}

/**
 * 🎯 NEW: Generate meal plan with intelligent calorie-based selection
 *
 * This is the main improvement over V1:
 * - Accepts user profile data and calculates calories
 * - Uses smart meal selection based on calorie proximity
 * - Minimal to no scaling needed
 * - Better nutrition accuracy
 *
 * @param {Object} userProfile - User's profile data
 * @param {number} planDuration - Number of days
 * @param {number} mealPerDay - Meals per day
 * @param {string} foodType - 'veg', 'nonveg', or 'both'
 * @param {Array} allergens - Array of allergens to avoid
 * @returns {Object} - Meal plan with accurate nutrition
 */
export function generateSmartMealPlan(
  userProfile,
  planDuration,
  mealPerDay,
  foodType,
  allergens = [],
) {
  console.log('\n🧪🧪🧪 USING MEALPLANUTILS2.JS - SMART MEAL PLAN V2 🧪🧪🧪')
  console.log('📋 Input params:', { planDuration, mealPerDay, foodType, allergens })
  console.log('👤 User profile:', userProfile)
  
  try {
    // 🎯 STEP 1: Calculate user's calorie needs from profile
    const { weight, height, age, gender, activityLevel, goal } = userProfile

    if (!weight || !height || !age || !gender) {
      throw new Error(
        'User profile must include weight, height, age, and gender',
      )
    }

    const bmr = calculateBMR({ weight, height, age, gender })
    console.log('🧪 V2: BMR calculated =', Math.round(bmr), 'cal')
    
    const tdee = calculateTDEE({
      bmr,
      activityLevel: activityLevel || 'moderate',
    })
    console.log('🧪 V2: TDEE calculated =', Math.round(tdee), 'cal')
    
    const dailyCalories = adjustCaloriesForGoal(tdee, goal || 'maintain_weight')
    console.log('🧪 V2: Daily calories (after goal adjustment) =', Math.round(dailyCalories), 'cal for goal:', goal)
    
    const macroTargets = calculateMacroTargets(
      dailyCalories,
      goal || 'maintain_weight',
    )

    console.log('\n🎯 V2 SMART MEAL PLAN GENERATION')
    console.log(`   User: ${age}yo ${gender}, ${weight}kg, ${height}cm`)
    console.log(`   BMR: ${Math.round(bmr)} cal, TDEE: ${Math.round(tdee)} cal`)
    console.log(`   Daily Target: ${Math.round(dailyCalories)} cal (goal: ${goal})`)
    console.log(
      `   Macros: ${macroTargets.protein}g protein, ${macroTargets.carbs}g carbs, ${macroTargets.fat}g fat`,
    )

    // 🎯 STEP 2: Select tier and get meal distribution
    const tierInfo = selectMealTier(dailyCalories, mealPerDay)
    const mealTemplatesFromTier = tierInfo.templates
    const calorieDistribution = calculateMealCalorieDistribution(
      dailyCalories,
      mealPerDay,
    )

    console.log(`   Using ${tierInfo.name}`)
    console.log(`   Meal distribution:`, calorieDistribution)

    // 🎯 STEP 3: Determine meal types for the day
    const mealTypes = []
    if (mealPerDay === 2) {
      mealTypes.push('Lunch', 'Dinner')
    } else if (mealPerDay === 3) {
      mealTypes.push('Breakfast', 'Lunch', 'Dinner')
    } else if (mealPerDay === 4) {
      mealTypes.push('Breakfast', 'Lunch', 'Dinner', 'Snack')
    } else if (mealPerDay === 5) {
      mealTypes.push('Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner')
    } else if (mealPerDay === 6) {
      mealTypes.push('Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner', 'Snack')
    }

    const days = []
    const recentMeals = new Set()
    const varietyWindow = Math.min(3, planDuration)

    // 🎯 STEP 4: Generate each day with smart meal selection
    for (let dayNum = 1; dayNum <= planDuration; dayNum++) {
      console.log(`\n📅 Day ${dayNum}:`)
      const dayMeals = []

      for (const mealType of mealTypes) {
        // Determine diet type (normalize to match tier data structure)
        let dietType = foodType
        if (foodType === 'both') {
          dietType = Math.random() > 0.5 ? 'veg' : 'non-veg'
        } else if (foodType === 'nonveg') {
          dietType = 'non-veg'
        } else if (foodType === 'veg') {
          dietType = 'veg'
        }

        // Get available meals for this type and diet
        const availableMeals =
          mealTemplatesFromTier[dietType]?.[mealType] ||
          mealTemplatesFromTier.veg?.[mealType] ||
          []

        if (availableMeals.length === 0) {
          console.warn(`⚠️  No meals found for ${dietType}/${mealType}`)
          continue
        }

        // Filter by allergens
        const filteredMeals = filterMealsByAllergens(availableMeals, allergens)

        // 🎯 SMART SELECTION: Choose meal based on calorie proximity
        const targetCalories =
          calorieDistribution[mealType] || dailyCalories / mealPerDay
        const selectedMeal = selectMealByCalorieProximity(
          filteredMeals,
          targetCalories,
          recentMeals,
          0.3, // 30% variety weight
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
          keyIngredients: selectedMeal.keyIngredients || [],
          cookingMethod: selectedMeal.cookingMethod || 'Prepared',
        })

        // Track for variety
        recentMeals.add(selectedMeal.dishName)
        if (recentMeals.size > varietyWindow * mealPerDay) {
          const firstMeal = Array.from(recentMeals)[0]
          recentMeals.delete(firstMeal)
        }
      }

      // Calculate day totals
      const totalNutrition = calculateDayNutrition(dayMeals)
      const variance = totalNutrition.calories - dailyCalories
      const variancePercent = (variance / dailyCalories) * 100

      console.log(
        `   Day total: ${totalNutrition.calories} cal (${variancePercent > 0 ? '+' : ''}${Math.round(variancePercent)}% from target)`,
      )

      // 🎯 MINIMAL SCALING: Only if variance is > 5%
      let finalMeals = dayMeals
      if (Math.abs(variancePercent) > 5) {
        console.log(`   ⚠️  Variance too high, applying minimal adjustment...`)
        const scaleFactor = dailyCalories / totalNutrition.calories
        finalMeals = dayMeals.map((meal) => ({
          ...meal,
          nutrition: {
            calories: Math.round(meal.nutrition.calories * scaleFactor),
            protein: Math.round(meal.nutrition.protein * scaleFactor),
            carbs: Math.round(meal.nutrition.carbs * scaleFactor),
            fat: Math.round(meal.nutrition.fat * scaleFactor),
          },
        }))
      }

      days.push({
        dayNumber: dayNum,
        meals: finalMeals,
        totalNutrition: calculateDayNutrition(finalMeals),
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
    
    console.log('\n✅ V2: Returning meal plan with', days.length, 'days')
    console.log('✅ V2: Target calories per day:', Math.round(dailyCalories))
    console.log('🧪🧪🧪 END OF MEALPLANUTILS2.JS V2 🧪🧪🧪\n')
    
    return result
  } catch (error) {
    console.error('❌ Error in generateSmartMealPlan:', error)
    console.error('Stack:', error.stack)
    throw new Error(`Smart meal plan generation failed: ${error.message}`)
  }
}

/**
 * 🎯 NEW: Validate and fix AI-generated meal plan (V2)
 *
 * Uses the same smart selection approach to fix invalid AI meals
 */
export function validateAndFixMealPlanV2(
  aiResult,
  userProfile,
  planDuration,
  mealPerDay,
  foodType,
  allergens = [],
) {
  console.log('\n🧪 V2: validateAndFixMealPlanV2 called')
  
  if (!aiResult?.days || !Array.isArray(aiResult.days)) {
    console.warn('🧪 V2: Invalid AI result structure, using smart fallback')
    return generateSmartMealPlan(
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
      console.warn(`Day ${i + 1} invalid, generating smart template day`)
      const smartPlan = generateSmartMealPlan(
        userProfile,
        1,
        mealPerDay,
        foodType,
        allergens,
      )
      validatedDays.push({
        ...smartPlan.days[0],
        dayNumber: i + 1,
      })
    } else {
      // Validate and potentially adjust AI meals
      const dayNutrition = calculateDayNutrition(day.meals)
      const variance = Math.abs(dayNutrition.calories - dailyCalories)
      const variancePercent = (variance / dailyCalories) * 100

      if (variancePercent > 10) {
        // AI meals are too far off, replace with smart selection
        console.warn(
          `Day ${i + 1} AI meals have ${Math.round(variancePercent)}% variance, using smart selection`,
        )
        const smartPlan = generateSmartMealPlan(
          userProfile,
          1,
          mealPerDay,
          foodType,
          allergens,
        )
        validatedDays.push({
          ...smartPlan.days[0],
          dayNumber: i + 1,
        })
      } else {
        // AI meals are acceptable
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
