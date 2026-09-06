import DietTracker from '../models/DietTracker.js'
import AiMealPlan from '../models/AiMealPlan.js'
import User from '../models/User.js'
import { enrichMealsWithTimingStatus } from '../utils/mealTimeUtils.js'

// create DietTracker
export const createDietTracker = async (req, res, next) => {
  try {
    const { aiMealPlanId } = req.params
    const userId = req.user._id

    const aiMealPlan = await AiMealPlan.findById(aiMealPlanId)

    if (!aiMealPlan) {
      res.status(404)
      throw new Error('AI Meal plan not found')
    }

    if (aiMealPlan.userId.toString() !== userId.toString()) {
      res.status(403)
      throw new Error('Not authorized to track this meal plan')
    }

    const existingTracker = await DietTracker.findOne({
      userId,
      aiMealPlanId,
      status: 'active',
    })

    if (existingTracker) {
      res.status(400)
      throw new Error('Active tracker already exists for this meal plan')
    }

    // Check for orphaned trackers (active but meal plan deleted) and mark as abandoned
    try {
      const orphanedTrackers = await DietTracker.find({
        userId,
        status: 'active',
      })

      for (const tracker of orphanedTrackers) {
        try {
          const planExists = await AiMealPlan.findById(tracker.aiMealPlanId)
          if (!planExists) {
            console.log(
              `Marking tracker ${tracker._id} as abandoned (orphaned)`,
            )
            tracker.status = 'abandoned'
            await tracker.save()
          }
        } catch (error) {
          console.error(`Error checking tracker ${tracker._id}:`, error)
          // Continue with other trackers
        }
      }
    } catch (error) {
      console.error('Error checking for orphaned trackers:', error)
      // Don't fail the tracker creation if orphan check fails
    }

    const day1Data = aiMealPlan.days.find((day) => day.dayNumber === 1)

    if (!day1Data) {
      res.status(400)
      throw new Error('Meal plan has no days configured')
    }

    const dailyTracker = {
      date: new Date(),
      dayNumber: 1,
      meals: day1Data.meals.map((meal) => ({
        mealId: meal._id.toString(),
        name: meal.dishName,
        category: meal.type,
        isEaten: meal.eaten || false,
        nutrition: meal.nutrition,
      })),
      target: {
        calories: aiMealPlan.dailyCalories,
        protein: aiMealPlan.dailyMacros?.protein || 0,
        carbs: aiMealPlan.dailyMacros?.carbs || 0,
        fat: aiMealPlan.dailyMacros?.fat || 0,
      },
      totalMeals: day1Data.meals.length,
      mealsCompleted: 0,
      completionPercentage: 0,
    }

    const dietTracker = await DietTracker.create({
      userId,
      aiMealPlanId,
      totalDays: aiMealPlan.planDuration,
      startDate: new Date(),
      currentDay: 1,
      dailyTrackers: [dailyTracker],
    })

    // Populate the aiMealPlanId before sending response
    await dietTracker.populate('aiMealPlanId')

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
    }).populate('aiMealPlanId')

    if (!tracker) {
      return res.status(404).json({
        message: 'No active diet tracker found',
      })
    }

    // Check if the meal plan still exists
    if (!tracker.aiMealPlanId) {
      tracker.status = 'abandoned'
      await tracker.save()

      return res.status(404).json({
        message: 'No active diet tracker found',
      })
    }

    // Convert to plain object first
    const enrichedTracker = tracker.toObject()

    // Enrich all daily trackers with timing status
    enrichedTracker.dailyTrackers = enrichedTracker.dailyTrackers.map(
      (dayTracker) => ({
        ...dayTracker,
        meals: enrichMealsWithTimingStatus(dayTracker.meals),
      }),
    )

    res.status(200).json(enrichedTracker)
  } catch (error) {
    console.error('Error in getActiveTracker:', error) // Add logging
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

//AUTO-CREATE NEXT DAY  Helper function (clean & reusable)
const createNextDayTracker = (tracker, aiMealPlan, nextDayNumber) => {
  // The plan can have been deleted while the tracker was still running.
  if (!aiMealPlan) return false

  const dayData = aiMealPlan.days.find((d) => d.dayNumber === nextDayNumber)

  if (!dayData) return false

  // Prevent duplicates
  const exists = tracker.dailyTrackers.some(
    (d) => d.dayNumber === nextDayNumber,
  )
  if (exists) return true

  const nextDayTracker = {
    date: new Date(),
    dayNumber: nextDayNumber,
    meals: dayData.meals.map((meal) => ({
      mealId: meal._id.toString(),
      name: meal.dishName,
      category: meal.type,
      isEaten: meal.eaten || false,
      nutrition: meal.nutrition,
    })),
    consumed: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    target: {
      calories: aiMealPlan.dailyCalories,
      protein: aiMealPlan.dailyMacros?.protein || 0,
      carbs: aiMealPlan.dailyMacros?.carbs || 0,
      fat: aiMealPlan.dailyMacros?.fat || 0,
    },
    mealsCompleted: 0,
    totalMeals: dayData.meals.length,
    completionPercentage: 0,
  }

  tracker.dailyTrackers.push(nextDayTracker)
  return true
}

//mark MealAsEaten
export const markMealAsEaten = async (req, res, next) => {
  let dayCompleted = false
  let nextDayNumber = null
  let nextDayCreated = false

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

    // Find meal by mealId field or by subdocument _id
    const meal = dayTracker.meals.find(
      (m) => m.mealId === mealId || m._id.toString() === mealId,
    )

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
    dayTracker.consumed.calories += meal.nutrition?.calories || 0
    dayTracker.consumed.protein += meal.nutrition?.protein || 0
    dayTracker.consumed.carbs += meal.nutrition?.carbs || 0
    dayTracker.consumed.fat += meal.nutrition?.fat || 0

    //Update completion
    dayTracker.mealsCompleted += 1
    dayTracker.completionPercentage = Math.round(
      (dayTracker.mealsCompleted / dayTracker.totalMeals) * 100,
    )

    // Day completed: roll forward to the next day, or finish the plan.
    if (dayTracker.completionPercentage === 100) {
      dayCompleted = true

      if (tracker.currentDay < tracker.totalDays) {
        const aiMealPlan = await AiMealPlan.findById(tracker.aiMealPlanId)

        if (!aiMealPlan) {
          // The plan was deleted underneath the tracker: retire it rather
          // than dereferencing a missing document.
          tracker.status = 'abandoned'
          await tracker.save()
          return res.status(404).json({
            message: 'The meal plan for this tracker no longer exists',
          })
        }

        nextDayNumber = tracker.currentDay + 1
        nextDayCreated = createNextDayTracker(
          tracker,
          aiMealPlan,
          nextDayNumber,
        )
        tracker.currentDay = nextDayNumber
      } else {
        tracker.status = 'completed'
      }
    }

    //Update tracker-level metrics
    tracker.updateStreak()
    tracker.adherenceScore = tracker.calculateAdherenceScore()

    await tracker.save()

    // Populate the aiMealPlanId before sending response
    await tracker.populate('aiMealPlanId')

    res.status(200).json({
      message: 'Meal marked as eaten',
      tracker,
      dayCompleted,
      nextDayNumber,
      nextDayCreated,
    })
  } catch (error) {
    next(error)
  }
}

// undo Meal
export const undoMeal = async (req, res, next) => {
  try {
    const { dayNumber, mealId } = req.params
    const userId = req.user._id

    // A tracker that was just completed is no longer 'active', but its last
    // meal must still be undoable.
    const tracker = await DietTracker.findOne({
      userId,
      status: { $in: ['active', 'completed'] },
    })

    if (!tracker) {
      return res.status(404).json({ message: 'No active tracker found' })
    }

    const dayTracker = tracker.dailyTrackers.find(
      (d) => d.dayNumber === Number(dayNumber),
    )

    if (!dayTracker) {
      return res.status(404).json({ message: 'Day not found' })
    }

    // Find meal by mealId field or by subdocument _id
    const meal = dayTracker.meals.find(
      (m) => m.mealId === mealId || m._id.toString() === mealId,
    )

    if (!meal || !meal.isEaten) {
      return res.status(400).json({ message: 'Meal not eaten yet' })
    }

    const wasComplete = dayTracker.completionPercentage === 100

    //Reverse
    meal.isEaten = false
    meal.eatenAt = null

    dayTracker.consumed.calories -= meal.nutrition?.calories || 0
    dayTracker.consumed.protein -= meal.nutrition?.protein || 0
    dayTracker.consumed.carbs -= meal.nutrition?.carbs || 0
    dayTracker.consumed.fat -= meal.nutrition?.fat || 0

    dayTracker.mealsCompleted -= 1
    dayTracker.completionPercentage = Math.round(
      (dayTracker.mealsCompleted / dayTracker.totalMeals) * 100,
    )

    // Undoing the meal that completed a day must also reverse what that
    // completion triggered, otherwise the tracker is stuck a day ahead or
    // permanently marked completed.
    if (wasComplete) {
      if (tracker.status === 'completed') {
        tracker.status = 'active'
      }

      const undoneDay = Number(dayNumber)
      const followingDay = tracker.dailyTrackers.find(
        (d) => d.dayNumber === undoneDay + 1,
      )

      // Only roll back the auto-created day if nothing has been logged on it.
      if (followingDay && followingDay.mealsCompleted === 0) {
        tracker.dailyTrackers.pull(followingDay._id)
        if (tracker.currentDay === undoneDay + 1) {
          tracker.currentDay = undoneDay
        }
      }
    }

    tracker.adherenceScore = tracker.calculateAdherenceScore()

    await tracker.save()

    // Populate the aiMealPlanId before sending response
    await tracker.populate('aiMealPlanId')

    res.json({
      message: 'Meal undone',
      tracker,
    })
  } catch (error) {
    next(error)
  }
}

// get AllTrackers
export const getAllTrackers = async (req, res, next) => {
  try {
    const userId = req.user._id

    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10))
    const skip = (page - 1) * limit

    const filter = { userId }

    // Only accept known enum values so the filter cannot be steered by a
    // crafted query string.
    const ALLOWED_STATUSES = ['active', 'completed', 'abandoned']
    if (req.query.status && ALLOWED_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status
    }

    const ALLOWED_SORT_FIELDS = [
      'createdAt',
      'updatedAt',
      'startDate',
      'adherenceScore',
      'currentDay',
    ]
    const sortField = ALLOWED_SORT_FIELDS.includes(req.query.sortBy)
      ? req.query.sortBy
      : 'createdAt'
    const sortOrder = req.query.order === 'asc' ? 1 : -1

    const trackers = await DietTracker.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('aiMealPlanId')

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
