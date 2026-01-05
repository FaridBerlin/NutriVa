import { Schema, model } from 'mongoose'
import {
  calculateBMR,
  calculateTDEE,
  calculateBMI,
  calculateCalories,
  calculateMacros,
} from '../utils/nutritionCalculations.js'

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 40,
      max: 150,
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      required: true,
    },
    foodType: {
      type: String,
      enum: ['veg', 'nonveg', 'vegan'],
    },
    dietaryGoal: {
      type: String,
      enum: ['lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle'],
      required: true,
      default: 'maintain_weight',
    },
    // Optional: target weight (in kilograms). Stored in kg for consistency.
    // Apply logical bounds: 40-150 kg.
    targetWeight: {
      type: Number,
      min: 40,
      max: 150,
    },
    // Optional: starting weight used as baseline for progress tracking
    startWeight: {
      type: Number,
      min: 40,
      max: 150,
    },
    // Weight history: array of records { weight, date }
    weightHistory: [
      {
        weight: { type: Number, min: 40, max: 150 },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
)

// Virtual BMR using Harris-Benedict Equation
profileSchema.virtual('bmr').get(function () {
  return calculateBMR({
    weight: this.weight,
    height: this.height,
    age: this.age,
    gender: this.gender,
  })
})

// Virtual field for BMI calculation (Body Mass Index)
profileSchema.virtual('bmi').get(function () {
  return calculateBMI(this.weight, this.height)
})

// Method to calculate TDEE (Total Daily Energy Expenditure)
profileSchema.methods.getTDEE = function () {
  return calculateTDEE({
    bmr: this.bmr,
    activityLevel: this.activityLevel,
  })
}

// Method to calculate daily calorie goal based on dietary goal
profileSchema.methods.getDailyCalories = function () {
  const tdee = this.getTDEE()
  return calculateCalories(tdee, this.dietaryGoal)
}

// Method to calculate macronutrient targets
profileSchema.methods.getMacros = function () {
  const calories = this.getDailyCalories()
  return calculateMacros(calories, this.weight, this.dietaryGoal)
}

// Method to get comprehensive nutrition targets
profileSchema.methods.getNutritionTargets = function () {
  const calories = this.getDailyCalories()
  const macros = this.getMacros()

  return {
    dailyCalories: calories,
    bmr: this.bmr,
    tdee: this.getTDEE(),
    macros: {
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    },
  }
}

// Include virtuals in JSON
profileSchema.set('toJSON', { virtuals: true })
profileSchema.set('toObject', { virtuals: true })

export default model('Profile', profileSchema)
