import MealPlan from '../models/MealPlan.js'
import Profile from '../models/Profile.js'
import mealPlanService from '../services/mealPlanService.js'

export const createMealPlan = async (req, res, next) => {
  try {
    const {
      planName = 'My Meal Plan',
      duration = 7,
      mealsPerDay = 3,
      dietType,
      allergens = [],
    } = req.body

    // Get user profile for nutrition calculations
    const profile = await Profile.findOne({ user: req.user._id })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Please complete your profile first',
      })
    }

    // Generate meal plan using the service
    const generatedPlan = await mealPlanService.generateMealPlan({
      userId: req.user._id.toString(),
      planName,
      duration,
      mealsPerDay,
      weight: profile.weight,
      height: profile.height,
      age: profile.age,
      gender: profile.gender,
      activityLevel: profile.activityLevel || 'moderate',
      goal: profile.dietaryGoal || 'maintain_weight',
      dietType: dietType || profile.foodType || 'nonveg',
      allergens,
    })

    // Create meal plan in database
    const newPlan = await MealPlan.create({
      userId: req.user._id,
      planName: generatedPlan.planName,
      duration: generatedPlan.duration,
      mealsPerDay: generatedPlan.mealsPerDay,
      dietType: generatedPlan.dietType || dietType,
      allergens: generatedPlan.allergens || allergens,
      dailyCalories: generatedPlan.nutritionTargets.dailyCalories,
      dailyMacros: generatedPlan.nutritionTargets.dailyMacros,
      days: generatedPlan.days,
    })

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      mealPlan: newPlan,
      nutritionSummary: generatedPlan.nutritionSummary,
      warnings: generatedPlan.warnings || [],
    })
  } catch (error) {
    console.error('Meal plan creation error:', error)
    next(error)
  }
}

// all meal plans for the user
export const getMealPlans = async (req, res, next) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.user._id }).sort({
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
    const mealPlan = await MealPlan.findById(req.params.id)

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
    const mealPlan = await MealPlan.findById(req.params.id)

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

    await MealPlan.findByIdAndDelete(req.params.id)

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
    const mealPlan = await MealPlan.findOne({ userId: req.user._id }).sort({
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

    const mealPlan = await MealPlan.findById(id)

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
