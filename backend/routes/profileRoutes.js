import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  validateProfile,
  validateProfileUpdate,
  handleValidationErrors,
} from '../middleware/validators.js'
import {
  completeProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.js'

const profileRouter = Router()

profileRouter.use(protect)
profileRouter
  .get('/', getProfile)
  .post('/complete', validateProfile, handleValidationErrors, completeProfile)
  .put('/', validateProfileUpdate, handleValidationErrors, updateProfile)
  .delete('/', deleteProfile)

export default profileRouter
