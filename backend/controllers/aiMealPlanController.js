import AiMealPlan from '../models/AiMealPlan.js'
import Profile from '../models/Profile.js'
import { generateMealPlan } from '../services/ollamaService.js'
import {
  calculateBMR,
  calculateTDEE,
  calculateCalories,
  calculateMacros,
} from '../utils/nutritionCalculations.js'
import {
  generateTemplateMealPlan,
  validateAndFixMealPlan,
} from '../utils/mealPlanUtils.js'

/**
 * Generate a new diet plan using Ollama or Templates
 * POST /api/meal-plans
 */
export const createMealPlan = async (req, res, next) => {
  try {
    const userId = req.user._id

    const {
      planName,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      planDuration,
      mealPerDay,
      foodType,
      restrictionsAndAllergies,
      useTemplates = false, // NEW: Option to use templates directly
    } = req.body

    // Validate required fields
    if (
      !planName ||
      !age ||
      !weight ||
      !height ||
      !gender ||
      !activityLevel ||
      !goal ||
      !planDuration ||
      !mealPerDay ||
      !foodType
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: { code: 'VALIDATION_ERROR' },
      })
    }

    // Validate ranges
    if (mealPerDay < 2 || mealPerDay > 6) {
      return res.status(400).json({
        success: false,
        message: 'Meals per day must be between 2 and 6',
        error: { code: 'VALIDATION_ERROR' },
      })
    }

    if (planDuration < 3 || planDuration > 30) {
      return res.status(400).json({
        success: false,
        message: 'Plan duration must be between 3 and 30 days',
        error: { code: 'VALIDATION_ERROR' },
      })
    }

    // Calculate nutrition
    const bmr = calculateBMR(weight, height, age, gender)
    const tdee = calculateTDEE(bmr, activityLevel)
    const dailyCalories = calculateCalories(tdee, goal)
    const dailyMacros = calculateMacros(dailyCalories, weight, goal)

    console.log(`Generating plan for user ${userId}: ${dailyCalories} cal/day`)

    // Normalize foodType for backend processing
    const normalizedFoodType = foodType === 'non-veg' ? 'nonveg' : foodType

    let mealPlanData

    // Decision: Use templates for faster generation or AI for variety
    if (useTemplates || planDuration > 14) {
      // Use templates directly for speed (instant generation)
      console.log(`Using template-based generation (${planDuration} days)`)
      mealPlanData = generateTemplateMealPlan(
        planDuration,
        mealPerDay,
        normalizedFoodType,
      )
    } else {
      // Try AI generation with fallback to templates
      try {
        console.log(
          `Attempting AI generation with Ollama (${planDuration} days)`,
        )
        const aiResult = await generateMealPlan({
          age,
          weight,
          height,
          gender,
          activityLevel,
          goal,
          planDuration,
          fitnessGoal: goal,
          foodType: normalizedFoodType,
          restrictionsAndAllergies: restrictionsAndAllergies || 'None',
          mealPerDay,
        })

        // Validate and fix AI result
        mealPlanData = validateAndFixMealPlan(
          aiResult,
          planDuration,
          mealPerDay,
          normalizedFoodType,
        )
        console.log('AI generation completed successfully')
      } catch (aiError) {
        console.warn(
          'AI generation failed, falling back to templates:',
          aiError.message,
        )
        // Fallback to templates if AI fails
        mealPlanData = generateTemplateMealPlan(
          planDuration,
          mealPerDay,
          normalizedFoodType,
        )
      }
    }

    // Create and save meal plan
    const dietPlan = new AiMealPlan({
      userId,
      planName,
      mealPerDay,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      planDuration,
      foodType: normalizedFoodType,
      dailyCalories,
      dailyMacros,
      days: mealPlanData.days,
    })

    await dietPlan.save()

    return res.status(201).json({
      success: true,
      message: 'Diet plan generated successfully',
      mealPlan: dietPlan,
      generationMethod:
        useTemplates || planDuration > 14 ? 'templates' : 'ai-with-fallback',
    })
  } catch (error) {
    console.error('Error generating diet plan:', error)

    // Handle Ollama-specific errors
    if (error.message && error.message.includes('OLLAMA')) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate meal plan with AI',
        error: {
          code: 'OLLAMA_ERROR',
          details: 'Make sure Ollama is running',
        },
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to generate diet plan',
      error: { code: 'INTERNAL_ERROR', details: error.message },
    })
  }
}

// all meal plans for the user
export const getMealPlans = async (req, res, next) => {
  try {
    const mealPlans = await AiMealPlan.find({ userId: req.user._id }).sort({
      createdAt: -1,
    })

    res.status(200).json({
      success: true,
      count: mealPlans.length,
      mealPlans,
    })
  } catch (error) {
    next(error)
  }
}

// to get specific meal plan
export const getMealPlan = async (req, res, next) => {
  try {
    const mealPlan = await AiMealPlan.findById(req.params.id)

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found',
      })
    }

    // Ensure user owns this meal plan
    if (mealPlan.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this meal plan',
      })
    }

    res.status(200).json({
      success: true,
      mealPlan,
    })
  } catch (error) {
    next(error)
  }
}

// Delete meal plan
export const deleteMealPlan = async (req, res, next) => {
  try {
    const mealPlan = await AiMealPlan.findById(req.params.id)

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found',
      })
    }

    // Ensure user owns this meal plan
    if (mealPlan.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this meal plan',
      })
    }

    await AiMealPlan.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Meal plan deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

// Get latest meal plan for the user
export const getLatestMealPlan = async (req, res, next) => {
  try {
    const mealPlan = await AiMealPlan.findOne({ userId: req.user._id }).sort({
      createdAt: -1,
    })

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'No meal plan found',
      })
    }

    res.status(200).json({
      success: true,
      mealPlan,
    })
  } catch (error) {
    next(error)
  }
}

// Get specific day from a meal plan
export const getMealPlanDay = async (req, res, next) => {
  try {
    const { id, dayNumber } = req.params

    const mealPlan = await AiMealPlan.findById(id)

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found',
      })
    }

    // Ensure user owns this meal plan
    if (mealPlan.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this meal plan',
      })
    }

    const dayIndex = parseInt(dayNumber) - 1 // Convert to 0-based index
    if (dayIndex < 0 || dayIndex >= mealPlan.days.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid day number',
      })
    }

    const dayData = mealPlan.days[dayIndex]

    res.status(200).json({
      success: true,
      day: {
        dayNumber: parseInt(dayNumber),
        date: dayData.date,
        meals: dayData.meals,
        nutritionSummary: dayData.nutritionSummary,
      },
    })
  } catch (error) {
    next(error)
  }
}
