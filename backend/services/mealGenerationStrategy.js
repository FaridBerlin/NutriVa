/**
 * Meal Generation Strategy - Abstract Base Class
 * backend/services/mealGenerationStrategy.js
 *
 * Defines the interface for meal plan generation strategies.
 * Allows easy swapping between mock data, AI models, and external APIs.
 *
 * Strategy Pattern Implementation:
 * - MockMealGenerator: Uses local meal database
 * - OllamaMealGenerator: Uses local Ollama AI
 * - OpenAIMealGenerator: Uses OpenAI API
 * - Future: External API generators
 */

export class MealGenerationStrategy {
  /**
   * Generate a complete meal plan
   * @param {object} params - Generation parameters
   * @returns {Promise<object>} Generated meal plan
   */
  async generate(params) {
    throw new Error('generate() method must be implemented by subclass')
  }
}

/**
 * Mock Meal Generator - Current Implementation
 * Uses the existing mealDatabase.js and selection logic
 */
export class MockMealGenerator extends MealGenerationStrategy {
  async generate(params) {
    // Import utility functions
    const { calculateBMR, calculateTDEE } = await import('../utils/nutritionCalculations.js')
    const mealPlanService = await import('./mealPlanService.js')
    const {
      adjustCaloriesForGoal,
      calculateMacroTargets,
      selectMealForCategory,
      calculateDayNutrition,
      calculateMacroPercentages,
      validateNutrition,
      generatePlanNutritionSummary,
    } = mealPlanService.default

    // Replicate the current generateMealPlan logic
    const {
      userId,
      planName = 'My Meal Plan',
      duration = 7,
      mealsPerDay = 3,
      weight,
      height,
      age,
      gender,
      activityLevel = 'moderate',
      goal = 'maintain_weight',
      dietType = 'all',
      allergens = [],
      cuisinePreference,
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
    const bmr = calculateBMR({ weight, height, age, gender })
    const tdee = calculateTDEE({ bmr, activityLevel })
    const dailyCalories = adjustCaloriesForGoal(tdee, goal)
    const macroTargets = calculateMacroTargets(dailyCalories, goal)

    // Calculate calorie per meal (distributed by meal type)
    const calorieDistribution = {
      breakfast: dailyCalories * 0.25,
      lunch: dailyCalories * 0.35,
      dinner: dailyCalories * 0.3,
      snack: dailyCalories * 0.1,
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
}

/**
 * Ollama Meal Generator - Future AI Implementation
 * Will use local Ollama API for meal generation
 */
export class OllamaMealGenerator extends MealGenerationStrategy {
  async generate(params) {
    // TODO: Implement Ollama integration
    // 1. Install ollama npm package
    // 2. Create prompt templates
    // 3. Call Ollama API
    // 4. Parse JSON response
    // 5. Validate and repair JSON if needed
    // 6. Return structured meal plan

    throw new Error('OllamaMealGenerator not yet implemented. Use MOCK generator.')
  }
}

/**
 * OpenAI Meal Generator - Future AI Implementation
 * Will use OpenAI API for meal generation
 */
export class OpenAIMealGenerator extends MealGenerationStrategy {
  async generate(params) {
    // TODO: Implement OpenAI integration
    // 1. Install openai npm package
    // 2. Set up API key
    // 3. Create prompt templates
    // 4. Call OpenAI API
    // 5. Parse JSON response
    // 6. Validate and repair JSON if needed
    // 7. Return structured meal plan

    throw new Error('OpenAIMealGenerator not yet implemented. Use MOCK generator.')
  }
}