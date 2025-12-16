import { Schema, model } from 'mongoose'
import {
  calculateBMR,
  calculateTDEE,
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
  const heightInMeters = this.height / 100
  const bmi = this.weight / (heightInMeters * heightInMeters)
  return Math.round(bmi * 10) / 10 // Round to 1 decimal
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
  let dailyCalories = tdee

  // Adjust calories based on dietary goal
  if (this.dietaryGoal === 'lose_weight') {
    dailyCalories -= 500 // 500 calorie deficit for weight loss
  } else if (this.dietaryGoal === 'maintain_weight') {
    dailyCalories = tdee // Keep TDEE as-is to maintain current weight
  } else if (this.dietaryGoal === 'gain_weight') {
    dailyCalories += 300 // 300 calorie surplus for weight gain
  } else if (this.dietaryGoal === 'build_muscle') {
    dailyCalories += 400 // 400 calorie surplus for muscle building
  }

  return Math.round(dailyCalories)
}

// Include virtuals in JSON
profileSchema.set('toJSON', { virtuals: true })
profileSchema.set('toObject', { virtuals: true })

export default model('Profile', profileSchema)
