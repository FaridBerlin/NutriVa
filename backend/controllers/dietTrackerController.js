import DietTracker from '../models/DietTracker.js'
import MealPlan from '../models/MealPlan.js'
import User from '../models/User.js'

// create DietTracker
export const createDietTracker = async (req, res, next) => {
  try {
    const { mealPlanId } = req.params
    const userId = req.user._id

    const mealPlan = await MealPlan.findById(mealPlanId)

    if (!mealPlan) {
      res.status(404)
      throw new Error('Meal plan not found')
    }

    if (mealPlan.userId.toString() !== userId.toString()) {
      res.status(403)
      throw new Error('Not authorized to track this meal plan')
    }

    const existingTracker = await DietTracker.findOne({
      userId,
      mealPlanId,
      status: 'active',
    })

    if (existingTracker) {
      res.status(400)
      throw new Error('Active tracker already exists for this meal plan')
    }

    const day1Data = mealPlan.days.find((day) => day.dayNumber === 1)

    if (!day1Data) {
      res.status(400)
      throw new Error('Meal plan has no days configured')
    }

    const dailyTracker = {
      date: new Date(),
      dayNumber: 1,
      meals: day1Data.meals.map((meal) => ({
        mealId: meal.mealId,
        name: meal.name,
        category: meal.category,
        isEaten: false,
        nutrition: meal.nutrition,
      })),
      target: {
        calories: mealPlan.dailyCalories,
        protein: mealPlan.dailyMacros?.protein || 0,
        carbs: mealPlan.dailyMacros?.carbs || 0,
        fat: mealPlan.dailyMacros?.fat || 0,
      },
      totalMeals: day1Data.meals.length,
      mealsCompleted: 0,
      completionPercentage: 0,
    }

    const dietTracker = await DietTracker.create({
      userId,
      mealPlanId,
      totalDays: mealPlan.duration,
      startDate: new Date(),
      currentDay: 1,
      dailyTrackers: [dailyTracker],
    })

    res.status(201).json(dietTracker)
  } catch (error) {
    next(error)
  }
}

// get ActiveTracker
export const getActiveTracker = async (req, res, next) => {
  try {
    const userId = req.user._id

    const tracker = await DietTracker.findOne({
      userId,
      status: 'active',
    }).populate('mealPlanId')

    if (!tracker) {
      return res.status(404).json({
        message: 'No active diet tracker found',
      })
    }

    res.status(200).json(tracker)
  } catch (error) {
    next(error)
  }
}

//get TrackerDay
export const getTrackerDay = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { dayNumber } = req.params

    const tracker = await DietTracker.findOne({
      userId,
      status: 'active',
    })

    if (!tracker) {
      return res.status(404).json({
        message: 'No active diet tracker found',
      })
    }

    const dayTracker = tracker.dailyTrackers.find(
      (day) => day.dayNumber === Number(dayNumber),
    )

    if (!dayTracker) {
      return res.status(404).json({
        message: `Day ${dayNumber} not found in tracker`,
      })
    }

    res.status(200).json(dayTracker)
  } catch (error) {
    next(error)
  }
}

//mark MealAsEaten
export const markMealAsEaten = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { dayNumber, mealId } = req.params

    const tracker = await DietTracker.findOne({
      userId,
      status: 'active',
    })

    if (!tracker) {
      return res.status(404).json({
        message: 'No active diet tracker found',
      })
    }

    const dayTracker = tracker.dailyTrackers.find(
      (day) => day.dayNumber === Number(dayNumber),
    )

    if (!dayTracker) {
      return res.status(404).json({
        message: `Day ${dayNumber} not found`,
      })
    }

    const meal = dayTracker.meals.id(mealId)

    if (!meal) {
      return res.status(404).json({
        message: 'Meal not found',
      })
    }

    if (meal.isEaten) {
      return res.status(400).json({
        message: 'Meal already marked as eaten',
      })
    }

    //Mark eaten
    meal.isEaten = true
    meal.eatenAt = new Date()

    //Update consumed macros
    dayTracker.consumed.calories += meal.nutrition.calories
    dayTracker.consumed.protein += meal.nutrition.protein
    dayTracker.consumed.carbs += meal.nutrition.carbs
    dayTracker.consumed.fat += meal.nutrition.fat

    //Update completion
    dayTracker.mealsCompleted += 1
    dayTracker.completionPercentage = Math.round(
      (dayTracker.mealsCompleted / dayTracker.totalMeals) * 100,
    )

    //Day completed ... use createNextDayTracker helper function
    if (dayTracker.completionPercentage === 100) {
      const mealPlan = await MealPlan.findById(tracker.mealPlanId)

      if (tracker.currentDay < tracker.totalDays) {
        createNextDayTracker(tracker, mealPlan)
      } else {
        tracker.status = 'completed'
      }
    }

    //Update tracker-level metrics
    tracker.updateStreak()
    tracker.adherenceScore = tracker.calculateAdherenceScore()

    await tracker.save()

    res.status(200).json({
      message: 'Meal marked as eaten',
      tracker,
    })
  } catch (error) {
    next(error)
  }
}

//AUTO-CREATE NEXT DAY  Helper function (clean & reusable)
const createNextDayTracker = (tracker, mealPlan) => {
  const nextDayNumber = tracker.currentDay + 1

  const dayData = mealPlan.days.find((d) => d.dayNumber === nextDayNumber)

  if (!dayData) return

  const nextDayTracker = {
    date: new Date(),
    dayNumber: nextDayNumber,
    meals: dayData.meals.map((meal) => ({
      mealId: meal._id,
      name: meal.name,
      category: meal.category,
      isEaten: false,
      nutrition: meal.nutrition,
    })),
    consumed: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    target: {
      calories: mealPlan.dailyCalories,
      protein: mealPlan.dailyMacros.protein,
      carbs: mealPlan.dailyMacros.carbs,
      fat: mealPlan.dailyMacros.fat,
    },
    mealsCompleted: 0,
    totalMeals: dayData.meals.length,
    completionPercentage: 0,
  }

  tracker.dailyTrackers.push(nextDayTracker)
  tracker.currentDay = nextDayNumber
}

// undo Meal
export const undoMeal = async (req, res, next) => {
  try {
    const { dayNumber, mealId } = req.params
    const userId = req.user._id

    const tracker = await DietTracker.findOne({
      userId,
      status: 'active',
    })

    if (!tracker) {
      return res.status(404).json({ message: 'No active tracker found' })
    }

    const dayTracker = tracker.dailyTrackers.find(
      (d) => d.dayNumber === Number(dayNumber),
    )

    const meal = dayTracker?.meals.id(mealId)

    if (!meal || !meal.isEaten) {
      return res.status(400).json({ message: 'Meal not eaten yet' })
    }

    //Reverse
    meal.isEaten = false
    meal.eatenAt = null

    dayTracker.consumed.calories -= meal.nutrition.calories
    dayTracker.consumed.protein -= meal.nutrition.protein
    dayTracker.consumed.carbs -= meal.nutrition.carbs
    dayTracker.consumed.fat -= meal.nutrition.fat

    dayTracker.mealsCompleted -= 1
    dayTracker.completionPercentage = Math.round(
      (dayTracker.mealsCompleted / dayTracker.totalMeals) * 100,
    )

    tracker.adherenceScore = tracker.calculateAdherenceScore()

    await tracker.save()

    res.json({
      message: 'Meal undone',
      dayTracker,
    })
  } catch (error) {
    next(error)
  }
}

// get AllTrackers
export const getAllTrackers = async (req, res, next) => {
  try {
    const userId = req.user._id

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const filter = { userId }

    if (req.query.status) {
      filter.status = req.query.status
    }

    const sortField = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.order === 'asc' ? 1 : -1

    const trackers = await DietTracker.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('mealPlanId')

    const total = await DietTracker.countDocuments(filter)

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      trackers,
    })
  } catch (error) {
    next(error)
  }
}
