import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  getLatestMealPlan,
  getMealPlanDay,
  deleteMealPlan,
} from '../controllers/aiMealPlanController.js'
import AiMealPlan from '../models/AiMealPlan.js'

const mealPlanRouter = Router()

// All routes require authentication
mealPlanRouter.use(protect)

// Routes for meal plans
mealPlanRouter.post('/', createMealPlan)
mealPlanRouter.get('/', getMealPlans)
mealPlanRouter.get('/latest', getLatestMealPlan)

// New route for diet planner - get day from latest plan
mealPlanRouter.get('/days/:dayNumber', async (req, res) => {
  try {
    const userId = req.user._id
    const { dayNumber } = req.params

    const dietPlan = await AiMealPlan.findOne({ userId })
      .sort({ createdAt: -1 })
      .exec()

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: 'No diet plan found',
        error: { code: 'NOT_FOUND' },
      })
    }

    const day = dietPlan.days.find((d) => d.dayNumber === parseInt(dayNumber))

    if (!day) {
      return res.status(404).json({
        success: false,
        message: `Day ${dayNumber} not found in plan`,
        error: { code: 'NOT_FOUND' },
      })
    }

    return res.status(200).json({
      success: true,
      day,
      dailyCalories: dietPlan.dailyCalories,
      dailyMacros: dietPlan.dailyMacros,
    })
  } catch (error) {
    console.error('Error fetching day data:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch day data',
      error: { code: 'INTERNAL_ERROR' },
    })
  }
})

mealPlanRouter.get('/:id/day/:dayNumber', getMealPlanDay) // More specific route
mealPlanRouter.get('/:id', getMealPlan)
mealPlanRouter.delete('/:id', deleteMealPlan)

export default mealPlanRouter
