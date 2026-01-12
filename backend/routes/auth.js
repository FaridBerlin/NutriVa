import express from 'express'
import {
  signup,
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import {
  validateSignup,
  validateLogin,
  handleValidationErrors,
} from '../middleware/validators.js'



const router = express.Router()

// POST /api/auth/signup - Register new user
router.post('/signup', validateSignup, handleValidationErrors, signup)

// POST /api/auth/login - Login user
router.post('/login', validateLogin, handleValidationErrors, login)

// GET /api/auth/me - Get current authenticated user (verify token)
router.get('/me', protect, getUser)

// POST /api/auth/logout - Logout user (clear cookie)
router.post('/logout', logout)

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword)

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', resetPassword)



export default router
