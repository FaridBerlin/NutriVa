import { body, validationResult } from 'express-validator'

export const validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 chars'),
]

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required'),
]

// Profile validation
export const validateProfile = [
  body('age')
    .isInt({ min: 13, max: 120 })
    .withMessage('Age must be between 13 and 120'),
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('height')
    .isFloat({ min: 50, max: 300 })
    .withMessage('Height must be between 50 and 300 cm'),
  body('weight')
    .isFloat({ min: 40, max: 150 })
    .withMessage('Weight must be between 40 and 150 kg'),
  body('activityLevel')
    .isIn(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .withMessage('Invalid activity level'),
  body('dietaryGoal')
    .isIn(['lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle'])
    .withMessage('Invalid dietary goal'),
  // Optional target weight (kg)
  body('targetWeight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Target weight must be between 40 and 150 kg'),
  // Optional start weight (kg) - initial point for progress tracking
  body('startWeight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Start weight must be between 40 and 150 kg'),
  // Optional weight history: array of { weight, date }
  body('weightHistory')
    .optional()
    .isArray()
    .withMessage('weightHistory must be an array'),
  body('weightHistory.*.weight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Each history weight must be between 40 and 150 kg'),
  body('weightHistory.*.date')
    .optional()
    .isISO8601()
    .withMessage('Each history date must be a valid ISO8601 date'),
]

export const validateProfileUpdate = [
  body('age')
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage('Age must be between 13 and 120'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('height')
    .optional()
    .isFloat({ min: 50, max: 300 })
    .withMessage('Height must be between 50 and 300 cm'),
  body('weight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Weight must be between 40 and 150 kg'),
  body('activityLevel')
    .optional()
    .isIn(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .withMessage('Invalid activity level'),
  body('dietaryGoal')
    .optional()
    .isIn(['lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle'])
    .withMessage('Invalid dietary goal'),
  // Optional target weight (kg)
  body('targetWeight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Target weight must be between 40 and 150 kg'),
  // Optional start weight (kg) - initial point for progress tracking
  body('startWeight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Start weight must be between 40 and 150 kg'),
  // Optional weight history: array of { weight, date }
  body('weightHistory')
    .optional()
    .isArray()
    .withMessage('weightHistory must be an array'),
  body('weightHistory.*.weight')
    .optional()
    .isFloat({ min: 40, max: 150 })
    .withMessage('Each history weight must be between 40 and 150 kg'),
  body('weightHistory.*.date')
    .optional()
    .isISO8601()
    .withMessage('Each history date must be a valid ISO8601 date'),
]

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
