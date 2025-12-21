import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createDietTracker,
  getActiveTracker,
  getTrackerDay,
  markMealAsEaten,
  undoMeal,
  getAllTrackers,
} from '../controllers/dietTrackerController.js'

const dietTrackerRouter = Router()

dietTrackerRouter.use(protect)
dietTrackerRouter
        .post('/:mealPlanId', createDietTracker) 
        .get('/active', getActiveTracker)  
        .get('/day/:dayNumber', getTrackerDay)  
        .post('/day/:dayNumber/meals/:mealId/eat', markMealAsEaten)
        .post('/day/:dayNumber/meals/:mealId/undo', undoMeal)
        .get('/', getAllTrackers)   

export default dietTrackerRouter