import MealPlan from '../models/MealPlan.js'
import Profile from '../models/Profile.js'

export const createMealPlan = async (req, res, next) => {
  try {
    const { planName, duration, mealsPerDay, dietType, dietaryRestrictions } =
      req.body

    // we need profile to fetch dailyCalories and dailyMacros
    const profile = await Profile.findOne({ userId: req.user._id })
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Please complete your profile first',
      })
    }

    // from profile methods
    const dailyCalories = profile.getDailyCalories()
    const dailyMacros = profile.getDailyMacros()

    // Generate days based on duration
    const days = []
    for (let i = 1; i <= duration; i++) {
      days.push({
        dayNumber: i,
        meals: [], // TODO: populate from meal database
        totalNutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        },
      })
    }

    // Create meal plan
    const newPlan = await MealPlan.create({
      userId: req.user._id,
      planName,
      duration,
      mealsPerDay,
      dietType,
      dietaryRestrictions,
      dailyCalories,
      dailyMacros,
      days,
    })

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      mealPlan: newPlan,
    })
  } catch (error) {
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
