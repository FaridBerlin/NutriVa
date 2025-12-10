import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  getLatestMealPlan,
  getMealPlanDay,
  deleteMealPlan,
} from '../controllers/mealPlanController.js'

const mealPlanRouter = Router()

// All routes require authentication
mealPlanRouter.use(protect)

// Routes for meal plans
mealPlanRouter.post('/', createMealPlan)
mealPlanRouter.get('/', getMealPlans)
mealPlanRouter.get('/latest', getLatestMealPlan)
mealPlanRouter.get('/:id/day/:dayNumber', getMealPlanDay) // More specific route first
mealPlanRouter.get('/:id', getMealPlan)
mealPlanRouter.delete('/:id', deleteMealPlan)

export default mealPlanRouter
