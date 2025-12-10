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
    .isFloat({ min: 20, max: 500 })
    .withMessage('Weight must be between 20 and 500 kg'),
  body('activityLevel')
    .isIn(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .withMessage('Invalid activity level'),
  body('dietaryGoal')
    .isIn(['lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle'])
    .withMessage('Invalid dietary goal'),
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
    .isFloat({ min: 20, max: 500 })
    .withMessage('Weight must be between 20 and 500 kg'),
  body('activityLevel')
    .optional()
    .isIn(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .withMessage('Invalid activity level'),
  body('dietaryGoal')
    .optional()
    .isIn(['lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle'])
    .withMessage('Invalid dietary goal'),
]

// Meal validation
export const mealValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),

  body('calories').isFloat({ min: 0 }).withMessage('Calories must be >= 0'),
  body('protein').isFloat({ min: 0 }).withMessage('Protein must be >= 0'),
  body('carbs').isFloat({ min: 0 }).withMessage('Carbs must be >= 0'),
  body('fats').isFloat({ min: 0 }).withMessage('Fats must be >= 0'),

  body('serving_size').notEmpty().withMessage('Serving size is required'),

  body('category')
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid category'),

  body('type')
    .isIn([
      'balanced',
      'high-protein',
      'low-carb',
      'keto',
      'vegan',
      'veg',
      'gluten-free',
    ])
    .withMessage('Invalid meal type'),
]

export const mealValidatorUpdate = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required'),

  body('calories')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Calories must be >= 0'),
  body('protein')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Protein must be >= 0'),
  body('carbs')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Carbs must be >= 0'),
  body('fats').optional().isFloat({ min: 0 }).withMessage('Fats must be >= 0'),

  body('serving_size')
    .optional()
    .notEmpty()
    .withMessage('Serving size is required'),

  body('category')
    .optional()
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid category'),

  body('type')
    .optional()
    .isIn([
      'balanced',
      'high-protein',
      'low-carb',
      'keto',
      'vegan',
      'veg',
      'gluten-free',
    ])
    .withMessage('Invalid meal type'),
]

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
